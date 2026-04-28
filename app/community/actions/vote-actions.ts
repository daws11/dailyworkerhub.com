'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function toggleVote(targetType: 'discussion' | 'comment' | 'feedback', targetId: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('Unauthorized')
  }

  // Check for existing vote
  const { data: existingVote } = await supabase
    .schema('community')
    .from('votes')
    .select('*')
    .eq('user_id', user.id)
    .eq('target_type', targetType)
    .eq('target_id', targetId)
    .single()

  if (existingVote) {
    // Remove vote (toggle off)
    await supabase
      .schema('community')
      .from('votes')
      .delete()
      .eq('id', existingVote.id)

    // Update the target's like/vote count
    if (targetType === 'discussion') {
      await supabase
        .schema('community')
        .from('discussions')
        .update({ likes_count: supabase.rpc('decrement', { x: 1 }) })
        .eq('id', targetId)
    } else if (targetType === 'comment') {
      await supabase
        .schema('community')
        .from('comments')
        .update({ likes_count: supabase.rpc('decrement', { x: 1 }) })
        .eq('id', targetId)
    } else if (targetType === 'feedback') {
      await supabase
        .schema('community')
        .from('feedback_items')
        .update({ votes_count: supabase.rpc('decrement', { x: 1 }) })
        .eq('id', targetId)
    }
  } else {
    // Add vote
    await supabase
      .schema('community')
      .from('votes')
      .insert({
        user_id: user.id,
        target_type: targetType,
        target_id: targetId,
        value: 1,
      })

    // Update the target's like/vote count
    if (targetType === 'discussion') {
      await supabase
        .schema('community')
        .from('discussions')
        .update({ likes_count: supabase.rpc('increment', { x: 1 }) })
        .eq('id', targetId)
    } else if (targetType === 'comment') {
      await supabase
        .schema('community')
        .from('comments')
        .update({ likes_count: supabase.rpc('increment', { x: 1 }) })
        .eq('id', targetId)
    } else if (targetType === 'feedback') {
      await supabase
        .schema('community')
        .from('feedback_items')
        .update({ votes_count: supabase.rpc('increment', { x: 1 }) })
        .eq('id', targetId)
    }
  }

  revalidatePath(`/community/${targetType === 'discussion' ? 'discussions' : targetType === 'comment' ? 'discussions' : 'feedback'}/${targetId}`)
}

export async function createFeedback(formData: FormData) {
  const supabase = await createClient()

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const category = formData.get('category') as 'feature' | 'bug' | 'improvement'

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('Unauthorized')
  }

  const { data, error } = await supabase
    .schema('community')
    .from('feedback_items')
    .insert({
      title,
      description,
      author_id: user.id,
      category,
      status: 'under_review',
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating feedback:', error)
    throw new Error('Failed to create feedback')
  }

  revalidatePath('/community/feedback')
  return data
}