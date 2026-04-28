-- ==========================================
-- Community Schema Migration
-- Migration 001: Create community schema
-- ==========================================

-- Create community schema
create schema if not exists community;

-- Grant access to authenticated, anon, and service_role
grant usage on schema community to authenticated, anon, service_role;
grant all privileges on all tables in schema community to authenticated, service_role;
grant all privileges on all sequences in schema community to authenticated, service_role;

-- Enable RLS on all future tables in community schema
alter default privileges in schema community
grant all on tables to authenticated, service_role;

alter default privileges in schema community
grant all on sequences to authenticated, service_role;