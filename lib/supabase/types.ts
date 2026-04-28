import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          reputation: number
          role: 'member' | 'moderator' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          reputation?: number
          role?: 'member' | 'moderator' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          reputation?: number
          role?: 'member' | 'moderator' | 'admin'
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          slug: string
          name: string
          description: string | null
          type: 'discussion' | 'article' | 'doc' | 'feedback'
          icon: string | null
          color: string | null
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          description?: string | null
          type: 'discussion' | 'article' | 'doc' | 'feedback'
          icon?: string | null
          color?: string | null
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          description?: string | null
          type?: 'discussion' | 'article' | 'doc' | 'feedback'
          icon?: string | null
          color?: string | null
          sort_order?: number
          created_at?: string
        }
      }
      discussions: {
        Row: {
          id: string
          slug: string
          title: string
          content: string
          excerpt: string
          author_id: string
          category_id: string | null
          status: 'open' | 'closed' | 'solved'
          view_count: number
          likes_count: number
          votes_count: number
          comments_count: number
          is_pinned: boolean
          is_featured: boolean
          metadata: Record<string, unknown>
          search_vector: unknown
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          content: string
          author_id: string
          category_id?: string | null
          status?: 'open' | 'closed' | 'solved'
          view_count?: number
          likes_count?: number
          votes_count?: number
          comments_count?: number
          is_pinned?: boolean
          is_featured?: boolean
          metadata?: Record<string, unknown>
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          content?: string
          author_id?: string
          category_id?: string | null
          status?: 'open' | 'closed' | 'solved'
          view_count?: number
          likes_count?: number
          votes_count?: number
          comments_count?: number
          is_pinned?: boolean
          is_featured?: boolean
          metadata?: Record<string, unknown>
          created_at?: string
          updated_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          content: string
          author_id: string
          discussion_id: string
          parent_id: string | null
          depth: number
          is_solution: boolean
          likes_count: number
          deleted_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          content: string
          author_id: string
          discussion_id: string
          parent_id?: string | null
          depth?: number
          is_solution?: boolean
          likes_count?: number
          deleted_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          content?: string
          author_id?: string
          discussion_id?: string
          parent_id?: string | null
          is_solution?: boolean
          likes_count?: number
          deleted_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      articles: {
        Row: {
          id: string
          slug: string
          title: string
          subtitle: string | null
          content: string
          excerpt: string | null
          cover_image: string | null
          author_id: string
          category_id: string | null
          status: 'draft' | 'published' | 'archived'
          read_time: number | null
          view_count: number
          likes_count: number
          is_featured: boolean
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          subtitle?: string | null
          content: string
          excerpt?: string | null
          cover_image?: string | null
          author_id: string
          category_id?: string | null
          status?: 'draft' | 'published' | 'archived'
          read_time?: number | null
          view_count?: number
          likes_count?: number
          is_featured?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          subtitle?: string | null
          content?: string
          excerpt?: string | null
          cover_image?: string | null
          author_id?: string
          category_id?: string | null
          status?: 'draft' | 'published' | 'archived'
          read_time?: number | null
          view_count?: number
          likes_count?: number
          is_featured?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      docs: {
        Row: {
          id: string
          slug: string
          title: string
          content: string
          excerpt: string | null
          category_id: string | null
          parent_id: string | null
          sort_order: number
          status: 'draft' | 'published'
          view_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          content: string
          excerpt?: string | null
          category_id?: string | null
          parent_id?: string | null
          sort_order?: number
          status?: 'draft' | 'published'
          view_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          content?: string
          excerpt?: string | null
          category_id?: string | null
          parent_id?: string | null
          sort_order?: number
          status?: 'draft' | 'published'
          view_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      feedback_items: {
        Row: {
          id: string
          title: string
          description: string
          author_id: string
          category: 'feature' | 'bug' | 'improvement'
          status: 'under_review' | 'planned' | 'in_progress' | 'completed' | 'declined'
          votes_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          author_id: string
          category: 'feature' | 'bug' | 'improvement'
          status?: 'under_review' | 'planned' | 'in_progress' | 'completed' | 'declined'
          votes_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          author_id?: string
          category?: 'feature' | 'bug' | 'improvement'
          status?: 'under_review' | 'planned' | 'in_progress' | 'completed' | 'declined'
          votes_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      votes: {
        Row: {
          id: string
          user_id: string
          target_type: 'discussion' | 'comment' | 'feedback'
          target_id: string
          value: -1 | 1
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          target_type: 'discussion' | 'comment' | 'feedback'
          target_id: string
          value: -1 | 1
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          target_type?: 'discussion' | 'comment' | 'feedback'
          target_id?: string
          value?: -1 | 1
          created_at?: string
        }
      }
      tags: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          created_at?: string
        }
      }
      discussion_tags: {
        Row: {
          discussion_id: string
          tag_id: string
        }
        Insert: {
          discussion_id: string
          tag_id: string
        }
        Update: {
          discussion_id?: string
          tag_id?: string
        }
      }
      article_tags: {
        Row: {
          article_id: string
          tag_id: string
        }
        Insert: {
          article_id: string
          tag_id: string
        }
        Update: {
          article_id?: string
          tag_id?: string
        }
      }
      community_discussions: {
        Row: {
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
          is_deleted: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content?: string
          slug: string
          author_id?: string | null
          category?: string
          tags?: string[]
          likes_count?: number
          comments_count?: number
          views_count?: number
          is_pinned?: boolean
          is_locked?: boolean
          is_deleted?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          slug?: string
          author_id?: string | null
          category?: string
          tags?: string[]
          likes_count?: number
          comments_count?: number
          views_count?: number
          is_pinned?: boolean
          is_locked?: boolean
          is_deleted?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      community_articles: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string
          content: string
          cover_image: string | null
          author_id: string | null
          category: string
          tags: string[]
          read_time: number | null
          likes_count: number | null
          comments_count: number | null
          views_count: number | null
          is_published: boolean | null
          is_featured: boolean | null
          is_deleted: boolean | null
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt?: string
          content?: string
          cover_image?: string | null
          author_id?: string | null
          category?: string
          tags?: string[]
          read_time?: number | null
          likes_count?: number | null
          comments_count?: number | null
          views_count?: number | null
          is_published?: boolean | null
          is_featured?: boolean | null
          is_deleted?: boolean | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string
          content?: string
          cover_image?: string | null
          author_id?: string | null
          category?: string
          tags?: string[]
          read_time?: number | null
          likes_count?: number | null
          comments_count?: number | null
          views_count?: number | null
          is_published?: boolean | null
          is_featured?: boolean | null
          is_deleted?: boolean | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      community_comments: {
        Row: {
          id: string
          discussion_id: string | null
          article_id: string | null
          author_id: string | null
          parent_id: string | null
          content: string
          likes_count: number | null
          is_deleted: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          discussion_id?: string | null
          article_id?: string | null
          author_id?: string | null
          parent_id?: string | null
          content: string
          likes_count?: number | null
          is_deleted?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          discussion_id?: string | null
          article_id?: string | null
          author_id?: string | null
          parent_id?: string | null
          content?: string
          likes_count?: number | null
          is_deleted?: boolean | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
