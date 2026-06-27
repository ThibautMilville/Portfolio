import type { Locale } from "@/lib/localized-routes";
import { getAbsoluteUrl } from "@/lib/seo";

const STRUCTURED_DATA = {
  fr: {
    jobTitle: "Développeur Fullstack",
    description:
      "Développeur Fullstack spécialisé en React, Next.js et NestJS. Créateur d'applications web modernes et performantes.",
    knowsAbout: [
      "React",
      "Next.js",
      "NestJS",
      "JavaScript",
      "TypeScript",
      "Node.js",
      "Développement Web",
      "Frontend",
      "Backend",
      "Full Stack Development",
    ],
    occupationDescription:
      "Développement d'applications web modernes avec React, Next.js et NestJS",
  },
  en: {
    jobTitle: "Fullstack Developer",
    description:
      "Fullstack developer specialized in React, Next.js and NestJS. Creator of modern and performant web applications.",
    knowsAbout: [
      "React",
      "Next.js",
      "NestJS",
      "JavaScript",
      "TypeScript",
      "Node.js",
      "Web Development",
      "Frontend",
      "Backend",
      "Full Stack Development",
    ],
    occupationDescription: "Building modern web applications with React, Next.js and NestJS",
  },
} as const;

export default function StructuredData({ locale }: { locale: string }) {
  const lang = (locale === "fr" ? "fr" : "en") as Locale;
  const content = STRUCTURED_DATA[lang];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Thibaut MILVILLE",
    jobTitle: content.jobTitle,
    description: content.description,
    url: getAbsoluteUrl(`/${lang}`),
    image: getAbsoluteUrl("/images/photo-profil.png"),
    sameAs: [
      "https://github.com/ThibautMilville",
      "https://fr.linkedin.com/in/thibaut-milville",
      "https://t.me/Thybow",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Paris",
      addressCountry: "France",
    },
    knowsAbout: content.knowsAbout,
    hasOccupation: {
      "@type": "Occupation",
      name: content.jobTitle,
      description: content.occupationDescription,
      skills: [
        "React",
        "Next.js",
        "NestJS",
        "JavaScript",
        "TypeScript",
        "Node.js",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "Git",
        "Docker",
      ],
    },
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "CESI École d'Ingénieurs",
      },
    ],
    worksFor: [
      {
        "@type": "Organization",
        name: "Ultra",
      },
      {
        "@type": "Organization",
        name: "SNCF Voyageurs",
      },
      {
        "@type": "Organization",
        name: "Osmoz Communication",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD statique contrôlé, sans entrée utilisateur
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
