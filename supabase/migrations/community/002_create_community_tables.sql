-- ==========================================
-- Community Tables Migration
-- Migration 002: Create community tables
-- ==========================================

-- ==========================================
-- PROFILES (synced from public.users)
-- ==========================================
create table if not exists community.profiles (
  id uuid primary key references public.users(id) on delete cascade,
  username text unique,
  full_name text,
  avatar_url text,
  bio text,
  reputation integer default 0,
  role text default 'member' check (role in ('member', 'moderator', 'admin')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ==========================================
-- CONTENT CATEGORIES
-- ==========================================
create table if not exists community.content_categories (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  name text not null,
  description text,
  type text check (type in ('article', 'discussion', 'doc', 'feedback')),
  icon text,
  color text,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- ==========================================
-- ARTICLES
-- ==========================================
create table if not exists community.articles (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  subtitle text,
  content text not null,
  excerpt text,
  cover_image text,
  author_id uuid references community.profiles(id) not null,
  category_id uuid references community.content_categories(id),
  status text default 'draft' check (status in ('draft', 'published', 'archived')),
  read_time integer,
  view_count integer default 0,
  likes_count integer default 0,
  is_featured boolean default false,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ==========================================
-- DISCUSSIONS
-- ==========================================
create table if not exists community.discussions (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  content text not null,
  excerpt text generated always as (left(content, 200)) stored,
  author_id uuid references community.profiles(id) not null,
  category_id uuid references community.content_categories(id),
  status text default 'open' check (status in ('open', 'closed', 'solved')),
  view_count integer default 0,
  likes_count integer default 0,
  comments_count integer default 0,
  is_pinned boolean default false,
  is_featured boolean default false,
  metadata jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  search_vector tsvector generated always as (
    setweight(to_tsvector('indonesian', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('indonesian', coalesce(content, '')), 'B')
  ) stored
);

create index if not exists discussions_search_idx on community.discussions using gin(search_vector);

-- ==========================================
-- COMMENTS (Threaded)
-- ==========================================
create table if not exists community.comments (
  id uuid default gen_random_uuid() primary key,
  content text not null,
  author_id uuid references community.profiles(id) not null,
  discussion_id uuid references community.discussions(id) on delete cascade,
  parent_id uuid references community.comments(id) on delete cascade,
  is_solution boolean default false,
  likes_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ==========================================
-- DOCS (Knowledge Base)
-- ==========================================
create table if not exists community.docs (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  content text not null,
  excerpt text,
  category_id uuid references community.content_categories(id),
  parent_id uuid references community.docs(id),
  sort_order integer default 0,
  status text default 'published' check (status in ('draft', 'published')),
  view_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ==========================================
-- FEEDBACK ITEMS
-- ==========================================
create table if not exists community.feedback_items (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  author_id uuid references community.profiles(id) not null,
  category text check (category in ('feature', 'bug', 'improvement')),
  status text default 'under_review' check (status in ('under_review', 'planned', 'in_progress', 'completed', 'declined')),
  votes_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ==========================================
-- TAGS
-- ==========================================
create table if not exists community.tags (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  created_at timestamptz default now()
);

-- ==========================================
-- ARTICLE TAGS (Junction)
-- ==========================================
create table if not exists community.article_tags (
  article_id uuid references community.articles(id) on delete cascade,
  tag_id uuid references community.tags(id) on delete cascade,
  primary key (article_id, tag_id)
);

-- ==========================================
-- DISCUSSION TAGS (Junction)
-- ==========================================
create table if not exists community.discussion_tags (
  discussion_id uuid references community.discussions(id) on delete cascade,
  tag_id uuid references community.tags(id) on delete cascade,
  primary key (discussion_id, tag_id)
);

-- ==========================================
-- VOTES (Polymorphic)
-- ==========================================
create table if not exists community.votes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references community.profiles(id) on delete cascade,
  target_type text check (target_type in ('discussion', 'comment', 'feedback')),
  target_id uuid not null,
  value integer check (value in (-1, 1)),
  created_at timestamptz default now(),
  unique(user_id, target_type, target_id)
);