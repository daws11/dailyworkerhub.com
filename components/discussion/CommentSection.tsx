"use client";

import { useState, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { MessageCircle } from "lucide-react";
import { CommentItem } from "./CommentItem";
import { CommentForm } from "./CommentForm";
import {
  useCommentsWithReplies,
  useCreateComment,
  useUpdateComment,
  useDeleteComment,
  useMarkCommentAsSolution,
  discussionKeys,
} from "@/lib/discussions/hooks";
import type { CommentWithReplies } from "@/lib/discussions/types";

// CommentAuthor interface matching CommentItem
interface CommentAuthor {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  reputation: number;
  role: "member" | "moderator" | "admin";
  created_at: string;
  updated_at: string;
}

// Depth-based indentation classes - flatline at level 4 (depth >= 3)
const getDepthIndentClass = (depth: number): string => {
  switch (depth) {
    case 0:
      return "ml-0"; // Top-level comment - no indent
    case 1:
      return "ml-8"; // Level 2 (first reply) - standard indent
    case 2:
      return "ml-12"; // Level 3 - deeper indent
    default:
      return "ml-16"; // Level 4+ - flatline at max depth
  }
};

interface CommentSectionProps {
  discussionId: string;
  currentUserId?: string;
  initialComments?: CommentWithReplies[];
}

export function CommentSection({
  discussionId,
  currentUserId,
  initialComments,
}: CommentSectionProps) {
  const queryClient = useQueryClient();
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");

  // Fetch comments from API
  const {
    data: commentsData,
    isLoading,
    error,
  } = useCommentsWithReplies(discussionId);

  // Use initial comments if provided during loading, otherwise use fetched comments
  const comments = isLoading
    ? initialComments || []
    : commentsData?.data || initialComments || [];

  // Create comment mutation with optimistic update
  const createCommentMutation = useCreateComment();

  // Update comment mutation
  const updateCommentMutation = useUpdateComment();

  // Delete comment mutation with optimistic update
  const deleteCommentMutation = useDeleteComment();

  // Mark as solution mutation
  const markSolutionMutation = useMarkCommentAsSolution();

  // Calculate total comments including nested replies
  const totalComments = comments.reduce(
    (acc, comment) => acc + 1 + (comment.replies?.length || 0),
    0
  );

  // Helper to add optimistic comment to the tree
  const addOptimisticComment = useCallback(
    (commentsList: CommentWithReplies[], newComment: CommentWithReplies, parentId?: string | null): CommentWithReplies[] => {
      if (!parentId) {
        // Top-level comment - add to beginning
        return [newComment, ...commentsList];
      }

      // Find parent and add as reply
      return commentsList.map((comment) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newComment],
          };
        }
        if (comment.replies && comment.replies.length > 0) {
          return {
            ...comment,
            replies: addOptimisticComment(comment.replies, newComment, parentId),
          };
        }
        return comment;
      });
    },
    []
  );

  // Helper to remove optimistic comment from the tree
  const removeOptimisticComment = useCallback(
    (commentsList: CommentWithReplies[], commentId: string): CommentWithReplies[] => {
      return commentsList
        .filter((comment) => comment.id !== commentId)
        .map((comment) => ({
          ...comment,
          replies: comment.replies
            ? removeOptimisticComment(comment.replies, commentId)
            : [],
        }));
    },
    []
  );

  // Helper to update optimistic comment in the tree
  const updateOptimisticComment = useCallback(
    (commentsList: CommentWithReplies[], commentId: string, updates: Partial<CommentWithReplies>): CommentWithReplies[] => {
      return commentsList.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, ...updates };
        }
        return {
          ...comment,
          replies: comment.replies
            ? updateOptimisticComment(comment.replies, commentId, updates)
            : [],
        };
      });
    },
    []
  );

  // Handle adding a new comment
  const handleAddComment = useCallback(
    async (content: string, parentId?: string) => {
      // Create optimistic comment
      const optimisticComment: CommentWithReplies = {
        id: `temp-${Date.now()}`,
        discussion_id: discussionId,
        content,
        author_id: currentUserId || "",
        parent_id: parentId || null,
        depth: 0,
        is_solution: false,
        likes_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        author: {
          id: currentUserId || "",
          username: "You",
          full_name: null,
          avatar_url: null,
          bio: null,
          reputation: 0,
          role: "member" as const,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        replies: [],
      };

      // Optimistically update the comments list
      const queryKey = discussionKeys.commentsWithReplies(discussionId);
      queryClient.setQueryData<{ data: CommentWithReplies[]; error: Error | null }>(
        queryKey,
        (old) => ({
          data: addOptimisticComment(old?.data || [], optimisticComment, parentId),
          error: old?.error || null,
        })
      );

      setReplyingTo(null);

      try {
        await createCommentMutation.mutateAsync({
          input: { content, discussionId, parentId },
          authorId: currentUserId || "",
        });
      } catch (err) {
        // Rollback on error
        queryClient.setQueryData<{ data: CommentWithReplies[]; error: Error | null }>(
          queryKey,
          (old) => ({
            data: removeOptimisticComment(old?.data || [], optimisticComment.id),
            error: old?.error || null,
          })
        );
        throw err;
      }
    },
    [
      discussionId,
      currentUserId,
      queryClient,
      createCommentMutation,
      addOptimisticComment,
      removeOptimisticComment,
    ]
  );

  // Handle starting a reply
  const handleReply = useCallback((parentId: string) => {
    setReplyingTo(parentId);
    setEditingId(null);
  }, []);

  // Handle cancel reply
  const handleCancelReply = useCallback(() => {
    setReplyingTo(null);
  }, []);

  // Handle edit comment
  const handleEdit = useCallback((id: string, content: string) => {
    setEditingId(id);
    setEditingContent(content);
    setReplyingTo(null);
  }, []);

  // Handle save edit
  const handleSaveEdit = useCallback(async () => {
    if (!editingId || !editingContent.trim()) return;

    const queryKey = discussionKeys.commentsWithReplies(discussionId);
    const originalData = queryClient.getQueryData<{ data: CommentWithReplies[]; error: Error | null }>(queryKey);

    // Optimistically update
    queryClient.setQueryData<{ data: CommentWithReplies[]; error: Error | null }>(
      queryKey,
      (old) => ({
        data: updateOptimisticComment(old?.data || [], editingId, { content: editingContent.trim() }),
        error: old?.error || null,
      })
    );

    setEditingId(null);
    setEditingContent("");

    try {
      await updateCommentMutation.mutateAsync({
        id: editingId,
        content: editingContent.trim(),
      });
    } catch (err) {
      // Rollback on error
      queryClient.setQueryData(queryKey, originalData);
      throw err;
    }
  }, [editingId, editingContent, discussionId, queryClient, updateCommentMutation, updateOptimisticComment]);

  // Handle cancel edit
  const handleCancelEdit = useCallback(() => {
    setEditingId(null);
    setEditingContent("");
  }, []);

  // Handle delete comment
  const handleDelete = useCallback(
    async (id: string) => {
      const queryKey = discussionKeys.commentsWithReplies(discussionId);
      const originalData = queryClient.getQueryData<{ data: CommentWithReplies[]; error: Error | null }>(queryKey);

      // Optimistically remove
      queryClient.setQueryData<{ data: CommentWithReplies[]; error: Error | null }>(
        queryKey,
        (old) => ({
          data: removeOptimisticComment(old?.data || [], id),
          error: old?.error || null,
        })
      );

      try {
        await deleteCommentMutation.mutateAsync(id);
      } catch (err) {
        // Rollback on error
        queryClient.setQueryData(queryKey, originalData);
        throw err;
      }
    },
    [discussionId, queryClient, deleteCommentMutation, removeOptimisticComment]
  );

  // Handle like comment (placeholder for future implementation)
  const handleLike = useCallback(async (_id: string) => {
    // TODO: Implement like functionality with optimistic update
  }, []);

  // Handle mark as solution
  const handleMarkSolution = useCallback(
    async (id: string) => {
      const queryKey = discussionKeys.commentsWithReplies(discussionId);

      // Optimistically mark as solution and unmark others
      queryClient.setQueryData<{ data: CommentWithReplies[]; error: Error | null }>(
        queryKey,
        (old) => ({
          data: (old?.data || []).map((comment) => ({
            ...comment,
            is_solution: comment.id === id,
            replies: comment.replies?.map((reply) => ({
              ...reply,
              is_solution: reply.id === id,
            })),
          })),
          error: old?.error || null,
        })
      );

      try {
        await markSolutionMutation.mutateAsync({ commentId: id, discussionId });
      } catch (err) {
        // Rollback on error - invalidate to refetch
        queryClient.invalidateQueries({ queryKey });
        throw err;
      }
    },
    [discussionId, queryClient, markSolutionMutation]
  );

  // Determine if any mutation is in progress
  const isMutating = createCommentMutation.isPending || updateCommentMutation.isPending || deleteCommentMutation.isPending;

  // Render a comment with its replies
  const renderComment = useCallback(
    (comment: CommentWithReplies, isReply = false, depth = 0) => (
      <div key={comment.id} className="space-y-4">
        {editingId === comment.id ? (
          // Edit mode
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <CommentForm
              onSubmit={async () => {
                await handleSaveEdit();
              }}
              placeholder="Edit komentar..."
              autoFocus
              disabled={updateCommentMutation.isPending}
              onCancel={handleCancelEdit}
            />
            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={handleCancelEdit}
                disabled={updateCommentMutation.isPending}
                className="px-3 py-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors disabled:opacity-50"
              >
                Batal
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={updateCommentMutation.isPending || !editingContent.trim()}
                className="px-3 py-1.5 text-sm font-medium rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updateCommentMutation.isPending ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>
        ) : (
          <CommentItem
            id={comment.id}
            content={comment.content}
            author={comment.author as CommentAuthor}
            parent_id={comment.parent_id}
            is_solution={comment.is_solution}
            likes_count={comment.likes_count}
            created_at={comment.created_at}
            replies={comment.replies}
            onReply={handleReply}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onLike={handleLike}
            onMarkSolution={handleMarkSolution}
            isReply={isReply}
            depth={depth}
          />
        )}

        {/* Reply form */}
        {replyingTo === comment.id && (
          <div className={getDepthIndentClass(depth)}>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3 text-sm text-slate-400">
                <span>Membalas</span>
                <span className="text-emerald-400">@{comment.author.username}</span>
              </div>
              <CommentForm
                onSubmit={handleAddComment}
                parentId={comment.id}
                placeholder={`Balas ke @${comment.author.username}...`}
                autoFocus
                onCancel={handleCancelReply}
                disabled={createCommentMutation.isPending}
              />
            </div>
          </div>
        )}

        {/* Nested replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className={`space-y-3 ${getDepthIndentClass(depth)}`}>
            {comment.replies.map((reply) => renderComment(reply, true, depth + 1))}
          </div>
        )}
      </div>
    ),
    [
      editingId,
      editingContent,
      replyingTo,
      currentUserId,
      handleSaveEdit,
      handleCancelEdit,
      handleReply,
      handleEdit,
      handleAddComment,
      handleCancelReply,
      handleDelete,
      handleLike,
      handleMarkSolution,
      createCommentMutation.isPending,
      updateCommentMutation.isPending,
    ]
  );

  if (error) {
    return (
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-5 h-5 text-emerald-400" />
          <h2 className="text-xl font-semibold text-slate-50">Komentar</h2>
        </div>
        <div className="text-center py-8 text-red-400">
          <p>Gagal memuat komentar. Silakan coba lagi.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <MessageCircle className="w-5 h-5 text-emerald-400" />
        <h2 className="text-xl font-semibold text-slate-50">
          {totalComments} Komentar
        </h2>
      </div>

      {/* Main comment form */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
        <CommentForm
          onSubmit={(content) => handleAddComment(content, undefined)}
          placeholder="Tulis komentar Anda..."
          disabled={createCommentMutation.isPending}
        />
      </div>

      {/* Comments list */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8 text-slate-500">
            <div className="animate-pulse space-y-4">
              <div className="h-24 bg-slate-800 rounded-xl" />
              <div className="h-24 bg-slate-800 rounded-xl" />
              <div className="h-24 bg-slate-800 rounded-xl" />
            </div>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Belum ada komentar. Jadilah yang pertama berkomentar!</p>
          </div>
        ) : (
          comments.map((comment) => renderComment(comment))
        )}
      </div>
    </section>
  );
}

export default CommentSection;
