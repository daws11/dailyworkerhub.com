import type { Metadata } from "next";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daily Worker Hub",
  description: "Platform harian gratis untuk pekerja dan bisnis di Indonesia. Akses pekerja harian tanpa perantara, transparan, dan terpercaya.",
  keywords: ["pekerja harian", "lowongan kerja", "bisnis", "recruitment", "Indonesia"],
  openGraph: {
    title: "Daily Worker Hub",
    description: "Platform harian gratis untuk pekerja dan bisnis di Indonesia",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: "/opengraph.jpg",
        width: 1200,
        height: 630,
        alt: "Daily Worker Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily Worker Hub",
    description: "Platform harian gratis untuk pekerja dan bisnis di Indonesia",
    images: ["/opengraph.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>
        <Providers>
          <TooltipProvider>
            {children}
            <Toaster />
            <Analytics />
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}
