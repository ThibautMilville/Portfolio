import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  localePrefix: 'always'
});

export const config = {
  // Match only internationalized pathnames
  // Exclude API routes, Next.js internals, Vercel internals, static files, and common static routes
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*|favicon|robots|sitemap|manifest).*)'
  ]
};
