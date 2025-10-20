"use client";

import { motion } from "framer-motion";
import { Code2, Star, Palette, Server, Database, Wrench } from "lucide-react";
import LightParticles from "@/components/ui/light-particles";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Tooltip } from '@/components/ui/tooltip';

const skills = [
  // Front and frameworks
  {
    name: "HTML5",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    category: "Front and frameworks",
    description: "Langage de balisage standard pour créer la structure des pages web. HTML5 introduit de nouvelles fonctionnalités sémantiques et des API modernes pour une meilleure expérience utilisateur.",
    level: "Expert",
    experience: "6+ ans"
  },
  {
    name: "CSS3",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    category: "Front and frameworks",
    description: "Langage de style pour la présentation des pages web. CSS3 apporte des fonctionnalités avancées comme les animations, les transitions, les flexbox et grid pour des designs modernes et responsives.",
    level: "Expert",
    experience: "6+ ans"
  },
  {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    category: "Front and frameworks",
    description: "Langage de programmation dynamique pour le web. JavaScript permet d'ajouter de l'interactivité, de manipuler le DOM et de créer des applications web complexes côté client et serveur.",
    level: "Expert",
    experience: "6+ ans"
  },
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    category: "Front and frameworks",
    description: "Bibliothèque JavaScript pour construire des interfaces utilisateur. React utilise un système de composants réutilisables et un DOM virtuel pour des applications performantes et maintenables.",
    level: "Expert",
    experience: "4+ ans"
  },
  {
    name: "Next.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    category: "Front and frameworks",
    description: "Framework React full-stack avec rendu côté serveur, génération statique et API routes. Next.js optimise les performances et le SEO pour des applications web modernes.",
    level: "Expert",
    experience: "3+ ans"
  },
  {
    name: "Vue.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
    category: "Front and frameworks",
    description: "Framework JavaScript progressif pour construire des interfaces utilisateur. Vue.js combine la simplicité d'utilisation avec des fonctionnalités puissantes et une excellente performance.",
    level: "Intermédiaire",
    experience: "2+ ans"
  },
  {
    name: "Sass",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
    category: "Front and frameworks",
    description: "Préprocesseur CSS qui étend les fonctionnalités du CSS avec des variables, des mixins, des fonctions et une syntaxe plus claire pour un développement plus efficace.",
    level: "Avancé",
    experience: "4+ ans"
  },
  {
    name: "Tailwind CSS",
    logo: "https://imgs.search.brave.com/2ZjYUPwN5hgwhGa5hktSrh6HHwn-c0kzJ0QHreWmwWs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yYXcu/Z2l0aHVidXNlcmNv/bnRlbnQuY29tL2dp/bGJhcmJhcmEvbG9n/b3MvbWFpbi9sb2dv/cy90YWlsd2luZGNz/cy1pY29uLnN2Zw",
    category: "Front and frameworks",
    description: "Framework CSS utilitaire qui permet de construire des designs rapidement en utilisant des classes prédéfinies. Idéal pour le prototypage rapide et les designs cohérents.",
    level: "Expert",
    experience: "3+ ans"
  },
  {
    name: "Bootstrap",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    category: "Front and frameworks",
    description: "Framework CSS populaire qui fournit des composants pré-construits et un système de grille responsive pour accélérer le développement d'interfaces utilisateur.",
    level: "Avancé",
    experience: "5+ ans"
  },
  // Back and frameworks
  {
    name: "Node.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    category: "Back and frameworks",
    description: "Runtime JavaScript côté serveur basé sur le moteur V8 de Chrome. Node.js permet de développer des applications backend performantes avec JavaScript et un écosystème de packages NPM.",
    level: "Expert",
    experience: "4+ ans"
  },
  {
    name: "NestJS",
    logo: "https://imgs.search.brave.com/MqDoXUvr7My9WOzLwntiaYwL363MOd0_77TMBcutPwA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pY29u/bG9nb3ZlY3Rvci5j/b20vdXBsb2Fkcy9p/bWFnZXMvMjAyNS8w/MS9sZy02Nzc4NmYy/ZTA3M2ZiLU5lc3RK/Uy53ZWJw",
    category: "Back and frameworks",
    description: "Framework Node.js progressif pour construire des applications serveur efficaces et évolutives. NestJS utilise TypeScript et suit les principes de l'architecture modulaire.",
    level: "Expert",
    experience: "3+ ans"
  },
  {
    name: "Java",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    category: "Back and frameworks",
    description: "Langage de programmation orienté objet, portable et robuste. Java est largement utilisé pour le développement d'applications d'entreprise, d'APIs et de systèmes distribués.",
    level: "Avancé",
    experience: "3+ ans"
  },
  {
    name: "Spring Boot",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
    category: "Back and frameworks",
    description: "Framework Java qui simplifie le développement d'applications Spring avec l'auto-configuration et les starters. Idéal pour créer des microservices et des APIs REST.",
    level: "Avancé",
    experience: "2+ ans"
  },
  {
    name: "Python",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    category: "Back and frameworks",
    description: "Langage de programmation polyvalent, simple et puissant. Python est excellent pour le développement web, l'analyse de données, l'automatisation et l'intelligence artificielle.",
    level: "Intermédiaire",
    experience: "2+ ans"
  },
  {
    name: "Flask",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
    category: "Back and frameworks",
    description: "Framework web Python léger et flexible. Flask suit le principe 'micro' et permet de construire rapidement des applications web simples à complexes.",
    level: "Intermédiaire",
    experience: "1+ an"
  },
  {
    name: "PHP",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    category: "Back and frameworks",
    description: "Langage de script côté serveur populaire pour le développement web. PHP est particulièrement adapté pour créer des sites web dynamiques et des applications web.",
    level: "Avancé",
    experience: "4+ ans"
  },
  {
    name: "CodeIgniter",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/codeigniter/codeigniter-plain.svg",
    category: "Back and frameworks",
    description: "Framework PHP léger et simple pour développer des applications web rapidement. CodeIgniter suit le pattern MVC et offre une courbe d'apprentissage douce.",
    level: "Avancé",
    experience: "3+ ans"
  },
  // Infrastructure and deployment
  {
    name: "Docker",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    category: "Infrastructure and deployment",
    description: "Plateforme de conteneurisation qui permet de packager des applications avec leurs dépendances. Docker simplifie le déploiement et assure la cohérence entre les environnements de développement et de production.",
    level: "Avancé",
    experience: "2+ ans"
  },
  {
    name: "GitLab",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg",
    category: "Infrastructure and deployment",
    description: "Plateforme DevOps complète qui fournit un dépôt Git, CI/CD, et des outils de gestion de projet. GitLab permet de gérer l'ensemble du cycle de vie du développement logiciel.",
    level: "Avancé",
    experience: "3+ ans"
  },
  {
    name: "Git",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    category: "Infrastructure and deployment",
    description: "Système de contrôle de version distribué qui permet de suivre les modifications du code source. Git est essentiel pour la collaboration en équipe et la gestion des versions de projets.",
    level: "Expert",
    experience: "6+ ans"
  },
  {
    name: "GitHub",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    category: "Infrastructure and deployment",
    description: "Plateforme d'hébergement de code source basée sur Git. GitHub offre des fonctionnalités de collaboration, de gestion de projet et d'intégration continue pour les développeurs.",
    level: "Expert",
    experience: "5+ ans"
  },
  {
    name: "Vercel",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
    category: "Infrastructure and deployment",
    description: "Plateforme de déploiement optimisée pour les applications Next.js et React. Vercel offre un déploiement automatique, un CDN global et des fonctionnalités de performance avancées.",
    level: "Avancé",
    experience: "2+ ans"
  },
  {
    name: "Supabase",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
    category: "Infrastructure and deployment",
    description: "Alternative open-source à Firebase qui fournit une base de données PostgreSQL, l'authentification, et des APIs en temps réel. Supabase simplifie le développement d'applications full-stack.",
    level: "Intermédiaire",
    experience: "1+ an"
  },
  {
    name: "MySQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    category: "Infrastructure and deployment",
    description: "Système de gestion de base de données relationnelle open-source. MySQL est largement utilisé pour stocker et gérer des données structurées dans les applications web.",
    level: "Avancé",
    experience: "4+ ans"
  },
  {
    name: "MySQL Workbench",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    category: "Infrastructure and deployment",
    description: "Outil de conception et d'administration de base de données MySQL. MySQL Workbench permet de concevoir, développer et administrer des bases de données MySQL de manière visuelle.",
    level: "Avancé",
    experience: "3+ ans"
  },
  {
    name: "Linux",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    category: "Infrastructure and deployment",
    description: "Système d'exploitation open-source basé sur Unix. Linux est largement utilisé pour les serveurs, le développement et offre une grande flexibilité et sécurité.",
    level: "Avancé",
    experience: "4+ ans"
  },
  {
    name: "Ubuntu",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-plain.svg",
    category: "Infrastructure and deployment",
    description: "Distribution Linux basée sur Debian, connue pour sa facilité d'utilisation. Ubuntu est populaire pour le développement et offre un excellent support communautaire.",
    level: "Avancé",
    experience: "3+ ans"
  },
  {
    name: "Terminal",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
    category: "Infrastructure and deployment",
    description: "Interface en ligne de commande pour interagir avec le système d'exploitation. Le terminal permet d'exécuter des commandes, gérer des fichiers et automatiser des tâches de développement.",
    level: "Expert",
    experience: "5+ ans"
  },
  // Tools and software
  {
    name: "Figma",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    category: "Tools and software",
    description: "Outil de design collaboratif en ligne pour créer des interfaces utilisateur, des prototypes et des designs. Figma permet la collaboration en temps réel et l'intégration avec les outils de développement.",
    level: "Avancé",
    experience: "3+ ans"
  },
  {
    name: "Postman",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
    category: "Tools and software",
    description: "Plateforme de développement d'APIs qui permet de tester, documenter et partager des APIs. Postman simplifie le développement et les tests d'APIs REST et GraphQL.",
    level: "Avancé",
    experience: "3+ ans"
  },
  {
    name: "Photoshop",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg",
    category: "Tools and software",
    description: "Logiciel de retouche et d'édition d'images professionnel. Photoshop est utilisé pour créer des designs, retoucher des photos et préparer des assets visuels pour le web.",
    level: "Intermédiaire",
    experience: "2+ ans"
  },
  {
    name: "Illustrator",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-original.svg",
    category: "Tools and software",
    description: "Logiciel de création graphique vectorielle pour créer des logos, des icônes et des illustrations. Illustrator est idéal pour créer des designs scalables et professionnels.",
    level: "Intermédiaire",
    experience: "2+ ans"
  },
  {
    name: "Microsoft Office",
    logo: "https://imgs.search.brave.com/GxICbV1fN038pDfvLIsF-Y-NBb5_10fuw77uWT5itlc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzE2LzIvbWljcm9z/b2Z0LW9mZmljZS0z/NjUtbG9nby1wbmdf/c2Vla2xvZ28tMTY4/MzIxLnBuZw",
    category: "Tools and software",
    description: "Suite bureautique complète incluant Word, Excel, PowerPoint et Outlook. Microsoft Office est essentiel pour la documentation, les présentations et la gestion de projets.",
    level: "Expert",
    experience: "6+ ans"
  },
  {
    name: "VS Code",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    category: "Tools and software",
    description: "Éditeur de code source gratuit et open-source développé par Microsoft. VS Code offre une excellente expérience de développement avec des extensions, un débogueur intégré et Git.",
    level: "Expert",
    experience: "5+ ans"
  },
  {
    name: "Cursor",
    logo: "https://imgs.search.brave.com/izHMUPLtm87oYWrLIkwRPcXoflif63PfsInHa39utD8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9mcmFt/ZXJ1c2VyY29udGVu/dC5jb20vaW1hZ2Vz/L2xmU0JVNEVoS2NN/ZzNpR2c5OEwyRjFF/U2ZBLmpwZw",
    category: "Tools and software",
    description: "Éditeur de code alimenté par l'IA qui améliore la productivité du développement. Cursor intègre des fonctionnalités d'IA pour l'auto-complétion, la génération de code et l'assistance au développement.",
    level: "Avancé",
    experience: "1+ an"
  },
  {
    name: "WordPress",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg",
    category: "Tools and software",
    description: "Système de gestion de contenu (CMS) open-source pour créer des sites web et des blogs. WordPress est flexible, extensible et largement utilisé pour tous types de sites web.",
    level: "Avancé",
    experience: "4+ ans"
  },
  {
    name: "Joomla",
    logo: "https://imgs.search.brave.com/MmXIxC3YF4NvxTU0HuTGzC7dSbQlRC9ClrXFfT7aIaE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9iYW5u/ZXIyLmNsZWFucG5n/LmNvbS8yMDE4MTEw/OC9rdngva2lzc3Bu/Zy1qb29tbGEtY29u/dGVudC1tYW5hZ2Vt/ZW50LXN5c3RlbS13/ZWItZGVzaWduLXdl/Yi1kZS01YmU0ZjU3/YWNiOTY2NC41MzQ1/NjAwMDE1NDE3MzE3/MDY4MzM5LmpwZw",
    category: "Tools and software",
    description: "Système de gestion de contenu open-source pour créer des sites web complexes. Joomla offre une grande flexibilité et des fonctionnalités avancées pour les sites d'entreprise.",
    level: "Intermédiaire",
    experience: "2+ ans"
  },
];

const testimonials = [
  {
    name: "Jean Dupont",
    role: "Directeur Technique",
    company: "TechCorp",
    content:
      "Thibaut a une excellente maîtrise des technologies modernes et une capacité d'apprentissage remarquable. Ses solutions sont toujours innovantes et bien structurées.",
    rating: 5,
  },
  {
    name: "Marie Martin",
    role: "Product Manager",
    company: "InnovSoft",
    content:
      "Travailler avec Thibaut a été un plaisir. Il comprend rapidement les besoins et propose des solutions techniques de qualité. Très professionnel et fiable.",
    rating: 5,
  },
  {
    name: "Pierre Durand",
    role: "Lead Developer",
    company: "WebSolutions",
    content:
      "Thibaut excelle dans le développement React et Next.js. Son code est propre, maintenable et ses performances sont excellentes. Un développeur de talent.",
    rating: 5,
  },
];

const skillCategories = [
  {
    title: "Développement Frontend",
    description: "Maîtrise complète des technologies web modernes",
    icon: <Code2 className="h-6 w-6" />,
    category: "Front and frameworks",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Développement Backend",
    description: "Expertise en développement serveur et APIs",
    icon: <Server className="h-6 w-6" />,
    category: "Back and frameworks",
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    title: "Infrastructure & DevOps",
    description: "Gestion complète de l'infrastructure et du déploiement",
    icon: <Database className="h-6 w-6" />,
    category: "Infrastructure and deployment",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "Design & Outils",
    description: "Compétences en design et outils de productivité",
    icon: <Palette className="h-6 w-6" />,
    category: "Tools and software",
    color: "from-green-500/20 to-emerald-500/20",
  },
];

// Composant pour les cartes de technologie avec popup
function TechCard({ skill, skillIndex }: { skill: any; skillIndex: number }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            delay: skillIndex * 0.05,
          }}
          viewport={{ once: true }}
          className="flex flex-col items-center p-3 rounded-lg bg-card transition-all duration-200 group-hover:scale-105 cursor-pointer hover:border-primary/30 border border-transparent"
        >
          <img
            src={skill.logo}
            alt={`Logo ${skill.name}`}
            className="h-10 w-10 mb-2 scale-110 transition-transform bg-white p-1 rounded"
          />
          <span className="text-xs font-medium text-center text-foreground">
            {skill.name}
          </span>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="w-[95vw] sm:w-auto max-w-lg max-h-[90vh] overflow-y-auto p-4 sm:p-6 pt-8">
        <DialogHeader className="pr-10">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={skill.logo}
              alt={`Logo ${skill.name}`}
              className="h-16 w-16 bg-white p-2 rounded-lg shadow-lg"
            />
            <div>
              <DialogTitle className="text-2xl">{skill.name}</DialogTitle>
              <DialogDescription className="text-lg font-medium text-foreground">
                {skill.level} • {skill.experience}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {skill.description}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Composant pour les technologies favorites avec popup
function FavoriteTechCard({ tech, index }: { tech: any; index: number }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center p-6 rounded-2xl border bg-card hover:border-primary/30 transition-all duration-300 cursor-pointer"
        >
          <img
            src={tech.logo}
            alt={`Logo ${tech.name}`}
            className="h-16 w-16 mb-4 scale-110 transition-transform bg-white p-2 rounded-xl shadow-lg"
          />
          <h4 className="text-lg font-bold text-foreground mb-2">
            {tech.name}
          </h4>
          <p className="text-sm text-muted-foreground text-center">
            {tech.description}
          </p>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="w-[95vw] sm:w-auto max-w-lg max-h-[90vh] overflow-y-auto p-4 sm:p-6 pt-8">
        <DialogHeader className="pr-10">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={tech.logo}
              alt={`Logo ${tech.name}`}
              className="h-20 w-20 bg-white p-3 rounded-xl shadow-lg"
            />
            <div>
              <DialogTitle className="text-2xl">{tech.name}</DialogTitle>
              <DialogDescription className="text-lg font-medium text-foreground">
                Technologie favorite
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {tech.description}
          </p>
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Cette technologie fait partie de ma stack favorite que j'utilise quotidiennement dans mes projets.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function SkillsSection() {
  return (
    <section className="py-6 md:py-8 px-6 relative">
      <LightParticles />
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Compétences Techniques
          </h2>
          <p className="text-lg text-muted-foreground">
            Technologies et langages que je maîtrise
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid lg:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div
                  className={`p-6 rounded-2xl border border-border/50 bg-gradient-to-br ${category.color} hover:bg-card hover:border-primary/30 transition-all duration-300 h-full`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        {category.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {skills
                      .filter((skill) => skill.category === category.category)
                      .map((skill, skillIndex) => (
                        <TechCard key={skill.name} skill={skill} skillIndex={skillIndex} />
                      ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stack Favorite */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ma Stack Favorite
            </h3>
            <p className="text-lg text-muted-foreground">
              Les technologies que j'utilise au quotidien
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              {
                name: "React",
                logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
                description: "Bibliothèque UI",
              },
              {
                name: "Next.js",
                logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
                description: "Framework React full-stack",
              },
              {
                name: "Node.js",
                logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
                description: "Runtime JavaScript",
              },
              {
                name: "NestJS",
                logo: "https://imgs.search.brave.com/MqDoXUvr7My9WOzLwntiaYwL363MOd0_77TMBcutPwA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pY29u/bG9nb3ZlY3Rvci5j/b20vdXBsb2Fkcy9p/bWFnZXMvMjAyNS8w/MS9sZy02Nzc4NmYy/ZTA3M2ZiLU5lc3RK/Uy53ZWJw",
                description: "Framework Node.js backend",
              },
              {
                name: "Tailwind CSS",
                logo: "https://imgs.search.brave.com/2ZjYUPwN5hgwhGa5hktSrh6HHwn-c0kzJ0QHreWmwWs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yYXcu/Z2l0aHVidXNlcmNv/bnRlbnQuY29tL2dp/bGJhcmJhcmEvbG9n/b3MvbWFpbi9sb2dv/cy90YWlsd2luZGNz/cy1pY29uLnN2Zw",
                description: "Framework CSS utilitaire",
              },
              {
                name: "Cursor AI",
                logo: "https://imgs.search.brave.com/izHMUPLtm87oYWrLIkwRPcXoflif63PfsInHa39utD8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9mcmFt/ZXJ1c2VyY29udGVu/dC5jb20vaW1hZ2Vz/L2xmU0JVNEVoS2NN/ZzNpR2c5OEwyRjFF/U2ZBLmpwZw",
                description: "IDE avec IA intégrée",
              },
              {
                name: "Git",
                logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
                description: "Contrôle de version",
              },
              {
                name: "Linux",
                logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
                description: "Système d'exploitation",
              },
              {
                name: "Terminal",
                logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
                description: "Interface en ligne de commande",
              },
            ].map((tech, index) => (
              <FavoriteTechCard key={tech.name} tech={tech} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          <div className="text-center p-6 rounded-2xl border bg-card">
            <div className="text-2xl font-bold text-primary mb-1">
              {skills.length}+
            </div>
            <div className="text-sm text-muted-foreground">Technologies</div>
          </div>
          <div className="text-center p-6 rounded-2xl border bg-card">
            <div className="text-2xl font-bold text-primary mb-1">
              {skillCategories.length}
            </div>
            <div className="text-sm text-muted-foreground">
              Domaines d'expertise
            </div>
          </div>
          <div className="text-center p-6 rounded-2xl border bg-card">
            <div className="text-2xl font-bold text-primary mb-1">6+</div>
            <div className="text-sm text-muted-foreground">
              Années d'expérience
            </div>
          </div>
          <div className="text-center p-6 rounded-2xl border bg-card">
            <div className="text-2xl font-bold text-primary mb-1">100%</div>
            <div className="text-sm text-muted-foreground">
              Satisfaction client
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
