"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function CommunitySearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = query.trim();
      if (trimmed) {
        router.push(`/community/discussions?search=${encodeURIComponent(trimmed)}`);
      }
    },
    [query, router]
  );

  return (
    <div className="w-full max-w-xl">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-0 bg-emerald-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative flex items-center bg-card border border-border rounded-2xl h-12 sm:h-14 md:h-16 px-4 sm:px-6 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all duration-300">
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground mr-3 sm:mr-4 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari diskusi, artikel, atau tanyakan sesuatu..."
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm sm:text-base"
          />
        </div>
      </form>
    </div>
  );
}
