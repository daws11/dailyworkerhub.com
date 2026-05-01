"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
import {
  ArrowLeft,
  Image as ImageIcon,
  X,
  Loader2,
  Save,
  Send,
  AlertCircle,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  color: string | null;
}

const categories: Category[] = [
  { id: "tips-trick", name: "Tips & Trick", slug: "tips-trick", color: "#10B981" },
  { id: "panduan", name: "Panduan", slug: "panduan", color: "#3B82F6" },
  { id: "karier", name: "Karier", slug: "karier", color: "#F59E0B" },
  { id: "gaji-negosiasi", name: "Gaji & Negosiasi", slug: "gaji-negosiasi", color: "#EF4444" },
  { id: "inspiratif", name: "Inspiratif", slug: "inspiratif", color: "#8B5CF6" },
  { id: "umum", name: "Umum", slug: "umum", color: "#6B7280" },
];

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>/g, "");
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

export default function ArticleEditorPage() {
  const router = useRouter();
  const supabase = createClient();

  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkAuth() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        router.push("/login?redirect=/community/articles/editor");
        return;
      }
      setUser(session.user);
      setIsLoading(false);
    }
    checkAuth();
  }, [supabase, router]);

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
          setError("Ukuran file terlalu besar. Maksimal 5MB.");
          return;
        }
        const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
        if (!allowedTypes.includes(file.type)) {
          setError("Format file tidak didukung. Gunakan JPEG, PNG, WebP, atau GIF.");
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
    if (!user) {
      setError("Silakan login terlebih dahulu.");
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const slug = generateSlug(title || "untitled-draft-" + Date.now());
      const readTime = calculateReadTime(content);

      const { data, error: insertError } = await (supabase as any)
        .from("community_articles")
        .insert({
          title: title || "Untitled Draft",
          slug,
          excerpt: excerpt || "",
          content: content || "",
          cover_image: coverImage,
          author_id: user.id,
          category: categories.find(c => c.id === categoryId)?.name || "Umum",
          tags,
          read_time: readTime,
          is_published: false,
          is_featured: false,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      alert("Draft berhasil disimpan!");
      if (data) {
        router.push("/community/articles");
      }
    } catch (err: any) {
      console.error("Error saving draft:", err);
      setError(err.message || "Gagal menyimpan draft. Silakan coba lagi.");
    } finally {
      setIsSaving(false);
    }
  }, [user, title, excerpt, content, coverImage, categoryId, tags, supabase, router]);

  const handlePublish = useCallback(async () => {
    if (!title.trim()) {
      setError("Judul artikel harus diisi.");
      return;
    }
    if (!excerpt.trim()) {
      setError("Ringkasan artikel harus diisi.");
      return;
    }
    if (!categoryId) {
      setError("Pilih kategori artikel.");
      return;
    }
    if (!content.trim() || content === "<p></p>") {
      setError("Konten artikel tidak boleh kosong.");
      return;
    }
    setShowPublishDialog(true);
  }, [title, excerpt, categoryId, content]);

  const handleConfirmPublish = useCallback(async () => {
    if (!user) {
      setError("Silakan login terlebih dahulu.");
      return;
    }

    setShowPublishDialog(false);
    setIsPublishing(true);
    setError(null);

    try {
      const slug = generateSlug(title);
      const readTime = calculateReadTime(content);
      const categoryName = categories.find(c => c.id === categoryId)?.name || "Umum";

      const { data, error: insertError } = await (supabase as any)
        .from("community_articles")
        .insert({
          title,
          slug,
          excerpt,
          content,
          cover_image: coverImage,
          author_id: user.id,
          category: categoryName,
          tags,
          read_time: readTime,
          is_published: true,
          is_featured: false,
          published_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (insertError) throw insertError;

      alert("Artikel berhasil dipublikasikan!");
      if (data) {
        router.push(`/community/articles/${data.slug}`);
      }
    } catch (err: any) {
      console.error("Error publishing:", err);
      setError(err.message || "Gagal mempublikasikan artikel. Silakan coba lagi.");
    } finally {
      setIsPublishing(false);
    }
  }, [user, title, excerpt, content, coverImage, categoryId, tags, supabase, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Login Diperlukan</h2>
          <p className="text-muted-foreground mb-4">Anda harus login untuk menulis artikel.</p>
          <Link href="/login?redirect=/community/articles/editor">
            <Button className="bg-emerald-500 text-slate-950 hover:bg-emerald-400">
              Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="text-foreground">
      {/* Editor Toolbar */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border -mx-6 px-6 py-3 mb-4">
        <div className="flex items-center justify-between gap-3">
          <Link href="/community/articles" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Artikel
          </Link>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
              className="border-border text-foreground/80 hover:bg-muted"
            >
              {showPreview ? "Edit" : "Preview"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveDraft}
              disabled={isSaving}
              className="border-border text-foreground/80 hover:bg-muted"
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
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-4">
          <div className="max-w-6xl mx-auto flex items-center gap-2 text-red-400">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{error}</span>
            <button onClick={() => setError(null)} className="ml-auto">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Buat Artikel Baru</h1>
            <p className="text-muted-foreground">
              Tulis dan publikasikan artikel untuk komunitas Daily Worker Hub
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
                className="text-lg font-semibold bg-card border-border text-foreground placeholder:text-muted-foreground"
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
                className="bg-card border-border text-foreground placeholder:text-muted-foreground resize-none"
              />
              <p className="text-xs text-muted-foreground/70">
                Ringkasan akan ditampilkan di halaman daftar artikel
              </p>
            </div>

            {/* Cover Image Upload */}
            <div className="space-y-2">
              <Label>Cover Image</Label>
              {coverImage ? (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-card border border-border">
                  <Image
                    src={coverImage}
                    alt="Cover preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={handleRemoveCoverImage}
                    className="absolute top-4 right-4 p-2 rounded-full bg-background/80 text-muted-foreground hover:text-foreground hover:bg-muted"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label
                  className={cn(
                    "flex flex-col items-center justify-center w-full aspect-video rounded-xl",
                    "border-2 border-dashed border-border bg-card/50",
                    "cursor-pointer hover:border-emerald-500/50 hover:bg-card transition-colors"
                  )}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <ImageIcon className="w-10 h-10 text-muted-foreground/70 mb-3" />
                    <p className="text-sm text-muted-foreground mb-1">
                      Klik untuk upload cover image
                    </p>
                    <p className="text-xs text-muted-foreground/70">
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
                <SelectTrigger className="bg-card border-border text-foreground">
                  <SelectValue placeholder="Pilih kategori..." />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id}
                      className="focus:bg-muted focus:text-foreground"
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
              <div className="flex flex-wrap gap-2 p-3 bg-card border border-border rounded-lg min-h-[48px]">
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
                  className="flex-1 min-w-[120px] bg-transparent text-foreground placeholder:text-muted-foreground outline-none"
                />
              </div>
              <p className="text-xs text-muted-foreground/70">
                Tekan Enter atau koma untuk menambah tag (maksimal 10 tag)
              </p>
            </div>

            {/* TipTap Editor */}
            <div className="space-y-2">
              <Label>Konten Artikel</Label>
              <div className="rounded-xl overflow-hidden border border-border">
                <TipTapEditor
                  content={content}
                  onChange={setContent}
                  placeholder="Tulis konten artikel Anda di sini..."
                  className="bg-card"
                />
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
            <Link
              href="/community/articles"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Batal dan kembali ke daftar artikel
            </Link>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handleSaveDraft}
                disabled={isSaving || isPublishing}
                className="border-border text-foreground/80 hover:bg-muted"
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
            <AlertDialogContent className="bg-card border-border">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-foreground">Publikasikan Artikel?</AlertDialogTitle>
                <AlertDialogDescription className="text-muted-foreground">
                  Apakah Anda yakin ingin mempublikasikan artikel ini? Setelah dipublikasikan,
                  artikel akan visible untuk semua pembaca.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="border-border text-foreground/80 hover:bg-muted">
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
