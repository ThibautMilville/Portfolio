export const featuredProjectTitles = [
  "UT Marketplace",
  "Institutional website OZC",
  "Commercial website OZC Signalétique",
];

export const FOOTER_DATA = {
  navigation: [
    { title: 'Accueil', href: '/' },
    { title: 'Projets', href: '/projets' },
    { title: 'Formations', href: '/formations' },
    { title: 'Expériences', href: '/experiences' },
    { title: 'Contact', href: '/contact' },
  ],
  skills: ['React', 'Next.js', 'NestJS', 'Node.js', 'TypeScript', 'MySQL'],
  social: {
    github: 'https://github.com/ThibautMilville',
    linkedin: 'https://fr.linkedin.com/in/thibaut-milville',
    email: 'tmilville' + '.' + 'pro' + '@' + 'gmail' + '.' + 'com',
    telegram: 'https://t.me/Thybow',
  },
} as const;

export type FooterData = typeof FOOTER_DATA;


