import { z } from 'zod'

// Status enum for discussions
const discussionStatusEnum = z.enum(['open', 'closed', 'solved'])

// Sort options for listing discussions
const sortByEnum = z.enum(['newest', 'oldest', 'popular', 'active'])

// Schema for creating a new discussion
export const createDiscussionSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be less than 200 characters'),
  content: z
    .string()
    .min(10, 'Content must be at least 10 characters')
    .max(50000, 'Content must be less than 50000 characters'),
  slug: z
    .string()
    .min(3, 'Slug must be at least 3 characters')
    .max(200, 'Slug must be less than 200 characters')
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Slug must be lowercase alphanumeric with hyphens only'
    ),
  category_id: z.string().uuid('Invalid category ID').nullable().optional(),
  status: discussionStatusEnum.optional().default('open'),
  is_pinned: z.boolean().optional().default(false),
  is_featured: z.boolean().optional().default(false),
  metadata: z.record(z.unknown()).optional(),
})

// Schema for updating an existing discussion
export const updateDiscussionSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be less than 200 characters')
    .optional(),
  content: z
    .string()
    .min(10, 'Content must be at least 10 characters')
    .max(50000, 'Content must be less than 50000 characters')
    .optional(),
  slug: z
    .string()
    .min(3, 'Slug must be at least 3 characters')
    .max(200, 'Slug must be less than 200 characters')
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Slug must be lowercase alphanumeric with hyphens only'
    )
    .optional(),
  category_id: z.string().uuid('Invalid category ID').nullable().optional(),
  status: discussionStatusEnum.optional(),
  is_pinned: z.boolean().optional(),
  is_featured: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
})

// Schema for listing discussions (query parameters)
export const listDiscussionsSchema = z.object({
  category: z.string().uuid('Invalid category ID').optional(),
  status: discussionStatusEnum.optional(),
  search: z
    .string()
    .max(200, 'Search query must be less than 200 characters')
    .optional(),
  sortBy: sortByEnum.optional().default('newest'),
  page: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().positive('Page must be a positive integer'))
    .optional()
    .default('1'),
  limit: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(
      z
        .number()
        .int()
        .positive('Limit must be a positive integer')
        .max(100, 'Limit cannot exceed 100')
    )
    .optional()
    .default('10'),
})

// Schema for getting a single discussion (path parameters)
export const getDiscussionSchema = z.object({
  id: z.string().uuid('Invalid discussion ID'),
})

// Schema for deleting a discussion (path parameters)
export const deleteDiscussionSchema = z.object({
  id: z.string().uuid('Invalid discussion ID'),
})

// Type exports inferred from schemas
export type CreateDiscussionInput = z.infer<typeof createDiscussionSchema>
export type UpdateDiscussionInput = z.infer<typeof updateDiscussionSchema>
export type ListDiscussionsParams = z.infer<typeof listDiscussionsSchema>
export type GetDiscussionParams = z.infer<typeof getDiscussionSchema>
export type DeleteDiscussionParams = z.infer<typeof deleteDiscussionSchema>
