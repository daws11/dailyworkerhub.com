"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow, format } from "date-fns";
import { id } from "date-fns/locale";
import {
  ArrowUp,
  ArrowDown,
  MessageCircle,
  Clock,
  Share2,
  Bookmark,
  Flag,
  Send,
  Calendar,
  Tag,
  ChevronLeft,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RecommendationList } from "@/components/recommendations/RecommendationList";

interface Comment {
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

interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  author: {
    username: string;
    full_name: string | null;
    avatar_url: string | null;
    bio: string | null;
  } | null;
  category: {
    name: string;
    slug: string;
    color: string;
  } | null;
  read_time: number | null;
  view_count: number;
  likes_count: number;
  published_at: string | null;
  created_at: string;
}

interface ArticleClientProps {
  article: Article;
  tags?: { id: string; name: string; slug: string }[];
}

const mockComments: Comment[] = [
  {
    id: "1",
    content: `Terima kasih untuk tips yang sangat useful!`,
    author: {
      username: "worker1",
      full_name: "Budi Santoso",
      avatar_url: null,
    },
    likes_count: 45,
    created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    replies: [],
  },
];

export function ArticleClient({ article, tags = [] }: ArticleClientProps) {
  const [replyContent, setReplyContent] = useState("");
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const totalComments = mockComments.reduce((acc, c) => acc + 1 + (c.replies?.length || 0), 0);

  const handleSubmitComment = () => {
    if (!replyContent.trim()) return;
    setReplyContent("");
  };

  return (
    <div className="text-foreground">
      <main className="pb-16">
        {/* Cover Image */}
        {article.cover_image && (
          <div className="relative h-[300px] sm:h-[400px] overflow-hidden">
            <Image
              src={article.cover_image}
              alt={article.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </div>
        )}

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
          {/* Back Button */}
          <Link
            href="/community/articles"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-400 mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Kembali ke Artikel
          </Link>

          {/* Article Header Card */}
          <article className="bg-card border border-border rounded-2xl overflow-hidden mb-6">
            <div className="p-6 sm:p-8">
              {/* Category Badge */}
              {article.category && (
                <span
                  className="inline-block px-3 py-1 text-sm rounded-full mb-4"
                  style={{
                    backgroundColor: `${article.category.color}20`,
                    color: article.category.color,
                  }}
                >
                  {article.category.name}
                </span>
              )}

              {/* Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground hover:text-emerald-400 transition-colors"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 leading-tight">
                {article.title}
              </h1>

              {/* Subtitle */}
              {article.subtitle && (
                <p className="text-lg text-muted-foreground mb-6">{article.subtitle}</p>
              )}

              {/* Author Info */}
              <Link href={`/community/profile/${article.author?.username}`} className="flex items-center gap-4 mb-6 group">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={article.author?.avatar_url || undefined} />
                  <AvatarFallback className="bg-emerald-500/20 text-emerald-400 text-lg">
                    {article.author?.username?.charAt(0).toUpperCase() || "?"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-foreground group-hover:text-emerald-400 transition-colors">
                    {article.author?.full_name || article.author?.username || "Unknown"}
                  </div>
                  <div className="text-sm text-muted-foreground/70">@{article.author?.username || "unknown"}</div>
                </div>
              </Link>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground/70 pb-6 border-b border-border">
                {article.published_at && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{format(new Date(article.published_at), "d MMMM yyyy", { locale: id })}</span>
                  </div>
                )}
                {article.read_time && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{article.read_time} menit baca</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>{article.view_count} views</span>
                </div>
              </div>
            </div>
          </article>

          {/* Article Content */}
          <article className="bg-card border border-border rounded-2xl overflow-hidden mb-6">
            <div className="p-6 sm:p-8">
              <div className="prose prose-invert prose-slate max-w-none">
                <div className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
                  {article.content}
                </div>
              </div>

              {/* Vote & Actions */}
              <div className="flex items-center gap-2 mt-8 pt-6 border-t border-border">
                <div className="flex items-center gap-1">
                  <Button
                    variant={liked ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setLiked(!liked);
                      if (disliked) setDisliked(false);
                    }}
                    className={`${liked ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400" : "border-border text-muted-foreground"}`}
                  >
                    <ArrowUp className="w-4 h-4 mr-1" />
                    {article.likes_count + (liked ? 1 : 0)}
                  </Button>
                  <Button
                    variant={disliked ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setDisliked(!disliked);
                      if (liked) setLiked(false);
                    }}
                    className={`${disliked ? "bg-red-500 text-slate-950 hover:bg-red-400 border-red-500" : "border-border text-muted-foreground"}`}
                  >
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                </div>

                <Button
                  variant={bookmarked ? "default" : "outline"}
                  size="sm"
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`${bookmarked ? "bg-amber-500 text-slate-950 hover:bg-amber-400 border-amber-500" : "border-border text-muted-foreground"}`}
                >
                  <Bookmark className={`w-4 h-4 mr-2 ${bookmarked ? "fill-current" : ""}`} />
                  Simpan
                </Button>

                <Button variant="outline" size="sm" className="border-border text-muted-foreground">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>

                <Button variant="outline" size="sm" className="border-border text-muted-foreground">
                  <Flag className="w-4 h-4 mr-2" />
                  Report
                </Button>
              </div>
            </div>
          </article>

          {/* Author Bio Card */}
          <div className="bg-card border border-border rounded-2xl p-6 mb-6">
            <Link href={`/community/profile/${article.author?.username}`} className="flex items-start gap-4 group">
              <Avatar className="w-16 h-16">
                <AvatarImage src={article.author?.avatar_url || undefined} />
                <AvatarFallback className="bg-emerald-500/20 text-emerald-400 text-xl">
                  {article.author?.username?.charAt(0).toUpperCase() || "?"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-foreground group-hover:text-emerald-400 transition-colors">
                    {article.author?.full_name || article.author?.username || "Unknown"}
                  </span>
                  <span className="text-muted-foreground/70">•</span>
                  <span className="text-sm text-muted-foreground/70">@{article.author?.username || "unknown"}</span>
                </div>
                {article.author?.bio && (
                  <p className="text-sm text-muted-foreground">{article.author.bio}</p>
                )}
                <Button variant="link" className="text-emerald-400 p-0 h-auto mt-2 text-sm">
                  Lihat profil lengkap
                </Button>
              </div>
            </Link>
          </div>

          {/* Comments Section */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-emerald-400" />
              {totalComments} Komentar
            </h2>

            {/* Comment Form */}
            <div className="bg-card border border-border rounded-xl p-4 mb-6">
              <Textarea
                placeholder="Tulis komentar Anda..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="bg-muted border-border text-foreground placeholder:text-muted-foreground mb-3 min-h-[100px] resize-none"
              />
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground/70">
                  {replyContent.length}/2000 karakter
                </span>
                <Button
                  onClick={handleSubmitComment}
                  disabled={!replyContent.trim()}
                  className="bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Kirim Komentar
                </Button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {mockComments.map((comment) => (
                <div key={comment.id} className="space-y-4">
                  <div className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-emerald-500/20 text-emerald-400 text-sm">
                          {comment.author.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
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
                          <button className="flex items-center gap-1 text-xs text-muted-foreground/70 hover:text-emerald-400 transition-colors">
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
                </div>
              ))}
            </div>
          </section>

          {/* Recommendations */}
          <RecommendationList type="articles" excludeSlugs={[article.slug]} limit={3} />
        </div>
      </main>
    </div>
  );
}
