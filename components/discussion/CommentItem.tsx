"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import {
  ArrowUp,
  ArrowDown,
  CheckCircle,
  MoreHorizontal,
  Edit,
  Trash2,
  Reply,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CommentAuthor {
  username: string;
  full_name: string | null;
  avatar_url: string | null;
}

interface CommentItemProps {
  id: string;
  content: string;
  author: CommentAuthor;
  parent_id: string | null;
  is_solution: boolean;
  likes_count: number;
  created_at: string;
  replies?: CommentItemProps[];
  onReply?: (parentId: string) => void;
  onEdit?: (id: string, content: string) => void;
  onDelete?: (id: string) => void;
  onLike?: (id: string) => void;
  onMarkSolution?: (id: string) => void;
  depth?: number;
  isReply?: boolean;
}

export function CommentItem({
  id,
  content,
  author,
  parent_id,
  is_solution,
  likes_count,
  created_at,
  replies = [],
  onReply,
  onEdit,
  onDelete,
  onLike,
  onMarkSolution,
  depth = 0,
  isReply = false,
}: CommentItemProps) {
  const [liked, setLiked] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    onLike?.(id);
  };

  const handleReply = () => {
    onReply?.(id);
  };

  const handleEdit = () => {
    onEdit?.(id, content);
  };

  const handleDelete = () => {
    onDelete?.(id);
  };

  const avatarSize = isReply ? "w-6 h-6" : "w-8 h-8";
  const fallbackSize = isReply ? "text-xs" : "text-sm";

  return (
    <div className="space-y-4">
      <div
        className={`bg-slate-900 border rounded-xl p-4 ${
          is_solution
            ? "border-emerald-500/50"
            : isReply
              ? "border-slate-800/50 bg-slate-900/30"
              : "border-slate-800"
        }`}
      >
        {is_solution && (
          <div className="flex items-center gap-2 mb-3 text-emerald-400">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Jawaban Terbaik</span>
          </div>
        )}

        <div className="flex items-start gap-3">
          <Avatar className={avatarSize}>
            <AvatarImage src={author.avatar_url || undefined} />
            <AvatarFallback
              className={`bg-emerald-500/20 text-emerald-400 ${fallbackSize}`}
            >
              {author.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium text-slate-200 text-sm">
                {author.username}
              </span>
              <span className="text-xs text-slate-500">
                {formatDistanceToNow(new Date(created_at), {
                  addSuffix: true,
                  locale: id as any,
                })}
              </span>
            </div>

            <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
              {content}
            </div>

            <div className="flex items-center gap-3 mt-3">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1 text-xs transition-colors ${
                  liked
                    ? "text-emerald-400"
                    : "text-slate-500 hover:text-emerald-400"
                }`}
              >
                <ArrowUp className="w-3 h-3" />
                <span>{likes_count + (liked ? 1 : 0)}</span>
              </button>

              <button className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-400 transition-colors">
                <ArrowDown className="w-3 h-3" />
              </button>

              <button
                onClick={handleReply}
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-emerald-400 transition-colors"
              >
                <Reply className="w-3 h-3" />
                <span>Balas</span>
              </button>

              {onMarkSolution && !is_solution && (
                <button
                  onClick={() => onMarkSolution?.(id)}
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-emerald-400 transition-colors"
                >
                  <CheckCircle className="w-3 h-3" />
                  <span>Jadikan Solusi</span>
                </button>
              )}

              <div className="relative">
                <button
                  onClick={() => setShowActions(!showActions)}
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition-colors ml-auto"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>

                {showActions && (
                  <div className="absolute right-0 top-full mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-lg py-1 min-w-[120px] z-10">
                    <button
                      onClick={() => {
                        handleEdit();
                        setShowActions(false);
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-xs text-slate-300 hover:bg-slate-700 hover:text-slate-50"
                    >
                      <Edit className="w-3 h-3" />
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        handleDelete();
                        setShowActions(false);
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 hover:text-red-300"
                    >
                      <Trash2 className="w-3 h-3" />
                      Hapus
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {replies && replies.length > 0 && (
        <div className="ml-8 space-y-3">
          {replies.map((reply) => (
            <CommentItem
              key={reply.id}
              {...reply}
              isReply={true}
              depth={depth + 1}
              onReply={onReply}
              onEdit={onEdit}
              onDelete={onDelete}
              onLike={onLike}
              onMarkSolution={onMarkSolution}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentItem;