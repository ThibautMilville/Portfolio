/** Normalise accents for month matching (Août -> aout, Déc -> dec). */
function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

const MONTH_MAP: Record<string, number> = {
  jan: 1,
  janvier: 1,
  january: 1,
  fev: 2,
  fevr: 2,
  fevrier: 2,
  feb: 2,
  february: 2,
  mar: 3,
  mars: 3,
  march: 3,
  avr: 4,
  avril: 4,
  apr: 4,
  april: 4,
  mai: 5,
  may: 5,
  jun: 6,
  juin: 6,
  june: 6,
  jul: 7,
  juil: 7,
  juillet: 7,
  july: 7,
  aou: 8,
  aout: 8,
  aug: 8,
  august: 8,
  sep: 9,
  sept: 9,
  septembre: 9,
  september: 9,
  oct: 10,
  octobre: 10,
  october: 10,
  nov: 11,
  novembre: 11,
  november: 11,
  dec: 12,
  decembre: 12,
  december: 12,
};

const MONTH_PATTERN =
  "(janvier|fevrier|fevr|fev|jan|february|feb|january|mar|mars|march|avr|avril|apr|april|mai|may|jun|juin|june|jul|juil|juillet|july|aou|aout|aug|august|sep|sept|septembre|september|oct|octobre|october|nov|novembre|november|dec|decembre|december)";

const PRESENT_RE = /\b(present|presente)\b/;

/** Parse "mois année" or bare year into a timestamp (1st of month / Dec for year-only). */
function parseMonthOrYearToken(token: string): number | null {
  const n = normalize(token.trim());
  if (!n || PRESENT_RE.test(n)) return null;

  const monthYear = n.match(new RegExp(`^${MONTH_PATTERN}\\s+(\\d{4})$`));
  if (monthYear) {
    const m = MONTH_MAP[monthYear[1]] ?? 1;
    const y = parseInt(monthYear[2], 10);
    return new Date(y, m - 1, 1).getTime();
  }

  const yearOnly = n.match(/^(\d{4})$/);
  if (yearOnly) {
    const y = parseInt(yearOnly[1], 10);
    return new Date(y, 11, 1).getTime();
  }

  // Fallback: first month+year or year anywhere in the token
  const embedded = n.match(new RegExp(`${MONTH_PATTERN}\\s+(\\d{4})`));
  if (embedded) {
    const m = MONTH_MAP[embedded[1]] ?? 1;
    const y = parseInt(embedded[2], 10);
    return new Date(y, m - 1, 1).getTime();
  }

  const anyYear = n.match(/(\d{4})/);
  if (anyYear) {
    return new Date(parseInt(anyYear[1], 10), 11, 1).getTime();
  }

  return null;
}

/**
 * Timestamp de fin d'un projet pour le tri (plus récent = plus grand).
 * Gère plages FR/EN, "Présent"/"Present", et périodes multiples séparées par `;`.
 */
export function getProjectEndTs(dateStr: string, status?: string): number {
  if (!dateStr) {
    return status === "En cours" ? Date.now() : 0;
  }

  const periods = dateStr.split(";").map((s) => s.trim()).filter(Boolean);
  let maxTs = 0;
  let hasPresent = false;

  for (const period of periods) {
    const normalized = normalize(period);

    if (PRESENT_RE.test(normalized)) {
      hasPresent = true;
      continue;
    }

    // Plage "debut - fin" (ASCII hyphen, en-dash U+2013, em-dash U+2014)
    const rangeParts = period
      .split(/\s*[-\u2013\u2014]\s*/)
      .map((s) => s.trim())
      .filter(Boolean);

    const endToken = rangeParts[rangeParts.length - 1] ?? period;
    const ts = parseMonthOrYearToken(endToken);
    if (ts != null) {
      maxTs = Math.max(maxTs, ts);
    }
  }

  if (hasPresent) {
    return Math.max(maxTs, Date.now());
  }

  // Statut seul si aucune date exploitable (ex. chaîne vide)
  if (maxTs === 0 && status === "En cours") {
    return Date.now();
  }

  return maxTs;
}
