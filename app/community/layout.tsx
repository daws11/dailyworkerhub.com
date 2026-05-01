import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "Daily Worker Hub Community",
    template: "%s | Daily Worker Hub Community",
  },
  description: "Komunitas Pekerja Harian Indonesia - Diskusi, pelajari, dan berkembang bersama ribuan daily worker di seluruh Indonesia.",
  keywords: ["daily worker", "pekerja harian", "komunitas", "indonesia", "forum", "discussion"],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Daily Worker Hub Community",
  },
}

export default function CommunityLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>
}