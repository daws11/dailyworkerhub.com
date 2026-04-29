"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Recommendation {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover_image?: string | null;
  likes_count: number;
  comments_count: number;
  views_count?: number;
  published_at?: string;
  created_at?: string;
  category?: {
    name: string;
    slug: string;
    color: string;
  };
}

interface RecommendationListProps {
  type?: "articles" | "discussions";
  excludeSlugs?: string[];
  limit?: number;
  title?: string;
}

export function RecommendationList({
  type = "articles",
  excludeSlugs = [],
  limit = 6,
  title = type === "articles" ? "Artikel Terkait" : "Diskusi Terkait",
}: RecommendationListProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          type,
          limit: limit.toString(),
        });

        if (excludeSlugs.length > 0) {
          params.set("exclude", excludeSlugs.join(","));
        }

        const response = await fetch(`/api/recommendations?${params}`);

        if (!response.ok) {
          throw new Error("Failed to fetch recommendations");
        }

        const data = await response.json();
        setRecommendations(data.recommendations || []);
      } catch (err) {
        console.error("Error fetching recommendations:", err);
        setError("Gagal memuat rekomendasi");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [type, limit, excludeSlugs]);

  if (isLoading) {
    return (
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-foreground mb-6">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: limit }).map((_, i) => (
            <Card key={i} className="p-4">
              <Skeleton className="h-32 w-full mb-4 rounded-lg" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-3 w-1/2" />
            </Card>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return null;
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        <Link
          href={type === "articles" ? "/community/articles" : "/community/discussions"}
          className="text-sm text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
        >
          Lihat semua <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((item) => (
          <Link
            key={item.id}
            href={
              type === "articles"
                ? `/community/articles/${item.slug}`
                : `/community/discussions/${item.slug}`
            }
            className="group"
          >
            <Card className="h-full overflow-hidden hover:border-emerald-500/50 transition-colors">
              {type === "articles" && item.cover_image && (
                <div className="relative h-32 w-full overflow-hidden">
                  <Image
                    src={item.cover_image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="p-4">
                {item.category && (
                  <span
                    className="inline-block px-2 py-0.5 text-xs rounded-full mb-2"
                    style={{
                      backgroundColor: `${item.category.color}20`,
                      color: item.category.color,
                    }}
                  >
                    {item.category.name}
                  </span>
                )}
                <h3 className="font-medium text-foreground group-hover:text-emerald-400 transition-colors line-clamp-2 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {item.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{item.likes_count} suka</span>
                  <span>{item.comments_count} komentar</span>
                  {(item.published_at || item.created_at) && (
                    <span>
                      {formatDistanceToNow(
                        new Date(item.published_at || item.created_at || ""),
                        { addSuffix: true, locale: id }
                      )}
                    </span>
                  )}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
