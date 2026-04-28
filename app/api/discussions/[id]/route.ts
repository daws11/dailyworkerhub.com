import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getDiscussionById } from '@/lib/discussions/queries'
import {
  updateDiscussionValidated,
  deleteDiscussion,
  incrementViewCount,
} from '@/lib/discussions/mutations'
import { updateDiscussionSchema, getDiscussionSchema } from '@/lib/discussions/schemas'

/**
 * GET /api/discussions/[id] - Get discussion detail
 * Public endpoint - no authentication required
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  // Validate ID format
  const parsed = getDiscussionSchema.safeParse({ id })
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid discussion ID', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  try {
    // Fetch discussion by ID
    const result = await getDiscussionById(id)

    if (result.error) {
      return NextResponse.json(
        { error: 'Failed to fetch discussion' },
        { status: 500 }
      )
    }

    if (!result.data) {
      return NextResponse.json(
        { error: 'Discussion not found' },
        { status: 404 }
      )
    }

    // Check if discussion is soft-deleted
    if (result.data.deleted_at) {
      return NextResponse.json(
        { error: 'Discussion not found' },
        { status: 404 }
      )
    }

    // Increment view count (fire and forget)
    incrementViewCount(id).catch(() => {
      // Silently handle view count increment errors
    })

    return NextResponse.json({ data: result.data })
  } catch (err) {
    console.error('Error fetching discussion:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/discussions/[id] - Update discussion
 * Requires authentication and ownership
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  // Validate ID format
  const parsed = getDiscussionSchema.safeParse({ id })
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid discussion ID', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const supabase = await createClient()

  // Check authentication
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session?.user) {
    return NextResponse.json(
      { error: 'Unauthorized', message: 'Authentication required' },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()

    // Validate request body
    const validationResult = updateDiscussionSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.flatten() },
        { status: 400 }
      )
    }

    // Fetch discussion to check ownership
    const existingResult = await getDiscussionById(id)

    if (existingResult.error) {
      return NextResponse.json(
        { error: 'Failed to fetch discussion' },
        { status: 500 }
      )
    }

    if (!existingResult.data) {
      return NextResponse.json(
        { error: 'Discussion not found' },
        { status: 404 }
      )
    }

    if (existingResult.data.deleted_at) {
      return NextResponse.json(
        { error: 'Discussion not found' },
        { status: 404 }
      )
    }

    // Check ownership
    if (existingResult.data.author_id !== session.user.id) {
      return NextResponse.json(
        {
          error: 'Forbidden',
          message: 'You can only update your own discussions',
        },
        { status: 403 }
      )
    }

    // Update discussion
    const { title, content, slug, category_id, status, is_pinned, is_featured, metadata } =
      validationResult.data

    const updateResult = await updateDiscussionValidated(id, {
      title,
      content,
      slug,
      category_id: category_id ?? undefined,
      status,
      is_pinned,
      is_featured,
      metadata,
    })

    if (updateResult.error) {
      return NextResponse.json(
        { error: 'Failed to update discussion', message: updateResult.error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { data: updateResult.data, message: 'Discussion updated successfully' }
    )
  } catch (err) {
    console.error('Error updating discussion:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/discussions/[id] - Soft delete discussion
 * Requires authentication and ownership
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  // Validate ID format
  const parsed = getDiscussionSchema.safeParse({ id })
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid discussion ID', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const supabase = await createClient()

  // Check authentication
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session?.user) {
    return NextResponse.json(
      { error: 'Unauthorized', message: 'Authentication required' },
      { status: 401 }
    )
  }

  try {
    // Fetch discussion to check ownership
    const existingResult = await getDiscussionById(id)

    if (existingResult.error) {
      return NextResponse.json(
        { error: 'Failed to fetch discussion' },
        { status: 500 }
      )
    }

    if (!existingResult.data) {
      return NextResponse.json(
        { error: 'Discussion not found' },
        { status: 404 }
      )
    }

    if (existingResult.data.deleted_at) {
      return NextResponse.json(
        { error: 'Discussion not found' },
        { status: 404 }
      )
    }

    // Check ownership
    if (existingResult.data.author_id !== session.user.id) {
      return NextResponse.json(
        {
          error: 'Forbidden',
          message: 'You can only delete your own discussions',
        },
        { status: 403 }
      )
    }

    // Soft delete discussion
    const deleteResult = await deleteDiscussion(id)

    if (deleteResult.error) {
      return NextResponse.json(
        { error: 'Failed to delete discussion', message: deleteResult.error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { data: deleteResult.data, message: 'Discussion deleted successfully' }
    )
  } catch (err) {
    console.error('Error deleting discussion:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
