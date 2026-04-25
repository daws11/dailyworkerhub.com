"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { TagInput } from "@/components/TagInput"
import { createClient } from "@/lib/supabase/client"
import { discussionSchema, type DiscussionFormValues } from "@/lib/validation/discussion"
import { toast } from "sonner"

interface DiscussionFormProps {
  mode?: "create" | "edit"
  initialData?: {
    id: string
    slug: string
    title: string
    content: string
    tags?: string[]
  }
  onSuccess?: (slug: string) => void
}

export function DiscussionForm({
  mode = "create",
  initialData,
  onSuccess,
}: DiscussionFormProps) {
  const router = useRouter()
  const [isAuthChecked, setIsAuthChecked] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<DiscussionFormValues>({
    resolver: zodResolver(discussionSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      content: initialData?.content ?? "",
      tags: initialData?.tags ?? [],
    },
  })

  // Check authentication on mount
  useState(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      const user = session?.user ?? null
      setIsAuthenticated(!!user)
      setIsAuthChecked(true)
    }
    checkAuth()
  })

  const onSubmit = async (values: DiscussionFormValues) => {
    setIsSubmitting(true)

    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      const user = session?.user ?? null

      if (!user) {
        toast.error("Silakan masuk untuk melanjutkan")
        router.push("/community/login")
        return
      }

      if (mode === "create") {
        // Generate slug from title
        const slug = values.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")

        // Generate excerpt from content (first 150 chars)
        const excerpt = values.content.slice(0, 150)

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const insertData: any = {
          slug,
          title: values.title,
          content: values.content,
          excerpt,
          author_id: user.id,
          status: "open",
          view_count: 0,
          likes_count: 0,
          votes_count: 0,
          comments_count: 0,
          is_pinned: false,
          is_featured: false,
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error } = await (supabase as any).from("discussions").insert(insertData)

        if (error) {
          throw new Error(error.message)
        }

        // Insert tags if any
        if (values.tags.length > 0) {
          // For simplicity, we just show success - full tag integration would require
          // existing tag records in the database
        }

        toast.success("Diskusi berhasil dibuat!", {
          description: "Anda akan diarahkan ke halaman diskusi",
        })

        // Navigate to the new discussion
        setTimeout(() => {
          router.push(`/community/discussions/${slug}`)
        }, 1500)
      } else if (mode === "edit" && initialData) {
        // Generate excerpt from content
        const excerpt = values.content.slice(0, 150)

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updateData: any = {
          title: values.title,
          content: values.content,
          excerpt,
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error } = await (supabase as any)
          .from("discussions")
          .update(updateData)
          .eq("id", initialData.id)

        if (error) {
          throw new Error(error.message)
        }

        toast.success("Diskusi berhasil diperbarui!", {
          description: "Perubahan telah disimpan",
        })

        onSuccess?.(initialData.slug)

        // Navigate back to discussion
        setTimeout(() => {
          router.push(`/community/discussions/${initialData.slug}`)
        }, 1500)
      }
    } catch (error) {
      toast.error("Terjadi kesalahan", {
        description: error instanceof Error ? error.message : "Silakan coba lagi",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const isEditMode = mode === "edit"

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-3xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
          <Link href="/community" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
              <span className="text-slate-950 font-bold text-sm">DW</span>
            </div>
            <span className="font-semibold text-slate-50 hidden sm:block">DailyWorkerHub</span>
            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Community
            </span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-50 mb-2">
              {isEditMode ? "Edit Diskusi" : "Buat Diskusi Baru"}
            </h1>
            <p className="text-slate-400">
              {isEditMode
                ? "Perbarui konten diskusi Anda"
                : "Bagikan pertanyaan atau pengalaman Anda dengan komunitas"}
            </p>
          </div>

          {!isAuthChecked ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : !isAuthenticated ? (
            <div className="py-8 text-center space-y-4 bg-slate-900 border border-slate-800 rounded-xl">
              <p className="text-slate-400">
                Anda perlu masuk untuk membuat atau mengedit diskusi.
              </p>
              <Button asChild>
                <Link href="/community/login">Masuk</Link>
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Title Field */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Judul</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          placeholder="Judul diskusi yang jelas dan deskriptif"
                          className="flex h-10 w-full rounded-md border border-input bg-slate-900 px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                          maxLength={100}
                        />
                      </FormControl>
                      <FormDescription>
                        {field.value.length}/100 karakter (minimum 10)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Content Field */}
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Konten</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Jelaskan pertanyaan atau pengalaman Anda secara detail..."
                          className="min-h-[200px] bg-slate-900"
                        />
                      </FormControl>
                      <FormDescription>
                        {field.value.length} karakter (minimum 20)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Tags Field */}
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tag</FormLabel>
                      <FormControl>
                        <TagInput
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Tambahkan tag (tekan Enter atau koma)"
                          maxTags={10}
                        />
                      </FormControl>
                      <FormDescription>
                        Tambahkan tag untuk membantu menemukan diskusi Anda
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <div className="flex items-center gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={isSubmitting}
                    className="border-slate-700 text-slate-300"
                  >
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {isEditMode ? "Menyimpan..." : "Membuat..."}
                      </>
                    ) : isEditMode ? (
                      "Simpan Perubahan"
                    ) : (
                      "Buat Diskusi"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </div>
      </main>
    </div>
  )
}
