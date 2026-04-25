import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import type { Database } from './types'

type Profile = Database['public']['Tables']['profiles']['Row']

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            supabaseResponse.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

// Fetch user profile for role-based access control
  let profile: Profile | null = null
  let userRole: string | null = null
  let isAdmin = false

  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single<Profile>()

    profile = data
    userRole = profile?.role ?? null
    isAdmin = userRole === 'admin' || userRole === 'moderator'
  }

  // Protected routes - require authentication
  const protectedPaths = [
    '/app',
    '/community/admin',
    '/community/discussions/new',
  ]
  // Wildcard patterns that need regex matching
  const protectedWildcardPatterns = [
    /^\/community\/discussions\/[^/]+\/edit$/,
  ]

  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  ) || protectedWildcardPatterns.some((pattern) =>
    pattern.test(request.nextUrl.pathname)
  )

  if (isProtectedPath && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/community/login'
    url.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  // Admin-only routes - require admin/moderator role
  const adminPaths = ['/community/admin']
  const isAdminPath = adminPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  )

  if (isAdminPath && !isAdmin) {
    const url = request.nextUrl.clone()
    url.pathname = '/community/login'
    return NextResponse.redirect(url)
  }

  // Add role information to response headers for downstream use
  supabaseResponse.headers.set('x-user-role', userRole ?? '')
  supabaseResponse.headers.set('x-user-is-admin', isAdmin.toString())

  return supabaseResponse
}
