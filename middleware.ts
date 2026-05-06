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

function isSpecialRoute(pathname: string): boolean {
  return SPECIAL_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  )
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Special routes (docs, legal): own locale handling
  if (isSpecialRoute(pathname)) {
    const locale = request.cookies.get('NEXT_LOCALE')?.value || 'en'

    // Already has locale in path? pass through
    const hasLocale = SPECIAL_PREFIXES.some(
      (p) => pathname.startsWith(`${p}/id`) || pathname.startsWith(`${p}/en`)
    )
    if (hasLocale) {
      const locale = pathname.includes('/id/') || pathname.endsWith('/id') ? 'id' : 'en'
      const response = NextResponse.next({ request })
      response.cookies.set('NEXT_LOCALE', locale, {
        path: '/',
        maxAge: 31536000,
        sameSite: 'lax',
        ...(cookieDomain ? { domain: cookieDomain } : {}),
      })
      return attachSupabaseCookies(request, response)
    }

    // Redirect root to locale-specific path
    const section = SPECIAL_PREFIXES.find((p) =>
      pathname === p || pathname.startsWith(`${p}/`)
    )!
    const subPath = pathname === section ? '' : pathname.slice(section.length)
    const target = subPath
      ? `${section}/${locale}${subPath}`
      : `${section}/${locale}`
    const response = NextResponse.redirect(new URL(target, request.url))
    return attachSupabaseCookies(request, response)
  }

  // Main app routes: handle /id/ prefix (Indonesian, non-default)
  const isIdPrefix =
    pathname === '/id' || pathname.startsWith('/id/')

  if (isIdPrefix) {
    const targetPath = pathname === '/id' ? '/' : pathname.slice(3) || '/'
    const url = new URL(targetPath, request.url)
    const rewritten = NextResponse.rewrite(url)
    rewritten.headers.set('X-LOCALE', 'id')
    rewritten.cookies.set('NEXT_LOCALE', 'id', {
      path: '/',
      maxAge: 31536000,
      sameSite: 'lax',
    })
    return attachSupabaseCookies(request, rewritten)
  }

  // Default locale (en): ensure cookie is set to 'en' and clear any stale 'id' cookie
  const response = NextResponse.next({ request })
  response.cookies.set('NEXT_LOCALE', 'en', {
    path: '/',
    maxAge: 31536000,
    sameSite: 'lax',
  })
  return attachSupabaseCookies(request, response)
}

async function attachSupabaseCookies(
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
            // Don't override NEXT_LOCALE set by middleware
            if (name === 'NEXT_LOCALE') return
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
