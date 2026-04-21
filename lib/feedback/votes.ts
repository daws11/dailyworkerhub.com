import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/types'

type Vote = Database['public']['Tables']['votes']['Row']
type FeedbackItem = Database['public']['Tables']['feedback_items']['Row']

export interface CastVoteInput {
  user_id: string
  target_id: string
  value: 1 | -1
}

export interface ToggleVoteInput {
  user_id: string
  target_id: string
  value: 1 | -1
}

/**
 * Cast a vote on a feedback item
 */
export async function castVote(input: CastVoteInput): Promise<{
  data: Vote | null
  error: Error | null
}> {
  const supabase = createClient()

  // Check if vote already exists
  const { data: existingVote } = await supabase
    .from('votes')
    .select('*')
    .eq('user_id', input.user_id)
    .eq('target_type', 'feedback')
    .eq('target_id', input.target_id)
    .single()

  if (existingVote) {
    // Update existing vote
    const { data, error } = await supabase
      .from('votes')
      .update({ value: input.value } as never)
      .eq('id', existingVote.id)
      .select()
      .single()

    if (error) {
      return { data: null, error: new Error(error.message) }
    }

    // Update votes_count on feedback item if value changed
    if (existingVote.value !== input.value) {
      const voteDiff = input.value - existingVote.value
      await supabase.rpc('increment_votes_count', {
        feedback_id: input.target_id,
        delta: voteDiff,
      }).catch(() => {
        // Fallback: update directly if RPC doesn't exist
        supabase
          .from('feedback_items')
          .select('votes_count')
          .eq('id', input.target_id)
          .single()
          .then(({ data: feedback }) => {
            if (feedback) {
              supabase
                .from('feedback_items')
                .update({ votes_count: feedback.votes_count + voteDiff } as never)
                .eq('id', input.target_id)
            }
          })
      })
    }

    return { data: data as Vote, error: null }
  }

  // Insert new vote
  const { data, error } = await supabase
    .from('votes')
    .insert({
      user_id: input.user_id,
      target_type: 'feedback',
      target_id: input.target_id,
      value: input.value,
    } as never)
    .select()
    .single()

  if (error) {
    return { data: null, error: new Error(error.message) }
  }

  // Increment votes_count on feedback item
  await supabase.rpc('increment_votes_count', {
    feedback_id: input.target_id,
    delta: input.value,
  }).catch(() => {
    // Fallback: update directly if RPC doesn't exist
    supabase
      .from('feedback_items')
      .select('votes_count')
      .eq('id', input.target_id)
      .single()
      .then(({ data: feedback }) => {
        if (feedback) {
          supabase
            .from('feedback_items')
            .update({ votes_count: feedback.votes_count + input.value } as never)
            .eq('id', input.target_id)
        }
      })
  })

  return { data: data as Vote, error: null }
}

/**
 * Remove a vote from a feedback item
 */
export async function removeVote(userId: string, targetId: string): Promise<{
  data: { id: string } | null
  error: Error | null
}> {
  const supabase = createClient()

  // Get existing vote to calculate vote change
  const { data: existingVote } = await supabase
    .from('votes')
    .select('*')
    .eq('user_id', userId)
    .eq('target_type', 'feedback')
    .eq('target_id', targetId)
    .single()

  if (!existingVote) {
    return { data: null, error: new Error('Vote not found') }
  }

  const { data, error } = await supabase
    .from('votes')
    .delete()
    .eq('user_id', userId)
    .eq('target_type', 'feedback')
    .eq('target_id', targetId)
    .select('id')
    .single()

  if (error) {
    return { data: null, error: new Error(error.message) }
  }

  // Decrement votes_count on feedback item
  const voteChange = -existingVote.value
  await supabase.rpc('increment_votes_count', {
    feedback_id: targetId,
    delta: voteChange,
  }).catch(() => {
    // Fallback: update directly if RPC doesn't exist
    supabase
      .from('feedback_items')
      .select('votes_count')
      .eq('id', targetId)
      .single()
      .then(({ data: feedback }) => {
        if (feedback) {
          supabase
            .from('feedback_items')
            .update({ votes_count: feedback.votes_count + voteChange } as never)
            .eq('id', targetId)
        }
      })
  })

  return { data: data as { id: string }, error: null }
}

/**
 * Toggle a vote on a feedback item (add if not exists, remove if exists)
 */
export async function toggleVote(input: ToggleVoteInput): Promise<{
  data: Vote | null
  removed: boolean
  error: Error | null
}> {
  const supabase = createClient()

  // Check if vote already exists
  const { data: existingVote } = await supabase
    .from('votes')
    .select('*')
    .eq('user_id', input.user_id)
    .eq('target_type', 'feedback')
    .eq('target_id', input.target_id)
    .single()

  if (existingVote) {
    // Remove the vote
    const { error } = await supabase
      .from('votes')
      .delete()
      .eq('id', existingVote.id)

    if (error) {
      return { data: null, removed: false, error: new Error(error.message) }
    }

    // Decrement votes_count on feedback item
    const voteChange = -existingVote.value
    await supabase.rpc('increment_votes_count', {
      feedback_id: input.target_id,
      delta: voteChange,
    }).catch(() => {
      // Fallback: update directly if RPC doesn't exist
      supabase
        .from('feedback_items')
        .select('votes_count')
        .eq('id', input.target_id)
        .single()
        .then(({ data: feedback }) => {
          if (feedback) {
            supabase
              .from('feedback_items')
              .update({ votes_count: feedback.votes_count + voteChange } as never)
              .eq('id', input.target_id)
          }
        })
    })

    return { data: null, removed: true, error: null }
  }

  // Insert new vote
  const { data, error } = await supabase
    .from('votes')
    .insert({
      user_id: input.user_id,
      target_type: 'feedback',
      target_id: input.target_id,
      value: input.value,
    } as never)
    .select()
    .single()

  if (error) {
    return { data: null, removed: false, error: new Error(error.message) }
  }

  // Increment votes_count on feedback item
  await supabase.rpc('increment_votes_count', {
    feedback_id: input.target_id,
    delta: input.value,
  }).catch(() => {
    // Fallback: update directly if RPC doesn't exist
    supabase
      .from('feedback_items')
      .select('votes_count')
      .eq('id', input.target_id)
      .single()
      .then(({ data: feedback }) => {
        if (feedback) {
          supabase
            .from('feedback_items')
            .update({ votes_count: feedback.votes_count + input.value } as never)
            .eq('id', input.target_id)
        }
      })
  })

  return { data: data as Vote, removed: false, error: null }
}