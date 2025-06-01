import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const publicRoutes = createRouteMatcher([
  '/',
  '/api(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  // Allow static files and images
  '/_next/static/(.*)',
  '/images/(.*)',
  '/favicon.ico',
  '/_next/static/(.*)',
  '/images/(.*)',
  '/api/webhook/(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (!publicRoutes(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Only allow the landing page ("/"), block everything else
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Explicitly block all routes except "/"
    '/((?!^$).*)', // Match everything except the root path "/"
  ],
};
