import { Ratelimit } from '@upstash/ratelimit'
import { createClient } from '@upstash/redis'
import type { StorageAdapter } from './storage-adapter'
import { localStorageAdapter } from './storage-adapter'

// Check if we're in a build environment without env vars
const isBuildTime =
  !process.env.NEXT_PUBLIC_UPSTASH_RATELIMIT_REST_URL ||
  !process.env.NEXT_PUBLIC_UPSTASH_RATELIMIT_REST_TOKEN

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
 * Returns a no-op rate limiter during build time when credentials are not available.
 *
 * @param config - Rate limit configuration
 * @param storage - Storage adapter for tracking requests
 * @returns Ratelimit instance or null if credentials are missing
 */
export function createRateLimiter(
  config: RateLimitConfig = AUTH_RATE_LIMIT_CONFIG,
  storage?: StorageAdapter
): Ratelimit | null {
  const redisUrl = process.env.NEXT_PUBLIC_UPSTASH_RATELIMIT_REST_URL
  const redisToken = process.env.NEXT_PUBLIC_UPSTASH_RATELIMIT_REST_TOKEN

  if (!redisUrl || !redisToken) {
    // Return null during build time - rate limiting will be disabled
    console.warn(
      '[RateLimit] Upstash credentials not configured. Rate limiting is disabled. ' +
        'Set NEXT_PUBLIC_UPSTASH_RATELIMIT_REST_URL and NEXT_PUBLIC_UPSTASH_RATELIMIT_REST_TOKEN to enable.'
    )
    return null
  }

  const redisClient = createClient({
    url: redisUrl,
    token: redisToken,
  })

  return new Ratelimit({
    redis: redisClient,
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
  if (isBuildTime) {
    return null
  }

  const redisUrl = process.env.NEXT_PUBLIC_UPSTASH_RATELIMIT_REST_URL
  const redisToken = process.env.NEXT_PUBLIC_UPSTASH_RATELIMIT_REST_TOKEN

  if (redisUrl && redisToken) {
    return createRateLimiter(config)
  }

  // Fallback to local storage for development
  return createLocalRateLimiter(config)
}
