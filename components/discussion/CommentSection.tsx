"use client";

import { useState, useCallback } from "react";
import { MessageCircle } from "lucide-react";
import { CommentItem } from "./CommentItem";
import { CommentForm } from "./CommentForm";

interface CommentAuthor {
  username: string;
  full_name: string | null;
  avatar_url: string | null;
}

interface Comment {
  id: string;
  content: string;
  author: CommentAuthor;
  parent_id: string | null;
  is_solution: boolean;
  likes_count: number;
  created_at: string;
  replies?: Comment[];
}

interface CommentSectionProps {
  discussionId: string;
  comments: Comment[];
  onAddComment?: (content: string, parentId?: string) => Promise<void>;
  onEditComment?: (id: string, content: string) => Promise<void>;
  onDeleteComment?: (id: string) => Promise<void>;
  onLikeComment?: (id: string) => Promise<void>;
  onMarkSolution?: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export function CommentSection({
  discussionId,
  comments,
  onAddComment,
  onEditComment,
  onDeleteComment,
  onLikeComment,
  onMarkSolution,
  isLoading = false,
}: CommentSectionProps) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");

  // Calculate total comments including nested replies
  const totalComments = comments.reduce(
    (acc, comment) => acc + 1 + (comment.replies?.length || 0),
    0
  );

  // Handle adding a new comment
  const handleAddComment = useCallback(
    async (content: string, parentId?: string) => {
      if (onAddComment) {
        await onAddComment(content, parentId);
      }
      setReplyingTo(null);
    },
    [onAddComment]
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
    if (onEditComment && editingId && editingContent.trim()) {
      await onEditComment(editingId, editingContent.trim());
    }
    setEditingId(null);
    setEditingContent("");
  }, [editingId, editingContent, onEditComment]);

  // Handle cancel edit
  const handleCancelEdit = useCallback(() => {
    setEditingId(null);
    setEditingContent("");
  }, []);

  // Handle delete comment
  const handleDelete = useCallback(
    async (id: string) => {
      if (onDeleteComment) {
        await onDeleteComment(id);
      }
    },
    [onDeleteComment]
  );

  // Handle like comment
  const handleLike = useCallback(
    async (id: string) => {
      if (onLikeComment) {
        await onLikeComment(id);
      }
    },
    [onLikeComment]
  );

  // Handle mark as solution
  const handleMarkSolution = useCallback(
    async (id: string) => {
      if (onMarkSolution) {
        await onMarkSolution(id);
      }
    },
    [onMarkSolution]
  );

  // Render a comment with its replies
  const renderComment = useCallback(
    (comment: Comment, isReply = false) => (
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
              disabled={isLoading}
            />
            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={handleCancelEdit}
                className="px-3 py-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={isLoading || !editingContent.trim()}
                className="px-3 py-1.5 text-sm font-medium rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Simpan
              </button>
            </div>
          </div>
        ) : (
          <CommentItem
            id={comment.id}
            content={comment.content}
            author={comment.author}
            parent_id={comment.parent_id}
            is_solution={comment.is_solution}
            likes_count={comment.likes_count}
            created_at={comment.created_at}
            replies={comment.replies}
            onReply={handleReply}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onLike={handleLike}
            onMarkSolution={onMarkSolution ? handleMarkSolution : undefined}
            isReply={isReply}
          />
        )}

        {/* Reply form */}
        {replyingTo === comment.id && (
          <div className="ml-8">
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
                disabled={isLoading}
              />
            </div>
          </div>
        )}

        {/* Nested replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-8 space-y-3">
            {comment.replies.map((reply) => renderComment(reply, true))}
          </div>
        )}
      </div>
    ),
    [
      editingId,
      editingContent,
      replyingTo,
      isLoading,
      handleSaveEdit,
      handleCancelEdit,
      handleReply,
      handleEdit,
      handleAddComment,
      handleCancelReply,
      handleDelete,
      handleLike,
      handleMarkSolution,
      onMarkSolution,
    ]
  );

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
          onSubmit={handleAddComment}
          placeholder="Tulis komentar Anda..."
          disabled={isLoading}
        />
      </div>

      {/* Comments list */}
      <div className="space-y-4">
        {comments.length === 0 ? (
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