# 📋 Product Requirements Document (PRD)
## **DailyWorkerHub Community Platform**
### *Integrated Community & Landing Experience*

**Versi:** 1.0  
**Tanggal:** 20 April 2026  
**Status:** Draft Final  
**Author:** Product Team DailyWorkerHub  

---

## 1. Executive Summary

DailyWorkerHub Community adalah platform terintegrasi yang menggabungkan **landing page**, **knowledge base**, **forum diskusi**, **sistem voting/feedback**, dan **publikasi artikel** dalam satu domain utama (`dailyworkerhub.com`). Bagian komunitas diakses melalui route `/community` dengan visualisasi modern futuristik yang terinspirasi dari interface AI assistant terkini — menampilkan command center utama sebagai entry point dengan search intelligent di tengah layar, dilengkapi shortcut navigasi dan feed konten terkini di bawahnya.

Platform dibangun dengan **Next.js 14+ (App Router)** di frontend dan **Supabase** (PostgreSQL + Auth + Realtime + Storage) di backend, dengan color palette dominan **hijau emerald** yang menyatu pada dark futuristic theme.

---

## 2. Product Vision & Goals

### 2.1 Vision
> Menjadi pusat komunitas pekerja harian (pekerja harian) di Indonesia yang terintegrasi sepenuhnya dengan platform job board, di mana setiap pengunjung dapat langsung mencari informasi, berdiskusi, membaca artikel, atau memberikan feedback melalui satu interface yang seamless dan futuristik.

### 2.2 Goals
| Goal | KPI |
|------|-----|
| Meningkatkan organic traffic melalui SEO terkonsolidasi | 50% increase dalam 6 bulan |
| Meningkatkan engagement user | Average session duration > 4 menit |
| Mengurangi bounce rate landing page | < 35% |
| Membangun knowledge base self-service | 100+ artikel dalam 3 bulan |
| Mengumpulkan product feedback terstruktur | 500+ votes dalam 6 bulan |

---

## 3. Target Audience

| Segmen | Karakteristik | Kebutuhan |
|--------|--------------|-----------|
| **Daily Pekerja (Job Seeker)** | Pekerja harian/freelancer mencari info | Tips kerja, diskusi gaji, networking |
| **Pemberi Kerja/Recruiter** | Pihak yang memposting lowongan | Feedback fitur, best practices hiring |
| **Content Contributor** | Expert yang ingin berbagi ilmu | Platform publikasi, reputasi |
| **Visitor Organik** | Datang dari Google search | Jawaban cepat, artikel komprehensif |

---

## 4. Architecture & Tech Stack

### 4.1 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    dailyworkerhub.com                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │   Landing    │  │  Community   │  │   App Portal     │  │
│  │    Page      │  │   (/community)│  │ (app.daily...)   │  │
│  │  (Marketing) │  │   (Public)   │  │  (Auth Required) │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
│           │                 │                    │           │
│           └─────────────────┴────────────────────┘           │
│                         │                                    │
│                  Next.js 14+ App Router                      │
│            (Server Components + Edge Runtime)                │
│                         │                                    │
│           ┌─────────────┼─────────────┐                     │
│           ▼             ▼             ▼                     │
│      ┌─────────┐  ┌──────────┐  ┌──────────┐              │
│      │ Supabase│  │  Vercel  │  │  Algolia │              │
│      │  (DB)   │  │  (Host)  │  │ (Search) │              │
│      └─────────┘  └──────────┘  └──────────┘              │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 Tech Stack Detail

| Layer | Teknologi | Justifikasi |
|-------|-----------|-------------|
| **Framework** | Next.js 14+ (App Router) | SSR/ISR optimal untuk SEO, React Server Components |
| **Language** | TypeScript | Type safety, maintainability |
| **Styling** | Tailwind CSS + shadcn/ui | Development cepat, konsistensi desain |
| **Animation** | Framer Motion | Micro-interactions, page transitions |
| **Backend** | Supabase | PostgreSQL managed, Auth, Realtime, Storage |
| **ORM/Query** | Supabase Client + Server Actions | Direct query dengan RLS |
| **Search** | Algolia / Meilisearch | Full-text search discussions & docs |
| **Auth** | Supabase Auth (PKCE) | Shared session dengan app subdomain |
| **Storage** | Supabase Storage | Avatar user, gambar artikel |
| **Analytics** | Vercel Analytics + Plausible | Privacy-focused tracking |

---

## 5. Database Schema (Supabase)

### 5.1 Entity Relationship Diagram

```
profiles (users)
├── discussions (author_id)
│   ├── discussion_votes (discussion_id, user_id)
│   └── discussion_tags (discussion_id, tag_id)
├── comments (author_id, discussion_id)
│   └── comment_votes (comment_id, user_id)
├── articles (author_id)
│   └── article_tags (article_id, tag_id)
├── docs (author_id)
├── feedback_items (author_id)
│   └── feedback_votes (feedback_id, user_id)
└── tags

categories (global)
```

### 5.2 Table Definitions

#### **profiles** (extends auth.users)
```sql
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  full_name text,
  avatar_url text,
  bio text,
  reputation integer default 0,
  role text default 'member' check (role in ('member', 'moderator', 'admin')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS: Users can read all profiles, update only own
alter table profiles enable row level security;
```

#### **categories**
```sql
create table categories (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  name text not null,
  description text,
  type text check (type in ('discussion', 'article', 'doc', 'feedback')),
  icon text,
  color text,
  sort_order integer default 0,
  created_at timestamptz default now()
);
```

#### **discussions**
```sql
create table discussions (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  content text not null,
  excerpt text generated always as (left(content, 200)) stored,
  author_id uuid references profiles(id) not null,
  category_id uuid references categories(id),
  status text default 'open' check (status in ('open', 'closed', 'solved')),
  view_count integer default 0,
  likes_count integer default 0,
  comments_count integer default 0,
  is_pinned boolean default false,
  is_featured boolean default false,
  metadata jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Full-text search vector
alter table discussions 
add column search_vector tsvector 
generated always as (
  setweight(to_tsvector('indonesian', coalesce(title, '')), 'A') || 
  setweight(to_tsvector('indonesian', coalesce(content, '')), 'B')
) stored;

create index discussions_search_idx on discussions using gin(search_vector);
```

#### **comments**
```sql
create table comments (
  id uuid default gen_random_uuid() primary key,
  content text not null,
  author_id uuid references profiles(id) not null,
  discussion_id uuid references discussions(id) on delete cascade,
  parent_id uuid references comments(id) on delete cascade, -- threaded
  is_solution boolean default false,
  likes_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

#### **articles**
```sql
create table articles (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  subtitle text,
  content text not null, -- Markdown/HTML
  excerpt text,
  cover_image text,
  author_id uuid references profiles(id) not null,
  category_id uuid references categories(id),
  status text default 'draft' check (status in ('draft', 'published', 'archived')),
  read_time integer, -- in minutes
  view_count integer default 0,
  likes_count integer default 0,
  is_featured boolean default false,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

#### **docs** (Documentation / Knowledge Base)
```sql
create table docs (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  content text not null,
  excerpt text,
  category_id uuid references categories(id),
  parent_id uuid references docs(id), -- hierarchical docs
  sort_order integer default 0,
  status text default 'published' check (status in ('draft', 'published')),
  view_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

#### **feedback_items** (Voting & Feedback)
```sql
create table feedback_items (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  author_id uuid references profiles(id) not null,
  category text check (category in ('feature', 'bug', 'improvement')),
  status text default 'under_review' check (status in ('under_review', 'planned', 'in_progress', 'completed', 'declined')),
  votes_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

#### **votes** (Polymorphic untuk discussions, comments, feedback)
```sql
create table votes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  target_type text check (target_type in ('discussion', 'comment', 'feedback')),
  target_id uuid not null,
  value integer check (value in (-1, 1)),
  created_at timestamptz default now(),
  unique(user_id, target_type, target_id)
);
```

### 5.3 Functions & Triggers

```sql
-- Auto-update reputation dan counters
create or replace function handle_vote()
returns trigger as $$
begin
  -- Update counter pada target table
  if NEW.target_type = 'discussion' then
    update discussions set likes_count = likes_count + NEW.value where id = NEW.target_id;
  elsif NEW.target_type = 'comment' then
    update comments set likes_count = likes_count + NEW.value where id = NEW.target_id;
  elsif NEW.target_type = 'feedback' then
    update feedback_items set votes_count = votes_count + NEW.value where id = NEW.target_id;
  end if;
  return NEW;
end;
$$ language plpgsql;

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  NEW.updated_at = now();
  return NEW;
end;
$$ language plpgsql;
```

### 5.4 Row Level Security (RLS) Policies

| Table | Policy | Rule |
|-------|--------|------|
| profiles | Select | Public readable |
| profiles | Update | Own profile only |
| discussions | Select | Public readable |
| discussions | Insert | Authenticated users |
| discussions | Update/Delete | Author or admin |
| articles | Select | Published = public, Draft = author/admin |
| feedback_items | Select | Public readable |
| votes | Insert/Delete | Authenticated, one per target |

---

## 6. API Design & Endpoints

### 6.1 Server Actions (Next.js App Router)

Menggunakan **Server Actions** untuk mutasi data (create, update, delete) dan **Route Handlers** untuk data fetching kompleks.

```typescript
// app/community/actions/discussion-actions.ts
'use server'

export async function createDiscussion(formData: FormData) { ... }
export async function updateDiscussion(id: string, formData: FormData) { ... }
export async function toggleVote(targetType: string, targetId: string) { ... }
export async function createComment(discussionId: string, content: string, parentId?: string) { ... }
```

### 6.2 Route Handlers

```
GET  /api/community/discussions?category=&sort=&page=
GET  /api/community/discussions/[slug]
GET  /api/community/articles?featured=true&limit=6
GET  /api/community/docs/[...slug]
GET  /api/community/feedback?status=&sort=
POST /api/community/search (Algolia/Meilisearch proxy)
GET  /api/community/stats (untuk landing page widgets)
```

### 6.3 Realtime Subscriptions

```typescript
// Subscribe ke new discussions
supabase
  .channel('community-feed')
  .on('postgres_changes', 
    { event: 'INSERT', schema: 'public', table: 'discussions' },
    (payload) => { /* Update UI real-time */ }
  )
  .subscribe();
```

---

## 7. Design System & UI/UX Specifications

### 7.1 Color Palette (Green Futuristic Dark)

| Token | Hex | Usage |
|-------|-----|-------|
| **Background Primary** | `#020617` (Slate 950) | Main page background |
| **Background Secondary** | `#0F172A` (Slate 900) | Cards, panels |
| **Background Tertiary** | `#1E293B` (Slate 800) | Input fields, hover states |
| **Primary Green** | `#10B981` (Emerald 500) | Primary buttons, links, accents |
| **Primary Green Light** | `#34D399` (Emerald 400) | Hover states, glow effects |
| **Primary Green Dark** | `#059669` (Emerald 600) | Active states |
| **Accent Cyan** | `#00FF94` | Neon accents, badges featured |
| **Text Primary** | `#F8FAFC` (Slate 50) | Headings, primary text |
| **Text Secondary** | `#94A3B8` (Slate 400) | Body text, descriptions |
| **Text Muted** | `#64748B` (Slate 500) | Timestamps, metadata |
| **Border** | `#1E293B` | Card borders, dividers |
| **Border Focus** | `#10B981` | Focus rings |
| **Success** | `#22C55E` | Success states |
| **Warning** | `#EAB308` | Warning badges |
| **Danger** | `#EF4444` | Error, delete actions |

### 7.2 Typography

| Element | Font | Size | Weight | Line Height |
|---------|------|------|--------|-------------|
| Display | Inter | 48-64px | 700 | 1.1 |
| H1 | Inter | 36px | 700 | 1.2 |
| H2 | Inter | 24px | 600 | 1.3 |
| H3 | Inter | 20px | 600 | 1.4 |
| Body | Inter | 16px | 400 | 1.6 |
| Caption | Inter | 14px | 400 | 1.5 |
| Code | JetBrains Mono | 14px | 400 | 1.6 |

### 7.3 Spacing & Layout

- **Max Content Width:** 1280px (centered)
- **Community Page Padding:** 24px mobile, 48px desktop
- **Card Border Radius:** 16px (large), 12px (medium), 8px (small)
- **Button Border Radius:** 9999px (pill shape) untuk primary actions
- **Grid System:** 12-column, gap 24px

### 7.4 Effects & Animations

| Effect | Specification |
|--------|--------------|
| **Glow Green** | `box-shadow: 0 0 20px rgba(16, 185, 129, 0.15)` |
| **Card Hover** | `transform: translateY(-2px); transition: all 0.3s ease` |
| **Gradient Border** | `border-image: linear-gradient(135deg, #10B981, #00FF94) 1` |
| **Background Gradient** | Subtle radial gradient dari `#0F172A` ke `#020617` |
| **Input Focus** | Ring 2px `#10B981` dengan glow |
| **Page Transition** | Fade in 0.3s ease-out, slide up 20px |

---

## 8. Page Specifications

### 8.1 Route Structure

```
dailyworkerhub.com/
├── /                          ← Landing Page (Marketing)
├── /community                 ← Community Hub (Hero AI Interface)
│   ├── /discussions           ← Forum listing
│   ├── /discussions/[slug]    ← Thread detail
│   ├── /articles              ← Artikel listing
│   ├── /articles/[slug]       ← Artikel detail
│   ├── /docs                  ← Documentation hub
│   ├── /docs/[...slug]        ← Dokumen detail
│   └── /feedback              ← Feedback & voting board
└── /app                       ← Redirect ke app.dailyworkerhub.com
```

### 8.2 Halaman `/community` — Main Hub

**Layout:** Full-width, dark background, centered content  
**Referensi Visual:** Interface AI Assistant (seperti gambar referensi)

#### **Section 1: Navigation Bar**
- **Position:** Fixed top, translucent with backdrop blur (`backdrop-blur-xl`, `bg-slate-950/80`)
- **Height:** 64px
- **Content:** 
  - Logo DailyWorkerHub (kiri) dengan text "Community" badge hijau
  - Nav links: Discussions, Articles, Docs, Feedback
  - Search icon + User avatar (atau Login button)
- **Border:** Bottom 1px `border-slate-800`

#### **Section 2: Hero / Command Center**
- **Height:** 60vh minimum, centered vertically
- **Background:** 
  - Base: `#020617`
  - Subtle radial gradient: `radial-gradient(ellipse at center, rgba(16,185,129,0.05) 0%, transparent 70%)`
  - Grid pattern overlay (opacity 0.03)
- **Content:**
  1. **Headline:** "Komunitas Pekerja Harian Indonesia" — Inter 48px, weight 700, gradient text (`bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent`)
  2. **Subheadline:** "Diskusi, pelajari, dan berkembang bersama ribuan pekerja harian di seluruh Indonesia." — Slate 400, 18px
  3. **Main Input Box:**
     - Width: 100%, max-width 720px
     - Height: 64px
     - Background: `#0F172A` dengan border 1px `#334155`
     - Border radius: 16px
     - Placeholder: "Cari diskusi, artikel, atau tanyakan sesuatu..."
     - Left icon: Search (Slate 400)
     - Right side: Tombol "Kirim" (pill shape, bg-emerald-500, hover:bg-emerald-400)
     - Focus state: Border emerald-500, glow `shadow-[0_0_30px_rgba(16,185,129,0.2)]`
     - Transition: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`
  4. **Shortcut Pills (di bawah input):**
     - Layout: Flex wrap, gap 12px, centered
     - Style: Pill buttons dengan border 1px slate-700, bg-slate-800/50, hover:bg-slate-700, hover:border-emerald-500/50
     - Icons: Lucide icons (MessageSquare, FileText, BookOpen, Vote, Sparkles)
     - Items:
       - "Diskusi Terbaru" (icon: MessageSquare)
       - "Artikel Populer" (icon: TrendingUp)
       - "Panduan Karir" (icon: BookOpen)
       - "Feedback Produk" (icon: Vote)
       - "Cari Lowongan" (icon: Briefcase) → link ke app
       - "Deep Research" (icon: Sparkles) → AI search (future feature)

#### **Section 3: Stats Bar**
- **Layout:** Horizontal flex, centered, gap 48px
- **Content:** 
  - "1,240+ Diskusi" | "89 Artikel" | "340+ Member" | "156 Feedback Terjawab"
- **Style:** Text Slate 400, 14px, dengan angka dalam emerald-400 font-semibold
- **Divider:** Dot separator (Slate 600)

#### **Section 4: Artikel Terkini / Featured Content**
- **Layout:** Container max-w-6xl, mx-auto, py-16
- **Header:** 
  - "Artikel Terkini" — H2, Slate 50
  - "Lihat semua →" — Link emerald-400, hover:underline (kanan atas)
- **Grid:** 3 columns desktop, 2 tablet, 1 mobile, gap 24px
- **Card Design:**
  - Background: `#0F172A`
  - Border: 1px `#1E293B`, hover: border-emerald-500/30
  - Border radius: 16px
  - Padding: 0 (image full width top) + 24px (content)
  - Image: Aspect ratio 16:9, border-radius top 16px, object-cover
  - Category badge: Pill, bg-emerald-500/10, text-emerald-400, border emerald-500/20, top-left di atas image
  - Title: 20px, Slate 50, font-semibold, line-clamp-2
  - Excerpt: 14px, Slate 400, line-clamp-3, mt-2
  - Footer: Avatar author (24px) + name + • + read time + • + date
  - Hover: `translateY(-4px)`, shadow glow hijau subtle
  - Transition: `all 0.4s cubic-bezier(0.4, 0, 0.2, 1)`

#### **Section 5: Diskusi Populer**
- **Layout:** 2 columns desktop (left: featured discussion, right: list)
- **Left Card:** Large card dengan preview konten, vote count, comment count
- **Right List:** Stack vertical, 5 items, compact (title + metadata + vote pill)
- **Vote Pill:** Bg-slate-800, border slate-700, icon arrow-up + count

#### **Section 6: CTA Banner**
- **Background:** Gradient `from-emerald-900/20 to-slate-900`, border top/bottom emerald-500/10
- **Content:** "Punya pertanyaan spesifik? Mulai diskusi sekarang." + Button "Buat Diskusi" (bg-emerald-500, text-slate-950, font-semibold)

#### **Section 7: Footer**
- **Style:** Minimalist, border-top slate-800, py-12
- **Content:** Logo + tagline + link columns (Product, Resources, Community, Legal)
- **Bottom:** Copyright + social icons

---

## 9. Feature Specifications

### 9.1 Intelligent Search (Community Hub)

| Aspek | Spesifikasi |
|-------|-------------|
| **Trigger** | Focus pada main input atau klik shortcut |
| **Behavior** | Dropdown modal dengan hasil pencarian real-time |
| **Sources** | Discussions, Articles, Docs |
| **Grouping** | Hasil dikelompokkan per kategori dengan icon |
| **Keyboard Nav** | Arrow keys untuk navigasi, Enter untuk select, Escape untuk close |
| **Empty State** | "Tidak ditemukan. Buat diskusi baru?" dengan shortcut |
| **Implementation** | Algolia InstantSearch atau Supabase Full-Text Search |

### 9.2 Discussion Forum

| Feature | Detail |
|---------|--------|
| **Thread Creation** | Rich text editor (TipTap), support mention @user, embed link |
| **Categories** | Karier, Gaji & Negosiasi, Remote Work, Skill Development, Umum |
| **Voting** | Upvote/downvote, sorting by Hot | Top | New |
| **Comments** | Threaded (2 levels), rich text, @mentions |
| **Solution Marking** | Author dapat mark comment sebagai "Jawaban Terbaik" |
| **Notifications** | Real-time via Supabase Realtime untuk reply dan vote |
| **SEO** | Slug dari judul, structured data QAPage, canonical URL |

### 9.3 Articles / Knowledge Base

| Feature | Detail |
|---------|--------|
| **Editor** | MDX-based dengan preview live |
| **Frontmatter** | Title, excerpt, cover_image, category, tags, read_time |
| **Publishing Workflow** | Draft → Review → Published |
| **Related Content** | Auto-suggest berdasarkan tags dan kategori |
| **Reading Progress** | Progress bar di top viewport |
| **SEO** | Article schema, Open Graph image auto-generate |

### 9.4 Documentation

| Feature | Detail |
|---------|--------|
| **Structure** | Hierarchical (Parent → Child docs) |
| **Navigation** | Sidebar tree di kiri, collapsible |
| **Search** | Scoped search hanya dalam docs |
| **Feedback** | "Apakah artikel ini membantu?" Yes/No |
| **Edit Link** | "Edit this page" → redirect ke GitHub/Admin (future) |

### 9.5 Feedback & Voting Board

| Feature | Detail |
|---------|--------|
| **Submission** | Form dengan title, description, category (Feature/Bug/Improvement) |
| **Voting** | One vote per user, toggle on/off |
| **Status** | Under Review → Planned → In Progress → Completed |
| **Admin Panel** | Update status dengan comment official |
| **Sorting** | Top Voted | Newest | Trending |

---

## 10. Component Inventory (shadcn/ui + Custom)

### 10.1 shadcn/ui Components (Base)
- Button, Card, Input, Textarea, Avatar, Badge, Dialog, Dropdown Menu, Tabs, Separator, Skeleton, Scroll Area, Tooltip

### 10.2 Custom Components

| Component | Lokasi | Deskripsi |
|-----------|--------|-----------|
| `CommandCenter` | `/community` | Main search input dengan glow effect |
| `ShortcutPill` | `/community` | Pill button dengan icon dan hover animation |
| `ContentCard` | Shared | Card artikel/diskusi dengan gradient border hover |
| `VoteButton` | Forum | Upvote/downvote dengan count animation |
| `CommentThread` | Forum | Recursive comment tree dengan collapse |
| `DocSidebar` | Docs | Navigation tree dengan active state |
| `FeedbackCard` | Feedback | Card dengan vote button dan status badge |
| `GlowEffect` | Shared | Wrapper untuk green glow effect |
| `GradientText` | Shared | Text dengan gradient emerald-cyan |

---

## 11. SEO & Performance Requirements

### 11.1 SEO Strategy

| Aspek | Implementasi |
|-------|--------------|
| **URL Structure** | Semantic slug, lowercase, hyphen-separated |
| **Meta Tags** | Dynamic title/description per page via Next.js Metadata API |
| **Open Graph** | Auto-generate OG image untuk discussions dan articles |
| **Structured Data** | QAPage (forum), Article (blog), Organization (homepage) |
| **Sitemap** | Dynamic sitemap.xml untuk semua public routes |
| **Robots.txt** | Allow all public, disallow /app routes |
| **Canonical** | Self-referencing canonical pada setiap page |
| **Internal Linking** | Related discussions di sidebar artikel, breadcrumb navigation |

### 11.2 Performance Targets

| Metric | Target | Teknik |
|--------|--------|--------|
| **First Contentful Paint** | < 1.2s | Next.js SSR, font optimization |
| **Largest Contentful Paint** | < 2.5s | Image optimization (WebP, lazy load) |
| **Time to Interactive** | < 3.5s | Code splitting, dynamic imports |
| **Cumulative Layout Shift** | < 0.1 | Fixed dimensions, font-display: swap |
| **Lighthouse Score** | > 90 | Image compression, minimal JS |

### 11.3 Core Web Vitals Optimization

- **Images:** Next.js Image component dengan placeholder blur
- **Fonts:** `next/font` dengan subsetting
- **Scripts:** Lazy load non-critical scripts (analytics)
- **CSS:** Tailwind purge unused styles
- **Data Fetching:** React Server Components untuk initial load, client fetch untuk interaksi

---

## 12. Authentication & Security

### 12.1 Auth Flow

| Step | Flow |
|------|------|
| **Sign Up** | Email/password atau OAuth (Google) via Supabase Auth |
| **Session** | JWT stored in cookie dengan `domain=.dailyworkerhub.com` |
| **Cross-Domain** | User logged in di community tetap logged in di app |
| **Protected Routes** | Middleware check session untuk /app, redirect ke login |
| **RLS** | Database-level security, tidak hanya client-side |

### 12.2 Security Measures

- **Rate Limiting:** 100 req/menit untuk API publik, 10 req/menit untuk posting
- **Input Sanitization:** DOMPurify untuk HTML user-generated content
- **SQL Injection Prevention:** Parameterized queries via Supabase client
- **XSS Protection:** Content Security Policy headers
- **CSRF Protection:** Built-in pada Supabase Auth

---

## 13. Implementation Roadmap

### Phase 1: Foundation (Minggu 1-3)
- [ ] Setup monorepo Next.js + Supabase project
- [ ] Implementasi design system (Tailwind config, colors, typography)
- [ ] Setup database schema dan RLS policies
- [ ] Implementasi auth (login/register)
- [ ] Build halaman `/community` (Hero section + Command Center UI)
- [ ] Setup Algolia/Meilisearch index

### Phase 2: Content Platform (Minggu 4-6)
- [ ] CRUD Articles dengan MDX editor
- [ ] Documentation system (hierarchical docs)
- [ ] Article listing dan detail pages
- [ ] SEO optimization (meta tags, sitemap, structured data)
- [ ] Image upload ke Supabase Storage

### Phase 3: Community Features (Minggu 7-9)
- [ ] Discussion forum (create, list, detail)
- [ ] Comment system (threaded)
- [ ] Voting system (discussions & comments)
- [ ] Categories dan tags
- [ ] Real-time notifications

### Phase 4: Feedback & Polish (Minggu 10-12)
- [ ] Feedback board dengan voting
- [ ] Admin dashboard (moderation, analytics)
- [ ] Performance optimization
- [ ] Animation dan micro-interactions
- [ ] User testing dan bug fixes

---

## 14. Success Metrics & Analytics

### 14.1 North Star Metrics

| Metric | Baseline | Target 6 Bulan |
|--------|----------|----------------|
| Organic Traffic (sessions) | 0 | 10,000/month |
| Average Session Duration | 0 | > 4 menit |
| Pages per Session | 0 | > 3.5 |
| Community Sign-ups | 0 | 2,000 |
| Discussion Threads | 0 | 500+ |
| Articles Published | 0 | 100+ |
| Feedback Items Submitted | 0 | 200+ |

### 14.2 Tracking Events

- Search queries (apa yang dicari user)
- Click shortcut pills (navigasi preferensi)
- Article read completion rate
- Vote interactions
- Comment submission rate
- Time to first comment (new user activation)

---

## 15. Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Thin Content UGC** | SEO penalty | Minimum character count, auto-moderasi, quality scoring |
| **Spam/Abuse** | Reputasi | Rate limiting, RLS, moderator tools, report system |
| **Slow Search** | UX buruk | Algolia untuk instant search, debounce 300ms |
| **Auth Cross-Domain** | Session issues | Cookie domain wildcard, proper PKCE flow |
| **Content Duplication** | SEO cannibalization | Canonical tags, merge threads, redirect 301 |

---

## 16. Appendix

### A. Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px
- Wide: > 1280px

### B. Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_ALGOLIA_APP_ID=
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=
ALGOLIA_ADMIN_KEY=
```

### C. Asset Requirements
- Logo DailyWorkerHub (SVG, white + green variant)
- OG Image template (1200x630px)
- Hero background pattern (SVG, subtle grid)
- Empty state illustrations (SVG)
- Favicon (dark mode compatible)

---

**End of Document**
