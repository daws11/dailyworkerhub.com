import { cn } from "@/lib/utils"

type SkeletonVariant = "default" | "subtle" | "accent"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant
}

const variantStyles: Record<SkeletonVariant, string> = {
  default: "bg-primary/10 dark:bg-dark-800",
  subtle: "bg-muted dark:bg-dark-800",
  accent: "bg-accent dark:bg-dark-700",
}

function Skeleton({
  className,
  variant = "default",
  ...props
}: SkeletonProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("animate-pulse rounded-md", variantStyles[variant], className)}
      {...props}
    />
  )
}

export { Skeleton }
export type { SkeletonVariant }
