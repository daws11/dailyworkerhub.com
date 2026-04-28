-- ==========================================
-- Sync Trigger Migration
-- Migration 004: Auto-create community profile on user signup
-- ==========================================

-- Function: Auto-create community profile when public.users is created
create or replace function public.handle_new_user()
returns trigger as $$
declare
  generated_username text;
begin
  -- Generate username from email (before @) or full_name
  generated_username := coalesce(
    new.raw_user_meta_data->>'username',
    split_part(new.email, '@', 1),
    'user_' || substr(new.id::text, 1, 8)
  );

  insert into community.profiles (id, username, full_name, avatar_url, bio, reputation, role)
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

-- Trigger on auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Also handle updates to auth.users
drop trigger if exists on_auth_user_updated on auth.users;
create trigger on_auth_user_updated
  after update on auth.users
  for each row execute function public.handle_new_user();

-- Function to update updated_at timestamp
create or replace function community.handle_updated_at()
returns trigger as $$
begin
  NEW.updated_at = now();
  return NEW;
end;
$$ language plpgsql;

-- Create updated_at triggers for all tables
drop trigger if exists update_profiles_updated_at on community.profiles;
create trigger update_profiles_updated_at
before update on community.profiles
for each row execute function community.handle_updated_at();

drop trigger if exists update_articles_updated_at on community.articles;
create trigger update_articles_updated_at
before update on community.articles
for each row execute function community.handle_updated_at();

drop trigger if exists update_discussions_updated_at on community.discussions;
create trigger update_discussions_updated_at
before update on community.discussions
for each row execute function community.handle_updated_at();

drop trigger if exists update_comments_updated_at on community.comments;
create trigger update_comments_updated_at
before update on community.comments
for each row execute function community.handle_updated_at();

drop trigger if exists update_docs_updated_at on community.docs;
create trigger update_docs_updated_at
before update on community.docs
for each row execute function community.handle_updated_at();

drop trigger if exists update_feedback_items_updated_at on community.feedback_items;
create trigger update_feedback_items_updated_at
before update on community.feedback_items
for each row execute function community.handle_updated_at();