"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { DiscussionForm } from "@/components/discussion/DiscussionForm"
import { createClient } from "@/lib/supabase/client"

interface InitialData {
  id: string
  slug: string
  title: string
  content: string
  tags?: string[]
}

export default function EditDiscussionPage() {
  const params = useParams()
  const slug = params?.slug as string | undefined
  const [initialData, setInitialData] = useState<InitialData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return

    const fetchDiscussion = async () => {
      setLoading(true)
      setError(null)

      try {
        const supabase = createClient() as any

        // Check if user is authenticated
        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
          setError("auth_required")
          return
        }

        // Fetch discussion data from Supabase
        const { data: discussion, error: fetchError } = await supabase
          .from("discussions")
          .select("id, slug, title, content")
          .eq("slug", slug)
          .single()

        if (fetchError || !discussion) {
          throw new Error(fetchError?.message || "Diskusi tidak ditemukan")
        }

        setInitialData({
          id: discussion.id,
          slug: discussion.slug,
          title: discussion.title,
          content: discussion.content,
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan saat memuat diskusi")
      } finally {
        setLoading(false)
      }
    }

    fetchDiscussion()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50">
        <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
          <div className="max-w-3xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
            <Link href="/community/discussions" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                <span className="text-slate-950 font-bold text-sm">DW</span>
              </div>
              <span className="font-semibold text-slate-50 hidden sm:block">DailyWorkerHub</span>
            </Link>
          </div>
        </nav>

        <main className="pt-24 pb-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[400px]">
            <div className="flex items-center gap-3">
              <Loader2 className="w-5 h-5 animate-spin text-emerald-500" />
              <span className="text-slate-400">Memuat...</span>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (error === "auth_required") {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50">
        <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
          <div className="max-w-3xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
            <Link href="/community/discussions" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                <span className="text-slate-950 font-bold text-sm">DW</span>
              </div>
              <span className="font-semibold text-slate-50 hidden sm:block">DailyWorkerHub</span>
            </Link>
          </div>
        </nav>

        <main className="pt-24 pb-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-4">
              <p className="text-slate-400">
                Anda perlu masuk untuk mengedit diskusi.
              </p>
              <Link
                href={`/community/login?redirect=/community/discussions/${slug}/edit`}
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-full bg-emerald-500 text-slate-950 hover:bg-emerald-400"
              >
                Masuk
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (error || !initialData) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50">
        <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
          <div className="max-w-3xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
            <Link href="/community/discussions" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                <span className="text-slate-950 font-bold text-sm">DW</span>
              </div>
              <span className="font-semibold text-slate-50 hidden sm:block">DailyWorkerHub</span>
            </Link>
          </div>
        </nav>

        <main className="pt-24 pb-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-4">
              <p className="text-red-400">{error || "Diskusi tidak ditemukan"}</p>
              <Link
                href="/community/discussions"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700"
              >
                Kembali ke Daftar Diskusi
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return <DiscussionForm mode="edit" initialData={initialData} />
}
