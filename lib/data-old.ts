import { slugify } from "./utils";
export interface Project {
  id: number;
  title: string;
  slug?: string;
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
  periods?: Array<{
    date: string;
    title?: string;
    description?: string;
  }>;
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
    date: "Mar 2025 - Oct 2025",
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
    logoUrl: "/images/company/logo-digitallabs.png"
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
    logoUrl: "/images/company/osmoz_com_logo.jpeg"
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
    logoUrl: "/images/company/comeup_logo.jpeg"
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
    institution: "CESI Nanterre",
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
    institution: "CESI Nanterre",
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
    id: 10,
    title: "UT Marketplace",
    description: "Marketplace Web3 pour vendre des UNIQs (NFTs) sur la blockchain Ultra.",
    longDescription: "UT Marketplace est une marketplace Web3 dédiée à la vente d'UNIQs (NFTs) sur la blockchain Ultra. Elle propose une section marketplace avancée ainsi que des espaces dédiés aux collections, aux transactions et aux statistiques pour suivre les performances des ventes. L'application est connectée à la blockchain Ultra avec intégration du portefeuille et traitement des transactions. Un système multilingue est inclus. MVP développé dans le cadre d'une levée de fonds en collaboration avec Ultra Times.",
    image: "/images/projects/ut-marketplace/ut-marketplace_1.png",
    technologies: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Web3", "Ultra Blockchain", "Agile"],
    date: "Mai 2025 - Juin 2025",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: "https://ut-marketplace.vercel.app/fr",
    category: "Web3",
    relatedExperienceId: 8,
    relatedFormationIds: [3],
    screenshots: [
      "/images/projects/ut-marketplace/ut-marketplace_1.png",
      "/images/projects/ut-marketplace/ut-marketplace_2.png",
      "/images/projects/ut-marketplace/ut-marketplace_3.png",
      "/images/projects/ut-marketplace/ut-marketplace_4.png",
      "/images/projects/ut-marketplace/ut-marketplace_5.png",
      "/images/projects/ut-marketplace/ut-marketplace_6.png",
      "/images/projects/ut-marketplace/ut-marketplace_7.png"
    ],
    features: [
      "Marketplace avancée (listes, détails, offres)",
      "Sections Collections, Transactions et Statistiques",
      "Intégration portefeuille Ultra (connexion, signature)",
      "Traitement des transactions on-chain",
      "Système multilingue"
    ],
    challenges: [
      "Intégration wallet Ultra et fiabilité des transactions",
      "Modélisation des collections et activités",
      "Suivi des métriques de vente"
    ],
    solutions: [
      "Utilisation du SDK/extension Ultra Wallet et gestion des états d'erreur",
      "Schéma de données clair et composants réutilisables",
      "Pipelines d'agrégation et vues statistiques"
    ],
    duration: "2 mois",
    teamSize: 1,
    role: "Full Stack Web3 Developer"
  },
  {
    id: 11,
    title: "Demande RH V2",
    description: "Nouvelle application RH pour automatiser et moderniser les processus d'onboarding.",
    longDescription: "Refonte complète de l'application RH pour simplifier et automatiser les tâches liées à l'arrivée d'un collaborateur (quel que soit son statut). Gains significatifs en productivité et efficacité pour l'équipe RH.",
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["React", "NestJS", "Git", "GitLab", "Agile"],
    date: "Nov 2024 - Août 2025",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: null,
    category: "Business",
    relatedExperienceId: 1,
    features: [
      "Automatisation des e-mails d'équipement",
      "Création automatique de tickets GLPI",
      "Demandes d'autorisations d'accès",
      "Gestion auto des contrôles médicaux et sécurité",
      "Suivi amélioré des contrats (période d'essai, etc.)",
      "Suivi des demandes RH des employés",
      "RBAC et sécurité",
      "Stack modernisée pour la performance"
    ],
    challenges: [
      "Orchestration des workflows RH",
      "Intégration GLPI fiable",
      "Modèle d'autorisations robuste"
    ],
    solutions: [
      "Pipelines d'automatisation orchestrés",
      "Connecteurs GLPI et validations",
      "RBAC granulaire côté API et UI"
    ],
    duration: "10 mois",
    role: "Full Stack Developer"
  },
  {
    id: 12,
    title: "GPCM V2",
    description: "Migration vers NestJS pour accélérer et moderniser l'appli GPCM.",
    longDescription: "Migration backend de PHP (CodeIgniter) vers Node (NestJS) pour booster la rapidité et la réactivité. Nouvelles fonctionnalités, design amélioré et nouvelle architecture de données adaptée aux besoins métiers (maintenance des PCs et tickets). Accès via QR code.",
    image: "https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["Node.js", "NestJS", "React", "GLPI"],
    date: "Fév 2025 - Avr 2025",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: null,
    category: "Business",
    relatedExperienceId: 1,
    features: [
      "Backend NestJS performant",
      "Nouvelles fonctionnalités métiers",
      "Architecture données repensée",
      "QR code pour accès rapide"
    ],
    challenges: [
      "Migration de stack progressive",
      "Interop GLPI et données existantes",
      "Performance sous charge"
    ],
    solutions: [
      "Stratégie de migration par domaines",
      "Adapters GLPI",
      "Optimisations SQL et caching"
    ],
    duration: "3 mois",
    role: "Full Stack Developer"
  },
  {
    id: 13,
    title: "Ultra Meetup",
    description: "Site listant les évènements de la communauté Ultra / Ultra Times.",
    longDescription: "Site vitrine pour référencer les meetups et évènements de la communauté Ultra et Ultra Times.",
    image: "/images/projects/ultra-meetup/ultra-meetup_1.png",
    technologies: ["React", "JavaScript"],
    date: "Fév 2025",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: "https://ultra-meetup.vercel.app/",
    category: "Frontend",
    relatedExperienceId: 8,
    features: ["Liste d'évènements", "Pages dédiées", "Design responsive"],
    challenges: ["Mise à jour simple du contenu"],
    solutions: ["Structure de contenu flexible"],
    duration: "1 mois",
    role: "Frontend Developer"
  },
  {
    id: 14,
    title: "Tracking Table Tennis Matches App",
    description: "Application mobile de suivi des scores de ping-pong avec annonces vocales.",
    longDescription: "Application mobile de suivi des scores pour matchs de ping-pong, avec système de suivi et annonces vocales. Projet réalisé pour un Secret Santa et pour améliorer la gestion des scores.",
    image: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["Android", "JavaScript", "Git", "GitHub"],
    date: "Déc 2024 - Jan 2025",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: null,
    category: "Mobile",
    features: ["Suivi des scores", "Annonces vocales", "Interface simple"],
    challenges: ["Synthèse vocale multi-plateforme"],
    solutions: ["Abstraction TTS"],
    duration: "2 mois",
    role: "Mobile Developer"
  },
  {
    id: 15,
    title: "La bataille des expressions",
    description: "Jeu web fun pour mesurer son affinité avec des expressions FR/CA.",
    longDescription: "Jeu web en 10 manches avec animations Framer Motion, design responsive et résultats partageables. Créé comme cadeau Secret Santa.",
    image: "https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["TypeScript", "React", "Tailwind", "Vercel"],
    date: "Déc 2024",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: null,
    category: "Frontend",
    features: ["Animations Framer Motion", "Résultats partageables", "Responsive"],
    challenges: ["Transitions fluides"],
    solutions: ["Animations optimisées"],
    duration: "1 mois",
    role: "Frontend Developer"
  },
  {
    id: 16,
    title: "Ultra Dashboard",
    description: "Dashboard autour de la blockchain Ultra et du token $UOS.",
    longDescription: "Suivi du prix, indicateurs techniques, infos clés et articles liés au projet. Intégration d'APIs CEX et du site Ultra Times.",
    image: "/images/projects/ultra-dashboard/ultra-dashboard_1.jpeg",
    technologies: ["JavaScript", "React"],
    date: "Oct 2024 - Déc 2024",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: null,
    category: "Analytics",
    relatedExperienceId: 8,
    screenshots: [
      "/images/projects/ultra-dashboard/ultra-dashboard_1.jpeg"
    ],
    features: ["Cours en direct", "Indicateurs techniques", "Articles liés"],
    challenges: ["Fiabilité des données"],
    solutions: ["Fallbacks et retries"],
    duration: "3 mois",
    role: "Frontend Developer"
  },
  {
    id: 17,
    title: "GPCM - Maintenance application",
    description: "Gestion des PCs de maintenance avec synchro GLPI et suivi des tickets.",
    longDescription: "Projet principal en Bachelor au CESI. Gestion à distance des ordinateurs (mises à jour ghosts/logiciels, dépannage), synchro bidirectionnelle GLPI, amélioration du suivi des tickets.",
    image: "https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["TypeScript", "React", "CodeIgniter", "MySQL", "Git"],
    date: "Mai 2024 - Nov 2024",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: null,
    category: "Business",
    relatedExperienceId: 2,
    features: ["UI simple pour agents", "Synchro GLPI", "Mises à jour à distance", "Suivi amélioré des tickets"],
    challenges: ["Synchro fiable", "Expérience utilisateur terrain"],
    solutions: ["Stratégies de reprise", "Design orienté usage"],
    duration: "6 mois",
    role: "Full Stack Developer"
  },
  {
    id: 18,
    title: "Ultra Wallet Tracker",
    description: "Suivi du nombre de wallets créés sur la blockchain Ultra.",
    longDescription: "Application simple pour suivre en direct la création de wallets sur Ultra.",
    image: "/images/projects/ultra-wallet-tracker/ultra-wallet-tracker_1.jpeg",
    technologies: ["TypeScript", "React", "Tailwind"],
    date: "Nov 2024",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: null,
    category: "Frontend",
    relatedExperienceId: 8,
    screenshots: [
      "/images/projects/ultra-wallet-tracker/ultra-wallet-tracker_1.jpeg"
    ],
    features: ["Stats en direct", "UI minimaliste"],
    challenges: ["Taux de rafraîchissement"],
    solutions: ["Polling contrôlé"],
    duration: "1 mois",
    role: "Frontend Developer"
  },
  {
    id: 19,
    title: "FED - Business application",
    description: "Suivi digital des fiches d'émergence (accessibilité, optimisation, maintenance).",
    longDescription: "Outil de suivi des fiches d'émergence digitalisées, avec module d'accessibilité, optimisations et maintenance.",
    image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["TypeScript", "React", "CodeIgniter", "MySQL"],
    date: "Fév 2024 - Mai 2024",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: null,
    category: "Business",
    relatedExperienceId: 2,
    features: ["Accessibilité", "Optimisations", "Maintenance"],
    challenges: ["Compatibilité large"],
    solutions: ["Tests et audits"],
    duration: "3 mois",
    role: "Frontend Developer"
  },
  {
    id: 20,
    title: "Outils Flux - Business application",
    description: "Application QR code pour enlèvement de bennes et e-mails automatisés.",
    longDescription: "Application pour les agents responsables de l'enlèvement des bennes avec QR code et e-mails automatiques.",
    image: "https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["React", "PHP", "CSS3", "JavaScript", "Git"],
    date: "Déc 2023 - Fév 2024",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: null,
    category: "Business",
    relatedExperienceId: 2,
    features: ["Scan QR code", "E-mails auto", "Optimisations"],
    challenges: ["Simplicité d'usage terrain"],
    solutions: ["UX concise"],
    duration: "3 mois",
    role: "Frontend Developer"
  },
  {
    id: 21,
    title: "Gacha game",
    description: "Jeu gacha (chats) avec combats et récompenses, réalisé en groupe au CESI.",
    longDescription: "Création d'un jeu gacha de chats avec DALL·E pour les images, système de combat et récompenses. Travail d'une semaine.",
    image: "/images/projects/gacha-game/gacha-game_1.jpeg",
    technologies: ["TypeScript", "Vue.js", "Supabase", "CSS3", "Git"],
    date: "Jan 2024",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: null,
    category: "Game",
    relatedFormationIds: [2],
    screenshots: [
      "/images/projects/gacha-game/gacha-game_1.jpeg",
      "/images/projects/gacha-game/gacha-game_2.jpeg",
      "/images/projects/gacha-game/gacha-game_3.jpeg"
    ],
    features: ["Système de combat", "Récompenses", "Assets IA"],
    challenges: ["Boucle de jeu fun"],
    solutions: ["Playtests rapides"],
    duration: "1 semaine",
    role: "Frontend Developer"
  },
  {
    id: 22,
    title: "Permis Feu - Business application",
    description: "Demandes de permis feu pour agents, sécurité améliorée.",
    longDescription: "Application de demandes de permis feu avec optimisations, maintenance et V2.",
    image: "https://images.pexels.com/photos/3609389/pexels-photo-3609389.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["PHP", "CSS3", "JavaScript", "Git"],
    date: "Nov 2023 - Jan 2024",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: null,
    category: "Business",
    relatedExperienceId: 2,
    features: ["Demandes en ligne", "Optimisations", "V2 après retours"],
    challenges: ["Simplicité et sécurité"],
    solutions: ["Durcissement et UX"],
    duration: "3 mois",
    role: "Frontend Developer"
  },
  {
    id: 23,
    title: "Demandes RH - Business application",
    description: "Gestion des demandes RH et e-mails automatiques.",
    longDescription: "Appli RH pour gérer diverses demandes avec envoi d'e-mails automatiques.",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["PHP", "CSS3", "JavaScript", "Git"],
    date: "Nov 2023 - Déc 2023",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: null,
    category: "Business",
    relatedExperienceId: 2,
    features: ["Demandes multi-cas", "E-mails auto"],
    challenges: ["Flux RH clairs"],
    solutions: ["Interfaces simples"],
    duration: "2 mois",
    role: "Frontend Developer"
  },
  {
    id: 24,
    title: "Secret Santa",
    description: "Application d'appariement Secret Santa avec blacklist et e-mails auto.",
    longDescription: "Projet Python/Flask avec HTML5, SCSS et JavaScript. Gestion blacklist et e-mails automatiques.",
    image: "/images/projects/secret-santa/secret-santa_1.png",
    technologies: ["Flask", "Python", "CSS3", "JavaScript", "SASS", "HTML"],
    date: "Nov 2023 - Déc 2023",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: "https://secret-santa-thibaut-milville.vercel.app/",
    category: "Backend",
    screenshots: [
      "/images/projects/secret-santa/secret-santa_1.png"
    ],
    features: ["Blacklist", "E-mails auto"],
    challenges: ["Règles d'appariement"],
    solutions: ["Algorithme de tirage"],
    duration: "1 mois",
    role: "Backend Developer"
  },
  {
    id: 25,
    title: "Denrées - Business application",
    description: "Gestion des commandes et stocks de l'entrepôt interne.",
    longDescription: "App interne pour commandes et stocks, avec pagination, tri et maintenance.",
    image: "https://images.pexels.com/photos/4484076/pexels-photo-4484076.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["PHP", "CSS3", "Bootstrap", "JavaScript", "Git"],
    date: "Oct 2023 - Nov 2023",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: null,
    category: "Business",
    relatedExperienceId: 2,
    features: ["Pagination/tri", "Maintenance"],
    challenges: ["Performance avec listes"],
    solutions: ["Optimisations requêtes"],
    duration: "2 mois",
    role: "Frontend Developer"
  },
  {
    id: 26,
    title: "Commercial website OZC Signalétique",
    description: "Site marchand de signalétique pour particuliers et pros.",
    longDescription: "Site e-commerce pour la vente de signalétique sur toute la France.",
    image: "/images/projects/ozc-signaletique/ozc-signaletique_1.jpeg",
    technologies: ["WordPress", "PHP", "JavaScript", "CSS3"],
    date: "Déc 2021 - Aoû 2023",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: "https://www.ozc-signaletique.fr/",
    category: "E-commerce",
    relatedExperienceId: 4,
    screenshots: [
      "/images/projects/ozc-signaletique/ozc-signaletique_1.jpeg"
    ],
    features: ["Catalogue produits", "Paiement en ligne"],
    challenges: ["Référencement"],
    solutions: ["SEO on-site"],
    duration: "20 mois",
    role: "Webmaster"
  },
  {
    id: 27,
    title: "Commercial website Sticker Français",
    description: "Site e-commerce pour tableaux décoratifs.",
    longDescription: "Site pour vente de tableaux décoratifs (B2C).",
    image: "/images/projects/sticker-francais/sticker-francais_1.png",
    technologies: ["WordPress", "PHP", "JavaScript", "CSS3"],
    date: "Mai 2023 - Aoû 2023",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: "https://www.stickerfrancais.fr/",
    category: "E-commerce",
    relatedExperienceId: 4,
    features: ["Fiches produits", "Paiement"],
    challenges: ["Catalogue images"],
    solutions: ["Optimisation médias"],
    duration: "3 mois",
    role: "Webmaster"
  },
  {
    id: 28,
    title: "Institutional website OZC",
    description: "Site institutionnel mettant en avant services et activités.",
    longDescription: "Site vitrine de l'entreprise avec orientation conversion contact.",
    image: "/images/projects/ozc/ozc_1.jpeg",
    technologies: ["WordPress", "PHP", "JavaScript", "CSS3"],
    date: "Fév 2023 - Mar 2023",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: "https://www.ozc.fr/",
    screenshots: [
      "/images/projects/ozc/ozc_1.jpeg"
    ],
    category: "Corporate",
    relatedExperienceId: 4,
    features: ["Pages services", "Formulaire de contact"],
    challenges: ["Clarté des contenus"],
    solutions: ["Arborescence UX"],
    duration: "2 mois",
    role: "Webmaster"
  },
  {
    id: 29,
    title: "Showcase website OZC Agencement",
    description: "Site vitrine pour l'activité d'agencement et construction.",
    longDescription: "Présentation des services d'agencement et réalisations.",
    image: "/images/projects/ozc-agencement/ozc-agencement_1.jpeg",
    technologies: ["WordPress", "PHP", "JavaScript", "CSS3"],
    date: "Oct 2022 - Nov 2022",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: "https://www.ozc-agencement.fr/",
    category: "Showcase",
    relatedExperienceId: 4,
    screenshots: [
      "/images/projects/ozc-agencement/ozc-agencement_1.jpeg"
    ],
    features: ["Portfolio", "Contact"],
    challenges: ["Mise en valeur images"],
    solutions: ["Optimisation responsive"],
    duration: "2 mois",
    role: "Webmaster"
  },
  {
    id: 30,
    title: "Showcase website Manage Transport",
    description: "Site vitrine présentant les services d'un transporteur. Refonte complète Next.js en 2025.",
    longDescription: "Site simple pour présenter services et prises de contact. Deuxième période de travail en 2025 : refonte complète avec ma stack Next.js (App Router, TypeScript, Tailwind), optimisations performance/SEO, accessibilité et UX (mai-juin 2025).",
    image: "/images/projects/managetransport/managetransport_1.png",
    technologies: ["WordPress", "PHP", "JavaScript", "CSS3", "Next.js", "React", "TypeScript", "Tailwind CSS"],
    date: "Sep 2021 - Oct 2021 ; Mai 2025 - Juin 2025",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: "https://managetransport.fr",
    category: "Showcase",
    screenshots: [
      "/images/projects/managetransport/managetransport_1.png",
      "/images/projects/managetransport/managetransport_2.png",
      "/images/projects/managetransport/managetransport_3.png",
      "/images/projects/managetransport/managetransport_4.png",
      "/images/projects/managetransport/managetransport_5.png"
    ],
    features: ["Présentation", "Contact", "Refonte Next.js", "Performance/SEO", "Accessibilité", "Formulaire de contact"],
    challenges: ["Budget restreint", "Migration de contenu", "SEO conservé"],
    solutions: ["Thème optimisé", "Redirections propres", "Optimisation Lighthouse"],
    duration: "1 mois + 2 mois",
    role: "Développeur web",
    periods: [
      { date: "Sep 2021 - Oct 2021", title: "Version initiale", description: "Création du site vitrine sous WordPress (présentation, contact)." },
      { date: "Mai 2025 - Juin 2025", title: "Refonte Next.js", description: "Migration Next.js + optimisations performance/SEO et accessibilité." }
    ]
  },
  {
    id: 31,
    title: "UT Quest",
    description: "MVP Web3 de quêtes pour dynamiser l'écosystème Ultra (engagement social et in‑game).",
    longDescription: "UT Quest est un projet de quêtes Web3 visant à dynamiser l'écosystème Ultra et sa blockchain en engageant les joueurs via des activités sociales, in‑game et plus encore. La version développée ici est un MVP fonctionnel, connecté à la blockchain pour différentes actions, notamment la connexion au portefeuille Ultra via l'extension Ultra Wallet et la création de quêtes pour différents jeux. Toute personne autorisée peut gérer ses jeux et ses propres quêtes depuis un tableau de bord admin. Projet réalisé dans le cadre d'une levée de fonds.",
    image: "/images/projects/ut-quest/ut-quest_1.png",
    technologies: ["TypeScript", "React", "Next.js", "Web3", "Blockchain", "Agile"],
    date: "Mai 2025 - Juin 2025",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: "https://ultra-quest.vercel.app/fr/",
    category: "Web3",
    relatedExperienceId: 8,
    screenshots: [
      "/images/projects/ut-quest/ut-quest_1.png",
      "/images/projects/ut-quest/ut-quest_2.png",
      "/images/projects/ut-quest/ut-quest_3.png",
      "/images/projects/ut-quest/ut-quest_4.png",
      "/images/projects/ut-quest/ut-quest_5.png",
      "/images/projects/ut-quest/ut-quest_6.png"
    ],
    features: [
      "Connexion Ultra Wallet",
      "Création et gestion de quêtes",
      "Dashboard admin par jeu",
      "Intégration blockchain Ultra"
    ],
    challenges: [
      "Intégration wallet Ultra",
      "Gestion des autorisations",
      "Conception du modèle de quêtes"
    ],
    solutions: [
      "Intégration SDK Ultra / extension",
      "RBAC côté API et UI",
      "Schéma de données modulaire"
    ],
    duration: "2 mois",
    role: "Full Stack Web3 Developer"
  }
  ,
  {
    id: 32,
    title: "OZC Web",
    description: "Site vitrine pour les services web/digitaux de l'agence Osmoz Communication.",
    longDescription: "Site vitrine présentant l'offre web et digitale de l'agence de communication Osmoz Communication. Accent mis sur la clarté de l'offre, la mise en valeur des services et un parcours de contact simple. Projet associé à DigitalLabs TM.",
    image: "/images/projects/ozc-web/ozc-web_1.png",
    technologies: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Agile"],
    date: "Juil 2025 - Juil 2025",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: "https://ozc-web.fr/",
    category: "Showcase",
    relatedExperienceId: 3,
    features: [
      "Présentation des services web/digitaux",
      "Portfolio / mises en avant",
      "Formulaire de contact",
      "Design responsive et performant"
    ],
    challenges: [
      "Positionnement clair de l'offre",
      "SEO de base et performances",
      "Mise en valeur des services"
    ],
    solutions: [
      "Arborescence et contenus structurés",
      "Optimisations performance/SEO (Next.js, images, métas)",
      "UI sobre et efficace alignée sur l'identité"
    ],
    duration: "1 mois",
    teamSize: 1,
    screenshots: [
      "/images/projects/ozc-web/ozc-web_1.png"
    ],
    role: "Frontend Developer"
  }
  ,
  {
    id: 33,
    title: "UT Launchpad",
    description: "Plateforme de lancement UNIQ (NFT) pour dynamiser la blockchain Ultra.",
    longDescription: "UT Launchpad a été créé pour générer de l'activité sur la blockchain Ultra via le lancement de collections d'UNIQs (NFTs). La plateforme vise à devenir le premier launchpad de l'écosystème Ultra et introduit le concept Phygital : un UNIQ peut être brûlé en échange de son équivalent physique imprimé sur dibond. Cet MVP a été développé dans le cadre de la levée de fonds d'Ultra Times.",
    image: "/images/projects/ut-launchpad/ut-launchpad_1.png",
    technologies: ["React", "NestJS", "TypeScript", "Web3", "Blockchain", "Agile"],
    date: "Avr 2025 - Juin 2025",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: "https://launchpad-2ycml.ondigitalocean.app/",
    category: "Web3",
    relatedExperienceId: 8,
    screenshots: [
      "/images/projects/ut-launchpad/ut-launchpad_1.png",
      "/images/projects/ut-launchpad/ut-launchpad_2.png",
      "/images/projects/ut-launchpad/ut-launchpad_3.png",
      "/images/projects/ut-launchpad/ut-launchpad_4.png",
      "/images/projects/ut-launchpad/ut-launchpad_5.png",
      "/images/projects/ut-launchpad/ut-launchpad_6.png"
    ],
    features: [
      "Lancement de collections UNIQ (NFT)",
      "Connexion et participation via Ultra Wallet",
      "Concept Phygital (burn → œuvre physique)",
      "Phases/rounds de campagne",
      "Dashboard admin et indicateurs"
    ],
    challenges: [
      "Intégration blockchain Ultra et fiabilité des transactions",
      "Modélisation des campagnes et rôles",
      "Sécurité et contrôles côté API"
    ],
    solutions: [
      "SDK/extension Ultra Wallet avec gestion des états d'erreur",
      "Schéma de données modulaire et validations",
      "RBAC et garde-fous API"
    ],
    duration: "3 mois",
    teamSize: 3,
    role: "Full Stack Web3 Developer"
  }
  ,
  {
    id: 34,
    title: "UT Snapshot",
    description: "Outil de snapshot pour identifier les détenteurs d'UNIQs sur la blockchain Ultra.",
    longDescription: "UT Snapshot permet de prendre des instantanés du réseau Ultra afin d'identifier les détenteurs d'UNIQs spécifiques. L'outil offre une vue claire et à jour de la distribution des actifs, facilitant l'analyse des schémas de possession et le suivi de l'engagement dans l'écosystème Ultra. MVP développé dans le cadre de la levée de fonds d'Ultra Times.",
    image: "/images/projects/ut-snapshot/ut-snapshot_1.png",
    technologies: ["TypeScript", "React", "Web3", "Blockchain", "Agile"],
    date: "Mai 2025 - Juin 2025",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: "https://ut-snapshot.vercel.app/",
    category: "Web3",
    relatedExperienceId: 8,
    relatedFormationIds: [3],
    screenshots: [
      "/images/projects/ut-snapshot/ut-snapshot_1.png",
      "/images/projects/ut-snapshot/ut-snapshot_2.png",
      "/images/projects/ut-snapshot/ut-snapshot_3.png",
      "/images/projects/ut-snapshot/ut-snapshot_4.png",
      "/images/projects/ut-snapshot/ut-snapshot_5.png",
      "/images/projects/ut-snapshot/ut-snapshot_6.png"
    ],
    features: [
      "Snapshots de la blockchain Ultra",
      "Identification des détenteurs d'UNIQs",
      "Vue de distribution des actifs",
      "Filtres et recherche par collection/UNIQ"
    ],
    challenges: [
      "Fiabilité et cohérence des données on-chain",
      "Pagination et limites d'API",
      "Performance sur grands volumes"
    ],
    solutions: [
      "Requêtes batchées et retries",
      "Mise en cache et stratégie d'agrégation",
      "Composants UI performants et réutilisables"
    ],
    duration: "2 mois",
    teamSize: 2,
    role: "Full Stack Web3 Developer"
  }
  ,
  {
    id: 35,
    title: "WeNeedU",
    description: "Plateforme freelance Web3 pour missions/services dans l'écosystème Ultra.",
    longDescription: "WeNeedU est une plateforme freelance Web3, inspirée du modèle Fiverr, dédiée aux missions et services au sein de l'écosystème de la blockchain Ultra. Elle met en relation les talents avec des opportunités liées à la plateforme Ultra, aux entités affiliées, aux jeux et aux projets, permettant aux créateurs, développeurs et professionnels de proposer leurs compétences contre des paiements en crypto. Conçu pour favoriser la collaboration et accélérer le développement des projets, WeNeedU vise à devenir la marketplace de référence pour l'expertise à la demande dans l'écosystème Ultra. MVP développé dans le cadre de la levée de fonds d'Ultra Times.",
    image: "/images/projects/weneedu/weneedu_1.png",
    technologies: ["TypeScript", "React", "Web3", "Blockchain", "Agile"],
    date: "Mai 2025 - Juin 2025",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: "https://we-need-u.vercel.app/",
    category: "Web3",
    relatedExperienceId: 8,
    relatedFormationIds: [3],
    screenshots: [
      "/images/projects/weneedu/weneedu_1.png",
      "/images/projects/weneedu/weneedu_2.png",
      "/images/projects/weneedu/weneedu_3.png",
      "/images/projects/weneedu/weneedu_4.png",
      "/images/projects/weneedu/weneedu_5.png"
    ],
    features: [
      "Market de missions/services (offres, profils, évaluations)",
      "Paiements crypto et intégration Ultra",
      "Matching talents ↔ opportunités",
      "Tableau de bord freelances et clients"
    ],
    challenges: [
      "Sécurité des transactions et gestion des états",
      "Modélisation des offres, profils et flux de commande",
      "Expérience utilisateur fluide sur des parcours complexes"
    ],
    solutions: [
      "Gestion robuste des statuts et erreurs côté Web3",
      "Schéma de données structuré et composants réutilisables",
      "Parcours guidés et validations côté UI"
    ],
    duration: "2 mois",
    teamSize: 3,
    role: "Full Stack Web3 Developer"
  }
];

export function getProjectById(id: number): Project | undefined {
  return projects.find(project => project.id === id);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(project => (project.slug ?? slugify(project.title)) === slug);
}

export function getProjectSlug(project: Project): string {
  return project.slug ?? slugify(project.title);
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