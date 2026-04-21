import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/types'

type FeedbackItem = Database['public']['Tables']['feedback_items']['Row']

// Type for insert operations
type FeedbackInsertData = {
  title: string
  description: string
  author_id: string
  category: 'feature' | 'bug' | 'improvement'
  status: 'under_review'
  votes_count: number
}

// Type for update operations
type FeedbackUpdateData = {
  title?: string
  description?: string
  category?: 'feature' | 'bug' | 'improvement'
  status?: FeedbackItem['status']
  votes_count?: number
}

export interface CreateFeedbackInput {
  title: string
  description: string
  author_id: string
  category: 'feature' | 'bug' | 'improvement'
}

export interface UpdateFeedbackStatusInput {
  id: string
  status: FeedbackItem['status']
}

/**
 * Create a new feedback item
 */
export async function createFeedback(input: CreateFeedbackInput): Promise<{
  data: FeedbackItem | null
  error: Error | null
}> {
  const supabase = createClient()

  const insertData: FeedbackInsertData = {
    title: input.title,
    description: input.description,
    author_id: input.author_id,
    category: input.category,
    status: 'under_review',
    votes_count: 0,
  }

  const { data, error } = await supabase
    .from('feedback_items')
    .insert(insertData as unknown as never)
    .select()
    .single()

  if (error) {
    return { data: null, error: new Error(error.message) }
  }

  return { data: data as FeedbackItem, error: null }
}

/**
 * Update feedback item status (admin function)
 */
export async function updateFeedbackStatus(input: UpdateFeedbackStatusInput): Promise<{
  data: FeedbackItem | null
  error: Error | null
}> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('feedback_items')
    .update({ status: input.status } as FeedbackUpdateData as never)
    .eq('id', input.id)
    .select()
    .single()

  if (error) {
    return { data: null, error: new Error(error.message) }
  }

  return { data: data as FeedbackItem, error: null }
}

/**
 * Update feedback item (general update)
 */
export async function updateFeedback(id: string, updates: Partial<FeedbackItem>): Promise<{
  data: FeedbackItem | null
  error: Error | null
}> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('feedback_items')
    .update(updates as FeedbackUpdateData as never)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return { data: null, error: new Error(error.message) }
  }

  return { data: data as FeedbackItem, error: null }
}

/**
 * Delete a feedback item
 */
export async function deleteFeedback(id: string): Promise<{
  data: { id: string } | null
  error: Error | null
}> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('feedback_items')
    .delete()
    .eq('id', id)
    .select('id')
    .single()

  if (error) {
    return { data: null, error: new Error(error.message) }
  }

  return { data: data as { id: string }, error: null }
}

/**
 * Insert a new feedback item (alias for createFeedback)
 */
export async function insertFeedback(input: CreateFeedbackInput): Promise<{
  data: FeedbackItem | null
  error: Error | null
}> {
  return createFeedback(input)
}
