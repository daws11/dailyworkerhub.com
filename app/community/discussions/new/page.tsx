"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Loader2, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Category {
  id: string;
  name: string;
  slug: string;
  color: string | null;
}

const mockCategories: Category[] = [
  { id: "1", name: "Karier", slug: "karier", color: "#10B981" },
  { id: "2", name: "Gaji & Negosiasi", slug: "gaji-negosiasi", color: "#10B981" },
  { id: "3", name: "Remote Work", slug: "remote-work", color: "#10B981" },
  { id: "4", name: "Skill Development", slug: "skill-development", color: "#10B981" },
  { id: "5", name: "Umum", slug: "umum", color: "#10B981" },
];

export default function NewDiscussionPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<{
    title?: string;
    content?: string;
    category?: string;
  }>({});

  const validateForm = useCallback(() => {
    const newErrors: typeof errors = {};

    if (!title.trim()) {
      newErrors.title = "Judul diskusi wajib diisi";
    } else if (title.trim().length < 10) {
      newErrors.title = "Judul minimal 10 karakter";
    } else if (title.trim().length > 200) {
      newErrors.title = "Judul maksimal 200 karakter";
    }

    if (!content.trim()) {
      newErrors.content = "Konten diskusi wajib diisi";
    } else if (content.trim().length < 20) {
      newErrors.content = "Konten minimal 20 karakter";
    }

    if (!selectedCategory) {
      newErrors.category = "Pilih kategori diskusi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [title, content, selectedCategory]);

  const handleAddTag = useCallback(() => {
    const trimmedTag = tagInput.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < 5) {
      setTags([...tags, trimmedTag]);
      setTagInput("");
    }
  }, [tagInput, tags]);

  const handleRemoveTag = useCallback((tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  }, [tags]);

  const handleTagKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddTag();
    }
  }, [handleAddTag]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const supabase = createClient();

      // Check if user is authenticated
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        setError("Silakan masuk terlebih dahulu untuk membuat diskusi");
        setLoading(false);
        router.push("/community/login");
        return;
      }

      // Generate slug from title
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .substring(0, 100);

      // For now, show success message (backend API not implemented yet)
      // TODO: Replace with actual API call when backend is ready
      setTimeout(() => {
        router.push("/community/discussions");
      }, 1000);
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
      setLoading(false);
    }
  }, [validateForm, router]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-4xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/community/discussions" className="flex items-center gap-3 text-slate-400 hover:text-slate-50 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:block text-sm font-medium">Kembali</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-400 hidden sm:block">Forum Diskusi</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-50 mb-2">Buat Diskusi Baru</h1>
            <p className="text-slate-400">
              Bagikan pertanyaan, ide, atau pengalaman Anda dengan komunitas
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-slate-200">
                Judul Diskusi <span className="text-red-400">*</span>
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="Apa yang ingin Anda diskusikan?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`bg-slate-900 border-slate-700 text-slate-50 placeholder:text-slate-500 ${
                  errors.title ? "border-red-500" : ""
                }`}
              />
              {errors.title && (
                <p className="text-sm text-red-400 flex items-center gap-1">
                  <X className="w-4 h-4" />
                  {errors.title}
                </p>
              )}
              <p className="text-xs text-slate-500">
                {title.length}/200 karakter
              </p>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label className="text-slate-200">
                Kategori <span className="text-red-400">*</span>
              </Label>
              <div className="flex flex-wrap gap-2">
                {mockCategories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 text-sm rounded-full transition-colors ${
                      selectedCategory === category.id
                        ? "bg-emerald-500 text-slate-950 font-medium"
                        : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-300"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              {errors.category && (
                <p className="text-sm text-red-400 flex items-center gap-1">
                  <X className="w-4 h-4" />
                  {errors.category}
                </p>
              )}
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Label htmlFor="content" className="text-slate-200">
                Konten <span className="text-red-400">*</span>
              </Label>
              <Textarea
                id="content"
                placeholder="Jelaskan lebih detail tentang topik yang ingin Anda diskusikan..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                className={`bg-slate-900 border-slate-700 text-slate-50 placeholder:text-slate-500 resize-none ${
                  errors.content ? "border-red-500" : ""
                }`}
              />
              {errors.content && (
                <p className="text-sm text-red-400 flex items-center gap-1">
                  <X className="w-4 h-4" />
                  {errors.content}
                </p>
              )}
              <p className="text-xs text-slate-500">
                {content.length} karakter (minimal 20)
              </p>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label className="text-slate-200">Tags</Label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Tambahkan tag (maks 5)"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  className="bg-slate-900 border-slate-700 text-slate-50 placeholder:text-slate-500"
                  disabled={tags.length >= 5}
                />
                <Button
                  type="button"
                  onClick={handleAddTag}
                  variant="outline"
                  disabled={tags.length >= 5 || !tagInput.trim()}
                  className="border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-2"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-red-400 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <p className="text-xs text-slate-500">
                Tekan Enter atau koma untuk menambahkan tag
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-emerald-500 text-slate-950 hover:bg-emerald-400 min-w-[140px]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Mengirim...
                  </>
                ) : (
                  "Publikasikan"
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}