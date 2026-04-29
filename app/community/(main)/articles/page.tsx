import type { Metadata } from "next";
import { ArticlesPageClient } from "./articles-client";

export const metadata: Metadata = {
  title: "Artikel & Knowledge Base - DailyWorkerHub Community",
  description: "Pelajari tips, panduan, dan kisah inspiratif dari komunitas pekerja harian Indonesia. Artikel seputar karier, gaji, remote work, dan pengembangan skill.",
  openGraph: {
    title: "Artikel & Knowledge Base - DailyWorkerHub Community",
    description: "Pelajari tips, panduan, dan kisah inspiratif dari komunitas pekerja harian Indonesia.",
    url: "https://dailyworkerhub.com/community/articles",
    type: "website",
    images: [
      {
        url: "/opengraph.jpg",
        width: 1200,
        height: 630,
        alt: "DailyWorkerHub Articles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph.jpg"],
  },
  alternates: {
    canonical: "https://dailyworkerhub.com/community/articles",
  },
};

export default function ArticlesPage() {
  return <ArticlesPageClient />;
}
