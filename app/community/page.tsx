import Link from "next/link"
import Image from "next/image"
import { MessageSquare, FileText, BookOpen, Vote, Sparkles, Search, TrendingUp, Briefcase, ChevronRight, ArrowUp, MessageCircle, Eye, X } from "lucide-react"
import { getFeaturedArticles, getPopularDiscussions, getCommunityStats, formatTimeAgo } from "@/lib/community"
import { CommunityHomeSkeleton } from "@/components/skeleton/CommunityHomeSkeleton"

const shortcuts = [
  { label: "Diskusi Terbaru", icon: MessageSquare, href: "/community/discussions?sort=newest" },
  { label: "Artikel Populer", icon: TrendingUp, href: "/community/articles?sort=popular" },
  { label: "Panduan Karir", icon: BookOpen, href: "/community/docs/getting-started" },
  { label: "Feedback Produk", icon: Vote, href: "/community/feedback" },
  { label: "Cari Lowongan", icon: Briefcase, href: "/app" },
]

export default async function CommunityPage() {
  const [articles, discussions, stats] = await Promise.all([
    getFeaturedArticles(3),
    getPopularDiscussions(5),
    getCommunityStats(),
  ])

  const hasData = articles.length > 0 || discussions.length > 0

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 bg-grid-pattern">
      {/* Navigation Bar - Fixed Top */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo-new.png" alt="Daily Worker Hub" width={32} height={32} className="h-8 w-auto object-contain" />
            <span className="font-semibold text-slate-50 hidden sm:block">DailyWorkerHub</span>
            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Community
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/community/discussions"
              className="px-4 py-2 text-sm text-slate-400 hover:text-slate-50 rounded-lg hover:bg-slate-800/50 transition-colors"
            >
              Diskusi
            </Link>
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
            <Link
              href="/community/feedback"
              className="px-4 py-2 text-sm text-slate-400 hover:text-slate-50 rounded-lg hover:bg-slate-800/50 transition-colors"
            >
              Feedback
            </Link>
          </div>

          {/* Right Side */}
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
        </div>
      </nav>

      {/* Hero / Command Center */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 bg-radial-green">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Komunitas Pekerja Harian Indonesia
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl mx-auto px-4">
            Diskusi, pelajari, dan berkembang bersama ribuan daily worker di seluruh Indonesia.
          </p>

          {/* Search */}
          <div className="w-full max-w-2xl mx-auto px-4 sm:px-0">
            <div className="relative group">
              <div className="absolute inset-0 bg-emerald-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center bg-slate-900 border border-slate-700 rounded-2xl h-14 sm:h-16 px-4 sm:px-6 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all duration-300">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 mr-3 sm:mr-4 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Cari diskusi, artikel, atau tanyakan sesuatu..."
                  className="flex-1 bg-transparent text-slate-50 placeholder-slate-500 outline-none text-sm sm:text-base"
                />
              </div>
            </div>
          </div>

          {/* Shortcut Pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 px-4">
            {shortcuts.map((shortcut) => (
              <Link
                key={shortcut.label}
                href={shortcut.href}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm text-slate-400 bg-slate-800/50 border border-slate-700 rounded-full hover:bg-slate-700 hover:border-emerald-500/50 transition-all duration-300"
              >
                <shortcut.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{shortcut.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-slate-800 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center gap-8 sm:gap-16">
            {[
              { label: "Diskusi", value: stats.discussions, suffix: "+" },
              { label: "Artikel", value: stats.articles, suffix: "" },
              { label: "Member", value: stats.members, suffix: "+" },
              { label: "Feedback Terjawab", value: stats.feedbackAnswered, suffix: "" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2 text-sm">
                <span className="text-emerald-400 font-semibold text-lg">
                  {stat.value.toLocaleString()}{stat.suffix}
                </span>
                <span className="text-slate-400">{stat.label}</span>
                <span className="w-1 h-1 rounded-full bg-slate-600" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-slate-50">Artikel Terkini</h2>
            <Link
              href="/community/articles"
              className="text-sm text-emerald-400 hover:text-emerald-300 hover:underline flex items-center gap-1"
            >
              Lihat semua
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {hasData && articles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/community/articles/${article.slug}`}
                  className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-emerald-500/30 card-hover"
                >
                  {/* Cover Image */}
                  <div className="aspect-video relative overflow-hidden">
                    {article.cover_image ? (
                      <Image
                        src={article.cover_image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/50 to-slate-900" />
                    )}
                    <span className="absolute top-4 left-4 px-3 py-1 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {article.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-semibold text-slate-50 line-clamp-2 mb-2 group-hover:text-emerald-400 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-slate-400 line-clamp-3 mb-4">
                      {article.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <span className="text-emerald-400 text-xs font-medium">
                          {article.author?.full_name?.charAt(0) || 'A'}
                        </span>
                      </div>
                      <span className="text-slate-400">{article.author?.full_name || 'Anonymous'}</span>
                      <span>•</span>
                      <span>{article.read_time} menit baca</span>
                      <span>•</span>
                      <span>{article.published_at ? new Date(article.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Belum ada artikel. Jadilah yang pertama menulis!</p>
              <Link
                href="/community/articles/editor"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 text-sm font-medium rounded-full bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                Tulis Artikel
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Popular Discussions */}
      <section className="py-16 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-slate-50">Diskusi Populer</h2>
            <Link
              href="/community/discussions"
              className="text-sm text-emerald-400 hover:text-emerald-300 hover:underline flex items-center gap-1"
            >
              Lihat semua
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {hasData && discussions.length > 0 ? (
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Featured Discussion */}
              <Link
                href={`/community/discussions/${discussions[0].slug}`}
                className="group bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/30 card-hover"
              >
                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
                  {discussions[0].category}
                </span>
                <h3 className="text-lg font-semibold text-slate-50 mb-4 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                  {discussions[0].title}
                </h3>
                <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                  {discussions[0].author?.full_name || 'Anonymous'} • {formatTimeAgo(discussions[0].created_at)}
                </p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-slate-400">
                    <ArrowUp className="w-4 h-4" />
                    <span>{discussions[0].likes_count}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <MessageCircle className="w-4 h-4" />
                    <span>{discussions[0].comments_count}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Eye className="w-4 h-4" />
                    <span>{discussions[0].views_count}</span>
                  </div>
                </div>
              </Link>

              {/* Discussion List */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl divide-y divide-slate-800">
                {discussions.slice(1).map((discussion) => (
                  <Link
                    key={discussion.id}
                    href={`/community/discussions/${discussion.slug}`}
                    className="flex items-start gap-4 p-4 hover:bg-slate-800/30 transition-colors"
                  >
                    {/* Vote Pill */}
                    <div className="flex flex-col items-center px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-xl">
                      <ArrowUp className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-medium text-slate-300">{discussion.likes_count}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 text-xs rounded-full bg-slate-800 text-slate-400">
                          {discussion.category}
                        </span>
                      </div>
                      <h4 className="text-sm font-medium text-slate-200 line-clamp-1 group-hover:text-emerald-400 transition-colors">
                        {discussion.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        {discussion.author?.full_name || 'Anonymous'} • {formatTimeAgo(discussion.created_at)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Belum ada diskusi. Mulai percakapan baru!</p>
              <Link
                href="/community/discussions/new"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 text-sm font-medium rounded-full bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                Buat Diskusi
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-emerald-900/20 to-slate-900 border-y border-emerald-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-50 mb-4">
            Punya pertanyaan spesifik?
          </h2>
          <p className="text-slate-400 mb-8">
            Mulai diskusi sekarang dan dapatkan jawaban dari komunitas.
          </p>
          <Link
            href="/community/discussions/new"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-full bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            Buat Diskusi
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Logo & Tagline */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <Link href="/" className="flex items-center gap-3">
                <Image src="/logo-new.png" alt="Daily Worker Hub" width={32} height={32} className="h-8 w-auto object-contain" />
                <span className="font-semibold text-slate-50">DailyWorkerHub</span>
              </Link>
              <p className="text-sm text-slate-500">
                Pusat komunitas pekerja harian Indonesia
              </p>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm">
              <div>
                <h4 className="font-medium text-slate-300 mb-3">Produk</h4>
                <ul className="space-y-2">
                  <li><Link href="/app" className="text-slate-500 hover:text-slate-300">Pasang Lowongan</Link></li>
                  <li><Link href="/app" className="text-slate-500 hover:text-slate-300">Cari Pekerja</Link></li>
                  <li><Link href="/community/feedback" className="text-slate-500 hover:text-slate-300">Feedback</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-slate-300 mb-3">Resource</h4>
                <ul className="space-y-2">
                  <li><Link href="/community/docs" className="text-slate-500 hover:text-slate-300">Dokumentasi</Link></li>
                  <li><Link href="/community/articles" className="text-slate-500 hover:text-slate-300">Artikel</Link></li>
                  <li><Link href="/community/discussions" className="text-slate-500 hover:text-slate-300">Forum</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-slate-300 mb-3">Komunitas</h4>
                <ul className="space-y-2">
                  <li><Link href="/community/discussions" className="text-slate-500 hover:text-slate-300">Diskusi</Link></li>
                  <li><Link href="/community/articles" className="text-slate-500 hover:text-slate-300">Blog</Link></li>
                  <li><Link href="/community/feedback" className="text-slate-500 hover:text-slate-300">Feedback</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-slate-300 mb-3">Legal</h4>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-slate-500 hover:text-slate-300">Privacy Policy</Link></li>
                  <li><Link href="#" className="text-slate-500 hover:text-slate-300">Terms of Service</Link></li>
                  <li><Link href="#" className="text-slate-500 hover:text-slate-300">Cookie Policy</Link></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              © 2024 DailyWorkerHub. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-slate-500 hover:text-slate-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </Link>
              <Link href="#" className="text-slate-500 hover:text-slate-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </Link>
              <Link href="#" className="text-slate-500 hover:text-slate-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
