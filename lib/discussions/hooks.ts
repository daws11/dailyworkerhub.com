import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getDiscussions,
  getDiscussionById,
  getDiscussionBySlug,
  getDiscussionsWithDetails,
  getDiscussionComments,
  getDiscussionStats,
  searchDiscussions,
  type GetDiscussionsOptions,
} from './queries'

export const discussionKeys = {
  all: ['discussions'] as const,
  lists: () => [...discussionKeys.all, 'list'] as const,
  list: (filters: GetDiscussionsOptions) => [...discussionKeys.lists(), filters] as const,
  listsWithDetails: () => [...discussionKeys.all, 'list', 'details'] as const,
  listWithDetails: (filters: GetDiscussionsOptions) => [...discussionKeys.listsWithDetails(), filters] as const,
  details: () => [...discussionKeys.all, 'detail'] as const,
  detail: (id: string) => [...discussionKeys.details(), id] as const,
  bySlug: (slug: string) => [...discussionKeys.all, 'slug', slug] as const,
  comments: (discussionId: string) => [...discussionKeys.all, 'comments', discussionId] as const,
  stats: () => [...discussionKeys.all, 'stats'] as const,
  search: (query: string) => [...discussionKeys.all, 'search', query] as const,
}

export function useDiscussions(options: GetDiscussionsOptions = {}) {
  return useQuery({
    queryKey: discussionKeys.list(options),
    queryFn: () => getDiscussions(options),
  })
}

export function useDiscussionById(id: string) {
  return useQuery({
    queryKey: discussionKeys.detail(id),
    queryFn: () => getDiscussionById(id),
    enabled: Boolean(id),
  })
}

export function useDiscussionBySlug(slug: string) {
  return useQuery({
    queryKey: discussionKeys.bySlug(slug),
    queryFn: () => getDiscussionBySlug(slug),
    enabled: Boolean(slug),
  })
}

export function useDiscussionsWithDetails(options: GetDiscussionsOptions = {}) {
  return useQuery({
    queryKey: discussionKeys.listWithDetails(options),
    queryFn: () => getDiscussionsWithDetails(options),
  })
}

export function useDiscussionComments(discussionId: string, options: { limit?: number; offset?: number } = {}) {
  return useQuery({
    queryKey: discussionKeys.comments(discussionId),
    queryFn: () => getDiscussionComments(discussionId, options),
    enabled: Boolean(discussionId),
  })
}

export function useDiscussionStats() {
  return useQuery({
    queryKey: discussionKeys.stats(),
    queryFn: getDiscussionStats,
  })
}

export function useSearchDiscussions(query: string, options: { limit?: number; offset?: number } = {}) {
  return useQuery({
    queryKey: discussionKeys.search(query),
    queryFn: () => searchDiscussions(query, options),
    enabled: Boolean(query),
  })
}
