/**
 * Password hashing utilities using bcrypt
 * Follows OWASP best practices for password storage
 */

import bcrypt from 'bcryptjs';

const BCRYPT_ROUNDS = 12;

/**
 * Hash a plaintext password using bcrypt
 * @param {string} password - Plaintext password to hash
 * @returns {string} Hashed password
 */
function hashPassword(password) {
  if (!password || password.length === 0) {
    throw new Error('Password cannot be empty');
  }

  const hash = bcrypt.hashSync(password, BCRYPT_ROUNDS);
  return hash;
}

/**
 * Verify a plaintext password against a hashed password
 * @param {string} password - Plaintext password to verify
 * @param {string} hash - Hashed password to compare against
 * @returns {boolean} True if password matches hash
 */
function verifyPassword(password, hash) {
  if (!password || !hash) {
    return false;
  }

  const isValid = bcrypt.compareSync(password, hash);
  return isValid;
}

export { hashPassword, verifyPassword };
