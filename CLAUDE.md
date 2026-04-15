# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Start

**Prerequisites:** Node 22.x, yarn 1.22.22+, MongoDB instance

**Development:**
```bash
yarn install
yarn dev                    # Start dev server on http://localhost:3000
yarn lint                   # Run ESLint
yarn build                  # Build for production
yarn start                  # Start production server
yarn generate-sitemap       # Generate sitemap.xml
```

**MongoDB Setup:**
Set `NEXT_PUBLIC_MONGO_URL` in `.env.local` (e.g., `mongodb://localhost:27017/portfolio`)

## Project Structure

This is a **Next.js 16 + React 19 personal portfolio** with an integrated blog system.

### Core Architecture

```
/app                    → Next.js app directory
  /page.tsx            → Home page (displays projects, testimonials, tech stack)
  /api                 → API routes
    /blog              → Blog CRUD endpoints
    /sitemap           → Dynamic sitemap generation
  /layout.tsx          → Root layout
  /blog/[id]/page.tsx  → Individual blog post view

/components             → React component library
  /ui                  → 64 Radix UI base components (button, card, dialog, etc.)
  /sections            → Page sections (Hero, About, Projects, Blog, Testimonials)
  /magicui             → Custom animated components (Magic Card, Marquee, Shiny Button)
  /Markdown            → Blog markdown rendering with syntax highlighting
  /layout              → Navbar, Footer

/data                   → Static content (nav items, testimonials, companies)
/model                  → Mongoose schemas (BlogPost)
/utils                  → Helpers (db connection, slug generation, icons)
/public                 → Static assets (images, resume PDF, sitemaps)
/scripts                → Build utilities (sitemap generation)
```

### Styling & Theme

- **Tailwind CSS 3.4** with custom theme configuration (`tailwind.config.ts`)
- CSS variables for dynamic theming (`addVariablesForColors` plugin)
- `next-themes` for light/dark mode support
- Radix UI Slot component for composable primitives

### Database & Backend

- **MongoDB** with Mongoose ODM
- Single schema: `BlogPost` (title, excerpt, content, thumbnail, tags, isPublic, timestamps)
- Connection pooling via cached Mongoose instance (`utils/db.ts`)
- API routes in `/app/api/blog/` for CRUD operations

### Frontend Libraries

- **Animations:** Framer Motion, Motion library, canvas-confetti
- **UI Primitives:** Radix UI (avatar, dialog, toast, icons)
- **State Management:** Zustand
- **Markdown:** react-markdown with rehype-highlight for code blocks
- **Icons:** lucide-react, react-icons
- **Carousel:** Embla carousel

## Key Patterns

### Component Organization

- **Base UI components** live in `/components/ui/` — imported from Radix, extended with Tailwind classes
- **Sections** compose UI components into page sections (`/components/sections/`)
- **Custom animated components** in `/magicui/` — specialized animations like Marquee, Magic Card
- Each component is a self-contained module; larger sections under 400 lines

### Data Fetching

- **Static data** in `/data/index.ts` (nav, testimonials, companies)
- **Dynamic blog posts** fetched via `getBlogPosts()` helper in `app/page.tsx`
- Mongoose queries use cached DB connection to avoid stale connections

### API Design

Blog endpoints follow REST conventions:
- `GET /api/blog` — List all public blog posts
- `GET /api/blog/[id]` — Get single post by ID
- `POST /api/blog` — Create new post
- `PUT /api/blog/[id]` — Update post
- `DELETE /api/blog/[id]` — Delete post

### TypeScript Configuration

- `strict: true` — Type checking enabled
- Path alias `@/*` points to repository root
- React JSX support via `react-jsx` (no React import needed)

## Common Development Tasks

### Adding a Blog Post

1. Create via API: `POST /api/blog` with `{ title, excerpt, content, thumbnail, tags, isPublic }`
2. Content supports Markdown with syntax-highlighted code blocks
3. Regenerate sitemap: `yarn generate-sitemap`

### Adding a New Section

1. Create component in `/components/sections/MySection.tsx`
2. Compose existing UI components and sections
3. Import in `app/page.tsx` and add to render

### Modifying Theme Colors

Edit `tailwind.config.ts`:
- `theme.colors.dark` — Dark mode palette
- `theme.colors.light` — Light mode palette (CSS variables)
- `addVariablesForColors` plugin auto-registers CSS variables for Tailwind classes

### Updating Testimonials or Nav

Edit `/data/index.ts` — exported as `testimonials`, `navItems`, `companies`

## Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_MONGO_URL` — MongoDB connection string

Optional:
- `NEXT_PUBLIC_*` — Exposed to browser (use sparingly for client config only)

## Build & Deployment

- **Dev mode:** `yarn dev` watches file changes, HMR enabled
- **Production:** `yarn build` optimizes CSS (experimental), lints on build ignored
- **TypeScript errors ignored** on build (see `next.config.ts`) — run `yarn lint` separately
- ESLint config ignores files during build but reports via CLI

## Notes

- Image optimization from CDN: `cdn.simpleicons.org`, `images.unsplash.com`, `avatars.githubusercontent.com`
- Sitemap is dynamically generated via `/api/sitemap` and rewritten to `/sitemap.xml`
- Newsletter/contact forms use Nodemailer (configured via env vars, credentials not in repo)
- No pre-rendering or static generation; all pages are dynamic with ISR support possible
