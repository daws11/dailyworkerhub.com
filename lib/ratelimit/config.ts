import { Ratelimit } from '@upstash/ratelimit'
import { createClient } from '@upstash/redis'
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
    redis: createClient({
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
 * @returns Rate limiter using localStorage adapter
 */
export function createLocalRateLimiter(
  config: RateLimitConfig = AUTH_RATE_LIMIT_CONFIG
): Ratelimit {
  return new Ratelimit({
    redis: localStorageAdapter,
    limiter: Ratelimit.slidingWindow(config.limit, `${config.window} s`),
    analytics: false,
    prefix: 'ratelimit:auth:local',
  })
}

/**
 * Gets the appropriate rate limiter based on environment.
 * Uses Redis-based rate limiter in production, localStorage in development.
 *
 * @param config - Rate limit configuration
 * @returns Rate limiter instance
 */
export function getRateLimiter(
  config: RateLimitConfig = AUTH_RATE_LIMIT_CONFIG
): Ratelimit | null {
  if (!process.env.NEXT_PUBLIC_UPSTASH_RATELIMIT_REST_URL || !process.env.NEXT_PUBLIC_UPSTASH_RATELIMIT_REST_TOKEN) {
    return createLocalRateLimiter(config)
  }

  return createRateLimiter(config)
}
