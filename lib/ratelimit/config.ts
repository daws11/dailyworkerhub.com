import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import type { StorageAdapter } from './storage-adapter'
import { localStorageAdapter } from './storage-adapter'

/**
 * Rate limit configuration for authentication endpoints.
 *
 * Strategy: Sliding window with 5 requests per 60 seconds per identifier.
 * This provides protection against brute-force attacks while allowing
 * legitimate users to retry after a short wait.
 *
 * @see https://upstash.com/docs/ratelimit/basics/strategies
 */
export interface RateLimitConfig {
  /** Number of requests allowed within the time window */
  limit: number
  /** Time window in seconds */
  window: number
  /** Custom identifier function - defaults to IP-based */
  identifier?: (request: Request) => string | Promise<string>
  /** Additional metadata to include in rate limit responses */
  metadata?: Record<string, string>
}

/**
 * Default rate limit configuration for auth endpoints.
 * 5 attempts per 60 seconds = 1 attempt every 12 seconds on average.
 */
export const AUTH_RATE_LIMIT_CONFIG: RateLimitConfig = {
  limit: 5,
  window: 60,
}

/**
 * Creates a rate limiter instance.
 * Returns null when credentials are not available.
 *
 * @param config - Rate limit configuration
 * @param storage - Storage adapter for tracking requests
 * @returns Ratelimit instance or null if credentials are missing
 */
export function createRateLimiter(
  config: RateLimitConfig = AUTH_RATE_LIMIT_CONFIG,
  _storage?: StorageAdapter
): Ratelimit | null {
  if (!process.env.NEXT_PUBLIC_UPSTASH_RATELIMIT_REST_URL || !process.env.NEXT_PUBLIC_UPSTASH_RATELIMIT_REST_TOKEN) {
    return null
  }

  return new Ratelimit({
    redis: new Redis({
      url: process.env.NEXT_PUBLIC_UPSTASH_RATELIMIT_REST_URL,
      token: process.env.NEXT_PUBLIC_UPSTASH_RATELIMIT_REST_TOKEN,
    }),
    limiter: Ratelimit.slidingWindow(config.limit, `${config.window} s`),
    analytics: true,
    prefix: 'ratelimit:auth',
  })
}

/**
 * Creates a rate limiter using localStorage adapter for client-side fallback.
 * This is useful when Redis is not available (e.g., during development or build).
 *
 * @param config - Rate limit configuration
 * @returns Ratelimit using localStorage adapter
 */
export function createLocalRateLimiter(
  config: RateLimitConfig = AUTH_RATE_LIMIT_CONFIG
): Ratelimit | null {
  // LocalStorage adapter is not compatible with Upstash Ratelimit's Redis interface
  // Return null to indicate rate limiting should be skipped
  console.warn('Rate limiting with localStorage is not supported. Rate limiting will be skipped.')
  return null
}

/**
 * Gets the appropriate rate limiter based on environment.
 * Uses Redis-based rate limiter if credentials are available, otherwise returns null.
 *
 * @param config - Rate limit configuration
 * @returns Ratelimit instance or null if credentials are missing
 */
export function getRateLimiter(
  config: RateLimitConfig = AUTH_RATE_LIMIT_CONFIG
): Ratelimit | null {
  return createRateLimiter(config)
}
