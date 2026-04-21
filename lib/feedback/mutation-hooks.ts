import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createFeedback,
  updateFeedback,
  updateFeedbackStatus,
  deleteFeedback,
  type CreateFeedbackInput,
  type UpdateFeedbackStatusInput,
} from './mutations'
import {
  castVote,
  removeVote,
  toggleVote,
  type CastVoteInput,
  type ToggleVoteInput,
} from './votes'
import { feedbackKeys } from './hooks'

export function useCreateFeedback() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateFeedbackInput) => createFeedback(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: feedbackKeys.lists() })
      queryClient.invalidateQueries({ queryKey: feedbackKeys.stats() })
    },
  })
}

export function useUpdateFeedbackStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: UpdateFeedbackStatusInput) => updateFeedbackStatus(input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: feedbackKeys.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: feedbackKeys.lists() })
      queryClient.invalidateQueries({ queryKey: feedbackKeys.stats() })
    },
  })
}

export function useUpdateFeedback() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Parameters<typeof updateFeedback>[1] }) =>
      updateFeedback(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: feedbackKeys.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: feedbackKeys.lists() })
    },
  })
}

export function useDeleteFeedback() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteFeedback(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: feedbackKeys.lists() })
      queryClient.invalidateQueries({ queryKey: feedbackKeys.stats() })
    },
  })
}

export function useCastVote() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CastVoteInput) => castVote(input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: feedbackKeys.detail(variables.target_id) })
      queryClient.invalidateQueries({ queryKey: feedbackKeys.lists() })
    },
  })
}

export function useRemoveVote() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, targetId }: { userId: string; targetId: string }) =>
      removeVote(userId, targetId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: feedbackKeys.detail(variables.targetId) })
      queryClient.invalidateQueries({ queryKey: feedbackKeys.lists() })
    },
  })
}

export function useToggleVote() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: ToggleVoteInput) => toggleVote(input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: feedbackKeys.detail(variables.target_id) })
      queryClient.invalidateQueries({ queryKey: feedbackKeys.lists() })
    },
  })
}
