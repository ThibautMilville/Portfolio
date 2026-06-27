"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";
import { SectionHeadingGradientDefs, SectionHeadingIcon, type SectionHeadingIconName } from "@/components/ui/SectionHeadingIcon";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  icon: SectionHeadingIconName;
  align?: "center" | "left";
  id?: string;
  className?: string;
}

export function SectionHeading({ title, subtitle, icon, align = "center", id, className }: SectionHeadingProps) {
  const isCentered = align === "center";
  const gradientId = useId();

  return (
    <header className={cn("relative flex flex-col gap-4", isCentered ? "items-center text-center" : "items-start text-left", className)} aria-labelledby={id}>
      <SectionHeadingGradientDefs id={gradientId} />

      <div className={cn("flex w-full", isCentered ? "justify-center" : "justify-start")}>
        <h2 id={id} className={cn("inline-flex max-w-3xl items-center gap-[0.4em] overflow-visible font-heading text-[clamp(1.875rem,4.5vw,2.875rem)] font-bold leading-normal tracking-[-0.03em]")}>
          <SectionHeadingIcon name={icon} gradientId={gradientId} />
          <span className="bg-gradient-to-br from-foreground via-foreground to-foreground/65 bg-clip-text pb-1 text-transparent">{title}</span>
        </h2>
      </div>

      <div className={cn("h-px w-48 bg-[linear-gradient(90deg,transparent,hsl(var(--primary)/0.45),hsl(var(--primary)/0.95),hsl(var(--primary)/0.45),transparent)] md:w-64", isCentered ? "mx-auto" : "")} aria-hidden="true" />

      {subtitle ? <p className={cn("max-w-2xl text-base leading-relaxed text-muted-foreground md:text-[1.0625rem] md:leading-relaxed", isCentered ? "mx-auto" : "")}>{subtitle}</p> : null}
    </header>
  );
}
