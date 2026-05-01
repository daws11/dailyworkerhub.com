-- ==========================================
-- Seed Categories Migration
-- Migration 005: Seed initial content categories
-- ==========================================

insert into community.content_categories (slug, name, description, type, icon, color, sort_order) values
('tips-karir', 'Tips Karir', 'Panduan dan tips untuk mengembangkan karir sebagai pekerja harian', 'article', 'Briefcase', '#10B981', 1),
('diskusi-umum', 'Diskusi Umum', 'Topik bebas seputar dunia kerja dan komunitas', 'discussion', 'MessageCircle', '#3B82F6', 2),
('gaji-negosiasi', 'Gaji & Negosiasi', 'Diskusi tentang tarif, upah, dan cara negosiasi', 'discussion', 'Banknote', '#F59E0B', 3),
('panduan', 'Panduan', 'Dokumentasi dan tutorial penggunaan platform', 'doc', 'BookOpen', '#8B5CF6', 4),
('fitur-baru', 'Fitur Baru', 'Usulan fitur baru untuk platform Daily Worker Hub', 'feedback', 'Lightbulb', '#10B981', 5),
('laporan-bug', 'Laporan Bug', 'Laporkan masalah atau bug yang ditemukan', 'feedback', 'Bug', '#EF4444', 6);