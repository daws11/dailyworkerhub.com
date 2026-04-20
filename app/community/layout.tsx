import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: {
    default: "DailyWorkerHub Community",
    template: "%s | DailyWorkerHub Community",
  },
  description: "Komunitas Pekerja Harian Indonesia - Diskusi, pelajari, dan berkembang bersama ribuan daily worker di seluruh Indonesia.",
  keywords: ["daily worker", "pekerja harian", "komunitas", "indonesia", "forum", "discussion"],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "DailyWorkerHub Community",
  },
};

export default function CommunityLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-slate-950 text-slate-50`}>
        {children}
      </body>
    </html>
  );
}
