"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { Search, Clock, Eye, ChevronRight, Plus, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  excerpt: string;
  cover_image: string | null;
  author: {
    username: string;
    full_name: string | null;
    avatar_url: string | null;
  };
  category: {
    name: string;
    slug: string;
    color: string | null;
  };
  read_time: number | null;
  view_count: number;
  likes_count: number;
  is_featured: boolean;
  published_at: string;
}

const mockArticles: Article[] = [
  {
    id: "1",
    slug: "10-tips-negosiasi-gaji-yang-efektif",
    title: "10 Tips Negosiasi Gaji yang Efektif untuk Daily Worker",
    subtitle: "Jangan pernah accept gaji pertama - begini caranya",
    excerpt: "Negosiasi gaji adalah keterampilan penting yang sering diabaikan oleh banyak pekerja harian. Berikut tips yang bisa Anda terapkan untuk mendapatkan kompensasi yang lebih fair.",
    cover_image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    author: { username: "sarah_wijaya", full_name: "Sarah Wijaya", avatar_url: null },
    category: { name: "Tips & Trick", slug: "tips-trick", color: "#00FF94" },
    read_time: 5,
    view_count: 2341,
    likes_count: 156,
    is_featured: true,
    published_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    slug: "panduan-lengkap-cara-daftar-di-dailyworkerhub",
    title: "Panduan Lengkap: Cara Daftar di DailyWorkerHub",
    subtitle: "Langkah demi langkah untuk memulai",
    excerpt: "Langkah demi langkah untuk mendaftar dan mulai mencari pekerjaan harian yang sesuai dengan keahlian Anda.",
    cover_image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    author: { username: "ahmad_pratama", full_name: "Ahmad Pratama", avatar_url: null },
    category: { name: "Panduan", slug: "panduan", color: "#00FF94" },
    read_time: 3,
    view_count: 1892,
    likes_count: 89,
    is_featured: true,
    published_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    slug: "kisah-inspiratif-dari-calo-menjadi-employer",
    title: "Kisah Inspiratif: Dari Calo Menjadi Employer Bersertifikat",
    subtitle: "Perjalanan transformasi 5 tahun",
    excerpt: "Perjalanan transformasi seorang daily worker yang kini berhasil mengelola tim dengan 50 pekerja harian.",
    cover_image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80",
    author: { username: "dewi_kusuma", full_name: "Dewi Kusuma", avatar_url: null },
    category: { name: "Inspiratif", slug: "inspiratif", color: "#00FF94" },
    read_time: 8,
    view_count: 3421,
    likes_count: 234,
    is_featured: false,
    published_at: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4",
    slug: "cara-mudah-menghitung-fee-platform",
    title: "Cara Mudah Menghitung Fee Platform yang Fair",
    subtitle: "Matematika sederhana untuk worker",
    excerpt: "Banyak worker yang bingung menghitung apakah fee platform yang diambil sudah reasonable. Ini cara mudahnya.",
    cover_image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    author: { username: "robert_tanaka", full_name: "Robert Tanaka", avatar_url: null },
    category: { name: "Tips & Trick", slug: "tips-trick", color: "#00FF94" },
    read_time: 4,
    view_count: 1234,
    likes_count: 67,
    is_featured: false,
    published_at: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "5",
    slug: "memahami-hak-pekerja-dalam-uu-pelindungan-pekerja",
    title: "Memahami Hak Pekerja dalam UU Pelindungan Pekerja",
    subtitle: "Apa yang sebenarnya diatur?",
    excerpt: "Draft UU Pelindungan Pekerja Platforms telah menjadi topik hangat. Apa saja yang diatur dan bagaimana dampaknya bagi kita sebagai daily worker?",
    cover_image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
    author: { username: "hendra_wijaya", full_name: "Hendra Wijaya", avatar_url: null },
    category: { name: "Panduan", slug: "panduan", color: "#00FF94" },
    read_time: 12,
    view_count: 4567,
    likes_count: 345,
    is_featured: false,
    published_at: new Date(Date.now() - 120 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "6",
    slug: "remote-work-guide-untuk-pekerja-indonesia",
    title: "Remote Work Guide untuk Pekerja Indonesia",
    subtitle: "Best practices dari mereka yang sudah Erfahrung",
    excerpt: "Tips dan pengalaman dari worker yang sudah 3 tahun bekerja remote untuk perusahaan luar negeri.",
    cover_image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    author: { username: "rina_melati", full_name: "Rina Melati", avatar_url: null },
    category: { name: "Panduan", slug: "panduan", color: "#00FF94" },
    read_time: 7,
    view_count: 2345,
    likes_count: 178,
    is_featured: false,
    published_at: new Date(Date.now() - 144 * 60 * 60 * 1000).toISOString(),
  },
];

const mockCategories = [
  { name: "Semua", slug: null },
  { name: "Tips & Trick", slug: "tips-trick" },
  { name: "Panduan", slug: "panduan" },
  { name: "Inspiratif", slug: "inspiratif" },
];

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredArticles = mockArticles.filter((a) => {
    if (selectedCategory && a.category.slug !== selectedCategory) return false;
    if (searchQuery && !a.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

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
            <h1 className="text-3xl font-bold text-slate-50 mb-2">Artikel & Knowledge Base</h1>
            <p className="text-slate-400">
              Pelajari tips, panduan, dan kisah inspiratif dari komunitas
            </p>
          </div>

          {/* Search & Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Cari artikel..."
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
              Tulis Artikel
            </Button>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {mockCategories.map((cat) => (
              <button
                key={cat.name}
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

          {/* Featured Articles */}
          {filteredArticles.filter((a) => a.is_featured).length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-slate-50 mb-4">Featured</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {filteredArticles
                  .filter((a) => a.is_featured)
                  .map((article) => (
                    <Link
                      key={article.id}
                      href={`/community/articles/${article.slug}`}
                      className="group bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-emerald-500/30 card-hover"
                    >
                      <div className="flex flex-col sm:flex-row">
                        {article.cover_image && (
                          <div className="sm:w-48 aspect-video sm:aspect-square relative">
                            <img
                              src={article.cover_image}
                              alt={article.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 p-4">
                          <span
                            className="px-2 py-0.5 text-xs rounded-full"
                            style={{ backgroundColor: `${article.category.color || "#10B981"}20`, color: article.category.color || "#10B981" }}
                          >
                            {article.category.name}
                          </span>
                          <h3 className="font-semibold text-slate-50 mt-2 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-sm text-slate-400 mt-1 line-clamp-2">{article.excerpt}</p>
                          <div className="flex items-center gap-3 mt-3 text-xs text-slate-500">
                            <span>{article.author.username}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {article.read_time} menit
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          )}

          {/* All Articles */}
          <div>
            <h2 className="text-xl font-semibold text-slate-50 mb-4">Semua Artikel</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/community/articles/${article.slug}`}
                  className="group bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-emerald-500/30 card-hover"
                >
                  {article.cover_image && (
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={article.cover_image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <span
                      className="px-2 py-0.5 text-xs rounded-full"
                      style={{ backgroundColor: `${article.category.color || "#10B981"}20`, color: article.category.color || "#10B981" }}
                    >
                      {article.category.name}
                    </span>
                    <h3 className="font-semibold text-slate-50 mt-2 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                      {article.title}
                    </h3>
                    {article.subtitle && (
                      <p className="text-sm text-slate-400 mt-1 line-clamp-1">{article.subtitle}</p>
                    )}
                    <div className="flex items-center gap-3 mt-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.read_time} menit
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {article.view_count}
                      </span>
                      <span>{formatDistanceToNow(new Date(article.published_at), { addSuffix: true, locale: id })}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
