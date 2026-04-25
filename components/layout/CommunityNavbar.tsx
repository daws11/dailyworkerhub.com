"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, X, Menu, Send } from "lucide-react";

export type CommunityNavbarVariant = "full" | "simple" | "editor";

export interface CommunityNavbarProps {
  variant?: CommunityNavbarVariant;
  showSearch?: boolean;
  onSearchToggle?: () => void;
  onSearch?: (query: string) => void;
}

const navLinks = [
  { label: "Diskusi", href: "/community/discussions" },
  { label: "Artikel", href: "/community/articles" },
  { label: "Docs", href: "/community/docs" },
  { label: "Feedback", href: "/community/feedback" },
];

function FullNavbar({
  showSearch,
  onSearchToggle,
  onSearch,
}: {
  showSearch?: boolean;
  onSearchToggle?: () => void;
  onSearch?: (query: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-1">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="px-4 py-2 text-sm text-slate-400 hover:text-slate-50 rounded-lg hover:bg-slate-800/50 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        {showSearch ? (
          /* Search Input */
          <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-3 py-1.5">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-24 sm:w-40 bg-transparent text-sm text-slate-50 placeholder-slate-500 outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="p-1 text-slate-400 hover:text-slate-50 rounded-full hover:bg-slate-700 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            )}
            <button
              onClick={handleSearch}
              className="p-1.5 text-slate-400 hover:text-emerald-400 rounded-full hover:bg-slate-700 transition-colors"
            >
              <Send className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <button
            onClick={onSearchToggle}
            className="p-2 text-slate-400 hover:text-slate-50 rounded-lg hover:bg-slate-800/50 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
        )}
        <Link
          href="/community/login"
          className="px-4 py-2 text-sm text-slate-300 hover:text-slate-50 rounded-lg hover:bg-slate-800/50 transition-colors"
        >
          Masuk
        </Link>
        <Link
          href="/community/register"
          className="px-4 py-2 text-sm font-medium rounded-full bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors"
        >
          Daftar
        </Link>
      </div>
    </>
  );
}

function SimpleNavbar() {
  return (
    <>
      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-1">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="px-4 py-2 text-sm text-slate-400 hover:text-slate-50 rounded-lg hover:bg-slate-800/50 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Right Side - Simplified */}
      <div className="flex items-center gap-3">
        <Link
          href="/community/login"
          className="px-4 py-2 text-sm text-slate-300 hover:text-slate-50 rounded-lg hover:bg-slate-800/50 transition-colors"
        >
          Masuk
        </Link>
        <Link
          href="/community/register"
          className="px-4 py-2 text-sm font-medium rounded-full bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors"
        >
          Daftar
        </Link>
      </div>
    </>
  );
}

function EditorNavbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <>
      {/* Nav Links - Simplified for editor */}
      <div className="hidden md:flex items-center gap-1">
        <Link
          href="/community/articles"
          className="px-4 py-2 text-sm text-slate-400 hover:text-slate-50 rounded-lg hover:bg-slate-800/50 transition-colors"
        >
          Artikel
        </Link>
        <Link
          href="/community/docs"
          className="px-4 py-2 text-sm text-slate-400 hover:text-slate-50 rounded-lg hover:bg-slate-800/50 transition-colors"
        >
          Docs
        </Link>
      </div>

      {/* Right Side - Editor focused */}
      <div className="flex items-center gap-3">
        <Link
          href="/community/articles"
          className="px-4 py-2 text-sm text-slate-400 hover:text-slate-50 rounded-lg hover:bg-slate-800/50 transition-colors"
        >
          Batal
        </Link>
        <button className="px-4 py-2 text-sm font-medium rounded-full bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors">
          Publikasikan
        </button>
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="md:hidden p-2 text-slate-400 hover:text-slate-50 rounded-lg hover:bg-slate-800/50 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </>
  );
}

export function CommunityNavbar({
  variant = "full",
  showSearch: controlledSearch,
  onSearchToggle,
  onSearch,
}: CommunityNavbarProps) {
  const [internalSearch, setInternalSearch] = useState(false);
  const showSearch = controlledSearch ?? internalSearch;

  const handleSearchToggle = () => {
    if (onSearchToggle) {
      onSearchToggle();
    } else {
      setInternalSearch(!internalSearch);
    }
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 h-16 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800"
    >
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/logo-new.png"
            alt="Daily Worker Hub"
            className="h-8 w-auto object-contain"
          />
          <span className="font-semibold text-slate-50 hidden sm:block">
            DailyWorkerHub
          </span>
          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Community
          </span>
        </Link>

        {/* Dynamic Navbar Content based on variant */}
        {variant === "full" && (
          <FullNavbar
            showSearch={showSearch}
            onSearchToggle={handleSearchToggle}
            onSearch={onSearch}
          />
        )}
        {variant === "simple" && <SimpleNavbar />}
        {variant === "editor" && <EditorNavbar />}
      </div>
    </motion.nav>
  );
}
