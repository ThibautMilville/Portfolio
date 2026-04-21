"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  align?: "center" | "left";
  id?: string;
  className?: string;
  uppercaseTitle?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  icon: Icon,
  align = "center",
  id,
  className,
  uppercaseTitle = true,
}: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        isCentered ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <div className={cn("space-y-3", isCentered ? "max-w-3xl" : "max-w-2xl")}>
        <div
          className={cn(
            "flex items-center gap-3",
            isCentered ? "justify-center" : "justify-start"
          )}
        >
          <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl border border-primary/25 bg-background/70 text-primary shadow-sm backdrop-blur-sm">
            <Icon className="h-5 w-5" />
          </div>
          <h2
            id={id}
            className={cn(
              "font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent leading-tight",
              uppercaseTitle ? "uppercase tracking-[0.03em]" : ""
            )}
          >
            {title}
          </h2>
        </div>
        <div
          className={cn(
            "h-px w-56 md:w-72 bg-[linear-gradient(90deg,transparent,hsl(var(--primary)/0.45),hsl(var(--primary)/0.95),hsl(var(--primary)/0.45),transparent)]",
            isCentered ? "mx-auto" : ""
          )}
        />
        {subtitle ? <p className="text-lg text-muted-foreground">{subtitle}</p> : null}
      </div>
    </div>
  );
}
