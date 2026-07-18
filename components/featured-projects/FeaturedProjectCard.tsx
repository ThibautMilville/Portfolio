"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/general/Tooltip";
import { ASHES_OF_MANKIND_TITLE } from "@/hooks/featured-projects/constants";
import type { FeaturedProjectItem } from "@/hooks/featured-projects/types";
import { getLocalizedProjectRoute } from "@/lib/localized-routes";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { getProjectSlug } from "@/services/ProjectService";

interface FeaturedProjectCardProps {
  project: FeaturedProjectItem;
  variant?: "spotlight" | "compact";
  index?: number;
}

function ProjectCardFooter({ href, label }: { href: string; label: string }) {
  return (
    <div className="flex justify-end border-t border-border/60 px-6 py-5">
      <Button variant="outline" asChild className="sweep-light">
        <Link href={href}>
          {label}
          <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
        </Link>
      </Button>
    </div>
  );
}

function ProjectCardContent({
  translated,
  isSpotlight,
  t,
}: {
  translated: FeaturedProjectItem["translated"];
  isSpotlight: boolean;
  t: ReturnType<typeof useTranslations<"Home.featuredProjects">>;
}) {
  return (
    <>
      <h3
        className={cn(
          "font-heading font-bold tracking-normal [word-spacing:0.04em] transition-colors group-hover/card:text-primary",
          isSpotlight ? "text-2xl md:text-3xl" : "text-xl",
        )}
      >
        {translated.title}
      </h3>
      <p
        className={cn(
          "mt-3 text-muted-foreground leading-relaxed",
          isSpotlight ? "line-clamp-4 text-base" : "line-clamp-2 text-sm",
        )}
      >
        {translated.description}
      </p>

      {translated.features?.length ? (
        <div className="mt-4 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-foreground/80">
            {t("keyFeatures")}
          </p>
          <ul className={cn("grid gap-1.5", isSpotlight ? "sm:grid-cols-2" : "grid-cols-1")}>
            {translated.features.slice(0, isSpotlight ? 4 : 2).map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                <span className="line-clamp-1">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2">
        {translated.technologies.slice(0, isSpotlight ? 5 : 3).map((tech) => (
          <Badge key={tech} variant="outline" className="text-xs">
            {tech}
          </Badge>
        ))}
      </div>
    </>
  );
}

function ProjectCardImage({
  imageSrc,
  title,
  translated,
  demoLabel,
  t,
  className,
  sizes,
}: {
  imageSrc: string;
  title: string;
  translated: FeaturedProjectItem["translated"];
  demoLabel: string;
  t: ReturnType<typeof useTranslations<"Home.featuredProjects">>;
  className?: string;
  sizes: string;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={imageSrc}
        alt={title || "Project"}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-500 group-hover/card:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
      <div className="absolute right-4 top-4 flex gap-2">
        {translated.demo ? (
          <Tooltip content={demoLabel} position="top">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-9 w-9 bg-background/80 shadow-sm backdrop-blur-sm transition-transform hover:scale-110"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                if (!translated.demo) return;
                window.open(translated.demo, "_blank", "noopener,noreferrer");
              }}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </Tooltip>
        ) : null}
        {translated.github ? (
          <Tooltip content={t("viewCode")} position="top">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-9 w-9 bg-background/80 shadow-sm backdrop-blur-sm transition-transform hover:scale-110"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                if (!translated.github) return;
                window.open(translated.github, "_blank", "noopener,noreferrer");
              }}
            >
              <Github className="h-4 w-4" />
            </Button>
          </Tooltip>
        ) : null}
      </div>
    </div>
  );
}

export function FeaturedProjectCard({
  project,
  variant = "compact",
  index = 0,
}: FeaturedProjectCardProps) {
  const t = useTranslations("Home.featuredProjects");
  const locale = useLocale() as "en" | "fr";
  const { original, translated } = project;
  const href = getLocalizedProjectRoute(locale, getProjectSlug(original));
  const imageSrc = translated.image || "/images/og-image.webp";
  const isSpotlight = variant === "spotlight";

  const demoLabel =
    translated.title === ASHES_OF_MANKIND_TITLE ? t("viewGame") : t("viewDemo");

  const image = (
    <ProjectCardImage
      imageSrc={imageSrc}
      title={translated.title}
      translated={translated}
      demoLabel={demoLabel}
      t={t}
      className={isSpotlight ? "h-full w-full" : "aspect-[16/10] w-full shrink-0"}
      sizes={
        isSpotlight
          ? "(max-width: 1024px) 100vw, 52vw"
          : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      }
    />
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      viewport={{ once: true, margin: "-40px" }}
      className={cn("h-full", isSpotlight && "lg:col-span-2")}
    >
      <div
        className={cn(
          "group/card flex h-full overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-background/95 to-background/75 shadow-lg ring-1 ring-border/40 backdrop-blur-sm transition-all duration-300 hover:border-primary/45 hover:shadow-xl hover:shadow-primary/10",
          isSpotlight ? "flex-col lg:flex-row" : "flex-col",
        )}
      >
        {isSpotlight ? (
          <>
            <Link
              href={href}
              className="relative block aspect-[16/10] w-full shrink-0 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:aspect-auto lg:min-h-[22rem] lg:w-[52%]"
            >
              {image}
            </Link>
            <div className="flex min-h-0 flex-1 flex-col">
              <Link
                href={href}
                className="flex flex-1 flex-col p-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:p-8"
              >
                <ProjectCardContent translated={translated} isSpotlight={isSpotlight} t={t} />
              </Link>
              <ProjectCardFooter href={href} label={t("viewProject")} />
            </div>
          </>
        ) : (
          <Link
            href={href}
            className="flex flex-1 flex-col transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {image}
            <div className="flex flex-1 flex-col p-6">
              <ProjectCardContent translated={translated} isSpotlight={isSpotlight} t={t} />
            </div>
          </Link>
        )}
      </div>
    </motion.article>
  );
}
