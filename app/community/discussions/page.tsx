"use client";

import { useState } from "react";
import Link from "next/link";
import { useDiscussions } from "@/lib/discussions/hooks";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import {
  ArrowUp,
  MessageCircle,
  Clock,
  TrendingUp,
  Flame,
  Plus,
  Search,
  Filter,
  X,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SortOption = "newest" | "popular" | "trending" | "votes";

// Map UI sort option to API sort option
function mapSortToApi(sort: SortOption): "newest" | "oldest" | "popular" | "active" {
  switch (sort) {
    case "popular":
      return "popular"
    case "trending":
      return "active"
    case "votes":
      return "popular"
    default:
      return "newest"
  }
}

// Predefined categories for filter (in production, these would come from an API)
const filterCategories = [
  { id: "1", name: "Karier", slug: "karier", color: "#10B981" },
  { id: "2", name: "Gaji & Negosiasi", slug: "gaji-negosiasi", color: "#10B981" },
  { id: "3", name: "Remote Work", slug: "remote-work", color: "#10B981" },
  { id: "4", name: "Skill Development", slug: "skill-development", color: "#10B981" },
  { id: "5", name: "Umum", slug: "umum", color: "#10B981" },
]

export default function DiscussionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [showFilters, setShowFilters] = useState(false);

  const { data, isLoading, error } = useDiscussions({
    categorySlug: selectedCategory || undefined,
    search: searchQuery || undefined,
    sortBy: mapSortToApi(sortBy),
    limit: 20,
  });

  const discussions = data?.data ?? [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/community" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
              <span className="text-slate-950 font-bold text-sm">DW</span>
            </div>
            <span className="font-semibold text-slate-50 hidden sm:block">DailyWorkerHub</span>
            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Community
            </span>
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-50 mb-2">Forum Diskusi</h1>
            <p className="text-slate-400">
              Diskusikan pertanyaan, berbagi pengalaman, dan belajar dari komunitas
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Cari diskusi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 bg-slate-900 border-slate-800 text-slate-50 placeholder:text-slate-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-50"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant={sortBy === "newest" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("newest")}
                className={sortBy === "newest" ? "bg-emerald-500 text-slate-950" : "border-slate-700 text-slate-300"}
              >
                <Clock className="w-4 h-4 mr-2" />
                Terbaru
              </Button>
              <Button
                variant={sortBy === "popular" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("popular")}
                className={sortBy === "popular" ? "bg-emerald-500 text-slate-950" : "border-slate-700 text-slate-300"}
              >
                <ArrowUp className="w-4 h-4 mr-2" />
                Populer
              </Button>
              <Button
                variant={sortBy === "trending" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("trending")}
                className={sortBy === "trending" ? "bg-emerald-500 text-slate-950" : "border-slate-700 text-slate-300"}
              >
                <Flame className="w-4 h-4 mr-2" />
                Trending
              </Button>
              <Button
                variant={sortBy === "votes" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("votes")}
                className={sortBy === "votes" ? "bg-emerald-500 text-slate-950" : "border-slate-700 text-slate-300"}
              >
                <ArrowUp className="w-4 h-4 mr-2" />
                Votes
              </Button>
            </div>

            {/* Filter Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="border-slate-700 text-slate-300"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>

            {/* New Discussion Button */}
            <Button className="bg-emerald-500 text-slate-950 hover:bg-emerald-400">
              <Plus className="w-4 h-4 mr-2" />
              Buat Diskusi
            </Button>
          </div>

          {/* Category Pills */}
          {showFilters && (
            <div className="flex flex-wrap gap-2 mb-8 p-4 bg-slate-900 border border-slate-800 rounded-xl">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 text-sm rounded-full transition-colors ${
                  !selectedCategory
                    ? "bg-emerald-500 text-slate-950"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                }`}
              >
                Semua
              </button>
              {filterCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-4 py-2 text-sm rounded-full transition-colors ${
                    selectedCategory === cat.slug
                      ? "bg-emerald-500 text-slate-950"
                      : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}

          {/* Discussions List */}
          <div className="space-y-4">
            {isLoading && (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
              </div>
            )}

            {error && (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-slate-300 mb-2">Gagal memuat diskusi</h3>
                <p className="text-slate-500 mb-6">{error.message}</p>
              </div>
            )}

            {!isLoading && !error && discussions.map((discussion) => (
              <Link
                key={discussion.id}
                href={`/community/discussions/${discussion.slug}`}
                className="block bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-emerald-500/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  {/* Vote Section */}
                  <div className="flex flex-col items-center px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-xl min-w-[60px]">
                    <ArrowUp className="w-5 h-5 text-slate-400" />
                    <span className="text-lg font-semibold text-slate-200">{discussion.likes_count}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      {discussion.is_pinned && (
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Pinned
                        </span>
                      )}
                      {discussion.category && (
                        <span
                          className="px-2 py-0.5 text-xs rounded-full"
                          style={{ backgroundColor: `${discussion.category.color || "#10B981"}20`, color: discussion.category.color || "#10B981" }}
                        >
                          {discussion.category.name}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold text-slate-50 mb-2 line-clamp-2 hover:text-emerald-400 transition-colors">
                      {discussion.title}
                    </h3>

                    <p className="text-sm text-slate-400 line-clamp-2 mb-3">
                      {discussion.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                          <span className="text-emerald-400 text-xs font-medium">
                            {discussion.author.username.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="text-slate-400">{discussion.author.username}</span>
                      </div>

                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDistanceToNow(new Date(discussion.created_at), { addSuffix: true, locale: id })}
                      </span>

                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        {discussion.comments_count} komentar
                      </span>

                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {discussion.view_count} views
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {!isLoading && !error && discussions.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-slate-500" />
                </div>
                <h3 className="text-lg font-semibold text-slate-300 mb-2">Tidak ada diskusi</h3>
                <p className="text-slate-500 mb-6">Coba ubah filter atau kata kunci pencarian Anda</p>
                <Button className="bg-emerald-500 text-slate-950 hover:bg-emerald-400">
                  <Plus className="w-4 h-4 mr-2" />
                  Buat Diskusi Pertama
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
