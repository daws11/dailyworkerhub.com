import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

interface SitemapEntry {
  slug: string
  updated_at: string
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()

  const [articlesResult, discussionsResult]: [{ data: SitemapEntry[] | null }, { data: SitemapEntry[] | null }] = await Promise.all([
    supabase.from('community_articles').select('slug,updated_at').eq('is_published', true).eq('is_deleted', false) as { data: SitemapEntry[] | null },
    supabase.from('community_discussions').select('slug,updated_at').eq('is_deleted', false) as { data: SitemapEntry[] | null },
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
    { url: `${baseUrl}/docs/id`, lastModified: new Date() },
    { url: `${baseUrl}/docs/id/getting-started`, lastModified: new Date() },
    { url: `${baseUrl}/docs/id/getting-started/persiapan-dasar`, lastModified: new Date() },
    { url: `${baseUrl}/docs/id/getting-started/membuat-akun`, lastModified: new Date() },
    { url: `${baseUrl}/docs/id/platform-guide`, lastModified: new Date() },
    { url: `${baseUrl}/docs/id/platform-guide/cara-mencari-lowongan`, lastModified: new Date() },
    { url: `${baseUrl}/docs/id/platform-guide/cara-posting-lowongan`, lastModified: new Date() },
    { url: `${baseUrl}/docs/id/fitur`, lastModified: new Date() },
    { url: `${baseUrl}/docs/id/fitur/dana-perlindungan`, lastModified: new Date() },
    { url: `${baseUrl}/docs/id/fitur/sistem-dana-jaminan`, lastModified: new Date() },
    { url: `${baseUrl}/docs/id/fitur/penyelesaian-perselisihan`, lastModified: new Date() },
    { url: `${baseUrl}/docs/en`, lastModified: new Date() },
    { url: `${baseUrl}/docs/en/getting-started`, lastModified: new Date() },
    { url: `${baseUrl}/docs/en/getting-started/basic-preparation`, lastModified: new Date() },
    { url: `${baseUrl}/docs/en/platform-guide`, lastModified: new Date() },
    { url: `${baseUrl}/docs/en/platform-guide/how-to-find-jobs`, lastModified: new Date() },
    { url: `${baseUrl}/docs/en/fitur`, lastModified: new Date() },
    { url: `${baseUrl}/docs/en/fitur/escrow-system`, lastModified: new Date() },
  ]

  const articleRoutes = (articlesResult.data || []).map((a: SitemapEntry) => ({
    url: `${baseUrl}/community/articles/${a.slug}`,
    lastModified: new Date(a.updated_at),
  }))

  const discussionRoutes = (discussionsResult.data || []).map((d: SitemapEntry) => ({
    url: `${baseUrl}/community/discussions/${d.slug}`,
    lastModified: new Date(d.updated_at),
  }))

  return [...routes, ...docRoutes, ...articleRoutes, ...discussionRoutes]
}
