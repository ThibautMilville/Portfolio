import { Code } from "./Code";
import { Section } from "./Section";
import { GithubIcon } from "./icons/GithubIcon";
import Link from "next/link";

export const Hero = () => {
  return (
    <Section className="flex max-md:flex-col items-start gap-4">
      <div className="flex-[3] w-full flex flex-col gap-2">
        <h2 className="font-caption text-5xl text-primary">Thibaut MILVILLE</h2>
        <h3 className="text-3xl font-caption">Software developer</h3>
        <p className="text-base font-bold">
          Passionate about <Code>computers</Code> and <Code>technological innovation</Code> since I was young.
          <br />
          Feel free to browse my{" "}
          <Link href="https://github.com/ThibautMilville">
            <Code className="inline-flex items-center gap-1">
              <GithubIcon size={16} className="inline" />
              GitHub
            </Code>
          </Link>{" "}
          to see my different projects.
          <br />
          Living in{" "}
          <Code className="inline-flex items-center gap-1">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg/langfr-225px-Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg.png"
              style={{ width: 16, height: "auto" }}
              alt="French flag"
            />
            Paris, France
          </Code>
          .
        </p>
      </div>
      <div className="flex flex-[2] max-md:m-auto justify-center ml-auto">
        <img src="/pictures/profile-picture.jpeg" className="w-60 h-60 max-w-xs rounded-full object-cover max-md:w-56 max-md:h-56" alt="Thibaut's picture" />
      </div>
    </Section>
  );
};
