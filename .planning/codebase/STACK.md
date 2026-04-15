# Technology Stack

**Analysis Date:** 2026-04-15

## Languages

**Primary:**
- TypeScript 5.9.2 - Full-stack development (React components, API routes, utilities)
- JavaScript (ES5/ESNext) - Compiled via Next.js

**Secondary:**
- CSS/Tailwind - Styling via Tailwind CSS with custom design tokens

## Runtime

**Environment:**
- Node.js 22.x (specified in `package.json` engines and `volta` config)

**Package Manager:**
- Yarn 1.22.22+ - Lockfile present in `package.json`
- Volta for Node.js version pinning (22.21.0)

## Frameworks

**Core:**
- Next.js 16.1.5 - React framework with App Router, ISR support
- React 19.0.0 - UI library

**Styling:**
- Tailwind CSS 3.4.1 - Utility-first CSS framework
- Radix UI - Headless UI primitives (avatar, dialog, toast, icons, slot)

**State Management:**
- Zustand 5.0.3 - Lightweight state management

**Testing:**
- ESLint 9 - Linting with eslint-config-next
- Million Lint 1.0.14 - Virtual DOM optimization (experimental)

**Build/Dev:**
- PostCSS 8 - CSS processing
- Autoprefixer 10.4.21 - Vendor prefixing
- ts-node - TypeScript execution for scripts

## Key Dependencies

**UI & Animation:**
- framer-motion 12.12.1 - Animation library
- motion 12.23.25 - Motion One animation library
- canvas-confetti 1.9.3 - Confetti effects
- embla-carousel-react 8.5.2 - Carousel component
- lucide-react 0.523.0 - Icon library
- react-icons 5.5.0 - Additional icons (Fa, Io, etc.)

**Markdown & Content:**
- react-markdown 9.0.3 - Markdown rendering
- rehype-highlight 7.0.2 - Code syntax highlighting
- highlight.js 11.11.1 - Syntax highlighting engine
- @tailwindcss/typography 0.5.16 - Prose styling for markdown

**Database:**
- mongoose 8.15.0 - MongoDB ODM

**Email:**
- nodemailer 7.0.11 - Email sending

**SEO:**
- sitemap 8.0.0 - Sitemap generation
- next-nprogress-bar 2.4.7 - Progress bar for navigation

**Theming:**
- next-themes 0.4.6 - Light/dark mode support
- tailwind-merge 3.0.1 - Tailwind class merging
- class-variance-authority 0.7.1 - Class variance utility
- clsx 2.1.1 - Conditional class names
- tailwindcss-animate 1.0.7 - Animation utilities
- mini-svg-data-uri 1.4.4 - SVG to data URI conversion
- cobe 0.6.3 - Canvas sphere rendering

**Types:**
- @types/node 20.19.1
- @types/react 19
- @types/react-dom 19
- @types/nodemailer 6.4.17
- @types/canvas-confetti 1.9.0

## Configuration

**Environment:**
- `.env.local` - Required for local development
- Required variables:
  - `NEXT_PUBLIC_MONGO_URL` - MongoDB connection string
  - `NEXT_PUBLIC_API_URL` - API base URL (optional, defaults to relative)
  - `REVALIDATE_SECRET` - Secret for on-demand ISR revalidation

**Build:**
- `next.config.ts` - Next.js configuration with image domains, rewrites
- `tailwind.config.ts` - Tailwind with custom colors, animations, plugins
- `postcss.config.js` - PostCSS configuration
- `tsconfig.json` - TypeScript with strict mode, path aliases (@/*)

**Image Domains (approved for Next.js Image component):**
- cdn.simpleicons.org
- images.unsplash.com
- avatars.githubusercontent.com

## Platform Requirements

**Development:**
- Node.js 22.x
- MongoDB instance (local or Atlas)
- Yarn package manager

**Production:**
- Node.js runtime
- MongoDB database
- Optional: Email service for contact form (Nodemailer)

---

*Stack analysis: 2026-04-15*
