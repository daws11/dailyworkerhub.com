import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import type { Database } from './lib/supabase/types'

const cookieDomain = process.env.NEXT_PUBLIC_COOKIE_DOMAIN || undefined

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

const SPECIAL_PREFIXES = ['/docs', '/terms', '/privacy', '/cookies']

function matchesSpecialRoute(pathname: string): boolean {
  return SPECIAL_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  )
}

function isSpecialLocaleRoute(pathname: string): boolean {
  return SPECIAL_PREFIXES.some((p) =>
    pathname.startsWith(`${p}/id`) || pathname.startsWith(`${p}/en`)
  )
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Docs/legal routes: redirect root to locale-specific path
  if (matchesSpecialRoute(pathname) && !isSpecialLocaleRoute(pathname)) {
    const locale = request.cookies.get('NEXT_LOCALE')?.value || 'id'
    const section = SPECIAL_PREFIXES.find((p) =>
      pathname === p || pathname.startsWith(`${p}/`)
    )!
    const subPath = pathname === section ? '' : pathname.slice(section.length)
    const target = subPath
      ? `${section}/${locale}${subPath}`
      : `${section}/${locale}`
    const response = NextResponse.redirect(new URL(target, request.url))
    return addSupabaseCookies(request, response)
  }

  const response = NextResponse.next({ request })
  return addSupabaseCookies(request, response)
}

async function addSupabaseCookies(
  request: NextRequest,
  response: NextResponse
): Promise<NextResponse> {
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
            response.cookies.set(name, value, {
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

  const protectedPaths = [
    '/app',
    '/community/admin',
    '/community/discussions/new',
    '/community/articles/editor',
  ]
  const protectedWildcardPatterns = [
    /^\/community\/discussions\/[^/]+\/edit$/,
  ]

  const isProtectedPath = protectedPaths.some((p) =>
    request.nextUrl.pathname.startsWith(p)
  ) || protectedWildcardPatterns.some((p) =>
    p.test(request.nextUrl.pathname)
  )

  if (isProtectedPath && !user) {
    const appLoginUrl = new URL('https://app.dailyworkerhub.com/login')
    appLoginUrl.searchParams.set(
      'redirect',
      `${request.nextUrl.origin}${request.nextUrl.pathname}`
    )
    return NextResponse.redirect(appLoginUrl)
  }

  return response
}
