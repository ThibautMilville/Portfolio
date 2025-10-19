"use client";

import { motion } from "framer-motion";
import { Code2, Star, Palette, Server, Database, Wrench } from "lucide-react";
import LightParticles from "@/components/ui/light-particles";

const skills = [
  // Front and frameworks
  {
    name: "HTML5",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    category: "Front and frameworks",
  },
  {
    name: "CSS3",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    category: "Front and frameworks",
  },
  {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    category: "Front and frameworks",
  },
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    category: "Front and frameworks",
  },
  {
    name: "Next.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    category: "Front and frameworks",
  },
  {
    name: "Vue.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
    category: "Front and frameworks",
  },
  {
    name: "Sass",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
    category: "Front and frameworks",
  },
  {
    name: "Tailwind CSS",
    logo: "https://imgs.search.brave.com/2ZjYUPwN5hgwhGa5hktSrh6HHwn-c0kzJ0QHreWmwWs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yYXcu/Z2l0aHVidXNlcmNv/bnRlbnQuY29tL2dp/bGJhcmJhcmEvbG9n/b3MvbWFpbi9sb2dv/cy90YWlsd2luZGNz/cy1pY29uLnN2Zw",
    category: "Front and frameworks",
  },
  {
    name: "Bootstrap",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    category: "Front and frameworks",
  },
  // Back and frameworks
  {
    name: "Node.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    category: "Back and frameworks",
  },
  {
    name: "NestJS",
    logo: "https://imgs.search.brave.com/MqDoXUvr7My9WOzLwntiaYwL363MOd0_77TMBcutPwA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pY29u/bG9nb3ZlY3Rvci5j/b20vdXBsb2Fkcy9p/bWFnZXMvMjAyNS8w/MS9sZy02Nzc4NmYy/ZTA3M2ZiLU5lc3RK/Uy53ZWJw",
    category: "Back and frameworks",
  },
  {
    name: "Java",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    category: "Back and frameworks",
  },
  {
    name: "Spring Boot",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
    category: "Back and frameworks",
  },
  {
    name: "Python",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    category: "Back and frameworks",
  },
  {
    name: "Flask",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
    category: "Back and frameworks",
  },
  {
    name: "PHP",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    category: "Back and frameworks",
  },
  {
    name: "CodeIgniter",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/codeigniter/codeigniter-plain.svg",
    category: "Back and frameworks",
  },
  // Infrastructure and deployment
  {
    name: "Docker",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    category: "Infrastructure and deployment",
  },
  {
    name: "GitLab",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg",
    category: "Infrastructure and deployment",
  },
  {
    name: "Git",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    category: "Infrastructure and deployment",
  },
  {
    name: "GitHub",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    category: "Infrastructure and deployment",
  },
  {
    name: "Vercel",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
    category: "Infrastructure and deployment",
  },
  {
    name: "Supabase",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
    category: "Infrastructure and deployment",
  },
  {
    name: "MySQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    category: "Infrastructure and deployment",
  },
  {
    name: "MySQL Workbench",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    category: "Infrastructure and deployment",
  },
  {
    name: "Linux",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    category: "Infrastructure and deployment",
  },
  {
    name: "Ubuntu",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-plain.svg",
    category: "Infrastructure and deployment",
  },
  {
    name: "Terminal",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
    category: "Infrastructure and deployment",
  },
  // Tools and software
  {
    name: "Figma",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    category: "Tools and software",
  },
  {
    name: "Postman",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
    category: "Tools and software",
  },
  {
    name: "Photoshop",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg",
    category: "Tools and software",
  },
  {
    name: "Illustrator",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-original.svg",
    category: "Tools and software",
  },
  {
    name: "Microsoft Office",
    logo: "https://imgs.search.brave.com/GxICbV1fN038pDfvLIsF-Y-NBb5_10fuw77uWT5itlc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzE2LzIvbWljcm9z/b2Z0LW9mZmljZS0z/NjUtbG9nby1wbmdf/c2Vla2xvZ28tMTY4/MzIxLnBuZw",
    category: "Tools and software",
  },
  {
    name: "VS Code",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    category: "Tools and software",
  },
  {
    name: "Cursor",
    logo: "https://imgs.search.brave.com/izHMUPLtm87oYWrLIkwRPcXoflif63PfsInHa39utD8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9mcmFt/ZXJ1c2VyY29udGVu/dC5jb20vaW1hZ2Vz/L2xmU0JVNEVoS2NN/ZzNpR2c5OEwyRjFF/U2ZBLmpwZw",
    category: "Tools and software",
  },
  {
    name: "WordPress",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg",
    category: "Tools and software",
  },
  {
    name: "Joomla",
    logo: "https://imgs.search.brave.com/MmXIxC3YF4NvxTU0HuTGzC7dSbQlRC9ClrXFfT7aIaE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9iYW5u/ZXIyLmNsZWFucG5n/LmNvbS8yMDE4MTEw/OC9rdngva2lzc3Bu/Zy1qb29tbGEtY29u/dGVudC1tYW5hZ2Vt/ZW50LXN5c3RlbS13/ZWItZGVzaWduLXdl/Yi1kZS01YmU0ZjU3/YWNiOTY2NC41MzQ1/NjAwMDE1NDE3MzE3/MDY4MzM5LmpwZw",
    category: "Tools and software",
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
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.4,
                            delay: skillIndex * 0.05,
                          }}
                          viewport={{ once: true }}
                          className="flex flex-col items-center p-3 rounded-lg bg-card transition-all duration-200 group-hover:scale-105"
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
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center p-6 rounded-2xl border bg-card hover:border-primary/30 transition-all duration-300"
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
