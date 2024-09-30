import { Button } from "@/components/ui/button";
import { Section } from "./Section";
import { GithubIcon } from "./icons/GithubIcon";

export const Header = () => {
  return (
    <header className="sticky top-0 py-4">
      <Section className="flex items-baseline">
        <h1 className="text-lg font-bold text-primary">thibautmilville.com</h1>
        <div className="flex-1" />
        <ul>
          <Button className="size-6 p-0" variant={"outline"}>
            <GithubIcon size={12} className="text-foreground" />
          </Button>
        </ul>
      </Section>
    </header>
  );
};
