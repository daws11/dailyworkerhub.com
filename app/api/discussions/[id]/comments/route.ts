import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getCommentTree } from '@/lib/comments/queries'
import { createComment } from '@/lib/comments/mutations'
import { createCommentSchema, canCreateReply } from '@/lib/comments/schemas'
import { getCommentById } from '@/lib/comments/queries'

/**
 * GET /api/discussions/[id]/comments
 * List comments for a discussion as a tree structure
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: discussionId } = await params
    const { searchParams } = new URL(request.url)
    const sortBy = (searchParams.get('sortBy') as 'newest' | 'oldest' | 'likes') || 'newest'

    const result = await getCommentTree({
      discussionId,
      sortBy,
      maxDepth: 1, // Max 2 levels: depth 0 (root) + depth 1 (replies)
      includeDeleted: false,
    })

    if (result.error) {
      return NextResponse.json(
        { error: 'Failed to fetch comments' },
        { status: 500 }
      )
    }

    return NextResponse.json(result.data)
  } catch (error) {
    console.error('Error fetching comments:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/discussions/[id]/comments
 * Create a new comment or reply
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id: discussionId } = await params
    const body = await request.json()
    const parsed = createCommentSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { content, parent_id } = parsed.data

    // If replying, check depth constraints
    if (parent_id) {
      // Get the parent comment to check its depth
      const parentResult = await getCommentById(parent_id)

      if (parentResult.error) {
        return NextResponse.json(
          { error: 'Failed to fetch parent comment' },
          { status: 500 }
        )
      }

      if (!parentResult.data) {
        return NextResponse.json(
          { error: 'Parent comment not found' },
          { status: 404 }
        )
      }

      // Check if parent is deleted
      if (parentResult.data.deleted_at) {
        return NextResponse.json(
          { error: 'Cannot reply to a deleted comment' },
          { status: 400 }
        )
      }

      // Check max depth (can only reply to depth 0 comments)
      if (!canCreateReply(parentResult.data.depth)) {
        return NextResponse.json(
          { error: 'Maximum nesting depth exceeded. Can only reply to top-level comments.' },
          { status: 400 }
        )
      }
    }

    // Create the comment
    const result = await createComment({
      content,
      author_id: session.user.id,
      discussion_id: discussionId,
      parent_id: parent_id ?? null,
      parent_depth: parent_id ? undefined : null,
    })

    if (result.error) {
      return NextResponse.json(
        { error: 'Failed to create comment' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data: result.data }, { status: 201 })
  } catch (error) {
    console.error('Error creating comment:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}