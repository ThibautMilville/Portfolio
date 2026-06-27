import type { Project as PortfolioProject } from "@/types/portfolio";

export type FeaturedProjectItem = {
  original: PortfolioProject;
  translated: PortfolioProject;
};

export type FeaturedProjectCardVariant = "spotlight" | "compact";
