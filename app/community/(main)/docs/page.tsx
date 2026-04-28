"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ChevronRight, FileText, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Doc {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  category: {
    name: string;
    slug: string;
  };
  parent_id: string | null;
  has_children: boolean;
}

const mockDocs: Doc[] = [
  {
    id: "1",
    slug: "getting-started",
    title: "Getting Started",
    excerpt: "Panduan awal untuk memulai perjalanan Anda sebagai daily worker.",
    category: { name: "Getting Started", slug: "getting-started" },
    parent_id: null,
    has_children: true,
  },
  {
    id: "2",
    slug: "getting-started/persiapan-dasar",
    title: "Persiapan Dasar",
    excerpt: "Hal-hal yang perlu Anda persiapkan sebelum memulai.",
    category: { name: "Getting Started", slug: "getting-started" },
    parent_id: "1",
    has_children: false,
  },
  {
    id: "3",
    slug: "getting-started/membuat-akun",
    title: "Membuat Akun",
    excerpt: "Cara mendaftar dan memverifikasi akun Anda.",
    category: { name: "Getting Started", slug: "getting-started" },
    parent_id: "1",
    has_children: false,
  },
  {
    id: "4",
    slug: "platform-guide",
    title: "Platform Guide",
    excerpt: "Cara menggunakan platform DailyWorkerHub secara efektif.",
    category: { name: "Platform Guide", slug: "platform-guide" },
    parent_id: null,
    has_children: true,
  },
  {
    id: "5",
    slug: "platform-guide/cara-mencari-lowongan",
    title: "Cara Mencari Lowongan",
    excerpt: "Tips dan trik untuk menemukan lowongan yang sesuai.",
    category: { name: "Platform Guide", slug: "platform-guide" },
    parent_id: "4",
    has_children: false,
  },
  {
    id: "6",
    slug: "platform-guide/cara-posting-lowongan",
    title: "Cara Posting Lowongan",
    excerpt: "Langkah untuk memposting lowongan pekerjaan.",
    category: { name: "Platform Guide", slug: "platform-guide" },
    parent_id: "4",
    has_children: false,
  },
  {
    id: "7",
    slug: "fitur",
    title: "Fitur Platform",
    excerpt: "Deskripsi dan penggunaan semua fitur platform.",
    category: { name: "Fitur", slug: "fitur" },
    parent_id: null,
    has_children: true,
  },
  {
    id: "8",
    slug: "fitur/protection-pool",
    title: "Protection Pool",
    excerpt: "Sistem proteksi untuk menghindari calo.",
    category: { name: "Fitur", slug: "fitur" },
    parent_id: "7",
    has_children: false,
  },
  {
    id: "9",
    slug: "fitur/escrow-system",
    title: "Escrow System",
    excerpt: "Sistem pembayaran escrow yang aman.",
    category: { name: "Fitur", slug: "fitur" },
    parent_id: "7",
    has_children: false,
  },
];

const mockCategories = [
  { name: "Getting Started", slug: "getting-started", icon: "Rocket" },
  { name: "Platform Guide", slug: "platform-guide", icon: "HelpCircle" },
  { name: "Fitur", slug: "fitur", icon: "Star" },
];

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  const rootDocs = mockDocs.filter((d) => d.parent_id === null);

  const getChildDocs = (parentSlug: string) => mockDocs.filter((d) => d.parent_id === parentSlug);

  const filteredDocs = searchQuery
    ? mockDocs.filter((d) => d.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : rootDocs;

  return (
    <div className="text-foreground">
      <main className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <div className="sticky top-24">
                <h2 className="text-lg font-semibold text-foreground mb-4">Dokumentasi</h2>

                {/* Search */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari dokumentasi..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-card border-border text-foreground placeholder:text-muted-foreground text-sm"
                  />
                </div>

                {/* Categories */}
                <nav className="space-y-1">
                  {mockCategories.map((cat) => (
                    <div key={cat.slug}>
                      <Link
                        href={`/community/docs/${cat.slug}`}
                        className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                      >
                        <FileText className="w-4 h-4" />
                        {cat.name}
                      </Link>
                    </div>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Content */}
            <div className="flex-1">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">Dokumentasi</h1>
                <p className="text-muted-foreground">
                  Panduan dan referensi untuk menggunakan platform DailyWorkerHub
                </p>
              </div>

              {/* Doc List */}
              <div className="space-y-4">
                {filteredDocs.map((doc) => (
                  <div key={doc.id}>
                    <Link
                      href={`/community/docs/${doc.slug}`}
                      className="block bg-card border border-border rounded-xl p-5 hover:border-emerald-500/30 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-emerald-400" />
                          <div>
                            <h3 className="font-semibold text-foreground">{doc.title}</h3>
                            {doc.excerpt && (
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{doc.excerpt}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {doc.has_children && (
                            <ChevronRight className="w-4 h-4 text-muted-foreground/70" />
                          )}
                        </div>
                      </div>
                    </Link>

                    {/* Children */}
                    {doc.has_children && expandedSlug === doc.slug && (
                      <div className="ml-8 mt-2 space-y-2">
                        {getChildDocs(doc.slug).map((child) => (
                          <Link
                            key={child.id}
                            href={`/community/docs/${child.slug}`}
                            className="block bg-muted/50 border border-border/70 rounded-lg p-4 hover:border-emerald-500/30 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <FileText className="w-4 h-4 text-muted-foreground/70" />
                              <div>
                                <h4 className="text-sm font-medium text-foreground/80">{child.title}</h4>
                                {child.excerpt && (
                                  <p className="text-xs text-muted-foreground/70 mt-0.5 line-clamp-1">{child.excerpt}</p>
                                )}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {filteredDocs.length === 0 && (
                  <div className="text-center py-16">
                    <FileText className="w-12 h-12 text-muted-foreground/60 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground/80 mb-2">Tidak ada hasil</h3>
                    <p className="text-muted-foreground/70">Coba kata kunci pencarian lain</p>
                  </div>
                )}
              </div>

              {/* Feedback */}
              <div className="mt-12 p-6 bg-card border border-border rounded-xl">
                <h3 className="text-lg font-semibold text-foreground mb-2">Apakah dokumentasi ini membantu?</h3>
                <p className="text-sm text-muted-foreground mb-4">Bantu kami meningkatkan dokumentasi dengan memberikan feedback</p>
                <div className="flex items-center gap-3">
                  <Button variant="outline" className="border-border text-foreground/80">
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Ya, membantu
                  </Button>
                  <Button variant="outline" className="border-border text-foreground/80">
                    <ThumbsDown className="w-4 h-4 mr-2" />
                    Tidak cukup
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
