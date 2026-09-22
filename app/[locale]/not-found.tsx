import { ArrowRight, Home } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import SideGradientAccents from "@/components/SideGradientAccents";
import { Button } from "@/components/ui/button";
import LightParticles from "@/components/ui/light-particles";
import { getLocalizedProjectRoute, type Locale } from "@/lib/localized-routes";
import { Link } from "@/navigation";

export default async function NotFound() {
  const t = await getTranslations("NotFound");
  const locale = (await getLocale()) as Locale;

  return (
    <section
      className="relative flex min-h-[calc(100vh-8rem)] items-center justify-center overflow-hidden px-6 py-24"
      aria-labelledby="not-found-title"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-secondary/10 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-background/80 to-background" />
      <LightParticles />
      <SideGradientAccents />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <p className="mb-4 font-mono text-7xl font-bold tracking-tight text-primary/80 md:text-8xl">
          {t("code")}
        </p>
        <h1
          id="not-found-title"
          className="mb-4 font-heading text-3xl font-bold tracking-[-0.03em] text-foreground md:text-4xl"
        >
          {t("title")}
        </h1>
        <div
          className="mx-auto mb-6 h-px w-40 bg-[linear-gradient(90deg,transparent,hsl(var(--primary)/0.45),hsl(var(--primary)/0.95),hsl(var(--primary)/0.45),transparent)] md:w-52"
          aria-hidden="true"
        />
        <p className="mb-10 text-base leading-relaxed text-muted-foreground md:text-lg">
          {t("description")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" asChild className="sweep-light">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              {t("backHome")}
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="sweep-light">
            <Link href={getLocalizedProjectRoute(locale)}>
              {t("viewProjects")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
