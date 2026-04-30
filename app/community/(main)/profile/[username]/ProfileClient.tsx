"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow, format } from "date-fns";
import { id } from "date-fns/locale";
import {
  Clock,
  Eye,
  MessageCircle,
  ArrowUp,
  FileText,
  MessageSquare,
  Calendar,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileData {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  role: string;
  created_at: string;
}

interface UserArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image: string | null;
  category: string;
  read_time: number | null;
  likes_count: number;
  comments_count: number;
  views_count: number;
  is_featured: boolean;
  published_at: string | null;
}

interface UserDiscussion {
  id: string;
  slug: string;
  title: string;
  category: string;
  likes_count: number;
  comments_count: number;
  views_count: number;
  is_pinned: boolean;
  created_at: string;
}

interface UserComment {
  id: string;
  discussion_id: string | null;
  article_id: string | null;
  content: string;
  likes_count: number;
  created_at: string;
}

type Tab = "articles" | "discussions" | "comments";

function getRoleBadge(role: string) {
  if (role === "admin" || role === "moderator") {
    return (
      <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
        {role === "admin" ? "Admin" : "Moderator"}
      </span>
    );
  }
  return null;
}

export function ProfileClient({
  profile,
  articles,
  discussions,
  comments,
}: {
  profile: ProfileData;
  articles: UserArticle[];
  discussions: UserDiscussion[];
  comments: UserComment[];
}) {
  const [activeTab, setActiveTab] = useState<Tab>("articles");

  const tabs = [
    { id: "articles" as Tab, label: "Artikel", count: articles.length, icon: FileText },
    { id: "discussions" as Tab, label: "Diskusi", count: discussions.length, icon: MessageSquare },
    { id: "comments" as Tab, label: "Komentar", count: comments.length, icon: MessageCircle },
  ];

  return (
    <div className="text-foreground">
      <main className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 mb-8">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <Avatar className="w-20 h-20 sm:w-24 sm:h-24 shrink-0">
                <AvatarImage src={profile.avatar_url || undefined} />
                <AvatarFallback className="bg-emerald-500/20 text-emerald-400 text-2xl sm:text-3xl">
                  {(profile.full_name || profile.username).charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap mb-1">
                  <h1 className="text-2xl font-bold text-foreground">
                    {profile.full_name || profile.username}
                  </h1>
                  {getRoleBadge(profile.role)}
                </div>
                <p className="text-muted-foreground/70 mb-3">@{profile.username}</p>
                {profile.bio && (
                  <p className="text-muted-foreground mb-4">{profile.bio}</p>
                )}
                <div className="flex items-center gap-2 text-sm text-muted-foreground/60">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Bergabung {format(new Date(profile.created_at), "dd MMMM yyyy", { locale: id })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-border mb-8">
            <nav className="flex gap-0 -mb-px">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? "border-emerald-500 text-emerald-400"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                    <span className="ml-1 text-xs px-1.5 py-0.5 rounded-full bg-muted">
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Articles Tab */}
          {activeTab === "articles" && (
            <>
              {articles.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.map((article) => (
                    <Link
                      key={article.id}
                      href={`/community/articles/${article.slug}`}
                      className="group bg-card border border-border rounded-xl overflow-hidden hover:border-emerald-500/30 transition-colors"
                    >
                      {article.cover_image && (
                        <div className="aspect-video relative overflow-hidden">
                          <Image
                            src={article.cover_image}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <span
                          className="px-2 py-0.5 text-xs rounded-full"
                          style={{ backgroundColor: "#10B98120", color: "#10B981" }}
                        >
                          {article.category || "Umum"}
                        </span>
                        <h3 className="font-semibold text-foreground mt-2 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                          {article.title}
                        </h3>
                        <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground/70">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {article.read_time || 0} menit
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {article.views_count}
                          </span>
                          {article.published_at && (
                            <span>
                              {formatDistanceToNow(new Date(article.published_at), {
                                addSuffix: true,
                                locale: id,
                              })}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-card border border-border rounded-2xl">
                  <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">Belum ada artikel.</p>
                </div>
              )}
            </>
          )}

          {/* Discussions Tab */}
          {activeTab === "discussions" && (
            <div className="space-y-4">
              {discussions.length > 0 ? (
                discussions.map((discussion) => (
                  <Link
                    key={discussion.id}
                    href={`/community/discussions/${discussion.slug}`}
                    className="block bg-card border border-border rounded-xl p-5 hover:border-emerald-500/30 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center px-3 py-2 bg-muted/50 border border-border rounded-xl min-w-[60px]">
                        <ArrowUp className="w-5 h-5 text-muted-foreground" />
                        <span className="text-lg font-semibold text-foreground">
                          {discussion.likes_count}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          {discussion.is_pinned && (
                            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              Pinned
                            </span>
                          )}
                          <span
                            className="px-2 py-0.5 text-xs rounded-full"
                            style={{
                              backgroundColor: "#10B98120",
                              color: "#10B981",
                            }}
                          >
                            {discussion.category || "Umum"}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 hover:text-emerald-400 transition-colors">
                          {discussion.title}
                        </h3>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground/70">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatDistanceToNow(new Date(discussion.created_at), {
                              addSuffix: true,
                              locale: id,
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            {discussion.comments_count} komentar
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {discussion.views_count}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-16 bg-card border border-border rounded-2xl">
                  <MessageSquare className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">Belum ada diskusi.</p>
                </div>
              )}
            </div>
          )}

          {/* Comments Tab */}
          {activeTab === "comments" && (
            <div className="space-y-3">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-card border border-border rounded-xl p-4"
                  >
                    <div className="flex items-start gap-3">
                      <MessageCircle className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground/90 line-clamp-3 whitespace-pre-wrap">
                          {comment.content}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground/60">
                          <span>
                            {formatDistanceToNow(new Date(comment.created_at), {
                              addSuffix: true,
                              locale: id,
                            })}
                          </span>
                          {comment.discussion_id && (
                            <Link
                              href={`/community/discussions/${comment.discussion_id}`}
                              className="text-emerald-400 hover:text-emerald-300"
                            >
                              Lihat diskusi
                            </Link>
                          )}
                          {comment.article_id && (
                            <Link
                              href={`/community/articles/${comment.article_id}`}
                              className="text-emerald-400 hover:text-emerald-300"
                            >
                              Lihat artikel
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 bg-card border border-border rounded-2xl">
                  <MessageCircle className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">Belum ada komentar.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
