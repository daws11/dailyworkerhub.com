import { z } from 'zod'
import type { Database } from '@/lib/supabase/types'

type CommentRow = Database['public']['Tables']['comments']['Row']

// Validation constants
const MAX_CONTENT_LENGTH = 10000
const MIN_CONTENT_LENGTH = 1

/**
 * Zod schema for creating a new comment
 * Used for POST /api/discussions/[id]/comments
 */
export const createCommentSchema = z.object({
  content: z
    .string()
    .min(MIN_CONTENT_LENGTH, 'Content is required')
    .max(MAX_CONTENT_LENGTH, `Content must be less than ${MAX_CONTENT_LENGTH} characters`),
  parent_id: z.string().uuid('Invalid parent ID format').nullable().optional(),
})

export type CreateCommentInput = z.infer<typeof createCommentSchema>

/**
 * Zod schema for updating a comment
 * Used for PUT /api/comments/[id]
 */
export const updateCommentSchema = z.object({
  content: z
    .string()
    .min(MIN_CONTENT_LENGTH, 'Content is required')
    .max(MAX_CONTENT_LENGTH, `Content must be less than ${MAX_CONTENT_LENGTH} characters`),
})

export type UpdateCommentInput = z.infer<typeof updateCommentSchema>

/**
 * Zod schema for list query parameters
 * Used for GET /api/discussions/[id]/comments
 */
export const listCommentsSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  maxDepth: z.coerce.number().int().min(0).max(1).default(1).optional(),
})

export type ListCommentsParams = z.infer<typeof listCommentsSchema>

/**
 * Schema for reply validation (checking max depth)
 * Rejects creating a reply to a reply (depth 1 -> cannot create depth 2)
 */
export const replySchema = z.object({
  parent_id: z.string().uuid('Invalid parent ID format'),
  depth: z.number().max(1, 'Maximum nesting depth exceeded'),
})

export type ReplyValidationInput = z.infer<typeof replySchema>

/**
 * Helper function to validate max depth for creating replies
 * @param parentDepth - The depth of the parent comment (0 or 1)
 * @returns true if a reply can be created
 */
export function canCreateReply(parentDepth: number | null): boolean {
  // Can only reply to depth 0 comments (top-level)
  // Cannot reply to replies (depth 1)
  return parentDepth === null || parentDepth === 0
}

/**
 * Calculate depth for a new comment based on parent
 * @param parentId - The parent comment ID (null for top-level)
 * @param parentDepth - The depth of the parent comment
 * @returns The depth for the new comment
 */
export function calculateDepth(parentId: string | null, parentDepth: number | null): number {
  if (!parentId) return 0
  return (parentDepth ?? 0) + 1
}