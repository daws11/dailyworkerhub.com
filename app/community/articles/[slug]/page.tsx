"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDistanceToNow, format } from "date-fns";
import { id } from "date-fns/locale";
import {
  ArrowUp,
  ArrowDown,
  MessageCircle,
  Clock,
  Share2,
  Bookmark,
  Flag,
  Send,
  Calendar,
  Tag,
  ChevronLeft,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Comment {
  id: string;
  content: string;
  author: {
    username: string;
    full_name: string | null;
    avatar_url: string | null;
  };
  likes_count: number;
  created_at: string;
  replies?: Comment[];
}

const mockArticle = {
  id: "1",
  slug: "10-tips-negosiasi-gaji-yang-efektif",
  title: "10 Tips Negosiasi Gaji yang Efektif untuk Daily Worker",
  subtitle: "Jangan pernah accept gaji pertama - begini caranya",
  excerpt: "Negosiasi gaji adalah keterampilan penting yang sering diabaikan oleh banyak pekerja harian. Berikut tips yang bisa Anda terapkan untuk mendapatkan kompensasi yang lebih fair.",
  content: `Negosiasi gaji adalah keterampilan penting yang sering diabaikan oleh banyak pekerja harian. Berikut tips yang bisa Anda terapkan untuk mendapatkan kompensasi yang lebih fair.

## 1. Riset Standar Gaji di Industri

Sebelum memulai negosiasi, pastikan Anda sudah riset berapa standar gaji untuk posisi dan lokasi Anda. Gunakan sumber seperti:
- Portal lowongan kerja
- Forum komunitas worker
- Data dari platform seperti DailyWorkerHub

## 2. Tentukan Angka Minimum yang Fair

Ketahui berapa minimal yang Anda butuhkan untuk:
- Biaya hidup bulanan
- Tunjangan kesehatan
- Tabungan darurat
- Pengembangan skill

## 3. Jangan pernah Accept Gaji Pertama

Ini adalah kesalahan terbesar! Ketika employer memberikan offer pertama, selalu ada ruang untuk negosiasi. Tunjukkan bahwa Anda sudah riset dan punya nilai tambah untuk perusahaan.

## 4. Fokus pada Nilai, Bukan Kebutuhan

 بدلاً dari mengatakan "Saya butuh naik gaji karena biaya hidup naik", fokus pada kontribusi Anda:
- Proyek yang berhasil diselesaikan
- Efisiensi yang Anda bawa
- Skill yang relevan

## 5. Siapkan Dokumentasi

Kumpulkan bukti-bukti pencapaian:
- Angka penjualan atau target yang tercapai
- Review dari client atau employer
- Sertifikat atau skill baru

## 6. Pilih Waktu yang Tepat

Waktu adalah segalanya:
- Saat review performance tahunan
- Setelah menyelesaikan project besar
- Saat company sedang raise funding

## 7. Latih Negosiasi dengan模拟

Sebelum negotiation session yang sebenarnya, latihan dengan:
- Teman atau mentor
- Di depan cermin
- Record diri sendiri

## 8. Siapkan Opsi Alternatif

Selain salary, Anda bisa negosiasi:
- Bonus performance
- Asuransi kesehatan lebih baik
- Flexible working hours
- Training budget
- Equity atau profit sharing

## 9. Tetap Profesional dan Respectful

Meskipun negosiasi bisa tegang, tetap:
- Dengarkan dengan aktif
- Jangan threats atau ultimatum
- Bersyukur atas opportunity

## 10. Siap Walk Away

Yang paling penting: jika offer tidak fair, siap untuk pergi. Jangan settle untuk kurang dari yang Anda layak.

---

Semoga tips ini membantu Anda mendapatkan kompensasi yang lebih fair! Share pengalaman negosiasi Anda di kolom komentar ya.`,
  cover_image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80",
  author: {
    username: "sarah_wijaya",
    full_name: "Sarah Wijaya",
    avatar_url: null,
    bio: "HR Professional dengan 10 tahun pengalaman di berbagai industri. Passion untuk membantu daily workers mendapatkan kompensasi yang fair.",
  },
  category: {
    name: "Tips & Trick",
    slug: "tips-trick",
    color: "#00FF94",
  },
  tags: ["gaji", "negosiasi", "tips", "karir"],
  read_time: 5,
  view_count: 2341,
  likes_count: 156,
  published_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
};

const mockComments: Comment[] = [
  {
    id: "1",
    content: `Terima kasih untuk tips yang sangat useful! Khususnya nomor 3 tentang jangan pernah accept gaji pertama - ini yang sering saya abaikan dulu.

Sekarang sudah mulai apply these tips dan alhamdulillah ada improvement signifikan dari offer pertama ke final offer.`,
    author: {
      username: "budi_driver",
      full_name: "Budi Santoso",
      avatar_url: null,
    },
    likes_count: 45,
    created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    replies: [
      {
        id: "1-1",
        content: `Senang bisa membantu! Konsistensi adalah kunci - terus practice dan refine approach Anda.`,
        author: {
          username: "sarah_wijaya",
          full_name: "Sarah Wijaya",
          avatar_url: null,
        },
        likes_count: 12,
        created_at: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
      },
    ],
  },
  {
    id: "2",
    content: `Menurut saya nomor 8 tentang opsi alternatif sangat penting. Tidak selalu tentang salary, sometimes better benefits bisa lebih valuable dalam jangka panjang.

Contoh: training budget untuk upgrade skill bisa worth lebih dari Rp 1 juta per bulan cash.`,
    author: {
      username: "dewi_worker",
      full_name: "Dewi Lestari",
      avatar_url: null,
    },
    likes_count: 34,
    created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    replies: [],
  },
  {
    id: "3",
    content: `Boleh tahu untuk riset standar gaji, platform apa yang bisa digunakan untuk daily worker di Indonesia? Saya masih kesulitan cari data yang accurate.`,
    author: {
      username: "andi_freelance",
      full_name: "Andi Freelance",
      avatar_url: null,
    },
    likes_count: 23,
    created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    replies: [
      {
        id: "3-1",
        content: `Coba cek DailyWorkerHub salary database - mereka punya data salary ranges untuk berbagai posisi di Jakarta dan sekitarnya. Pretty comprehensive dan updated regularly.`,
        author: {
          username: "sarah_wijaya",
          full_name: "Sarah Wijaya",
          avatar_url: null,
        },
        likes_count: 15,
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
    ],
  },
];

export default function ArticleDetailPage() {
  const [replyContent, setReplyContent] = useState("");
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const article = mockArticle;
  const comments = mockComments;
  const totalComments = comments.reduce((acc, c) => acc + 1 + (c.replies?.length || 0), 0);

  const handleSubmitComment = () => {
    if (!replyContent.trim()) return;
    // In real app, this would submit to API
    setReplyContent("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/community" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
              <span className="text-slate-950 font-bold text-sm">DW</span>
            </div>
            <span className="font-semibold text-slate-50 hidden sm:block">DailyWorkerHub</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link href="/community/login" className="text-sm text-slate-400 hover:text-slate-50">
              Masuk
            </Link>
            <Link
              href="/community/register"
              className="px-4 py-2 text-sm font-medium rounded-full bg-emerald-500 text-slate-950 hover:bg-emerald-400"
            >
              Daftar
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 pb-16">
        {/* Cover Image */}
        {article.cover_image && (
          <div className="relative h-[300px] sm:h-[400px] overflow-hidden">
            <img
              src={article.cover_image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
          </div>
        )}

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
          {/* Back Button */}
          <Link
            href="/community/articles"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Kembali ke Artikel
          </Link>

          {/* Article Header Card */}
          <article className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden mb-6">
            <div className="p-6 sm:p-8">
              {/* Category Badge */}
              <span
                className="inline-block px-3 py-1 text-sm rounded-full mb-4"
                style={{ backgroundColor: `${article.category.color || "#00FF94"}20`, color: article.category.color || "#00FF94" }}
              >
                {article.category.name}
              </span>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-50 mb-2 leading-tight">
                {article.title}
              </h1>

              {/* Subtitle */}
              {article.subtitle && (
                <p className="text-lg text-slate-400 mb-6">{article.subtitle}</p>
              )}

              {/* Author Info */}
              <Link href={`/community/profile/${article.author.username}`} className="flex items-center gap-4 mb-6 group">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={article.author.avatar_url || undefined} />
                  <AvatarFallback className="bg-emerald-500/20 text-emerald-400 text-lg">
                    {article.author.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors">
                    {article.author.full_name || article.author.username}
                  </div>
                  <div className="text-sm text-slate-500">@{article.author.username}</div>
                </div>
              </Link>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 pb-6 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{format(new Date(article.published_at), "d MMMM yyyy", { locale: id })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{article.read_time} menit baca</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>{article.view_count} views</span>
                </div>
              </div>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="flex items-center gap-2 mt-6">
                  <Tag className="w-4 h-4 text-slate-500" />
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded-full bg-slate-800 text-slate-400 hover:text-emerald-400 hover:bg-slate-700 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>

          {/* Article Content */}
          <article className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden mb-6">
            <div className="p-6 sm:p-8">
              <div className="prose prose-invert prose-slate max-w-none">
                <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {article.content}
                </div>
              </div>

              {/* Vote & Actions */}
              <div className="flex items-center gap-2 mt-8 pt-6 border-t border-slate-800">
                <div className="flex items-center gap-1">
                  <Button
                    variant={liked ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setLiked(!liked);
                      if (disliked) setDisliked(false);
                    }}
                    className={`${liked ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400" : "border-slate-700 text-slate-400"}`}
                  >
                    <ArrowUp className="w-4 h-4 mr-1" />
                    {article.likes_count + (liked ? 1 : 0)}
                  </Button>
                  <Button
                    variant={disliked ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setDisliked(!disliked);
                      if (liked) setLiked(false);
                    }}
                    className={`${disliked ? "bg-red-500 text-slate-950 hover:bg-red-400 border-red-500" : "border-slate-700 text-slate-400"}`}
                  >
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                </div>

                <Button
                  variant={bookmarked ? "default" : "outline"}
                  size="sm"
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`${bookmarked ? "bg-amber-500 text-slate-950 hover:bg-amber-400 border-amber-500" : "border-slate-700 text-slate-400"}`}
                >
                  <Bookmark className={`w-4 h-4 mr-2 ${bookmarked ? "fill-current" : ""}`} />
                  Simpan
                </Button>

                <Button variant="outline" size="sm" className="border-slate-700 text-slate-400">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>

                <Button variant="outline" size="sm" className="border-slate-700 text-slate-400">
                  <Flag className="w-4 h-4 mr-2" />
                  Report
                </Button>
              </div>
            </div>
          </article>

          {/* Author Bio Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
            <Link href={`/community/profile/${article.author.username}`} className="flex items-start gap-4 group">
              <Avatar className="w-16 h-16">
                <AvatarImage src={article.author.avatar_url || undefined} />
                <AvatarFallback className="bg-emerald-500/20 text-emerald-400 text-xl">
                  {article.author.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors">
                    {article.author.full_name || article.author.username}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-sm text-slate-500">@{article.author.username}</span>
                </div>
                {article.author.bio && (
                  <p className="text-sm text-slate-400">{article.author.bio}</p>
                )}
                <Button variant="link" className="text-emerald-400 p-0 h-auto mt-2 text-sm">
                  Lihat profil lengkap
                </Button>
              </div>
            </Link>
          </div>

          {/* Comments Section */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-slate-50 mb-6 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-emerald-400" />
              {totalComments} Komentar
            </h2>

            {/* Comment Form */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6">
              <Textarea
                placeholder="Tulis komentar Anda..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="bg-slate-800 border-slate-700 text-slate-50 placeholder:text-slate-500 mb-3 min-h-[100px] resize-none"
              />
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  {replyContent.length}/2000 karakter
                </span>
                <Button
                  onClick={handleSubmitComment}
                  disabled={!replyContent.trim()}
                  className="bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Kirim Komentar
                </Button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="space-y-4">
                  {/* Main Comment */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-emerald-500/20 text-emerald-400 text-sm">
                          {comment.author.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-slate-200 text-sm">
                            {comment.author.full_name || comment.author.username}
                          </span>
                          <span className="text-xs text-slate-500">
                            @{comment.author.username}
                          </span>
                          <span className="text-xs text-slate-600">•</span>
                          <span className="text-xs text-slate-500">
                            {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true, locale: id })}
                          </span>
                        </div>

                        <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                          {comment.content}
                        </div>

                        <div className="flex items-center gap-4 mt-3">
                          <button className="flex items-center gap-1 text-xs text-slate-500 hover:text-emerald-400 transition-colors">
                            <ArrowUp className="w-3 h-3" />
                            {comment.likes_count}
                          </button>
                          <button className="text-xs text-slate-500 hover:text-emerald-400 transition-colors">
                            Balas
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="ml-8 space-y-3">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                          <div className="flex items-start gap-3">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="bg-slate-700 text-slate-300 text-xs">
                                {reply.author.username.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-medium text-slate-300 text-sm">
                                  {reply.author.full_name || reply.author.username}
                                </span>
                                <span className="text-xs text-slate-500">
                                  @{reply.author.username}
                                </span>
                                <span className="text-xs text-slate-600">•</span>
                                <span className="text-xs text-slate-500">
                                  {formatDistanceToNow(new Date(reply.created_at), { addSuffix: true, locale: id })}
                                </span>
                              </div>

                              <div className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap">
                                {reply.content}
                              </div>

                              <div className="flex items-center gap-4 mt-2">
                                <button className="flex items-center gap-1 text-xs text-slate-500 hover:text-emerald-400 transition-colors">
                                  <ArrowUp className="w-3 h-3" />
                                  {reply.likes_count}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
