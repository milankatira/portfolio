# External Integrations

**Analysis Date:** 2026-04-15

## APIs & External Services

**No external API integrations detected.** This is a self-contained portfolio with local blog functionality.

**Static Assets (CDN Images):**
- `cdn.simpleicons.org` - SimpleIcons SVG for tech stack logos
- `images.unsplash.com` - Unsplash photography
- `avatars.githubusercontent.com` - GitHub user avatars

## Data Storage

**Database:**
- MongoDB (via Mongoose ODM)
  - Connection: `NEXT_PUBLIC_MONGO_URL` environment variable
  - Client: Mongoose 8.15.0 with connection pooling
  - Schema: `BlogPost` in `model/BlogPost.ts`
  - Connection pattern: Cached singleton in `utils/db.ts`

**File Storage:**
- Local filesystem only
- Blog content stored as Markdown strings in MongoDB
- Images use external URLs (not uploaded)

**Caching:**
- None - Uses Next.js built-in ISR caching
- Blog data cached for 1 hour via `revalidate: 3600`

## Authentication & Identity

**Auth Provider:**
- None required - Public portfolio site
- No user accounts or authentication

## Monitoring & Observability

**Error Tracking:**
- None configured
- Console.log for development debugging

**Logs:**
- Development: Console output via `console.error`
- Production: Not configured

## CI/CD & Deployment

**Hosting:**
- Not specified - Self-deployed Next.js application

**CI Pipeline:**
- Not detected - No CI configuration files (no GitHub Actions, Jenkins, etc.)

**Build:**
- `yarn build` - Next.js production build
- `yarn dev` - Development server
- `yarn start` - Production server
- `yarn lint` - ESLint checking

## Environment Configuration

**Required env vars:**
- `NEXT_PUBLIC_MONGO_URL` - MongoDB connection string (e.g., `mongodb://localhost:27017/portfolio`)

**Optional env vars:**
- `NEXT_PUBLIC_API_URL` - API base URL (defaults to relative URLs)
- `REVALIDATE_SECRET` - Secret for on-demand ISR revalidation via `/api/revalidate`

**Secrets location:**
- `.env.local` for local development (gitignored)
- `.env.local.example` template provided

## Webhooks & Callbacks

**Incoming:**
- None - No webhooks received

**Outgoing:**
- `/api/revalidate` - On-demand ISR cache invalidation endpoint
  - Accepts POST requests with `x-revalidate-secret` header
  - Revalidates home page (`/`) after blog content updates

## Email (Optional)

**Provider:**
- Nodemailer 7.0.11 - Configured but not actively used in codebase

**Purpose:**
- Contact form email sending (if implemented)
- Requires SMTP credentials in environment variables

---

*Integration audit: 2026-04-15*
