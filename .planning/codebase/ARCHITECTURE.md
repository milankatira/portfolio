# Architecture

**Analysis Date:** 2026-04-15

## Pattern Overview

**Overall:** Next.js 16 App Router with Server Components and Client Components hybrid pattern

**Key Characteristics:**
- Server-side rendering (SSR) for initial page load performance
- Client components with "use client" directive for interactivity
- Incremental Static Regeneration (ISR) for blog data caching
- Dynamic imports with `next/dynamic` for heavy animation components
- RESTful API routes for blog CRUD operations

## Layers

**UI/Presentation Layer:**
- Purpose: Render page content and user interface
- Location: `app/`, `components/`
- Contains: React Server Components, Client Components, page layouts
- Depends on: Data layer, utility functions
- Pattern: Section-based composition with shared layout components

**Data Layer:**
- Purpose: MongoDB data access and caching
- Location: `model/BlogPost.ts`, `utils/db.ts`
- Contains: Mongoose schemas, database connection pooling
- Pattern: Singleton connection with cached promise

**API Layer:**
- Purpose: RESTful endpoints for blog operations
- Location: `app/api/blog/`
- Contains: GET, POST, PUT, DELETE handlers
- Pattern: Route-based handlers with error wrapping

**Static Content Layer:**
- Purpose: Hardcoded portfolio data
- Location: `data/index.ts`, `constant/index.ts`
- Contains: Testimonials, navigation items, company logos

## Data Flow

**Home Page Data Flow:**

```
User Request
    │
    ▼
┌─────────────────────┐
│ app/page.tsx        │  Server Component (async)
│ (ISR: revalidate=3600)
└──────────┬──────────┘
           │
           ▼ fetch('/api/blog')
┌─────────────────────┐
│ app/api/blog/route.ts│
└──────────┬──────────┘
           │
           ▼ connectDB()
┌─────────────────────┐
│ utils/db.ts         │  Mongoose cached connection
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ model/BlogPost.ts   │  Mongoose schema
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ MongoDB             │  Database
└─────────────────────┘
```

**Blog Post Page Flow:**

```
generateStaticParams() ──► fetch('/api/blog') ──► MongoDB
        │                                              │
        ▼                                              │
generateMetadata() ◄───── fetch('/api/blog/:id') ◄─────┘
        │
        ▼
BlogDetailsDark Component ──► <Markdown> component
```

## Key Abstractions

**ErrorBoundary:**
- Purpose: Graceful error handling for React components
- Location: `components/ErrorBoundary.tsx`
- Pattern: Class component with `getDerivedStateFromError`
- Usage: Wraps major sections for reliability

**ThemeProvider:**
- Purpose: Dark/light mode theming
- Location: `components/theme/theme-provider.tsx`
- Pattern: Context-based theme state with `next-themes`
- Usage: Wraps entire app in `app/layout.tsx`

**DB Connection:**
- Purpose: Singleton MongoDB connection with caching
- Location: `utils/db.ts`
- Pattern: Module-level cache with `global.mongooseCache`
- Exports: `connectDB()` function

**Markdown Renderer:**
- Purpose: Render blog content with syntax highlighting
- Location: `components/Markdown/index.jsx`
- Pattern: `react-markdown` with `rehype-highlight`
- Features: Custom component overrides for styling

## Entry Points

**Root Layout:**
- Location: `app/layout.tsx`
- Triggers: Every page request
- Responsibilities: Theme provider, metadata, Google Analytics, Schema.org markup, Footer

**Home Page:**
- Location: `app/page.tsx`
- Triggers: GET `/`
- Responsibilities: Fetch blog posts, render all sections, lazy-load Hero and Testimonials

**Blog Listing:**
- Location: `app/blog/page.tsx`
- Triggers: GET `/blog`
- Responsibilities: Display all blog posts

**Blog Post:**
- Location: `app/blog/[slug]/page.tsx`
- Triggers: GET `/blog/:slug`
- Responsibilities: Render single post, SEO metadata, JSON-LD

**API Routes:**
- `app/api/blog/route.ts` - GET all posts
- `app/api/blog/[id]/route.ts` - GET single post by title regex
- `app/api/revalidate/route.ts` - POST to revalidate cache

## Error Handling

**Strategy:** Layered error handling with graceful degradation

**Patterns:**
- API routes: Try-catch with `NextResponse.json` and status codes
- Page components: ErrorBoundary wraps sections
- Data fetching: Fallback to empty arrays with error logging
- Development: Detailed error messages in `console.error`
- Production: Generic error messages to users

## Cross-Cutting Concerns

**Logging:** `console.error` for errors, no structured logging

**Validation:** Schema validation via Mongoose, no explicit validation layer

**Authentication:** None (public portfolio)

**SEO:** Metadata API in layouts/pages, JSON-LD structured data, OpenGraph tags

---

*Architecture analysis: 2026-04-15*
