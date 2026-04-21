"use client";

import * as React from "react";

import { supabase } from "@/lib/supabase/types";
import type { Database } from "@/lib/supabase/types";

type VoteTargetType = "discussion" | "comment" | "feedback";
type VoteValue = -1 | 1;

interface VoteState {
  targetType: VoteTargetType;
  targetId: string;
  currentUserId: string | null;
  authorId: string;
  initialVotesCount: number;
  userVote: VoteValue | null;
  isOwnContent: boolean;
}

interface UseVoteOptions {
  targetType: VoteTargetType;
  targetId: string;
  authorId: string;
  initialVotesCount?: number;
  onVoteChange?: (newCount: number) => void;
}

interface UseVoteReturn {
  votesCount: number;
  userVote: VoteValue | null;
  isOwnContent: boolean;
  isLoading: boolean;
  error: Error | null;
  upvote: () => Promise<void>;
  downvote: () => Promise<void>;
  removeVote: () => Promise<void>;
  canVote: boolean;
}

const actionTypes = {
  SET_VOTE: "SET_VOTE",
  OPTIMISTIC_UPVOTE: "OPTIMISTIC_UPVOTE",
  OPTIMISTIC_DOWNVOTE: "OPTIMISTIC_DOWNVOTE",
  OPTIMISTIC_REMOVE: "OPTIMISTIC_REMOVE",
  REVERT_OPTIMISTIC: "REVERT_OPTIMISTIC",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  SYNC_FROM_SERVER: "SYNC_FROM_SERVER",
} as const;

type ActionType = typeof actionTypes;

type Action =
  | { type: ActionType["SET_VOTE"]; vote: VoteValue | null }
  | {
      type: ActionType["OPTIMISTIC_UPVOTE"];
      previousVote: VoteValue | null;
      previousCount: number;
    }
  | {
      type: ActionType["OPTIMISTIC_DOWNVOTE"];
      previousVote: VoteValue | null;
      previousCount: number;
    }
  | {
      type: ActionType["OPTIMISTIC_REMOVE"];
      previousVote: VoteValue;
      previousCount: number;
    }
  | { type: ActionType["REVERT_OPTIMISTIC"] }
  | { type: ActionType["SET_LOADING"]; isLoading: boolean }
  | { type: ActionType["SET_ERROR"]; error: Error | null }
  | {
      type: ActionType["SYNC_FROM_SERVER"];
      votesCount: number;
      userVote: VoteValue | null;
    };

interface State {
  votesCount: number;
  userVote: VoteValue | null;
  isLoading: boolean;
  error: Error | null;
  pendingAction: Action | null;
}

const initialState: State = {
  votesCount: 0,
  userVote: null,
  isLoading: false,
  error: null,
  pendingAction: null,
};

function calculateNewCount(
  currentCount: number,
  previousVote: VoteValue | null,
  newVote: VoteValue | null
): number {
  // If removing a vote, subtract it from the count
  if (newVote === null && previousVote !== null) {
    return currentCount - previousVote;
  }

  // If changing vote, adjust by the difference
  if (previousVote !== null && newVote !== null) {
    return currentCount - previousVote + newVote;
  }

  // If adding a new vote, add it to the count
  if (newVote !== null) {
    return currentCount + newVote;
  }

  return currentCount;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_VOTE":
      return {
        ...state,
        userVote: action.vote,
      };

    case "OPTIMISTIC_UPVOTE": {
      const newCount = calculateNewCount(
        action.previousCount,
        action.previousVote,
        1
      );
      return {
        ...state,
        votesCount: newCount,
        userVote: 1,
        pendingAction: action,
        isLoading: true,
      };
    }

    case "OPTIMISTIC_DOWNVOTE": {
      const newCount = calculateNewCount(
        action.previousCount,
        action.previousVote,
        -1
      );
      return {
        ...state,
        votesCount: newCount,
        userVote: -1,
        pendingAction: action,
        isLoading: true,
      };
    }

    case "OPTIMISTIC_REMOVE": {
      const newCount = calculateNewCount(
        action.previousCount,
        action.previousVote,
        null
      );
      return {
        ...state,
        votesCount: newCount,
        userVote: null,
        pendingAction: action,
        isLoading: true,
      };
    }

    case "REVERT_OPTIMISTIC": {
      if (!state.pendingAction) return state;
      const pending = state.pendingAction;
      if (
        pending.type === "OPTIMISTIC_UPVOTE" ||
        pending.type === "OPTIMISTIC_DOWNVOTE" ||
        pending.type === "OPTIMISTIC_REMOVE"
      ) {
        return {
          ...state,
          votesCount: pending.previousCount,
          userVote: pending.previousVote,
          pendingAction: null,
          isLoading: false,
        };
      }
      return state;
    }

    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.isLoading,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };

    case "SYNC_FROM_SERVER":
      return {
        ...state,
        votesCount: action.votesCount,
        userVote: action.userVote,
        pendingAction: null,
        isLoading: false,
        error: null,
      };

    default:
      return state;
  }
}

async function getUserVote(
  userId: string,
  targetType: VoteTargetType,
  targetId: string
): Promise<VoteValue | null> {
  const { data, error } = await supabase
    .from("votes")
    .select("value")
    .eq("user_id", userId)
    .eq("target_type", targetType)
    .eq("target_id", targetId)
    .single();

  if (error || !data) return null;
  return data.value as VoteValue;
}

async function upsertVote(
  userId: string,
  targetType: VoteTargetType,
  targetId: string,
  value: VoteValue
): Promise<{ error: Error | null }> {
  const { error } = await supabase.from("votes").upsert(
    {
      user_id: userId,
      target_type: targetType,
      target_id: targetId,
      value,
    },
    {
      onConflict: "user_id,target_type,target_id",
    }
  );

  return { error: error ? new Error(error.message) : null };
}

async function removeVote(
  userId: string,
  targetType: VoteTargetType,
  targetId: string
): Promise<{ error: Error | null }> {
  const { error } = await supabase
    .from("votes")
    .delete()
    .eq("user_id", userId)
    .eq("target_type", targetType)
    .eq("target_id", targetId);

  return { error: error ? new Error(error.message) : null };
}

export function useVote({
  targetType,
  targetId,
  authorId,
  initialVotesCount = 0,
  onVoteChange,
}: UseVoteOptions): UseVoteReturn {
  const [state, dispatch] = React.useReducer(reducer, {
    ...initialState,
    votesCount: initialVotesCount,
  });

  const currentUserIdRef = React.useRef<string | null>(null);
  const [currentUserId, setCurrentUserId] = React.useState<string | null>(null);

  // Fetch current user on mount
  React.useEffect(() => {
    async function fetchCurrentUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const userId = user?.id ?? null;
      currentUserIdRef.current = userId;
      setCurrentUserId(userId);
    }
    fetchCurrentUser();
  }, []);

  // Fetch existing vote on mount when we have a user
  React.useEffect(() => {
    async function fetchUserVote() {
      if (!currentUserId) return;

      const vote = await getUserVote(currentUserId, targetType, targetId);
      dispatch({ type: "SET_VOTE", vote });
    }
    fetchUserVote();
  }, [currentUserId, targetType, targetId]);

  // Real-time subscription for vote count changes
  React.useEffect(() => {
    const targetTable =
      targetType === "discussion"
        ? "discussions"
        : targetType === "comment"
          ? "comments"
          : "feedback_items";

    const channel = supabase
      .channel(`vote-channel-${targetType}-${targetId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: targetTable,
          filter: `id=eq.${targetId}`,
        },
        (payload) => {
          const newVotesCount =
            targetType === "discussion"
              ? (payload.new as Database["public"]["Tables"]["discussions"]["Row"]).votes_count
              : targetType === "comment"
                ? (payload.new as Database["public"]["Tables"]["comments"]["Row"]).likes_count
                : (payload.new as Database["public"]["Tables"]["feedback_items"]["Row"]).votes_count;

          dispatch({
            type: "SYNC_FROM_SERVER",
            votesCount: newVotesCount,
            userVote: state.userVote,
          });
          onVoteChange?.(newVotesCount);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [targetType, targetId, state.userVote, onVoteChange]);

  const isOwnContent = currentUserId === authorId;
  const canVote = currentUserId !== null && !isOwnContent;

  const upvote = React.useCallback(async () => {
    if (!currentUserId) {
      dispatch({
        type: "SET_ERROR",
        error: new Error("You must be logged in to vote"),
      });
      return;
    }

    if (isOwnContent) {
      dispatch({
        type: "SET_ERROR",
        error: new Error("You cannot vote on your own content"),
      });
      return;
    }

    const previousVote = state.userVote;
    const previousCount = state.votesCount;

    // If already upvoted, remove the vote
    if (previousVote === 1) {
      dispatch({
        type: "OPTIMISTIC_REMOVE",
        previousVote: 1,
        previousCount,
      });
    } else {
      dispatch({
        type: "OPTIMISTIC_UPVOTE",
        previousVote,
        previousCount,
      });
    }

    const { error } = await upsertVote(
      currentUserId,
      targetType,
      targetId,
      previousVote === 1 ? -1 : 1
    );

    if (error) {
      dispatch({ type: "SET_ERROR", error });
      dispatch({ type: "REVERT_OPTIMISTIC" });
      return;
    }

    dispatch({ type: "SET_LOADING", isLoading: false });
  }, [currentUserId, isOwnContent, state.userVote, state.votesCount, targetType, targetId]);

  const downvote = React.useCallback(async () => {
    if (!currentUserId) {
      dispatch({
        type: "SET_ERROR",
        error: new Error("You must be logged in to vote"),
      });
      return;
    }

    if (isOwnContent) {
      dispatch({
        type: "SET_ERROR",
        error: new Error("You cannot vote on your own content"),
      });
      return;
    }

    const previousVote = state.userVote;
    const previousCount = state.votesCount;

    // If already downvoted, remove the vote
    if (previousVote === -1) {
      dispatch({
        type: "OPTIMISTIC_REMOVE",
        previousVote: -1,
        previousCount,
      });
    } else {
      dispatch({
        type: "OPTIMISTIC_DOWNVOTE",
        previousVote,
        previousCount,
      });
    }

    const { error } = await upsertVote(
      currentUserId,
      targetType,
      targetId,
      previousVote === -1 ? -1 : 1
    );

    if (error) {
      dispatch({ type: "SET_ERROR", error });
      dispatch({ type: "REVERT_OPTIMISTIC" });
      return;
    }

    dispatch({ type: "SET_LOADING", isLoading: false });
  }, [currentUserId, isOwnContent, state.userVote, state.votesCount, targetType, targetId]);

  const removeVoteAction = React.useCallback(async () => {
    if (!currentUserId) {
      dispatch({
        type: "SET_ERROR",
        error: new Error("You must be logged in to vote"),
      });
      return;
    }

    const previousVote = state.userVote;
    const previousCount = state.votesCount;

    if (previousVote === null) return;

    dispatch({
      type: "OPTIMISTIC_REMOVE",
      previousVote,
      previousCount,
    });

    const { error } = await removeVote(currentUserId, targetType, targetId);

    if (error) {
      dispatch({ type: "SET_ERROR", error });
      dispatch({ type: "REVERT_OPTIMISTIC" });
      return;
    }

    dispatch({ type: "SET_LOADING", isLoading: false });
  }, [currentUserId, state.userVote, state.votesCount, targetType, targetId]);

  return {
    votesCount: state.votesCount,
    userVote: state.userVote,
    isOwnContent,
    isLoading: state.isLoading,
    error: state.error,
    upvote,
    downvote,
    removeVote: removeVoteAction,
    canVote,
  };
}
