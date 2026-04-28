"use client";

import { useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VoteButtonsProps {
  initialCount: number;
  initialLiked?: boolean;
  initialDisliked?: boolean;
  onVote?: (type: "like" | "dislike" | "none", count: number) => void;
  size?: "sm" | "default" | "lg";
  showLabels?: boolean;
  className?: string;
}

export function VoteButtons({
  initialCount,
  initialLiked = false,
  initialDisliked = false,
  onVote,
  size = "default",
  showLabels = false,
  className,
}: VoteButtonsProps) {
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(initialLiked);
  const [disliked, setDisliked] = useState(initialDisliked);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setCount((c) => c - 1);
      onVote?.("none", count - 1);
    } else {
      setLiked(true);
      setDisliked(false);
      setCount((c) => c + 1);
      onVote?.("like", count + 1);
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
      onVote?.("none", count);
    } else {
      setDisliked(true);
      if (liked) {
        setLiked(false);
        setCount((c) => c - 1);
      }
      onVote?.("dislike", count);
    }
  };

  const sizeClasses = {
    sm: "text-xs",
    default: "text-sm",
    lg: "text-base",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    default: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Button
        variant={liked ? "default" : "outline"}
        size="sm"
        onClick={handleLike}
        className={cn(
          "gap-1",
          sizeClasses[size],
          liked
            ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
            : "border-border text-muted-foreground hover:border-emerald-500 hover:text-emerald-400"
        )}
      >
        <ArrowUp className={iconSizes[size]} />
        <span className="min-w-[1.5rem] text-center">{count}</span>
        {showLabels && <span className="hidden sm:inline">Suka</span>}
      </Button>

      <Button
        variant={disliked ? "default" : "outline"}
        size="sm"
        onClick={handleDislike}
        className={cn(
          "gap-1",
          sizeClasses[size],
          disliked
            ? "bg-red-500 text-slate-950 hover:bg-red-400"
            : "border-border text-muted-foreground hover:border-red-500 hover:text-red-400"
        )}
      >
        <ArrowDown className={iconSizes[size]} />
        {showLabels && <span className="hidden sm:inline">Tidak Suka</span>}
      </Button>
    </div>
  );
}
