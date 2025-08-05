export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  date: string;
  status: "Terminé" | "En cours" | "En pause";
  github: string;
  demo: string | null;
  category: string;
  features: string[];
  challenges: string[];
  solutions: string[];
  screenshots?: string[];
  duration: string;
  teamSize?: number;
  role: string;
  relatedExperienceId?: number;
  relatedFormationIds?: number[];
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  date: string;
  description: string;
  technologies: string[];
  achievements: string[];
  projectIds?: number[];
  relatedFormationIds?: number[];
  logoUrl?: string;
}

export interface Formation {
  id: number;
  title: string;
  institution: string;
  location: string;
  date: string;
  description: string;
  skills: string[];
  mention: string;
  type: "Diplôme" | "Certification" | "Formation";
  projectIds?: number[];
  relatedExperienceIds?: number[];
  credentialUrl?: string;
  logoUrl?: string;
}

export const experiences: Experience[] = [
  {
    id: 7,
    title: "Moderator",
    company: "Ultra",
    location: "Ville de Paris, Île-de-France, France · Remote",
    date: "Mar 2025 - Présent",
    description: "Moderating international communities, organizing events and helping users. Participating in Black Ice Studios (Ashes of Mankind) game social networks moderation.",
    technologies: ["Community Management", "Event Organization", "Social Media Moderation", "International Communities", "Gaming Industry", "Online Community Moderation"],
    achievements: [
      "Modération de communautés internationales",
      "Organisation d'événements",
      "Aide aux utilisateurs",
      "Participation à la modération des réseaux sociaux du jeu Black Ice Studios (Ashes of Mankind)",
      "Modération de communauté en ligne"
    ],
    projectIds: [],
    relatedFormationIds: [3],
    logoUrl: "/images/company/logo_ultra.png"
  },
  {
    id: 8,
    title: "MVP",
    company: "Ultra Times",
    location: "Paris, Île-de-France, France · Remote",
    date: "Jan 2025 - Présent",
    description: "Participation in strategic decision-making as part of the management team, while leading the technical design and development of IT projects.",
    technologies: ["Strategic Decision Making", "Management", "Technical Design", "IT Project Development", "Leadership"],
    achievements: [
      "Participation aux décisions stratégiques en tant que membre de l'équipe de direction",
      "Conduite de la conception technique et du développement de projets informatiques",
      "Leadership dans la gestion d'équipe"
    ],
    projectIds: [],
    relatedFormationIds: [3],
    logoUrl: "/images/company/logo_UT.png"
  },
  {
    id: 9,
    title: "Junior Software Engineer and Community Contributor",
    company: "Ultra Times",
    location: "Paris, Île-de-France, France · Remote",
    date: "Oct 2024 - Présent",
    description: "Development using the Ultra blockchain and its APIs, writing technical articles about it, and participating in community activities in both English and French (community engagement, interviews, etc...).",
    technologies: ["Ultra Blockchain", "API Development", "Technical Writing", "Community Management", "English", "French", "Blockchain Development"],
    achievements: [
      "Développement utilisant la blockchain Ultra et ses APIs",
      "Rédaction d'articles techniques sur la blockchain Ultra",
      "Participation aux activités communautaires en anglais et français",
      "Engagement communautaire et interviews"
    ],
    projectIds: [],
    relatedFormationIds: [3],
    logoUrl: "/images/company/logo_UT.png"
  },
  {
    id: 1,
    title: "Junior Software Engineer",
    company: "SNCF Voyageurs",
    location: "Paris, Île-de-France, France",
    date: "Sep 2024 - Présent",
    description: "Designing application solutions to optimise agents' work.",
    technologies: ["Application Design", "Software Engineering", "Agent Optimization"],
    achievements: [
      "Conception de solutions applicatives pour optimiser le travail des agents",
      "Développement d'applications internes",
      "Collaboration avec les équipes métier"
    ],
    projectIds: [],
    relatedFormationIds: [1, 2, 3],
    logoUrl: "/images/company/Logo-SNCF-Voyageurs.webp"
  },
  {
    id: 3,
    title: "Founder and Director",
    company: "DigitalLabs TM",
    location: "France",
    date: "Oct 2023 - Présent",
    description: "IT services and custom software development company.",
    technologies: ["Business Management", "Software Development", "IT Services", "Project Management"],
    achievements: [
      "Création et direction d'une entreprise de services informatiques",
      "Développement de logiciels sur mesure",
      "Gestion des relations clients et des projets"
    ],
    projectIds: [],
    relatedFormationIds: [1, 2, 3],
    logoUrl: "https://media.licdn.com/dms/image/v2/D4E0BAQEnrMai8iubKQ/company-logo_100_100/company-logo_100_100/0/1702751652849/digitallabs_tm_logo?e=1756339200&v=beta&t=aeMk2PmSBhlBUrvH_vRoFRv1QH5slDxRreVXcdBCc-8"
  },
  {
    id: 2,
    title: "Web Developer",
    company: "SNCF Voyageurs",
    location: "Paris, Île-de-France, France",
    date: "Sep 2023 - Sep 2024",
    description: "Production and maintenance of internal applications.",
    technologies: ["Agile Project Management", "NestJS", "React.js", "TypeScript", "JavaScript", "CodeIgniter", "PHP", "Git", "MySQL", "MySQL Workbench", "HTML", "CSS3", "Bootstrap"],
    achievements: [
      "Production et maintenance d'applications internes",
      "Développement avec NestJS et React.js",
      "Gestion de projet Agile",
      "Utilisation de CodeIgniter et PHP"
    ],
    projectIds: [],
    relatedFormationIds: [2, 3],
    logoUrl: "/images/company/Logo-SNCF-Voyageurs.webp"
  },
  {
    id: 4,
    title: "Webmaster",
    company: "Osmoz Communication",
    location: "Coulommiers, Île-de-France, France",
    date: "Dec 2021 - Aug 2023",
    description: "I was in charge of the company's online communication by developing a complete set of websites to promote the products and services sold by the brand. I also managed the social networks and acquired many soft skills, especially in communication thanks to the customer relationship I was often confronted with. This experience allowed me to learn how to manage projects and made me gain confidence.",
    technologies: ["Social Media Marketing", "Autodidacte", "Rigueur", "Adobe Illustrator", "JavaScript", "MySQL", "PHP", "Search Engine Optimization (SEO)", "Adaptation", "CSS3", "Communication", "WordPress", "Microsoft Office", "HTML", "Content Management Systems (CMS)"],
    achievements: [
      "Développement d'un ensemble complet de sites web",
      "Gestion des réseaux sociaux",
      "Acquisition de compétences en communication client",
      "Gestion de projets et développement de la confiance"
    ],
    projectIds: [],
    relatedFormationIds: [3],
    logoUrl: "https://media.licdn.com/dms/image/v2/D4E0BAQEwHImsKekvXg/company-logo_100_100/company-logo_100_100/0/1688559799403/osmoz_com_logo?e=1756339200&v=beta&t=lsxLljsjhbMXOfA9ju5owGZg_XaSbxOUsPdOI_fcX3Q"
  },
  {
    id: 5,
    title: "Freelance in Digital Marketing",
    company: "ComeUp",
    location: "France",
    date: "Apr 2018 - Dec 2021",
    description: "I started missions at the age of 17 at the same time as high school and stopped a little over three years later to devote myself fully to my studies. I learned project management, time and stress management and customer relations, while developing skills in several areas (video and image advertising, SEO writing, websites...). I accompanied more than 300 clients with 100% positive reviews and recommendations.",
    technologies: ["Social Media Marketing", "Autodidacte", "Rigueur", "Search Engine Optimization (SEO)", "Adaptation", "Communication", "Microsoft Office", "Client Relationship Management"],
    achievements: [
      "Accompagnement de plus de 300 clients avec 100% d'avis positifs et de recommandations",
      "Début des missions à 17 ans en parallèle du lycée",
      "Apprentissage de la gestion de projet",
      "Gestion du temps et du stress",
      "Développement de compétences en publicité vidéo et image",
      "Rédaction SEO et développement de sites web",
      "Excellence en relations clients et satisfaction client"
    ],
    projectIds: [],
    relatedFormationIds: [3],
    logoUrl: "https://media.licdn.com/dms/image/v2/D4E0BAQHyLoDZ2hcMew/company-logo_100_100/company-logo_100_100/0/1666615300523/5euros_com_logo?e=1756339200&v=beta&t=Z3hs9K1GME9bOIWB8bDNKQSgqW5gzp-1-P1hHfqEgdo"
  }
];

export const formations: Formation[] = [
  {
    id: 4,
    title: "Microsoft Certified: Azure Fundamentals",
    institution: "Microsoft",
    location: "En ligne",
    date: "Avril 2025",
    description: "Certification officielle Microsoft pour les fondamentaux Azure et le cloud computing.",
    skills: ["Cloud Computing", "Azure", "Microsoft Cloud"],
    mention: "C62D8F485B8E1CD7",
    type: "Certification",
    projectIds: [],
    relatedExperienceIds: [],
    credentialUrl: "https://learn.microsoft.com/api/credentials/share/en-us/ThibautMILVILLE-1278/C62D8F485B8E1CD7?sharingId=2C3FEDB0EB979CE8",
    logoUrl: "https://www.freepnglogos.com/uploads/microsoft-windows-logo-images-19.png"
  },
  {
    id: 5,
    title: "Analyzing and Visualizing Data with Microsoft Power BI - Beginner",
    institution: "Groupe SNCF",
    location: "Paris La Défense",
    date: "Mars 2025",
    description: "Formation sur l'analyse et la visualisation de données avec Microsoft Power BI.",
    skills: ["Power BI", "Data Analysis", "Data Visualization", "Business Intelligence"],
    mention: "",
    type: "Certification",
    projectIds: [],
    relatedExperienceIds: [],
    logoUrl: "https://imgs.search.brave.com/42jM9c61NlZ4K7NgaEas01TcYNBceKlrMmj0ABosGUc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzEyLzIvc25jZi1s/b2dvLXBuZ19zZWVr/bG9nby0xMjg0ODAu/cG5n"
  },
  {
    id: 1,
    title: "Master's degree (MAALSI)",
    institution: "CESI",
    location: "France",
    date: "Sep 2024 - Sep 2026",
    description: "Master en informatique spécialisé en développement et architectures logicielles.",
    skills: ["Computer Science", "Software Architecture", "Advanced Development"],
    mention: "",
    type: "Diplôme",
    projectIds: [],
    relatedExperienceIds: [],
    logoUrl: "/images/education/cesi.webp"
  },
  {
    id: 2,
    title: "Bachelor's degree (CDA)",
    institution: "CESI",
    location: "France",
    date: "Sep 2023 - Sep 2024",
    description: "Learn advanced web development techniques, with some DevOps concepts (planning, continuous integration, automated tests...)",
    skills: ["StarUML", "React.js", "Agile Project Management", "MySQL Workbench"],
    mention: "Honors of the jury",
    type: "Diplôme",
    projectIds: [],
    relatedExperienceIds: [],
    logoUrl: "/images/education/cesi.webp"
  },
  {
    id: 3,
    title: "BTS SIO Option SLAM",
    institution: "CFA Émerainville",
    location: "France",
    date: "Sep 2021 - Jul 2023",
    description: "Basics of computer science, learning essential web languages, discovering databases and PHP, working on web and mobile applications.",
    skills: ["PHP", "Adaptation", "Communication", "JavaScript", "Tailwind", "Bootstrap", "GitHub", "Python", "HTML", "CSS3", "SASS", "Rigueur", "MySQL", "Autodidacte"],
    mention: "Validated",
    type: "Diplôme",
    projectIds: [],
    relatedExperienceIds: [],
    logoUrl: "https://www.utec77.fr/themes/custom/generic/medias/logo_utec.png"
  }
];

export const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Plateforme e-commerce complète avec panier, paiements Stripe, gestion admin et tableau de bord analytique.",
    longDescription: "Une plateforme e-commerce moderne et complète développée avec les dernières technologies. Le projet inclut un système de gestion des produits, un panier d'achat avancé, des paiements sécurisés via Stripe, un tableau de bord administrateur avec analytics, et une interface utilisateur responsive.",
    image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Stripe", "Redis", "Docker"],
    date: "2023",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: "https://demo.example.com",
    category: "Fullstack",
    relatedExperienceId: 1,
    relatedFormationIds: [1, 2, 3],
    screenshots: [
      "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    features: [
      "Catalogue de produits avec filtres avancés",
      "Panier d'achat persistant",
      "Paiements sécurisés avec Stripe",
      "Gestion des commandes en temps réel",
      "Tableau de bord administrateur",
      "Analytics et rapports de vente",
      "Système de notifications",
      "Interface responsive"
    ],
    challenges: [
      "Gestion de la concurrence pour les stocks",
      "Optimisation des performances avec de nombreux produits",
      "Sécurisation des paiements",
      "Synchronisation en temps réel des données"
    ],
    solutions: [
      "Implémentation de verrous optimistes pour les stocks",
      "Mise en cache Redis pour les produits populaires",
      "Intégration complète avec Stripe et validation côté serveur",
      "WebSockets pour les mises à jour en temps réel"
    ],
    duration: "4 mois",
    teamSize: 3,
    role: "Lead Developer"
  },
  {
    id: 2,
    title: "Task Management SaaS",
    description: "Application de gestion de tâches collaborative avec équipes, notifications temps réel et rapports.",
    longDescription: "Une application SaaS de gestion de tâches collaborative conçue pour les équipes modernes. Le système permet la création de projets, l'assignation de tâches, le suivi du temps, et la génération de rapports détaillés. L'application inclut des notifications en temps réel et une interface intuitive.",
    image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Tailwind", "AWS"],
    date: "2023",
    status: "En cours",
    github: "https://github.com/ThibautMilville",
    demo: "https://demo.example.com",
    category: "SaaS",
    relatedExperienceId: 2,
    relatedFormationIds: [1],
    screenshots: [
      "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    features: [
      "Gestion de projets et équipes",
      "Assignation et suivi de tâches",
      "Notifications en temps réel",
      "Tableau de bord personnalisable",
      "Rapports et analytics",
      "Intégration calendrier",
      "API REST complète",
      "Déploiement cloud AWS"
    ],
    challenges: [
      "Gestion de la complexité des permissions",
      "Optimisation des requêtes MongoDB",
      "Scalabilité des notifications temps réel",
      "Interface utilisateur intuitive"
    ],
    solutions: [
      "Système de rôles et permissions granulaire",
      "Indexation MongoDB et agrégations optimisées",
      "Architecture WebSocket scalable avec Redis",
      "Design system cohérent avec Tailwind"
    ],
    duration: "6 mois",
    teamSize: 2,
    role: "Full Stack Developer"
  },
  {
    id: 3,
    title: "API GraphQL Microservices",
    description: "Architecture microservices avec API GraphQL, Gateway et services indépendants.",
    longDescription: "Une architecture microservices moderne utilisant GraphQL comme couche d'API unifiée. Le projet comprend plusieurs services indépendants, un gateway GraphQL, un système de découverte de services, et une documentation interactive. L'architecture est conçue pour être hautement scalable et maintenable.",
    image: "https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["NestJS", "GraphQL", "Docker", "Kubernetes", "PostgreSQL", "RabbitMQ"],
    date: "2022",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: null,
    category: "Backend",
    relatedExperienceId: 3,
    relatedFormationIds: [1, 2, 3],
    screenshots: [
      "https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    features: [
      "API GraphQL unifiée",
      "Architecture microservices",
      "Gateway de services",
      "Documentation interactive",
      "Monitoring et logging",
      "Déploiement Kubernetes",
      "Message broker RabbitMQ",
      "Tests automatisés"
    ],
    challenges: [
      "Orchestration des microservices",
      "Gestion de la cohérence des données",
      "Performance du gateway GraphQL",
      "Monitoring distribué"
    ],
    solutions: [
      "Pattern Saga pour la cohérence transactionnelle",
      "DataLoader pour optimiser les requêtes GraphQL",
      "Service mesh pour l'orchestration",
      "Centralisation des logs avec ELK Stack"
    ],
    duration: "3 mois",
    teamSize: 4,
    role: "Backend Developer"
  },
  {
    id: 4,
    title: "Dashboard Analytics",
    description: "Tableau de bord analytique en temps réel avec visualisations interactives et rapports automatisés.",
    longDescription: "Un tableau de bord analytique complet permettant de visualiser et analyser les données métier en temps réel. Le système inclut des graphiques interactifs, des alertes personnalisables, et des rapports automatisés pour la prise de décision.",
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["React", "D3.js", "Node.js", "PostgreSQL", "Redis", "Chart.js"],
    date: "2023",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: "https://demo.example.com",
    category: "Analytics",
    relatedExperienceId: 1,
    relatedFormationIds: [1, 2],
    screenshots: [
      "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    features: [
      "Visualisations interactives en temps réel",
      "Graphiques personnalisables",
      "Alertes et notifications",
      "Export de rapports PDF/Excel",
      "API REST pour intégrations",
      "Tableau de bord responsive",
      "Filtres avancés",
      "Historique des données"
    ],
    challenges: [
      "Gestion de gros volumes de données",
      "Performance des visualisations",
      "Synchronisation temps réel",
      "Interface utilisateur intuitive"
    ],
    solutions: [
      "Optimisation des requêtes avec indexation",
      "Lazy loading des graphiques",
      "WebSockets pour les mises à jour",
      "Design system cohérent"
    ],
    duration: "5 mois",
    teamSize: 3,
    role: "Lead Developer"
  },
  {
    id: 5,
    title: "Mobile App React Native",
    description: "Application mobile cross-platform avec synchronisation cloud et fonctionnalités offline.",
    longDescription: "Une application mobile développée avec React Native permettant une expérience utilisateur native sur iOS et Android. L'app inclut la synchronisation cloud, le mode hors ligne, et des fonctionnalités avancées comme les notifications push.",
    image: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["React Native", "Expo", "Firebase", "Redux", "AsyncStorage", "Push Notifications"],
    date: "2023",
    status: "En cours",
    github: "https://github.com/ThibautMilville",
    demo: "https://demo.example.com",
    category: "Mobile",
    relatedExperienceId: 2,
    relatedFormationIds: [1],
    screenshots: [
      "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    features: [
      "Interface native iOS/Android",
      "Synchronisation cloud Firebase",
      "Mode hors ligne complet",
      "Notifications push",
      "Authentification biométrique",
      "Géolocalisation",
      "Partage de contenu",
      "Thème sombre/clair"
    ],
    challenges: [
      "Performance cross-platform",
      "Gestion du mode hors ligne",
      "Synchronisation des données",
      "Compatibilité iOS/Android"
    ],
    solutions: [
      "Optimisation des composants React Native",
      "Stratégie de cache intelligente",
      "API de synchronisation robuste",
      "Tests sur appareils réels"
    ],
    duration: "7 mois",
    teamSize: 2,
    role: "Mobile Developer"
  },
  {
    id: 6,
    title: "CI/CD Pipeline",
    description: "Pipeline d'intégration continue avec tests automatisés, déploiement et monitoring.",
    longDescription: "Un pipeline d'intégration continue complet permettant l'automatisation des tests, du déploiement et du monitoring. Le système inclut des tests unitaires, d'intégration et end-to-end, ainsi que des déploiements automatiques sur différents environnements.",
    image: "https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["GitHub Actions", "Docker", "Kubernetes", "Jest", "Cypress", "Prometheus"],
    date: "2022",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: null,
    category: "DevOps",
    relatedExperienceId: 3,
    relatedFormationIds: [1, 2, 3],
    screenshots: [
      "https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    features: [
      "Tests automatisés unitaires",
      "Tests d'intégration",
      "Tests end-to-end",
      "Déploiement automatique",
      "Monitoring et alertes",
      "Rollback automatique",
      "Environnements multiples",
      "Documentation automatique"
    ],
    challenges: [
      "Orchestration des tests",
      "Gestion des environnements",
      "Monitoring distribué",
      "Sécurité du pipeline"
    ],
    solutions: [
      "Pipeline modulaire et réutilisable",
      "Infrastructure as Code",
      "Centralisation des métriques",
      "Sécurité intégrée dès la conception"
    ],
    duration: "2 mois",
    teamSize: 2,
    role: "DevOps Engineer"
  },
  {
    id: 7,
    title: "API Gateway",
    description: "Passerelle API centralisée avec authentification, rate limiting et monitoring.",
    longDescription: "Une passerelle API centralisée permettant de gérer l'authentification, le rate limiting, le monitoring et la sécurité pour tous les microservices. Le système inclut une documentation interactive et des métriques en temps réel.",
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["NestJS", "Redis", "JWT", "Rate Limiting", "Swagger", "Prometheus"],
    date: "2023",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: null,
    category: "Backend",
    relatedExperienceId: 1,
    relatedFormationIds: [1, 2, 3],
    screenshots: [
      "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    features: [
      "Authentification centralisée",
      "Rate limiting intelligent",
      "Documentation API interactive",
      "Monitoring en temps réel",
      "Logs centralisés",
      "Sécurité renforcée",
      "Load balancing",
      "Circuit breaker"
    ],
    challenges: [
      "Gestion de la latence",
      "Sécurité des APIs",
      "Scalabilité",
      "Monitoring distribué"
    ],
    solutions: [
      "Cache Redis pour les performances",
      "JWT avec refresh tokens",
      "Architecture microservices",
      "Métriques Prometheus"
    ],
    duration: "3 mois",
    teamSize: 2,
    role: "Backend Developer"
  },
  {
    id: 8,
    title: "Design System",
    description: "Système de design complet avec composants réutilisables et documentation.",
    longDescription: "Un système de design complet incluant des composants React réutilisables, une documentation interactive, et des guidelines de design. Le système assure la cohérence visuelle et améliore la productivité des développeurs.",
    image: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["React", "Storybook", "TypeScript", "Tailwind CSS", "Figma", "Jest"],
    date: "2023",
    status: "En cours",
    github: "https://github.com/ThibautMilville",
    demo: "https://demo.example.com",
    category: "Frontend",
    relatedExperienceId: 2,
    relatedFormationIds: [1],
    screenshots: [
      "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    features: [
      "Composants React réutilisables",
      "Documentation Storybook",
      "Thèmes personnalisables",
      "Tests automatisés",
      "Guidelines de design",
      "Tokens de design",
      "Accessibilité WCAG",
      "Responsive design"
    ],
    challenges: [
      "Cohérence des composants",
      "Documentation maintenue",
      "Accessibilité",
      "Performance des composants"
    ],
    solutions: [
      "Architecture modulaire",
      "Documentation automatisée",
      "Tests d'accessibilité",
      "Optimisation des bundles"
    ],
    duration: "4 mois",
    teamSize: 3,
    role: "Frontend Developer"
  },
  {
    id: 9,
    title: "Monitoring Platform",
    description: "Plateforme de monitoring centralisée avec alertes et dashboards personnalisables.",
    longDescription: "Une plateforme de monitoring complète permettant de surveiller les applications, serveurs et services en temps réel. Le système inclut des alertes intelligentes, des dashboards personnalisables et des rapports automatisés.",
    image: "https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["Prometheus", "Grafana", "AlertManager", "Node.js", "PostgreSQL", "Docker"],
    date: "2022",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: null,
    category: "DevOps",
    relatedExperienceId: 3,
    relatedFormationIds: [1, 2, 3],
    screenshots: [
      "https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    features: [
      "Monitoring temps réel",
      "Alertes intelligentes",
      "Dashboards personnalisables",
      "Métriques customisées",
      "Rapports automatisés",
      "Intégration multi-services",
      "Historique des données",
      "API de métriques"
    ],
    challenges: [
      "Gestion des gros volumes",
      "Alertes pertinentes",
      "Performance des dashboards",
      "Intégration multi-sources"
    ],
    solutions: [
      "Base de données optimisée",
      "Règles d'alerte intelligentes",
      "Cache des métriques",
      "APIs standardisées"
    ],
    duration: "3 mois",
    teamSize: 2,
    role: "DevOps Engineer"
  },
  {
    id: 10,
    title: "UT Marketplace",
    description: "Marketplace web3 dédiée à l'écosystème Ultra, une blockchain L1 dédiée au gaming.",
    longDescription: "Une marketplace web3 innovante développée pour l'écosystème Ultra, une blockchain L1 spécialisée dans le gaming. La plateforme permet l'achat, la vente et l'échange d'actifs numériques liés aux jeux, avec une intégration native de la blockchain Ultra et des fonctionnalités DeFi avancées.",
    image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["Next.js", "Ultra Blockchain", "Web3", "Solidity", "Ethers.js", "Tailwind CSS", "TypeScript"],
    date: "2024",
    status: "En cours",
    github: "https://github.com/ThibautMilville",
    demo: "https://ut-marketplace.vercel.app/fr",
    category: "Web3",
    relatedExperienceId: 8,
    relatedFormationIds: [3],
    screenshots: [
      "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/8386435/pexels-photo-8386435.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/8386436/pexels-photo-8386436.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    features: [
      "Marketplace d'actifs numériques gaming",
      "Intégration native blockchain Ultra",
      "Portefeuille Web3 intégré",
      "Système de trading sécurisé",
      "Interface utilisateur moderne",
      "Fonctionnalités DeFi",
      "Gestion des collections NFT",
      "Analytics et statistiques"
    ],
    challenges: [
      "Intégration complexe avec la blockchain Ultra",
      "Sécurité des transactions Web3",
      "Performance des interactions blockchain",
      "Expérience utilisateur intuitive"
    ],
    solutions: [
      "Architecture Web3 optimisée",
      "Smart contracts audités",
      "Cache et optimisation des requêtes",
      "Design system cohérent"
    ],
    duration: "6 mois",
    teamSize: 3,
    role: "Full Stack Web3 Developer"
  }
];

export function getProjectById(id: number): Project | undefined {
  return projects.find(project => project.id === id);
}

export function getAllProjects(): Project[] {
  return projects;
}

export function getExperienceById(id: number): Experience | undefined {
  return experiences.find(exp => exp.id === id);
}

export function getAllExperiences(): Experience[] {
  return experiences;
}

export function getFormationById(id: number): Formation | undefined {
  return formations.find(formation => formation.id === id);
}

export function getAllFormations(): Formation[] {
  return formations;
}

export function getRelatedExperience(project: Project): Experience | undefined {
  if (project.relatedExperienceId) {
    return getExperienceById(project.relatedExperienceId);
  }
  return undefined;
}

export function getRelatedFormations(project: Project): Formation[] {
  if (project.relatedFormationIds) {
    return project.relatedFormationIds.map(id => getFormationById(id)).filter(Boolean) as Formation[];
  }
  return [];
}

export function getProjectsByExperience(experienceId: number): Project[] {
  return projects.filter(project => project.relatedExperienceId === experienceId);
}

export function getProjectsByFormation(formationId: number): Project[] {
  return projects.filter(project => project.relatedFormationIds?.includes(formationId));
}

export function getFormationsByExperience(experience: Experience): Formation[] {
  if (experience.relatedFormationIds) {
    return experience.relatedFormationIds.map(id => getFormationById(id)).filter(Boolean) as Formation[];
  }
  return [];
}

export function getRelatedExperiences(formation: Formation): Experience[] {
  if (formation.relatedExperienceIds) {
    return formation.relatedExperienceIds.map(id => getExperienceById(id)).filter(Boolean) as Experience[];
  }
  return [];
}



export function getExperiencesByFormation(formationId: number): Experience[] {
  return experiences.filter(exp => exp.relatedFormationIds?.includes(formationId));
}

// Nouvelle fonction pour regrouper les expériences par entreprise
export function getGroupedExperiences(): Array<{
  company: string;
  experiences: Experience[];
  totalDuration: string;
  logoUrl?: string;
}> {
  const grouped = new Map<string, Experience[]>();
  
  // Grouper par entreprise
  experiences.forEach(exp => {
    if (!grouped.has(exp.company)) {
      grouped.set(exp.company, []);
    }
    grouped.get(exp.company)!.push(exp);
  });
  
  // Trier les expériences de chaque entreprise par date (plus récent en premier)
  const result: Array<{
    company: string;
    experiences: Experience[];
    totalDuration: string;
    logoUrl?: string;
  }> = [];
  
  grouped.forEach((companyExperiences, company) => {
    const sortedExperiences = companyExperiences.sort((a, b) => {
      // Extraire les années des dates pour le tri
      const getYear = (dateStr: string) => {
        if (dateStr.includes('Présent')) return new Date().getFullYear();
        const yearMatch = dateStr.match(/(\d{4})/);
        return yearMatch ? parseInt(yearMatch[1]) : 0;
      };
      return getYear(b.date) - getYear(a.date);
    });
    
    // Calculer la durée totale
    const firstExp = sortedExperiences[sortedExperiences.length - 1]; // Plus ancienne
    const lastExp = sortedExperiences[0]; // Plus récente
    
    let totalDuration = '';
    if (sortedExperiences.length === 1) {
      totalDuration = firstExp.date;
    } else {
      const startDate = firstExp.date.split(' - ')[0];
      const endDate = lastExp.date.includes('Présent') ? 'Présent' : lastExp.date.split(' - ')[1];
      totalDuration = `${startDate} - ${endDate}`;
    }
    
    result.push({
      company,
      experiences: sortedExperiences,
      totalDuration,
      logoUrl: sortedExperiences[0].logoUrl
    });
  });
  
  // Trier par date (plus récent en premier)
  return result.sort((a, b) => {
    const getYear = (dateStr: string) => {
      if (dateStr.includes('Présent')) return new Date().getFullYear();
      const yearMatch = dateStr.match(/(\d{4})/);
      return yearMatch ? parseInt(yearMatch[1]) : 0;
    };
    return getYear(b.totalDuration) - getYear(a.totalDuration);
  });
} 