import { Badge } from "@/components/ui/badge";
import { Section } from "./Section";
import { ContactCard } from "./ContactCard";

export const Contact = () => {
  return (
    <Section className="flex flex-col items-start gap-4">
      <Badge>Skills</Badge>
      <h2 className="pb-2 text-3xl font-semibold tracking-tight first:mt-0">Contact me, I will be happy to work with you.</h2>
      <div className="flex max-md:flex-col w-full gap-4">
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
        <ContactCard
          image="/pictures/profile-picture.jpeg"
          mediumImage="https://imgs.search.brave.com/CurQJFfHWyN-ATDVUKb3lDnLWwFeLRxzlCRp4tHRX5o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/ZG93bmxvYWQub3Jn/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE3/LzExL3RlbGVncmFt/LWxvZ28tMC0yLnBu/Zw"
          name="Telegram"
          description="Thibaut"
          url="https://t.me/Thybow"
        />
      </div>
    </Section>
  );
};
