import * as React from "react"

import { cn } from "@/lib/utils"

interface ArticleContentProps {
  content: string
  className?: string
}

/**
 * Renders TipTap HTML content as read-only content
 * Applies consistent styling for headings, lists, code blocks, etc.
 */
const ArticleContent = React.forwardRef<HTMLDivElement, ArticleContentProps>(
  ({ content, className }, ref) => {
    if (!content) {
      return (
        <div className={cn("text-muted-foreground italic", className)}>
          No content available.
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          "prose prose-sm sm:prose-base lg:prose-lg max-w-none",
          "dark:prose-invert",
          "[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4",
          "[&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-4",
          "[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-3",
          "[&_h4]:text-lg [&_h4]:font-medium [&_h4]:mt-4 [&_h4]:mb-2",
          "[&_h1:first-child]:mt-0 [&_h2:first-child]:mt-0 [&_h3:first-child]:mt-0 [&_h4:first-child]:mt-0",
          "[&_p]:my-4 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0",
          "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary/80",
          "[&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_blockquote]:my-6",
          "[&_blockquote_p]:my-0",
          "[&_pre]:bg-muted [&_pre]:rounded-md [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:my-6 [&_pre]:overflow-x-auto",
          "[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:font-mono [&_pre_code]:text-sm",
          "[&_code]:bg-muted [&_code]:rounded [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm",
          "[&_code:not(pre_*)]:before:content-[''] [&_code:not(pre_*)]:after:content-['']",
          "[&_img]:rounded-md [&_img]:max-w-full [&_img]:h-auto [&_img]:my-6",
          "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4",
          "[&_ul_li]:my-2",
          "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4",
          "[&_ol_li]:my-2",
          "[&_hr]:border [&_hr]:border-border [&_hr]:my-8",
          "[&_table]:w-full [&_table]:border-collapse [&_table]:my-6",
          "[&_th]:border [&_th]:border-border [&_th]:px-4 [&_th]:py-2 [&_th]:bg-muted [&_th]:font-semibold [&_th]:text-left",
          "[&_td]:border [&_td]:border-border [&_td]:px-4 [&_td]:py-2 [&_td]:text-left",
          className
        )}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    )
  }
)

ArticleContent.displayName = "ArticleContent"

export { ArticleContent }