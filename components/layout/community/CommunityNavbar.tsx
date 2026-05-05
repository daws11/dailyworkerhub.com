"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, User, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { createClient } from "@/lib/supabase/client";
import { useTranslations } from "next-intl";

interface CommunityNavbarProps {
  active?: "discussions" | "articles" | "docs" | "feedback";
  badgeLabel?: string;
}

const APP_URL = "https://app.dailyworkerhub.com";

export function CommunityNavbar({ active, badgeLabel = "Community" }: CommunityNavbarProps) {
  const pathname = usePathname() ?? "";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("nav");

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const resolveActive = (key: string, match: string) => {
    if (active) return active === key;
    return pathname === match || pathname.startsWith(`${match}/`);
  };

  const handleLogout = () => {
    const supabase = createClient();
    supabase.auth.signOut().then(() => {
      window.location.href = APP_URL + "/login";
    });
  };

  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
  const avatarUrl = user?.user_metadata?.avatar_url || null;

  const navItems = [
    { label: t("discussions"), href: "/community/discussions", key: "discussions", match: "/community/discussions" },
    { label: t("articles"), href: "/community/articles", key: "articles", match: "/community/articles" },
    { label: t("docs"), href: "/docs", key: "docs", match: "/docs" },
    { label: t("feedback"), href: "/community/feedback", key: "feedback", match: "/community/feedback" },
  ] as const;

  const AuthButtons = () => (
    <>
      <Link
        href={`${APP_URL}/login`}
        className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50 transition-colors"
      >
        {t("login")}
      </Link>
      <Link
        href={`${APP_URL}/register`}
        className="px-4 py-2 text-sm font-medium rounded-full bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors"
      >
        {t("register")}
      </Link>
    </>
  );

  const UserInfo = () => (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={displayName}
            width={28}
            height={28}
            className="w-7 h-7 rounded-full object-cover border border-border"
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <User className="w-4 h-4 text-emerald-500" />
          </div>
        )}
        <span className="text-sm font-medium text-foreground hidden lg:block">
          {displayName}
        </span>
      </div>
      <button
        onClick={handleLogout}
        className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50 transition-colors"
        title={t("logout")}
      >
        <LogOut className="w-4 h-4" />
      </button>
    </div>
  );

  const MobileAuthSection = () => (
    <div className="px-4 py-4 border-t border-border space-y-2">
      {user ? (
        <>
          <div className="flex items-center gap-3 px-3 py-2">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={displayName}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover border border-border"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <User className="w-4 h-4 text-emerald-500" />
              </div>
            )}
            <div>
              <p className="text-sm font-medium">{displayName}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => {
              setMobileOpen(false);
              handleLogout();
            }}
            className="w-full flex items-center justify-center px-4 py-2.5 border border-border rounded-full font-sub text-sm hover:bg-muted transition-colors"
          >
            {t("logout")}
          </button>
        </>
      ) : (
        <>
          <Link
            href={`${APP_URL}/login`}
            onClick={() => setMobileOpen(false)}
            className="w-full flex items-center justify-center px-4 py-2.5 border border-border rounded-full font-sub text-sm hover:bg-muted transition-colors"
          >
            {t("login")}
          </Link>
          <Link
            href={`${APP_URL}/register`}
            onClick={() => setMobileOpen(false)}
            className="w-full flex items-center justify-center px-4 py-2.5 bg-emerald-500 text-slate-950 rounded-full font-sub text-sm font-medium hover:bg-emerald-400 transition-colors"
          >
            {t("register")}
          </Link>
        </>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 h-16 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between w-full">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo-new.png"
              alt="Daily Worker Hub"
              width={32}
              height={32}
              className="h-8 w-auto object-contain"
            />
            <span className="font-semibold text-foreground">Daily Worker Hub</span>
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
            {!loading && (user ? <UserInfo /> : <AuthButtons />)}
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="flex md:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between w-full">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo-new.png"
              alt="Daily Worker Hub"
              width={28}
              height={28}
              className="h-7 w-auto object-contain"
            />
            <span className="font-semibold text-foreground text-sm">Daily Worker Hub</span>
            <span className="px-1.5 py-0.5 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20">
              {badgeLabel}
            </span>
          </Link>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] p-0">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/logo-new.png"
                      alt="Daily Worker Hub"
                      width={28}
                      height={28}
                      className="h-7 w-auto object-contain"
                    />
                    <span className="font-semibold text-foreground">{t("menu")}</span>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto py-2">
                  <div className="px-3 space-y-0.5">
                    {navItems.map((item) => {
                      const isActive = resolveActive(item.key, item.match);
                      return (
                        <Link
                          key={item.key}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={`block px-3 py-2.5 text-sm rounded-lg transition-colors ${
                            isActive
                              ? "text-foreground bg-muted/50 font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          }`}
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Auth Buttons */}
                {!loading && <MobileAuthSection />}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </>
  );
}
