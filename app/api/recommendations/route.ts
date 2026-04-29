import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

interface ArticleRecommendation {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image: string | null;
  likes_count: number;
  comments_count: number;
  views_count: number;
  published_at: string | null;
  category: { name: string; slug: string; color: string } | null;
}

interface ArticleRecommendationWithScore extends ArticleRecommendation {
  score: number;
}

interface DiscussionRecommendation {
  id: string;
  slug: string;
  title: string;
  content: string;
  likes_count: number;
  comments_count: number;
  views_count: number;
  created_at: string;
  category: { name: string; slug: string; color: string } | null;
}

interface DiscussionRecommendationWithScore extends DiscussionRecommendation {
  score: number;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "articles";
  const limit = Math.min(parseInt(searchParams.get("limit") || "6", 10), 20);
  const excludeSlugs = searchParams.get("exclude")?.split(",").filter(Boolean) || [];
  const category = searchParams.get("category");

  try {
    const supabase = await createClient();

    if (type === "articles") {
      let query = supabase
        .from("community.articles")
        .select(`
          id,
          slug,
          title,
          excerpt,
          cover_image,
          likes_count,
          comments_count,
          views_count,
          published_at,
          category:content_categories(name, slug, color)
        `)
        .eq("status", "published")
        .order("likes_count", { ascending: false })
        .limit(limit);

      if (excludeSlugs.length > 0) {
        query = query.not("slug", "in", `(${excludeSlugs.join(",")})`);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching article recommendations:", error);
        return NextResponse.json(
          { error: "Failed to fetch recommendations" },
          { status: 500 }
        );
      }

      const recommendations: ArticleRecommendationWithScore[] = (data || []).map((article: ArticleRecommendation) => ({
        id: article.id,
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        cover_image: article.cover_image,
        likes_count: article.likes_count,
        comments_count: article.comments_count,
        views_count: article.views_count,
        published_at: article.published_at,
        category: article.category,
        score:
          article.likes_count * 2 +
          article.comments_count * 1.5 +
          article.views_count * 0.1,
      }));

      return NextResponse.json({
        recommendations: recommendations.sort((a: ArticleRecommendationWithScore, b: ArticleRecommendationWithScore) => b.score - a.score),
        metadata: {
          source: "content-based",
          type: "articles",
          count: recommendations.length,
        },
      });
    }

    if (type === "discussions") {
      let query = supabase
        .from("community.discussions")
        .select(`
          id,
          slug,
          title,
          content,
          likes_count,
          comments_count,
          views_count,
          created_at,
          category:content_categories(name, slug, color)
        `)
        .order("likes_count", { ascending: false })
        .limit(limit);

      if (excludeSlugs.length > 0) {
        query = query.not("slug", "in", `(${excludeSlugs.join(",")})`);
      }

      if (category) {
        query = query.eq("category", category);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching discussion recommendations:", error);
        return NextResponse.json(
          { error: "Failed to fetch recommendations" },
          { status: 500 }
        );
      }

      const recommendations: DiscussionRecommendationWithScore[] = (data || []).map((discussion: DiscussionRecommendation) => ({
        id: discussion.id,
        slug: discussion.slug,
        title: discussion.title,
        excerpt:
          discussion.content.substring(0, 150).replace(/[#*]/g, "") + "...",
        likes_count: discussion.likes_count,
        comments_count: discussion.comments_count,
        views_count: discussion.views_count,
        created_at: discussion.created_at,
        category: discussion.category,
        score:
          discussion.likes_count * 2 +
          discussion.comments_count * 1.5 +
          discussion.views_count * 0.1,
      }));

      return NextResponse.json({
        recommendations: recommendations.sort((a: DiscussionRecommendationWithScore, b: DiscussionRecommendationWithScore) => b.score - a.score),
        metadata: {
          source: "content-based",
          type: "discussions",
          count: recommendations.length,
        },
      });
    }

    return NextResponse.json(
      { error: "Invalid type parameter. Use 'articles' or 'discussions'" },
      { status: 400 }
    );
  } catch (err) {
    console.error("Recommendations API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
