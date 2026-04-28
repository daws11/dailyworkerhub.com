import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/types'
import type {
  CreateDiscussionInput,
  UpdateDiscussionInput,
  DiscussionWithAuthor,
} from './types'

type Discussion = Database['public']['Tables']['discussions']['Row']

// Type for insert operations
type DiscussionInsertData = {
  title: string
  content: string
  slug: string
  author_id: string
  category_id?: string | null
  status?: 'open' | 'closed' | 'solved'
  view_count?: number
  likes_count?: number
  votes_count?: number
  comments_count?: number
  is_pinned?: boolean
  is_featured?: boolean
  metadata?: Record<string, unknown>
  excerpt?: string
  deleted_at?: string | null
}

// Type for update operations
type DiscussionUpdateData = {
  title?: string
  content?: string
  slug?: string
  category_id?: string | null
  status?: 'open' | 'closed' | 'solved'
  view_count?: number
  likes_count?: number
  votes_count?: number
  comments_count?: number
  is_pinned?: boolean
  is_featured?: boolean
  metadata?: Record<string, unknown>
  excerpt?: string
  updated_at?: string
}

export interface CreateDiscussionInputValidated {
  title: string
  content: string
  slug: string
  category_id?: string | null
  status?: 'open' | 'closed' | 'solved'
  is_pinned?: boolean
  is_featured?: boolean
  metadata?: Record<string, unknown>
}

export interface UpdateDiscussionInputValidated {
  title?: string
  content?: string
  slug?: string
  category_id?: string | null
  status?: 'open' | 'closed' | 'solved'
  is_pinned?: boolean
  is_featured?: boolean
  metadata?: Record<string, unknown>
}

/**
 * Create a new discussion
 */
export async function createDiscussion(input: CreateDiscussionInput): Promise<{
  data: Discussion | null
  error: Error | null
}> {
  const supabase = createClient()

  // Generate excerpt from content (first 160 chars)
  const excerpt = input.content.substring(0, 160)

  const insertData: DiscussionInsertData = {
    title: input.title,
    content: input.content,
    slug: input.slug,
    author_id: input.author_id,
    category_id: input.category_id ?? null,
    status: input.status ?? 'open',
    is_pinned: input.is_pinned ?? false,
    is_featured: input.is_featured ?? false,
    metadata: input.metadata ?? {},
    excerpt,
    view_count: 0,
    likes_count: 0,
    votes_count: 0,
    comments_count: 0,
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
 * Create a new discussion with validated input (from Zod schema)
 */
export async function createDiscussionValidated(
  input: CreateDiscussionInputValidated,
  authorId: string
): Promise<{
  data: Discussion | null
  error: Error | null
}> {
  const supabase = createClient()

  // Generate excerpt from content (first 160 chars)
  const excerpt = input.content.substring(0, 160)

  const insertData: DiscussionInsertData = {
    title: input.title,
    content: input.content,
    slug: input.slug,
    author_id: authorId,
    category_id: input.category_id ?? null,
    status: input.status ?? 'open',
    is_pinned: input.is_pinned ?? false,
    is_featured: input.is_featured ?? false,
    metadata: input.metadata ?? {},
    excerpt,
    view_count: 0,
    likes_count: 0,
    votes_count: 0,
    comments_count: 0,
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
 * Update an existing discussion
 */
export async function updateDiscussion(
  id: string,
  updates: UpdateDiscussionInput
): Promise<{
  data: Discussion | null
  error: Error | null
}> {
  const supabase = createClient()

  // If content is being updated, regenerate excerpt
  const updateData: DiscussionUpdateData = { ...updates }
  if (updates.content) {
    updateData.excerpt = updates.content.substring(0, 160)
  }

  const { data, error } = await supabase
    .from('discussions')
    .update(updateData as unknown as never)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return { data: null, error: new Error(error.message) }
  }

  return { data: data as Discussion, error: null }
}

/**
 * Update discussion with validated input (from Zod schema)
 */
export async function updateDiscussionValidated(
  id: string,
  input: UpdateDiscussionInputValidated
): Promise<{
  data: Discussion | null
  error: Error | null
}> {
  const supabase = createClient()

  // If content is being updated, regenerate excerpt
  const updateData: DiscussionUpdateData = { ...input }
  if (input.content) {
    updateData.excerpt = input.content.substring(0, 160)
  }

  const { data, error } = await supabase
    .from('discussions')
    .update(updateData as unknown as never)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return { data: null, error: new Error(error.message) }
  }

  return { data: data as Discussion, error: null }
}

/**
 * Soft delete a discussion (set deleted_at timestamp)
 */
export async function deleteDiscussion(id: string): Promise<{
  data: Discussion | null
  error: Error | null
}> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('discussions')
    .update({ deleted_at: new Date().toISOString() } as unknown as never)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return { data: null, error: new Error(error.message) }
  }

  return { data: data as Discussion, error: null }
}

/**
 * Restore a soft-deleted discussion (clear deleted_at)
 */
export async function restoreDiscussion(id: string): Promise<{
  data: Discussion | null
  error: Error | null
}> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('discussions')
    .update({ deleted_at: null } as unknown as never)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return { data: null, error: new Error(error.message) }
  }

  return { data: data as Discussion, error: null }
}

/**
 * Increment view count for a discussion
 */
export async function incrementViewCount(id: string): Promise<{
  data: Discussion | null
  error: Error | null
}> {
  const supabase = createClient()

  const { data, error } = await supabase.rpc('increment_discussion_view_count', {
    discussion_id: id,
  })

  if (error) {
    // Fallback: try direct update
    const { data: discussion, error: fetchError } = await supabase
      .from('discussions')
      .select('view_count')
      .eq('id', id)
      .single()

    if (fetchError) {
      return { data: null, error: new Error(fetchError.message) }
    }

    const { data: updated, error: updateError } = await supabase
      .from('discussions')
      .update({ view_count: (discussion.view_count || 0) + 1 } as unknown as never)
      .eq('id', id)
      .select()
      .single()

    if (updateError) {
      return { data: null, error: new Error(updateError.message) }
    }

    return { data: updated as Discussion, error: null }
  }

  return { data: data as Discussion, error: null }
}

/**
 * Insert a new discussion (alias for createDiscussion)
 */
export async function insertDiscussion(input: CreateDiscussionInput): Promise<{
  data: Discussion | null
  error: Error | null
}> {
  return createDiscussion(input)
}
