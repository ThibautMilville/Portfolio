// Utilitaire pour gérer les images avec l'alias @images/
export const getImagePath = (imageName: string): string => {
  return `/images/${imageName}`;
};

// Images principales
export const IMAGES = {
  profile: getImagePath("photo-profil.png"),
  og: getImagePath("og-image.png"),
  favicon: getImagePath("favicon.ico"),
  appleTouchIcon: getImagePath("apple-touch-icon.png"),
  ultra: getImagePath("company/logo_ultra.png"),
  ultraTimes: getImagePath("company/logo_UT.png"),
  sncf: getImagePath("company/Logo-SNCF-Voyageurs.webp"),
  cesi: getImagePath("education/cesi.webp"),
} as const;

// Chemins avec alias @public/
export const PUBLIC_IMAGES = {
  ultra: "@public/images/company/logo_ultra.png",
  ultraTimes: "@public/images/company/logo_UT.png",
  sncf: "@public/images/company/Logo-SNCF-Voyageurs.webp",
  cesi: "@public/images/education/cesi.webp",
} as const;

// Fonction pour importer une image avec l'alias @images/
export const importImage = (imageName: string): string => {
  return `@images/${imageName}`;
};
