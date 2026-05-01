-- Daily Worker Hub Community Platform - Soft Delete Migration
-- Phase 5: Discussion Forum Delete Confirmation Notification

-- ============================================
-- ADD deleted_at COLUMNS FOR SOFT DELETE
-- ============================================

-- Add deleted_at to discussions table for soft delete
alter table public.discussions
add column if not exists deleted_at timestamptz;

-- Add deleted_at to comments table for soft delete
alter table public.comments
add column if not exists deleted_at timestamptz;

-- ============================================
-- CREATE SOFT DELETE FUNCTIONS
-- ============================================

-- Function to soft delete a discussion
create or replace function public.soft_delete_discussion()
returns trigger as $$
begin
  NEW.deleted_at = now();
  return NEW;
end;
$$ language plpgsql;

-- Trigger to soft delete discussions (instead of hard delete)
create or replace trigger soft_delete_discussion_trigger
before delete on public.discussions
for each row execute function public.soft_delete_discussion();

-- Function to soft delete a comment
create or replace function public.soft_delete_comment()
returns trigger as $$
begin
  NEW.deleted_at = now();
  return NEW;
end;
$$ language plpgsql;

-- Trigger to soft delete comments (instead of hard delete)
create or replace trigger soft_delete_comment_trigger
before delete on public.comments
for each row execute function public.soft_delete_comment();

-- ============================================
-- UPDATE RLS POLICIES FOR SOFT DELETE
-- ============================================

-- Update discussions select policy to exclude soft-deleted
drop policy if exists "Discussions are viewable by everyone" on public.discussions;
create policy "Discussions are viewable by everyone"
  on public.discussions for select
  using (deleted_at is null);

-- Update discussions update policy to allow soft delete
drop policy if exists "Authors can delete own discussions" on public.discussions;
create policy "Authors can delete own discussions"
  on public.discussions for delete
  using (auth.uid() = author_id);

-- Update comments select policy to exclude soft-deleted
drop policy if exists "Comments are viewable by everyone" on public.comments;
create policy "Comments are viewable by everyone"
  on public.comments for select
  using (deleted_at is null);

-- Update comments update policy to allow soft delete
drop policy if exists "Authors can delete own comments" on public.discussions;
create policy "Authors can delete own comments"
  on public.comments for delete
  using (auth.uid() = author_id);

-- ============================================
-- CREATE INDEX FOR SOFT DELETED RECORDS
-- ============================================

-- Index for efficient soft delete queries on discussions
create index if not exists discussions_deleted_at_idx on public.discussions(deleted_at);

-- Index for efficient soft delete queries on comments
create index if not exists comments_deleted_at_idx on public.comments(deleted_at);