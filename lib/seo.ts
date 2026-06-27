import type { Metadata } from "next";
import { getLocalizedRoute, type Locale, type RouteKey } from "@/lib/localized-routes";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://thibaut-milville.dev";
export const LOCALES: Locale[] = ["en", "fr"];

export const OG_IMAGE = {
  url: "/images/og-image.png",
  width: 1200,
  height: 630,
  alt: {
    fr: "Thibaut MILVILLE - Développeur Fullstack",
    en: "Thibaut MILVILLE - Fullstack Developer",
  },
} as const;

const SITE_KEYWORDS = {
  fr: [
    "développeur fullstack",
    "react developer",
    "next.js",
    "nestjs",
    "javascript",
    "typescript",
    "portfolio",
    "développement web",
    "frontend",
    "backend",
    "thibaut milville",
  ],
  en: [
    "fullstack developer",
    "react developer",
    "next.js",
    "nestjs",
    "javascript",
    "typescript",
    "portfolio",
    "web development",
    "frontend",
    "backend",
    "thibaut milville",
  ],
} as const;

const PAGE_SEO = {
  home: {
    fr: {
      title: "Thibaut MILVILLE - Développeur Fullstack React & Next.js | Portfolio",
      description:
        "Développeur Fullstack spécialisé en React, Next.js et NestJS. Créateur d'applications web modernes et performantes. Découvrez mes projets, compétences et expériences professionnelles.",
    },
    en: {
      title: "Thibaut MILVILLE - Fullstack React & Next.js Developer | Portfolio",
      description:
        "Fullstack developer specialized in React, Next.js and NestJS. Creator of modern and performant web applications. Discover my projects, skills and professional experiences.",
    },
  },
  projets: {
    fr: {
      title: "Projets | Thibaut MILVILLE - Portfolio",
      description:
        "Découvrez mes réalisations en développement web : applications React, Next.js, Web3 et projets fullstack.",
    },
    en: {
      title: "Projects | Thibaut MILVILLE - Portfolio",
      description:
        "Explore my web development projects: React, Next.js, Web3 and fullstack applications.",
    },
  },
  experiences: {
    fr: {
      title: "Expériences | Thibaut MILVILLE - Portfolio",
      description:
        "Mon parcours professionnel : développeur fullstack chez Ultra, SNCF Voyageurs, Osmoz Communication et plus.",
    },
    en: {
      title: "Experience | Thibaut MILVILLE - Portfolio",
      description:
        "My professional journey: fullstack developer at Ultra, SNCF Voyageurs, Osmoz Communication and more.",
    },
  },
  formations: {
    fr: {
      title: "Formations | Thibaut MILVILLE - Portfolio",
      description:
        "Mon parcours académique et certifications : diplômes, badges et compétences acquises en développement web.",
    },
    en: {
      title: "Education | Thibaut MILVILLE - Portfolio",
      description:
        "My academic background and certifications: degrees, badges and web development skills acquired.",
    },
  },
  contact: {
    fr: {
      title: "Contact | Thibaut MILVILLE - Portfolio",
      description:
        "Contactez-moi pour discuter de votre projet web. Disponible en freelance, conseil et missions longues.",
    },
    en: {
      title: "Contact | Thibaut MILVILLE - Portfolio",
      description:
        "Get in touch to discuss your web project. Available for freelance, consulting and long-term missions.",
    },
  },
} as const;

export function getAbsoluteUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}

export function buildAlternates(
  pathByLocale: Record<Locale, string>,
  currentLocale: Locale,
): Metadata["alternates"] {
  return {
    canonical: getAbsoluteUrl(pathByLocale[currentLocale]),
    languages: {
      en: getAbsoluteUrl(pathByLocale.en),
      fr: getAbsoluteUrl(pathByLocale.fr),
      "x-default": getAbsoluteUrl(pathByLocale.en),
    },
  };
}

export function buildRouteAlternates(
  routeKey: RouteKey,
  currentLocale: Locale,
): Metadata["alternates"] {
  return buildAlternates(
    {
      en: `/en${getLocalizedRoute(routeKey, "en")}`,
      fr: `/fr${getLocalizedRoute(routeKey, "fr")}`,
    },
    currentLocale,
  );
}

export function buildLocalizedPath(locale: Locale, routeKey: RouteKey, slug?: string): string {
  const base = `/${locale}${getLocalizedRoute(routeKey, locale)}`;
  return slug ? `${base}/${slug}` : base;
}

export function getSiteMetadata(locale: string): Metadata {
  const lang = (locale === "fr" ? "fr" : "en") as Locale;
  const isFrench = lang === "fr";

  return {
    metadataBase: new URL(SITE_URL),
    keywords: [...SITE_KEYWORDS[lang]],
    authors: [{ name: "Thibaut MILVILLE" }],
    creator: "Thibaut MILVILLE",
    publisher: "Thibaut MILVILLE",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: isFrench ? "fr_FR" : "en_US",
      siteName: isFrench ? "Portfolio Thibaut MILVILLE" : "Thibaut MILVILLE Portfolio",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export function createPageMetadata({
  locale,
  title,
  description,
  path,
  alternates,
  image,
  imageAlt,
}: {
  locale: string;
  title: string;
  description: string;
  path: string;
  alternates?: Metadata["alternates"];
  image?: string;
  imageAlt?: string;
}): Metadata {
  const lang = (locale === "fr" ? "fr" : "en") as Locale;
  const isFrench = lang === "fr";
  const ogImage = image ?? OG_IMAGE.url;
  const ogImageAlt = imageAlt ?? OG_IMAGE.alt[lang];

  return {
    title,
    description,
    alternates: alternates ?? { canonical: getAbsoluteUrl(path) },
    openGraph: {
      type: "website",
      locale: isFrench ? "fr_FR" : "en_US",
      url: getAbsoluteUrl(path),
      title,
      description,
      siteName: isFrench ? "Portfolio Thibaut MILVILLE" : "Thibaut MILVILLE Portfolio",
      images: [
        {
          url: ogImage,
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function createStaticPageMetadata(routeKey: RouteKey, locale: string): Metadata {
  const lang = (locale === "fr" ? "fr" : "en") as Locale;
  const seo = PAGE_SEO[routeKey][lang];
  const path = buildLocalizedPath(lang, routeKey);

  return createPageMetadata({
    locale: lang,
    title: seo.title,
    description: seo.description,
    path,
    alternates: buildRouteAlternates(routeKey, lang),
  });
}

export function createHomeMetadata(locale: string): Metadata {
  const lang = (locale === "fr" ? "fr" : "en") as Locale;
  const seo = PAGE_SEO.home[lang];

  return createPageMetadata({
    locale: lang,
    title: seo.title,
    description: seo.description,
    path: `/${lang}`,
    alternates: buildAlternates({ en: "/en", fr: "/fr" }, lang),
  });
}
