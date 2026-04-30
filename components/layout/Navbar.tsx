"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, ArrowRight, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { createClient } from "@/lib/supabase/client";

const APP_URL = "https://app.dailyworkerhub.com";

export function Navbar() {
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

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 backdrop-blur-md bg-background/70 text-foreground border-b border-border/50"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/logo-new.png" alt="Daily Worker Hub" className="h-8 w-auto object-contain" />
          <span className="font-display font-bold text-xl tracking-tight hidden sm:block">
            Daily Worker Hub
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 font-sub text-sm uppercase tracking-wider">
          <a href="#how-it-works" className="hover:text-primary dark:hover:text-primary transition-colors">Cara Kerja</a>
          <a href="#pricing" className="hover:text-primary dark:hover:text-primary transition-colors">Biaya</a>
          <a href="/community" className="hover:text-primary dark:hover:text-primary transition-colors">Komunitas</a>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {!loading && user ? (
            <>
              <a
                href={`${APP_URL}/worker/jobs`}
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="hidden lg:inline">{displayName}</span>
              </a>
              <Button variant="ghost" onClick={handleLogout} className="hidden sm:flex text-muted-foreground hover:text-foreground rounded-full px-3">
                <LogOut className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" asChild className="hidden sm:flex border-border text-foreground hover:bg-foreground hover:text-white rounded-full px-6 font-sub tracking-wide transition-all duration-300">
                <a href={`${APP_URL}/login`}>Masuk</a>
              </Button>
              <Button asChild className="bg-secondary hover:bg-secondary/90 text-white rounded-full px-6 font-sub tracking-wide shadow-lg shadow-secondary/25 group">
                <a href={`${APP_URL}/register?role=business`}>
                  Pasang Lowongan
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </>
          )}
          <button className="md:hidden p-2">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
