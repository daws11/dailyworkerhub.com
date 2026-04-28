"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface CommunityNavbarProps {
  active?: "discussions" | "articles" | "docs" | "feedback";
  badgeLabel?: string;
}

const navItems = [
  { label: "Diskusi", href: "/community/discussions", key: "discussions", match: "/community/discussions" },
  { label: "Artikel", href: "/community/articles", key: "articles", match: "/community/articles" },
  { label: "Docs", href: "/docs", key: "docs", match: "/docs" },
  { label: "Feedback", href: "/community/feedback", key: "feedback", match: "/community/feedback" },
] as const;

export function CommunityNavbar({ active, badgeLabel = "Community" }: CommunityNavbarProps) {
  const pathname = usePathname() ?? "";

  const resolveActive = (key: string, match: string) => {
    if (active) return active === key;
    return pathname === match || pathname.startsWith(`${match}/`);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-new.png"
            alt="Daily Worker Hub"
            width={32}
            height={32}
            className="h-8 w-auto object-contain"
          />
          <span className="font-semibold text-foreground hidden sm:block">DailyWorkerHub</span>
          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20">
            {badgeLabel}
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = resolveActive(item.key, item.match);
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                  isActive
                    ? "text-foreground bg-muted/50"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50 transition-colors"
          >
            Masuk
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 text-sm font-medium rounded-full bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors"
          >
            Daftar
          </Link>
        </div>
      </div>
    </nav>
  );
}
