/**
 * Storage adapter interface for Upstash Ratelimit.
 * This allows using custom storage backends for rate limiting.
 *
 * @see https://upstash.com/docs/ratelimit/sdks/javascriptsdk#using-a-custom-storage
 */
export interface StorageAdapter {
  /**
   * Get a value from storage.
   * @param key - The key to retrieve
   * @returns The stored value or null if not found
   */
  get<T>(key: string): Promise<T | null>

  /**
   * Set a value in storage.
   * @param key - The key to set
   * @param value - The value to store
   * @param options - Optional expiration settings
   */
  set(
    key: string,
    value: unknown,
    options?: { ex?: number; px?: number; pex?: number; persist?: boolean }
  ): Promise<'OK' | null>

  /**
   * Delete a key from storage.
   * @param key - The key to delete
   */
  del(key: string): Promise<number>

  /**
   * Increment a value in storage.
   * @param key - The key to increment
   * @returns The new value after incrementing
   */
  incr(key: string): Promise<number>

  /**
   * Get the remaining TTL of a key in seconds.
   * @param key - The key to check
   * @returns TTL in seconds, -1 if no expiry, -2 if key doesn't exist
   */
  ttl(key: string): Promise<number>
}

/**
 * localStorage-based storage adapter for client-side rate limiting.
 * This is useful for development, testing, or as a fallback when Redis is unavailable.
 *
 * Note: This is NOT recommended for production use as it can be bypassed
 * by clearing localStorage. In production, always use Redis-based rate limiting.
 */
export class LocalStorageAdapter implements StorageAdapter {
  private prefix: string

  constructor(prefix = 'ratelimit:') {
    this.prefix = prefix
  }

  /**
   * Get a value from localStorage.
   */
  async get<T>(key: string): Promise<T | null> {
    if (typeof window === 'undefined') {
      return null
    }

    const item = window.localStorage.getItem(this.prefix + key)
    if (!item) {
      return null
    }

    try {
      return JSON.parse(item) as T
    } catch {
      return null
    }
  }

  /**
   * Set a value in localStorage.
   */
  async set(
    key: string,
    value: unknown,
    options?: { ex?: number; px?: number; pex?: number; persist?: boolean }
  ): Promise<'OK' | null> {
    if (typeof window === 'undefined') {
      return null
    }

    const fullKey = this.prefix + key
    const storedValue = JSON.stringify(value)

    if (options?.ex) {
      // Convert seconds to milliseconds for expiry
      const expiryTime = Date.now() + options.ex * 1000
      window.localStorage.setItem(
        fullKey,
        JSON.stringify({ value: storedValue, expiry: expiryTime })
      )
    } else if (options?.px) {
      // Already in milliseconds
      const expiryTime = Date.now() + options.px
      window.localStorage.setItem(
        fullKey,
        JSON.stringify({ value: storedValue, expiry: expiryTime })
      )
    } else if (!options?.persist) {
      // Default: persist without expiry (session-like behavior)
      window.localStorage.setItem(fullKey, storedValue)
    } else {
      window.localStorage.setItem(fullKey, storedValue)
    }

    return 'OK'
  }

  /**
   * Delete a value from localStorage.
   */
  async del(key: string): Promise<number> {
    if (typeof window === 'undefined') {
      return 0
    }

    const fullKey = this.prefix + key
    const existed = window.localStorage.getItem(fullKey) !== null
    window.localStorage.removeItem(fullKey)
    return existed ? 1 : 0
  }

  /**
   * Increment a value in localStorage.
   * Creates the key if it doesn't exist.
   */
  async incr(key: string): Promise<number> {
    if (typeof window === 'undefined') {
      return 0
    }

    const fullKey = this.prefix + key
    const existing = await this.get<{ count: number; expiry: number }>(fullKey)

    if (!existing) {
      await this.set(fullKey, { count: 1 })
      return 1
    }

    // Check if expired
    if (existing.expiry && existing.expiry < Date.now()) {
      await this.del(fullKey)
      return 0
    }

    const newCount = (existing.count || 0) + 1
    await this.set(fullKey, existing)
    return newCount
  }

  /**
   * Get the remaining TTL of a key in seconds.
   */
  async ttl(key: string): Promise<number> {
    if (typeof window === 'undefined') {
      return -2
    }

    const fullKey = this.prefix + key
    const item = window.localStorage.getItem(fullKey)

    if (!item) {
      return -2
    }

    try {
      const parsed = JSON.parse(item)
      if (parsed.expiry) {
        const remaining = Math.ceil((parsed.expiry - Date.now()) / 1000)
        return remaining > 0 ? remaining : -2
      }
      return -1 // No expiry
    } catch {
      return -1
    }
  }
}

/**
 * Default localStorage adapter instance.
 * Use this for development or as a fallback.
 */
export const localStorageAdapter = new LocalStorageAdapter()
