-- Add color column to categories table
-- Fixes 400 error on /community/articles page

ALTER TABLE categories ADD COLUMN IF NOT EXISTS color TEXT DEFAULT '#10B981';