-- DailyWorkerHub Community Platform - Comment Soft Delete
-- Phase 2: Add deleted_at column for soft delete functionality

-- ============================================
-- ALTER EXISTING TABLE
-- ============================================

-- Add deleted_at column for soft delete (null = not deleted)
ALTER TABLE public.comments
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

-- Add index for efficient soft-delete queries
CREATE INDEX IF NOT EXISTS comments_deleted_at_idx ON public.comments(deleted_at);
