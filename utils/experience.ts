import { Experience } from "@/types/portfolio";

export type GroupedExperience = {
  company: string;
  experiences: Experience[];
  totalDuration: string;
  logoUrl?: string;
};

export const getGroupedExperiencesFromList = (experiences: Experience[]): GroupedExperience[] => {
  const grouped = new Map<string, Experience[]>();
  const monthMap: Record<string, number> = {
    jan: 1,
    feb: 2,
    fev: 2,
    mar: 3,
    apr: 4,
    avr: 4,
    may: 5,
    mai: 5,
    jun: 6,
    juin: 6,
    jul: 7,
    juil: 7,
    aug: 8,
    aout: 8,
    sep: 9,
    oct: 10,
    nov: 11,
    dec: 12,
    decembre: 12,
  };

  const getRecencyScore = (dateStr: string) => {
    const normalized = dateStr
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const isOngoing = normalized.includes("present");
    const yearMatch = normalized.match(/\b(19|20)\d{2}\b/g);
    const year = yearMatch?.length ? Number(yearMatch[yearMatch.length - 1]) : 0;
    const monthEntry = Object.entries(monthMap).find(([month]) => normalized.includes(month));
    const month = monthEntry ? monthEntry[1] : 0;
    return (isOngoing ? 10_000_000 : 0) + year * 100 + month;
  };

  experiences.forEach((experience) => {
    if (!grouped.has(experience.company)) {
      grouped.set(experience.company, []);
    }
    grouped.get(experience.company)?.push(experience);
  });

  const groups: GroupedExperience[] = [];

  grouped.forEach((companyExperiences, company) => {
    const sortedExperiences = [...companyExperiences].sort((a, b) => {
      return getRecencyScore(b.date) - getRecencyScore(a.date);
    });

    const oldest = sortedExperiences[sortedExperiences.length - 1];
    const latest = sortedExperiences[0];

    let totalDuration = "";
    if (sortedExperiences.length === 1) {
      totalDuration = oldest.date;
    } else {
      const startDate = oldest.date.split(" - ")[0];
      const endDate = latest.date.includes("Présent") ? "Présent" : latest.date.split(" - ")[1];
      totalDuration = `${startDate} - ${endDate}`;
    }

    groups.push({
      company,
      experiences: sortedExperiences,
      totalDuration,
      logoUrl: sortedExperiences[0].logoUrl
    });
  });

  return groups.sort((a, b) => getRecencyScore(b.experiences[0].date) - getRecencyScore(a.experiences[0].date));
};
