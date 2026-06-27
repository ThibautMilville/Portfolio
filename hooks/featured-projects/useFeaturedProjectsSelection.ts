import { useMemo } from "react";
import { useTranslatedData } from "@/hooks/useTranslatedData";
import {
  FEATURED_PROJECT_PRIORITY,
  MAX_FEATURED_PROJECTS,
} from "@/hooks/featured-projects/constants";
import type { FeaturedProjectItem } from "@/hooks/featured-projects/types";
import type { Project as PortfolioProject } from "@/types/portfolio";

function sortByFeaturedPriority(projects: PortfolioProject[]) {
  return [...projects].sort((a, b) => {
    const aPriority = FEATURED_PROJECT_PRIORITY[a.id] ?? Number.MAX_SAFE_INTEGER;
    const bPriority = FEATURED_PROJECT_PRIORITY[b.id] ?? Number.MAX_SAFE_INTEGER;
    return aPriority - bPriority;
  });
}

export function useFeaturedProjectsSelection(projects: PortfolioProject[]) {
  const { getTranslatedProject } = useTranslatedData();

  return useMemo(() => {
    const flagged = projects.filter((project) => project.isFeatured);
    const fallback = projects.filter((project) => !project.isFeatured);
    const selected = [...sortByFeaturedPriority(flagged), ...fallback].slice(
      0,
      MAX_FEATURED_PROJECTS,
    );

    const items: FeaturedProjectItem[] = selected.map((project) => ({
      original: project,
      translated: getTranslatedProject(project),
    }));

    const spotlight = items[0] ?? null;
    const gridItems = items.slice(1);

    return { items, spotlight, gridItems };
  }, [projects, getTranslatedProject]);
}
