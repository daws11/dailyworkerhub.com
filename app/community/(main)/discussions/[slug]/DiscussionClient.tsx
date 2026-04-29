"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { toast } from "sonner";
import {
  ArrowUp,
  ArrowDown,
  Share2,
  Bookmark,
  Flag,
  Trash2,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CommentSection } from "@/components/discussion/CommentSection";
import { RecommendationList } from "@/components/recommendations/RecommendationList";

interface Discussion {
  id: string;
  slug: string;
  title: string;
  content: string;
  author: {
    username: string;
    full_name: string | null;
    avatar_url: string | null;
  } | null;
  category: {
    name: string;
    slug: string;
    color: string;
  } | null;
  status: string;
  view_count: number;
  likes_count: number;
  comments_count: number;
  is_pinned: boolean;
  created_at: string;
}

interface Comment {
  id: string;
  content: string;
  author: {
    username: string;
    full_name: string | null;
    avatar_url: string | null;
  };
  parent_id: string | null;
  is_solution: boolean;
  likes_count: number;
  created_at: string;
  deleted_at: string | null;
  replies?: Comment[];
}

interface DiscussionClientProps {
  discussion: Discussion;
  tags?: { id: string; name: string; slug: string }[];
  comments?: Comment[];
}

export function DiscussionClient({ discussion, tags = [], comments = [] }: DiscussionClientProps) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const supabase = createClient();

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user ?? null;

      if (!user) {
        throw new Error("Unauthorized");
      }

      const { data: discussionData } = await supabase
        .from("discussions")
        .select("author_id")
        .eq("id", discussion.id)
        .single<{ author_id: string }>();

      if (!discussionData) {
        throw new Error("Discussion not found");
      }

      if (discussionData.author_id !== user.id) {
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
        .eq("id", discussion.id);

      if (error) {
        throw new Error(error.message);
      }

      toast.success("Diskusi berhasil dihapus");

      setShowDeleteDialog(false);
      window.location.href = "/community/discussions";
    } catch (error) {
      console.error("Failed to delete discussion:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="text-foreground">
      <main className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground/70 mb-6">
            <Link href="/community/discussions" className="hover:text-foreground/80">
              Diskusi
            </Link>
            <span>/</span>
            {discussion.category && (
              <>
                <span
                  className="px-2 py-0.5 rounded-full text-xs"
                  style={{
                    backgroundColor: `${discussion.category.color}20`,
                    color: discussion.category.color,
                  }}
                >
                  {discussion.category.name}
                </span>
                <span>/</span>
              </>
            )}
          </div>

          {/* Main Discussion Card */}
          <article className="bg-card border border-border rounded-2xl overflow-hidden mb-6">
            {/* Header */}
            <div className="p-6 pb-0">
              <div className="flex items-center gap-2 mb-4">
                {discussion.is_pinned && (
                  <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Pinned
                  </span>
                )}
                {discussion.category && (
                  <span
                    className="px-2 py-0.5 text-xs rounded-full"
                    style={{
                      backgroundColor: `${discussion.category.color}20`,
                      color: discussion.category.color,
                    }}
                  >
                    {discussion.category.name}
                  </span>
                )}
                {discussion.status === "solved" && (
                  <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                    Solved
                  </span>
                )}
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground"
                      >
                        #{tag.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                {discussion.title}
              </h1>

              {/* Author Meta */}
              <div className="flex items-center gap-3 mb-6">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={discussion.author?.avatar_url || undefined} />
                  <AvatarFallback className="bg-emerald-500/20 text-emerald-400">
                    {discussion.author?.username?.charAt(0).toUpperCase() || "?"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-foreground">{discussion.author?.username || "Unknown"}</div>
                  <div className="text-sm text-muted-foreground/70">
                    {formatDistanceToNow(new Date(discussion.created_at), { addSuffix: true, locale: id })}
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 pb-6">
              <div className="prose prose-invert prose-slate max-w-none">
                <div className="text-foreground/80 whitespace-pre-wrap leading-relaxed">
                  {discussion.content}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 mt-8 pt-6 border-t border-border">
                <div className="flex items-center gap-1">
                  <Button
                    variant={liked ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setLiked(!liked);
                      if (disliked) setDisliked(false);
                    }}
                    className={`${liked ? "bg-emerald-500 text-slate-950" : "border-border text-muted-foreground"}`}
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
                    className="border-border text-muted-foreground"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                </div>

                <Button variant="outline" size="sm" className="border-border text-muted-foreground">
                  <Bookmark className="w-4 h-4 mr-2" />
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

                <AlertDialog open={showDeleteDialog} onOpenChange={(open) => setShowDeleteDialog(open)}>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm" className="border-border text-muted-foreground hover:text-red-400 hover:border-red-400">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Hapus
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Hapus Diskusi?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Apakah Anda yakin ingin menghapus diskusi ini? Tindakan ini tidak dapat dibatalkan dan semua komentar akan ikut terhapus.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => setShowDeleteDialog(false)} disabled={isDeleting}>
                        Batal
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteConfirm}
                        disabled={isDeleting}
                        className="bg-red-500 hover:bg-red-600 text-white"
                      >
                        {isDeleting ? "Menghapus..." : "Ya, Hapus"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </article>

          {/* Comments Section */}
          <CommentSection
            discussionId={discussion.id}
            comments={comments}
          />

          {/* Recommendations */}
          <RecommendationList type="discussions" excludeSlugs={[discussion.slug]} limit={3} />
        </div>
      </main>
    </div>
  );
}
