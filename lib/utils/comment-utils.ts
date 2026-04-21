import type { Database } from '@/lib/supabase/types'

type Comment = Database['public']['Tables']['comments']['Row']
type Profile = Database['public']['Tables']['profiles']['Row']

export interface CommentWithAuthor extends Comment {
  author: Profile
}

export interface CommentNode extends CommentWithAuthor {
  replies: CommentNode[]
}

/**
 * Regular expression to match @mentions in comment content
 * Matches @username where username is alphanumeric with underscores, 1-30 chars
 */
const MENTION_REGEX = /@([a-zA-Z0-9_]{1,30})/g

export interface ParsedMention {
  username: string
  startIndex: number
  endIndex: number
}

/**
 * Parse @mentions from comment content
 * Returns array of parsed mentions with their positions in the text
 */
export function parseMentions(content: string): ParsedMention[] {
  const mentions: ParsedMention[] = []
  let match: RegExpExecArray | null

  // Reset regex state
  MENTION_REGEX.lastIndex = 0

  while ((match = MENTION_REGEX.exec(content)) !== null) {
    mentions.push({
      username: match[1],
      startIndex: match.index,
      endIndex: match.index + match[0].length,
    })
  }

  return mentions
}

/**
 * Extract unique usernames from @mentions
 */
export function extractMentionUsernames(content: string): string[] {
  const uniqueUsernames = new Set<string>()
  let match: RegExpExecArray | null

  MENTION_REGEX.lastIndex = 0

  while ((match = MENTION_REGEX.exec(content)) !== null) {
    uniqueUsernames.add(match[1])
  }

  return Array.from(uniqueUsernames)
}

/**
 * Build a nested comment tree from a flat array of comments
 * Comments are sorted by created_at within each level
 */
export function buildCommentTree(comments: CommentWithAuthor[]): CommentNode[] {
  if (!comments || comments.length === 0) {
    return []
  }

  const commentMap = new Map<string, CommentNode>()
  const rootComments: CommentNode[] = []

  // First pass: create CommentNode objects for all comments
  for (const comment of comments) {
    commentMap.set(comment.id, {
      ...comment,
      replies: [],
    })
  }

  // Second pass: build the tree structure
  for (const comment of comments) {
    const node = commentMap.get(comment.id)!

    if (comment.parent_id && commentMap.has(comment.parent_id)) {
      // Add as child to parent
      const parentNode = commentMap.get(comment.parent_id)!
      parentNode.replies.push(node)
    } else {
      // Root level comment
      rootComments.push(node)
    }
  }

  // Sort all replies by created_at (oldest first for comments)
  const sortReplies = (nodes: CommentNode[]): void => {
    nodes.sort((a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    )
    for (const node of nodes) {
      if (node.replies.length > 0) {
        sortReplies(node.replies)
      }
    }
  }

  sortReplies(rootComments)

  return rootComments
}

/**
 * Calculate total comment count including all nested replies
 */
export function countAllComments(nodes: CommentNode[]): number {
  let count = 0
  for (const node of nodes) {
    count += 1
    if (node.replies.length > 0) {
      count += countAllComments(node.replies)
    }
  }
  return count
}

/**
 * Flatten a comment tree back to a flat array (for display purposes)
 * Includes depth information for rendering
 */
export interface FlattenedComment extends CommentNode {
  depth: number
}

export function flattenCommentTree(
  nodes: CommentNode[],
  currentDepth: number = 0
): FlattenedComment[] {
  const result: FlattenedComment[] = []

  for (const node of nodes) {
    result.push({
      ...node,
      depth: currentDepth,
    })

    if (node.replies.length > 0) {
      result.push(...flattenCommentTree(node.replies, currentDepth + 1))
    }
  }

  return result
}
