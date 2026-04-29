"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { toast } from "sonner";
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
  Trash2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { DiscussionCardSkeleton } from "@/components/skeleton/DiscussionCardSkeleton";

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

type SortOption = "newest" | "popular" | "trending" | "votes";

const DISCUSSIONS_PER_PAGE = 20;

export function DiscussionsPageClient() {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [deleteDiscussionId, setDeleteDiscussionId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const supabase = createClient();

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

  const fetchDiscussions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from("community_discussions")
        .select(`
          id,
          slug,
          title,
          excerpt,
          author_id,
          category,
          likes_count,
          comments_count,
          views_count,
          is_pinned,
          created_at
        `, { count: "exact" });

      if (selectedCategory) {
        query = query.eq("category", selectedCategory);
      }

      if (searchQuery) {
        query = query.ilike("title", `%${searchQuery}%`);
      }

      if (sortBy === "popular" || sortBy === "votes") {
        query = query.order("likes_count", { ascending: false });
      } else if (sortBy === "trending") {
        query = query.order("comments_count", { ascending: false });
      } else {
        query = query.order("created_at", { ascending: false });
      }

      const from = (page - 1) * DISCUSSIONS_PER_PAGE;
      query = query.range(from, from + DISCUSSIONS_PER_PAGE - 1);

      const { data, error, count } = await query;

      if (error) throw error;

      const mappedDiscussions: Discussion[] = (data || []).map((item: Record<string, unknown>) => {
        return {
          id: item.id as string,
          slug: item.slug as string,
          title: item.title as string,
          excerpt: (item.excerpt as string) || "",
          author_id: item.author_id as string,
          status: "open",
          view_count: (item.views_count as number) || 0,
          likes_count: (item.likes_count as number) || 0,
          comments_count: (item.comments_count as number) || 0,
          is_pinned: (item.is_pinned as boolean) || false,
          is_featured: false,
          created_at: item.created_at as string,
          author: { username: "unknown", full_name: null, avatar_url: null },
          category: { name: item.category as string || "Umum", slug: item.category as string || "umum", color: "#10B981" },
        } as Discussion;
      });

      setDiscussions(mappedDiscussions);
      setTotalCount(count || 0);
    } catch (err) {
      console.error("Error fetching discussions:", err);
      setError("Gagal memuat diskusi. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }, [supabase, selectedCategory, searchQuery, sortBy, page]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchDiscussions();
  }, [fetchDiscussions]);

  const totalPages = Math.ceil(totalCount / DISCUSSIONS_PER_PAGE);

  const handleDeleteClick = (e: React.MouseEvent, discussionId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDeleteDiscussionId(discussionId);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDiscussionId) return;

    setIsDeleting(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user ?? null;

      if (!user) {
        throw new Error("Unauthorized");
      }

      const { data: discussion } = await supabase
        .from("discussions")
        .select("author_id")
        .eq("id", deleteDiscussionId)
        .single<{ author_id: string }>();

      if (!discussion) {
        throw new Error("Discussion not found");
      }

      if (discussion.author_id !== user.id) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single<{ role: string }>();

        if (profile?.role !== "admin" && profile?.role !== "moderator") {
          throw new Error("You can only delete your own discussions");
        }
      }

      const { error } = await supabase
        .from("discussions")
        .update({ updated_at: new Date().toISOString() } as never)
        .eq("id", deleteDiscussionId);

      if (error) {
        throw new Error(error.message);
      }

      toast.success("Diskusi berhasil dihapus");

      setDeleteDiscussionId(null);
      fetchDiscussions();
    } catch (error) {
      console.error("Failed to delete discussion:", error);
      setDeleteDiscussionId(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDiscussionId(null);
  };

  return (
    <div className="text-foreground">
      <main className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Forum Diskusi</h1>
            <p className="text-muted-foreground">
              Diskusikan pertanyaan, berbagi pengalaman, dan belajar dari komunitas
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Cari diskusi..."
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
                <ArrowUp className="w-4 h-4 mr-2" />
                Populer
              </Button>
              <Button
                variant={sortBy === "trending" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSortBy("trending");
                  setPage(1);
                }}
                className={sortBy === "trending" ? "bg-emerald-500 text-slate-950" : "border-border text-foreground/80"}
              >
                <Flame className="w-4 h-4 mr-2" />
                Trending
              </Button>
              <Button
                variant={sortBy === "votes" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSortBy("votes");
                  setPage(1);
                }}
                className={sortBy === "votes" ? "bg-emerald-500 text-slate-950" : "border-border text-foreground/80"}
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
              className="border-border text-foreground/80"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>

            {/* New Discussion Button */}
            <Link href="/community/discussions/new">
              <Button className="bg-emerald-500 text-slate-950 hover:bg-emerald-400">
                <Plus className="w-4 h-4 mr-2" />
                Buat Diskusi
              </Button>
            </Link>
          </div>

          {/* Category Pills */}
          {showFilters && (
            <div className="flex flex-wrap gap-2 mb-8 p-4 bg-card border border-border rounded-xl">
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setPage(1);
                }}
                className={`px-4 py-2 text-sm rounded-full transition-colors ${
                  !selectedCategory
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
                    setSelectedCategory(cat.id);
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
          )}

          {/* Loading State */}
          {loading && (
            <div className="space-y-4">
              <DiscussionCardSkeleton variant="featured" />
              <DiscussionCardSkeleton />
              <DiscussionCardSkeleton />
              <DiscussionCardSkeleton />
              <DiscussionCardSkeleton />
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">{error}</p>
                <Button onClick={() => fetchDiscussions()} variant="outline" className="border-border">
                  Coba Lagi
                </Button>
              </div>
            </div>
          )}

          {/* Discussions List */}
          {!loading && !error && (
            <div className="space-y-4">
              {discussions.map((discussion) => (
                <Link
                  key={discussion.id}
                  href={`/community/discussions/${discussion.slug}`}
                  className="block bg-card border border-border rounded-xl p-5 hover:border-emerald-500/30 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    {/* Vote Section */}
                    <div className="flex flex-col items-center px-3 py-2 bg-muted/50 border border-border rounded-xl min-w-[60px]">
                      <ArrowUp className="w-5 h-5 text-muted-foreground" />
                      <span className="text-lg font-semibold text-foreground">{discussion.likes_count}</span>
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

                      <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 hover:text-emerald-400 transition-colors">
                        {discussion.title}
                      </h3>

                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {discussion.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground/70">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                            <span className="text-emerald-400 text-xs font-medium">
                              {discussion.author.username?.charAt(0).toUpperCase() || "?"}
                            </span>
                          </div>
                          <span className="text-muted-foreground">{discussion.author.username}</span>
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

                        <button
                          onClick={(e) => handleDeleteClick(e, discussion.id)}
                          className="flex items-center gap-1 text-muted-foreground/70 hover:text-red-400 transition-colors ml-auto"
                          aria-label="Hapus diskusi"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Hapus</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}

              {discussions.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-muted-foreground/70" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground/80 mb-2">Tidak ada diskusi</h3>
                  <p className="text-muted-foreground/70 mb-6">Jadilah yang pertama membuat diskusi di komunitas ini</p>
                  <Link href="/community/discussions/new">
                    <Button className="bg-emerald-500 text-slate-950 hover:bg-emerald-400">
                      <Plus className="w-4 h-4 mr-2" />
                      Buat Diskusi Pertama
                    </Button>
                  </Link>
                </div>
              )}

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
            </div>
          )}

          {/* Delete Confirmation Dialog */}
          <AlertDialog open={!!deleteDiscussionId} onOpenChange={(open) => !open && handleDeleteCancel()}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Hapus Diskusi?</AlertDialogTitle>
                <AlertDialogDescription>
                  Tindakan ini tidak dapat dibatalkan. Diskusi yang dihapus tidak dapat dikembalikan.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={handleDeleteCancel} disabled={isDeleting}>
                  Batal
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteConfirm}
                  disabled={isDeleting}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  {isDeleting ? "Menghapus..." : "Hapus"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </main>
    </div>
  );
}
