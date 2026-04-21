"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import {
  ArrowUp,
  ArrowDown,
  Share2,
  Bookmark,
  Flag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CommentSection } from "@/components/discussion/CommentSection";
import { useDiscussionBySlug, useCommentsWithReplies } from "@/lib/discussions/hooks";

export default function DiscussionDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';

  const { data: discussionResponse, isLoading: isLoadingDiscussion, error: discussionError } = useDiscussionBySlug(slug);
  const { data: commentsResponse, isLoading: isLoadingComments } = useCommentsWithReplies(slug);
  const discussion = discussionResponse?.data;
  const comments = commentsResponse?.data || [];

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const isLoading = isLoadingDiscussion || isLoadingComments;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50">
        <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
          <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <Link href="/community" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                <span className="text-slate-950 font-bold text-sm">DW</span>
              </div>
              <span className="font-semibold text-slate-50 hidden sm:block">DailyWorkerHub</span>
            </Link>
          </div>
        </nav>
        <main className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-4">
              <div className="h-4 w-48 bg-slate-800 rounded"></div>
              <div className="h-8 w-full bg-slate-800 rounded"></div>
              <div className="h-64 w-full bg-slate-800 rounded"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (discussionError || discussionResponse?.error || !discussion) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50">
        <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
          <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <Link href="/community" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                <span className="text-slate-950 font-bold text-sm">DW</span>
              </div>
              <span className="font-semibold text-slate-50 hidden sm:block">DailyWorkerHub</span>
            </Link>
          </div>
        </nav>
        <main className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl font-bold text-slate-50 mb-2">Discussion not found</h1>
            <p className="text-slate-400">The discussion you are looking for does not exist or has been removed.</p>
            <Link
              href="/community/discussions"
              className="inline-block mt-4 px-4 py-2 text-sm font-medium rounded-full bg-emerald-500 text-slate-950 hover:bg-emerald-400"
            >
              Back to Discussions
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/community" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
              <span className="text-slate-950 font-bold text-sm">DW</span>
            </div>
            <span className="font-semibold text-slate-50 hidden sm:block">DailyWorkerHub</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link href="/community/login" className="text-sm text-slate-400 hover:text-slate-50">
              Masuk
            </Link>
            <Link
              href="/community/register"
              className="px-4 py-2 text-sm font-medium rounded-full bg-emerald-500 text-slate-950 hover:bg-emerald-400"
            >
              Daftar
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
            <Link href="/community/discussions" className="hover:text-slate-300">
              Diskusi
            </Link>
            <span>/</span>
            <span
              className="px-2 py-0.5 rounded-full text-xs"
              style={{ backgroundColor: `${discussion.category.color || "#10B981"}20`, color: discussion.category.color || "#10B981" }}
            >
              {discussion.category.name}
            </span>
          </div>

          {/* Main Discussion Card */}
          <article className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden mb-6">
            {/* Header */}
            <div className="p-6 pb-0">
              <div className="flex items-center gap-2 mb-4">
                {discussion.is_pinned && (
                  <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Pinned
                  </span>
                )}
                <span
                  className="px-2 py-0.5 text-xs rounded-full"
                  style={{ backgroundColor: `${discussion.category.color || "#10B981"}20`, color: discussion.category.color || "#10B981" }}
                >
                  {discussion.category.name}
                </span>
                {discussion.status === "solved" && (
                  <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                    Solved
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-slate-50 mb-4">
                {discussion.title}
              </h1>

              {/* Author Meta */}
              <div className="flex items-center gap-3 mb-6">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={discussion.author.avatar_url || undefined} />
                  <AvatarFallback className="bg-emerald-500/20 text-emerald-400">
                    {discussion.author.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-slate-200">{discussion.author.username}</div>
                  <div className="text-sm text-slate-500">
                    {formatDistanceToNow(new Date(discussion.created_at), { addSuffix: true, locale: id })}
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 pb-6">
              <div className="prose prose-invert prose-slate max-w-none">
                <div className="text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {discussion.content}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 mt-8 pt-6 border-t border-slate-800">
                <div className="flex items-center gap-1">
                  <Button
                    variant={liked ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setLiked(!liked);
                      if (disliked) setDisliked(false);
                    }}
                    className={`${liked ? "bg-emerald-500 text-slate-950" : "border-slate-700 text-slate-400"}`}
                  >
                    <ArrowUp className="w-4 h-4 mr-1" />
                    {discussion.likes_count + (liked ? 1 : 0)}
                  </Button>
                  <Button
                    variant={disliked ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setDisliked(!disliked);
                      if (liked) setLiked(false);
                    }}
                    className="border-slate-700 text-slate-400"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                </div>

                <Button variant="outline" size="sm" className="border-slate-700 text-slate-400">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Simpan
                </Button>

                <Button variant="outline" size="sm" className="border-slate-700 text-slate-400">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>

                <Button variant="outline" size="sm" className="border-slate-700 text-slate-400">
                  <Flag className="w-4 h-4 mr-2" />
                  Report
                </Button>
              </div>
            </div>
          </article>

          {/* Comments Section */}
          <CommentSection
            discussionId={discussion.id}
          />
        </div>
      </main>
    </div>
  );
}
