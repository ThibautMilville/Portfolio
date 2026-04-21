'use client';

import { useEffect, useMemo } from 'react';

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Thibaut MILVILLE",
    "jobTitle": "Développeur Fullstack",
    "description": "Développeur Fullstack spécialisé en React, Next.js et NestJS. Créateur d'applications web modernes et performantes.",
    "url": "https://thibaut-milville.dev",
    "image": "https://thibaut-milville.dev/images/photo_profil.jpg",
    "sameAs": [
      "https://github.com/ThibautMilville",
      "https://fr.linkedin.com/in/thibaut-milville",
      "https://t.me/Thybow"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Paris",
      "addressCountry": "France"
    },
    "knowsAbout": [
      "React",
      "Next.js",
      "NestJS",
      "JavaScript",
      "TypeScript",
      "Node.js",
      "Développement Web",
      "Frontend",
      "Backend",
      "Full Stack Development"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Développeur Fullstack",
      "description": "Développement d'applications web modernes avec React, Next.js et NestJS",
      "skills": [
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
        "Docker"
      ]
    },
    "alumniOf": [
      {
        "@type": "EducationalOrganization",
        "name": "CESI École d'Ingénieurs"
      }
    ],
    "worksFor": [
      {
        "@type": "Organization",
        "name": "Ultra"
      },
      {
        "@type": "Organization", 
        "name": "SNCF Voyageurs"
      },
      {
        "@type": "Organization",
        "name": "Osmoz Communication"
      }
    ]
  };

  const serializedData = useMemo(() => JSON.stringify(structuredData), []);

  useEffect(() => {
    const scriptId = 'person-structured-data';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    if (script.textContent !== serializedData) {
      script.textContent = serializedData;
    }

    return () => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [serializedData]);

  return null;
}
