import type { Metadata } from "next";
import { getProfileByUsername, getUserArticles, getUserDiscussions, getUserComments } from "@/lib/community";
import { ProfileClient } from "./ProfileClient";

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  const profile = await getProfileByUsername(username);

  if (!profile) {
    return {
      title: "Profil Tidak Ditemukan - DailyWorkerHub",
    };
  }

  return {
    title: `${profile.full_name || profile.username} (@${profile.username})`,
    description: profile.bio || `Profil ${profile.full_name || profile.username} di DailyWorkerHub Community`,
    openGraph: {
      title: `${profile.full_name || profile.username} (@${profile.username})`,
      description: profile.bio || `Profil ${profile.full_name || profile.username} di DailyWorkerHub Community`,
      images: profile.avatar_url ? [{ url: profile.avatar_url }] : [{ url: "/opengraph.jpg" }],
    },
    twitter: {
      card: "summary",
      title: `${profile.full_name || profile.username} (@${profile.username})`,
      description: profile.bio || undefined,
      images: profile.avatar_url ? [profile.avatar_url] : ["/opengraph.jpg"],
    },
  };
}

export default async function ProfilePage({ params }: PageProps) {
  const { username } = await params;
  const profile = await getProfileByUsername(username);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Profil Tidak Ditemukan</h1>
          <p className="text-muted-foreground">Pengguna dengan username &quot;{username}&quot; tidak ditemukan.</p>
        </div>
      </div>
    );
  }

  const [articles, discussions, comments] = await Promise.all([
    getUserArticles(profile.id),
    getUserDiscussions(profile.id),
    getUserComments(profile.id),
  ]);

  return <ProfileClient profile={profile} articles={articles} discussions={discussions} comments={comments} />;
}
