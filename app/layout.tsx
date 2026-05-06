import type { Metadata } from "next";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/react";
import { Footer } from "@/components/footer";
import Script from "next/script";
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
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
  description: "A marketplace platform connecting daily freelance workers with businesses in Indonesia. Find daily jobs or hire trusted workers with ease.",
  keywords: ["daily worker", "hire worker", "freelance", "Indonesia", "daily jobs", "recruitment"],
  icons: {
    icon: [
      { url: "/logo-new.png", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    apple: "/logo-new.png",
  },
  openGraph: {
    title: "Daily Worker Hub",
    description: "A marketplace platform connecting daily freelance workers with businesses in Indonesia. Find daily jobs or hire trusted workers with ease.",
    type: "website",
    locale: "en_US",
    siteName: "Daily Worker Hub",
    images: [
      {
        url: "/opengraph.jpg?v=2",
        width: 1200,
        height: 630,
        alt: "Daily Worker Hub — Indonesia's Daily Worker Community Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily Worker Hub",
    description: "A marketplace platform connecting daily freelance workers with businesses in Indonesia.",
    images: ["/opengraph.jpg?v=2"],
    site: "@dailyworkerhub",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
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
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Providers>
            <TooltipProvider>
              {children}
              <Footer />
              <Toaster />
              <Analytics />
            </TooltipProvider>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
