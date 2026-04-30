"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, ArrowRight, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { createClient } from "@/lib/supabase/client";

const APP_URL = "https://app.dailyworkerhub.com";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Cara Kerja", href: "/#how-it-works" },
  { label: "Biaya", href: "/#pricing" },
  { label: "Komunitas", href: "/community" },
];

export function MainNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  const handleLogout = () => {
    const supabase = createClient();
    supabase.auth.signOut().then(() => {
      window.location.href = APP_URL + "/login";
    });
  };

  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";

  const DesktopAuthButtons = () => (
    <>
      {!loading && user ? (
        <>
          <a
            href={`${APP_URL}/worker/jobs`}
            className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
          >
            <User className="w-4 h-4" />
            <span>{displayName}</span>
          </a>
          <Button variant="ghost" onClick={handleLogout} className="text-muted-foreground hover:text-foreground rounded-full px-3">
            <LogOut className="w-4 h-4" />
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="outline"
            asChild
            className="border-border text-foreground hover:bg-foreground hover:text-white rounded-full px-6 font-sub tracking-wide transition-all duration-300"
          >
            <a href={`${APP_URL}/login`}>Masuk</a>
          </Button>
          <Button
            asChild
            className="bg-secondary hover:bg-secondary/90 text-white rounded-full px-6 font-sub tracking-wide shadow-lg shadow-secondary/25 group"
          >
            <a href={`${APP_URL}/register?role=business`}>
              Pasang Lowongan
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </>
      )}
    </>
  );

  const MobileAuthSection = () => (
    <div className="px-6 py-6 border-t border-border space-y-3">
      {!loading && user ? (
        <>
          <div className="flex items-center gap-3 px-2 py-2 mb-2">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <User className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <p className="font-medium text-sm">{displayName}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => {
              setMobileOpen(false);
              handleLogout();
            }}
            className="w-full flex items-center justify-center px-6 py-3 border border-border rounded-full font-sub text-base hover:bg-muted transition-colors"
          >
            Keluar
          </button>
        </>
      ) : (
        <>
          <a
            href={`${APP_URL}/login`}
            onClick={() => setMobileOpen(false)}
            className="w-full flex items-center justify-center px-6 py-3 border border-border rounded-full font-sub text-base hover:bg-muted transition-colors"
          >
            Masuk
          </a>
          <a
            href={`${APP_URL}/register?role=business`}
            onClick={() => setMobileOpen(false)}
            className="w-full flex items-center justify-center px-6 py-3 bg-secondary text-white rounded-full font-sub text-base shadow-lg shadow-secondary/25"
          >
            Pasang Lowongan
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
          <a
            href={`${APP_URL}/register?role=worker`}
            onClick={() => setMobileOpen(false)}
            className="w-full flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-full font-sub text-base hover:bg-primary/5 transition-colors"
          >
            Bergabung sebagai Worker
          </a>
        </>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="hidden md:flex fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 backdrop-blur-md bg-background/70 text-foreground border-b border-border/50"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <img src="/logo-new.png" alt="Daily Worker Hub" className="h-8 w-auto object-contain" />
            <span className="font-display font-bold text-xl tracking-tight">
              Daily Worker Hub
            </span>
          </div>

          <div className="flex items-center gap-8 font-sub text-sm uppercase tracking-wider">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-primary dark:hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <DesktopAuthButtons />
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex md:hidden fixed top-0 left-0 right-0 z-50 px-4 py-4 backdrop-blur-md bg-background/70 text-foreground border-b border-border/50"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
          <a href="/" className="flex items-center gap-2">
            <img src="/logo-new.png" alt="Daily Worker Hub" className="h-8 w-auto object-contain" />
            <span className="font-display font-bold text-lg tracking-tight">
              Daily Worker Hub
            </span>
          </a>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                    <div className="flex items-center gap-2">
                      <img
                        src="/logo-new.png"
                        alt="Daily Worker Hub"
                        className="h-8 w-auto object-contain"
                      />
                      <span className="font-display font-bold text-lg">Menu</span>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div className="flex-1 overflow-y-auto py-4">
                    <div className="px-4 space-y-1">
                      {navLinks.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-4 py-3 text-lg font-sub rounded-lg hover:bg-muted transition-colors"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Auth Buttons */}
                  <MobileAuthSection />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
