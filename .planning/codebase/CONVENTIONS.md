# Coding Conventions

**Analysis Date:** 2026-04-15

## Naming Patterns

**Files:**
- Components: PascalCase with descriptive names (`Hero.tsx`, `Navbar.tsx`, `Spotlight.tsx`)
- Utilities: kebab-case (`slug.ts`, `db.ts`, `icons.ts`)
- Config: kebab-case with config extension (`tailwind.config.ts`, `next.config.ts`)

**Functions:**
- camelCase: `toSlug()`, `dbConnect()`, `revertSlug()`
- Hooks: `useRef`, `useEffect` (React built-ins), custom: `useToast`

**Variables:**
- camelCase: `cached`, `containerRef`, `posts`
- Interfaces/Types: PascalCase: `ButtonProps`, `BlogPostType`, `Params`

**Constants:**
- PascalCase exports: `navItems`, `testimonials`, `gridItems`
- File naming: `constant/index.ts` for constants

## Code Style

**Formatting:**
- Tool: Prettier (integrated with Next.js)
- Uses Tailwind CSS class ordering convention

**Linting:**
- Tool: ESLint with `next/core-web-vitals` config (`.eslintrc.json`)
- `lint` script runs: `next lint`

**TypeScript:**
- `strict: true` enabled in `tsconfig.json`
- `jsx: react-jsx` (no React import needed)
- Path alias: `@/*` maps to project root

## Import Organization

**Order:**
1. React imports: `import * as React from 'react'`
2. External libraries: `import { Slot } from '@radix-ui/react-slot'`
3. Internal utils: `import { cn } from '@/lib/utils'`
4. Local components: `import { Button } from '@/components/ui/button'`
5. Data/constants: `import { testimonials } from '@/data'`

**Path Aliases:**
- `@/*` → `./` (project root)
- Used throughout: `@/components/ui/button`, `@/utils/db`, `@/model/BlogPost`

## Error Handling

**Patterns:**

API Routes (`app/api/blog/route.ts`):
```typescript
try {
  await connectDB();
  const posts = await BlogPost.find({});
  return NextResponse.json(posts);
} catch (error) {
  console.error("Blog API error:", error);
  return NextResponse.json(
    { error: error instanceof Error ? error.message : "An unknown error occurred" },
    { status: 500 }
  );
}
```

Database Connection (`utils/db.ts`):
```typescript
cached.promise = mongoose.connect(MONGO_URL, opts).catch((error) => {
  console.error("❌ MongoDB connection error:", error);
  throw new Error("Failed to connect to MongoDB");
});
```

**Console Logging:**
- Uses emoji prefixes: `✅ MongoDB connected`, `❌ Failed to connect to MongoDB`
- Error-first pattern for failures

## Component Design

**Pattern: Compound Components with Variants**

Uses CVA (class-variance-authority) for variant management:

```typescript
// components/ui/button.tsx
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium...',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground...',
        outline: 'border border-input bg-background...',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
      },
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}
```

**Forward Ref Pattern:**
```typescript
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = 'Button';
```

## Utility Functions

**Class Merging (`lib/utils.ts`):**
```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Slug Utilities (`utils/slug.ts`):**
```typescript
export function toSlug(input: string) {
  return input?.toLowerCase().replace(/\s+/g, "-");
}

export function revertSlug(slug: string) {
  return slug.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
```

## Database Patterns

**Mongoose Schema (`model/BlogPost.ts`):**
```typescript
import mongoose from "mongoose";

const { Schema } = mongoose;

const BlogPostSchema = new Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  thumbnail: { type: String, required: true },
  tags: [{ type: String }],
  isPublic: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.BlogPost || mongoose.model("BlogPost", BlogPostSchema);
```

**Connection Pooling (`utils/db.ts`):**
- Uses global cache for connection pooling
- Lazy connection pattern
- Buffer commands disabled for Next.js serverless

## React Patterns

**Client Components:**
```typescript
"use client"
import { useRef, useEffect } from "react";
```

**Framer Motion Animations:**
```typescript
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.3 }
  }
};
```

## API Routes

**Next.js Route Handlers:**
```typescript
// app/api/blog/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const posts = await BlogPost.find({}, { /* projection */ });
    return NextResponse.json(posts);
  } catch (error) { /* error handling */ }
}
```

**Dynamic Routes (`app/api/blog/[id]/route.ts`):**
```typescript
interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  const query = { title: new RegExp(params.id, "i") };
}
```

## State Management

**Zustand Store (`hooks/use-toast.ts`):**
```typescript
import { create } from 'zustand';
```

## Comments

**When to Comment:**
- UI component source attribution: `/** UI: Spotlights Link: https://ui.aceternity.com/components/spotlight */`
- Minimal inline comments for complex logic

**JSDoc/TSDoc:**
- Not extensively used; types defined via TypeScript interfaces

## CSS/Tailwind

**Tailwind Configuration (`tailwind.config.ts`):**
- Custom color palette via CSS variables
- Typography plugin for prose
- Animation utilities

---

*Convention analysis: 2026-04-15*
