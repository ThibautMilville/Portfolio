import { Card } from "@/components/ui/card";
import { Section } from "./Section";
import { SIDE_PROJECTS, SideProject } from "./SideProject";
import { ContactCard } from "./ContactCard";
import { Work, WORKS } from "./Work";

export const Status = () => {
  return (
    <Section className="flex max-md:flex-col items-start gap-4">
      <div className="flex-[3] w-full">
        <Card className="w-full p-4 flex flex-col gap-2 w-full">
          <p className="text-lg text-muted-foreground">Side, fun projects.</p>
          <div className="flex flex-col gap-4">
            {SIDE_PROJECTS.map((project, index) => (
              <SideProject key={index} logo={project.logo} title={project.title} description={project.description} url={project.url} />
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
            mediumImage="https://imgs.search.brave.com/_fWAaDVKoMN8MSEyVSiQSe1AbB9hCSgVZigL1csx_KY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy1tYXJxdWVzLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/MS8wMy9HbWFpbC1M/b2dvLTUwMHgyODMu/cG5n"
            name="Email"
            description="tmilville.pro@gmail.com"
            url="mailto:tmilville.pro@gmail.com"
          />
          <ContactCard
            image="/pictures/profile-picture.jpeg"
            mediumImage="https://imgs.search.brave.com/ov86xo2iiKjAw4gn1YISBfvwteV2_FVKHWmKciiYX8U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9nZXQt/cGljdG8uY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIzLzAy/L2xvZ28tbGlua2Vk/aW4ud2VicA"
            name="LinkedIn"
            description="Thibaut MILVILLE"
            url="https://www.linkedin.com/in/thibaut-milville/"
          />
        </Card>
      </div>
    </Section>
  );
};
