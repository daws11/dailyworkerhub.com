import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getArticleBySlug, getArticleTags } from "@/lib/community";
import { ArticleClient } from "./ArticleClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Artikel Tidak Ditemukan - DailyWorkerHub",
    };
  }

  return {
    title: article.title,
    description: article.excerpt || `Baca artikel ${article.title} di DailyWorkerHub Community`,
    openGraph: {
      title: article.title,
      description: article.excerpt || `Baca artikel ${article.title} di DailyWorkerHub Community`,
      url: `https://dailyworkerhub.com/community/articles/${slug}`,
      type: "article",
      images: article.cover_image ? [{ url: article.cover_image }] : [{ url: "/opengraph.jpg" }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt || undefined,
      images: article.cover_image ? [article.cover_image] : ["/opengraph.jpg"],
    },
    alternates: {
      canonical: `https://dailyworkerhub.com/community/articles/${slug}`,
    },
  };
}

async function incrementArticleViewCount(slug: string) {
  const supabase = await createClient();
  await supabase.rpc('increment_view_count', { slug });
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Artikel Tidak Ditemukan</h1>
          <p className="text-muted-foreground">Artikel yang Anda cari tidak tersedia.</p>
        </div>
      </div>
    );
  }

  const [tags] = await Promise.all([
    getArticleTags(article.id),
    incrementArticleViewCount(slug),
  ]);

  return <ArticleClient article={article} tags={tags} />;
}
