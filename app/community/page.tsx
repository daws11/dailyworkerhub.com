import type { Metadata } from "next";
import { Link } from "@/i18n/navigation"
import Image from "next/image"
import { MessageSquare, FileText, BookOpen, Vote, Sparkles, TrendingUp, Briefcase, ChevronRight, ArrowUp, MessageCircle, Eye, Zap } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { getFeaturedArticles, getPopularDiscussions, getCommunityStats, formatTimeAgo } from "@/lib/community"
import { CommunityNavbar } from "@/components/layout/community/CommunityNavbar"
import CommunityChatDemo from "@/components/community/CommunityChatDemo"
import { CommunitySearch } from "@/components/community/CommunitySearch"

export const metadata: Metadata = {
  title: "Komunitas Pekerja Harian Indonesia - Daily Worker Hub",
  description: "Bergabunglah dengan komunitas pekerja harian Indonesia. Diskusi, pelajari tips karier, berbagi pengalaman, dan berkembang bersama ribuan daily worker di seluruh Indonesia.",
  openGraph: {
    title: "Komunitas Pekerja Harian Indonesia - Daily Worker Hub",
    description: "Bergabunglah dengan komunitas pekerja harian Indonesia. Diskusi, pelajari tips karier, berbagi pengalaman.",
    locale: "id_ID",
    siteName: "Daily Worker Hub",
    type: "website",
    images: [
      {
        url: "/opengraph.jpg",
        width: 1200,
        height: 630,
        alt: "Daily Worker Hub Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph.jpg"],
  },
  alternates: {
    canonical: "https://dailyworkerhub.com/community",
  },
  other: {
    "script:ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Komunitas Pekerja Harian Indonesia",
      description: "Bergabunglah dengan komunitas pekerja harian Indonesia. Diskusi, pelajari tips karier, berbagi pengalaman, dan berkembang bersama ribuan daily worker di seluruh Indonesia.",
      url: "https://dailyworkerhub.com/community",
      isPartOf: {
        "@type": "WebSite",
        name: "Daily Worker Hub",
        url: "https://dailyworkerhub.com",
      },
      about: {
        "@type": "Thing",
        name: "Komunitas Pekerja Harian Indonesia",
        description: "Pusat komunitas untuk pekerja harian lepas dan pelaku usaha di Indonesia",
      },
    }),
  },
};

export default async function CommunityPage() {
  const t = await getTranslations("community")

  const [articles, discussions, stats] = await Promise.all([
    getFeaturedArticles(3),
    getPopularDiscussions(5),
    getCommunityStats(),
  ])

  const shortcuts = [
    { label: t("newestDiscussions"), icon: MessageSquare, href: "/community/discussions?sort=newest" },
    { label: t("popularArticles"), icon: TrendingUp, href: "/community/articles?sort=popular" },
    { label: t("careerGuide"), icon: BookOpen, href: "/docs/getting-started" },
    { label: t("productFeedback"), icon: Vote, href: "/community/feedback" },
    { label: t("findJobs"), icon: Briefcase, href: "/" },
  ]

  const hasData = articles.length > 0 || discussions.length > 0

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CommunityNavbar />

      {/* Hero / Command Center */}
      <section className="relative min-h-screen flex items-center bg-radial-green pt-20 pb-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column — Content */}
            <div className="text-center lg:text-left">
              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  {t("heroTitle")}
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-xl">
                {stats.members.toLocaleString()} {t("heroSubtitle")}
              </p>

              {/* Search */}
              <CommunitySearch />

              {/* Shortcut Pills */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 mt-5 sm:mt-6">
                {shortcuts.map((shortcut) => (
                  <Link
                    key={shortcut.label}
                    href={shortcut.href}
                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-muted-foreground bg-muted/50 border border-border rounded-full hover:bg-muted hover:border-emerald-500/50 hover:text-emerald-400 transition-all duration-300"
                  >
                    <shortcut.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{shortcut.label}</span>
                  </Link>
                ))}
              </div>

              {/* Social Proof */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 mt-7 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-full border-2 border-background bg-emerald-500/20 flex items-center justify-center text-[10px] font-medium text-emerald-400"
                      >
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  <span>+{stats.members.toLocaleString()} member</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span>{stats.discussions.toLocaleString()}+ diskusi aktif</span>
                </div>
              </div>
            </div>

            {/* Right Column — Animated Chat Preview */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Glow behind chat */}
                <div className="absolute inset-0 bg-emerald-500/10 rounded-2xl blur-2xl" />
                <div className="relative bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-3 sm:p-4">
                  <div className="flex items-center gap-2 px-2 pb-3 border-b border-border/50 mb-1">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs text-muted-foreground">Live preview</span>
                    </div>
                    <span className="text-xs text-emerald-400/80 ml-auto font-medium">{t("liveChat")}</span>
                  </div>
                  <CommunityChatDemo />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-border bg-card/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center gap-8 sm:gap-16">
            {[
              { label: t("discussions"), value: stats.discussions, suffix: "+" },
              { label: t("articles"), value: stats.articles, suffix: "" },
              { label: t("members"), value: stats.members, suffix: "+" },
              { label: t("feedbackAnswered"), value: stats.feedbackAnswered, suffix: "" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2 text-sm">
                <span className="text-emerald-400 font-semibold text-lg">
                  {stat.value.toLocaleString()}{stat.suffix}
                </span>
                <span className="text-muted-foreground">{stat.label}</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-foreground">{t("latestArticles")}</h2>
            <Link
              href="/community/articles"
              className="text-sm text-emerald-400 hover:text-emerald-300 hover:underline flex items-center gap-1"
            >
              {t("viewAll")}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {hasData && articles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/community/articles/${article.slug}`}
                  className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-emerald-500/30 card-hover hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all duration-300"
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
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/50 to-card" />
                    )}
                    <span className="absolute top-4 left-4 px-3 py-1 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {article.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-emerald-400 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {article.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
                      {article.author && (
                        <>
                          <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                            <span className="text-emerald-400 text-xs font-medium">
                              {article.author.full_name?.charAt(0) || 'A'}
                            </span>
                          </div>
                          <span className="text-muted-foreground">{article.author.full_name || 'Anonymous'}</span>
                          <span>•</span>
                        </>
                      )}
                      {article.read_time && <span>{article.read_time} {t("minRead")}</span>}
                      {article.published_at && (
                        <>
                          <span>•</span>
                          <span>{new Date(article.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground/70">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>{t("noArticlesYet")}</p>
              <Link
                href="/community/articles/editor"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 text-sm font-medium rounded-full bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                {t("writeArticle")}
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Popular Discussions */}
      <section className="py-16 bg-card/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-foreground">{t("popularDiscussions")}</h2>
            <Link
              href="/community/discussions"
              className="text-sm text-emerald-400 hover:text-emerald-300 hover:underline flex items-center gap-1"
            >
              {t("viewAll")}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {hasData && discussions.length > 0 ? (
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Featured Discussion */}
              <Link
                href={`/community/discussions/${discussions[0].slug}`}
                className="group bg-card border border-border rounded-2xl p-6 hover:border-emerald-500/30 card-hover hover:-translate-y-1 transition-all duration-300"
              >
                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
                  {discussions[0].category}
                </span>
                <h3 className="text-lg font-semibold text-foreground mb-4 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                  {discussions[0].title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {discussions[0].author?.full_name || 'Anonymous'} • {formatTimeAgo(discussions[0].created_at)}
                </p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <ArrowUp className="w-4 h-4" />
                    <span>{discussions[0].likes_count}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MessageCircle className="w-4 h-4" />
                    <span>{discussions[0].comments_count}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Eye className="w-4 h-4" />
                    <span>{discussions[0].views_count}</span>
                  </div>
                </div>
              </Link>

              {/* Discussion List */}
              <div className="bg-card border border-border rounded-2xl divide-y divide-border">
                {discussions.slice(1, 5).map((discussion) => (
                  <Link
                    key={discussion.id}
                    href={`/community/discussions/${discussion.slug}`}
                    className="flex items-start gap-4 p-4 hover:bg-muted/30 transition-colors"
                  >
                    {/* Vote Pill */}
                    <div className="flex flex-col items-center px-3 py-2 bg-muted/50 border border-border rounded-xl">
                      <ArrowUp className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground/80">{discussion.likes_count}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground">
                          {discussion.category}
                        </span>
                      </div>
                      <h4 className="text-sm font-medium text-foreground line-clamp-1 group-hover:text-emerald-400 transition-colors">
                        {discussion.title}
                      </h4>
                      <p className="text-xs text-muted-foreground/70 mt-1">
                        {discussion.author?.full_name || 'Anonymous'} • {formatTimeAgo(discussion.created_at)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground/70">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>{t("noDiscussionsYet")}</p>
              <Link
                href="/community/discussions/new"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 text-sm font-medium rounded-full bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                {t("startDiscussion")}
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-emerald-900/20 to-card border-y border-emerald-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4">
            {t("haveQuestion")}
          </h2>
          <p className="text-muted-foreground mb-8">
            {t("startDiscussionCTA")}
          </p>
          <Link
            href="/community/discussions/new"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-full bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            {t("startDiscussion")}
          </Link>
        </div>
      </section>
    </div>
  )
}