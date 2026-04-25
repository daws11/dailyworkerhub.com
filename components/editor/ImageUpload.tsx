"use client"

import * as React from "react"
import { Mark, mergeAttributes } from "@tiptap/core"
import { uploadArticleImage } from "@/lib/supabase/storage"

export interface ImageUploadOptions {
  HTMLAttributes: Record<string, unknown>
  uploadFn?: (file: File) => Promise<string>
}

/**
 * ImageUpload Mark extension for TipTap
 * Allows uploading images to storage and inserting them into the editor
 */
const ImageUploadMark = Mark.create({
  name: "imageUpload",

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: "img[src]",
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ["img", mergeAttributes((this as any).options.HTMLAttributes, HTMLAttributes)]
  },

  addCommands() {
    return {
      setImageUpload:
        (options: { src: string; alt?: string; title?: string }) =>
        ({ commands }: { commands: any }) => {
          return commands.setMark((this as any).name, options)
        },
    }
  },
})

/**
 * Upload image file and return the URL
 */
export async function uploadImageToStorage(file: File): Promise<string> {
  // For now, we need a userId for uploadArticleImage
  // In a real implementation, this would come from auth context
  const result = await uploadArticleImage(file, "anonymous")

  if (!result.success || !result.url) {
    throw new Error(result.error || "Failed to upload image")
  }

  return result.url
}

// Helper function to create file input and handle upload
export function createImageUploadHandler(
  onUploadStart: () => void,
  onUploadEnd: () => void,
  onSuccess: (url: string) => void,
  onError: (error: string) => void
): () => void {
  return () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/jpeg,image/png,image/gif,image/webp"

    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) {
        return
      }

      onUploadStart()

      try {
        const url = await uploadImageToStorage(file)
        onSuccess(url)
      } catch (err) {
        onError(err instanceof Error ? err.message : "Upload failed")
      } finally {
        onUploadEnd()
      }
    }

    input.click()
  }
}

// File validation constants
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"]

interface ImageUploadButtonProps {
  editor: import("@tiptap/react").Editor | null
  className?: string
  disabled?: boolean
}

/**
 * Image upload button component for the toolbar
 */
export function ImageUploadButton({
  editor,
  disabled = false,
  className,
}: ImageUploadButtonProps) {
  const [uploading, setUploading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const handleUpload = React.useCallback(() => {
    if (!editor) return

    setError(null)

    const input = document.createElement("input")
    input.type = "file"
    input.accept = ALLOWED_TYPES.join(",")

    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) {
        return
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        setError("File size exceeds 5MB limit")
        return
      }

      // Validate file type
      if (!ALLOWED_TYPES.includes(file.type)) {
        setError("Invalid file type. Use JPEG, PNG, GIF, or WebP.")
        return
      }

      setUploading(true)

      try {
        const url = await uploadImageToStorage(file)
        editor.chain().focus().setImage({ src: url }).run()
        setError(null)
      } catch (err) {
        const message = err instanceof Error ? err.message : "Upload failed"
        setError(message)
      } finally {
        setUploading(false)
      }
    }

    input.click()
  }, [editor])

  if (uploading) {
    return (
      <button
        type="button"
        disabled
        className={className}
        aria-label="Uploading image"
      >
        <svg
          className="h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </button>
    )
  }

  return (
    <>
      <button
        type="button"
        disabled={disabled || !editor}
        onClick={handleUpload}
        className={className}
        aria-label="Upload image"
        title="Upload image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
      </button>
      {error && (
        <span className="text-xs text-destructive ml-1">{error}</span>
      )}
    </>
  )
}

export { ImageUploadMark }
export default ImageUploadButton