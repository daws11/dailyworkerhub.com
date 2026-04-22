"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { Search, Clock, Eye, Plus, X, Loader2, AlertCircle } from "lucide-react";
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

interface Category {
  id: string;
  name: string;
  slug: string;
  color: string | null;
}

interface User {
  id: string;
  email: string;
}

type SortOption = "newest" | "popular";

const ARTICLES_PER_PAGE = 12;

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [user, setUser] = useState<User | null>(null);

  const supabase = createClient();

  const checkAuth = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email || "" });
      }
    } catch (err) {
      console.error("Error checking auth:", err);
    }
  }, [supabase]);

  const fetchCategories = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name, slug, color")
        .eq("type", "article")
        .order("sort_order", { ascending: true });

      if (error) throw error;
      setCategories(data || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  }, [supabase]);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from("articles")
        .select(`
          id,
          slug,
          title,
          subtitle,
          excerpt,
          cover_image,
          read_time,
          view_count,
          likes_count,
          is_featured,
          published_at,
          author:profiles!author_id(username, full_name, avatar_url),
          category:categories!category_id(name, slug, color)
        `, { count: "exact" })
        .eq("status", "published");

      if (selectedCategory) {
        query = query.eq("category.slug", selectedCategory);
      }

      if (searchQuery) {
        query = query.ilike("title", `%${searchQuery}%`);
      }

      if (sortBy === "popular") {
        query = query.order("view_count", { ascending: false });
      } else {
        query = query.order("published_at", { ascending: false });
      }

      const from = (page - 1) * ARTICLES_PER_PAGE;
      query = query.range(from, from + ARTICLES_PER_PAGE - 1);

      const { data, error, count } = await query;

      if (error) throw error;

      const mappedArticles: Article[] = (data || []).map((item: Record<string, unknown>) => {
        const rawAuthor = item.author as Record<string, unknown> | null;
        const rawCategory = item.category as Record<string, unknown> | null;

        return {
          id: item.id as string,
          slug: item.slug as string,
          title: item.title as string,
          subtitle: item.subtitle as string | null,
          excerpt: (item.excerpt as string) || "",
          cover_image: item.cover_image as string | null,
          read_time: item.read_time as number | null,
          view_count: item.view_count as number,
          likes_count: item.likes_count as number,
          is_featured: item.is_featured as boolean,
          published_at: item.published_at as string,
          author: rawAuthor ? {
            username: rawAuthor.username as string,
            full_name: rawAuthor.full_name as string | null,
            avatar_url: rawAuthor.avatar_url as string | null,
          } : { username: "unknown", full_name: null, avatar_url: null },
          category: rawCategory ? {
            name: rawCategory.name as string,
            slug: rawCategory.slug as string,
            color: rawCategory.color as string | null,
          } : { name: "Umum", slug: "umum", color: null },
        } as Article;
      });

      setArticles(mappedArticles);
      setTotalCount(count || 0);
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError("Gagal memuat artikel. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }, [supabase, selectedCategory, searchQuery, sortBy, page]);

  useEffect(() => {
    fetchCategories();
    checkAuth();
  }, [fetchCategories, checkAuth]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const totalPages = Math.ceil(totalCount / ARTICLES_PER_PAGE);

  const handleWriteArticle = useCallback(() => {
    if (user) {
      window.location.href = "/community/articles/new";
    } else {
      window.location.href = "/community/login";
    }
  }, [user]);

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

          {/* Search, Sort & Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Cari artikel..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                className="pl-12 bg-slate-900 border-slate-800 text-slate-50 placeholder:text-slate-500"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setPage(1);
                  }}
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
                onClick={() => {
                  setSortBy("newest");
                  setPage(1);
                }}
                className={sortBy === "newest" ? "bg-emerald-500 text-slate-950" : "border-slate-700 text-slate-300"}
              >
                <Clock className="w-4 h-4 mr-2" />
                Terbaru
              </Button>
              <Button
                variant={sortBy === "popular" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSortBy("popular");
                  setPage(1);
                }}
                className={sortBy === "popular" ? "bg-emerald-500 text-slate-950" : "border-slate-700 text-slate-300"}
              >
                <Eye className="w-4 h-4 mr-2" />
                Populer
              </Button>
            </div>

            <Button onClick={handleWriteArticle} className="bg-emerald-500 text-slate-950 hover:bg-emerald-400">
              <Plus className="w-4 h-4 mr-2" />
              Tulis Artikel
            </Button>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setPage(1);
              }}
              className={`px-4 py-2 text-sm rounded-full transition-colors ${
                selectedCategory === null
                  ? "bg-emerald-500 text-slate-950"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              Semua
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.slug);
                  setPage(1);
                }}
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

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
              <span className="ml-3 text-slate-400">Memuat artikel...</span>
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-slate-400 mb-4">{error}</p>
                <Button onClick={() => fetchArticles()} variant="outline" className="border-slate-700">
                  Coba Lagi
                </Button>
              </div>
            </div>
          )}

          {/* Articles Content */}
          {!loading && !error && (
            <>
              {/* Featured Articles */}
              {articles.filter((a) => a.is_featured).length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-slate-50 mb-4">Featured</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {articles
                      .filter((a) => a.is_featured)
                      .map((article) => (
                        <Link
                          key={article.id}
                          href={`/community/articles/${article.slug}`}
                          className="group bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-emerald-500/30 card-hover"
                        >
                          <div className="flex flex-col sm:flex-row">
                            {article.cover_image && (
                              <div className="sm:w-48 aspect-video sm:aspect-square relative overflow-hidden">
                                <Image
                                  src={article.cover_image}
                                  alt={article.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                            <div className="flex-1 p-4">
                              <span
                                className="px-2 py-0.5 text-xs rounded-full"
                                style={{ backgroundColor: `${article.category?.color || "#10B981"}20`, color: article.category?.color || "#10B981" }}
                              >
                                {article.category?.name || "Umum"}
                              </span>
                              <h3 className="font-semibold text-slate-50 mt-2 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                                {article.title}
                              </h3>
                              <p className="text-sm text-slate-400 mt-1 line-clamp-2">{article.excerpt}</p>
                              <div className="flex items-center gap-3 mt-3 text-xs text-slate-500">
                                <span>{article.author?.username || "Unknown"}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {article.read_time || 0} menit
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
                {articles.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="w-8 h-8 text-slate-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-300 mb-2">Belum ada artikel</h3>
                    <p className="text-slate-500 mb-6">Jadilah penulis pertama di komunitas ini</p>
                    <Button onClick={handleWriteArticle} className="bg-emerald-500 text-slate-950 hover:bg-emerald-400">
                      <Plus className="w-4 h-4 mr-2" />
                      Tulis Artikel
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {articles.map((article) => (
                        <Link
                          key={article.id}
                          href={`/community/articles/${article.slug}`}
                          className="group bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-emerald-500/30 card-hover"
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
                              style={{ backgroundColor: `${article.category?.color || "#10B981"}20`, color: article.category?.color || "#10B981" }}
                            >
                              {article.category?.name || "Umum"}
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
                                {article.read_time || 0} menit
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {article.view_count}
                              </span>
                              <span>{formatDistanceToNow(new Date(article.published_at || Date.now()), { addSuffix: true, locale: id })}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-center gap-2 mt-8">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPage((p) => Math.max(1, p - 1))}
                          disabled={page === 1}
                          className="border-slate-700 text-slate-300"
                        >
                          Previous
                        </Button>
                        <span className="text-sm text-slate-400 px-4">
                          Halaman {page} dari {totalPages}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                          disabled={page === totalPages}
                          className="border-slate-700 text-slate-300"
                        >
                          Next
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
