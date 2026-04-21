"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { TipTapEditor } from "@/components/editor/TipTapEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Image as ImageIcon,
  X,
  Loader2,
  Save,
  Send,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  slug: string;
  color: string | null;
}

const mockCategories: Category[] = [
  { id: "1", name: "Karier", slug: "karier", color: "#10B981" },
  { id: "2", name: "Gaji & Negosiasi", slug: "gaji-negosiasi", color: "#F59E0B" },
  { id: "3", name: "Remote Work", slug: "remote-work", color: "#3B82F6" },
  { id: "4", name: "Skill Development", slug: "skill-development", color: "#8B5CF6" },
  { id: "5", name: "Tips Interview", slug: "tips-interview", color: "#EC4899" },
  { id: "6", name: "Work-Life Balance", slug: "work-life-balance", color: "#14B8A6" },
];

export default function ArticleEditorPage() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showPublishDialog, setShowPublishDialog] = useState(false);

  const supabase = createClient();

  const handleAddTag = useCallback(() => {
    const trimmedTag = tagInput.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < 10) {
      setTags((prev) => [...prev, trimmedTag]);
      setTagInput("");
    }
  }, [tagInput, tags]);

  const handleRemoveTag = useCallback((tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  }, []);

  const handleTagKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        handleAddTag();
      }
      if (e.key === "Backspace" && !tagInput && tags.length > 0) {
        setTags((prev) => prev.slice(0, -1));
      }
    },
    [handleAddTag, tagInput, tags]
  );

  const handleCoverImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          alert("Ukuran file terlalu besar. Maksimal 5MB.");
          return;
        }
        const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
        if (!allowedTypes.includes(file.type)) {
          alert("Format file tidak didukung. Gunakan JPEG, PNG, WebP, atau GIF.");
          return;
        }
        setCoverImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setCoverImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  const handleRemoveCoverImage = useCallback(() => {
    setCoverImage(null);
    setCoverImageFile(null);
  }, []);

  const handleSaveDraft = useCallback(async () => {
    setIsSaving(true);
    try {
      // Simulate save - in production, this would save to Supabase
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Draft berhasil disimpan!");
    } catch {
      alert("Gagal menyimpan draft. Silakan coba lagi.");
    } finally {
      setIsSaving(false);
    }
  }, []);

  const handlePublish = useCallback(async () => {
    if (!title.trim()) {
      alert("Judul artikel harus diisi.");
      return;
    }
    if (!excerpt.trim()) {
      alert("Ringkasan artikel harus diisi.");
      return;
    }
    if (!categoryId) {
      alert("Pilih kategori artikel.");
      return;
    }
    if (!content.trim() || content === "<p></p>") {
      alert("Konten artikel tidak boleh kosong.");
      return;
    }
    setShowPublishDialog(true);
  }, [title, excerpt, categoryId, content]);

  const handleConfirmPublish = useCallback(async () => {
    setShowPublishDialog(false);
    setIsPublishing(true);
    try {
      // Simulate publish - in production, this would save to Supabase and set status to published
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert("Artikel berhasil dipublikasikan!");
      // Redirect to articles list or article detail page
      window.location.href = "/community/articles";
    } catch {
      alert("Gagal mempublikasikan artikel. Silakan coba lagi.");
    } finally {
      setIsPublishing(false);
    }
  }, []);

  void supabase; // Supabase client for future real data

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/community/articles" className="flex items-center gap-3">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
              <span className="text-slate-950 font-bold text-sm">DW</span>
            </div>
            <span className="font-semibold text-slate-50 hidden sm:block">DailyWorkerHub</span>
          </Link>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              {showPreview ? "Edit" : "Preview"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveDraft}
              disabled={isSaving}
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Simpan Draft
                </>
              )}
            </Button>
            <Button
              size="sm"
              onClick={handlePublish}
              disabled={isPublishing}
              className="bg-emerald-500 text-slate-950 hover:bg-emerald-400"
            >
              {isPublishing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Publikasikan
                </>
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-50 mb-2">Buat Artikel Baru</h1>
            <p className="text-slate-400">
              Tulis dan publikasikan artikel untuk komunitas DailyWorkerHub
            </p>
          </div>

          {/* Editor Form */}
          <div className="space-y-6">
            {/* Title Input */}
            <div className="space-y-2">
              <Label htmlFor="title">Judul Artikel</Label>
              <Input
                id="title"
                placeholder="Masukkan judul artikel..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg font-semibold bg-slate-900 border-slate-800 text-slate-50 placeholder:text-slate-500"
              />
            </div>

            {/* Excerpt Input */}
            <div className="space-y-2">
              <Label htmlFor="excerpt">Ringkasan</Label>
              <Textarea
                id="excerpt"
                placeholder="Tulis ringkasan singkat artikel (2-3 kalimat)..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                className="bg-slate-900 border-slate-800 text-slate-50 placeholder:text-slate-500 resize-none"
              />
              <p className="text-xs text-slate-500">
                Ringkasan akan ditampilkan di halaman daftar artikel
              </p>
            </div>

            {/* Cover Image Upload */}
            <div className="space-y-2">
              <Label>Cover Image</Label>
              {coverImage ? (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                  <Image
                    src={coverImage}
                    alt="Cover preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={handleRemoveCoverImage}
                    className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/80 text-slate-400 hover:text-slate-50 hover:bg-slate-800"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label
                  className={cn(
                    "flex flex-col items-center justify-center w-full aspect-video rounded-xl",
                    "border-2 border-dashed border-slate-700 bg-slate-900/50",
                    "cursor-pointer hover:border-emerald-500/50 hover:bg-slate-900 transition-colors"
                  )}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <ImageIcon className="w-10 h-10 text-slate-500 mb-3" />
                    <p className="text-sm text-slate-400 mb-1">
                      Klik untuk upload cover image
                    </p>
                    <p className="text-xs text-slate-500">
                      PNG, JPG, WebP (maksimal 5MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    onChange={handleCoverImageChange}
                  />
                </label>
              )}
            </div>

            {/* Category Selector */}
            <div className="space-y-2">
              <Label htmlFor="category">Kategori</Label>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger className="bg-slate-900 border-slate-800 text-slate-50">
                  <SelectValue placeholder="Pilih kategori..." />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800">
                  {mockCategories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id}
                      className="focus:bg-slate-800 focus:text-slate-50"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: category.color || "#10B981" }}
                        />
                        {category.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tags Input */}
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2 p-3 bg-slate-900 border border-slate-800 rounded-lg min-h-[48px]">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-500/10 text-emerald-400 text-sm rounded-full border border-emerald-500/20"
                  >
                    #{tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-emerald-300"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  placeholder={tags.length === 0 ? "Tambah tag..." : ""}
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  onBlur={handleAddTag}
                  className="flex-1 min-w-[120px] bg-transparent text-slate-50 placeholder:text-slate-500 outline-none"
                />
              </div>
              <p className="text-xs text-slate-500">
                Tekan Enter atau koma untuk menambah tag (maksimal 10 tag)
              </p>
            </div>

            {/* TipTap Editor */}
            <div className="space-y-2">
              <Label>Konten Artikel</Label>
              <div className="rounded-xl overflow-hidden border border-slate-800">
                <TipTapEditor
                  content={content}
                  onChange={setContent}
                  placeholder="Tulis konten artikel Anda di sini..."
                  className="bg-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
            <Link
              href="/community/articles"
              className="text-sm text-slate-400 hover:text-slate-50"
            >
              Batal dan kembali ke daftar artikel
            </Link>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handleSaveDraft}
                disabled={isSaving || isPublishing}
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                <Save className="w-4 h-4 mr-2" />
                Simpan Draft
              </Button>
              <Button
                onClick={handlePublish}
                disabled={isSaving || isPublishing}
                className="bg-emerald-500 text-slate-950 hover:bg-emerald-400"
              >
                <Send className="w-4 h-4 mr-2" />
                Publikasikan
              </Button>
            </div>
          </div>

          {/* Publish Confirmation Dialog */}
          <AlertDialog open={showPublishDialog} onOpenChange={setShowPublishDialog}>
            <AlertDialogContent className="bg-slate-900 border-slate-800">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-slate-50">Publikasikan Artikel?</AlertDialogTitle>
                <AlertDialogDescription className="text-slate-400">
                  Apakah Anda yakin ingin mempublikasikan artikel ini? Setelah dipublikasikan,
                  artikel akan visible untuk semua pembaca dan tidak dapat dikembalikan ke status draft.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="border-slate-700 text-slate-300 hover:bg-slate-800">
                  Batal
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleConfirmPublish}
                  disabled={isPublishing}
                  className="bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                >
                  {isPublishing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="ml-2">Mempublikasikan...</span>
                    </>
                  ) : (
                    "Publikasikan"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </main>
    </div>
  );
}