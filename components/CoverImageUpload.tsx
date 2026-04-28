"use client";

import * as React from "react";
import Image from "next/image";
import { X, Upload, Loader2, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { uploadCoverImage, isValidFileType, isValidFileSize, UPLOAD_OPTIONS } from "@/lib/supabase/storage";
import { Button } from "@/components/ui/button";

export interface CoverImageUploadProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "onChange"> {
  value: string | null;
  onChange: (url: string | null, file?: File) => void;
  onUpload?: (file: File) => Promise<string>;
  userId?: string;
  disabled?: boolean;
  aspectRatio?: "video" | "square" | "auto";
  className?: string;
}

const aspectRatioClasses = {
  video: "aspect-video",
  square: "aspect-square",
  auto: "",
};

export function CoverImageUpload({
  value,
  onChange,
  onUpload,
  userId,
  disabled = false,
  aspectRatio = "video",
  className,
  ...props
}: CoverImageUploadProps) {
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadError, setUploadError] = React.useState<string | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (value) {
      setPreview(value);
    }
  }, [value]);

  const validateFile = React.useCallback((file: File): string | null => {
    if (!isValidFileType(file.type)) {
      return `Format file tidak didukung. Gunakan: ${UPLOAD_OPTIONS.ALLOWED_TYPES.join(", ")}`;
    }
    if (!isValidFileSize(file.size)) {
      return `Ukuran file terlalu besar. Maksimal ${UPLOAD_OPTIONS.MAX_FILE_SIZE / 1024 / 1024}MB`;
    }
    return null;
  }, []);

  const handleFileSelect = React.useCallback(
    async (file: File) => {
      const error = validateFile(file);
      if (error) {
        setUploadError(error);
        return;
      }

      setUploadError(null);
      setIsUploading(true);

      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        let uploadUrl: string;

        if (onUpload) {
          uploadUrl = await onUpload(file);
        } else if (userId) {
          const result = await uploadCoverImage(file, userId);
          if (!result.success || !result.url) {
            throw new Error(result.error || "Upload failed");
          }
          uploadUrl = result.url;
        } else {
          setUploadError("User ID diperlukan untuk upload cover image");
          setIsUploading(false);
          return;
        }

        onChange(uploadUrl, file);
      } catch (err) {
        setUploadError(err instanceof Error ? err.message : "Gagal mengupload cover image");
        setPreview(null);
      } finally {
        setIsUploading(false);
      }
    },
    [validateFile, onChange, onUpload, userId]
  );

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFileSelect(file);
      }
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    },
    [handleFileSelect]
  );

  const handleRemove = React.useCallback(() => {
    setPreview(null);
    setUploadError(null);
    onChange(null);
  }, [onChange]);

  const handleDragOver = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const file = e.dataTransfer.files?.[0];
      if (file) {
        handleFileSelect(file);
      }
    },
    [handleFileSelect]
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.key === "Enter" || e.key === " ") && !disabled && !isUploading) {
        e.preventDefault();
        inputRef.current?.click();
      }
    },
    [disabled, isUploading]
  );

  return (
    <div className={cn("space-y-2", className)} {...props}>
      <div
        className={cn(
          "relative w-full rounded-xl overflow-hidden bg-card border border-border",
          aspectRatioClasses[aspectRatio],
          isDragging && "border-emerald-500 ring-2 ring-emerald-500/20"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {preview || value ? (
          <>
            <Image
              src={preview || value || ""}
              alt="Cover preview"
              fill
              className="object-cover"
              unoptimized={preview?.startsWith("data:")}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="text-xs text-foreground/80 bg-background/60 px-2 py-1 rounded">
                Cover Image
              </span>
              <button
                onClick={handleRemove}
                disabled={disabled || isUploading}
                className={cn(
                  "p-2 rounded-full bg-background/80 text-muted-foreground",
                  "hover:text-foreground hover:bg-muted",
                  "transition-colors",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
                type="button"
                aria-label="Hapus cover image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : isUploading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
            <p className="text-sm text-muted-foreground">Mengupload cover image...</p>
          </div>
        ) : (
          <label
            className={cn(
              "flex flex-col items-center justify-center w-full h-full min-h-[200px]",
              "cursor-pointer",
              !disabled && "hover:bg-muted/50",
              disabled && "cursor-not-allowed opacity-50"
            )}
            tabIndex={disabled ? undefined : 0}
            onKeyDown={handleKeyDown}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
              <ImageIcon className="w-10 h-10 text-muted-foreground/70 mb-3" />
              <p className="text-sm text-muted-foreground mb-1 text-center">
                {isDragging
                  ? "Lepaskan file di sini"
                  : "Klik untuk upload atau drag & drop"}
              </p>
              <p className="text-xs text-muted-foreground/70 text-center">
                PNG, JPG, WebP, GIF (maksimal {UPLOAD_OPTIONS.MAX_FILE_SIZE / 1024 / 1024}MB)
              </p>
            </div>
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              accept={UPLOAD_OPTIONS.ALLOWED_TYPES.join(",")}
              onChange={handleInputChange}
              disabled={disabled}
            />
          </label>
        )}
      </div>

      {uploadError && (
        <p className="text-sm text-red-400 flex items-center gap-1">
          <X className="w-3 h-3" />
          {uploadError}
        </p>
      )}
    </div>
  );
}
