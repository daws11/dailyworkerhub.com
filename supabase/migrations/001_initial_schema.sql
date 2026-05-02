-- Daily Worker Hub Community Platform - Initial Schema
-- Phase 1: Foundation

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================
-- TABLES
-- ============================================

-- Profiles (extends auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  full_name text,
  avatar_url text,
  bio text,
  reputation integer default 0,
  role text default 'member' check (role in ('member', 'moderator', 'admin')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Categories (global)
create table if not exists public.categories (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  name text not null,
  description text,
  type text check (type in ('discussion', 'article', 'doc', 'feedback')) not null,
  icon text,
  color text,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- Discussions
create table if not exists public.discussions (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  content text not null,
  excerpt text generated always as (left(content, 200)) stored,
  author_id uuid references public.profiles(id) on delete cascade not null,
  category_id uuid references public.categories(id) on delete set null,
  status text default 'open' check (status in ('open', 'closed', 'solved')),
  view_count integer default 0,
  likes_count integer default 0,
  comments_count integer default 0,
  is_pinned boolean default false,
  is_featured boolean default false,
  metadata jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Full-text search vector for discussions
alter table public.discussions
add column search_vector tsvector
generated always as (
  setweight(to_tsvector('indonesian', coalesce(title, '')), 'A') ||
  setweight(to_tsvector('indonesian', coalesce(content, '')), 'B')
) stored;

create index if not exists discussions_search_idx on public.discussions using gin(search_vector);

-- Comments
create table if not exists public.comments (
  id uuid default gen_random_uuid() primary key,
  content text not null,
  author_id uuid references public.profiles(id) on delete cascade not null,
  discussion_id uuid references public.discussions(id) on delete cascade not null,
  parent_id uuid references public.comments(id) on delete cascade,
  is_solution boolean default false,
  likes_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Articles
create table if not exists public.articles (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  subtitle text,
  content text not null,
  excerpt text,
  cover_image text,
  author_id uuid references public.profiles(id) on delete cascade not null,
  category_id uuid references public.categories(id) on delete set null,
  status text default 'draft' check (status in ('draft', 'published', 'archived')),
  read_time integer,
  view_count integer default 0,
  likes_count integer default 0,
  is_featured boolean default false,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Docs (Documentation / Knowledge Base)
create table if not exists public.docs (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  content text not null,
  excerpt text,
  category_id uuid references public.categories(id) on delete set null,
  parent_id uuid references public.docs(id) on delete cascade,
  sort_order integer default 0,
  status text default 'published' check (status in ('draft', 'published')),
  view_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Feedback Items
create table if not exists public.feedback_items (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  author_id uuid references public.profiles(id) on delete cascade not null,
  category text check (category in ('feature', 'bug', 'improvement')) not null,
  status text default 'under_review' check (status in ('under_review', 'planned', 'in_progress', 'completed', 'declined')),
  votes_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Votes (Polymorphic for discussions, comments, feedback)
create table if not exists public.votes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  target_type text check (target_type in ('discussion', 'comment', 'feedback')) not null,
  target_id uuid not null,
  value integer check (value in (-1, 1)) not null,
  created_at timestamptz default now(),
  unique(user_id, target_type, target_id)
);

-- Tags
create table if not exists public.tags (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  created_at timestamptz default now()
);

-- Discussion Tags (many-to-many)
create table if not exists public.discussion_tags (
  discussion_id uuid references public.discussions(id) on delete cascade not null,
  tag_id uuid references public.tags(id) on delete cascade not null,
  primary key (discussion_id, tag_id)
);

-- Article Tags (many-to-many)
create table if not exists public.article_tags (
  article_id uuid references public.articles(id) on delete cascade not null,
  tag_id uuid references public.tags(id) on delete cascade not null,
  primary key (article_id, tag_id)
);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-update updated_at
create or replace function public.update_updated_at()
returns trigger as $$
begin
  NEW.updated_at = now();
  return NEW;
end;
$$ language plpgsql;

-- Trigger for updated_at
create or replace trigger update_updated_at_trigger
before update on public.profiles
for each row execute function public.update_updated_at();

create or replace trigger update_discussions_updated_at
before update on public.discussions
for each row execute function public.update_updated_at();

create or replace trigger update_comments_updated_at
before update on public.comments
for each row execute function public.update_updated_at();

create or replace trigger update_articles_updated_at
before update on public.articles
for each row execute function public.update_updated_at();

create or replace trigger update_docs_updated_at
before update on public.docs
for each row execute function public.update_updated_at();

create or replace trigger update_feedback_items_updated_at
before update on public.feedback_items
for each row execute function public.update_updated_at();

-- Handle vote - auto-update counters
create or replace function public.handle_vote()
returns trigger as $$
begin
  if NEW.target_type = 'discussion' then
    update public.discussions set likes_count = likes_count + NEW.value where id = NEW.target_id;
  elsif NEW.target_type = 'comment' then
    update public.comments set likes_count = likes_count + NEW.value where id = NEW.target_id;
  elsif NEW.target_type = 'feedback' then
    update public.feedback_items set votes_count = votes_count + NEW.value where id = NEW.target_id;
  end if;
  return NEW;
end;
$$ language plpgsql;

create or replace trigger handle_vote_trigger
after insert on public.votes
for each row execute function public.handle_vote();

-- Auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, full_name, avatar_url)
  values (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  return NEW;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.discussions enable row level security;
alter table public.comments enable row level security;
alter table public.articles enable row level security;
alter table public.docs enable row level security;
alter table public.feedback_items enable row level security;
alter table public.votes enable row level security;
alter table public.tags enable row level security;
alter table public.discussion_tags enable row level security;
alter table public.article_tags enable row level security;

-- Profiles policies
create policy "Profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Categories policies
create policy "Categories are viewable by everyone"
  on public.categories for select
  using (true);

-- Discussions policies
create policy "Discussions are viewable by everyone"
  on public.discussions for select
  using (true);

create policy "Authenticated users can create discussions"
  on public.discussions for insert
  with check (auth.uid() = author_id);

create policy "Authors can update own discussions"
  on public.discussions for update
  using (auth.uid() = author_id);

create policy "Authors can delete own discussions"
  on public.discussions for delete
  using (auth.uid() = author_id);

-- Comments policies
create policy "Comments are viewable by everyone"
  on public.comments for select
  using (true);

create policy "Authenticated users can create comments"
  on public.comments for insert
  with check (auth.uid() = author_id);

create policy "Authors can update own comments"
  on public.comments for update
  using (auth.uid() = author_id);

create policy "Authors can delete own comments"
  on public.comments for delete
  using (auth.uid() = author_id);

-- Articles policies
create policy "Published articles are viewable by everyone"
  on public.articles for select
  using (status = 'published' or auth.uid() = author_id);

create policy "Authenticated users can create articles"
  on public.articles for insert
  with check (auth.uid() = author_id);

create policy "Authors can update own articles"
  on public.articles for update
  using (auth.uid() = author_id);

create policy "Authors can delete own articles"
  on public.articles for delete
  using (auth.uid() = author_id);

-- Docs policies
create policy "Published docs are viewable by everyone"
  on public.docs for select
  using (status = 'published');

create policy "Authenticated users can create docs"
  on public.docs for insert
  with check (auth.uid() = author_id);

create policy "Authors can update own docs"
  on public.docs for update
  using (auth.uid() = author_id);

create policy "Authors can delete own docs"
  on public.docs for delete
  using (auth.uid() = author_id);

-- Feedback items policies
create policy "Feedback items are viewable by everyone"
  on public.feedback_items for select
  using (true);

create policy "Authenticated users can create feedback items"
  on public.feedback_items for insert
  with check (auth.uid() = author_id);

create policy "Authors can update own feedback items"
  on public.feedback_items for update
  using (auth.uid() = author_id);

-- Votes policies
create policy "Votes are viewable by authenticated users"
  on public.votes for select
  using (auth.uid() = user_id);

create policy "Authenticated users can insert votes"
  on public.votes for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own votes"
  on public.votes for delete
  using (auth.uid() = user_id);

-- Tags policies
create policy "Tags are viewable by everyone"
  on public.tags for select
  using (true);

-- Discussion tags policies
create policy "Discussion tags are viewable by everyone"
  on public.discussion_tags for select
  using (true);

-- Article tags policies
create policy "Article tags are viewable by everyone"
  on public.article_tags for select
  using (true);

-- ============================================
-- SEED DATA: Categories
-- ============================================

insert into public.categories (slug, name, description, type, icon, color, sort_order) values
  ('karier', 'Karier', 'Diskusi tentang pengembangan karier dan jenjang pekerjaan', 'discussion', 'Briefcase', '#10B981', 1),
  ('gaji-negosiasi', 'Gaji & Negosiasi', 'Tips negosiasi gaji dan diskusi kompensasi', 'discussion', 'DollarSign', '#10B981', 2),
  ('remote-work', 'Remote Work', 'Tips dan pengalaman kerja remote', 'discussion', 'Globe', '#10B981', 3),
  ('skill-development', 'Skill Development', 'Pengembangan skill dan pembelajaran', 'discussion', 'BookOpen', '#10B981', 4),
  ('umum', 'Umum', 'Diskusi umum tentang pekerjaan harian', 'discussion', 'MessageSquare', '#10B981', 5),
  ('tips-trick', 'Tips & Trick', 'Artikel tips dan trik untuk pekerja harian', 'article', 'Lightbulb', '#00FF94', 1),
  ('panduan', 'Panduan', 'Panduan komprehensif untuk pemula', 'article', 'BookOpen', '#00FF94', 2),
  ('inspiratif', 'Inspiratif', 'Kisah inspiratif dari pekerja harian', 'article', 'Heart', '#00FF94', 3),
  ('getting-started', 'Getting Started', 'Panduan awal untuk memulai', 'doc', 'Rocket', '#10B981', 1),
  ('platform-guide', 'Platform Guide', 'Cara menggunakan platform Daily Worker Hub', 'doc', 'HelpCircle', '#10B981', 2),
  ('fitur', 'Fitur', 'Deskripsi dan penggunaan fitur platform', 'doc', 'Star', '#10B981', 3),
  ('feedback', 'Feedback', 'Kumpulan feedback dan saran pengguna', 'feedback', 'MessageSquare', '#10B981', 1);
