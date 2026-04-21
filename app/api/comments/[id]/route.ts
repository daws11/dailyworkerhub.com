import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getCommentById } from '@/lib/comments/queries'
import { updateComment, deleteComment } from '@/lib/comments/mutations'
import { updateCommentSchema } from '@/lib/comments/schemas'

/**
 * PUT /api/comments/[id]
 * Update a comment's content
 */
export async function PUT(
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

    const { id } = await params
    const body = await request.json()
    const parsed = updateCommentSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    // Get the comment to check ownership
    const commentResult = await getCommentById(id)

    if (commentResult.error) {
      return NextResponse.json(
        { error: 'Failed to fetch comment' },
        { status: 500 }
      )
    }

    if (!commentResult.data) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      )
    }

    // Check if the comment is deleted
    if (commentResult.data.deleted_at) {
      return NextResponse.json(
        { error: 'Cannot update a deleted comment' },
        { status: 400 }
      )
    }

    // Check ownership
    if (commentResult.data.author_id !== session.user.id) {
      return NextResponse.json(
        { error: 'Forbidden: You can only edit your own comments' },
        { status: 403 }
      )
    }

    // Update the comment
    const result = await updateComment({
      id,
      content: parsed.data.content,
    })

    if (result.error) {
      return NextResponse.json(
        { error: 'Failed to update comment' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data: result.data })
  } catch (error) {
    console.error('Error updating comment:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/comments/[id]
 * Soft delete a comment
 */
export async function DELETE(
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

    const { id } = await params

    // Get the comment to check ownership
    const commentResult = await getCommentById(id)

    if (commentResult.error) {
      return NextResponse.json(
        { error: 'Failed to fetch comment' },
        { status: 500 }
      )
    }

    if (!commentResult.data) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      )
    }

    // Check if the comment is already deleted
    if (commentResult.data.deleted_at) {
      return NextResponse.json(
        { error: 'Comment already deleted' },
        { status: 400 }
      )
    }

    // Check ownership
    if (commentResult.data.author_id !== session.user.id) {
      return NextResponse.json(
        { error: 'Forbidden: You can only delete your own comments' },
        { status: 403 }
      )
    }

    // Soft delete the comment
    const result = await deleteComment(id)

    if (result.error) {
      return NextResponse.json(
        { error: 'Failed to delete comment' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data: result.data })
  } catch (error) {
    console.error('Error deleting comment:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}