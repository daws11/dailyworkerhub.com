-- DailyWorkerHub Community Platform - Comment Nesting Enhancement
-- Phase 1: Add depth column and get_comment_tree function

-- ============================================
-- ALTER EXISTING TABLE
-- ============================================

-- Add depth column to comments table for tracking nesting level
alter table public.comments
add column if not exists depth integer default 0 not null;

-- Add index for efficient tree queries
create index if not exists comments_depth_idx on public.comments(depth);
create index if not exists comments_parent_id_idx on public.comments(parent_id);
create index if not exists comments_discussion_id_idx on public.comments(discussion_id);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to get comment tree for a discussion
-- Returns all comments organized hierarchically
create or replace function public.get_comment_tree(p_discussion_id uuid)
returns table (
  id uuid,
  content text,
  author_id uuid,
  discussion_id uuid,
  parent_id uuid,
  is_solution boolean,
  likes_count integer,
  depth integer,
  created_at timestamptz,
  updated_at timestamptz,
  path integer[]
) as $$
begin
  return query
  with recursive comment_tree as (
    -- Base case: root comments (no parent)
    select
      c.id,
      c.content,
      c.author_id,
      c.discussion_id,
      c.parent_id,
      c.is_solution,
      c.likes_count,
      c.depth,
      c.created_at,
      c.updated_at,
      array[c.depth] as path,
      array_position(array[c.depth], c.depth) as tree_order
    from public.comments c
    where c.discussion_id = p_discussion_id
      and c.parent_id is null

    union all

    -- Recursive case: child comments
    select
      c.id,
      c.content,
      c.author_id,
      c.discussion_id,
      c.parent_id,
      c.is_solution,
      c.likes_count,
      c.depth,
      c.created_at,
      c.updated_at,
      ct.path || c.depth,
      array_position(ct.path || c.depth, c.depth)
    from public.comments c
    inner join comment_tree ct on c.parent_id = ct.id
    where c.discussion_id = p_discussion_id
  )
  select
    ct.id,
    ct.content,
    ct.author_id,
    ct.discussion_id,
    ct.parent_id,
    ct.is_solution,
    ct.likes_count,
    ct.depth,
    ct.created_at,
    ct.updated_at,
    ct.path
  from comment_tree ct
  order by ct.path, ct.created_at;
end;
$$ language plpgsql;

-- Function to calculate and update depth when inserting a comment
create or replace function public.calculate_comment_depth()
returns trigger as $$
begin
  if NEW.parent_id is not null then
    select (depth + 1) into NEW.depth
    from public.comments
    where id = NEW.parent_id;
  else
    NEW.depth = 0;
  end if;
  return NEW;
end;
$$ language plpgsql;

-- Trigger to auto-calculate depth on insert
drop trigger if exists calculate_comment_depth_trigger on public.comments;
create trigger calculate_comment_depth_trigger
before insert on public.comments
for each row execute function public.calculate_comment_depth();

-- Function to get direct replies (children) of a comment
create or replace function public.get_comment_replies(p_comment_id uuid)
returns table (
  id uuid,
  content text,
  author_id uuid,
  discussion_id uuid,
  parent_id uuid,
  is_solution boolean,
  likes_count integer,
  depth integer,
  created_at timestamptz,
  updated_at timestamptz
) as $$
begin
  return query
  select
    c.id,
    c.content,
    c.author_id,
    c.discussion_id,
    c.parent_id,
    c.is_solution,
    c.likes_count,
    c.depth,
    c.created_at,
    c.updated_at
  from public.comments c
  where c.parent_id = p_comment_id
  order by c.created_at;
end;
$$ language plpgsql;

-- ============================================
-- BACKFILL EXISTING DATA
-- ============================================

-- Backfill depth for existing comments
update public.comments
set depth = 0
where parent_id is null;

-- Recursively update depth for child comments
with recursive depth_calc as (
  select id, parent_id, 0 as calculated_depth
  from public.comments
  where parent_id is null

  union all

  select c.id, c.parent_id, dc.calculated_depth + 1
  from public.comments c
  inner join depth_calc dc on c.parent_id = dc.id
)
update public.comments
set depth = dc.calculated_depth
from depth_calc dc
where comments.id = dc.id;