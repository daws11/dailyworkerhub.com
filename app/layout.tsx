import type { Metadata } from "next";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/react";
import { Footer } from "@/components/footer";
import Script from "next/script";
import "./globals.css";

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
  title: "Daily Worker Hub - Platform Pekerja Harian Indonesia",
  description: "Hubungi langsung pekerja harian terpercaya di Indonesia. Tanpa perantara, transparan biaya, dan kualitas terjamin. Pasang lowongan gratis!",
  keywords: ["pekerja harian", "lowongan kerja", "bisnis", "recruitment", "Indonesia", "daily worker", "hire worker"],
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Daily Worker Hub - Platform Pekerja Harian Indonesia",
    description: "Hubungi langsung pekerja harian terpercaya di Indonesia. Tanpa perantara, transparan biaya, dan kualitas terjamin. Pasang lowongan gratis!",
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
    title: "Daily Worker Hub - Platform Pekerja Harian Indonesia",
    description: "Hubungi langsung pekerja harian terpercaya di Indonesia. Tanpa perantara, transparan biaya, dan kualitas terjamin. Pasang lowongan gratis!",
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
