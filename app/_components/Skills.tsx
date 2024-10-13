import { Badge } from "@/components/ui/badge";
import { Section } from "./Section";
import { Code } from "./Code";
import { ReactLogo } from "./icons/ReactLogo";
import { NestJSLogo } from "./icons/NestJSLogo";
import { OpenAILogo } from "./icons/OpenAILogo";

export const Skills = () => {
  return (
    <Section className="flex flex-col items-start gap-4">
      <Badge>Skills</Badge>
      <h2 className="pb-2 text-3xl font-semibold tracking-tight first:mt-0">I love working on...</h2>
      <div className="flex max-md:flex-col gap-4">
        <div className="flex flex-col gap-2 flex-1">
          <ReactLogo size={42} className="animate-spin" style={{ animationDuration: "10s" }} />
          <h3 className="text-2xl font-semibold tracking-tight mb-2">React</h3>
          <p className="text-sm text-muted-foreground">
            My main framework is <Code>React</Code>. I also use <Code>Next.js</Code> as a backend and frontend framework.
          </p>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <NestJSLogo size={42} />
          <h3 className="text-2xl font-semibold tracking-tight mb-2">Nest.js</h3>
          <p className="text-sm text-muted-foreground">
          <Code>Nest.js</Code> is my primary backend framework for building efficient, scalable server-side applications.
          </p>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <OpenAILogo size={42} />
          <h3 className="text-2xl font-semibold tracking-tight mb-2">OpenAI</h3>
          <p className="text-sm text-muted-foreground">
          I leverage <Code>OpenAI&apos;s</Code> advanced AI models to create applications faster and more efficiently.
          </p>
        </div>
      </div>
    </Section>
  );
};
