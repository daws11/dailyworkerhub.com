"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUp, Plus, Clock, Filter, Search, X, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface FeedbackItem {
  id: string;
  title: string;
  description: string;
  author: {
    username: string;
    avatar_url: string | null;
  };
  category: "feature" | "bug" | "improvement";
  status: "under_review" | "planned" | "in_progress" | "completed" | "declined";
  votes_count: number;
  comments_count: number;
  created_at: string;
}

const mockFeedback: FeedbackItem[] = [
  {
    id: "1",
    title: "Fitur notifikasi push untuk update lowongan baru",
    description: "Biar bisa dapat notifikasi langsung saat ada lowongan baru yang match dengan skill dan lokasi kita. Saat ini harus check manual terus.",
    author: { username: "budi_santoso", avatar_url: null },
    category: "feature",
    status: "planned",
    votes_count: 234,
    comments_count: 45,
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    title: "Tombol 'Copy' untuk nomor WhatsApp employer",
    description: "Repot kalau mau copy nomor employer harus select manual. Tambahkan button copy yang appear saat hover.",
    author: { username: "siti_rahmah", avatar_url: null },
    category: "improvement",
    status: "in_progress",
    votes_count: 189,
    comments_count: 23,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    title: "Error saat upload foto profil",
    description: "Setiap kali upload foto profil selalu failed. Sudah coba berbagai format dan ukuran.",
    author: { username: "joko_wibowo", avatar_url: null },
    category: "bug",
    status: "under_review",
    votes_count: 156,
    comments_count: 34,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4",
    title: "Dark mode untuk halaman community",
    description: "Matanya lelah kalau baca di bright mode. Please add dark mode!",
    author: { username: "rina_melati", avatar_url: null },
    category: "feature",
    status: "under_review",
    votes_count: 345,
    comments_count: 67,
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "5",
    title: "Tambahkan filter bahasa untuk lowongan",
    description: "Some employers post in English. Would be nice to filter by language requirement.",
    author: { username: "robert_tanaka", avatar_url: null },
    category: "improvement",
    status: "under_review",
    votes_count: 98,
    comments_count: 12,
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "6",
    title: "Integrasi dengan Gojek/Grab untuk tracking",
    description: " Biar bisa track pekerjaan langsung dari apps Gojek/Grab yang sudah familiar.",
    author: { username: "dewi_lestari", avatar_url: null },
    category: "feature",
    status: "declined",
    votes_count: 234,
    comments_count: 89,
    created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const statusConfig = {
  under_review: { label: "Under Review", color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  planned: { label: "Planned", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  in_progress: { label: "In Progress", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  completed: { label: "Completed", color: "bg-green-500/10 text-green-400 border-green-500/20" },
  declined: { label: "Declined", color: "bg-red-500/10 text-red-400 border-red-500/20" },
};

const categoryConfig = {
  feature: { label: "Feature", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  bug: { label: "Bug", color: "bg-red-500/10 text-red-400 border-red-500/20" },
  improvement: { label: "Improvement", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
};

export default function FeedbackPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [votedItems, setVotedItems] = useState<Set<string>>(new Set());

  const filteredFeedback = mockFeedback.filter((f) => {
    if (selectedStatus && f.status !== selectedStatus) return false;
    if (selectedCategory && f.category !== selectedCategory) return false;
    if (searchQuery && !f.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleVote = (id: string) => {
    setVotedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

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
            <h1 className="text-3xl font-bold text-slate-50 mb-2">Feedback & Saran</h1>
            <p className="text-slate-400">
              Bagikan ide dan request fitur untuk meningkatkan platform
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Cari feedback..."
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
            <Button className="bg-emerald-500 text-slate-950 hover:bg-emerald-400">
              <Plus className="w-4 h-4 mr-2" />
              Kirim Feedback
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-8">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Filter className="w-4 h-4" />
              Filter:
            </div>
            <select
              value={selectedStatus || ""}
              onChange={(e) => setSelectedStatus(e.target.value || null)}
              className="px-3 py-1.5 text-sm bg-slate-800 border border-slate-700 rounded-lg text-slate-300"
            >
              <option value="">Semua Status</option>
              <option value="under_review">Under Review</option>
              <option value="planned">Planned</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="declined">Declined</option>
            </select>
            <select
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="px-3 py-1.5 text-sm bg-slate-800 border border-slate-700 rounded-lg text-slate-300"
            >
              <option value="">Semua Kategori</option>
              <option value="feature">Feature</option>
              <option value="bug">Bug</option>
              <option value="improvement">Improvement</option>
            </select>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mb-8 p-4 bg-slate-900 border border-slate-800 rounded-xl">
            {[
              { label: "Total Feedback", value: mockFeedback.length },
              { label: "Under Review", value: mockFeedback.filter((f) => f.status === "under_review").length },
              { label: "Planned", value: mockFeedback.filter((f) => f.status === "planned").length },
              { label: "Completed", value: mockFeedback.filter((f) => f.status === "completed").length },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-emerald-400">{stat.value}</div>
                <div className="text-xs text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Feedback List */}
          <div className="space-y-4">
            {filteredFeedback.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-emerald-500/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  {/* Vote */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => handleVote(item.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        votedItems.has(item.id)
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-slate-800 text-slate-400 hover:text-emerald-400"
                      }`}
                    >
                      <ArrowUp className="w-5 h-5" />
                    </button>
                    <span className="text-lg font-semibold text-slate-200 mt-1">
                      {item.votes_count + (votedItems.has(item.id) ? 1 : 0)}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge className={categoryConfig[item.category].color}>
                        {categoryConfig[item.category].label}
                      </Badge>
                      <Badge className={statusConfig[item.status].color}>
                        {statusConfig[item.status].label}
                      </Badge>
                    </div>

                    <Link
                      href={`/community/feedback/${item.id}`}
                      className="block hover:text-emerald-400 transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-slate-50 mb-1">{item.title}</h3>
                    </Link>
                    <p className="text-sm text-slate-400 line-clamp-2 mb-3">{item.description}</p>

                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>by {item.author.username}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(item.created_at).toLocaleDateString("id-ID")}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        {item.comments_count} komentar
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredFeedback.length === 0 && (
              <div className="text-center py-16">
                <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-300 mb-2">Tidak ada feedback</h3>
                <p className="text-slate-500 mb-6">Jadilah yang pertama memberikan feedback</p>
                <Button className="bg-emerald-500 text-slate-950 hover:bg-emerald-400">
                  <Plus className="w-4 h-4 mr-2" />
                  Kirim Feedback
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
