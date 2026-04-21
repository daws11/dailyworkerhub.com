/**
 * Utility functions for article-related operations
 */

/**
 * Average reading speed in words per minute
 * Based on typical adult reading speed for technical content
 */
const WORDS_PER_MINUTE = 200

/**
 * Calculate estimated reading time from text content
 * @param content - The article text content
 * @returns Reading time in minutes, minimum 1
 */
export function calculateReadingTime(content: string): number {
  if (!content || typeof content !== 'string') {
    return 1
  }

  // Strip HTML tags if present
  const plainText = content.replace(/<[^>]*>/g, '')

  // Count words (split by whitespace, filter empty strings)
  const words = plainText
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0)

  const wordCount = words.length

  // Calculate reading time in minutes
  const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE)

  // Return minimum of 1 minute
  return Math.max(1, minutes)
}

/**
 * Format reading time for display
 * @param minutes - Reading time in minutes
 * @returns Formatted string like "5 min read"
 */
export function formatReadingTime(minutes: number): string {
  if (typeof minutes !== 'number' || minutes < 1) {
    return '1 min read'
  }

  return `${minutes} min read`
}

/**
 * Get total word count from text content
 * @param content - The article text content
 * @returns Word count
 */
export function getWordCount(content: string): number {
  if (!content || typeof content !== 'string') {
    return 0
  }

  // Strip HTML tags if present
  const plainText = content.replace(/<[^>]*>/g, '')

  // Count words
  return plainText
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length
}

/**
 * Calculate reading time and format it in one call
 * @param content - The article text content
 * @returns Formatted reading time string
 */
export function getReadingTime(content: string): string {
  const minutes = calculateReadingTime(content)
  return formatReadingTime(minutes)
}
