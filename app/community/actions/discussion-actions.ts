'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createDiscussion(formData: FormData) {
  const supabase = await createClient()

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const categoryId = formData.get('category_id') as string

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
    .from('discussions')
    .insert({
      title,
      content,
      slug: `${slug}-${Date.now().toString(36)}`,
      author_id: user.id,
      category_id: categoryId || null,
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating discussion:', error)
    throw new Error('Failed to create discussion')
  }

  revalidatePath('/community/discussions')
  return data
}

export async function updateDiscussion(discussionId: string, formData: FormData) {
  const supabase = await createClient()

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const categoryId = formData.get('category_id') as string

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  const { data, error } = await supabase
    .schema('community')
    .from('discussions')
    .update({
      title,
      content,
      category_id: categoryId || null,
    })
    .eq('id', discussionId)
    .eq('author_id', user.id)
    .select()
    .single()

  if (error) {
    console.error('Error updating discussion:', error)
    throw new Error('Failed to update discussion')
  }

  revalidatePath(`/community/discussions/${data.slug}`)
  return data
}

export async function deleteDiscussion(discussionId: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  const { error } = await supabase
    .schema('community')
    .from('discussions')
    .delete()
    .eq('id', discussionId)
    .eq('author_id', user.id)

  if (error) {
    console.error('Error deleting discussion:', error)
    throw new Error('Failed to delete discussion')
  }

  revalidatePath('/community/discussions')
}

export async function createComment(discussionId: string, formData: FormData) {
  const supabase = await createClient()

  const content = formData.get('content') as string
  const parentId = formData.get('parent_id') as string | null

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  const { data: comment, error } = await supabase
    .schema('community')
    .from('comments')
    .insert({
      content,
      discussion_id: discussionId,
      author_id: user.id,
      parent_id: parentId || null,
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating comment:', error)
    throw new Error('Failed to create comment')
  }

  // Update comments_count on the discussion
  await supabase
    .schema('community')
    .from('discussions')
    .update({ comments_count: supabase.rpc('increment', { x: 1 }) })
    .eq('id', discussionId)

  revalidatePath(`/community/discussions/${discussionId}`)
  return comment
}