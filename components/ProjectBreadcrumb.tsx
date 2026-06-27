"use client";

import { ChevronRight, Home } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import React from "react";
import { getLocalizedProjectRoute } from "@/lib/localized-routes";
import { Link } from "@/navigation";

interface ProjectBreadcrumbProps {
  projectTitle: string;
}

export function ProjectBreadcrumb({ projectTitle }: ProjectBreadcrumbProps) {
  const t = useTranslations("Pages.projets");
  const tNav = useTranslations("Navigation");
  const locale = useLocale() as "en" | "fr";
  const [projectsHref, setProjectsHref] = React.useState(() =>
    getLocalizedProjectRoute(locale),
  );

  React.useEffect(() => {
    const base = getLocalizedProjectRoute(locale);
    const page = window.sessionStorage.getItem("projetsPage");
    setProjectsHref(page ? `${base}?page=${page}` : base);
  }, [locale]);

  return (
    <nav aria-label={t("breadcrumbLabel")} className="mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        <li className="flex items-center gap-1.5">
          <Link
            href="/"
            className="inline-flex items-center gap-1 transition-colors hover:text-primary"
          >
            <Home className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{tNav("home")}</span>
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" />
        </li>
        <li>
          <Link href={projectsHref} className="transition-colors hover:text-primary">
            {t("projects")}
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" />
        </li>
        <li className="min-w-0">
          <span className="line-clamp-1 font-medium text-foreground" aria-current="page">
            {projectTitle}
          </span>
        </li>
      </ol>
    </nav>
  );
}
