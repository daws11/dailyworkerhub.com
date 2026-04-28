import type { Metadata } from "next";
import { CommunityNavbar } from "@/components/layout/community/CommunityNavbar";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: {
    default: "DailyWorkerHub Community",
    template: "%s | DailyWorkerHub Community",
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
