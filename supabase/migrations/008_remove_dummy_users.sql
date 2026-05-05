-- Remove dummy user accounts
-- This migration deletes test/dummy user accounts from the system

-- Delete from profiles first (foreign key dependency)
DELETE FROM profiles 
WHERE id IN (
  '8a15eefd-3d02-4834-9b73-e934af1ec574',  -- dawskutel (Daus)
  '4d0abdca-1b12-413f-8c1a-f6b3024aa181'   -- newtestworkerapr27b (New Test Worker)
);

-- Delete from auth.users
DELETE FROM auth.users 
WHERE id IN (
  '8a15eefd-3d02-4834-9b73-e934af1ec574',  -- dawskutel (Daus)
  '4d0abdca-1b12-413f-8c1a-f6b3024aa181'   -- newtestworkerapr27b (New Test Worker)
);
