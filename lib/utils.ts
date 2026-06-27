import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
  if (translatedDate.includes("Présent") || translatedDate.includes("Present")) {
    if (locale === "fr") {
      return translatedDate.replace(/Present/g, "Présent");
    } else {
      return translatedDate.replace(/Présent/g, "Present");
    }
  }

  return translatedDate;
}
