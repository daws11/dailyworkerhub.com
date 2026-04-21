"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const voteDisplayVariants = cva(
  "inline-flex items-center justify-center text-sm font-medium tabular-nums transition-colors",
  {
    variants: {
      size: {
        sm: "min-w-[2ch] text-xs",
        default: "min-w-[2ch] text-sm",
        lg: "min-w-[3ch] text-base",
      },
      showZero: {
        true: "text-muted-foreground",
        false: "text-muted-foreground",
      },
    },
    defaultVariants: {
      size: "default",
      showZero: false,
    },
  }
);

export interface VoteDisplayProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof voteDisplayVariants> {
  votesCount: number;
  showSign?: boolean;
  showZero?: boolean;
}

/**
 * VoteDisplay - Shows net vote score with color indicators
 *
 * Displays the vote count with visual color feedback:
 * - Positive: Green text (text-green-600)
 * - Negative: Red text (text-red-600)
 * - Zero: Muted text color (text-muted-foreground)
 *
 * @example
 * // Basic usage
 * <VoteDisplay votesCount={42} />
 *
 * // With sign indicator
 * <VoteDisplay votesCount={-5} showSign />
 * // Shows: -5
 *
 * // Compact size
 * <VoteDisplay votesCount={100} size="sm" />
 */
export function VoteDisplay({
  className,
  votesCount,
  size,
  showSign = false,
  showZero = false,
  ...props
}: VoteDisplayProps) {
  const displayValue = React.useMemo(() => {
    if (votesCount > 0 && showSign) {
      return `+${votesCount}`;
    }
    return votesCount.toString();
  }, [votesCount, showSign]);

  return (
    <span
      className={cn(
        voteDisplayVariants({ size, showZero }),
        votesCount > 0 && "text-green-600",
        votesCount < 0 && "text-red-600",
        votesCount === 0 && !showZero && "text-muted-foreground",
        className
      )}
      {...props}
    >
      {displayValue}
    </span>
  );
}

// Compact version for inline use in lists
export interface VoteDisplayCompactProps
  extends Omit<VoteDisplayProps, "size"> {
  size?: "sm" | "default";
}

export function VoteDisplayCompact({
  className,
  ...props
}: VoteDisplayCompactProps) {
  return (
    <VoteDisplay
      {...props}
      size="sm"
      className={cn("font-normal", className)}
    />
  );
}

// Badge version with background
export interface VoteDisplayBadgeProps
  extends Omit<VoteDisplayProps, "size"> {}

export function VoteDisplayBadge({
  className,
  votesCount,
  ...props
}: VoteDisplayBadgeProps) {
  const badgeColorClass = React.useMemo(() => {
    if (votesCount > 0) return "bg-green-100 text-green-700";
    if (votesCount < 0) return "bg-red-100 text-red-700";
    return "bg-muted text-muted-foreground";
  }, [votesCount]);

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium tabular-nums",
        badgeColorClass,
        className
      )}
      {...props}
    >
      {votesCount > 0 && "+"}
      {votesCount}
    </span>
  );
}

export { voteDisplayVariants };
