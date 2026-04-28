'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createArticle(formData: FormData) {
  const supabase = await createClient()

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const excerpt = formData.get('excerpt') as string
  const categoryId = formData.get('category_id') as string
  const coverImage = formData.get('cover_image') as string

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .substring(0, 100)

  const { data, error } = await supabase
    .schema('community')
    .from('articles')
    .insert({
      title,
      content,
      excerpt: excerpt || content.substring(0, 200),
      slug: `${slug}-${Date.now().toString(36)}`,
      author_id: user.id,
      category_id: categoryId || null,
      cover_image: coverImage || null,
      status: 'draft',
      read_time: Math.ceil(content.split(/\s+/).length / 200),
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating article:', error)
    throw new Error('Failed to create article')
  }

  revalidatePath('/community/articles')
  return data
}

export async function publishArticle(articleId: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  const { data, error } = await supabase
    .schema('community')
    .from('articles')
    .update({
      status: 'published',
      published_at: new Date().toISOString(),
    })
    .eq('id', articleId)
    .eq('author_id', user.id)
    .select()
    .single()

  if (error) {
    console.error('Error publishing article:', error)
    throw new Error('Failed to publish article')
  }

  revalidatePath(`/community/articles/${data.slug}`)
  return data
}

export async function updateArticle(articleId: string, formData: FormData) {
  const supabase = await createClient()

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const excerpt = formData.get('excerpt') as string
  const categoryId = formData.get('category_id') as string
  const coverImage = formData.get('cover_image') as string

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  const { data, error } = await supabase
    .schema('community')
    .from('articles')
    .update({
      title,
      content,
      excerpt: excerpt || content.substring(0, 200),
      category_id: categoryId || null,
      cover_image: coverImage || null,
      read_time: Math.ceil(content.split(/\s+/).length / 200),
    })
    .eq('id', articleId)
    .eq('author_id', user.id)
    .select()
    .single()

  if (error) {
    console.error('Error updating article:', error)
    throw new Error('Failed to update article')
  }

  revalidatePath(`/community/articles/${data.slug}`)
  return data
}