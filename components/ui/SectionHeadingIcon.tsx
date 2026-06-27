import type * as React from "react";
import { cn } from "@/lib/utils";

export type SectionHeadingIconName =
  | "projects"
  | "experiences"
  | "formations"
  | "skills"
  | "stack"
  | "partners"
  | "testimonials"
  | "contact";

interface SectionHeadingIconProps {
  name: SectionHeadingIconName;
  gradientId: string;
  className?: string;
}

const strokeProps = (gradientId: string) => ({
  fill: "none",
  stroke: `url(#${gradientId})`,
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

function ProjectsIcon({ gradientId }: { gradientId: string }) {
  const stroke = strokeProps(gradientId);
  return (
    <>
      <path
        d="M4 8.5V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.5"
        {...stroke}
      />
      <path d="M4 8.5 12 4l8 4.5" {...stroke} />
      <path d="M9.5 13v5M12 13v5M14.5 13v5" {...stroke} />
    </>
  );
}

function ExperiencesIcon({ gradientId }: { gradientId: string }) {
  const stroke = strokeProps(gradientId);
  return (
    <>
      <path d="M4 9.5V18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9.5" {...stroke} />
      <path d="M8 9.5V7a4 4 0 0 1 8 0v2.5" {...stroke} />
      <path d="M4 12h16" {...stroke} />
    </>
  );
}

function FormationsIcon({ gradientId }: { gradientId: string }) {
  const stroke = strokeProps(gradientId);
  return (
    <>
      <path d="M4.5 10.5 12 7l7.5 3.5L12 14 4.5 10.5Z" {...stroke} />
      <path d="M7 12.25V16.5c0 1.2 2.2 2.25 5 2.25s5-1.05 5-2.25v-4.25" {...stroke} />
      <path d="M19 10.5V15" {...stroke} />
    </>
  );
}

function SkillsIcon({ gradientId }: { gradientId: string }) {
  const stroke = strokeProps(gradientId);
  return (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1.5" {...stroke} />
      <path d="M9.5 4.5v2.5M14.5 4.5v2.5M9.5 17v2.5M14.5 17v2.5M4.5 9.5h2.5M17 9.5h2.5M4.5 14.5h2.5M17 14.5h2.5" {...stroke} />
    </>
  );
}

function StackIcon({ gradientId }: { gradientId: string }) {
  const stroke = strokeProps(gradientId);
  return (
    <>
      <path d="M12 4.5 5.5 8 12 11.5l6.5-3.5L12 4.5Z" {...stroke} />
      <path d="M5.5 10.5 12 14l6.5-3.5" {...stroke} />
      <path d="M5.5 14.5 12 18l6.5-3.5" {...stroke} />
    </>
  );
}

function PartnersIcon({ gradientId }: { gradientId: string }) {
  const stroke = strokeProps(gradientId);
  return (
    <>
      <path d="M8 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" {...stroke} />
      <path d="M16 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" {...stroke} />
      <path d="M5.5 18v-1a3 3 0 0 1 3-3h.5" {...stroke} />
      <path d="M18.5 18v-1a3 3 0 0 0-3-3h-.5" {...stroke} />
      <path d="M10.5 14.5h3" {...stroke} />
    </>
  );
}

function TestimonialsIcon({ gradientId }: { gradientId: string }) {
  const stroke = strokeProps(gradientId);
  return (
    <>
      <path d="M8.5 9.5a2.5 2.5 0 0 0-2.5 2.5V15h3.5" {...stroke} />
      <path d="M15.5 9.5a2.5 2.5 0 0 0-2.5 2.5V15H16.5" {...stroke} />
    </>
  );
}

function ContactIcon({ gradientId }: { gradientId: string }) {
  const stroke = strokeProps(gradientId);
  return (
    <>
      <path d="M5 8.5 12 13l7-4.5" {...stroke} />
      <rect x="4" y="6" width="16" height="12" rx="2" {...stroke} />
    </>
  );
}

const icons: Record<
  SectionHeadingIconName,
  React.ComponentType<{ gradientId: string }>
> = {
  projects: ProjectsIcon,
  experiences: ExperiencesIcon,
  formations: FormationsIcon,
  skills: SkillsIcon,
  stack: StackIcon,
  partners: PartnersIcon,
  testimonials: TestimonialsIcon,
  contact: ContactIcon,
};

export function SectionHeadingGradientDefs({ id }: { id: string }) {
  return (
    <svg aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--foreground))" />
          <stop offset="55%" stopColor="hsl(var(--foreground))" />
          <stop offset="100%" stopColor="hsl(var(--foreground) / 0.65)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function SectionHeadingIcon({ name, gradientId, className }: SectionHeadingIconProps) {
  const Icon = icons[name];

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("h-[0.9em] w-[0.9em] shrink-0 translate-y-px", className)}
    >
      <Icon gradientId={gradientId} />
    </svg>
  );
}
