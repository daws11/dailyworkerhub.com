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
    const locale = request.cookies.get('NEXT_LOCALE')?.value || 'id'
    const section = SPECIAL_PREFIXES.find((p) =>
      pathname === p || pathname.startsWith(`${p}/`)
    )!

    if (pathname.startsWith(`${section}/id`) || pathname.startsWith(`${section}/en`)) {
      const response = NextResponse.next({ request })
      return attachSupabaseCookies(request, response)
    }

    const subPath = pathname === section ? '' : pathname.slice(section.length)
    const target = subPath
      ? `${section}/${locale}${subPath}`
      : `${section}/${locale}`
    const response = NextResponse.redirect(new URL(target, request.url))
    return attachSupabaseCookies(request, response)
  }

  // Main app routes: handle /en/ prefix manually
  const isEnPrefix = pathname.startsWith('/en') && 
    (pathname === '/en' || pathname.startsWith('/en/'))

  if (isEnPrefix) {
    // Strip /en prefix, set locale cookie, rewrite internally
    const targetPath = pathname === '/en' ? '/' : pathname.slice(3) || '/'
    const rewritten = NextResponse.rewrite(new URL(targetPath, request.url))
    rewritten.cookies.set('NEXT_LOCALE', 'en', {
      path: '/',
      maxAge: 31536000,
      sameSite: 'lax',
      ...(cookieDomain ? { domain: cookieDomain } : {}),
    })
    return attachSupabaseCookies(request, rewritten)
  }

  const response = NextResponse.next({ request })
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
