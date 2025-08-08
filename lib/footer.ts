export const FOOTER_DATA = {
  navigation: [
    { title: 'Accueil', href: '/' },
    { title: 'Projets', href: '/projets' },
    { title: 'Formations', href: '/formations' },
    { title: 'Expériences', href: '/experiences' },
    { title: 'Contact', href: '/contact' },
  ],
  diplomes: [
    { title: 'Master Informatique - Développement Web', href: '/formations#master-informatique' },
    { title: 'Formation NestJS Avancée', href: '/formations#nestjs-avancee' },
  ],
  projets: [
    { title: 'E-Commerce Platform', href: '/projets#e-commerce-platform' },
    { title: 'Task Management SaaS', href: '/projets#task-management-saas' },
    { title: 'API GraphQL Microservices', href: '/projets#api-graphql-microservices' },
  ],
  skills: ['React', 'Next.js', 'NestJS', 'Node.js', 'TypeScript', 'PostgreSQL'],
  social: {
    github: 'https://github.com/ThibautMilville',
    linkedin: 'https://fr.linkedin.com/in/thibaut-milville',
    email: 'tmilville.pro@gmail.com',
    telegram: 'https://t.me/Thybow',
  },
} as const;

export type FooterData = typeof FOOTER_DATA;


