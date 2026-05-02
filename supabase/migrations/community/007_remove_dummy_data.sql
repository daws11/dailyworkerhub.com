-- Remove dummy/seed data from community tables
-- This migration deletes all seeded articles, discussions, and related data

-- Delete article tags first (foreign key dependency)
DELETE FROM community.article_tags 
WHERE article_id IN (
  SELECT id FROM community.articles 
  WHERE slug IN (
    '10-tips-menjadi-housekeeper-profesional',
    'panduan-sistem-dana-jaminan-untuk-pemberi kerja',
    'cerita-sukses-wayan-sebuah-perjalanan-dari-ojek-ke-housekeeper',
    'negosiasi-gaji-untuk-pekerja-harian-perspektif-hr'
  )
);

-- Delete articles
DELETE FROM community.articles 
WHERE slug IN (
  '10-tips-menjadi-housekeeper-profesional',
  'panduan-sistem-dana-jaminan-untuk-pemberi kerja',
  'cerita-sukses-wayan-sebuah-perjalanan-dari-ojek-ke-housekeeper',
  'negosiasi-gaji-untuk-pekerja-harian-perspektif-hr'
);

-- Delete discussion tags first (foreign key dependency)
DELETE FROM community.discussion_tags 
WHERE discussion_id IN (
  SELECT id FROM community.discussions 
  WHERE slug IN (
    'berapa-gaji-fair-untuk-housekeeper-di-bali-2026',
    'tips-untuk-pemberi kerja-cara-memilih-housekeeper-yang-tepat',
    'discussion-tentang-attendance-gps-location',
    'sharing-pengalaman-first-time-jadi-bartender-di-rooftop-bar'
  )
);

-- Delete discussions
DELETE FROM community.discussions 
WHERE slug IN (
  'berapa-gaji-fair-untuk-housekeeper-di-bali-2026',
  'tips-untuk-pemberi kerja-cara-memilih-housekeeper-yang-tepat',
  'discussion-tentang-attendance-gps-location',
  'sharing-pengalaman-first-time-jadi-bartender-di-rooftop-bar'
);
