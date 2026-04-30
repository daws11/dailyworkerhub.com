import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getDiscussionBySlug, getDiscussionTags, getDiscussionComments } from "@/lib/community";
import { DiscussionClient } from "./DiscussionClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const discussion = await getDiscussionBySlug(slug);

  if (!discussion) {
    return {
      title: "Diskusi Tidak Ditemukan - DailyWorkerHub",
    };
  }

  const description = discussion.content.substring(0, 160).replace(/[#*]/g, "");

  return {
    title: discussion.title,
    description,
    openGraph: {
      title: discussion.title,
      description,
      url: `https://dailyworkerhub.com/community/discussions/${slug}`,
      type: "website",
      images: [{ url: "/opengraph.jpg" }],
    },
    twitter: {
      card: "summary_large_image",
      title: discussion.title,
      description,
      images: ["/opengraph.jpg"],
    },
    alternates: {
      canonical: `https://dailyworkerhub.com/community/discussions/${slug}`,
    },
  };
}

async function incrementDiscussionViewCount(slug: string) {
  const supabase = await createClient();
  const { data: current } = await supabase
    .from('community_discussions')
    .select('views_count')
    .eq('slug', slug)
    .single();
  if (current) {
    const { error } = await supabase
      .from('community_discussions')
      .update({ views_count: (current.views_count || 0) + 1 } as any)
      .eq('slug', slug);
    if (error) {
      console.error('Error incrementing discussion view count:', error);
    }
  }
}

export default async function DiscussionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const discussion = await getDiscussionBySlug(slug);

  if (!discussion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Diskusi Tidak Ditemukan</h1>
          <p className="text-muted-foreground">Diskusi yang Anda cari tidak tersedia.</p>
        </div>
      </div>
    );
  }

  const [tags, comments] = await Promise.all([
    getDiscussionTags(discussion.id),
    getDiscussionComments(discussion.id),
    incrementDiscussionViewCount(slug),
  ]);

  return <DiscussionClient discussion={discussion} tags={tags} comments={comments} />;
}
