import { getAllProjects, getAllFormations } from './data';

// Récupérer les données
const allProjects = getAllProjects();
const allFormations = getAllFormations();

// Projets phares (les 3 premiers projets)
const featuredProjectTitles = [
  "UT Marketplace",
  "Institutional website OZC",
  "Commercial website OZC Signalétique",
];
const featuredProjects = allProjects.filter((p: any) =>
  featuredProjectTitles.includes(p.title)
);

// Premier diplôme (le plus récent) et 2 dernières certifications
const diplomes = allFormations.filter((f: any) => f.type === "Diplôme");
const certifications = allFormations.filter((f: any) => f.type === "Certification");
const latestDiplome = diplomes[0]; // Premier diplôme (le plus récent)
const latestCertifications = certifications.slice(0, 2); // 2 premières certifications (les plus récentes)

export const FOOTER_DATA = {
  navigation: [
    { title: 'Accueil', href: '/' },
    { title: 'Projets', href: '/projets' },
    { title: 'Formations', href: '/formations' },
    { title: 'Expériences', href: '/experiences' },
    { title: 'Contact', href: '/contact' },
  ],
  diplomes: [
    ...(latestDiplome ? [{ title: latestDiplome.title, href: `/formations#${latestDiplome.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}` }] : []),
    ...latestCertifications.map((cert: any) => ({ title: cert.title, href: `/formations#${cert.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}` }))
  ],
  projets: featuredProjects.map((project: any) => ({
    title: project.title,
    href: `/projets/${project.title.toLowerCase().replace(/\s+/g, '-')}`
  })),
  skills: ['React', 'Next.js', 'NestJS', 'Node.js', 'TypeScript', 'MySQL'],
  social: {
    github: 'https://github.com/ThibautMilville',
    linkedin: 'https://fr.linkedin.com/in/thibaut-milville',
    email: 'tmilville.pro@gmail.com',
    telegram: 'https://t.me/Thybow',
  },
} as const;

export type FooterData = typeof FOOTER_DATA;


