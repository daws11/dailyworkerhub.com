'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function toggleVote(targetType: 'discussion' | 'comment' | 'feedback', targetId: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('Unauthorized')
  }

  const { data: existingVote } = await supabase
    .from('votes')
    .select('*')
    .eq('user_id', user.id)
    .eq('target_type', targetType)
    .eq('target_id', targetId)
    .maybeSingle()

  if (existingVote) {
    await supabase
      .from('votes')
      .delete()
      .eq('id', existingVote.id)

    const tableName = targetType === 'discussion' ? 'community_discussions' : targetType === 'comment' ? 'community_comments' : 'feedback_items'
    const countField = targetType === 'feedback' ? 'votes_count' : 'likes_count'

    await supabase
      .from(tableName)
      .update({ [countField]: (existingVote.value > 0 ? -1 : 0) })
      .eq('id', targetId)
  } else {
    await supabase
      .from('votes')
      .insert({
        user_id: user.id,
        target_type: targetType,
        target_id: targetId,
        value: 1,
      })

    const tableName = targetType === 'discussion' ? 'community_discussions' : targetType === 'comment' ? 'community_comments' : 'feedback_items'
    const countField = targetType === 'feedback' ? 'votes_count' : 'likes_count'

    const { data: current } = await supabase
      .from(tableName)
      .select(countField)
      .eq('id', targetId)
      .single()

    const newCount = (current?.[countField] || 0) + 1

    await supabase
      .from(tableName)
      .update({ [countField]: newCount })
      .eq('id', targetId)
  }

  revalidatePath(`/community/${targetType === 'discussion' ? 'discussions' : targetType === 'comment' ? 'discussions' : 'feedback'}`)
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
