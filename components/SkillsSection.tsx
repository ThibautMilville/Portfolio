"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Code2, Star, Palette, Server, Database, Wrench } from "lucide-react";
import LightParticles from "@/components/ui/light-particles";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Tooltip } from '@/components/ui/tooltip';

// Composant pour afficher les étoiles de niveau
function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && (
        <div className="relative h-4 w-4">
          <Star className="h-4 w-4 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={i + fullStars + (hasHalfStar ? 1 : 0)} className="h-4 w-4 text-gray-300" />
      ))}
    </div>
  );
}

// Fonction pour mapper les niveaux français vers les clés de traduction
function getLevelKey(level: string): string {
  const levelMap: { [key: string]: string } = {
    "Expert": "expert",
    "Avancé": "advanced",
    "Intermédiaire": "intermediate",
    "Débutant": "beginner"
  };
  return levelMap[level] || "intermediate";
}

// Fonction pour mapper les niveaux aux étoiles
function getLevelRating(level: string): number {
  switch (level) {
    case "Expert":
      return 5;
    case "Avancé":
      return 4;
    case "Intermédiaire":
      return 3;
    case "Débutant":
      return 2;
    default:
      return 3;
  }
}

const skills = [
  // Front and frameworks
  {
    name: "HTML5",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    category: "Front and frameworks",
    level: "Expert",
    experience: "6+ ans"
  },
  {
    name: "CSS3",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    category: "Front and frameworks",
    level: "Expert",
    experience: "6+ ans"
  },
  {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    category: "Front and frameworks",

    level: "Expert",
    experience: "6+ ans"
  },
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    category: "Front and frameworks",

    level: "Expert",
    experience: "4+ ans"
  },
  {
    name: "Next.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    category: "Front and frameworks",

    level: "Expert",
    experience: "3+ ans"
  },
  {
    name: "Vue.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
    category: "Front and frameworks",

    level: "Intermédiaire",
    experience: "2+ ans"
  },
  {
    name: "Sass",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
    category: "Front and frameworks",

    level: "Avancé",
    experience: "4+ ans"
  },
  {
    name: "Tailwind CSS",
    logo: "https://imgs.search.brave.com/2ZjYUPwN5hgwhGa5hktSrh6HHwn-c0kzJ0QHreWmwWs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yYXcu/Z2l0aHVidXNlcmNv/bnRlbnQuY29tL2dp/bGJhcmJhcmEvbG9n/b3MvbWFpbi9sb2dv/cy90YWlsd2luZGNz/cy1pY29uLnN2Zw",
    category: "Front and frameworks",

    level: "Expert",
    experience: "3+ ans"
  },
  {
    name: "Bootstrap",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    category: "Front and frameworks",

    level: "Avancé",
    experience: "5+ ans"
  },
  // Back and frameworks
  {
    name: "Node.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    category: "Back and frameworks",

    level: "Expert",
    experience: "4+ ans"
  },
  {
    name: "NestJS",
    logo: "https://imgs.search.brave.com/MqDoXUvr7My9WOzLwntiaYwL363MOd0_77TMBcutPwA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pY29u/bG9nb3ZlY3Rvci5j/b20vdXBsb2Fkcy9p/bWFnZXMvMjAyNS8w/MS9sZy02Nzc4NmYy/ZTA3M2ZiLU5lc3RK/Uy53ZWJw",
    category: "Back and frameworks",

    level: "Expert",
    experience: "3+ ans"
  },
  {
    name: "Java",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    category: "Back and frameworks",

    level: "Avancé",
    experience: "3+ ans"
  },
  {
    name: "Spring Boot",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
    category: "Back and frameworks",

    level: "Avancé",
    experience: "2+ ans"
  },
  {
    name: "Python",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    category: "Back and frameworks",

    level: "Intermédiaire",
    experience: "2+ ans"
  },
  {
    name: "Flask",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
    category: "Back and frameworks",

    level: "Intermédiaire",
    experience: "1+ an"
  },
  {
    name: "PHP",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    category: "Back and frameworks",

    level: "Avancé",
    experience: "4+ ans"
  },
  {
    name: "CodeIgniter",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/codeigniter/codeigniter-plain.svg",
    category: "Back and frameworks",

    level: "Avancé",
    experience: "3+ ans"
  },
  // Infrastructure and deployment
  {
    name: "Docker",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    category: "Infrastructure and deployment",

    level: "Avancé",
    experience: "2+ ans"
  },
  {
    name: "GitLab",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg",
    category: "Infrastructure and deployment",

    level: "Avancé",
    experience: "3+ ans"
  },
  {
    name: "Git",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    category: "Infrastructure and deployment",

    level: "Expert",
    experience: "6+ ans"
  },
  {
    name: "GitHub",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    category: "Infrastructure and deployment",

    level: "Expert",
    experience: "5+ ans"
  },
  {
    name: "Vercel",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
    category: "Infrastructure and deployment",

    level: "Avancé",
    experience: "2+ ans"
  },
  {
    name: "Supabase",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
    category: "Infrastructure and deployment",

    level: "Intermédiaire",
    experience: "1+ an"
  },
  {
    name: "MySQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    category: "Infrastructure and deployment",

    level: "Avancé",
    experience: "4+ ans"
  },
  {
    name: "MySQL Workbench",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    category: "Infrastructure and deployment",

    level: "Avancé",
    experience: "3+ ans"
  },
  {
    name: "Linux",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    category: "Infrastructure and deployment",

    level: "Avancé",
    experience: "4+ ans"
  },
  {
    name: "Ubuntu",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-plain.svg",
    category: "Infrastructure and deployment",

    level: "Avancé",
    experience: "3+ ans"
  },
  {
    name: "Terminal",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
    category: "Infrastructure and deployment",

    level: "Expert",
    experience: "5+ ans"
  },
  // Tools and software
  {
    name: "Figma",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    category: "Tools and software",

    level: "Avancé",
    experience: "3+ ans"
  },
  {
    name: "Postman",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
    category: "Tools and software",

    level: "Avancé",
    experience: "3+ ans"
  },
  {
    name: "Photoshop",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg",
    category: "Tools and software",

    level: "Intermédiaire",
    experience: "2+ ans"
  },
  {
    name: "Illustrator",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-original.svg",
    category: "Tools and software",

    level: "Intermédiaire",
    experience: "2+ ans"
  },
  {
    name: "Microsoft Office",
    logo: "https://imgs.search.brave.com/GxICbV1fN038pDfvLIsF-Y-NBb5_10fuw77uWT5itlc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzE2LzIvbWljcm9z/b2Z0LW9mZmljZS0z/NjUtbG9nby1wbmdf/c2Vla2xvZ28tMTY4/MzIxLnBuZw",
    category: "Tools and software",

    level: "Expert",
    experience: "6+ ans"
  },
  {
    name: "VS Code",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    category: "Tools and software",

    level: "Expert",
    experience: "5+ ans"
  },
  {
    name: "Cursor",
    logo: "https://imgs.search.brave.com/izHMUPLtm87oYWrLIkwRPcXoflif63PfsInHa39utD8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9mcmFt/ZXJ1c2VyY29udGVu/dC5jb20vaW1hZ2Vz/L2xmU0JVNEVoS2NN/ZzNpR2c5OEwyRjFF/U2ZBLmpwZw",
    category: "Tools and software",

    level: "Avancé",
    experience: "1+ an"
  },
  {
    name: "WordPress",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg",
    category: "Tools and software",

    level: "Avancé",
    experience: "4+ ans"
  },
  {
    name: "Joomla",
    logo: "https://imgs.search.brave.com/MmXIxC3YF4NvxTU0HuTGzC7dSbQlRC9ClrXFfT7aIaE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9iYW5u/ZXIyLmNsZWFucG5n/LmNvbS8yMDE4MTEw/OC9rdngva2lzc3Bu/Zy1qb29tbGEtY29u/dGVudC1tYW5hZ2Vt/ZW50LXN5c3RlbS13/ZWItZGVzaWduLXdl/Yi1kZS01YmU0ZjU3/YWNiOTY2NC41MzQ1/NjAwMDE1NDE3MzE3/MDY4MzM5LmpwZw",
    category: "Tools and software",

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

// Les skillCategories seront créées dynamiquement avec les traductions

// Composant pour les cartes de technologie avec popup
function TechCard({ 
  skill, 
  skillIndex, 
  translatedDescription,
  translateLevel,
  translateExperience
}: { 
  skill: any; 
  skillIndex: number; 
  translatedDescription?: string;
  translateLevel: (level: string) => string;
  translateExperience: (experience: string) => string;
}) {
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
                {translateLevel(skill.level)} • {translateExperience(skill.experience)}
              </DialogDescription>
              <div className="mt-2">
                <StarRating rating={getLevelRating(skill.level)} />
              </div>
            </div>
          </div>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {translatedDescription}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Composant pour les technologies favorites avec popup
function FavoriteTechCard({ tech, index, favoriteTech, favoriteDescription }: { 
  tech: any; 
  index: number; 
  favoriteTech: string;
  favoriteDescription: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center p-4 rounded-2xl border bg-card hover:border-primary/30 transition-all duration-300 cursor-pointer h-44 w-32 sm:w-36 lg:w-40"
        >
          <img
            src={tech.logo}
            alt={`Logo ${tech.name}`}
            className="h-14 w-14 mb-3 scale-110 transition-transform bg-white p-1 rounded-lg shadow-lg"
          />
          <h4 className="text-base font-bold text-foreground mb-2 text-center">
            {tech.name}
          </h4>
          <p className="text-sm text-muted-foreground text-center line-clamp-2">
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
                {favoriteTech}
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
              {favoriteDescription}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function SkillsSection() {
  const t = useTranslations('Home.skills');
  const tSkillDescriptions = useTranslations('Home.skillDescriptions');
  
  // Fonction pour traduire un niveau
  const translateLevel = (level: string): string => {
    const levelKey = getLevelKey(level);
    return t(`levels.${levelKey}`);
  };

  // Fonction pour traduire les années d'expérience
  const translateExperience = (experience: string): string => {
    try {
      const translated = t(`experienceYears.${experience}`);
      return translated || experience;
    } catch {
      return experience;
    }
  };
  
  // Fonction pour obtenir la clé de traduction basée sur le nom de la technologie
  const getSkillKey = (name: string): string => {
    const keyMap: { [key: string]: string } = {
      'HTML5': 'html5',
      'CSS3': 'css3',
      'JavaScript': 'javascript',
      'React': 'react',
      'Next.js': 'nextjs',
      'Vue.js': 'vuejs',
      'Sass': 'sass',
      'Tailwind CSS': 'tailwind',
      'Bootstrap': 'bootstrap',
      'Node.js': 'nodejs',
      'NestJS': 'nestjs',
      'Java': 'java',
      'Spring Boot': 'spring',
      'Python': 'python',
      'Flask': 'flask',
      'PHP': 'php',
      'CodeIgniter': 'codeigniter',
      'Docker': 'docker',
      'GitLab': 'gitlab',
      'Git': 'git',
      'GitHub': 'github',
      'Vercel': 'vercel',
      'Supabase': 'supabase',
      'MySQL': 'mysql',
      'MySQL Workbench': 'mysqlworkbench',
      'Linux': 'linux',
      'Ubuntu': 'ubuntu',
      'Terminal': 'terminal',
      'Figma': 'figma',
      'Postman': 'postman',
      'Photoshop': 'photoshop',
      'Illustrator': 'illustrator',
      'Microsoft Office': 'office',
      'VS Code': 'vscode',
      'WordPress': 'wordpress',
      'Joomla': 'joomla'
    };
    
    // Gestion spéciale pour Cursor (avec ou sans "AI")
    if (name.includes('Cursor')) {
      return 'cursor';
    }
    
    return keyMap[name] || name.toLowerCase().replace(/\s+/g, '');
  };
  
  // Créer les skillCategories dynamiquement avec les traductions
  const skillCategories = [
    {
      title: t('skillCategories.frontend.title'),
      description: t('skillCategories.frontend.description'),
      icon: <Code2 className="h-6 w-6" />,
      category: "Front and frameworks",
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      title: t('skillCategories.backend.title'),
      description: t('skillCategories.backend.description'),
      icon: <Server className="h-6 w-6" />,
      category: "Back and frameworks",
      color: "from-green-500/20 to-emerald-500/20",
    },
    {
      title: t('skillCategories.infrastructure.title'),
      description: t('skillCategories.infrastructure.description'),
      icon: <Database className="h-6 w-6" />,
      category: "Infrastructure and deployment",
      color: "from-purple-500/20 to-pink-500/20",
    },
    {
      title: t('skillCategories.design.title'),
      description: t('skillCategories.design.description'),
      icon: <Palette className="h-6 w-6" />,
      category: "Tools and software",
      color: "from-green-500/20 to-emerald-500/20",
    },
  ];
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('subtitle')}
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

                  <div className="flex flex-wrap justify-center gap-3">
                    {skills
                      .filter((skill) => skill.category === category.category)
                      .map((skill, skillIndex) => {
                        const skillKey = getSkillKey(skill.name);
                        const translatedDescription = tSkillDescriptions(skillKey);
                        return (
                          <div key={skill.name} className="w-[calc(33.333%-8px)] min-w-[120px]">
                            <TechCard 
                              skill={skill} 
                              skillIndex={skillIndex} 
                              translatedDescription={translatedDescription}
                              translateLevel={translateLevel}
                              translateExperience={translateExperience}
                            />
                          </div>
                        );
                      })}
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
              {t('favoriteStack.title')}
            </h3>
            <p className="text-lg text-muted-foreground">
              {t('favoriteStack.subtitle')}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              {
                name: "React",
                logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
              },
              {
                name: "Next.js",
                logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
              },
              {
                name: "Node.js",
                logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
              },
              {
                name: "NestJS",
                logo: "https://imgs.search.brave.com/MqDoXUvr7My9WOzLwntiaYwL363MOd0_77TMBcutPwA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pY29u/bG9nb3ZlY3Rvci5j/b20vdXBsb2Fkcy9p/bWFnZXMvMjAyNS8w/MS9sZy02Nzc4NmYy/ZTA3M2ZiLU5lc3RK/Uy53ZWJw",
              },
              {
                name: "Tailwind CSS",
                logo: "https://imgs.search.brave.com/2ZjYUPwN5hgwhGa5hktSrh6HHwn-c0kzJ0QHreWmwWs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yYXcu/Z2l0aHVidXNlcmNv/bnRlbnQuY29tL2dp/bGJhcmJhcmEvbG9n/b3MvbWFpbi9sb2dv/cy90YWlsd2luZGNz/cy1pY29uLnN2Zw",
              },
              {
                name: "Cursor AI",
                logo: "https://imgs.search.brave.com/izHMUPLtm87oYWrLIkwRPcXoflif63PfsInHa39utD8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9mcmFt/ZXJ1c2VyY29udGVu/dC5jb20vaW1hZ2Vz/L2xmU0JVNEVoS2NN/ZzNpR2c5OEwyRjFF/U2ZBLmpwZw",
              },
              {
                name: "Git",
                logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
              },
              {
                name: "Linux",
                logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
              },
              {
                name: "Terminal",
                logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
              },
            ].map((tech, index) => {
              const skillKey = getSkillKey(tech.name);
              const translatedDescription = tSkillDescriptions(skillKey);
              return (
                <FavoriteTechCard 
                  key={tech.name} 
                  tech={{...tech, description: translatedDescription}} 
                  index={index} 
                  favoriteTech={t('modals.favoriteTech')}
                  favoriteDescription={t('modals.favoriteDescription')}
                />
              );
            })}
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
          <div className="relative overflow-hidden p-6 rounded-2xl border border-primary/30 bg-card hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl group">
            {/* Dégradé de base avec vraie transition */}
            <div 
              className="absolute top-0 left-0 w-20 h-20 shadow-lg flex items-start justify-start pt-2 pl-2" 
              style={{ 
                clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                backgroundImage: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.6) 30%, hsl(var(--primary) / 0.3) 60%, #000 100%)'
              }} 
            >
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="relative z-10 text-center">
              <div className="text-4xl font-black text-primary mb-1 drop-shadow-lg">{skills.length}+</div>
              <div className="text-sm text-muted-foreground">Technologies</div>
            </div>
          </div>
          <div className="relative overflow-hidden p-6 rounded-2xl border border-primary/30 bg-card hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl group">
            {/* Dégradé de base avec vraie transition */}
            <div 
              className="absolute top-0 left-0 w-20 h-20 shadow-lg flex items-start justify-start pt-2 pl-2" 
              style={{ 
                clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                backgroundImage: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.6) 30%, hsl(var(--primary) / 0.3) 60%, #000 100%)'
              }} 
            >
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="relative z-10 text-center">
              <div className="text-4xl font-black text-primary mb-1 drop-shadow-lg">{skillCategories.length}</div>
              <div className="text-sm text-muted-foreground">{t('stats.domains')}</div>
            </div>
          </div>
          <div className="relative overflow-hidden p-6 rounded-2xl border border-primary/30 bg-card hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl group">
            {/* Dégradé de base avec vraie transition */}
            <div 
              className="absolute top-0 left-0 w-20 h-20 shadow-lg flex items-start justify-start pt-2 pl-2" 
              style={{ 
                clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                backgroundImage: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.6) 30%, hsl(var(--primary) / 0.3) 60%, #000 100%)'
              }} 
            >
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="relative z-10 text-center">
              <div className="text-4xl font-black text-primary mb-1 drop-shadow-lg">6+</div>
              <div className="text-sm text-muted-foreground">{t('stats.experience')}</div>
            </div>
          </div>
          <div className="relative overflow-hidden p-6 rounded-2xl border border-primary/30 bg-card hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl group">
            {/* Dégradé de base avec vraie transition */}
            <div 
              className="absolute top-0 left-0 w-20 h-20 shadow-lg flex items-start justify-start pt-2 pl-2" 
              style={{ 
                clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                backgroundImage: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.6) 30%, hsl(var(--primary) / 0.3) 60%, #000 100%)'
              }} 
            >
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="relative z-10 text-center">
              <div className="text-4xl font-black text-primary mb-1 drop-shadow-lg">100%</div>
              <div className="text-sm text-muted-foreground">{t('stats.satisfaction')}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
