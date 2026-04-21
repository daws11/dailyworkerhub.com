import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getDiscussions,
  getDiscussionBySlug,
  getDiscussionById,
  getComments,
  getCommentsWithReplies,
  getDiscussionStats,
  createDiscussion,
  updateDiscussion,
  deleteDiscussion,
  createComment,
  updateComment,
  deleteComment,
  markCommentAsSolution,
} from './queries'
import type {
  DiscussionWithAuthor,
  DiscussionListItem,
  CommentWithAuthor,
  CommentWithReplies,
  GetDiscussionsOptions,
  CreateDiscussionInput,
  CreateCommentInput,
} from './types'

// Query key factory
export const discussionKeys = {
  all: ['discussions'] as const,
  lists: () => [...discussionKeys.all, 'list'] as const,
  list: (filters: GetDiscussionsOptions) => [...discussionKeys.lists(), filters] as const,
  details: () => [...discussionKeys.all, 'detail'] as const,
  detail: (idOrSlug: string) => [...discussionKeys.details(), idOrSlug] as const,
  comments: (discussionId: string) => [...discussionKeys.all, 'comments', discussionId] as const,
  commentsWithReplies: (discussionId: string) => [...discussionKeys.all, 'comments-replies', discussionId] as const,
  stats: () => [...discussionKeys.all, 'stats'] as const,
}

// Query hooks

export function useDiscussions(options: GetDiscussionsOptions = {}) {
  return useQuery({
    queryKey: discussionKeys.list(options),
    queryFn: () => getDiscussions(options),
  })
}

export function useDiscussionBySlug(slug: string) {
  return useQuery({
    queryKey: discussionKeys.detail(slug),
    queryFn: () => getDiscussionBySlug(slug),
    enabled: Boolean(slug),
  })
}

export function useDiscussionById(id: string) {
  return useQuery({
    queryKey: discussionKeys.detail(id),
    queryFn: () => getDiscussionById(id),
    enabled: Boolean(id),
  })
}

export function useComments(discussionId: string, limit = 50) {
  return useQuery({
    queryKey: discussionKeys.comments(discussionId),
    queryFn: () => getComments(discussionId, limit),
    enabled: Boolean(discussionId),
  })
}

export function useCommentsWithReplies(discussionId: string, limit = 50) {
  return useQuery({
    queryKey: discussionKeys.commentsWithReplies(discussionId),
    queryFn: () => getCommentsWithReplies(discussionId, limit),
    enabled: Boolean(discussionId),
  })
}

export function useDiscussionStats() {
  return useQuery({
    queryKey: discussionKeys.stats(),
    queryFn: getDiscussionStats,
  })
}

// Mutation hooks

export function useCreateDiscussion() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ input, authorId }: { input: CreateDiscussionInput; authorId: string }) =>
      createDiscussion(input, authorId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: discussionKeys.lists() })
      queryClient.invalidateQueries({ queryKey: discussionKeys.stats() })
    },
  })
}

export function useUpdateDiscussion() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string
      updates: Partial<Pick<DiscussionWithAuthor, 'title' | 'content' | 'status' | 'category_id'>>
    }) => updateDiscussion(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: discussionKeys.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: discussionKeys.lists() })
    },
  })
}

export function useDeleteDiscussion() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteDiscussion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: discussionKeys.lists() })
      queryClient.invalidateQueries({ queryKey: discussionKeys.stats() })
    },
  })
}

export function useCreateComment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ input, authorId }: { input: CreateCommentInput; authorId: string }) =>
      createComment(input, authorId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: discussionKeys.comments(variables.input.discussionId) })
      queryClient.invalidateQueries({ queryKey: discussionKeys.commentsWithReplies(variables.input.discussionId) })
      queryClient.invalidateQueries({ queryKey: discussionKeys.detail(variables.input.discussionId) })
      queryClient.invalidateQueries({ queryKey: discussionKeys.lists() })
    },
  })
}

export function useUpdateComment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, content }: { id: string; content: string }) => updateComment(id, content),
    onSuccess: () => {
      // Invalidate all comments - we don't have the discussionId easily here
      queryClient.invalidateQueries({ queryKey: ['discussions', 'comments'] })
    },
  })
}

export function useDeleteComment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discussions', 'comments'] })
      queryClient.invalidateQueries({ queryKey: discussionKeys.lists() })
    },
  })
}

export function useMarkCommentAsSolution() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ commentId, discussionId }: { commentId: string; discussionId: string }) =>
      markCommentAsSolution(commentId, discussionId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: discussionKeys.comments(variables.discussionId) })
      queryClient.invalidateQueries({ queryKey: discussionKeys.detail(variables.discussionId) })
    },
  })
}
