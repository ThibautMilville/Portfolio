import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function detectBrowserLocale(): "fr" | "en" {
  if (typeof navigator === "undefined") return "en";
  const lang =
    navigator.language ||
    (Array.isArray(navigator.languages) ? navigator.languages[0] : "en");
  return lang.toLowerCase().startsWith("fr") ? "fr" : "en";
}

// Slugify a human-readable title for use in URLs
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove diacritics
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

// Translate date strings based on locale
export function translateDate(
  date: string,
  locale: "fr" | "en" = "fr"
): string {
  if (!date) return "";

  // Handle "Présent" / "Present" translation
  if (date.includes("Présent") || date.includes("Present")) {
    return locale === "fr"
      ? date.replace("Present", "Présent")
      : date.replace("Présent", "Present");
  }

  return date;
}

// Translate date strings using current locale from next-intl
export function translateDateWithLocale(
  date: string,
  t: (key: string) => string
): string {
  if (!date) return "";

  // Handle "Présent" / "Present" translation
  if (date.includes("Présent") || date.includes("Present")) {
    try {
      const translated = t("present");
      // Check if translation failed (returns the key itself or contains the namespace)
      if (
        translated === "present" ||
        translated.includes("Common.Dates") ||
        translated.includes("MISSING_MESSAGE")
      ) {
        // Fallback: keep the original language
        return date;
      }
      return date.replace(/Présent|Present/g, translated);
    } catch (error) {
      // Fallback if translation fails
      console.warn("Translation failed for 'present', using original date");
      return date;
    }
  }

  return date;
}

// Simple date translation function that doesn't depend on Common.Dates
export function translateDateSimple(date: string, locale: string): string {
  if (!date) return "";

  // Month translations
  const monthTranslations = {
    fr: {
      Jan: "Jan",
      Feb: "Fév",
      Mar: "Mar",
      Apr: "Avr",
      May: "Mai",
      Jun: "Juin",
      Jul: "Juil",
      Aug: "Août",
      Sep: "Sep",
      Oct: "Oct",
      Nov: "Nov",
      Dec: "Déc",
    },
    en: {
      Jan: "Jan",
      Fév: "Feb",
      Mar: "Mar",
      Avr: "Apr",
      Mai: "May",
      Juin: "Jun",
      Juil: "Jul",
      Août: "Aug",
      Sep: "Sep",
      Oct: "Oct",
      Nov: "Nov",
      Déc: "Dec",
    },
  };

  let translatedDate = date;

  // Translate months
  const months = monthTranslations[locale as keyof typeof monthTranslations];
  if (months) {
    Object.entries(months).forEach(([from, to]) => {
      translatedDate = translatedDate.replace(new RegExp(from, "g"), to);
    });
  }

  // Handle "Présent" / "Present" translation
  if (
    translatedDate.includes("Présent") ||
    translatedDate.includes("Present")
  ) {
    if (locale === "fr") {
      return translatedDate.replace(/Present/g, "Présent");
    } else {
      return translatedDate.replace(/Présent/g, "Present");
    }
  }

  return translatedDate;
}
