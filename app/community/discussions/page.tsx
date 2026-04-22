"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CommunityNavbar } from "@/components/layout/CommunityNavbar";

interface Discussion {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author_id: string;
  author: {
    username: string;
    full_name: string | null;
    avatar_url: string | null;
  };
  category_id: string;
  category: {
    name: string;
    slug: string;
    color: string | null;
  };
  status: string;
  likes_count: number;
  comments_count: number;
  view_count: number;
  is_pinned: boolean;
  is_featured: boolean;
  created_at: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  color: string | null;
}

const mockDiscussions: Discussion[] = [
  {
    id: "1",
    slug: "berapa-seharusnya-gaji-minimum-untuk-driver-online",
    title: "Berapa seharusnya gaji minimum untuk driver online di Jakarta?",
    excerpt: "Berdasarkan pengalaman saya selama 3 tahun bekerja sebagai driver ojek online...",
    author_id: "1",
    author: { username: "budi_santoso", full_name: "Budi Santoso", avatar_url: null },
    category_id: "1",
    category: { name: "Gaji & Negosiasi", slug: "gaji-negosiasi", color: "#10B981" },
    status: "open",
    likes_count: 234,
    comments_count: 89,
    view_count: 1205,
    is_pinned: true,
    is_featured: true,
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    slug: "share-pengalaman-pertama-kerja-remote",
    title: "Share pengalaman pertama kerja remote - what to prepare?",
    excerpt: "Akhirnya dapat kerja remote pertama saya! Berikut perjuangan saya...",
    author_id: "2",
    author: { username: "rina_melati", full_name: "Rina Melati", avatar_url: null },
    category_id: "2",
    category: { name: "Remote Work", slug: "remote-work", color: "#10B981" },
    status: "open",
    likes_count: 156,
    comments_count: 45,
    view_count: 890,
    is_pinned: false,
    is_featured: false,
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    slug: "tips-menghadapi-interview-warehouse-supervisor",
    title: "Tips menghadapi interview untuk posisi warehouse supervisor",
    excerpt: "Beberapa minggu lalu saya berhasil interview untuk posisi ini...",
    author_id: "3",
    author: { username: "hendra_wijaya", full_name: "Hendra Wijaya", avatar_url: null },
    category_id: "3",
    category: { name: "Karier", slug: "karier", color: "#10B981" },
    status: "open",
    likes_count: 98,
    comments_count: 23,
    view_count: 456,
    is_pinned: false,
    is_featured: false,
    created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4",
    slug: "rekomendasi-platform-freelancer-terpercaya",
    title: "Rekomendasi platform freelancer terpercaya di Indonesia?",
    excerpt: "Baru mulai freelance dan bingung pilih platform yang aman...",
    author_id: "4",
    author: { username: "lisa_permata", full_name: "Lisa Permata", avatar_url: null },
    category_id: "4",
    category: { name: "Skill Development", slug: "skill-development", color: "#10B981" },
    status: "open",
    likes_count: 76,
    comments_count: 34,
    view_count: 321,
    is_pinned: false,
    is_featured: false,
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "5",
    slug: "how-to-deal-dengan-client-yang-suka-ubah-scope",
    title: "How to deal dengan client yang suka ubah scope terakhir menit?",
    excerpt: "Ini masalah yang selalu terjadi di project saya...",
    author_id: "5",
    author: { username: "yoga_prasetyo", full_name: "Yoga Prasetyo", avatar_url: null },
    category_id: "5",
    category: { name: "Umum", slug: "umum", color: "#10B981" },
    status: "open",
    likes_count: 54,
    comments_count: 21,
    view_count: 234,
    is_pinned: false,
    is_featured: false,
    created_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
  },
];

const mockCategories: Category[] = [
  { id: "1", name: "Karier", slug: "karier", color: "#10B981" },
  { id: "2", name: "Gaji & Negosiasi", slug: "gaji-negosiasi", color: "#10B981" },
  { id: "3", name: "Remote Work", slug: "remote-work", color: "#10B981" },
  { id: "4", name: "Skill Development", slug: "skill-development", color: "#10B981" },
  { id: "5", name: "Umum", slug: "umum", color: "#10B981" },
];

type SortOption = "newest" | "popular" | "trending" | "votes";

export default function DiscussionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [showFilters, setShowFilters] = useState(false);

  const supabase = createClient();

  const filteredDiscussions = mockDiscussions
    .filter((d) => {
      if (selectedCategory && d.category.slug !== selectedCategory) return false;
      if (searchQuery && !d.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (a.is_pinned && !b.is_pinned) return -1;
      if (!a.is_pinned && b.is_pinned) return 1;
      if (sortBy === "popular") return b.likes_count - a.likes_count;
      if (sortBy === "trending") return b.comments_count - a.comments_count;
      if (sortBy === "votes") return b.likes_count - a.likes_count;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

  void supabase; // Supabase client for future real data

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <CommunityNavbar variant="simple" />

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
              {mockCategories.map((cat) => (
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
            {filteredDiscussions.map((discussion) => (
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
                      <span
                        className="px-2 py-0.5 text-xs rounded-full"
                        style={{ backgroundColor: `${discussion.category.color || "#10B981"}20`, color: discussion.category.color || "#10B981" }}
                      >
                        {discussion.category.name}
                      </span>
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

            {filteredDiscussions.length === 0 && (
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
