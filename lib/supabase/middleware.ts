import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import type { Database } from './types'

const cookieDomain = process.env.NEXT_PUBLIC_COOKIE_DOMAIN || undefined

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
            supabaseResponse.cookies.set(name, value, {
              ...options,
              ...(cookieDomain ? { domain: cookieDomain } : {}),
            })
          })
        },
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()
  const user = session?.user ?? null

  // Protected routes
  const protectedPaths = [
    '/app',
    '/community/admin',
    '/community/discussions/new',
    '/community/articles/editor',
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

  return supabaseResponse
}
