import { createClient } from './supabase/server'

export interface Discussion {
  id: string
  title: string
  content: string
  slug: string
  author_id: string | null
  category: string
  tags: string[]
  likes_count: number
  comments_count: number
  views_count: number
  is_pinned: boolean
  is_locked: boolean
  created_at: string
  updated_at: string
  author?: {
    full_name: string | null
    avatar_url: string | null
  }
}

export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image: string | null
  author_id: string | null
  category: string
  tags: string[]
  read_time: number
  likes_count: number
  comments_count: number
  views_count: number
  is_published: boolean
  is_featured: boolean
  published_at: string | null
  created_at: string
  author?: {
    full_name: string | null
    avatar_url: string | null
  }
}

export interface CommunityStats {
  discussions: number
  articles: number
  members: number
  feedbackAnswered: number
}

export async function getFeaturedArticles(limit = 3): Promise<Article[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('community_articles')
    .select(`
      *,
      author:users(full_name, avatar_url)
    `)
    .eq('is_published', true)
    .eq('is_featured', true)
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching featured articles:', error)
    return []
  }

  return data || []
}

export async function getPopularDiscussions(limit = 5): Promise<Discussion[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('community_discussions')
    .select(`
      *,
      author:users(full_name, avatar_url)
    `)
    .eq('is_deleted', false)
    .order('likes_count', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching popular discussions:', error)
    return []
  }

  return data || []
}

export async function getRecentDiscussions(limit = 10): Promise<Discussion[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('community_discussions')
    .select(`
      *,
      author:users(full_name, avatar_url)
    `)
    .eq('is_deleted', false)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching recent discussions:', error)
    return []
  }

  return data || []
}

export async function getCommunityStats(): Promise<CommunityStats> {
  const supabase = await createClient()

  const [discussionsResult, articlesResult, usersResult] = await Promise.all([
    supabase
      .from('community_discussions')
      .select('id', { count: 'exact', head: true })
      .eq('is_deleted', false),
    supabase
      .from('community_articles')
      .select('id', { count: 'exact', head: true })
      .eq('is_published', true),
    supabase
      .from('users')
      .select('id', { count: 'exact', head: true })
  ])

  return {
    discussions: discussionsResult.count || 0,
    articles: articlesResult.count || 0,
    members: usersResult.count || 0,
    feedbackAnswered: 0,
  }
}

export function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return 'baru saja'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} menit lalu`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} jam lalu`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} hari lalu`
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}
