/**
 * Rate limiting library for authentication endpoints.
 *
 * @see https://upstash.com/docs/ratelimit/basics/overview
 */

// Re-export config
export {
  AUTH_RATE_LIMIT_CONFIG,
  createRateLimiter,
  createLocalRateLimiter,
  getRateLimiter,
  type RateLimitConfig,
} from "./config";

// Re-export storage adapter
export {
  LocalStorageAdapter,
  localStorageAdapter,
  type StorageAdapter,
} from "./storage-adapter";

// Re-export hook
export { useRateLimit, type RateLimitStatus, type RateLimitResult, type UseRateLimitOptions, type UseRateLimitReturn } from "./use-rate-limit";
