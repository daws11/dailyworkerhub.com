"use client";

import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoteButtonProps {
  votesCount: number;
  isVoted: boolean;
  onVote: () => void;
  size?: "sm" | "md" | "lg";
}

export function VoteButton({
  votesCount,
  isVoted,
  onVote,
  size = "md",
}: VoteButtonProps) {
  const sizeClasses = {
    sm: {
      button: "p-1.5",
      icon: "w-4 h-4",
      text: "text-sm",
    },
    md: {
      button: "p-2",
      icon: "w-5 h-5",
      text: "text-lg",
    },
    lg: {
      button: "p-2.5",
      icon: "w-6 h-6",
      text: "text-xl",
    },
  };

  const classes = sizeClasses[size];

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={onVote}
        className={cn(
          "rounded-lg transition-colors",
          classes.button,
          isVoted
            ? "bg-emerald-500/20 text-emerald-400"
            : "bg-slate-800 text-slate-400 hover:text-emerald-400 hover:bg-slate-700"
        )}
        aria-label={isVoted ? "Remove vote" : "Add vote"}
      >
        <ArrowUp className={classes.icon} />
      </button>
      <span className={cn("font-semibold text-slate-200 mt-1", classes.text)}>
        {votesCount + (isVoted ? 1 : 0)}
      </span>
    </div>
  );
}
