-- Daily Worker Hub Community Platform - Voting System Migration
-- Phase 2: Voting System - Database Schema

-- ============================================
-- ADD VOTE COUNT COLUMNS
-- ============================================

-- Add votes_count to discussions table (net votes: upvotes - downvotes)
alter table public.discussions
add column if not exists votes_count integer default 0;

-- ============================================
-- UPDATE VOTE HANDLING TRIGGER
-- ============================================

-- Drop existing vote trigger and function
drop trigger if exists handle_vote_trigger on public.votes;
drop function if exists public.handle_vote();

-- Create updated handle_vote function that updates both likes_count and votes_count
create or replace function public.handle_vote()
returns trigger as $$
begin
  if NEW.target_type = 'discussion' then
    update public.discussions
    set
      likes_count = likes_count + NEW.value,
      votes_count = votes_count + NEW.value
    where id = NEW.target_id;
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

-- ============================================
-- VOTE DELETION HANDLING
-- ============================================

-- Create function to handle vote deletion (reverse the vote effect)
create or replace function public.handle_vote_delete()
returns trigger as $$
begin
  if OLD.target_type = 'discussion' then
    update public.discussions
    set
      likes_count = likes_count - OLD.value,
      votes_count = votes_count - OLD.value
    where id = OLD.target_id;
  elsif OLD.target_type = 'comment' then
    update public.comments set likes_count = likes_count - OLD.value where id = OLD.target_id;
  elsif OLD.target_type = 'feedback' then
    update public.feedback_items set votes_count = votes_count - OLD.value where id = OLD.target_id;
  end if;
  return OLD;
end;
$$ language plpgsql;

create or replace trigger handle_vote_delete_trigger
after delete on public.votes
for each row execute function public.handle_vote_delete();

-- ============================================
-- VOTE UPDATE HANDLING (for vote changes)
-- ============================================

-- Create function to handle vote value changes (e.g., from +1 to -1)
create or replace function public.handle_vote_update()
returns trigger as $$
begin
  if OLD.target_type = 'discussion' then
    update public.discussions
    set
      likes_count = likes_count - OLD.value + NEW.value,
      votes_count = votes_count - OLD.value + NEW.value
    where id = NEW.target_id;
  elsif OLD.target_type = 'comment' then
    update public.comments set likes_count = likes_count - OLD.value + NEW.value where id = NEW.target_id;
  elsif OLD.target_type = 'feedback' then
    update public.feedback_items set votes_count = votes_count - OLD.value + NEW.value where id = NEW.target_id;
  end if;
  return NEW;
end;
$$ language plpgsql;

create or replace trigger handle_vote_update_trigger
after update on public.votes
for each row execute function public.handle_vote_update();

-- ============================================
-- REPUTATION UPDATE TRIGGERS
-- ============================================

-- Function to update author reputation when their content receives votes
create or replace function public.update_author_reputation()
returns trigger as $$
declare
  v_author_id uuid;
  v_reputation_delta integer;
begin
  -- Get the author_id based on target_type
  if NEW.target_type = 'discussion' then
    select author_id into v_author_id from public.discussions where id = NEW.target_id;
  elsif NEW.target_type = 'comment' then
    select author_id into v_author_id from public.comments where id = NEW.target_id;
  elsif NEW.target_type = 'feedback' then
    select author_id into v_author_id from public.feedback_items where id = NEW.target_id;
  else
    return NEW;
  end if;

  -- Don't update reputation for self-votes (prevent gaming)
  if v_author_id = NEW.user_id then
    return NEW;
  end if;

  -- Update reputation: +5 for upvote, -2 for downvote
  v_reputation_delta := case when NEW.value = 1 then 5 else -2 end;

  update public.profiles
  set reputation = greatest(0, reputation + v_reputation_delta)
  where id = v_author_id;

  return NEW;
end;
$$ language plpgsql;

create or replace trigger update_reputation_on_vote
after insert on public.votes
for each row execute function public.update_author_reputation();

-- Function to reverse reputation change on vote deletion
create or replace function public.reverse_author_reputation()
returns trigger as $$
declare
  v_author_id uuid;
  v_reputation_delta integer;
begin
  -- Get the author_id based on target_type
  if OLD.target_type = 'discussion' then
    select author_id into v_author_id from public.discussions where id = OLD.target_id;
  elsif OLD.target_type = 'comment' then
    select author_id into v_author_id from public.comments where id = OLD.target_id;
  elsif OLD.target_type = 'feedback' then
    select author_id into v_author_id from public.feedback_items where id = OLD.target_id;
  else
    return OLD;
  end if;

  -- Don't reverse reputation for self-votes
  if v_author_id = OLD.user_id then
    return OLD;
  end if;

  -- Reverse the reputation change
  v_reputation_delta := case when OLD.value = 1 then -5 else 2 end;

  update public.profiles
  set reputation = greatest(0, reputation + v_reputation_delta)
  where id = v_author_id;

  return OLD;
end;
$$ language plpgsql;

create or replace trigger reverse_reputation_on_vote_delete
after delete on public.votes
for each row execute function public.reverse_author_reputation();

-- Function to adjust reputation on vote change
create or replace function public.adjust_author_reputation()
returns trigger as $$
declare
  v_author_id uuid;
  v_reputation_delta integer;
begin
  -- Get the author_id based on target_type
  if NEW.target_type = 'discussion' then
    select author_id into v_author_id from public.discussions where id = NEW.target_id;
  elsif NEW.target_type = 'comment' then
    select author_id into v_author_id from public.comments where id = NEW.target_id;
  elsif NEW.target_type = 'feedback' then
    select author_id into v_author_id from public.feedback_items where id = NEW.target_id;
  else
    return NEW;
  end if;

  -- Don't adjust reputation for self-votes
  if v_author_id = NEW.user_id then
    return NEW;
  end if;

  -- Calculate the net reputation change
  -- If changing from +1 to -1: -5 - 2 = -7 (lose 7 points)
  -- If changing from -1 to +1: +5 + 2 = +7 (gain 7 points)
  v_reputation_delta := (case when NEW.value = 1 then 5 else -2 end) - (case when OLD.value = 1 then 5 else -2 end);

  update public.profiles
  set reputation = greatest(0, reputation + v_reputation_delta)
  where id = v_author_id;

  return NEW;
end;
$$ language plpgsql;

create or replace trigger adjust_reputation_on_vote_update
after update of value on public.votes
for each row execute function public.adjust_author_reputation();