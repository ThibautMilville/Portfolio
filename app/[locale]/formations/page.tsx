"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { translateDateSimple } from "@/lib/utils";
import {
  GraduationCap,
  Calendar,
  MapPin,
  Award,
  ExternalLink,
  BadgeCheck,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import LightParticles from "@/components/ui/light-particles";
import { useTranslatedData } from "@/hooks/useTranslatedData";
import { usePortfolioData } from "@/hooks/usePortfolioData";

type TranslatedFormation = ReturnType<ReturnType<typeof useTranslatedData>["getTranslatedFormation"]>;

function FormationCard({ formation, locale, t }: { formation: TranslatedFormation; locale: string; t: ReturnType<typeof useTranslations<"Pages.formations">> }) {
  return (
    <Card className="sm:ml-16 transition-shadow hover:shadow-lg">
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            {formation.logoUrl ? (
              <img src={formation.logoUrl} alt={`Logo ${formation.institution}`} className="h-10 w-10 flex-shrink-0 rounded bg-white p-1 object-contain" />
            ) : (
              <div className="flex-shrink-0 rounded-lg bg-primary/10 p-2">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <CardTitle className="mb-2 text-xl">{formation.title}</CardTitle>
              <CardDescription className="text-base">{formation.institution}</CardDescription>
            </div>
          </div>
          <div className="flex justify-start sm:justify-end">
            <Badge variant="outline" className="rounded-full bg-primary/10 px-2 py-1 text-sm text-primary">
              {formation.type}
            </Badge>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {translateDateSimple(formation.date, locale)}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {formation.location}
          </div>
          {formation.mention && (
            <div className="flex items-center gap-1">
              <Award className="h-4 w-4" />
              {formation.mention}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <p className="mb-4 text-muted-foreground">{formation.description}</p>
        <div className="space-y-2">
          <p className="text-sm font-medium">{t("skillsAcquired")}</p>
          <div className="flex flex-wrap gap-2">
            {formation.skills.map((skill) => (
              <Badge key={`${formation.id}-${skill}`} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        {formation.credentialUrl && (
          <div className="mt-4">
            <Button variant="outline" size="sm" asChild className="sweep-light">
              <a href={formation.credentialUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                {t("verifyCertification")}
              </a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function Formations() {
  const t = useTranslations("Pages.formations");
  const locale = useLocale();
  const { getTranslatedFormation } = useTranslatedData();
  const { formations } = usePortfolioData();
  const getStartYear = (date: string) => {
    const matches = date.match(/\b(19|20)\d{2}\b/g);
    if (!matches || matches.length === 0) {
      return Number.MAX_SAFE_INTEGER;
    }
    return Number(matches[0]);
  };

  const diplomas = formations
    .filter((formation) => formation.type === "Diplôme")
    .sort((a, b) => getStartYear(a.date) - getStartYear(b.date))
    .map((formation) => getTranslatedFormation(formation));
  const badges = formations.filter((formation) => formation.type === "Certification").map((formation) => getTranslatedFormation(formation));

  return (
    <div className="py-6 md:py-8 px-6 relative">
      <LightParticles />
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full shadow-lg"
              style={{ width: "min(80vw, 500px)" }}
              animate={{
                width: [
                  "min(80vw, 500px)",
                  "min(90vw, 600px)",
                  "min(80vw, 500px)",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          <p className="text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            {t("diplomas")}
          </h2>

          <div className="relative">
            <div className="hidden sm:block absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>

            <div className="space-y-8">
              {diplomas.map((formation, index) => (
                  <motion.div
                    key={formation.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    id={formation.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                    className="relative"
                  >
                    <div className="hidden sm:block absolute left-6 top-6 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                    <FormationCard formation={formation} locale={locale} t={t} />
                  </motion.div>
                ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            {t("courseBadges")}
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {badges.map((badge, index) => (
              <motion.article
                key={badge.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="rounded-2xl border border-border/60 bg-background/70 p-5 backdrop-blur-sm"
              >
                <div className="mb-4 flex items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-border/50 bg-white/90 p-2">
                    {badge.logoUrl ? (
                      <img src={badge.logoUrl} alt={`Logo ${badge.institution}`} className="h-8 w-8 object-contain" />
                    ) : (
                      <BadgeCheck className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-2 text-base font-semibold text-foreground">{badge.title}</h3>
                    <p className="text-sm text-muted-foreground">{badge.institution}</p>
                  </div>
                </div>
                <div className="mb-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {translateDateSimple(badge.date, locale)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {badge.location}
                  </span>
                </div>
                <p className="line-clamp-3 text-sm text-muted-foreground">{badge.description}</p>
                {badge.credentialUrl && (
                  <Button variant="outline" size="sm" asChild className="mt-4 w-full">
                    <a href={badge.credentialUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {t("verifyCertification")}
                    </a>
                  </Button>
                )}
              </motion.article>
            ))}
            {badges.length === 0 && (
              <div className="col-span-full rounded-2xl border border-dashed border-border/60 bg-background/40 p-8 text-center text-sm text-muted-foreground">
                {t("courseBadges")} : 0
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
}

