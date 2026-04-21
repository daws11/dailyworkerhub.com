"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronUp, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { useVote } from "@/hooks/use-vote";
import { Button } from "@/components/ui/button";

const voteButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground border border-primary-border",
        outline: "border shadow-xs active:shadow-none",
        ghost: "border border-transparent",
      },
      size: {
        default: "min-h-9 px-4 py-2",
        sm: "min-h-8 rounded-md px-3 text-xs",
        lg: "min-h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "icon",
    },
  }
);

export interface VoteButtonProps
  extends VariantProps<typeof voteButtonVariants> {
  targetType: "discussion" | "comment" | "feedback";
  targetId: string;
  authorId: string;
  initialVotesCount?: number;
  onVoteChange?: (newCount: number) => void;
  disabled?: boolean;
  className?: string;
}

interface VoteButtonComponentProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof voteButtonVariants> {
  isActive?: boolean;
  activeColor?: string;
}

const VoteButtonComponent = React.forwardRef<
  HTMLButtonElement,
  VoteButtonComponentProps
>(
  (
    { className, variant, size, isActive, activeColor, children, ...props },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          isActive && activeColor,
          isActive && "bg-opacity-20",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    );
  }
);
VoteButtonComponent.displayName = "VoteButtonComponent";

export function VoteButton({
  targetType,
  targetId,
  authorId,
  initialVotesCount = 0,
  onVoteChange,
  className,
  variant = "ghost",
  size = "icon",
  disabled,
}: VoteButtonProps) {
  const {
    votesCount,
    userVote,
    isOwnContent,
    isLoading,
    upvote,
    downvote,
    canVote,
  } = useVote({
    targetType,
    targetId,
    authorId,
    initialVotesCount,
    onVoteChange,
  });

  const handleUpvote = React.useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!canVote || isLoading) return;
      await upvote();
    },
    [canVote, isLoading, upvote]
  );

  const handleDownvote = React.useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!canVote || isLoading) return;
      await downvote();
    },
    [canVote, isLoading, downvote]
  );

  const isUpvoteActive = userVote === 1;
  const isDownvoteActive = userVote === -1;

  // Don't render vote buttons if user owns the content
  if (isOwnContent) {
    return null;
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <VoteButtonComponent
        variant={variant}
        size={size}
        isActive={isUpvoteActive}
        activeColor="text-green-600 bg-green-50"
        onClick={handleUpvote}
        disabled={disabled || !canVote || isLoading}
        aria-label="Upvote"
        title={canVote ? "Upvote" : "Login to vote"}
      >
        <ChevronUp
          className={cn(
            "transition-transform",
            isUpvoteActive && "scale-110"
          )}
        />
      </VoteButtonComponent>

      <span
        className={cn(
          "min-w-[2ch] text-center text-sm font-medium tabular-nums",
          votesCount > 0 && "text-green-600",
          votesCount < 0 && "text-red-600",
          votesCount === 0 && "text-muted-foreground"
        )}
      >
        {votesCount}
      </span>

      <VoteButtonComponent
        variant={variant}
        size={size}
        isActive={isDownvoteActive}
        activeColor="text-red-600 bg-red-50"
        onClick={handleDownvote}
        disabled={disabled || !canVote || isLoading}
        aria-label="Downvote"
        title={canVote ? "Downvote" : "Login to vote"}
      >
        <ChevronDown
          className={cn(
            "transition-transform",
            isDownvoteActive && "scale-110"
          )}
        />
      </VoteButtonComponent>
    </div>
  );
}

// Compact version for inline use (e.g., in comment lists)
export interface VoteButtonCompactProps
  extends Omit<VoteButtonProps, "size" | "variant"> {}

export function VoteButtonCompact({
  className,
  ...props
}: VoteButtonCompactProps) {
  return (
    <VoteButton
      {...props}
      variant="ghost"
      className={cn("text-muted-foreground hover:text-foreground h-8 w-8 gap-0 p-0", className)}
    />
  );
}

// Full version with labels
export interface VoteButtonFullProps extends VoteButtonProps {}

export function VoteButtonFull({
  className,
  ...props
}: VoteButtonFullProps) {
  return (
    <VoteButton
      {...props}
      variant="outline"
      size="sm"
      className={cn("gap-1.5", className)}
    />
  );
}

export { voteButtonVariants };
