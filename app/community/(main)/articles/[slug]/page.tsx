import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getArticleBySlug, getArticleTags } from "@/lib/community";
import { getArticleMetadata, getBreadcrumbSchema } from "@/lib/seo";
import { ArticleClient } from "./ArticleClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Artikel Tidak Ditemukan - Daily Worker Hub",
    };
  }

  const canonical = `https://dailyworkerhub.com/community/articles/${slug}`;

  const metadata = getArticleMetadata(
    article.title,
    article.excerpt || `Baca artikel ${article.title} di Daily Worker Hub Community`,
    canonical,
    {
      image: article.cover_image || undefined,
      publishedAt: article.published_at || undefined,
      author: article.author?.full_name || article.author?.username || undefined,
    }
  );

  const breadcrumbItems = [
    { name: "Beranda", url: "https://dailyworkerhub.com" },
    { name: "Komunitas", url: "https://dailyworkerhub.com/community" },
    { name: "Artikel", url: "https://dailyworkerhub.com/community/articles" },
    { name: article.title, url: canonical },
  ];

  // Merge Article schema from getArticleMetadata with BreadcrumbList schema
  const articleSchema = (metadata.other as Record<string, string>)?.["script:ld+json"];
  const combinedSchemas = [
    ...(articleSchema ? [JSON.parse(articleSchema)] : []),
    getBreadcrumbSchema(breadcrumbItems),
  ];

  return {
    ...metadata,
    other: {
      "script:ld+json": JSON.stringify(combinedSchemas),
    },
  };
}

async function incrementArticleViewCount(slug: string) {
  const supabase = await createClient();
  // Increment view count: first read, then update
  const { data: current } = await supabase
    .from('community_articles')
    .select('views_count')
    .eq('slug', slug)
    .single();
  if (current) {
    const { error } = await supabase
      .from('community_articles')
      .update({ views_count: (current.views_count || 0) + 1 } as any)
      .eq('slug', slug);
    if (error) {
      console.error('Error incrementing view count:', error);
    }
  }
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
