import type { Database } from '@/lib/supabase/types'

type Comment = Database['public']['Tables']['comments']['Row']
type Profile = Database['public']['Tables']['profiles']['Row']

/**
 * Comment with author information joined
 * Used for API responses and tree building
 */
export interface CommentWithAuthor extends Comment {
  author: Profile
}

/**
 * Nested comment node for tree structure
 * Used for tree-structured API responses
 */
export interface CommentNode extends CommentWithAuthor {
  replies: CommentNode[]
}

/**
 * Parsed @mention from comment content
 */
export interface ParsedMention {
  username: string
  startIndex: number
  endIndex: number
}

/**
 * Flattened comment for display (with depth information)
 * Used when rendering flat list from tree structure
 */
export interface FlattenedComment extends CommentNode {
  depth: number
}

/**
 * API response wrapper for comments list
 */
export interface CommentsListResponse {
  data: CommentNode[]
  pagination?: {
    page: number
    limit: number
    total: number
  }
}

/**
 * API response wrapper for single comment
 */
export interface CommentResponse {
  data: CommentWithAuthor
}
