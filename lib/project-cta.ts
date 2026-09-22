/** Categories whose demo URL is a live site (not a throwaway demo). */
export const SITE_VIEW_CATEGORIES = ["Showcase", "E-commerce", "Corporate"] as const;

export const ASHES_OF_MANKIND_TITLE = "Ashes of Mankind - Empires";

export type ProjectDemoCtaKey = "viewGame" | "viewSite" | "viewDemo";

/**
 * Pick the external-link CTA key from the canonical (untranslated) project fields.
 * Prefer original category/title so locale category labels cannot break the match.
 */
export function getProjectDemoCtaKey(project: {
  title?: string;
  category?: string;
}): ProjectDemoCtaKey {
  if (project.title === ASHES_OF_MANKIND_TITLE) {
    return "viewGame";
  }
  if (
    project.category &&
    (SITE_VIEW_CATEGORIES as readonly string[]).includes(project.category)
  ) {
    return "viewSite";
  }
  return "viewDemo";
}
