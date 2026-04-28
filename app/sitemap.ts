import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

interface SitemapEntry {
  slug: string
  updated_at: string
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()

  const [articlesResult, discussionsResult, docsResult]: [{ data: SitemapEntry[] | null }, { data: SitemapEntry[] | null }, { data: SitemapEntry[] | null }] = await Promise.all([
    supabase.schema('community').from('articles').select('slug,updated_at').eq('status', 'published') as { data: SitemapEntry[] | null },
    supabase.schema('community').from('discussions').select('slug,updated_at') as { data: SitemapEntry[] | null },
    supabase.schema('community').from('docs').select('slug,updated_at').eq('status', 'published') as { data: SitemapEntry[] | null }
  ])

  const baseUrl = 'https://dailyworkerhub.com'

  const routes = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/community`, lastModified: new Date() },
    { url: `${baseUrl}/privacy`, lastModified: new Date() },
    { url: `${baseUrl}/terms`, lastModified: new Date() },
    { url: `${baseUrl}/cookies`, lastModified: new Date() },
  ]

  const docRoutes = [
    { url: `${baseUrl}/docs`, lastModified: new Date() },
    { url: `${baseUrl}/docs/getting-started`, lastModified: new Date() },
    { url: `${baseUrl}/docs/getting-started/persiapan-dasar`, lastModified: new Date() },
    { url: `${baseUrl}/docs/getting-started/membuat-akun`, lastModified: new Date() },
    { url: `${baseUrl}/docs/platform-guide`, lastModified: new Date() },
    { url: `${baseUrl}/docs/platform-guide/cara-mencari-lowongan`, lastModified: new Date() },
    { url: `${baseUrl}/docs/platform-guide/cara-posting-lowongan`, lastModified: new Date() },
    { url: `${baseUrl}/docs/fitur`, lastModified: new Date() },
    { url: `${baseUrl}/docs/fitur/protection-pool`, lastModified: new Date() },
    { url: `${baseUrl}/docs/fitur/escrow-system`, lastModified: new Date() },
  ]

  const articleRoutes = (articlesResult.data || []).map((a: SitemapEntry) => ({
    url: `${baseUrl}/community/articles/${a.slug}`,
    lastModified: new Date(a.updated_at)
  }))

  const discussionRoutes = (discussionsResult.data || []).map((d: SitemapEntry) => ({
    url: `${baseUrl}/community/discussions/${d.slug}`,
    lastModified: new Date(d.updated_at)
  }))

  const communityDocRoutes = (docsResult.data || []).map((d: SitemapEntry) => ({
    url: `${baseUrl}/community/docs/${d.slug}`,
    lastModified: new Date(d.updated_at)
  }))

  return [...routes, ...docRoutes, ...articleRoutes, ...discussionRoutes, ...communityDocRoutes]
}
