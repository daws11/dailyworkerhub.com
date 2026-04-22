"use client";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface FeedbackCardSkeletonProps {
  className?: string;
}

function FeedbackCardSkeleton({ className }: FeedbackCardSkeletonProps) {
  return (
    <div
      className={cn(
        "bg-slate-900 border border-slate-800 rounded-xl p-5",
        className
      )}
    >
      <div className="flex items-start gap-4">
        {/* Vote Button Skeleton */}
        <div className="flex flex-col items-center px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-xl min-w-[60px]">
          <Skeleton className="w-4 h-4 rounded bg-dark-800" />
          <Skeleton className="w-8 h-5 rounded bg-dark-800 mt-2" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-3">
          {/* Badges */}
          <div className="flex items-center gap-2">
            <Skeleton className="w-16 h-5 rounded-full bg-dark-800" />
            <Skeleton className="w-20 h-5 rounded-full bg-dark-800" />
          </div>

          {/* Title */}
          <Skeleton className="w-full h-5 rounded bg-dark-800" />

          {/* Description */}
          <Skeleton className="w-3/4 h-4 rounded bg-dark-800" />

          {/* Meta Info */}
          <div className="flex items-center gap-4">
            <Skeleton className="w-20 h-3 rounded bg-dark-800" />
            <div className="flex items-center gap-1">
              <Skeleton className="w-3 h-3 rounded bg-dark-800" />
              <Skeleton className="w-16 h-3 rounded bg-dark-800" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { FeedbackCardSkeleton };