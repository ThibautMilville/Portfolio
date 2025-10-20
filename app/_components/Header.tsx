import { buttonVariants } from "@/components/ui/button";
import { Section } from "./Section";
import Link from "next/link";
import { cn } from "@/lib/utils";
// Icons
import { GithubIcon } from "./icons/GithubIcon";
import { LinkedInIcon } from "./icons/LinkedInIcon";
import { TelegramIcon } from "./icons/TelegramIcon";

export const Header = () => {
  return (
    <header className="sticky top-0 py-4 z-40">
      <Section className="flex items-baseline">
        <h1 className="text-lg font-bold text-primary">Portfolio</h1>
        <div className="flex-1" />
        <ul className="flex items-center gap-2">
          <Link href="https://www.linkedin.com/in/thibaut-milville/" className={cn(buttonVariants({ variant: "outline" }), "size-6 p-0")}>
            <LinkedInIcon size={12} className="text-foreground" />
          </Link>
          <Link href="https://github.com/ThibautMilville" className={cn(buttonVariants({ variant: "outline" }), "size-6 p-0")}>
            <GithubIcon size={12} className="text-foreground" />
          </Link>
          <Link href="https://t.me/Thybow" className={cn(buttonVariants({ variant: "outline" }), "size-6 p-0")}>
            <TelegramIcon size={12} className="text-foreground" />
          </Link>
        </ul>
      </Section>
    </header>
  );
};
