import type { Database } from '@/lib/supabase/types'

// Base types from database
type DiscussionRow = Database['public']['Tables']['discussions']['Row']
type DiscussionInsert = Database['public']['Tables']['discussions']['Insert']
type CommentRow = Database['public']['Tables']['comments']['Row']
type CommentInsert = Database['public']['Tables']['comments']['Insert']
type Profile = Database['public']['Tables']['profiles']['Row']
type Category = Database['public']['Tables']['categories']['Row']

// Author type for discussions and comments
export interface DiscussionAuthor {
  id: string
  username: string
  full_name: string | null
  avatar_url: string | null
}

// Category info embedded in discussion response
export interface DiscussionCategory {
  id: string
  slug: string
  name: string
  color: string | null
}

// Discussion with author and category (for detail view)
export interface DiscussionWithAuthor extends Omit<DiscussionRow, 'metadata' | 'search_vector'> {
  author: DiscussionAuthor
  category: DiscussionCategory | null
  metadata: Record<string, unknown>
}

// Discussion list item (without full content, for list views)
export type DiscussionListItem = Omit<DiscussionWithAuthor, 'content'>

// Comment with author info
export interface CommentWithAuthor extends CommentRow {
  author: Profile
}

// Comment with nested replies (for tree display)
export interface CommentWithReplies extends CommentWithAuthor {
  replies: CommentWithReplies[]
}

// Options for fetching discussions
export interface GetDiscussionsOptions {
  categorySlug?: string
  status?: DiscussionRow['status']
  sortBy?: 'newest' | 'oldest' | 'popular' | 'active'
  limit?: number
  offset?: number
  search?: string
}

// Options for fetching comments
export interface GetCommentsOptions {
  discussionId: string
  limit?: number
  offset?: number
}

// API response types
export interface DiscussionsResponse {
  data: DiscussionListItem[]
  error: Error | null
}

export interface DiscussionResponse {
  data: DiscussionWithAuthor | null
  error: Error | null
}

export interface CommentsResponse {
  data: CommentWithAuthor[]
  error: Error | null
}

// Input types for mutations
export interface CreateDiscussionInput {
  title: string
  content: string
  categoryId?: string
  metadata?: Record<string, unknown>
}

export interface CreateCommentInput {
  content: string
  discussionId: string
  parentId?: string | null
}

// Discussion status type for type-safe status checks
export type DiscussionStatus = DiscussionRow['status']

// Comment status helpers
export interface CommentLikeInfo {
  liked: boolean
  likeCount: number
}
