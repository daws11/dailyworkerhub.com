import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getFeedbackItems,
  getFeedbackById,
  getFeedbackWithAuthor,
  getFeedbackStats,
  type FeedbackItemWithAuthor,
  type GetFeedbackOptions,
} from './queries'

export const feedbackKeys = {
  all: ['feedback'] as const,
  lists: () => [...feedbackKeys.all, 'list'] as const,
  list: (filters: GetFeedbackOptions) => [...feedbackKeys.lists(), filters] as const,
  details: () => [...feedbackKeys.all, 'detail'] as const,
  detail: (id: string) => [...feedbackKeys.details(), id] as const,
  stats: () => [...feedbackKeys.all, 'stats'] as const,
}

export function useFeedbackItems(options: GetFeedbackOptions = {}) {
  return useQuery({
    queryKey: feedbackKeys.list(options),
    queryFn: () => getFeedbackItems(options),
  })
}

export function useFeedbackById(id: string) {
  return useQuery({
    queryKey: feedbackKeys.detail(id),
    queryFn: () => getFeedbackById(id),
    enabled: Boolean(id),
  })
}

export function useFeedbackWithAuthor(id: string) {
  return useQuery({
    queryKey: feedbackKeys.detail(id),
    queryFn: () => getFeedbackWithAuthor(id),
    enabled: Boolean(id),
  })
}

export function useFeedbackStats() {
  return useQuery({
    queryKey: feedbackKeys.stats(),
    queryFn: getFeedbackStats,
  })
}
