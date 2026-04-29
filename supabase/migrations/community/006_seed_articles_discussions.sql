-- Seed data for articles and discussions with realistic Indonesian content
-- Using existing profiles and categories

DO $$
DECLARE
  article1_id uuid;
  article2_id uuid;
  article3_id uuid;
  article4_id uuid;
  discussion1_id uuid;
  discussion2_id uuid;
  discussion3_id uuid;
  discussion4_id uuid;
  tag_pekerjaan uuid;
  tag_tips uuid;
  tag_skill uuid;
  tag_platform uuid;
  tag_karir uuid;
  tag_daily_worker uuid;
  tag_gaji uuid;
  tag_negosiasi uuid;
  tag_lowongan uuid;
  cat_tips_trick uuid;
  cat_panduan uuid;
  cat_inspiratif uuid;
  cat_gaji uuid;
  cat_karier uuid;
  cat_umum uuid;
BEGIN
  -- Get tag IDs
  SELECT id INTO tag_pekerjaan FROM community.tags WHERE slug = 'pekerjaan';
  SELECT id INTO tag_tips FROM community.tags WHERE slug = 'tips';
  SELECT id INTO tag_skill FROM community.tags WHERE slug = 'skill';
  SELECT id INTO tag_platform FROM community.tags WHERE slug = 'platform';
  SELECT id INTO tag_karir FROM community.tags WHERE slug = 'karir';
  SELECT id INTO tag_daily_worker FROM community.tags WHERE slug = 'daily-worker';
  SELECT id INTO tag_gaji FROM community.tags WHERE slug = 'gaji';
  SELECT id INTO tag_negosiasi FROM community.tags WHERE slug = 'negosiasi';
  SELECT id INTO tag_lowongan FROM community.tags WHERE slug = 'lowongan';

  -- Get category IDs
  SELECT id INTO cat_tips_trick FROM community.content_categories WHERE slug = 'tips-trick';
  SELECT id INTO cat_panduan FROM community.content_categories WHERE slug = 'panduan';
  SELECT id INTO cat_inspiratif FROM community.content_categories WHERE slug = 'inspiratif';
  SELECT id INTO cat_gaji FROM community.content_categories WHERE slug = 'gaji-negosiasi';
  SELECT id INTO cat_karier FROM community.content_categories WHERE slug = 'karier';
  SELECT id INTO cat_umum FROM community.content_categories WHERE slug = 'umum';

  -- Insert articles
  INSERT INTO community.articles (slug, title, subtitle, content, excerpt, cover_image, author_id, category_id, status, read_time, view_count, likes_count, is_featured, published_at)
  VALUES (
    '10-tips-menjadi-housekeeper-profesional',
    '10 Tips Menjadi Housekeeper Profesional di Bali',
    'Kunci sukses bekerja di industri perhotelan',
    'Industri perhotelan di Bali terus berkembang pesat setiap tahunnya. Hal ini membuka peluang besar bagi pekerja harian untuk membangun karir sebagai housekeeper profesional.',
    'Pelajari 10 tips essential untuk menjadi housekeeper profesional di industri perhotelan Bali.',
    'https://images.unsplash.com/photo-1582719478250-c89cae4c85b5?w=1200&q=80',
    '8a15eefd-3d02-4834-9b73-e934af1ec574',
    cat_tips_trick,
    'published',
    6,
    1250,
    89,
    true,
    NOW() - INTERVAL '7 days'
  ) RETURNING id INTO article1_id;

  INSERT INTO community.articles (slug, title, subtitle, content, excerpt, cover_image, author_id, category_id, status, read_time, view_count, likes_count, is_featured, published_at)
  VALUES (
    'panduan-sistem-escrow-untuk-employer',
    'Panduan Lengkap Sistem Escrow untuk Employer di DailyWorkerHub',
    'Cara aman mengelola pembayaran pekerja harian',
    'Sistem escrow adalah salah satu fitur paling penting di DailyWorkerHub yang memberikan keamanan bagi kedua belah pihak: employer dan worker.',
    'Pelajari cara menggunakan sistem escrow DailyWorkerHub dengan aman dan efisien sebagai employer.',
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
    '8a15eefd-3d02-4834-9b73-e934af1ec574',
    cat_panduan,
    'published',
    5,
    890,
    45,
    true,
    NOW() - INTERVAL '3 days'
  ) RETURNING id INTO article2_id;

  INSERT INTO community.articles (slug, title, subtitle, content, excerpt, cover_image, author_id, category_id, status, read_time, view_count, likes_count, is_featured, published_at)
  VALUES (
    'cerita-sukses-wayan-sebuah-perjalanan-dari-ojek-ke-housekeeper',
    'Kisah Sukses Wayan: Dari Ojek Online ke Housekeeper bintang 5',
    'Perjalanan seorang pekerja harian menemukan karir impiannya',
    'Wayan, 32 tahun, adalah contoh nyata bahwa kecelakaan bisa menjadi peluang. Setelah 3 tahun bekerja sebagai driver ojek online, ia memutuskan untuk mencoba peruntungan di industri hospitality.',
    'Kisah inspiratif Wayan yang berhasil bertransisi dari driver ojek online menjadi housekeeper profesional di hotel bintang 5 Bali.',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
    '4d0abdca-1b12-413f-8c1a-f6b3024aa181',
    cat_inspiratif,
    'published',
    4,
    2100,
    156,
    true,
    NOW() - INTERVAL '1 day'
  ) RETURNING id INTO article3_id;

  INSERT INTO community.articles (slug, title, subtitle, content, excerpt, cover_image, author_id, category_id, status, read_time, view_count, likes_count, is_featured, published_at)
  VALUES (
    'negosiasi-gaji-untuk-pekerja-harian-perspektif-hr',
    'Negosiasi Gaji untuk Pekerja Harian: Perspektif dari HR Hotel',
    'Apa yang HR hotel inginkan dari worker yang nego',
    'Sebagai someone yang sudah 10 tahun di industri hospitality, saya ingin share perspective dari pihak hotel tentang negosiasi gaji worker harian.',
    'Insights dari seorang HR hotel tentang bagaimana pekerja harian bisa negotiation gaji yang lebih baik dengan pendekatan yang tepat.',
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80',
    '8a15eefd-3d02-4834-9b73-e934af1ec574',
    cat_gaji,
    'published',
    5,
    1890,
    112,
    false,
    NOW() - INTERVAL '5 days'
  ) RETURNING id INTO article4_id;

  -- Insert article tags
  INSERT INTO community.article_tags (article_id, tag_id) VALUES (article1_id, tag_pekerjaan);
  INSERT INTO community.article_tags (article_id, tag_id) VALUES (article1_id, tag_tips);
  INSERT INTO community.article_tags (article_id, tag_id) VALUES (article1_id, tag_skill);
  INSERT INTO community.article_tags (article_id, tag_id) VALUES (article2_id, tag_platform);
  INSERT INTO community.article_tags (article_id, tag_id) VALUES (article2_id, tag_tips);
  INSERT INTO community.article_tags (article_id, tag_id) VALUES (article3_id, tag_pekerjaan);
  INSERT INTO community.article_tags (article_id, tag_id) VALUES (article3_id, tag_karir);
  INSERT INTO community.article_tags (article_id, tag_id) VALUES (article3_id, tag_daily_worker);
  INSERT INTO community.article_tags (article_id, tag_id) VALUES (article4_id, tag_gaji);
  INSERT INTO community.article_tags (article_id, tag_id) VALUES (article4_id, tag_negosiasi);
  INSERT INTO community.article_tags (article_id, tag_id) VALUES (article4_id, tag_tips);

  -- Insert discussions
  INSERT INTO community.discussions (slug, title, content, author_id, category_id, status, view_count, likes_count, comments_count, is_pinned, is_featured)
  VALUES (
    'berapa-gaji-fair-untuk-housekeeper-di-bali-2026',
    'Berapa Gaji Fair untuk Housekeeper di Bali 2026?',
    'Saya sudah 2 tahun bekerja sebagai housekeeper di hotel bintang 3 kawasan Kuta. Saat ini digaji Rp 180.000/hari dengan jam kerja 8 jam mulai dari 07.00-15.00. Dengan cost of living di Bali yang semakin naik, terutama setelah recent kenaikan BBM dan harga bahan pokok, saya merasa angka ini sudah tidak sesuai lagi. Yang saya ingin tanyakan: 1. Apa benchmark gaji housekeeper di hotel bintang 3, 4, dan 5 saat ini? 2. Apakah reasonable kalau saya negotiate minta Rp 220.000/hari untuk daily rate dengan pengalaman 2 tahun? 3. Ada tips untuk negotiate salary yang bisa share?',
    '8a15eefd-3d02-4834-9b73-e934af1ec574',
    cat_gaji,
    'open',
    456,
    67,
    23,
    true,
    true
  ) RETURNING id INTO discussion1_id;

  INSERT INTO community.discussions (slug, title, content, author_id, category_id, status, view_count, likes_count, comments_count, is_pinned, is_featured)
  VALUES (
    'tips-untuk-employer-cara-memilih-housekeeper-yang-tepat',
    'Tips untuk Employer: Cara Memilih Housekeeper yang Tepat',
    'Sebagai owner dari 5 villa di Ubud, saya sudah menggunakan DailyWorkerHub untuk merekrut daily workers selama hampir 1 tahun. Berikut pengalaman dan tips dari sisi employer: Kriteria yang saya gunakan: 1. Review dan Rating - Saya selalu check minimal 4 stars dengan minimal 10 reviews sebelum shortlisting. 2. Response Time - Worker yang bisa accept job dalam 1 jam setelah posting biasanya lebih reliable. 3. Specialized Skills - Untuk villa dengan pool, saya cari worker yang punya pengalaman pool cleaning. 4. Communication - Worker yang bisa give update progress secara proactive itu sangat berharga. Platform seperti DailyWorkerHub membantu saya menemukan workers yang reliable dengan lebih efisien.',
    '4d0abdca-1b12-413f-8c1a-f6b3024aa181',
    cat_karier,
    'open',
    234,
    45,
    12,
    false,
    false
  ) RETURNING id INTO discussion2_id;

  INSERT INTO community.discussions (slug, title, content, author_id, category_id, status, view_count, likes_count, comments_count, is_pinned, is_featured)
  VALUES (
    'discussion-tentang-attendance-gps-location',
    'Discussion: Apakah Attendance dengan GPS Location Itu Necessity atau Overkill?',
    'weekly saya observe perkembangan di DailyWorkerHub, attendance system yang menggunakan GPS verification adalah salah satu fitur yang membedakan platform ini dari competitors. Tapi dalam praktiknya, ada beberapa concerns dari worker side: Privacy concerns, GPS accuracy issues, dan battery consumption. Sementara dari employer side, GPS attendance membantu anti-fraud protection dan dispute resolution. Apakah ada alternatif lain yang bisa balance privacy dan accountability?',
    '8a15eefd-3d02-4834-9b73-e934af1ec574',
    cat_umum,
    'open',
    189,
    34,
    8,
    false,
    false
  ) RETURNING id INTO discussion3_id;

  INSERT INTO community.discussions (slug, title, content, author_id, category_id, status, view_count, likes_count, comments_count, is_pinned, is_featured)
  VALUES (
    'sharing-pengalaman-first-time-jadi-bartender-di-rooftop-bar',
    'Sharing Pengalaman: First Time Jadi Bartender di Rooftop Bar Seminyak',
    '3 bulan lalu, saya register di DailyWorkerHub sebagai daily worker dengan primary skill kitchen helper dan potwasher. Tidak ada pengalaman hospitality sama sekali. Last week, sebuah rooftop bar di Seminyak posting lowongan untuk bartender helper. Mereka tidak require pengalaman sebagai bartender - yang mereka butuhkan adalah willingness to learn dan positive attitude. First shift saya: learn basic cocktail recipes, practice pouring technique, shadow bartender senior untuk 4 jam. Lessons Learned: 1. Customer service attitude itu bisa transfer kemana aja. 2. Jangan afraid untuk apply posisi yang outside your comfort zone. 3. Platform seperti DailyWorkerHub give everyone a chance.',
    '4d0abdca-1b12-413f-8c1a-f6b3024aa181',
    cat_karier,
    'open',
    567,
    89,
    31,
    false,
    true
  ) RETURNING id INTO discussion4_id;

  -- Insert discussion tags
  INSERT INTO community.discussion_tags (discussion_id, tag_id) VALUES (discussion1_id, tag_gaji);
  INSERT INTO community.discussion_tags (discussion_id, tag_id) VALUES (discussion1_id, tag_lowongan);
  INSERT INTO community.discussion_tags (discussion_id, tag_id) VALUES (discussion1_id, tag_pekerjaan);
  INSERT INTO community.discussion_tags (discussion_id, tag_id) VALUES (discussion2_id, tag_tips);
  INSERT INTO community.discussion_tags (discussion_id, tag_id) VALUES (discussion2_id, tag_pekerjaan);
  INSERT INTO community.discussion_tags (discussion_id, tag_id) VALUES (discussion3_id, tag_platform);
  INSERT INTO community.discussion_tags (discussion_id, tag_id) VALUES (discussion3_id, tag_pekerjaan);
  INSERT INTO community.discussion_tags (discussion_id, tag_id) VALUES (discussion4_id, tag_pekerjaan);
  INSERT INTO community.discussion_tags (discussion_id, tag_id) VALUES (discussion4_id, tag_karir);
  INSERT INTO community.discussion_tags (discussion_id, tag_id) VALUES (discussion4_id, tag_tips);

END $$;
