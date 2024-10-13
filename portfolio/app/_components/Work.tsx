import Link from "next/link";

export const WORKS: WorkProps[] = [
  {
    image: "https://media.licdn.com/dms/image/v2/D4E0BAQEnrMai8iubKQ/company-logo_100_100/company-logo_100_100/0/1702751652849/digitallabs_tm_logo?e=1736380800&v=beta&t=AUwyLlOh5Rt0Gvi3SefxQrzCDsWQ-KGkXDzFLG_jBfI",
    title: "DigitalLabs",
    role: "Founder",
    date: "Oct. 2023 - Present",
    url: "https://www.linkedin.com/company/digitallabs-tm/",
  },
  {
    image: "https://media.licdn.com/dms/image/v2/D4E0BAQGRaCemLDfQtA/company-logo_100_100/company-logo_100_100/0/1716277093268/sncf_voyageurs_logo?e=1736985600&v=beta&t=_2eaNu-ReiMHFwl_jc_tbRXt2UIfF4HUSQyqkkh2TAg",
    title: "SNCF Voyageurs",
    role: "Web Developer",
    date: "Sep. 2023 - Present",
    url: "https://www.linkedin.com/company/digitallabs-tm/",
  },
  {
    image: "https://media.licdn.com/dms/image/v2/D4E0BAQEwHImsKekvXg/company-logo_100_100/company-logo_100_100/0/1688559799403/osmoz_com_logo?e=1736985600&v=beta&t=GFdZ6QNaKRMIw-gTxBOhnj0-i71OU9bt0LKeattk1Ss",
    title: "Osmoz",
    role: "Webmaster",
    date: "Dec. 2021 - Aug. 2023",
    url: "https://www.linkedin.com/company/11827597/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BpYYmkROySe6%2F7oa3GcC2%2FA%3D%3D",
  },
];

type WorkProps = {
  image: string;
  title: string;
  role: string;
  date: string;
  url: string;
};

export const Work = (props: WorkProps) => {
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
