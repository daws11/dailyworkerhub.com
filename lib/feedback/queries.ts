import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/types'

type FeedbackItem = Database['public']['Tables']['feedback_items']['Row']
type FeedbackAuthor = Database['public']['Tables']['profiles']['Row']

export interface FeedbackItemWithAuthor extends FeedbackItem {
  author: FeedbackAuthor | null
}

export interface GetFeedbackOptions {
  status?: FeedbackItem['status']
  category?: FeedbackItem['category']
  sortBy?: 'votes' | 'newest' | 'oldest'
  limit?: number
  offset?: number
}

/**
 * Get all feedback items with optional filtering and sorting
 */
export async function getFeedbackItems(options: GetFeedbackOptions = {}): Promise<{
  data: FeedbackItemWithAuthor[]
  error: Error | null
}> {
  const supabase = createClient()

  const { status, category, sortBy = 'votes', limit = 50, offset = 0 } = options

  let query = supabase
    .from('feedback_items')
    .select(`
      *,
      author:profiles!author_id (
        id,
        username,
        full_name,
        avatar_url
      )
    `)

  // Apply filters
  if (status) {
    query = query.eq('status', status)
  }
  if (category) {
    query = query.eq('category', category)
  }

  // Apply sorting
  if (sortBy === 'votes') {
    query = query.order('votes_count', { ascending: false })
  } else if (sortBy === 'newest') {
    query = query.order('created_at', { ascending: false })
  } else if (sortBy === 'oldest') {
    query = query.order('created_at', { ascending: true })
  }

  // Apply pagination
  query = query.range(offset, offset + limit - 1)

  const { data, error } = await query

  if (error) {
    return { data: [], error }
  }

  return { data: data as FeedbackItemWithAuthor[], error: null }
}

/**
 * Get a single feedback item by ID with author info
 */
export async function getFeedbackById(id: string): Promise<{
  data: FeedbackItemWithAuthor | null
  error: Error | null
}> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('feedback_items')
    .select(`
      *,
      author:profiles!author_id (
        id,
        username,
        full_name,
        avatar_url
      )
    `)
    .eq('id', id)
    .single()

  if (error) {
    return { data: null, error }
  }

  return { data: data as FeedbackItemWithAuthor, error: null }
}

/**
 * Get feedback item with full author details
 */
export async function getFeedbackWithAuthor(id: string): Promise<{
  data: FeedbackItemWithAuthor | null
  error: Error | null
}> {
  return getFeedbackById(id)
}

// Type for selected columns response
type FeedbackStatusResponse = {
  status: FeedbackItem['status']
}[]

/**
 * Get feedback statistics
 */
export async function getFeedbackStats(): Promise<{
  data: {
    total: number
    under_review: number
    planned: number
    in_progress: number
    completed: number
    declined: number
  } | null
  error: Error | null
}> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('feedback_items')
    .select('status')

  if (error) {
    return { data: null, error: new Error(error.message) }
  }

  const typedData = data as unknown as FeedbackStatusResponse
  if (!typedData) {
    return { data: null, error: null }
  }

  const stats = {
    total: typedData.length,
    under_review: typedData.filter((item) => item.status === 'under_review').length,
    planned: typedData.filter((item) => item.status === 'planned').length,
    in_progress: typedData.filter((item) => item.status === 'in_progress').length,
    completed: typedData.filter((item) => item.status === 'completed').length,
    declined: typedData.filter((item) => item.status === 'declined').length,
  }

  return { data: stats, error: null }
}