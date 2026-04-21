"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import {
  ArrowUp,
  ArrowDown,
  Share2,
  Bookmark,
  Flag,
  Edit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CommentSection } from "@/components/discussion/CommentSection";

interface Comment {
  id: string;
  content: string;
  author: {
    username: string;
    full_name: string | null;
    avatar_url: string | null;
  };
  parent_id: string | null;
  is_solution: boolean;
  likes_count: number;
  created_at: string;
  replies?: Comment[];
}

const mockDiscussion = {
  id: "1",
  slug: "berapa-seharusnya-gaji-minimum-untuk-driver-online",
  title: "Berapa seharusnya gaji minimum untuk driver online di Jakarta?",
  content: `Berdasarkan pengalaman saya selama 3 tahun bekerja sebagai driver ojek online di Jakarta, saya ingin berbagi beberapa insight tentang standar gaji di industri ini.

**Draft UU Perlindungan Pekerja Platforms**

Dengan masuknya regulasi baru, ada beberapa perubahan penting yang perlu kita ketahui:

1. **Upah Minimum Province (UMP) untuk Driver**
   Apakah driver ojek online berhak mendapat UMP? Menurut draft regulasi, worker platforms dianggap sebagai pemberi kerja, sehingga seharusnya mengikuti standar UMP.

2. **Asuransi dan Benefit**
   Selama ini banyak driver yang tidak mendapat basic insurance. Dengan regulasi baru, diharapkan semua platform wajib menyediakan minimal asuransi kesehatan dasar.

3. **Jam Kerja Maksimum**
   Ada rencana untuk membatasi jam kerja maksimal 12 jam per hari untuk safety driver.

**Pertanyaan untuk komunitas:**

- Apakah menurut Anda driver online seharusnya mendapat standar gaji minimum?
- Berapa menurut Anda nominal yang fair untuk daerah Jakarta?
- Bagaimana pengalaman Anda negotiate dengan platform?

Mohon share pengalaman dan pendapat Anda ya!`,
  author: {
    username: "budi_santoso",
    full_name: "Budi Santoso",
    avatar_url: null,
  },
  category: {
    name: "Gaji & Negosiasi",
    slug: "gaji-negosiasi",
    color: "#10B981",
  },
  status: "open",
  likes_count: 234,
  comments_count: 89,
  view_count: 1205,
  is_pinned: true,
  created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
};

const mockComments: Comment[] = [
  {
    id: "1",
    content: `Menurut saya nominal yang fair untuk driver ojek online di Jakarta adalah minimal Rp 150.000 per hari dengan asumsi 10-12 jam kerja. Itu sudah termasuk bonus jika target terpenuhi.

Untuk driver mobil mungkin perlu lebih tinggi karena ada biaya bensin dan maintenance yang lebih besar.`,
    author: {
      username: "joko_wibowo",
      full_name: "Joko Wibowo",
      avatar_url: null,
    },
    parent_id: null,
    is_solution: false,
    likes_count: 45,
    created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    replies: [
      {
        id: "1-1",
        content: `Setuju dengan angka Rp 150.000. Tapi perlu dipertimbangkan juga biaya operasional seperti bensin yang harganya fluktuatif. Mungkin perlu ada mekanisme penyesuaian otomatis setiap bulan?`,
        author: {
          username: "siti_rahmah",
          full_name: "Siti Rahmah",
          avatar_url: null,
        },
        parent_id: "1",
        is_solution: false,
        likes_count: 12,
        created_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
      },
    ],
  },
  {
    id: "2",
    content: `Dari perspektif employer yang sering pakai jasa driver, menurut saya worker platforms seharusnya memberikan transparency dalam perhitungan fee.

Beberapa hal yang perlu dibenahi:
- Clear breakdown soal bagaimana take-home pay dihitung
- Visibility ke biaya platform
- Option untuk worker memilih自己的 jam kerja

Quality hidup driver meningkat -> service quality meningkat -> semua menang.`,
    author: {
      username: "rudi_hartono",
      full_name: "Rudi Hartono",
      avatar_url: null,
    },
    parent_id: null,
    is_solution: true,
    likes_count: 89,
    created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    replies: [],
  },
  {
    id: "3",
    content: `Pengalaman pribadi: dulu pernah dapat fee hanya Rp 80.000 untuk 8 jam kerja. Itu jelas tidak worth it considering biaya bensin dan overhead lainnya.

Setelah saya mulai negotiate dan punya beberapa platform options, alhamdulillah bisa dapat deal yang lebih fair.intonya adalah: **diversifikasi platform** jangan tergantung satu platform saja.`,
    author: {
      username: "dewi_lestari",
      full_name: "Dewi Lestari",
      avatar_url: null,
    },
    parent_id: null,
    is_solution: false,
    likes_count: 34,
    created_at: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    replies: [],
  },
];

export default function DiscussionDetailPage() {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const discussion = mockDiscussion;
  const comments = mockComments;

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
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
            <Link href="/community/discussions" className="hover:text-slate-300">
              Diskusi
            </Link>
            <span>/</span>
            <span
              className="px-2 py-0.5 rounded-full text-xs"
              style={{ backgroundColor: `${discussion.category.color || "#10B981"}20`, color: discussion.category.color || "#10B981" }}
            >
              {discussion.category.name}
            </span>
          </div>

          {/* Main Discussion Card */}
          <article className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden mb-6">
            {/* Header */}
            <div className="p-6 pb-0">
              <div className="flex items-center gap-2 mb-4">
                {discussion.is_pinned && (
                  <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Pinned
                  </span>
                )}
                <span
                  className="px-2 py-0.5 text-xs rounded-full"
                  style={{ backgroundColor: `${discussion.category.color || "#10B981"}20`, color: discussion.category.color || "#10B981" }}
                >
                  {discussion.category.name}
                </span>
                {discussion.status === "solved" && (
                  <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                    Solved
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-slate-50 mb-4">
                {discussion.title}
              </h1>

              {/* Author Meta */}
              <div className="flex items-center gap-3 mb-6">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={discussion.author.avatar_url || undefined} />
                  <AvatarFallback className="bg-emerald-500/20 text-emerald-400">
                    {discussion.author.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-slate-200">{discussion.author.username}</div>
                  <div className="text-sm text-slate-500">
                    {formatDistanceToNow(new Date(discussion.created_at), { addSuffix: true, locale: id })}
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 pb-6">
              <div className="prose prose-invert prose-slate max-w-none">
                <div className="text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {discussion.content}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 mt-8 pt-6 border-t border-slate-800">
                <div className="flex items-center gap-1">
                  <Button
                    variant={liked ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setLiked(!liked);
                      if (disliked) setDisliked(false);
                    }}
                    className={`${liked ? "bg-emerald-500 text-slate-950" : "border-slate-700 text-slate-400"}`}
                  >
                    <ArrowUp className="w-4 h-4 mr-1" />
                    {discussion.likes_count + (liked ? 1 : 0)}
                  </Button>
                  <Button
                    variant={disliked ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setDisliked(!disliked);
                      if (liked) setLiked(false);
                    }}
                    className="border-slate-700 text-slate-400"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                </div>

                <Button variant="outline" size="sm" className="border-slate-700 text-slate-400">
                  <Bookmark className="w-4 h-4 mr-2" />
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

                <Link href={`/community/discussions/${discussion.slug}/edit`}>
                  <Button variant="outline" size="sm" className="border-slate-700 text-slate-400">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </Link>
              </div>
            </div>
          </article>

          {/* Comments Section */}
          <CommentSection
            discussionId={discussion.id}
            comments={comments}
          />
        </div>
      </main>
    </div>
  );
}
