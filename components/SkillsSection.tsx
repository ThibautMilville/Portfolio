"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Code2, Cpu, Database, Palette, Server, Wrench } from "lucide-react";
import LightParticles from "@/components/ui/light-particles";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { getLevelTranslationKey, getSkillDescriptionKey } from "@/lib/skills/translations";
import { Skill } from "@/types/portfolio";

function TechCard({ skill, delay, description, levelLabel, experienceLabel }: { skill: Skill; delay: number; description: string; levelLabel: string; experienceLabel: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay }}
          viewport={{ once: true }}
          className="flex w-[122px] cursor-pointer flex-col items-center rounded-xl border border-border/40 bg-card/70 p-3 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-card"
        >
          <img src={skill.logo} alt={`Logo ${skill.name}`} className="mb-2 h-11 w-11 rounded bg-white p-1 shadow-sm" />
          <span className="text-center text-xs font-medium text-foreground">{skill.name}</span>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] w-[95vw] max-w-lg overflow-y-auto p-4 pt-8 sm:w-auto sm:p-6">
        <DialogHeader className="pr-10">
          <div className="mb-4 flex items-center gap-4">
            <img src={skill.logo} alt={`Logo ${skill.name}`} className="h-16 w-16 rounded-lg bg-white p-2 shadow-lg" />
            <div>
              <DialogTitle className="text-2xl">{skill.name}</DialogTitle>
              <DialogDescription className="text-lg font-medium text-foreground">{levelLabel} • {experienceLabel}</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </DialogContent>
    </Dialog>
  );
}

export default function SkillsSection() {
  const t = useTranslations("Home.skills");
  const tDescription = useTranslations("Home.skillDescriptions");
  const { skills } = usePortfolioData();

  const skillCategories = [
    { title: t("skillCategories.frontend.title"), description: t("skillCategories.frontend.description"), icon: <Code2 className="h-6 w-6" />, key: "Front and frameworks", color: "from-blue-500/20 to-cyan-500/20" },
    { title: t("skillCategories.backend.title"), description: t("skillCategories.backend.description"), icon: <Server className="h-6 w-6" />, key: "Back and frameworks", color: "from-green-500/20 to-emerald-500/20" },
    { title: t("skillCategories.infrastructure.title"), description: t("skillCategories.infrastructure.description"), icon: <Database className="h-6 w-6" />, key: "Infrastructure and deployment", color: "from-purple-500/20 to-pink-500/20" },
    { title: t("skillCategories.design.title"), description: t("skillCategories.design.description"), icon: <Palette className="h-6 w-6" />, key: "Tools and software", color: "from-green-500/20 to-emerald-500/20" }
  ];

  const favoriteSkills = skills.filter((skill) => skill.isFavorite);
  const categoriesWithSkills = skillCategories.map((category) => ({
    ...category,
    skills: skills.filter((skill) => skill.category === category.key),
  }));

  const getDescription = (name: string) => {
    return tDescription(getSkillDescriptionKey(name));
  };

  const translateLevel = (level: string) => t(`levels.${getLevelTranslationKey(level)}`);
  const translateExperience = (experience: string) => {
    try {
      return t(`experienceYears.${experience}`);
    } catch {
      return experience;
    }
  };

  return (
    <section className="relative px-6 py-6 md:py-8">
      <LightParticles />
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-16">
          <SectionHeading title={t("title")} subtitle={t("subtitle")} icon={Cpu} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="mb-20">
          <div className="space-y-6">
            {categoriesWithSkills.map((category, index) => {
              return (
                <motion.div key={category.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} className="group relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-background/90 to-background/70 p-5 backdrop-blur-sm md:p-6">
                  <div className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${category.color} opacity-60 blur-3xl`} />
                  <div className="relative z-10">
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-2 text-primary">{category.icon}</div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground">{category.title}</h3>
                          <p className="text-sm text-muted-foreground">{category.description}</p>
                        </div>
                      </div>
                      <span className="rounded-full border border-border/50 bg-background/70 px-3 py-1 text-xs font-semibold text-muted-foreground">{category.skills.length}</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3 rounded-xl border border-border/40 bg-background/60 p-3">
                      {category.skills.map((skill, skillIndex) => (
                          <TechCard
                            key={skill.id}
                            skill={skill}
                            delay={skillIndex * 0.04}
                            description={getDescription(skill.name)}
                            levelLabel={translateLevel(skill.level)}
                            experienceLabel={translateExperience(skill.experience)}
                          />
                        ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} viewport={{ once: true }} className="mb-20">
          <SectionHeading title={t("favoriteStack.title")} subtitle={t("favoriteStack.subtitle")} icon={Wrench} className="mb-8" />
          <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-background/90 to-background/70 p-5 backdrop-blur-sm md:p-6">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 blur-3xl" />
            <div className="relative flex flex-wrap justify-center gap-3 rounded-xl border border-border/40 bg-background/60 p-3">
              {favoriteSkills.map((skill, index) => (
                  <TechCard
                    key={skill.id}
                    skill={skill}
                    delay={index * 0.04}
                    description={getDescription(skill.name)}
                    levelLabel={t("modals.favoriteTech")}
                    experienceLabel={t("modals.favoriteDescription")}
                  />
                ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
