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

type ProfileRow = {
  id: string
  username: string
  full_name: string | null
  avatar_url: string | null
  bio: string | null
}

type CategoryRow = {
  id: string
  name: string
  slug: string
  color: string | null
}

async function getProfilesByIds(supabase: any, ids: string[]): Promise<Map<string, ProfileRow>> {
  const map = new Map<string, ProfileRow>()
  if (ids.length === 0) return map

  const { data } = await supabase
    .from('profiles')
    .select('id, username, full_name, avatar_url, bio')
    .in('id', ids)

  if (data) {
    for (const p of data) {
      map.set(p.id, p)
    }
  }
  return map
}

async function getCategoriesBySlugs(supabase: any, slugs: string[]): Promise<Map<string, CategoryRow>> {
  const map = new Map<string, CategoryRow>()
  if (slugs.length === 0) return map

  const { data } = await supabase
    .from('categories')
    .select('id, name, slug, color')
    .in('slug', slugs)

  if (data) {
    for (const c of data) {
      map.set(c.slug, c)
    }
  }
  return map
}

export async function getFeaturedArticles(limit = 3): Promise<Article[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('community_articles')
    .select('*')
    .eq('is_published', true)
    .eq('is_deleted', false)
    .eq('is_featured', true)
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching featured articles:', error)
    return []
  }

  if (!data?.length) return []

  const authorIds = [...new Set(data.map((a: any) => a.author_id).filter(Boolean))] as string[]
  const profiles = await getProfilesByIds(supabase, authorIds)

  return data.map((item: any) => ({
    ...item,
    author: profiles.get(item.author_id) || undefined,
  }))
}

export async function getPopularDiscussions(limit = 5): Promise<Discussion[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('community_discussions')
    .select('*')
    .eq('is_deleted', false)
    .order('likes_count', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching popular discussions:', error)
    return []
  }

  if (!data?.length) return []

  const authorIds = [...new Set(data.map((d: any) => d.author_id).filter(Boolean))] as string[]
  const profiles = await getProfilesByIds(supabase, authorIds)

  return data.map((item: any) => ({
    ...item,
    author: profiles.get(item.author_id) || undefined,
  }))
}

export async function getRecentDiscussions(limit = 10): Promise<Discussion[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('community_discussions')
    .select('*')
    .eq('is_deleted', false)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching recent discussions:', error)
    return []
  }

  if (!data?.length) return []

  const authorIds = [...new Set(data.map((d: any) => d.author_id).filter(Boolean))] as string[]
  const profiles = await getProfilesByIds(supabase, authorIds)

  return data.map((item: any) => ({
    ...item,
    author: profiles.get(item.author_id) || undefined,
  }))
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

  const { data: item, error } = await supabase
    .from('community_articles')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .eq('is_deleted', false)
    .single()

  if (error || !item) {
    console.error('Error fetching article by slug:', error)
    return null
  }

  let author = null
  if (item.author_id) {
    const profiles = await getProfilesByIds(supabase, [item.author_id])
    author = profiles.get(item.author_id) || null
  }

  let category = null
  if (item.category) {
    const catSlug = (item.category as string).toLowerCase()
    const categories = await getCategoriesBySlugs(supabase, [catSlug])
    const cat = categories.get(catSlug)
    category = cat ? { id: cat.id, name: cat.name, slug: cat.slug, color: cat.color || '#10B981' } : { id: '', name: item.category as string, slug: catSlug, color: '#10B981' }
  }

  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    subtitle: null,
    excerpt: item.excerpt,
    content: item.content,
    cover_image: item.cover_image,
    read_time: item.read_time,
    view_count: item.views_count || 0,
    likes_count: item.likes_count || 0,
    published_at: item.published_at,
    created_at: item.created_at,
    author,
    category,
  }
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

  const { data: item, error } = await supabase
    .from('community_discussions')
    .select('*')
    .eq('slug', slug)
    .eq('is_deleted', false)
    .single()

  if (error || !item) {
    console.error('Error fetching discussion by slug:', error)
    return null
  }

  let author = null
  if (item.author_id) {
    const profiles = await getProfilesByIds(supabase, [item.author_id])
    author = profiles.get(item.author_id) || null
  }

  let category = null
  if (item.category) {
    const catSlug = (item.category as string).toLowerCase()
    const categories = await getCategoriesBySlugs(supabase, [catSlug])
    const cat = categories.get(catSlug)
    category = cat ? { id: cat.id, name: cat.name, slug: cat.slug, color: cat.color || '#10B981' } : { id: '', name: item.category as string, slug: catSlug, color: '#10B981' }
  }

  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    content: item.content,
    status: item.is_locked ? 'locked' : 'open',
    view_count: item.views_count || 0,
    likes_count: item.likes_count || 0,
    comments_count: item.comments_count || 0,
    is_pinned: item.is_pinned || false,
    created_at: item.created_at,
    author,
    category,
  }
}

export interface ProfileData {
  id: string
  username: string
  full_name: string | null
  avatar_url: string | null
  bio: string | null
  role: string
  created_at: string
}

export async function getProfileByUsername(username: string): Promise<ProfileData | null> {
  const supabase = await createClient()

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('id, username, full_name, avatar_url, bio, role, created_at')
    .eq('username', username)
    .single()

  if (error || !profile) {
    console.error('Error fetching profile by username:', error)
    return null
  }

  return profile
}

export async function getUserArticles(authorId: string): Promise<Array<{
  id: string
  slug: string
  title: string
  excerpt: string | null
  cover_image: string | null
  category: string
  read_time: number | null
  likes_count: number
  comments_count: number
  views_count: number
  is_featured: boolean
  published_at: string | null
}>> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('community_articles')
    .select('id, slug, title, excerpt, cover_image, category, read_time, likes_count, comments_count, views_count, is_featured, published_at')
    .eq('author_id', authorId)
    .eq('is_published', true)
    .eq('is_deleted', false)
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching user articles:', error)
    return []
  }

  return data || []
}

export async function getUserDiscussions(authorId: string): Promise<Array<{
  id: string
  slug: string
  title: string
  category: string
  likes_count: number
  comments_count: number
  views_count: number
  is_pinned: boolean
  created_at: string
}>> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('community_discussions')
    .select('id, slug, title, category, likes_count, comments_count, views_count, is_pinned, created_at')
    .eq('author_id', authorId)
    .eq('is_deleted', false)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching user discussions:', error)
    return []
  }

  return data || []
}

export async function getUserComments(authorId: string): Promise<Array<{
  id: string
  discussion_id: string | null
  article_id: string | null
  content: string
  likes_count: number
  created_at: string
}>> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('comments')
    .select('id, discussion_id, article_id, content, likes_count, created_at')
    .eq('author_id', authorId)
    .eq('is_deleted', false)
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) {
    console.error('Error fetching user comments:', error)
    return []
  }

  return data || []
}

export async function getCommunityStats(): Promise<CommunityStats> {
  const supabase = await createClient()

  const [discussionsResult, articlesResult, profilesResult] = await Promise.all([
    supabase.from('discussions').select('id', { count: 'exact', head: true }).eq('is_deleted', false),
    supabase.from('articles').select('id', { count: 'exact', head: true }).eq('is_published', true).eq('is_deleted', false),
    supabase.from('profiles').select('id', { count: 'exact', head: true }),
  ])

  return {
    discussions: discussionsResult.count || 0,
    articles: articlesResult.count || 0,
    members: profilesResult.count || 0,
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

export async function getArticleTags(articleId: string): Promise<{ id: string; name: string; slug: string }[]> {
  return []
}

export async function getDiscussionTags(discussionId: string): Promise<{ id: string; name: string; slug: string }[]> {
  return []
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
    .from('comments')
    .select('*')
    .eq('discussion_id', discussionId)
    .eq('is_deleted', false)
    .order('created_at', { ascending: true })

  if (error || !data) {
    console.error('Error fetching comments:', error)
    return []
  }

  const authorIds = [...new Set(data.map((c: any) => c.author_id).filter(Boolean))] as string[]
  const profiles = await getProfilesByIds(supabase, authorIds)

  const comments: Comment[] = data.map((c: any) => ({
    id: c.id,
    content: c.content,
    author_id: c.author_id,
    parent_id: c.parent_id,
    is_solution: false,
    likes_count: c.likes_count || 0,
    created_at: c.created_at,
    deleted_at: null,
    author: profiles.get(c.author_id) || { username: 'unknown', full_name: null, avatar_url: null },
    replies: [],
  }))

  // Build nested structure
  const commentMap = new Map<string, Comment>()
  const topLevelComments: Comment[] = []

  comments.forEach(comment => {
    commentMap.set(comment.id, comment)
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
