import type { Metadata } from "next";
import HomePage from "@/components/Home";
import { getFAQPageSchema } from "@/lib/seo";

const homepageFaqs = [
  {
    question: "Apakah Daily Worker Hub legal dan aman?",
    answer: "Ya. Semua transaksi berjalan di atas payment Dana Jaminan yang dijamin hingga shift selesai, dan pekerja maupun bisnis harus melalui proses verifikasi identitas sebelum bertransaksi. Kami mematuhi regulasi ketenagakerjaan Indonesia.",
  },
  {
    question: "Bagaimana cara pembayaran bekerja?",
    answer: "Bisnis melakukan top-up saldo tanpa biaya tambahan. Saat shift dimulai, dana ditahan sebagai Dana Jaminan. Setelah pekerja check-out melalui aplikasi di lokasi, dana otomatis cair ke wallet pekerja — tanpa perantara.",
  },
  {
    question: "Apa itu Dana Perlindungan?",
    answer: "Dana Perlindungan adalah dana komunitas dari potongan 1% setiap transaksi yang digunakan untuk bantuan darurat anggota, seperti kecelakaan kerja, keterlambatan pembayaran dari bisnis, atau perselisihan. Dikelola transparan oleh komunitas.",
  },
  {
    question: "Berapa biaya platform untuk bisnis dan pekerja?",
    answer: "Pekerja: 0% komisi potongan upah. Bisnis: Biaya Platform 3,5% + Biaya Layanan Dana Jaminan + Kontribusi Dana Perlindungan 1%. Tidak ada biaya langganan, tidak ada biaya top-up, dan tidak ada biaya tersembunyi.",
  },
  {
    question: "Bagaimana proses verifikasi pekerja?",
    answer: "Pekerja wajib mengunggah KTP, foto wajah untuk liveness check, dan data rekening bank. Kami juga menampilkan review publik dua arah — histori shift dan reputasi pekerja bisa dilihat bisnis sebelum menerima lamaran.",
  },
  {
    question: "Bagaimana jika terjadi perselisihan antara pekerja dan bisnis?",
    answer: "Tim moderasi Daily Worker Hub akan meninjau bukti dari kedua belah pihak (check-in QR, chat, foto lokasi). Selama proses berjalan, dana tetap aman di Dana Jaminan. Dalam kasus tertentu, Dana Perlindungan dapat digunakan untuk membantu pihak yang dirugikan.",
  },
];

export const metadata: Metadata = {
  title: "Platform Pekerja Harian Indonesia — Temukan Kerja Tanpa Calo",
  description:
    "Platform marketplace yang menghubungkan pekerja harian lepas dengan pelaku usaha di Indonesia. Cari pekerja harian terpercaya atau pasang lowongan kerja harian — gratis untuk pekerja, tanpa biaya tersembunyi.",
  openGraph: {
    title: "Platform Pekerja Harian Indonesia — Temukan Kerja Tanpa Calo",
    description:
      "Platform marketplace yang menghubungkan pekerja harian lepas dengan pelaku usaha di Indonesia. Cari pekerjaan harian atau pasang lowongan dengan sistem escrow yang aman.",
    url: "https://dailyworkerhub.com",
    siteName: "Daily Worker Hub",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://dailyworkerhub.com/opengraph.jpg?v=2",
        width: 1200,
        height: 630,
        alt: "Daily Worker Hub - Platform Komunitas Pekerja Harian Indonesia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Platform Pekerja Harian Indonesia — Temukan Kerja Tanpa Calo",
    description:
      "Platform marketplace yang menghubungkan pekerja harian lepas dengan pelaku usaha di Indonesia.",
    images: ["https://dailyworkerhub.com/opengraph.jpg?v=2"],
  },
  alternates: {
    canonical: "https://dailyworkerhub.com",
  },
  other: {
    "script:ld+json": JSON.stringify(getFAQPageSchema(homepageFaqs)),
  },
};

export default function Page() {
  return <HomePage />;
}
