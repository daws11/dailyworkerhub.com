import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/types'

type Vote = Database['public']['Tables']['votes']['Row']
type VoteInsert = Database['public']['Tables']['votes']['Insert']

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

// Helper to safely update votes count with fallback
async function updateVotesCount(supabase: ReturnType<typeof createClient>, feedbackId: string, delta: number): Promise<void> {
  try {
    // @ts-expect-error RPC call - parameters are runtime-dependent
    await supabase.rpc('increment_votes_count', {
      feedback_id: feedbackId,
      delta: delta,
    })
  } catch {
    // Fallback: update directly if RPC doesn't exist
    const { data: feedback } = await supabase
      .from('feedback_items')
      .select('votes_count')
      .eq('id', feedbackId)
      .single()

    if (feedback) {
      await supabase
        .from('feedback_items')
        // @ts-expect-error Type inference issue with dummy client at build time
        .update({ votes_count: feedback.votes_count + delta })
        .eq('id', feedbackId)
    }
  }
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

  const existingVoteTyped = existingVote as Vote | null

  if (existingVoteTyped && existingVoteTyped.id) {
    // Update existing vote
    const { data, error } = await supabase
      .from('votes')
      // @ts-expect-error Type inference issue with dummy client at build time
      .update({ value: input.value })
      .eq('id', existingVoteTyped.id)
      .select()
      .single()

    if (error) {
      return { data: null, error: new Error(error.message) }
    }

    // Update votes_count on feedback item if value changed
    if (existingVoteTyped.value !== input.value) {
      const voteDiff = input.value - existingVoteTyped.value
      await updateVotesCount(supabase, input.target_id, voteDiff)
    }

    return { data: data as Vote, error: null }
  }

  // Insert new vote
  const insertData: VoteInsert = {
    user_id: input.user_id,
    target_type: 'feedback',
    target_id: input.target_id,
    value: input.value,
  }

  const { data, error } = await supabase
    .from('votes')
    // @ts-expect-error Type inference issue with dummy client at build time
    .insert(insertData)
    .select()
    .single()

  if (error) {
    return { data: null, error: new Error(error.message) }
  }

  // Increment votes_count on feedback item
  await updateVotesCount(supabase, input.target_id, input.value)

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

  const existingVoteTyped = existingVote as Vote | null

  if (!existingVoteTyped) {
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
  const voteChange = -existingVoteTyped.value
  await updateVotesCount(supabase, targetId, voteChange)

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

  const existingVoteTyped = existingVote as Vote | null

  if (existingVoteTyped && existingVoteTyped.id) {
    // Remove the vote
    const { error } = await supabase
      .from('votes')
      .delete()
      .eq('id', existingVoteTyped.id)

    if (error) {
      return { data: null, removed: false, error: new Error(error.message) }
    }

    // Decrement votes_count on feedback item
    const voteChange = -existingVoteTyped.value
    await updateVotesCount(supabase, input.target_id, voteChange)

    return { data: null, removed: true, error: null }
  }

  // Insert new vote
  const insertData: VoteInsert = {
    user_id: input.user_id,
    target_type: 'feedback',
    target_id: input.target_id,
    value: input.value,
  }

  const { data, error } = await supabase
    .from('votes')
    // @ts-expect-error Type inference issue with dummy client at build time
    .insert(insertData)
    .select()
    .single()

  if (error) {
    return { data: null, removed: false, error: new Error(error.message) }
  }

  // Increment votes_count on feedback item
  await updateVotesCount(supabase, input.target_id, input.value)

  return { data: data as Vote, removed: false, error: null }
}
