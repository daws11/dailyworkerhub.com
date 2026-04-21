import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/types'
import type {
  DiscussionWithAuthor,
  DiscussionListItem,
  CommentWithAuthor,
  CommentWithReplies,
  GetDiscussionsOptions,
  CreateDiscussionInput,
  CreateCommentInput,
  DiscussionResponse,
  DiscussionsResponse,
  CommentsResponse,
} from './types'

type Discussion = Database['public']['Tables']['discussions']['Row']
type Comment = Database['public']['Tables']['comments']['Row']

// Types for insert operations
type DiscussionInsertData = {
  title: string
  content: string
  slug: string
  excerpt: string
  author_id: string
  category_id: string | null
  metadata: Record<string, unknown>
}

type CommentInsertData = {
  content: string
  discussion_id: string
  author_id: string
  parent_id: string | null
  depth: number
}

type UpdateData = {
  title?: string
  content?: string
  status?: 'open' | 'closed' | 'solved'
  category_id?: string | null
  excerpt?: string
  is_solution?: boolean
}

// Supabase response types for custom selects
interface DiscussionWithRelations extends Omit<Discussion, 'metadata' | 'search_vector'> {
  author: DiscussionWithAuthor['author']
  category: DiscussionWithAuthor['category']
  metadata: Record<string, unknown>
}

interface CommentWithProfile extends Comment {
  author: CommentWithAuthor['author']
}

/**
 * Get discussions with optional filtering and sorting
 */
export async function getDiscussions(options: GetDiscussionsOptions = {}): Promise<DiscussionsResponse> {
  const supabase = createClient()

  const { categorySlug, status, sortBy = 'newest', limit = 20, offset = 0, search } = options

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
        color
      )
    `)

  // Apply filters
  if (categorySlug) {
    query = query.eq('category.slug', categorySlug)
  }
  if (status) {
    query = query.eq('status', status)
  }
  if (search) {
    query = query.ilike('title', `%${search}%`)
  }

  // Apply sorting
  if (sortBy === 'popular') {
    query = query.order('likes_count', { ascending: false })
  } else if (sortBy === 'active') {
    query = query.order('updated_at', { ascending: false })
  } else if (sortBy === 'oldest') {
    query = query.order('created_at', { ascending: true })
  } else {
    // Default: newest
    query = query.order('created_at', { ascending: false })
  }

  // Pin featured/pinned discussions first
  query = query.order('is_pinned', { ascending: false })
  query = query.order('is_featured', { ascending: false })

  // Apply pagination
  query = query.range(offset, offset + limit - 1)

  const { data, error } = await query

  if (error) {
    return { data: [], error: new Error(error.message) }
  }

  // Cast the data to our expected type
  const rawData = data as unknown as DiscussionWithRelations[] | null

  // Transform the data to match our types
  const discussions: DiscussionListItem[] = (rawData || []).map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    author_id: item.author_id,
    category_id: item.category_id,
    status: item.status,
    view_count: item.view_count,
    likes_count: item.likes_count,
    votes_count: item.votes_count,
    comments_count: item.comments_count,
    is_pinned: item.is_pinned,
    is_featured: item.is_featured,
    created_at: item.created_at,
    updated_at: item.updated_at,
    author: item.author,
    category: item.category,
    metadata: item.metadata,
  }))

  return { data: discussions, error: null }
}

/**
 * Get a single discussion by slug with author and category
 */
export async function getDiscussionBySlug(slug: string): Promise<DiscussionResponse> {
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
      ),
      category:categories!category_id (
        id,
        slug,
        name,
        color
      )
    `)
    .eq('slug', slug)
    .single()

  if (error) {
    return { data: null, error: new Error(error.message) }
  }

  const rawData = data as unknown as DiscussionWithRelations

  const discussion: DiscussionWithAuthor = {
    id: rawData.id,
    slug: rawData.slug,
    title: rawData.title,
    content: rawData.content,
    excerpt: rawData.excerpt,
    author_id: rawData.author_id,
    category_id: rawData.category_id,
    status: rawData.status,
    view_count: rawData.view_count,
    likes_count: rawData.likes_count,
    votes_count: rawData.votes_count,
    comments_count: rawData.comments_count,
    is_pinned: rawData.is_pinned,
    is_featured: rawData.is_featured,
    created_at: rawData.created_at,
    updated_at: rawData.updated_at,
    metadata: rawData.metadata,
    author: rawData.author,
    category: rawData.category,
  }

  return { data: discussion, error: null }
}

/**
 * Get discussion by ID with author and category
 */
export async function getDiscussionById(id: string): Promise<DiscussionResponse> {
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
      ),
      category:categories!category_id (
        id,
        slug,
        name,
        color
      )
    `)
    .eq('id', id)
    .single()

  if (error) {
    return { data: null, error: new Error(error.message) }
  }

  const rawData = data as unknown as DiscussionWithRelations

  const discussion: DiscussionWithAuthor = {
    id: rawData.id,
    slug: rawData.slug,
    title: rawData.title,
    content: rawData.content,
    excerpt: rawData.excerpt,
    author_id: rawData.author_id,
    category_id: rawData.category_id,
    status: rawData.status,
    view_count: rawData.view_count,
    likes_count: rawData.likes_count,
    votes_count: rawData.votes_count,
    comments_count: rawData.comments_count,
    is_pinned: rawData.is_pinned,
    is_featured: rawData.is_featured,
    created_at: rawData.created_at,
    updated_at: rawData.updated_at,
    metadata: rawData.metadata,
    author: rawData.author,
    category: rawData.category,
  }

  return { data: discussion, error: null }
}

/**
 * Get comments for a discussion with author info
 */
export async function getComments(discussionId: string, limit = 50, offset = 0): Promise<CommentsResponse> {
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
    .order('created_at', { ascending: true })
    .range(offset, offset + limit - 1)

  if (error) {
    return { data: [], error: new Error(error.message) }
  }

  const rawData = data as unknown as CommentWithAuthor[] | null

  return { data: rawData || [], error: null }
}

/**
 * Get comments with nested replies
 */
export async function getCommentsWithReplies(discussionId: string, limit = 50): Promise<{
  data: CommentWithReplies[]
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
    .order('created_at', { ascending: true })

  if (error) {
    return { data: [], error: new Error(error.message) }
  }

  const comments = (data as unknown as CommentWithProfile[] | null) || []

  // Build a tree structure
  const commentMap = new Map<string, CommentWithReplies>()
  const rootComments: CommentWithReplies[] = []

  // First pass: create all comment nodes
  comments.forEach((comment) => {
    commentMap.set(comment.id, { ...comment, replies: [] })
  })

  // Second pass: organize into tree
  comments.forEach((comment) => {
    const node = commentMap.get(comment.id)!
    if (comment.parent_id && commentMap.has(comment.parent_id)) {
      commentMap.get(comment.parent_id)!.replies.push(node)
    } else {
      rootComments.push(node)
    }
  })

  // Limit root comments
  const limitedRootComments = rootComments.slice(0, limit)

  return { data: limitedRootComments, error: null }
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

  const typedData = data as unknown as { status: 'open' | 'closed' | 'solved' }[] | null
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
 * Create a new discussion
 */
export async function createDiscussion(
  input: CreateDiscussionInput,
  authorId: string
): Promise<{ data: Discussion | null; error: Error | null }> {
  const supabase = createClient()

  // Generate slug from title
  const slug = input.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    + '-' + Date.now().toString(36)

  const insertData: DiscussionInsertData = {
    title: input.title,
    content: input.content,
    slug,
    excerpt: input.content.slice(0, 200).replace(/<[^>]*>/g, '') + '...',
    author_id: authorId,
    category_id: input.categoryId || null,
    metadata: input.metadata || {},
  }

  const { data, error } = await supabase
    .from('discussions')
    .insert(insertData as unknown as never)
    .select()
    .single()

  if (error) {
    return { data: null, error: new Error(error.message) }
  }

  return { data: data as Discussion, error: null }
}

/**
 * Update a discussion
 */
export async function updateDiscussion(
  id: string,
  updates: { title?: string; content?: string; status?: Discussion['status']; category_id?: string | null }
): Promise<{ data: Discussion | null; error: Error | null }> {
  const supabase = createClient()

  // Build update object
  const updateData: UpdateData = { ...updates }

  // If content is updated, regenerate excerpt
  if (updates.content) {
    updateData.excerpt = updates.content.slice(0, 200).replace(/<[^>]*>/g, '') + '...'
  }

  const { data, error } = await supabase
    .from('discussions')
    .update(updateData as never)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return { data: null, error: new Error(error.message) }
  }

  return { data: data as Discussion, error: null }
}

/**
 * Delete a discussion
 */
export async function deleteDiscussion(id: string): Promise<{ error: Error | null }> {
  const supabase = createClient()

  const { error } = await supabase
    .from('discussions')
    .delete()
    .eq('id', id)

  if (error) {
    return { error: new Error(error.message) }
  }

  return { error: null }
}

/**
 * Create a new comment
 */
export async function createComment(
  input: CreateCommentInput,
  authorId: string
): Promise<{ data: CommentWithAuthor | null; error: Error | null }> {
  const supabase = createClient()

  // Calculate depth based on parent
  let depth = 0
  if (input.parentId) {
    const { data: parent } = await supabase
      .from('comments')
      .select('depth')
      .eq('id', input.parentId)
      .single()

    if (parent) {
      depth = (parent as { depth: number }).depth + 1
    }
  }

  const insertData: CommentInsertData = {
    content: input.content,
    discussion_id: input.discussionId,
    author_id: authorId,
    parent_id: input.parentId || null,
    depth,
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

  return { data: data as unknown as CommentWithAuthor, error: null }
}

/**
 * Update a comment
 */
export async function updateComment(
  id: string,
  content: string
): Promise<{ data: CommentWithAuthor | null; error: Error | null }> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('comments')
    .update({ content } as never)
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

  return { data: data as unknown as CommentWithAuthor, error: null }
}

/**
 * Delete a comment
 */
export async function deleteComment(id: string): Promise<{ error: Error | null }> {
  const supabase = createClient()

  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', id)

  if (error) {
    return { error: new Error(error.message) }
  }

  return { error: null }
}

/**
 * Mark a comment as solution
 */
export async function markCommentAsSolution(
  commentId: string,
  discussionId: string
): Promise<{ error: Error | null }> {
  const supabase = createClient()

  // First, remove any existing solution on this discussion
  await supabase
    .from('comments')
    .update({ is_solution: false } as never)
    .eq('discussion_id', discussionId)

  // Mark the new solution
  const { error: solutionError } = await supabase
    .from('comments')
    .update({ is_solution: true } as never)
    .eq('id', commentId)

  if (solutionError) {
    return { error: new Error(solutionError.message) }
  }

  // Update discussion status to solved
  const { error: statusError } = await supabase
    .from('discussions')
    .update({ status: 'solved' } as never)
    .eq('id', discussionId)

  if (statusError) {
    return { error: new Error(statusError.message) }
  }

  return { error: null }
}

/**
 * Increment discussion view count
 * Note: This is a fire-and-forget operation that can be implemented
 * with a database trigger or background job in production
 */
export async function incrementViewCount(_slug: string): Promise<void> {
  // View count increment would typically be handled by a database trigger
  // or a background job. This is a placeholder that can be implemented later.
}
