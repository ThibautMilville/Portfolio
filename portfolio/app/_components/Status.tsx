import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Section } from "./Section";
import { ArrowUpRight, Code, LucideIcon } from "lucide-react";

export const Status = () => {
  return (
    <Section className="flex max-md:flex-col items-start gap-4">
      <div className="flex-[3] w-full">
        <Card className="w-full p-4 flex flex-col gap-2 w-full">
          <p className="text-lg text-muted-foreground">Side, fun projects.</p>
          <div className="flex flex-col gap-4">
            {SIDE_PROJECTS.map((project, index) => (
              <SideProject key={index} logo={project.logo} title={project.title} description={project.description} url="/" />
            ))}
          </div>
        </Card>
      </div>
      <div className="flex-[2] w-full flex flex-col gap-4">
        <Card className="flex-1 p-4">
          <p className="text-lg text-muted-foreground">Work</p>
          <div className="flex flex-col gap-4">
            {WORKS.map((work, index) => (
              <Work key={index} {...work} />
            ))}
          </div>
        </Card>
        <Card className="flex-1 p-4 flex flex-col gap-2">
          {" "}
          <p className="text-lg text-muted-foreground">Contact me</p>
          <ContactCard
            image="/pictures/profile-picture.jpeg"
            mediumImage="https://imgs.search.brave.com/VIodUhcw8pt2UHd5LDONvq6Pv4ipS6Ex4rpafubalaE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/Lzc2MjgyMTEvci9p/bC9iZjU2NjUvNTE2/Nzc5Mzc5My9pbF83/OTR4Ti41MTY3Nzkz/NzkzX2Y0eXcuanBn"
            name="ThibautMilville"
            description="Description"
          />
          <ContactCard
            image="/pictures/profile-picture.jpeg"
            mediumImage="https://imgs.search.brave.com/VIodUhcw8pt2UHd5LDONvq6Pv4ipS6Ex4rpafubalaE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/Lzc2MjgyMTEvci9p/bC9iZjU2NjUvNTE2/Nzc5Mzc5My9pbF83/OTR4Ti41MTY3Nzkz/NzkzX2Y0eXcuanBn"
            name="ThibautMilville"
            description="Description"
          />
        </Card>
      </div>
    </Section>
  );
};

const ContactCard = (props: { image: string; mediumImage: string; name: string; description: string }) => {
  return (
    <Card className="p-3 bg-accent/10 flex items-center gap-4 hover:bg-accent/30 transition-colors group">
      <div className="relative">
        <img src={props.image} alt={props.name} className="w-10 h-10 rounded-full object-cover" />
        <img src={props.mediumImage} alt={props.name} className="w-4 h-4 absolute -bottom-1 -right-1 rounded-full object-contain" />
      </div>
      <div className="mr-auto">
        <div className="flex items-center gap-2">
          <p className="text-lg font-semibold">{props.name}</p>
        </div>
        <p className="text-xs text-muted-foreground">{props.description}</p>
      </div>
      <ArrowUpRight size={16} className="mr-4 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
    </Card>
  );
};

const SIDE_PROJECTS: SideProjectProps[] = [
  {
    logo: Code,
    title: "Side Project",
    description: "Description of the side project",
    url: "/",
  },
  {
    logo: Code,
    title: "Side Project",
    description: "Description of the side project",
    url: "/",
  },
  {
    logo: Code,
    title: "Side Project",
    description: "Description of the side project",
    url: "/",
  },
  {
    logo: Code,
    title: "Side Project",
    description: "Description of the side project",
    url: "/",
  },
  {
    logo: Code,
    title: "Side Project",
    description: "Description of the side project",
    url: "/",
  },
  {
    logo: Code,
    title: "Side Project",
    description: "Description of the side project",
    url: "/",
  },
];

type SideProjectProps = {
  logo: LucideIcon;
  title: string;
  description: string;
  url: string;
};

const SideProject = (props: SideProjectProps) => {
  return (
    <Link href={props.url} className="inline-flex items-center gap-4 hover:bg-accent/50 transition-colors p-1 rounded">
      <span className="bg-accent text-accent-foreground p-3 rounded-sm">
        <props.logo size={16} />
      </span>
      <div>
        <p className="text-lg font-semibold">{props.title}</p>
        <p className="text-sm text-muted-foreground">{props.description}</p>
      </div>
    </Link>
  );
};

const WORKS: WorkProps[] = [
  {
    image: "https://media.licdn.com/dms/image/v2/D4E0BAQEnrMai8iubKQ/company-logo_100_100/company-logo_100_100/0/1702751652849/digitallabs_tm_logo?e=1736380800&v=beta&t=AUwyLlOh5Rt0Gvi3SefxQrzCDsWQ-KGkXDzFLG_jBfI",
    title: "DigitalLabs",
    role: "Founder",
    date: "2023 - Present",
    url: "https://www.linkedin.com/company/digitallabs-tm/",
  },
  {
    image: "https://media.licdn.com/dms/image/v2/D4E0BAQGRaCemLDfQtA/company-logo_100_100/company-logo_100_100/0/1716277093268/sncf_voyageurs_logo?e=1736380800&v=beta&t=iz6MzjxUcIdsqIZfY64RupMsB8Sz86elRp3WvnLqhLI",
    title: "DigitalLabs",
    role: "Founder",
    date: "2023 - Present",
    url: "https://www.linkedin.com/company/digitallabs-tm/",
  },
  {
    image: "https://media.licdn.com/dms/image/v2/D4E0BAQEnrMai8iubKQ/company-logo_100_100/company-logo_100_100/0/1702751652849/digitallabs_tm_logo?e=1736380800&v=beta&t=AUwyLlOh5Rt0Gvi3SefxQrzCDsWQ-KGkXDzFLG_jBfI",
    title: "DigitalLabs",
    role: "Founder",
    date: "2023 - Present",
    url: "https://www.linkedin.com/company/digitallabs-tm/",
  },
];

type WorkProps = {
  image: string;
  title: string;
  role: string;
  date: string;
  url: string;
};

const Work = (props: WorkProps) => {
  return (
    <Link href={props.url} className="inline-flex items-center gap-4 hover:bg-accent/50 transition-colors p-1 rounded">
      <img src={props.image} alt={props.title} className="w-10 h-10 object-contain rounded-md" />
      <div className="mr-auto">
        <div className="flex items-center gap-2">
          <p className="text-lg font-semibold">{props.title}</p>
        </div>
        <p className="text-xs text-muted-foreground">{props.role}</p>
      </div>
      <p className="text-xs text-end text-muted-foreground">{props.date}</p>
    </Link>
  );
};
