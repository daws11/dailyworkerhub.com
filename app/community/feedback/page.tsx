"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, X, MessageSquare, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CommunityNavbar } from "@/components/layout/CommunityNavbar";
import { useFeedbackItems, useFeedbackStats } from "@/lib/feedback/hooks";
import { useToggleVote } from "@/lib/feedback/mutation-hooks";
import { FeedbackCard } from "@/components/feedback/FeedbackCard";
import { FeedbackForm } from "@/components/feedback/FeedbackForm";
import { FeedbackFilters, FeedbackStatus, FeedbackSortBy } from "@/components/feedback/FeedbackFilters";
import { useCurrentUser } from "@/lib/auth/hooks";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function FeedbackPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<FeedbackStatus>("all");
  const [sortBy, setSortBy] = useState<FeedbackSortBy>("votes");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [votedItems, setVotedItems] = useState<Set<string>>(new Set());
  const [votesOptimistic, setVotesOptimistic] = useState<Record<string, number>>({});
  const [isFeedbackFormOpen, setIsFeedbackFormOpen] = useState(false);
  const [feedbackStatuses, setFeedbackStatuses] = useState<Record<string, string>>({});
  const [userVotesLoaded, setUserVotesLoaded] = useState(false);

  const { user, isAdmin } = useCurrentUser();
  const toggleVoteMutation = useToggleVote();

  // Fetch user's votes on mount or user change
  useEffect(() => {
    async function fetchUserVotes() {
      if (!user) {
        setVotedItems(new Set());
        setUserVotesLoaded(true);
        return;
      }

      const supabase = createClient();
      const { data, error } = await supabase
        .from('votes')
        .select('target_id')
        .eq('user_id', user.id)
        .eq('target_type', 'feedback');

      if (!error && data) {
        const typedData = data as { target_id: string }[];
        const votedIds = new Set(typedData.map((v) => v.target_id));
        setVotedItems(votedIds);
      }
      setUserVotesLoaded(true);
    }

    fetchUserVotes();
  }, [user]);

  const { data: feedbackData, isLoading, error } = useFeedbackItems({
    status: selectedStatus === "all" ? undefined : selectedStatus,
    category: (selectedCategory || undefined) as "feature" | "bug" | "improvement" | undefined,
    sortBy,
  });

  const { data: statsData } = useFeedbackStats();

  const feedbackList = feedbackData?.data ?? [];

  const filteredFeedback = useMemo(() => {
    if (!searchQuery) return feedbackList;
    return feedbackList.filter((f) =>
      f.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [feedbackList, searchQuery]);

  const handleVote = (id: string, currentVotesCount: number) => {
    if (!user) {
      toast.error("Please sign in to vote");
      return;
    }

    const isCurrentlyVoted = votedItems.has(id);
    const voteDelta = isCurrentlyVoted ? -1 : 1;
    const newVotesCount = (votesOptimistic[id] ?? currentVotesCount) + voteDelta;

    // Optimistic update - immediately update UI
    setVotesOptimistic((prev) => ({ ...prev, [id]: newVotesCount }));
    setVotedItems((prev) => {
      const newSet = new Set(prev);
      if (isCurrentlyVoted) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });

    // Call mutation
    toggleVoteMutation.mutate(
      {
        user_id: user.id,
        target_id: id,
        value: 1,
      },
      {
        onError: (err) => {
          // Revert optimistic update on error
          setVotesOptimistic((prev) => {
            const newOptimistic = { ...prev };
            delete newOptimistic[id];
            return newOptimistic;
          });
          setVotedItems((prev) => {
            const newSet = new Set(prev);
            if (isCurrentlyVoted) {
              // If we un-voted, add back
              newSet.add(id);
            } else {
              // If we voted, remove
              newSet.delete(id);
            }
            return newSet;
          });
          toast.error(err.message || "Failed to vote");
        },
      }
    );
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    setFeedbackStatuses((prev) => ({
      ...prev,
      [id]: newStatus,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Main Content */}
      <CommunityNavbar variant="simple" />
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
            <FeedbackForm
              open={isFeedbackFormOpen}
              onOpenChange={setIsFeedbackFormOpen}
              trigger={
                <Button className="bg-emerald-500 text-slate-950 hover:bg-emerald-400">
                  <Plus className="w-4 h-4 mr-2" />
                  Kirim Feedback
                </Button>
              }
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            <FeedbackFilters
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              sortBy={sortBy}
              onSortChange={setSortBy}
              className="flex-1"
            />
            <select
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="px-3 py-2 text-sm bg-slate-900 border border-slate-800 rounded-lg text-slate-300"
            >
              <option value="">Semua Kategori</option>
              <option value="feature">Feature</option>
              <option value="bug">Bug</option>
              <option value="improvement">Improvement</option>
            </select>
          </div>

          {/* Stats */}
          {statsData?.data && (
            <div className="flex flex-wrap gap-6 mb-8 p-4 bg-slate-900 border border-slate-800 rounded-xl">
              {[
                { label: "Total Feedback", value: statsData.data.total },
                { label: "Under Review", value: statsData.data.under_review },
                { label: "Planned", value: statsData.data.planned },
                { label: "Completed", value: statsData.data.completed },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-emerald-400">{stat.value}</div>
                  <div className="text-xs text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Feedback List */}
          <div className="space-y-4">
            {isLoading && (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                <span className="ml-3 text-slate-400">Memuat feedback...</span>
              </div>
            )}

            {error && (
              <div className="text-center py-16">
                <p className="text-red-400 mb-4">Gagal memuat feedback. Silakan coba lagi.</p>
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                  className="border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  Muat Ulang
                </Button>
              </div>
            )}

            {!isLoading && !error && filteredFeedback.map((item) => {
              const displayVotesCount = votesOptimistic[item.id] ?? item.votes_count;
              return (
              <FeedbackCard
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                author={{
                  username: item.author?.username ?? "Unknown",
                  avatar_url: item.author?.avatar_url ?? null,
                }}
                category={item.category as "feature" | "bug" | "improvement"}
                status={(feedbackStatuses[item.id] as "under_review" | "planned" | "in_progress" | "completed" | "declined") || item.status}
                votesCount={displayVotesCount}
                commentsCount={(item as { comments_count?: number }).comments_count ?? 0}
                createdAt={item.created_at}
                isVoted={votedItems.has(item.id)}
                onVote={() => handleVote(item.id, item.votes_count)}
                isAdmin={isAdmin}
                onStatusChange={(newStatus) => handleStatusChange(item.id, newStatus)}
              />
              );
            })}

            {!isLoading && !error && filteredFeedback.length === 0 && (
              <div className="text-center py-16">
                <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-300 mb-2">Tidak ada feedback</h3>
                <p className="text-slate-500 mb-6">Jadilah yang pertama memberikan feedback</p>
                <FeedbackForm
                  open={isFeedbackFormOpen}
                  onOpenChange={setIsFeedbackFormOpen}
                  trigger={
                    <Button className="bg-emerald-500 text-slate-950 hover:bg-emerald-400">
                      <Plus className="w-4 h-4 mr-2" />
                      Kirim Feedback
                    </Button>
                  }
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}