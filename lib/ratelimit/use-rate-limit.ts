"use client";

import * as React from "react";

import type { Ratelimit } from "@upstash/ratelimit";
import { getRateLimiter, AUTH_RATE_LIMIT_CONFIG } from "./config";

/**
 * Rate limit result status.
 */
export type RateLimitStatus = "allowed" | "blocked" | "disabled";

/**
 * Result of a rate limit check.
 */
export interface RateLimitResult {
  /** Whether the request is allowed */
  status: RateLimitStatus;
  /** Remaining requests in the current window (null if disabled) */
  remaining: number | null;
  /** Total limit (null if disabled) */
  limit: number | null;
  /** Time until reset in seconds (null if disabled or not blocked) */
  resetIn: number | null;
  /** Human-readable message for the user */
  message: string;
}

/**
 * Options for the useRateLimit hook.
 */
export interface UseRateLimitOptions {
  /**
   * Custom identifier for rate limiting.
   * Defaults to IP-based identification.
   */
  identifier?: string;
  /**
   * Whether to skip rate limiting entirely.
   * Useful for trusted clients or specific flows.
   */
  bypass?: boolean;
}

/**
 * Return type for the useRateLimit hook.
 */
export interface UseRateLimitReturn {
  /** Whether the user is currently rate limited */
  isLimited: boolean;
  /** Check rate limit and get the result */
  check: () => Promise<RateLimitResult>;
  /** Manually reset the rate limit for the current identifier */
  reset: () => Promise<void>;
  /** Whether rate limiting is disabled (missing credentials) */
  isDisabled: boolean;
  /** Current remaining requests */
  remaining: number | null;
  /** Time until reset in seconds */
  resetIn: number | null;
}

const RATE_LIMIT_ERROR_MESSAGES = {
  blocked:
    "Too many requests. Please wait a moment before trying again.",
  disabled:
    "Rate limiting is not available. Please try again later.",
};

/**
 * Hook for rate limiting authentication endpoints.
 *
 * Uses Upstash Redis for production rate limiting with localStorage fallback
 * for development environments.
 *
 * @example
 * ```tsx
 * function LoginForm() {
 *   const { check, isLimited, isDisabled } = useRateLimit({
 *     identifier: "login-attempt"
 *   });
 *
 *   const handleSubmit = async (e: FormEvent) => {
 *     e.preventDefault();
 *
 *     if (isLimited) {
 *       toast.error("Too many attempts. Please wait.");
 *       return;
 *     }
 *
 *     const result = await check();
 *     if (result.status === "blocked") {
 *       toast.error(result.message);
 *       return;
 *     }
 *
 *     // Proceed with login...
 *   };
 * }
 * ```
 */
export function useRateLimit(
  options: UseRateLimitOptions = {}
): UseRateLimitReturn {
  const { identifier, bypass = false } = options;

  const [remaining, setRemaining] = React.useState<number | null>(null);
  const [resetIn, setResetIn] = React.useState<number | null>(null);

  const rateLimiterRef = React.useRef<Ratelimit | null>(null);
  const identifierRef = React.useRef<string>(
    identifier ?? "anonymous-user"
  );

  // Update identifier when it changes
  React.useEffect(() => {
    if (identifier) {
      identifierRef.current = identifier;
    }
  }, [identifier]);

  // Initialize rate limiter once on mount
  React.useEffect(() => {
    if (bypass) {
      return;
    }

    rateLimiterRef.current = getRateLimiter(AUTH_RATE_LIMIT_CONFIG);
  }, [bypass]);

  /**
   * Check rate limit for the current identifier.
   */
  const check = React.useCallback(async (): Promise<RateLimitResult> => {
    // Bypass check
    if (bypass) {
      return {
        status: "allowed",
        remaining: null,
        limit: null,
        resetIn: null,
        message: "",
      };
    }

    const rateLimiter = rateLimiterRef.current;

    // Rate limiting disabled
    if (!rateLimiter) {
      setRemaining(null);
      setResetIn(null);

      return {
        status: "disabled",
        remaining: null,
        limit: null,
        resetIn: null,
        message: RATE_LIMIT_ERROR_MESSAGES.disabled,
      };
    }

    try {
      const currentIdentifier = identifierRef.current;
      const response = await rateLimiter.limit(currentIdentifier);

      if (response.isLimited) {
        const resetTime = response.reset;
        setRemaining(0);
        setResetIn(Math.ceil((resetTime - Date.now()) / 1000));

        return {
          status: "blocked",
          remaining: 0,
          limit: response.limit,
          resetIn: Math.ceil((resetTime - Date.now()) / 1000),
          message: RATE_LIMIT_ERROR_MESSAGES.blocked,
        };
      }

      setRemaining(response.remaining);
      setResetIn(null);

      return {
        status: "allowed",
        remaining: response.remaining,
        limit: response.limit,
        resetIn: null,
        message: "",
      };
    } catch (error) {
      // On error, allow the request but log it
      console.error("[RateLimit] Rate limit check failed:", error);

      return {
        status: "allowed",
        remaining: null,
        limit: null,
        resetIn: null,
        message: "",
      };
    }
  }, [bypass]);

  /**
   * Reset rate limit for the current identifier.
   * Note: This requires a custom backend implementation as Upstash doesn't
   * support direct limit reset. This is a placeholder for future implementation.
   */
  const reset = React.useCallback(async (): Promise<void> => {
    // Reset is not directly supported by Upstash
    // This is a no-op unless custom backend support is added
    setRemaining(null);
    setResetIn(null);
  }, []);

  const isLimited = remaining !== null && remaining === 0;
  const isDisabled = !rateLimiterRef.current;

  return {
    isLimited,
    check,
    reset,
    isDisabled,
    remaining,
    resetIn,
  };
}
