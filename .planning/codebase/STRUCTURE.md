# Codebase Structure

**Analysis Date:** 2026-04-15

## Directory Layout

```
portfolio/
├── app/                    # Next.js App Router pages and API routes
│   ├── api/               # REST API endpoints
│   ├── blog/              # Blog listing and post pages
│   └── layout.tsx         # Root layout with providers
├── components/            # React components
│   ├── ui/               # 64+ Radix UI primitive components
│   ├── sections/         # Page section components
│   ├── layout/           # Shared layout (Navbar, Footer)
│   ├── magicui/          # Custom animated components
│   ├── Markdown/         # Blog markdown renderer
│   └── animate-ui/        # Button animation variants
├── data/                  # Static content (testimonials, companies)
├── model/                 # Mongoose schemas
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
├── hooks/                 # React hooks
├── lib/                   # Third-party utilities (cn)
├── public/               # Static assets
├── scripts/               # Build utilities
├── constant/             # Navigation and config constants
└── .planning/           # GSD planning artifacts
```

## Directory Purposes

**`app/`:**
- Purpose: Next.js App Router pages and API routes
- Contains: `page.tsx`, `layout.tsx`, API routes, blog routes
- Key files: `app/page.tsx`, `app/layout.tsx`

**`components/ui/`:**
- Purpose: 64+ Radix UI base components
- Contains: `button.tsx`, `card.tsx`, `dialog.tsx`, `dropdown-menu.tsx`, etc.
- Pattern: `class-variance-authority` (CVA) for variant styling

**`components/sections/`:**
- Purpose: Page section composition
- Contains: `Hero.tsx`, `AboutSection.tsx`, `ProjectSection.tsx`, `BlogSection.tsx`
- Pattern: Client components with Framer Motion animations

**`components/layout/`:**
- Purpose: Shared layout components
- Contains: `Navbar.tsx`, `Footer.tsx`

**`components/magicui/`:**
- Purpose: Custom animated UI components
- Contains: `magic-card.tsx`, `marquee.tsx`, `shiny-button.tsx`

**`components/Markdown/`:**
- Purpose: Blog content rendering with syntax highlighting
- Contains: `index.jsx`, `codeblog.jsx`, `CopyButton.jsx`

**`data/`:**
- Purpose: Static portfolio content
- Contains: `index.ts` (testimonials, companies, nav items)

**`model/`:**
- Purpose: MongoDB/Mongoose schemas
- Contains: `BlogPost.ts` schema

**`types/`:**
- Purpose: TypeScript interfaces
- Contains: `blog.ts` (BlogPost interface)

**`utils/`:**
- Purpose: Utility functions
- Contains: `db.ts` (MongoDB connection), `slug.ts`, `icons.ts`

**`hooks/`:**
- Purpose: Custom React hooks
- Contains: `use-toast.ts`

## Key File Locations

**Entry Points:**
- `app/page.tsx`: Home page (displays projects, testimonials, tech stack)
- `app/layout.tsx`: Root layout (ThemeProvider, metadata, Google Analytics)
- `app/blog/[slug]/page.tsx`: Individual blog post view

**Configuration:**
- `next.config.ts`: Next.js configuration (images, rewrites)
- `tsconfig.json`: TypeScript configuration with `@/*` path alias
- `tailwind.config.ts`: Tailwind CSS with custom colors and animations
- `package.json`: Dependencies and scripts

**Core Logic:**
- `model/BlogPost.ts`: MongoDB schema definition
- `utils/db.ts`: Database connection singleton
- `components/sections/`: All section components

**Testing:** No test files detected

## Naming Conventions

**Files:**
- PascalCase for components: `Hero.tsx`, `BlogSection.tsx`, `ErrorBoundary.tsx`
- camelCase for utilities: `db.ts`, `slug.ts`, `utils.ts`
- kebab-case for directories: `components/ui/`, `components/sections/`

**Components:**
- PascalCase function names exported as named exports
- Default exports for page components

**Types/Interfaces:**
- PascalCase with descriptive suffixes: `BlogPost`, `BlogSectionProps`

**CSS/Tailwind:**
- kebab-case for Tailwind classes: `bg-black-100`, `text-gray-400`
- CSS variables defined in `tailwind.config.ts`

## Where to Add New Code

**New Feature/Section:**
1. Create component in `components/sections/MySection.tsx`
2. Import and add to `app/page.tsx`
3. Wrap with `<ErrorBoundary>` for reliability

**New Blog:**
- Create via API: `POST /api/blog`
- Or directly in MongoDB with `{ title, excerpt, content, thumbnail, tags, isPublic }`

**New UI Component:**
1. Create in `components/ui/` following Radix patterns
2. Use `class-variance-authority` for variants
3. Export from directory

**New API Endpoint:**
1. Create route handler in `app/api/[resource]/route.ts`
2. Follow REST conventions: GET, POST, PUT, DELETE
3. Use `connectDB()` from `@/utils/db`

**Utilities:**
- Shared helpers: `utils/` or `lib/`
- Component-specific: co-locate with component

## Special Directories

**`components/animate-ui/`:**
- Purpose: Animation-optimized button components
- Generated: No
- Committed: Yes

**`public/`:**
- Purpose: Static assets (images, PDF resume)
- Generated: No
- Committed: Yes

**`scripts/`:**
- Purpose: Build-time utilities (sitemap generation)
- Generated: Output written to `public/`
- Committed: Yes

**`.planning/`:**
- Purpose: GSD workflow artifacts
- Generated: Yes
- Committed: Git-ignored

---

*Structure analysis: 2026-04-15*
