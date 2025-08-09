import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function detectBrowserLocale(): 'fr' | 'en' {
  if (typeof navigator === 'undefined') return 'en';
  const lang = navigator.language || (Array.isArray(navigator.languages) ? navigator.languages[0] : 'en');
  return lang.toLowerCase().startsWith('fr') ? 'fr' : 'en';
}
