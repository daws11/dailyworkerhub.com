import { getRequestConfig } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { routing } from './routing'
import { headers } from 'next/headers'

export default getRequestConfig(async () => {
  const headersList = await headers()
  
  // Check custom header first (set by middleware for /id/ prefix)
  const headerLocale = headersList.get('X-LOCALE')
  if (headerLocale && hasLocale(routing.locales, headerLocale)) {
    return {
      locale: headerLocale,
      messages: (await import(`../messages/${headerLocale}.json`)).default,
    }
  }
  
  // Then check cookie
  const cookieHeader = headersList.get('cookie') || ''
  const localeMatch = cookieHeader.match(/NEXT_LOCALE=([^;]+)/)
  const localeCookie = localeMatch ? localeMatch[1] : null

  let locale = localeCookie

  if (!locale) {
    const acceptLanguage = headersList.get('accept-language')
    if (acceptLanguage) {
      const preferred = acceptLanguage.split(',')[0]?.trim()?.split('-')[0] || ''
      if (hasLocale(routing.locales, preferred)) {
        locale = preferred
      }
    }
  }

  if (!hasLocale(routing.locales, locale)) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
