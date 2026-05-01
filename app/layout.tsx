import type { Metadata } from "next";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/react";
import { Footer } from "@/components/footer";
import Script from "next/script";
import "./globals.css";
import { getOrganizationSchema, getWebSiteSchema } from "@/lib/seo";

const themeInitScript = `
(function() {
  try {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = stored || (prefersDark ? 'dark' : 'light');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {
    // Ignore errors in SSR
  }
})();
`;

export const metadata: Metadata = {
  metadataBase: new URL("https://dailyworkerhub.com"),
  title: {
    default: "Daily Worker Hub",
    template: "%s — Daily Worker Hub",
  },
  description: "Platform yang menghubungkan pekerja harian lepas dengan pelaku usaha di Indonesia. Temukan pekerjaan harian atau cari pekerja terpercaya dengan mudah.",
  keywords: ["pekerja harian", "lowongan kerja", "bisnis", "recruitment", "Indonesia", "daily worker", "hire worker"],
  icons: {
    icon: [
      { url: "/logo-new.png", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    apple: "/logo-new.png",
  },
  openGraph: {
    title: "Daily Worker Hub",
    description: "Platform yang menghubungkan pekerja harian lepas dengan pelaku usaha di Indonesia. Temukan pekerjaan harian atau cari pekerja terpercaya dengan mudah.",
    type: "website",
    locale: "id_ID",
    siteName: "Daily Worker Hub",
    images: [
      {
        url: "/opengraph.jpg?v=2",
        width: 1200,
        height: 630,
        alt: "Daily Worker Hub - Platform Komunitas Pekerja Harian Indonesia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily Worker Hub",
    description: "Platform yang menghubungkan pekerja harian lepas dengan pelaku usaha di Indonesia. Temukan pekerjaan harian atau cari pekerja terpercaya dengan mudah.",
    images: ["/opengraph.jpg?v=2"],
    site: "@dailyworkerhub",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([getOrganizationSchema(), getWebSiteSchema()]),
          }}
        />
      </head>
      <body>
        <Providers>
          <TooltipProvider>
            {children}
            <Footer />
            <Toaster />
            <Analytics />
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}
