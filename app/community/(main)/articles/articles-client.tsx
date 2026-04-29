"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { Search, Clock, Eye, Plus, X, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArticleCardSkeleton } from "@/components/skeleton/ArticleCardSkeleton";

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover_image: string | null;
  author: {
    full_name: string | null;
    avatar_url: string | null;
  };
  category: string | null;
  read_time: number | null;
  views_count: number;
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

export function ArticlesPageClient() {
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
  const fetchCalled = useRef(false);

  const supabase = createClient();
  console.log("ArticlesPageClient render, supabase:", !!supabase);

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
        .select("id, name, slug, color");

      if (error) throw error;
      setCategories(data || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  }, [supabase]);

  const fetchArticles = useCallback(async () => {
    console.log("FETCH ARTICLES START");
    setLoading(true);
    setError(null);

    try {
      console.log("Using hardcoded test data");
      const testArticles: Article[] = [
        {
          id: "test-1",
          slug: "test-artikel-1",
          title: "10 Tips Menjadi Housekeeper Profesional di Bali",
          excerpt: "Artikel test untuk debugging",
          cover_image: null,
          read_time: 5,
          views_count: 100,
          likes_count: 10,
          is_featured: false,
          published_at: new Date().toISOString(),
          author: { full_name: null, avatar_url: null },
          category: null,
        },
        {
          id: "test-2",
          slug: "test-artikel-2",
          title: "Panduan Lengkap Sistem Escrow",
          excerpt: "Artikel test kedua",
          cover_image: null,
          read_time: 8,
          views_count: 200,
          likes_count: 20,
          is_featured: false,
          published_at: new Date().toISOString(),
          author: { full_name: null, avatar_url: null },
          category: null,
        }
      ];

      console.log("Setting hardcoded articles:", testArticles.length);
      setArticles(testArticles);
      setTotalCount(testArticles.length);
      console.log("Done, setting loading false");
    } catch (err) {
      console.error("Catch error:", err);
      setError("Gagal memuat artikel.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
    checkAuth();
  }, [fetchCategories, checkAuth]);

  useEffect(() => {
    console.log("ARTICLES PAGE MOUNT");
    fetchArticles();
  }, [fetchArticles]);

  const totalPages = Math.ceil(totalCount / ARTICLES_PER_PAGE);

  const handleWriteArticle = useCallback(() => {
    if (user) {
      window.location.href = "/community/articles/new";
    } else {
      window.location.href = "/login";
    }
  }, [user]);

  return (
    <div className="text-foreground">
      <main className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Artikel & Knowledge Base</h1>
            <p className="text-muted-foreground">
              Pelajari tips, panduan, dan kisah inspiratif dari komunitas
            </p>
          </div>

          {/* Search, Sort & Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Cari artikel..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                className="pl-12 bg-card border-border text-foreground placeholder:text-muted-foreground"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setPage(1);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
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
                className={sortBy === "newest" ? "bg-emerald-500 text-slate-950" : "border-border text-foreground/80"}
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
                className={sortBy === "popular" ? "bg-emerald-500 text-slate-950" : "border-border text-foreground/80"}
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
                  : "bg-muted text-muted-foreground hover:bg-muted"
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
                    : "bg-muted text-muted-foreground hover:bg-muted"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Loading State - Show skeleton during loading */}
          {loading && (
            <div className="space-y-8">
              {/* Featured Skeleton */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Featured</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <ArticleCardSkeleton variant="featured" />
                  <ArticleCardSkeleton variant="featured" />
                </div>
              </div>

              {/* All Articles Skeleton */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Semua Artikel</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <ArticleCardSkeleton key={i} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">{error}</p>
                <Button onClick={() => fetchArticles()} variant="outline" className="border-border">
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
                  <h2 className="text-xl font-semibold text-foreground mb-4">Featured</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {articles
                      .filter((a) => a.is_featured)
                      .map((article) => (
                        <Link
                          key={article.id}
                          href={`/community/articles/${article.slug}`}
                          className="group bg-card border border-border rounded-xl overflow-hidden hover:border-emerald-500/30 card-hover"
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
                                style={{ backgroundColor: "#10B98120", color: "#10B981" }}
                              >
                                {article.category || "Umum"}
                              </span>
                              <h3 className="font-semibold text-foreground mt-2 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                                {article.title}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{article.excerpt}</p>
                              <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground/70">
                                <span>{article.author?.full_name || "Unknown"}</span>
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
                <h2 className="text-xl font-semibold text-foreground mb-4">Semua Artikel</h2>
                {articles.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="w-8 h-8 text-muted-foreground/70" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground/80 mb-2">Belum ada artikel</h3>
                    <p className="text-muted-foreground/70 mb-6">Jadilah penulis pertama di komunitas ini</p>
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
                          className="group bg-card border border-border rounded-xl overflow-hidden hover:border-emerald-500/30 card-hover"
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
                          className="border-border text-foreground/80"
                        >
                          Previous
                        </Button>
                        <span className="text-sm text-muted-foreground px-4">
                          Halaman {page} dari {totalPages}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                          disabled={page === totalPages}
                          className="border-border text-foreground/80"
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
