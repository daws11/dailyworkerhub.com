import type { Metadata } from "next";
import { CommunityNavbar } from "@/components/layout/community/CommunityNavbar";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: {
    default: "DailyWorkerHub Community",
    template: "%s | DailyWorkerHub Community",
  },
  description: "Komunitas Pekerja Harian Indonesia - Diskusi, artikel, dan berbagi pengalaman dengan sesama pekerja harian dan employer di Bali.",
  openGraph: {
    title: "DailyWorkerHub Community",
    description: "Komunitas Pekerja Harian Indonesia - Diskusi, artikel, dan berbagi pengalaman.",
    locale: "id_ID",
    siteName: "DailyWorkerHub",
    type: "website",
    images: [
      {
        url: "/opengraph.jpg",
        width: 1200,
        height: 630,
        alt: "DailyWorkerHub Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph.jpg"],
  },
};

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground text-sm">Memuat...</p>
      </div>
    </div>
  );
}

export default function CommunityMainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background pt-24">
      <CommunityNavbar />
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
