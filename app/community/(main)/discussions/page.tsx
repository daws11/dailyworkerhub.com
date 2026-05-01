import type { Metadata } from "next";
import { DiscussionsPageClient } from "./discussions-client";

export const metadata: Metadata = {
  title: "Forum Diskusi - Daily Worker Hub Community",
  description: "Diskusikan pertanyaan, berbagi pengalaman, dan belajar dari komunitas pekerja harian Indonesia.",
  openGraph: {
    title: "Forum Diskusi - Daily Worker Hub Community",
    description: "Diskusikan pertanyaan, berbagi pengalaman, dan belajar dari komunitas pekerja harian Indonesia.",
    url: "https://dailyworkerhub.com/community/discussions",
    type: "website",
    images: [
      {
        url: "/opengraph.jpg",
        width: 1200,
        height: 630,
        alt: "Daily Worker Hub Discussions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph.jpg"],
  },
  alternates: {
    canonical: "https://dailyworkerhub.com/community/discussions",
  },
};

export default function DiscussionsPage() {
  return <DiscussionsPageClient />;
}
