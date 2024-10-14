import { CandyCane, Cat, Code, ListTodo, LucideIcon, Swords, ThermometerSun } from "lucide-react";
import Link from "next/link";

export const SIDE_PROJECTS: SideProjectProps[] = [
  {
    logo: ListTodo,
    title: "Advanced Todo List App",
    description: "Advanced todo list app made with React Native.",
    url: "https://github.com/ThibautMilville/React-Native-Todolist",
  },
  {
    logo: ThermometerSun,
    title: "Temperature Converter",
    description: "Temperature converter made with React Native.",
    url: "https://github.com/ThibautMilville/Temperature-Converter-React-Native",
  },
  {
    logo: Swords,
    title: "Connect 4 Game",
    description: "Connect 4 game made with Python.",
    url: "https://github.com/ThibautMilville/Connect4_Game",
  },
  {
    logo: CandyCane,
    title: "Modern Secret Santa App",
    description: "Modern Secret Santa app made with Python.",
    url: "https://github.com/ThibautMilville/Secret_Santa",
  },
  {
    logo: Code,
    title: "Modern Responsive UI/UX Website",
    description: "Modern responsive UI/UX website made with React.",
    url: "https://github.com/ThibautMilville/Modern_Responsive_UI_UX_Website",
  },
  {
    logo: Cat,
    title: "Gacha Game",
    description: "Gacha game made with Vue.js (in a teamwork).",
    url: "https://github.com/Nizi7582/gacha-game",
  },
];

type SideProjectProps = {
  logo: LucideIcon;
  title: string;
  description: string;
  url: string;
};

export const SideProject = (props: SideProjectProps) => {
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
