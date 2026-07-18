export const getImagePath = (imageName: string): string => {
  return `/images/${imageName}`;
};

export const IMAGES = {
  favicon: getImagePath("favicon.ico"),
  appleTouchIcon: getImagePath("apple-touch-icon.png"),
} as const;
