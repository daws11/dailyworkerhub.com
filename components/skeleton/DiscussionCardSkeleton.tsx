"use client";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface DiscussionCardSkeletonProps {
  className?: string;
  variant?: "featured" | "default";
}

function DiscussionCardSkeleton({
  className,
  variant = "default",
}: DiscussionCardSkeletonProps) {
  if (variant === "featured") {
    return (
      <div
        className={cn(
          "bg-card border border-border rounded-xl p-5",
          className
        )}
      >
        <div className="flex items-start gap-4">
          {/* Vote Section */}
          <div className="flex flex-col items-center px-3 py-2 bg-muted/50 border border-border rounded-xl min-w-[60px]">
            <Skeleton className="w-5 h-5 rounded bg-dark-800" />
            <Skeleton className="w-8 h-6 rounded bg-dark-800 mt-1" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 space-y-3">
            <div className="flex items-center gap-2">
              <Skeleton className="w-16 h-5 rounded-full bg-dark-800" />
              <Skeleton className="w-20 h-5 rounded-full bg-dark-800" />
            </div>
            <Skeleton className="w-full h-5 rounded bg-dark-800" />
            <Skeleton className="w-3/4 h-4 rounded bg-dark-800" />
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-2">
                <Skeleton className="w-5 h-5 rounded-full bg-dark-800" />
                <Skeleton className="w-20 h-3 rounded bg-dark-800" />
              </div>
              <Skeleton className="w-16 h-3 rounded bg-dark-800" />
              <Skeleton className="w-20 h-3 rounded bg-dark-800" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-card border border-border rounded-xl p-5",
        className
      )}
    >
      <div className="flex items-start gap-4">
        {/* Vote Section */}
        <div className="flex flex-col items-center px-3 py-2 bg-muted/50 border border-border rounded-xl min-w-[60px]">
          <Skeleton className="w-5 h-5 rounded bg-dark-800" />
          <Skeleton className="w-8 h-6 rounded bg-dark-800 mt-1" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <Skeleton className="w-16 h-5 rounded-full bg-dark-800" />
          </div>
          <Skeleton className="w-full h-5 rounded bg-dark-800" />
          <Skeleton className="w-3/4 h-4 rounded bg-dark-800" />
          <div className="flex items-center gap-3 pt-2">
            <div className="flex items-center gap-2">
              <Skeleton className="w-5 h-5 rounded-full bg-dark-800" />
              <Skeleton className="w-16 h-3 rounded bg-dark-800" />
            </div>
            <Skeleton className="w-14 h-3 rounded bg-dark-800" />
            <Skeleton className="w-14 h-3 rounded bg-dark-800" />
          </div>
        </div>
      </div>
    </div>
  );
}

export { DiscussionCardSkeleton };