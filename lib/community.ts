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
    .from('community.articles')
    .select(`
      *,
      author:community.profiles(id, full_name, avatar_url)
    `)
    .eq('status', 'published')
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
    .from('community.discussions')
    .select(`
      *,
      author:community.profiles(id, full_name, avatar_url)
    `)
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
    .from('community.discussions')
    .select(`
      *,
      author:community.profiles(id, full_name, avatar_url)
    `)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching recent discussions:', error)
    return []
  }

  return data || []
}

export async function getArticleBySlug(slug: string): Promise<{
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  read_time: number | null;
  view_count: number;
  likes_count: number;
  published_at: string | null;
  created_at: string;
  author: {
    username: string;
    full_name: string | null;
    avatar_url: string | null;
    bio: string | null;
  } | null;
  category: {
    id: string;
    name: string;
    slug: string;
    color: string;
  } | null;
} | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('community.articles')
    .select(`
      id, slug, title, subtitle, excerpt, content, cover_image,
      read_time, view_count, likes_count, published_at, created_at,
      author:community.profiles(id, username, full_name, avatar_url, bio),
      category:content_categories(id, name, slug, color)
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) {
    console.error('Error fetching article by slug:', error)
    return null
  }

  return data
}

export async function getDiscussionBySlug(slug: string): Promise<{
  id: string;
  slug: string;
  title: string;
  content: string;
  status: string;
  view_count: number;
  likes_count: number;
  comments_count: number;
  is_pinned: boolean;
  created_at: string;
  author: {
    username: string;
    full_name: string | null;
    avatar_url: string | null;
  } | null;
  category: {
    id: string;
    name: string;
    slug: string;
    color: string;
  } | null;
} | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('community.discussions')
    .select(`
      id, slug, title, content, status, view_count, likes_count,
      comments_count, is_pinned, created_at,
      author:community.profiles(id, username, full_name, avatar_url),
      category:content_categories(id, name, slug, color)
    `)
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching discussion by slug:', error)
    return null
  }

  return data
}

export async function getCommunityStats(): Promise<CommunityStats> {
  const supabase = await createClient()

  const [discussionsResult, articlesResult, profilesResult, feedbackResult] = await Promise.all([
    supabase.from('community.discussions').select('id', { count: 'exact', head: true }),
    supabase.from('community.articles').select('id', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('community.profiles').select('id', { count: 'exact', head: true }),
    supabase.from('community.feedback_items').select('id', { count: 'exact', head: true }).eq('status', 'completed'),
  ])

  return {
    discussions: discussionsResult.count || 0,
    articles: articlesResult.count || 0,
    members: profilesResult.count || 0,
    feedbackAnswered: feedbackResult.count || 0,
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

export async function getArticleTags(articleId: string): Promise<{ id: string; name: string; slug: string }[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('community.article_tags')
    .select(`
      tag:community.tags(id, name, slug)
    `)
    .eq('article_id', articleId)

  if (error) {
    console.error('Error fetching article tags:', error)
    return []
  }

  return (data || []).map((item: { tag: unknown }) => (item.tag as unknown as { id: string; name: string; slug: string }))
}

export async function getDiscussionTags(discussionId: string): Promise<{ id: string; name: string; slug: string }[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('community.discussion_tags')
    .select(`
      tag:community.tags(id, name, slug)
    `)
    .eq('discussion_id', discussionId)

  if (error) {
    console.error('Error fetching discussion tags:', error)
    return []
  }

  return (data || []).map((item: { tag: unknown }) => (item.tag as unknown as { id: string; name: string; slug: string }))
}

export interface Comment {
  id: string
  content: string
  author_id: string
  parent_id: string | null
  is_solution: boolean
  likes_count: number
  created_at: string
  deleted_at: string | null
  author: {
    username: string
    full_name: string | null
    avatar_url: string | null
  }
  replies?: Comment[]
}

export async function getDiscussionComments(discussionId: string): Promise<Comment[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('community.comments')
    .select(`
      id,
      content,
      author_id,
      parent_id,
      is_solution,
      likes_count,
      created_at,
      author:community.profiles(id, username, full_name, avatar_url)
    `)
    .eq('discussion_id', discussionId)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching comments:', error)
    return []
  }

  const comments: Comment[] = data || []

  // Build nested structure
  const commentMap = new Map<string, Comment>()
  const topLevelComments: Comment[] = []

  comments.forEach(comment => {
    const mapped: Comment = {
      ...comment,
      deleted_at: null,
      replies: []
    }
    commentMap.set(comment.id, mapped)
  })

  commentMap.forEach(comment => {
    if (comment.parent_id && commentMap.has(comment.parent_id)) {
      const parent = commentMap.get(comment.parent_id)!
      if (!parent.replies) parent.replies = []
      parent.replies.push(comment)
    } else if (!comment.parent_id) {
      topLevelComments.push(comment)
    }
  })

  return topLevelComments
}