"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import LightParticles from "@/components/ui/light-particles";
import { ArrowRight, Briefcase, Calendar, MapPin } from "lucide-react";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useTranslatedData } from "@/hooks/useTranslatedData";
import { translateDateSimple } from "@/lib/utils";
import { getGroupedExperiencesFromList } from "@/utils/experience";

const monthValueMap: Record<string, number> = {
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

function getRecencyScore(date: string): number {
  const normalized = date
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const isOngoing = normalized.includes("present");
  const yearMatches = normalized.match(/\b(19|20)\d{2}\b/g);
  const year = yearMatches?.length ? Number(yearMatches[yearMatches.length - 1]) : 0;
  const monthEntry = Object.entries(monthValueMap).find(([month]) => normalized.includes(month));
  const month = monthEntry ? monthEntry[1] : 0;
  return (isOngoing ? 10_000_000 : 0) + year * 100 + month;
}

export default function ExperiencesSection() {
  const t = useTranslations("Home.experiences");
  const locale = useLocale();
  const { getTranslatedExperience } = useTranslatedData();
  const { experiences, loading } = usePortfolioData();
  const maxTimelineItems = 5;
  const groupedExperiences = getGroupedExperiencesFromList(experiences)
    .sort((a, b) => getRecencyScore(b.experiences[0].date) - getRecencyScore(a.experiences[0].date))
    .map((group) => {
      const latestExperience = group.experiences[0];
      return {
        ...group,
        latestExperience: getTranslatedExperience(latestExperience),
      };
    });
  const timelineExperiences = groupedExperiences.slice(0, maxTimelineItems);
  const remainingExperiencesCount = Math.max(0, groupedExperiences.length - maxTimelineItems);
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const updateViewport = () => {
      if (typeof window !== "undefined") {
        setIsDesktop(window.innerWidth >= 1024);
      }
    };
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);
  return (
    <section className="py-6 md:py-8 px-6 relative">
      <LightParticles />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-16">
          <SectionHeading
            title={t("title")}
            subtitle={t("subtitle")}
            icon={Briefcase}
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}>
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-background/90 to-background/70 p-5 backdrop-blur-sm md:p-6">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 blur-3xl" />
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">{t("loading")}</div>
            ) : (
              <div className="relative">
                <div className="hidden md:block absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />
                <div className="space-y-4">
                  {timelineExperiences.map((group, index) => (
                    <motion.article
                      key={group.company}
                      initial={isDesktop ? { opacity: 0, x: -20, y: 10 } : { opacity: 0, y: 10 }}
                      whileInView={isDesktop ? { opacity: 1, x: 0, y: 0 } : { opacity: 1, y: 0 }}
                      transition={{ duration: isDesktop ? 0.5 : 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="relative rounded-xl border border-border/50 bg-background/70 p-4 md:ml-14"
                    >
                      <div className="hidden md:flex absolute -left-[3.5rem] top-4 h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-border/60 bg-background ring-4 ring-background">
                        {group.logoUrl ? (
                          <img src={group.logoUrl} alt={`Logo ${group.company}`} className="h-6 w-6 object-contain" />
                        ) : (
                          <Briefcase className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-base font-semibold text-foreground">{group.latestExperience.title}</h3>
                          <p className="text-sm text-primary/90">{group.company}</p>
                        </div>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{translateDateSimple(group.totalDuration, locale)}</span>
                        <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{group.latestExperience.location}</span>
                      </div>
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{group.latestExperience.description}</p>
                    </motion.article>
                  ))}
                </div>
                {remainingExperiencesCount > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="mt-4 flex justify-center"
                  >
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      +{remainingExperiencesCount} {locale === "fr" ? "expériences" : "experiences"}...
                    </span>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </motion.div>

        <div className="flex justify-center mt-12">
          <Button size="lg" asChild className="sweep-light">
            <Link href="/experiences">
              {t("viewAll")}
              <ArrowRight className="ml-2 h-4 w-4 text-white" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
