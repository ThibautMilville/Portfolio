export const localizedRoutes = {
  formations: {
    en: '/education',
    fr: '/formations'
  },
  experiences: {
    en: '/experience',
    fr: '/experiences'
  },
  projets: {
    en: '/projects',
    fr: '/projets'
  },
  contact: {
    en: '/contact',
    fr: '/contact'
  }
} as const;

export type Locale = 'en' | 'fr';
export type RouteKey = keyof typeof localizedRoutes;

export function getLocalizedRoute(route: RouteKey, locale: Locale): string {
  return localizedRoutes[route][locale];
}

export function getRouteFromPathname(pathname: string, locale: Locale): RouteKey | null {
  // Remove locale prefix
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '');
  
  // Check each route for the current locale
  for (const [routeKey, routes] of Object.entries(localizedRoutes)) {
    if (routes[locale] === pathWithoutLocale) {
      return routeKey as RouteKey;
    }
  }
  
  return null;
}
