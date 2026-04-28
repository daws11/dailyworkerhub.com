"use client";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface ArticleCardSkeletonProps {
  className?: string;
  variant?: "featured" | "default";
}

function ArticleCardSkeleton({
  className,
  variant = "default",
}: ArticleCardSkeletonProps) {
  if (variant === "featured") {
    return (
      <div
        className={cn(
          "bg-card border border-border rounded-xl overflow-hidden",
          className
        )}
      >
        <div className="flex flex-col sm:flex-row">
          <Skeleton className="sm:w-48 aspect-video sm:aspect-square bg-dark-800" />
          <div className="flex-1 p-4 space-y-3">
            <Skeleton className="w-20 h-5 rounded-full bg-dark-800" />
            <Skeleton className="w-3/4 h-5 rounded bg-dark-800" />
            <Skeleton className="w-full h-4 rounded bg-dark-800" />
            <div className="flex items-center gap-3 pt-2">
              <Skeleton className="w-24 h-3 rounded bg-dark-800" />
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
        "bg-card border border-border rounded-xl overflow-hidden",
        className
      )}
    >
      <Skeleton className="aspect-video bg-dark-800" />
      <div className="p-4 space-y-3">
        <Skeleton className="w-20 h-5 rounded-full bg-dark-800" />
        <Skeleton className="w-full h-5 rounded bg-dark-800" />
        <Skeleton className="w-3/4 h-4 rounded bg-dark-800" />
        <div className="flex items-center gap-3 pt-2">
          <Skeleton className="w-16 h-3 rounded bg-dark-800" />
          <Skeleton className="w-16 h-3 rounded bg-dark-800" />
        </div>
      </div>
    </div>
  );
}

export { ArticleCardSkeleton };