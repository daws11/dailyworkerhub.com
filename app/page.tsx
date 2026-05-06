import type { Metadata } from "next";
import HomePage from "@/components/Home";
import { getFAQPageSchema } from "@/lib/seo";
import { getLocale } from "next-intl/server";

const homepageFaqs = [
  {
    question: {
      id: "Apakah Daily Worker Hub legal dan aman?",
      en: "Is Daily Worker Hub legal and safe?",
    },
    answer: {
      id: "Ya. Semua transaksi berjalan di atas payment Dana Jaminan yang dijamin hingga shift selesai, dan pekerja maupun bisnis harus melalui proses verifikasi identitas sebelum bertransaksi. Kami mematuhi regulasi ketenagakerjaan Indonesia.",
      en: "Yes. All transactions use our escrow system, and both workers and businesses must complete identity verification before transacting. We comply with Indonesian labor regulations.",
    },
  },
  {
    question: {
      id: "Bagaimana cara pembayaran bekerja?",
      en: "How does payment work?",
    },
    answer: {
      id: "Bisnis melakukan top-up saldo tanpa biaya tambahan. Saat shift dimulai, dana ditahan sebagai Dana Jaminan. Setelah pekerja check-out melalui aplikasi di lokasi, dana otomatis cair ke wallet pekerja — tanpa perantara.",
      en: "Businesses top up their balance at no extra cost. When a shift starts, funds are held in escrow. After the worker checks out via the app at the location, funds are automatically released to the worker's wallet — no middlemen.",
    },
  },
  {
    question: {
      id: "Apa itu Dana Perlindungan?",
      en: "What is the Protection Fund?",
    },
    answer: {
      id: "Dana Perlindungan adalah dana komunitas dari potongan 1% setiap transaksi yang digunakan untuk bantuan darurat anggota, seperti kecelakaan kerja, keterlambatan pembayaran dari bisnis, atau perselisihan. Dikelola transparan oleh komunitas.",
      en: "The Protection Fund is a community fund from 1% of each transaction, used for emergency assistance including workplace accidents, payment delays, or disputes. Transparently managed by the community.",
    },
  },
  {
    question: {
      id: "Berapa biaya platform untuk bisnis dan pekerja?",
      en: "What are the platform fees for businesses and workers?",
    },
    answer: {
      id: "Pekerja: 0% komisi potongan upah. Bisnis: Biaya Platform 3,5% + Biaya Layanan Dana Jaminan + Kontribusi Dana Perlindungan 1%. Tidak ada biaya langganan, tidak ada biaya top-up, dan tidak ada biaya tersembunyi.",
      en: "Workers: 0% wage commission. Businesses: 3.5% platform fee + escrow service fee + 1% Protection Fund contribution. No subscription fees, no top-up fees, and no hidden costs.",
    },
  },
  {
    question: {
      id: "Bagaimana proses verifikasi pekerja?",
      en: "How does worker verification work?",
    },
    answer: {
      id: "Pekerja wajib mengunggah KTP, foto wajah untuk liveness check, dan data rekening bank. Kami juga menampilkan review publik dua arah — histori shift dan reputasi pekerja bisa dilihat bisnis sebelum menerima lamaran.",
      en: "Workers must upload their ID card, a face photo for liveness check, and bank account details. We also display two-way public reviews — shift history and worker reputation can be seen by businesses before accepting applications.",
    },
  },
  {
    question: {
      id: "Bagaimana jika terjadi perselisihan antara pekerja dan bisnis?",
      en: "What happens if there's a dispute between a worker and a business?",
    },
    answer: {
      id: "Tim moderasi Daily Worker Hub akan meninjau bukti dari kedua belah pihak (check-in QR, chat, foto lokasi). Selama proses berjalan, dana tetap aman di Dana Jaminan. Dalam kasus tertentu, Dana Perlindungan dapat digunakan untuk membantu pihak yang dirugikan.",
      en: "The Daily Worker Hub moderation team reviews evidence from both parties (QR check-in, chat, location photos). During the process, funds remain secure in escrow. In certain cases, the Protection Fund can be used to assist the affected party.",
    },
  },
];

const title = {
  en: "Daily Worker Hub — Find Daily Jobs, No Middlemen",
  id: "Daily Worker Hub — Platform Pekerja Harian, Tanpa Calo",
};

const description = {
  en: "A marketplace platform connecting daily freelance workers with businesses in Indonesia. Find trusted daily workers or post daily job listings — free for workers, no hidden fees.",
  id: "Platform marketplace yang menghubungkan pekerja harian lepas dengan pelaku usaha di Indonesia. Cari pekerja harian terpercaya atau pasang lowongan kerja harian — gratis untuk pekerja, tanpa biaya tersembunyi.",
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return {
    title: title[locale as keyof typeof title] || title.en,
    description: description[locale as keyof typeof description] || description.en,
    openGraph: {
      title: title[locale as keyof typeof title] || title.en,
      description: description[locale as keyof typeof description] || description.en,
      url: `https://dailyworkerhub.com${locale === 'en' ? '' : '/id'}`,
      siteName: "Daily Worker Hub",
      locale: locale === 'id' ? 'id_ID' : 'en_US',
      type: "website",
      images: [
        {
          url: "https://dailyworkerhub.com/opengraph.jpg?v=2",
          width: 1200,
          height: 630,
          alt: "Daily Worker Hub — Indonesia's Daily Worker Community Platform",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title[locale as keyof typeof title] || title.en,
      description: description[locale as keyof typeof description] || description.en,
      images: ["https://dailyworkerhub.com/opengraph.jpg?v=2"],
    },
    alternates: {
      canonical: `https://dailyworkerhub.com${locale === 'en' ? '' : '/id'}`,
      languages: {
        en: "https://dailyworkerhub.com",
        id: "https://dailyworkerhub.com/id",
      },
    },
    other: {
      "script:ld+json": JSON.stringify(getFAQPageSchema(homepageFaqs, locale as 'en' | 'id')),
    },
  };
}

export default function Page() {
  return <HomePage />;
}
