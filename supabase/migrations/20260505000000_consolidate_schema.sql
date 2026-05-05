-- Consolidate schema: drop community schema, all tables in public

-- Copy any data from community tables to public tables (if the community tables exist)
do $$
begin
  if exists (select 1 from information_schema.tables where table_schema = 'community' and table_name = 'articles') then
    insert into public.articles (id, slug, title, subtitle, content, excerpt, cover_image, author_id, category_id, status, read_time, view_count, likes_count, is_featured, published_at, created_at, updated_at)
    select id, slug, title, subtitle, content, excerpt, cover_image, author_id, category_id, status, read_time, view_count, likes_count, is_featured, published_at, created_at, updated_at
    from community.articles
    on conflict (slug) do nothing;
  end if;

  if exists (select 1 from information_schema.tables where table_schema = 'community' and table_name = 'discussions') then
    insert into public.discussions (id, slug, title, content, author_id, category_id, status, view_count, likes_count, votes_count, comments_count, is_pinned, is_featured, metadata, created_at, updated_at)
    select id, slug, title, content, author_id, category_id, status, view_count, likes_count, votes_count, comments_count, is_pinned, is_featured, metadata, created_at, updated_at
    from community.discussions
    on conflict (slug) do nothing;
  end if;

  if exists (select 1 from information_schema.tables where table_schema = 'community' and table_name = 'comments') then
    insert into public.comments (id, content, author_id, discussion_id, article_id, parent_id, depth, is_solution, likes_count, created_at, updated_at)
    select id, content, author_id, discussion_id, article_id, parent_id, depth, is_solution, likes_count, created_at, updated_at
    from community.comments
    on conflict do nothing;
  end if;

  if exists (select 1 from information_schema.tables where table_schema = 'community' and table_name = 'votes') then
    insert into public.votes (id, user_id, target_type, target_id, value, created_at)
    select id, user_id, target_type, target_id, value, created_at
    from community.votes
    on conflict (user_id, target_type, target_id) do nothing;
  end if;

  if exists (select 1 from information_schema.tables where table_schema = 'community' and table_name = 'feedback_items') then
    insert into public.feedback_items (id, title, description, author_id, category, status, votes_count, created_at, updated_at)
    select id, title, description, author_id, category, status, votes_count, created_at, updated_at
    from community.feedback_items
    on conflict do nothing;
  end if;

  if exists (select 1 from information_schema.tables where table_schema = 'community' and table_name = 'content_categories') then
    insert into public.categories (id, slug, name, description, type, icon, color, sort_order, created_at)
    select id, slug, name, description, type, icon, color, sort_order, created_at
    from community.content_categories
    on conflict (slug) do nothing;
  end if;

  if exists (select 1 from information_schema.tables where table_schema = 'community' and table_name = 'tags') then
    insert into public.tags (id, name, slug, created_at)
    select id, name, slug, created_at
    from community.tags
    on conflict (slug) do nothing;
  end if;
end $$;

-- Recreate the auth user trigger to point to public.profiles instead of community.profiles
create or replace function public.handle_new_user()
returns trigger as $$
declare
  generated_username text;
begin
  generated_username := coalesce(
    new.raw_user_meta_data->>'username',
    split_part(new.email, '@', 1),
    'user_' || substr(new.id::text, 1, 8)
  );

  insert into public.profiles (id, username, full_name, avatar_url, bio, reputation, role)
  values (
    new.id,
    generated_username,
    coalesce(new.raw_user_meta_data->>'full_name', generated_username),
    new.raw_user_meta_data->>'avatar_url',
    null,
    0,
    'member'
  )
  on conflict (id) do update set
    full_name = excluded.full_name,
    avatar_url = excluded.avatar_url,
    updated_at = now();

  return new;
end;
$$ language plpgsql security definer;

-- Drop community schema and all its objects
drop schema if exists community cascade;
