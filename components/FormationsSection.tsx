"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { translateDateSimple } from "@/lib/utils";
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import LightParticles from "@/components/ui/light-particles";
import { ArrowRight, GraduationCap, Calendar, School, BadgeCheck, ExternalLink, MapPin } from "lucide-react";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useTranslatedData } from "@/hooks/useTranslatedData";

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

export default function FormationsSection() {
  const t = useTranslations('Home.formations');
  const locale = useLocale();
  const { getTranslatedFormation } = useTranslatedData();
  const { formations, loading } = usePortfolioData();
  const maxTimelineItems = 5;
  const sortedFormations = [...formations].sort((a, b) => getRecencyScore(b.date) - getRecencyScore(a.date));
  const diplomaFormations = sortedFormations.filter((formation) => formation.type === "Diplôme");
  const certificationBadges = sortedFormations.filter((formation) => formation.type === "Certification");
  const timelineFormations = diplomaFormations.slice(0, maxTimelineItems).map((formation) => getTranslatedFormation(formation));
  const remainingFormationsCount = Math.max(0, diplomaFormations.length - maxTimelineItems);
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <SectionHeading
            title={t("title")}
            subtitle={t("subtitle")}
            icon={GraduationCap}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-background/90 to-background/70 p-5 backdrop-blur-sm md:p-6">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 blur-3xl" />
            <div className="relative z-10">
              {!loading && diplomaFormations.length > 0 ? (
                <div className="relative">
                  <div className="hidden md:block absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />
                  <div className="space-y-4">
                    {timelineFormations.map((formation, index) => (
                      <motion.article
                        key={formation.id}
                        initial={isDesktop ? { opacity: 0, x: -20, y: 10 } : { opacity: 0, y: 10 }}
                        whileInView={isDesktop ? { opacity: 1, x: 0, y: 0 } : { opacity: 1, y: 0 }}
                        transition={{ duration: isDesktop ? 0.5 : 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="relative rounded-xl border border-border/50 bg-background/70 p-4 md:ml-14"
                      >
                        <div className="hidden md:flex absolute -left-[3.5rem] top-4 h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-border/60 bg-background ring-4 ring-background">
                          {formation.logoUrl ? (
                            <img src={formation.logoUrl} alt={`Logo ${formation.institution}`} className="h-6 w-6 object-contain" />
                          ) : (
                            <GraduationCap className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <h3 className="text-base font-semibold text-foreground">{formation.title}</h3>
                        <p className="text-sm text-primary/90">{formation.institution}</p>
                        <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{translateDateSimple(formation.date, locale)}</span>
                          <span className="inline-flex items-center gap-1"><School className="h-3.5 w-3.5" />{formation.type}</span>
                        </div>
                        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{formation.description}</p>
                      </motion.article>
                    ))}
                  </div>
                  {remainingFormationsCount > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="mt-4 flex justify-center"
                    >
                      <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        +{remainingFormationsCount} {locale === "fr" ? "formations" : "formations"}...
                      </span>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  {loading ? t("loading") : t("empty")}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-background/90 to-background/70 p-5 backdrop-blur-sm md:p-6">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 blur-3xl" />
            <div className="relative z-10">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <BadgeCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{t("courseBadges")}</h3>
                </div>
              </div>
              {certificationBadges.length > 0 ? (
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {certificationBadges.slice(0, maxTimelineItems).map((badge, index) => {
                    const translatedBadge = getTranslatedFormation(badge);
                    return (
                      <motion.article
                        key={translatedBadge.id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: index * 0.08 }}
                        viewport={{ once: true }}
                        className="rounded-xl border border-border/50 bg-background/70 p-4"
                      >
                        <div className="mb-3 flex items-start gap-3">
                          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-border/50 bg-white p-1">
                            {translatedBadge.logoUrl ? (
                              <img src={translatedBadge.logoUrl} alt={`Logo ${translatedBadge.institution}`} className="h-7 w-7 object-contain" />
                            ) : (
                              <BadgeCheck className="h-4 w-4 text-primary" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <h4 className="line-clamp-2 text-sm font-semibold text-foreground">{translatedBadge.title}</h4>
                            <p className="text-xs text-muted-foreground">{translatedBadge.institution}</p>
                          </div>
                        </div>
                        <div className="mb-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{translateDateSimple(translatedBadge.date, locale)}</span>
                          <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{translatedBadge.location}</span>
                        </div>
                        {translatedBadge.credentialUrl && (
                          <a href={translatedBadge.credentialUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center text-xs font-medium text-primary hover:underline">
                            <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                            {t("modals.viewCertificate")}
                          </a>
                        )}
                      </motion.article>
                    );
                  })}
                </div>
              ) : (
                <div className="py-6 text-center text-sm text-muted-foreground">{t("empty")}</div>
              )}
            </div>
          </div>
        </motion.div>

        <div className="flex justify-center mt-12">
          <Button size="lg" asChild className="sweep-light">
            <Link href="/formations">
              {t('viewAll')}
              <ArrowRight className="ml-2 h-4 w-4 text-white" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
