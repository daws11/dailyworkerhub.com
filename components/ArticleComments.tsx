"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { ArrowUp, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface Comment {
  id: string;
  content: string;
  author: {
    username: string;
    full_name: string | null;
    avatar_url: string | null;
  };
  likes_count: number;
  created_at: string;
  replies?: Comment[];
}

interface ArticleCommentsProps {
  comments: Comment[];
  articleSlug?: string;
}

export function ArticleComments({ comments, articleSlug }: ArticleCommentsProps) {
  const [commentContent, setCommentContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localComments, setLocalComments] = useState<Comment[]>(comments);

  const totalComments = localComments.reduce((acc, c) => acc + 1 + (c.replies?.length || 0), 0);

  const handleSubmitComment = async () => {
    if (!commentContent.trim()) return;

    setIsSubmitting(true);
    try {
      // In real app, this would submit to API
      // const response = await fetch(`/api/articles/${articleSlug}/comments`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ content: commentContent }),
      // });

      // Mock adding the comment locally
      const newComment: Comment = {
        id: Date.now().toString(),
        content: commentContent,
        author: {
          username: "guest_user",
          full_name: "Guest User",
          avatar_url: null,
        },
        likes_count: 0,
        created_at: new Date().toISOString(),
        replies: [],
      };

      setLocalComments((prev) => [newComment, ...prev]);
      setCommentContent("");
    } catch (error) {
      // Handle error silently - in production, use toast notifications
      console.error("Failed to submit comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLikeComment = (commentId: string) => {
    setLocalComments((prev) =>
      prev.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, likes_count: comment.likes_count + 1 };
        }
        if (comment.replies) {
          return {
            ...comment,
            replies: comment.replies.map((reply) =>
              reply.id === commentId
                ? { ...reply, likes_count: reply.likes_count + 1 }
                : reply
            ),
          };
        }
        return comment;
      })
    );
  };

  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-emerald-400" />
        {totalComments} Komentar
      </h2>

      {/* Comment Form */}
      <div className="bg-card border border-border rounded-xl p-4 mb-6">
        <Textarea
          placeholder="Tulis komentar Anda..."
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          className="bg-muted border-border text-foreground placeholder:text-muted-foreground/70 mb-3 min-h-[100px] resize-none"
          maxLength={2000}
        />
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground/70">
            {commentContent.length}/2000 karakter
          </span>
          <Button
            onClick={handleSubmitComment}
            disabled={!commentContent.trim() || isSubmitting}
            className="bg-emerald-500 text-slate-950 hover:bg-emerald-400"
          >
            <Send className="w-4 h-4 mr-2" />
            {isSubmitting ? "Mengirim..." : "Kirim Komentar"}
          </Button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {localComments.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-8 text-center">
            <MessageCircle className="w-12 h-12 text-muted-foreground/60 mx-auto mb-3" />
            <p className="text-muted-foreground">Belum ada komentar. Jadilah yang pertama menulis!</p>
          </div>
        ) : (
          localComments.map((comment) => (
            <div key={comment.id} className="space-y-4">
              {/* Main Comment */}
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={comment.author.avatar_url || undefined} />
                    <AvatarFallback className="bg-emerald-500/20 text-emerald-400 text-sm">
                      {comment.author.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="font-medium text-foreground text-sm">
                        {comment.author.full_name || comment.author.username}
                      </span>
                      <span className="text-xs text-muted-foreground/70">
                        @{comment.author.username}
                      </span>
                      <span className="text-xs text-muted-foreground/60">•</span>
                      <span className="text-xs text-muted-foreground/70">
                        {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true, locale: id })}
                      </span>
                    </div>

                    <div className="text-foreground/80 text-sm leading-relaxed whitespace-pre-wrap">
                      {comment.content}
                    </div>

                    <div className="flex items-center gap-4 mt-3">
                      <button
                        onClick={() => handleLikeComment(comment.id)}
                        className="flex items-center gap-1 text-xs text-muted-foreground/70 hover:text-emerald-400 transition-colors"
                      >
                        <ArrowUp className="w-3 h-3" />
                        {comment.likes_count}
                      </button>
                      <button className="text-xs text-muted-foreground/70 hover:text-emerald-400 transition-colors">
                        Balas
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-8 space-y-3">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="bg-card/50 border border-border rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-muted text-foreground/80 text-xs">
                            {reply.author.username.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className="font-medium text-foreground/80 text-sm">
                              {reply.author.full_name || reply.author.username}
                            </span>
                            <span className="text-xs text-muted-foreground/70">
                              @{reply.author.username}
                            </span>
                            <span className="text-xs text-muted-foreground/60">•</span>
                            <span className="text-xs text-muted-foreground/70">
                              {formatDistanceToNow(new Date(reply.created_at), { addSuffix: true, locale: id })}
                            </span>
                          </div>

                          <div className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">
                            {reply.content}
                          </div>

                          <div className="flex items-center gap-4 mt-2">
                            <button
                              onClick={() => handleLikeComment(reply.id)}
                              className="flex items-center gap-1 text-xs text-muted-foreground/70 hover:text-emerald-400 transition-colors"
                            >
                              <ArrowUp className="w-3 h-3" />
                              {reply.likes_count}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default ArticleComments;
