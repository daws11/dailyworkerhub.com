import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/types'
import type {
  CommentWithAuthor,
  CommentNode,
  CommentsListResponse,
  CommentResponse,
} from './types'

type Comment = Database['public']['Tables']['comments']['Row']

export interface GetCommentsOptions {
  discussionId: string
  parentId?: string | null
  includeDeleted?: boolean
  sortBy?: 'newest' | 'oldest' | 'likes'
  limit?: number
  offset?: number
}

export interface CommentTreeOptions {
  discussionId: string
  maxDepth?: number
  sortBy?: 'newest' | 'oldest' | 'likes'
  includeDeleted?: boolean
}

/**
 * Build a nested tree structure from flat comments
 */
function buildCommentTree(
  comments: CommentWithAuthor[],
  parentId: string | null = null
): CommentNode[] {
  return comments
    .filter((comment) => comment.parent_id === parentId)
    .map((comment) => ({
      ...comment,
      replies: buildCommentTree(comments, comment.id),
    }))
}

/**
 * Flatten a comment tree into a list with depth information
 */
export function flattenCommentTree(
  nodes: CommentNode[],
  depth: number = 0
): (CommentNode & { depth: number })[] {
  const result: (CommentNode & { depth: number })[] = []

  for (const node of nodes) {
    result.push({ ...node, depth })
    result.push(...flattenCommentTree(node.replies, depth + 1))
  }

  return result
}

/**
 * Get all comments for a discussion with author info
 */
export async function getCommentsByDiscussion(
  discussionId: string,
  options: Omit<GetCommentsOptions, 'discussionId'> = {}
): Promise<{
  data: CommentWithAuthor[]
  error: Error | null
}> {
  const supabase = createClient()
  const { parentId, includeDeleted = false, sortBy = 'newest', limit = 50, offset = 0 } = options

  let query = supabase
    .from('comments')
    .select(`
      *,
      author:profiles!author_id (
        id,
        username,
        full_name,
        avatar_url
      )
    `)
    .eq('discussion_id', discussionId)

  // Filter by parent_id (null for root comments)
  if (parentId !== undefined) {
    if (parentId === null) {
      query = query.is('parent_id', null)
    } else {
      query = query.eq('parent_id', parentId)
    }
  }

  // Filter out deleted comments by default
  if (!includeDeleted) {
    query = query.is('deleted_at', null)
  }

  // Apply sorting
  if (sortBy === 'newest') {
    query = query.order('created_at', { ascending: false })
  } else if (sortBy === 'oldest') {
    query = query.order('created_at', { ascending: true })
  } else if (sortBy === 'likes') {
    query = query.order('likes_count', { ascending: false })
  }

  // Apply pagination
  query = query.range(offset, offset + limit - 1)

  const { data, error } = await query

  if (error) {
    return { data: [], error }
  }

  return { data: data as CommentWithAuthor[], error: null }
}

/**
 * Get a single comment by ID with author info
 */
export async function getCommentById(id: string): Promise<{
  data: CommentWithAuthor | null
  error: Error | null
}> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('comments')
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

  return { data: data as CommentWithAuthor, error: null }
}

/**
 * Get comment tree for a discussion (nested structure)
 */
export async function getCommentTree(
  options: CommentTreeOptions
): Promise<{
  data: CommentsListResponse
  error: Error | null
}> {
  const supabase = createClient()
  const { discussionId, maxDepth = 10, sortBy = 'newest', includeDeleted = false } = options

  let query = supabase
    .from('comments')
    .select(`
      *,
      author:profiles!author_id (
        id,
        username,
        full_name,
        avatar_url
      )
    `)
    .eq('discussion_id', discussionId)

  // Filter out deleted comments by default
  if (!includeDeleted) {
    query = query.is('deleted_at', null)
  }

  // Apply sorting
  if (sortBy === 'newest') {
    query = query.order('created_at', { ascending: false })
  } else if (sortBy === 'oldest') {
    query = query.order('created_at', { ascending: true })
  } else if (sortBy === 'likes') {
    query = query.order('likes_count', { ascending: false })
  }

  const { data, error } = await query

  if (error) {
    return { data: { data: [] }, error }
  }

  const comments = data as CommentWithAuthor[]

  // Build tree structure
  const tree = buildCommentTree(comments)

  // Limit depth if specified
  function limitDepth(nodes: CommentNode[], depth: number): CommentNode[] {
    if (depth >= maxDepth) {
      return nodes.map((node) => ({ ...node, replies: [] }))
    }
    return nodes.map((node) => ({
      ...node,
      replies: limitDepth(node.replies, depth + 1),
    }))
  }

  const result = limitDepth(tree, 0)

  return {
    data: {
      data: result,
      pagination: {
        page: 1,
        limit: comments.length,
        total: comments.length,
      },
    },
    error: null,
  }
}

/**
 * Get comments count for a discussion
 */
export async function getCommentsCount(
  discussionId: string,
  includeDeleted: boolean = false
): Promise<{
  data: number | null
  error: Error | null
}> {
  const supabase = createClient()

  let query = supabase
    .from('comments')
    .select('id', { count: 'exact', head: true })
    .eq('discussion_id', discussionId)

  if (!includeDeleted) {
    query = query.is('deleted_at', null)
  }

  const { count, error } = await query

  if (error) {
    return { data: null, error: new Error(error.message) }
  }

  return { data: count, error: null }
}

/**
 * Get solution comment for a discussion
 */
export async function getSolutionComment(
  discussionId: string
): Promise<{
  data: CommentWithAuthor | null
  error: Error | null
}> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('comments')
    .select(`
      *,
      author:profiles!author_id (
        id,
        username,
        full_name,
        avatar_url
      )
    `)
    .eq('discussion_id', discussionId)
    .eq('is_solution', true)
    .is('deleted_at', null)
    .single()

  if (error) {
    // If no solution found, that's okay - not an error
    if (error.code === 'PGRST116') {
      return { data: null, error: null }
    }
    return { data: null, error }
  }

  return { data: data as CommentWithAuthor, error: null }
}

/**
 * Get reply count for a comment
 */
export async function getReplyCount(
  commentId: string,
  includeDeleted: boolean = false
): Promise<{
  data: number | null
  error: Error | null
}> {
  const supabase = createClient()

  let query = supabase
    .from('comments')
    .select('id', { count: 'exact', head: true })
    .eq('parent_id', commentId)

  if (!includeDeleted) {
    query = query.is('deleted_at', null)
  }

  const { count, error } = await query

  if (error) {
    return { data: null, error: new Error(error.message) }
  }

  return { data: count, error: null }
}

/**
 * Get comments by author
 */
export async function getCommentsByAuthor(
  authorId: string,
  options: {
    sortBy?: 'newest' | 'oldest'
    limit?: number
    offset?: number
  } = {}
): Promise<{
  data: CommentWithAuthor[]
  error: Error | null
}> {
  const supabase = createClient()
  const { sortBy = 'newest', limit = 50, offset = 0 } = options

  let query = supabase
    .from('comments')
    .select(`
      *,
      author:profiles!author_id (
        id,
        username,
        full_name,
        avatar_url
      )
    `)
    .eq('author_id', authorId)
    .is('deleted_at', null)

  // Apply sorting
  if (sortBy === 'newest') {
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

  return { data: data as CommentWithAuthor[], error: null }
}