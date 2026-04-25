/**
 * User management utilities with password hashing
 * Follows OWASP best practices for user authentication
 */

import { createHash, randomBytes } from 'crypto';

// Type definitions for user management (shared/schema.ts is excluded from TS compilation)
interface InsertUser {
  username: string;
  hashedPassword: string;
}

interface User {
  id: string;
  username: string;
  hashedPassword: string;
}

// bcryptjs is CommonJS, import dynamically in functions
let hashPassword: (password: string) => string;
let verifyPassword: (password: string, hash: string) => boolean;

async function initPasswordUtils() {
  if (!hashPassword) {
    const bcrypt = await import('bcryptjs');
    const BCRYPT_ROUNDS = 12;
    hashPassword = (password: string): string => {
      if (!password || password.length === 0) {
        throw new Error('Password cannot be empty');
      }
      return bcrypt.hashSync(password, BCRYPT_ROUNDS);
    };
    verifyPassword = (password: string, hash: string): boolean => {
      if (!password || !hash) {
        return false;
      }
      return bcrypt.compareSync(password, hash);
    };
  }
}

// Initialize on module load
initPasswordUtils();

/**
 * Minimum password length requirement
 */
const MIN_PASSWORD_LENGTH = 8;

/**
 * Validate password strength requirements
 * @param password - Plaintext password to validate
 * @returns Object with isValid flag and any error message
 */
export function validatePasswordStrength(password: string): {
  isValid: boolean;
  error?: string;
} {
  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    return {
      isValid: false,
      error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`,
    };
  }

  // Check for minimum complexity: at least one uppercase, one lowercase, one digit
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasDigit = /[0-9]/.test(password);

  if (!hasUppercase || !hasLowercase || !hasDigit) {
    return {
      isValid: false,
      error:
        'Password must contain at least one uppercase letter, one lowercase letter, and one digit',
    };
  }

  return { isValid: true };
}

/**
 * Hash a plaintext password using bcrypt
 * @param password - Plaintext password to hash
 * @returns Hashed password
 * @throws Error if password is empty
 */
export async function hashUserPassword(password: string): Promise<string> {
  await initPasswordUtils();
  return hashPassword(password);
}

/**
 * Verify a plaintext password against a stored hash
 * @param password - Plaintext password to verify
 * @param hashedPassword - Stored bcrypt hash
 * @returns True if password matches hash
 */
export async function verifyUserPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  await initPasswordUtils();
  return verifyPassword(password, hashedPassword);
}

/**
 * Create user data with hashed password
 * @param username - Username for the new user
 * @param password - Plaintext password (will be hashed)
 * @returns User insert data ready for database insertion
 * @throws Error if password validation fails or password is empty
 */
export async function createUserWithPassword(
  username: string,
  password: string
): Promise<Omit<InsertUser, 'id'>> {
  const validation = validatePasswordStrength(password);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  const hashedPassword = await hashUserPassword(password);

  return {
    username,
    hashedPassword,
  };
}

/**
 * Generate a secure random token for password reset or email verification
 * Uses crypto.randomBytes for cryptographic security
 * @param length - Length of token in bytes (default: 32)
 * @returns Hex-encoded random token
 */
export function generateSecureToken(length: number = 32): string {
  return randomBytes(length).toString('hex');
}

/**
 * Hash a token using SHA-256 for secure storage/comparison
 * @param token - Raw token to hash
 * @returns SHA-256 hash of the token
 */
export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

/**
 * Timing-safe comparison for tokens to prevent timing attacks
 * @param a - First token
 * @param b - Second token
 * @returns True if tokens are equal
 */
export function safeCompareTokens(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
}

// Export types for use in other modules
export type { InsertUser, User };
