import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getDiscussions, searchDiscussions } from '@/lib/discussions/queries'
import { createDiscussionValidated } from '@/lib/discussions/mutations'
import {
  listDiscussionsSchema,
  createDiscussionSchema,
} from '@/lib/discussions/schemas'
import type { DiscussionStatus, GetDiscussionsSortBy } from '@/lib/discussions/types'

/**
 * GET /api/discussions - List discussions with pagination and filtering
 * Public endpoint - no authentication required
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  // Parse and validate query parameters
  const parsed = listDiscussionsSchema.safeParse({
    category: searchParams.get('category') ?? undefined,
    status: searchParams.get('status') ?? undefined,
    search: searchParams.get('search') ?? undefined,
    sortBy: searchParams.get('sortBy') ?? undefined,
    page: searchParams.get('page') ?? '1',
    limit: searchParams.get('limit') ?? '10',
  })

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid parameters', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const { category, status, search, sortBy, page, limit } = parsed.data

  // Calculate offset for pagination
  const offset = (page - 1) * limit

  try {
    // If search query is provided, use search function
    if (search) {
      const result = await searchDiscussions(search, {
        limit,
        offset,
      })

      if (result.error) {
        return NextResponse.json(
          { error: 'Failed to search discussions' },
          { status: 500 }
        )
      }

      // Apply additional filters to search results if needed
      let filteredData = result.data

      // Filter by category if provided
      if (category) {
        filteredData = filteredData.filter(
          (d) => (d as { category_id?: string }).category_id === category
        )
      }

      // Filter by status if provided
      if (status) {
        filteredData = filteredData.filter((d) => d.status === status)
      }

      return NextResponse.json({
        data: filteredData,
        pagination: {
          page,
          limit,
          total: filteredData.length,
          hasMore: filteredData.length === limit,
        },
      })
    }

    // Use standard list function
    const result = await getDiscussions({
      categoryId: category,
      status: status as DiscussionStatus | undefined,
      sortBy: sortBy as GetDiscussionsSortBy | undefined,
      limit,
      offset,
    })

    if (result.error) {
      return NextResponse.json(
        { error: 'Failed to fetch discussions' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      data: result.data,
      pagination: {
        page,
        limit,
        total: result.data.length,
        hasMore: result.data.length === limit,
      },
    })
  } catch (err) {
    console.error('Error fetching discussions:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/discussions - Create a new discussion
 * Requires authentication
 */
export async function POST(request: NextRequest) {
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
    const parsed = createDiscussionSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { title, content, slug, category_id, status, is_pinned, is_featured, metadata } =
      parsed.data

    // Create discussion using validated input
    const result = await createDiscussionValidated(
      {
        title,
        content,
        slug,
        category_id: category_id ?? null,
        status: status ?? 'open',
        is_pinned: is_pinned ?? false,
        is_featured: is_featured ?? false,
        metadata: metadata ?? {},
      },
      session.user.id
    )

    if (result.error) {
      return NextResponse.json(
        { error: 'Failed to create discussion', message: result.error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { data: result.data, message: 'Discussion created successfully' },
      { status: 201 }
    )
  } catch (err) {
    console.error('Error creating discussion:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
