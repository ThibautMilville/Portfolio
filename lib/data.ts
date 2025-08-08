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
    id: 10,
    title: "UT Marketplace",
    description: "Marketplace web3 dédiée à l'écosystème Ultra (blockchain L1 gaming).",
    longDescription: "Une marketplace web3 innovante pour l'écosystème Ultra permettant l'achat, la vente et l'échange d'actifs numériques liés aux jeux, avec une intégration native Ultra et des fonctionnalités avancées.",
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
      "Système de trading sécurisé"
    ],
    challenges: [
      "Sécurité des transactions Web3",
      "Performance blockchain",
      "UX Web3 intuitive"
    ],
    solutions: [
      "Smart contracts audités",
      "Optimisation des requêtes",
      "Design system cohérent"
    ],
    duration: "6 mois",
    teamSize: 3,
    role: "Full Stack Web3 Developer"
  },
  {
    id: 11,
    title: "Demande RH V2",
    description: "Nouvelle application RH pour automatiser et moderniser les processus d'onboarding.",
    longDescription: "Refonte complète de l'application RH pour simplifier et automatiser les tâches liées à l'arrivée d'un collaborateur (quel que soit son statut). Gains significatifs en productivité et efficacité pour l'équipe RH.",
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["React", "NestJS", "Git", "GitLab", "Agile"],
    date: "Nov 2024 - Présent",
    status: "En cours",
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
    duration: "En cours",
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
    image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["React", "JavaScript"],
    date: "Fév 2025",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: null,
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
    description: "Application de suivi des scores de ping-pong avec annonces vocales.",
    longDescription: "Application de suivi des scores pour matchs de ping-pong, avec système de suivi et annonces vocales. Projet réalisé pour un Secret Santa et pour améliorer la gestion des scores.",
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
    image: "https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["JavaScript", "React"],
    date: "Oct 2024 - Déc 2024",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: null,
    category: "Analytics",
    relatedExperienceId: 8,
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
    image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["TypeScript", "React", "Tailwind"],
    date: "Nov 2024",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: null,
    category: "Frontend",
    relatedExperienceId: 8,
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
    image: "https://images.pexels.com/photos/1009923/pexels-photo-1009923.jpeg?auto=compress&cs=tinysrgb&w=800",
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
    image: "https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["TypeScript", "Vue.js", "Supabase", "CSS3", "Git"],
    date: "Jan 2024",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: null,
    category: "Game",
    relatedFormationIds: [2],
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
    image: "https://images.pexels.com/photos/209692/pexels-photo-209692.jpeg?auto=compress&cs=tinysrgb&w=800",
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
    image: "https://images.pexels.com/photos/2253093/pexels-photo-2253093.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["Flask", "Python", "CSS3", "JavaScript", "SASS", "HTML"],
    date: "Nov 2023 - Déc 2023",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: null,
    category: "Backend",
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
    image: "https://images.pexels.com/photos/977246/pexels-photo-977246.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["WordPress", "PHP", "JavaScript", "CSS3"],
    date: "Déc 2021 - Aoû 2023",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: null,
    category: "E-commerce",
    relatedExperienceId: 4,
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
    image: "https://images.pexels.com/photos/1248583/pexels-photo-1248583.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["WordPress", "PHP", "JavaScript", "CSS3"],
    date: "Mai 2023 - Aoû 2023",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: null,
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
    image: "https://images.pexels.com/photos/3184300/pexels-photo-3184300.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["WordPress", "PHP", "JavaScript", "CSS3"],
    date: "Fév 2023 - Mar 2023",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: null,
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
    image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["WordPress", "PHP", "JavaScript", "CSS3"],
    date: "Oct 2022 - Nov 2022",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: null,
    category: "Showcase",
    relatedExperienceId: 4,
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
    image: "https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["WordPress", "PHP", "JavaScript", "CSS3", "Next.js", "React", "TypeScript", "Tailwind CSS"],
    date: "Sep 2021 - Oct 2021 ; Mai 2025 - Juin 2025",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: "https://managetransport.fr",
    category: "Showcase",
    features: ["Présentation", "Contact", "Refonte Next.js", "Performance/SEO", "Accessibilité", "Formulaire de contact"],
    challenges: ["Budget restreint", "Migration de contenu", "SEO conservé"],
    solutions: ["Thème optimisé", "Redirections propres", "Optimisation Lighthouse"],
    duration: "1 mois + 2 mois",
    role: "Webmaster puis Frontend Developer",
    periods: [
      { date: "Sep 2021 - Oct 2021", title: "Version initiale", description: "Création du site vitrine (présentation, contact)." },
      { date: "Mai 2025 - Juin 2025", title: "Refonte Next.js", description: "Migration Next.js + optimisations performance/SEO et accessibilité." }
    ]
  },
  {
    id: 31,
    title: "UT Quest",
    description: "MVP Web3 de quêtes pour dynamiser l'écosystème Ultra (engagement social et in‑game).",
    longDescription: "UT Quest est un projet de quêtes Web3 visant à dynamiser l'écosystème Ultra et sa blockchain en engageant les joueurs via des activités sociales, in‑game et plus encore. La version développée ici est un MVP fonctionnel, connecté à la blockchain pour différentes actions, notamment la connexion au portefeuille Ultra via l'extension Ultra Wallet et la création de quêtes pour différents jeux. Toute personne autorisée peut gérer ses jeux et ses propres quêtes depuis un tableau de bord admin. Projet réalisé dans le cadre d'une levée de fonds.",
    image: "https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["TypeScript", "React", "Next.js", "Web3", "Blockchain", "Agile"],
    date: "Mai 2025 - Juin 2025",
    status: "Terminé",
    github: "https://github.com/ThibautMilville",
    demo: null,
    category: "Web3",
    relatedExperienceId: 8,
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