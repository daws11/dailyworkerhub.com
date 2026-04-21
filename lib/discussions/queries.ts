import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/types'
import type {
  DiscussionWithAuthor,
  DiscussionWithDetails,
  DiscussionCommentWithAuthor,
  GetDiscussionsOptions,
  DiscussionStatus,
} from './types'

type Discussion = Database['public']['Tables']['discussions']['Row']
type DiscussionComment = Database['public']['Tables']['comments']['Row']

// Type for selected columns response (used in stats)
type DiscussionStatusResponse = {
  status: Discussion['status']
}[]

/**
 * Get all discussions with optional filtering and sorting
 */
export async function getDiscussions(options: GetDiscussionsOptions = {}): Promise<{
  data: DiscussionWithAuthor[]
  error: Error | null
}> {
  const supabase = createClient()

  const {
    categoryId,
    authorId,
    status,
    sortBy = 'newest',
    limit = 50,
    offset = 0,
  } = options

  let query = supabase
    .from('discussions')
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
  if (categoryId) {
    query = query.eq('category_id', categoryId)
  }
  if (authorId) {
    query = query.eq('author_id', authorId)
  }

  // Apply sorting
  if (sortBy === 'newest') {
    query = query.order('created_at', { ascending: false })
  } else if (sortBy === 'oldest') {
    query = query.order('created_at', { ascending: true })
  } else if (sortBy === 'popular') {
    query = query.order('likes_count', { ascending: false })
  } else if (sortBy === 'active') {
    query = query.order('updated_at', { ascending: false })
  }

  // Apply pagination
  query = query.range(offset, offset + limit - 1)

  const { data, error } = await query

  if (error) {
    return { data: [], error }
  }

  return { data: data as DiscussionWithAuthor[], error: null }
}

/**
 * Get a single discussion by ID with author info
 */
export async function getDiscussionById(id: string): Promise<{
  data: DiscussionWithAuthor | null
  error: Error | null
}> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('discussions')
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

  return { data: data as DiscussionWithAuthor, error: null }
}

/**
 * Get a single discussion by slug with author info
 */
export async function getDiscussionBySlug(slug: string): Promise<{
  data: DiscussionWithAuthor | null
  error: Error | null
}> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('discussions')
    .select(`
      *,
      author:profiles!author_id (
        id,
        username,
        full_name,
        avatar_url
      )
    `)
    .eq('slug', slug)
    .single()

  if (error) {
    return { data: null, error }
  }

  return { data: data as DiscussionWithAuthor, error: null }
}

/**
 * Get discussions with full details (author, category, tags)
 */
export async function getDiscussionsWithDetails(options: GetDiscussionsOptions = {}): Promise<{
  data: DiscussionWithDetails[]
  error: Error | null
}> {
  const supabase = createClient()

  const {
    categoryId,
    authorId,
    status,
    sortBy = 'newest',
    limit = 50,
    offset = 0,
  } = options

  let query = supabase
    .from('discussions')
    .select(`
      *,
      author:profiles!author_id (
        id,
        username,
        full_name,
        avatar_url
      ),
      category:categories!category_id (
        id,
        slug,
        name,
        description,
        type,
        icon,
        color,
        sort_order,
        created_at
      ),
      discussion_tags(
        tag:tags(
          id,
          name,
          slug,
          created_at
        )
      )
    `)

  // Apply filters
  if (status) {
    query = query.eq('status', status)
  }
  if (categoryId) {
    query = query.eq('category_id', categoryId)
  }
  if (authorId) {
    query = query.eq('author_id', authorId)
  }

  // Apply sorting
  if (sortBy === 'newest') {
    query = query.order('created_at', { ascending: false })
  } else if (sortBy === 'oldest') {
    query = query.order('created_at', { ascending: true })
  } else if (sortBy === 'popular') {
    query = query.order('likes_count', { ascending: false })
  } else if (sortBy === 'active') {
    query = query.order('updated_at', { ascending: false })
  }

  // Apply pagination
  query = query.range(offset, offset + limit - 1)

  const { data, error } = await query

  if (error) {
    return { data: [], error }
  }

  // Transform the nested discussion_tags to extract tags array
  const discussionsWithTags = data.map((discussion) => {
    const tags = discussion.discussion_tags?.map(
      (dt: { tag: Database['public']['Tables']['tags']['Row'] }) => dt.tag
    ) || []
    const { discussion_tags: _, ...rest } = discussion as { discussion_tags?: unknown } & Omit<typeof discussion, 'discussion_tags'>
    return { ...rest, tags }
  })

  return { data: discussionsWithTags as DiscussionWithDetails[], error: null }
}

/**
 * Get comments for a discussion
 */
export async function getDiscussionComments(
  discussionId: string,
  options: { limit?: number; offset?: number } = {}
): Promise<{
  data: DiscussionCommentWithAuthor[]
  error: Error | null
}> {
  const supabase = createClient()

  const { limit = 50, offset = 0 } = options

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
    .order('created_at', { ascending: true })
    .range(offset, offset + limit - 1)

  if (error) {
    return { data: [], error }
  }

  return { data: data as DiscussionCommentWithAuthor[], error: null }
}

/**
 * Get discussion statistics
 */
export async function getDiscussionStats(): Promise<{
  data: {
    total: number
    open: number
    closed: number
    solved: number
  } | null
  error: Error | null
}> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('discussions')
    .select('status')

  if (error) {
    return { data: null, error: new Error(error.message) }
  }

  const typedData = data as unknown as DiscussionStatusResponse
  if (!typedData) {
    return { data: null, error: null }
  }

  const stats = {
    total: typedData.length,
    open: typedData.filter((item) => item.status === 'open').length,
    closed: typedData.filter((item) => item.status === 'closed').length,
    solved: typedData.filter((item) => item.status === 'solved').length,
  }

  return { data: stats, error: null }
}

/**
 * Search discussions by title or content
 */
export async function searchDiscussions(
  query: string,
  options: { limit?: number; offset?: number } = {}
): Promise<{
  data: DiscussionWithAuthor[]
  error: Error | null
}> {
  const supabase = createClient()

  const { limit = 50, offset = 0 } = options

  const { data, error } = await supabase
    .from('discussions')
    .select(`
      *,
      author:profiles!author_id (
        id,
        username,
        full_name,
        avatar_url
      )
    `)
    .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    return { data: [], error }
  }

  return { data: data as DiscussionWithAuthor[], error: null }
}