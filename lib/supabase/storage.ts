import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './types'

// Storage bucket names
export const STORAGE_BUCKETS = {
  ARTICLES: 'articles',
  COVERS: 'covers',
} as const

// Upload options
export const UPLOAD_OPTIONS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
} as const

export interface UploadResult {
  success: boolean
  url?: string
  error?: string
}

export interface StorageConfig {
  bucket: string
  path: string
}

/**
 * Create a Supabase storage client
 */
export function createStorageClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return null
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookieOptions: {
      domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN || undefined,
    },
  })
}

/**
 * Check if the storage is configured
 */
export function isStorageConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

// Validate file type
export function isValidFileType(type: string): boolean {
  return (UPLOAD_OPTIONS.ALLOWED_TYPES as readonly string[]).includes(type)
}

/**
 * Validate file size
 */
export function isValidFileSize(size: number): boolean {
  return size <= UPLOAD_OPTIONS.MAX_FILE_SIZE
}

/**
 * Generate a unique file path for storage
 */
export function generateFilePath(
  bucket: string,
  userId: string,
  fileName: string
): string {
  const timestamp = Date.now()
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_')
  return `${bucket}/${userId}/${timestamp}-${sanitizedFileName}`
}

/**
 * Upload an image to Supabase Storage
 */
export async function uploadImage(
  file: File,
  bucket: string = STORAGE_BUCKETS.ARTICLES,
  userId?: string
): Promise<UploadResult> {
  if (!isStorageConfigured()) {
    return {
      success: false,
      error: 'Supabase storage is not configured',
    }
  }

  if (!isValidFileType(file.type)) {
    return {
      success: false,
      error: `Invalid file type. Allowed types: ${UPLOAD_OPTIONS.ALLOWED_TYPES.join(', ')}`,
    }
  }

  if (!isValidFileSize(file.size)) {
    return {
      success: false,
      error: `File size exceeds ${UPLOAD_OPTIONS.MAX_FILE_SIZE / 1024 / 1024}MB limit`,
    }
  }

  const supabase = createStorageClient()
  if (!supabase) {
    return {
      success: false,
      error: 'Failed to create storage client',
    }
  }

  const path = userId
    ? generateFilePath(bucket, userId, file.name)
    : `${bucket}/${Date.now()}-${file.name}`

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '31536000', // 1 year cache
      upsert: false,
    })

  if (error) {
    return {
      success: false,
      error: error.message,
    }
  }

  return {
    success: true,
    url: getPublicUrl(bucket, data.path),
  }
}

/**
 * Get public URL for a storage path
 */
export function getPublicUrl(bucket: string, path: string): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!supabaseUrl) {
    return ''
  }

  // Construct the public URL directly since we need it synchronously
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`
}

/**
 * Delete an image from Supabase Storage
 */
export async function deleteImage(
  bucket: string,
  path: string
): Promise<UploadResult> {
  if (!isStorageConfigured()) {
    return {
      success: false,
      error: 'Supabase storage is not configured',
    }
  }

  const supabase = createStorageClient()
  if (!supabase) {
    return {
      success: false,
      error: 'Failed to create storage client',
    }
  }

  const { error } = await supabase.storage.from(bucket).remove([path])

  if (error) {
    return {
      success: false,
      error: error.message,
    }
  }

  return {
    success: true,
  }
}

/**
 * Upload a cover image for an article
 */
export async function uploadCoverImage(
  file: File,
  userId: string
): Promise<UploadResult> {
  return uploadImage(file, STORAGE_BUCKETS.COVERS, userId)
}

/**
 * Upload an inline article image
 */
export async function uploadArticleImage(
  file: File,
  userId: string
): Promise<UploadResult> {
  return uploadImage(file, STORAGE_BUCKETS.ARTICLES, userId)
}
