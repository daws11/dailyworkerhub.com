import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/types'
import type { CommentWithAuthor } from './types'
import { calculateDepth } from './schemas'

type Comment = Database['public']['Tables']['comments']['Row']

// Type for insert operations
type CommentInsertData = {
  content: string
  author_id: string
  discussion_id: string
  parent_id: string | null
  depth: number
  is_solution: boolean
  likes_count: number
  deleted_at: string | null
}

// Type for update operations
type CommentUpdateData = {
  content?: string
  is_solution?: boolean
  likes_count?: number
  deleted_at?: string | null
}

export interface CreateCommentInput {
  content: string
  author_id: string
  discussion_id: string
  parent_id?: string | null
  parent_depth?: number | null
}

export interface UpdateCommentInput {
  id: string
  content: string
}

export interface SolutionInput {
  id: string
  discussion_id: string
}

/**
 * Create a new comment
 */
export async function createComment(input: CreateCommentInput): Promise<{
  data: CommentWithAuthor | null
  error: Error | null
}> {
  const supabase = createClient()

  const depth = calculateDepth(input.parent_id ?? null, input.parent_depth ?? null)

  const insertData: CommentInsertData = {
    content: input.content,
    author_id: input.author_id,
    discussion_id: input.discussion_id,
    parent_id: input.parent_id ?? null,
    depth,
    is_solution: false,
    likes_count: 0,
    deleted_at: null,
  }

  const { data, error } = await supabase
    .from('comments')
    .insert(insertData as unknown as never)
    .select(`
      *,
      author:profiles!author_id (
        id,
        username,
        full_name,
        avatar_url
      )
    `)
    .single()

  if (error) {
    return { data: null, error: new Error(error.message) }
  }

  return { data: data as CommentWithAuthor, error: null }
}

/**
 * Update a comment's content
 */
export async function updateComment(input: UpdateCommentInput): Promise<{
  data: CommentWithAuthor | null
  error: Error | null
}> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('comments')
    .update({ content: input.content } as CommentUpdateData as never)
    .eq('id', input.id)
    .select(`
      *,
      author:profiles!author_id (
        id,
        username,
        full_name,
        avatar_url
      )
    `)
    .single()

  if (error) {
    return { data: null, error: new Error(error.message) }
  }

  return { data: data as CommentWithAuthor, error: null }
}

/**
 * Soft delete a comment (set deleted_at timestamp)
 */
export async function deleteComment(id: string): Promise<{
  data: { id: string } | null
  error: Error | null
}> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('comments')
    .update({ deleted_at: new Date().toISOString() } as CommentUpdateData as never)
    .eq('id', id)
    .select('id')
    .single()

  if (error) {
    return { data: null, error: new Error(error.message) }
  }

  return { data: data as { id: string }, error: null }
}

/**
 * Mark a comment as the solution for a discussion
 * Note: This will unmark any existing solution comment for the discussion
 */
export async function markAsSolution(input: SolutionInput): Promise<{
  data: CommentWithAuthor | null
  error: Error | null
}> {
  const supabase = createClient()

  // First, unmark any existing solution for this discussion
  const { error: unmarkError } = await supabase
    .from('comments')
    .update({ is_solution: false } as CommentUpdateData as never)
    .eq('discussion_id', input.discussion_id)
    .eq('is_solution', true)

  if (unmarkError) {
    return { data: null, error: new Error(unmarkError.message) }
  }

  // Mark the new solution
  const { data, error } = await supabase
    .from('comments')
    .update({ is_solution: true } as CommentUpdateData as never)
    .eq('id', input.id)
    .select(`
      *,
      author:profiles!author_id (
        id,
        username,
        full_name,
        avatar_url
      )
    `)
    .single()

  if (error) {
    return { data: null, error: new Error(error.message) }
  }

  return { data: data as CommentWithAuthor, error: null }
}

/**
 * Remove solution status from a comment
 */
export async function unmarkAsSolution(id: string): Promise<{
  data: CommentWithAuthor | null
  error: Error | null
}> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('comments')
    .update({ is_solution: false } as CommentUpdateData as never)
    .eq('id', id)
    .select(`
      *,
      author:profiles!author_id (
        id,
        username,
        full_name,
        avatar_url
      )
    `)
    .single()

  if (error) {
    return { data: null, error: new Error(error.message) }
  }

  return { data: data as CommentWithAuthor, error: null }
}

/**
 * Insert a new comment (alias for createComment)
 */
export async function insertComment(input: CreateCommentInput): Promise<{
  data: CommentWithAuthor | null
  error: Error | null
}> {
  return createComment(input)
}
