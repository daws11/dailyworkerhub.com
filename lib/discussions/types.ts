import type { Database } from '@/lib/supabase/types'

type Discussion = Database['public']['Tables']['discussions']['Row']
type DiscussionAuthor = Database['public']['Tables']['profiles']['Row']
type DiscussionComment = Database['public']['Tables']['comments']['Row']
type DiscussionCategory = Database['public']['Tables']['categories']['Row']
type Tag = Database['public']['Tables']['tags']['Row']

export interface DiscussionWithAuthor extends Discussion {
  author: DiscussionAuthor | null
}

export interface DiscussionWithDetails extends Discussion {
  author: DiscussionAuthor | null
  category: DiscussionCategory | null
  tags: Tag[]
}

export interface DiscussionCommentWithAuthor extends DiscussionComment {
  author: DiscussionAuthor | null
}

export type DiscussionStatus = Discussion['status']

export type GetDiscussionsSortBy = 'newest' | 'oldest' | 'popular' | 'active'

export interface GetDiscussionsOptions {
  categoryId?: string
  authorId?: string
  status?: DiscussionStatus
  search?: string
  sortBy?: GetDiscussionsSortBy
  limit?: number
  offset?: number
}

export interface CreateDiscussionInput {
  title: string
  content: string
  slug: string
  author_id: string
  category_id?: string | null
  status?: DiscussionStatus
  is_pinned?: boolean
  is_featured?: boolean
  metadata?: Record<string, unknown>
}

export interface UpdateDiscussionInput {
  title?: string
  content?: string
  slug?: string
  category_id?: string | null
  status?: DiscussionStatus
  is_pinned?: boolean
  is_featured?: boolean
  metadata?: Record<string, unknown>
}
