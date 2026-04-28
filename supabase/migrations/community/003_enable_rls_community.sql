-- ==========================================
-- RLS Policies Migration
-- Migration 003: Enable RLS for community tables
-- ==========================================

-- Enable RLS
alter table community.profiles enable row level security;
alter table community.articles enable row level security;
alter table community.discussions enable row level security;
alter table community.comments enable row level security;
alter table community.docs enable row level security;
alter table community.feedback_items enable row level security;
alter table community.votes enable row level security;
alter table community.content_categories enable row level security;
alter table community.tags enable row level security;
alter table community.article_tags enable row level security;
alter table community.discussion_tags enable row level security;

-- ==========================================
-- PROFILES POLICIES
-- ==========================================
create policy "Profiles public read"
on community.profiles for select
to authenticated, anon
using (true);

create policy "Profiles self update"
on community.profiles for update
to authenticated
using (auth.uid() = id);

create policy "Profiles self insert"
on community.profiles for insert
to authenticated
with check (auth.uid() = id);

-- ==========================================
-- ARTICLES POLICIES
-- ==========================================
create policy "Articles public read"
on community.articles for select
to authenticated, anon
using (status = 'published');

create policy "Articles author insert"
on community.articles for insert
to authenticated
with check (auth.uid() = author_id);

create policy "Articles author update"
on community.articles for update
to authenticated
using (auth.uid() = author_id);

create policy "Articles author delete"
on community.articles for delete
to authenticated
using (auth.uid() = author_id);

-- ==========================================
-- DISCUSSIONS POLICIES
-- ==========================================
create policy "Discussions public read"
on community.discussions for select
to authenticated, anon
using (true);

create policy "Discussions authenticated insert"
on community.discussions for insert
to authenticated
with check (auth.uid() = author_id);

create policy "Discussions author update"
on community.discussions for update
to authenticated
using (auth.uid() = author_id);

create policy "Discussions author delete"
on community.discussions for delete
to authenticated
using (auth.uid() = author_id);

-- ==========================================
-- COMMENTS POLICIES
-- ==========================================
create policy "Comments public read"
on community.comments for select
to authenticated, anon
using (true);

create policy "Comments authenticated insert"
on community.comments for insert
to authenticated
with check (auth.uid() = author_id);

create policy "Comments author update"
on community.comments for update
to authenticated
using (auth.uid() = author_id);

create policy "Comments author delete"
on community.comments for delete
to authenticated
using (auth.uid() = author_id);

-- ==========================================
-- DOCS POLICIES
-- ==========================================
create policy "Docs public read"
on community.docs for select
to authenticated, anon
using (status = 'published');

create policy "Docs authenticated insert"
on community.docs for insert
to authenticated
with check (true);

create policy "Docs author update"
on community.docs for update
to authenticated
using (true);

-- ==========================================
-- FEEDBACK ITEMS POLICIES
-- ==========================================
create policy "Feedback public read"
on community.feedback_items for select
to authenticated, anon
using (true);

create policy "Feedback authenticated insert"
on community.feedback_items for insert
to authenticated
with check (auth.uid() = author_id);

create policy "Feedback author update"
on community.feedback_items for update
to authenticated
using (auth.uid() = author_id);

-- ==========================================
-- VOTES POLICIES
-- ==========================================
create policy "Votes authenticated all"
on community.votes for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- ==========================================
-- CATEGORIES POLICIES
-- ==========================================
create policy "Categories public read"
on community.content_categories for select
to authenticated, anon
using (true);

-- ==========================================
-- TAGS POLICIES
-- ==========================================
create policy "Tags public read"
on community.tags for select
to authenticated, anon
using (true);

-- ==========================================
-- ARTICLE TAGS POLICIES
-- ==========================================
create policy "Article tags public read"
on community.article_tags for select
to authenticated, anon
using (true);

-- ==========================================
-- DISCUSSION TAGS POLICIES
-- ==========================================
create policy "Discussion tags public read"
on community.discussion_tags for select
to authenticated, anon
using (true);