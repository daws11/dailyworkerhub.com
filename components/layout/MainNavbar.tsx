"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Cara Kerja", href: "/#how-it-works" },
  { label: "Biaya", href: "/#pricing" },
  { label: "Komunitas", href: "/community" },
];

export function MainNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

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
            <Button
              variant="outline"
              asChild
              className="border-border text-foreground hover:bg-foreground hover:text-white rounded-full px-6 font-sub tracking-wide transition-all duration-300"
            >
              <a href="https://app.dailyworkerhub.com/login">Masuk</a>
            </Button>
            <Button
              asChild
              className="bg-secondary hover:bg-secondary/90 text-white rounded-full px-6 font-sub tracking-wide shadow-lg shadow-secondary/25 group"
            >
              <a href="https://app.dailyworkerhub.com/register?role=business">
                Pasang Lowongan
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
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
                  <div className="px-6 py-6 border-t border-border space-y-3">
                    <a
                      href="https://app.dailyworkerhub.com/login"
                      onClick={() => setMobileOpen(false)}
                      className="w-full flex items-center justify-center px-6 py-3 border border-border rounded-full font-sub text-base hover:bg-muted transition-colors"
                    >
                      Masuk
                    </a>
                    <a
                      href="https://app.dailyworkerhub.com/register?role=business"
                      onClick={() => setMobileOpen(false)}
                      className="w-full flex items-center justify-center px-6 py-3 bg-secondary text-white rounded-full font-sub text-base shadow-lg shadow-secondary/25"
                    >
                      Pasang Lowongan
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                    <a
                      href="https://app.dailyworkerhub.com/register?role=worker"
                      onClick={() => setMobileOpen(false)}
                      className="w-full flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-full font-sub text-base hover:bg-primary/5 transition-colors"
                    >
                      Bergabung sebagai Worker
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.nav>
    </>
  );
}