# Codebase Concerns

**Analysis Date:** 2026-04-15

---

## Test Coverage Gaps

**No automated tests exist in the codebase.**
- What's not tested: Entire application — 0 test files
- Files: Entire codebase
- Risk: Any refactoring or dependency update could break functionality without detection
- Priority: **HIGH**

---

## Tech Debt

### 1. No Database Indexes
- Issue: `BlogPost` schema in `model/BlogPost.ts` has no indexes
- Files: `model/BlogPost.ts`
- Impact: Queries on `title`, `tags`, and `isPublic` will perform full collection scans as data grows
- Fix approach: Add compound index for common query patterns:
  ```typescript
  BlogPostSchema.index({ isPublic: 1, createdAt: -1 });
  BlogPostSchema.index({ title: 'text', content: 'text' }); // If full-text search needed
  ```

### 2. MongoDB Connection Missing Retry & Backoff
- Issue: `utils/db.ts` attempts connection once with no exponential backoff
- Files: `utils/db.ts` (lines 29-58)
- Impact: Transient network failures will immediately fail requests instead of retrying
- Fix approach: Add retry with exponential backoff:
  ```typescript
  // Add max retries and backoff delay
  ```

### 3. TypeScript Errors Disabled at Build
- Issue: `next.config.ts` sets `ignoreBuildErrors: true` (line 28)
- Files: `next.config.ts`
- Impact: Type errors can accumulate undetected; production builds may have type mismatches
- Fix approach: Fix all type errors and set `ignoreBuildErrors: false`

### 4. ESLint Disabled at Build
- Issue: `next.config.ts` sets `ignoreDuringBuilds: true` (line 25)
- Files: `next.config.ts`
- Impact: Lint violations don't block builds; code quality degrades over time
- Fix approach: Enable ESLint during builds and fix all violations

### 5. Duplicate Interface Definition
- Issue: `BlogPost` interface defined twice in `app/blog/[slug]/page.tsx` (lines 7-15 and 17-26)
- Files: `app/blog/[slug]/page.tsx`
- Impact: Confusion and potential divergence; maintenance burden
- Fix approach: Import from `@/types/blog` or create shared type file

---

## Security Considerations

### 1. No Rate Limiting on API Endpoints
- Risk: Public blog API endpoints have no rate limiting
- Files: `app/api/blog/route.ts`, `app/api/blog/[id]/route.ts`
- Current mitigation: None
- Recommendations: Add rate limiting via `@upstash/ratelimit` or similar

### 2. Hardcoded Production URLs
- Risk: `app/blog/[slug]/page.tsx` contains hardcoded `https://www.milankatira.com` URLs
- Files: `app/blog/[slug]/page.tsx` (lines 29, 79, 115)
- Current mitigation: Using env var pattern elsewhere (NEXT_PUBLIC_API_URL)
- Recommendations: Use environment variable for API base URL instead

### 3. No Input Validation on Blog API
- Risk: No schema validation on POST/PUT payloads (though these endpoints don't exist yet)
- Files: `app/api/blog/*`
- Current mitigation: Mongoose has no validation decorators enabled
- Recommendations: Enable Mongoose validation or use Zod DTOs when adding write endpoints

### 4. Revalidation Endpoint Has Minimal Security
- Risk: `/api/revalidate` depends only on a secret header comparison
- Files: `app/api/revalidate/route.ts` (line 8)
- Current mitigation: Requires matching `REVALIDATE_SECRET` env var
- Recommendations: Ensure secret is sufficiently long; consider IP allowlist for additional protection

---

## Performance Bottlenecks

### 1. No Request Timeout on MongoDB Connection
- Problem: Connection attempt has no timeout — can hang indefinitely
- Files: `utils/db.ts`
- Cause: `mongoose.connect()` called without `serverSelectionTimeoutMS`
- Improvement path: Add timeout option:
  ```typescript
  mongoose.connect(MONGO_URL, { ...opts, serverSelectionTimeoutMS: 5000 });
  ```

### 2. Bundle Size Not Optimized
- Problem: No bundle analysis or size limits configured
- Files: `package.json` has no size budgets
- Cause: Large UI component library (64+ Radix components imported)
- Improvement path: Add `@next/bundle-analyzer` and configure size budgets

### 3. No Lazy Loading for Blog Data
- Problem: Blog page fetches all posts with full content in `GET` endpoint
- Files: `app/api/blog/route.ts` (lines 9-19)
- Cause: Returns complete document including `content` field for list view
- Improvement path: Create separate DTO for list view without `content`:
  ```typescript
  const posts = await BlogPost.find({ isPublic: true }, { content: 0 });
  ```

---

## Fragile Areas

### 1. Blog Slug Query Uses Regex (Injection Risk + Performance)
- Problem: Search uses `new RegExp(params.id, "i")` with user input
- Files: `app/api/blog/[id]/route.ts` (line 14)
- Why fragile:
  - Regex injection: Special characters in input can cause catastrophic backtracking
  - No index usage: Regex without anchors scans entire collection
- Safe modification: Use exact match or add strict sanitization:
  ```typescript
  // Use escaped literal string instead of regex
  const query = { title: escapeRegExp(params.id) };
  // Or use exact match on slug field
  ```

### 2. No Error Boundaries Around Individual Sections
- Problem: Single `ErrorBoundary` wraps entire page, not individual sections
- Files: `app/layout.tsx`, `components/ErrorBoundary.tsx`
- Why fragile: One section failure takes down entire page
- Safe modification: Wrap each section (`Hero`, `ProjectSection`, `BlogSection`) in separate ErrorBoundary

### 3. Missing Loading States for Dynamic Imports
- Problem: `app/page.tsx` uses simple div placeholder for lazy-loaded components (lines 14, 19)
- Files: `app/page.tsx` (lines 13-21)
- Why fragile: Users see blank flash during load with no skeleton or spinner
- Safe modification: Use proper skeleton components matching final content dimensions

---

## Known Bugs

### 1. Blog API Returns Empty Array Silently on Failure
- Symptoms: `app/page.tsx` catches error and returns `[]` (line 39)
- Files: `app/page.tsx` (lines 27-41)
- Trigger: MongoDB down or API unreachable
- Workaround: Error is logged but users see empty section with no indication of failure
- Fix approach: Return error state to show fallback with retry button

### 2. Revalidation Endpoint Uses Wrong HTTP Method
- Issue: Uses `POST` but also doesn't invalidate cache properly
- Files: `app/api/revalidate/route.ts`
- Trigger: Calling the endpoint
- Workaround: Uses `revalidatePath('/', 'layout')` but should specify route

### 3. Component Uses `typeof window` Inproperly
- Pattern: `typeof window != 'undefined'` (Hero.tsx line 17)
- Files: `components/sections/Hero.tsx` (line 17)
- Trigger: Causes unnecessary runtime check; should be in useEffect or useIsomorphicEffect
- Fix approach: In "use client" context, window is always defined

---

## Logging Issues

### 1. Inconsistent Console Logging (15 occurrences)
- Files: Multiple files across codebase
- Pattern: Mix of `console.log`, `console.error`, `console.warn`
- Impact: No structured logging; inconsistent log levels
- Fix approach: Create logger utility with levels or use `@platform-core/logger` pattern

---

## Dependencies at Risk

### 1. Very Old Nodemailer Version
- Package: `nodemailer: ^7.0.11` (from 2020)
- Risk: Security vulnerabilities in older versions; missing features
- Impact: Email sending may have issues with modern providers
- Migration plan: Upgrade to ^7.x latest or ^8.x

### 2. Experimental Features in Production
- Package: `@million/lint: ^1.0.14`
- Risk: Experimental; may have breaking changes or be abandoned
- Impact: Build pipeline depends on experimental tool
- Migration plan: Replace with standard ESLint or Biome

### 3. Beta Motion Library
- Package: `motion: ^12.23.25` (different from `framer-motion`)
- Risk: Two animation libraries increase bundle size; potential conflicts
- Impact: `framer-motion` and `motion` both in dependencies
- Migration plan: Choose one and migrate all components

---

## Scaling Limits

### 1. Single MongoDB Connection Pool
- Current capacity: Default pool (typically 1 connection)
- Limit: No configured pool size; defaults to 5 in recent Mongoose
- Scaling path: Configure `maxPoolSize` in connection options

### 2. No Static Generation for Blog Posts
- Current setup: ISR with 3600s revalidation
- Limit: All blog pages generated on-demand
- Scaling path: Add `generateStaticParams` with build-time generation for published posts

---

## Missing Critical Features

### 1. No Authentication/Authorization for Blog Management
- Problem: No way to create/update/delete blog posts securely
- Blocks: Content management without direct database access

### 2. No Request Validation Middleware
- Problem: No centralized validation for API routes
- Blocks: Consistent input sanitization

### 3. No API Response Caching
- Problem: Blog API fetches from MongoDB on every request
- Blocks: Fast response times under load

### 4. No Sitemap Auto-Update Trigger
- Problem: Sitemap must be regenerated manually (`yarn generate-sitemap`)
- Blocks: SEO reflects stale URLs after blog changes