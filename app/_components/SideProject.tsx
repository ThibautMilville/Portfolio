import { CandyCane, Table, Code, ListTodo, LucideIcon, Wallet, Webhook } from "lucide-react";
import Link from "next/link";

export const SIDE_PROJECTS: SideProjectProps[] = [
  {
    logo: Code,
    title: "Ultra Dashboard",
    description: "Advanced dashboard about Ultra and made with React.",
    url: "https://github.com/ThibautMilville/Ultra-Dashboard",
  },
  {
    logo: Wallet,
    title: "Ultra Wallet Tracker",
    description: "Wallet Tracker using the Ultra API and made with React.",
    url: "https://github.com/ThibautMilville/Ultra-Wallet-Tracker",
  },
  {
    logo: Table,
    title: "Tracking Table Tennis Matches App",
    description: "Score tracking application with voice recognition.",
    url: "https://github.com/ThibautMilville/Tracking-Table-Tennis-Matches-App",
  },
  {
    logo: ListTodo,
    title: "Advanced Todo List App",
    description: "Advanced todo list app made with React Native and Expo.",
    url: "https://github.com/ThibautMilville/React-Native-Todolist",
  },
  {
    logo: Webhook,
    title: "La Bataille des Expressions",
    description: "Expression game made with React.",
    url: "https://github.com/ThibautMilville/La-Bataille-Des-Expressions",
  },
  {
    logo: CandyCane,
    title: "Modern Secret Santa App",
    description: "Modern Secret Santa app made with Python.",
    url: "https://github.com/ThibautMilville/Secret_Santa",
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
