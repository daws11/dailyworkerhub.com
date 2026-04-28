"use client";

import Link from "next/link";
import { Clock, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { VoteButton } from "@/components/feedback/VoteButton";
import { StatusUpdateForm } from "@/components/feedback/StatusUpdateForm";

export interface FeedbackCardProps {
  id: string;
  title: string;
  description: string;
  author: {
    username: string;
    avatar_url: string | null;
  };
  category: "feature" | "bug" | "improvement";
  status: "under_review" | "planned" | "in_progress" | "completed" | "declined";
  votesCount: number;
  commentsCount: number;
  createdAt: string;
  isVoted: boolean;
  onVote: () => void;
  isAdmin?: boolean;
  onStatusChange?: (newStatus: string) => void;
}

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

export function FeedbackCard({
  id,
  title,
  description,
  author,
  category,
  status,
  votesCount,
  commentsCount,
  createdAt,
  isVoted,
  onVote,
  isAdmin = false,
  onStatusChange,
}: FeedbackCardProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const handleStatusChange = (newStatus: string) => {
    onStatusChange?.(newStatus);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-5 hover:border-emerald-500/30 transition-colors">
      <div className="flex items-start gap-4">
        {/* Vote Button */}
        <VoteButton
          votesCount={votesCount}
          isVoted={isVoted}
          onVote={onVote}
          size="md"
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge className={categoryConfig[category].color}>
              {categoryConfig[category].label}
            </Badge>
            {isAdmin ? (
              <StatusUpdateForm
                feedbackId={id}
                currentStatus={status}
                isAdmin={isAdmin}
                onStatusChange={handleStatusChange}
              />
            ) : (
              <Badge className={statusConfig[status].color}>
                {statusConfig[status].label}
              </Badge>
            )}
          </div>

          {/* Title */}
          <Link
            href={`/community/feedback/${id}`}
            className="block hover:text-emerald-400 transition-colors"
          >
            <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
          </Link>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{description}</p>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground/70">
            <span>by {author.username}</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              {commentsCount} komentar
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}