import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import DigitalLabsLogo from "../../public/logos/digitallabs_tm_logo.jpeg";
import OsmozLogo from "../../public/logos/osmoz_com_logo.jpeg";
import SNCFVoyageursLogo from "../../public/logos/sncf_voyageurs_logo.jpeg";

export const WORKS: WorkProps[] = [
  {
    image: DigitalLabsLogo,
    title: "DigitalLabs",
    role: "Founder",
    date: "Oct. 2023 - Present",
    url: "https://www.linkedin.com/company/digitallabs-tm/",
  },
  {
    image: SNCFVoyageursLogo,
    title: "SNCF Voyageurs",
    role: "Web Developer",
    date: "Sep. 2023 - Present",
    url: "https://www.linkedin.com/company/44455449/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BUzwB0qzZSBq3wBDoyfNCtQ%3D%3D",
  },
  {
    image: OsmozLogo,
    title: "Osmoz",
    role: "Webmaster",
    date: "Dec. 2021 - Aug. 2023",
    url: "https://www.linkedin.com/company/11827597/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BpYYmkROySe6%2F7oa3GcC2%2FA%3D%3D",
  },
];

type WorkProps = {
  image: StaticImageData;
  title: string;
  role: string;
  date: string;
  url: string;
};

export const Work = (props: WorkProps) => {
  return (
    <Link href={props.url} className="inline-flex items-center gap-4 hover:bg-accent/50 transition-colors p-1 rounded">
      <Image
        src={props.image}
        alt={props.title}
        width={40}
        height={40}
        className="object-contain rounded-md"
      />
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