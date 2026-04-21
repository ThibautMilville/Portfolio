const levelKeyMap: Record<string, string> = {
  Expert: "expert",
  "Avancé": "advanced",
  "Intermédiaire": "intermediate",
  "Débutant": "beginner"
};

const skillTranslationKeyMap: Record<string, string> = {
  HTML5: "html5",
  CSS3: "css3",
  JavaScript: "javascript",
  React: "react",
  "Next.js": "nextjs",
  "Vue.js": "vuejs",
  Sass: "sass",
  "Tailwind CSS": "tailwind",
  Bootstrap: "bootstrap",
  "Node.js": "nodejs",
  NestJS: "nestjs",
  Java: "java",
  "Spring Boot": "spring",
  Python: "python",
  Flask: "flask",
  PHP: "php",
  CodeIgniter: "codeigniter",
  Docker: "docker",
  GitLab: "gitlab",
  Git: "git",
  GitHub: "github",
  Vercel: "vercel",
  Supabase: "supabase",
  MySQL: "mysql",
  "MySQL Workbench": "mysqlworkbench",
  Linux: "linux",
  Ubuntu: "ubuntu",
  Terminal: "terminal",
  Figma: "figma",
  Postman: "postman",
  Photoshop: "photoshop",
  Illustrator: "illustrator",
  "Microsoft Office": "office",
  "VS Code": "vscode",
  WordPress: "wordpress",
  Joomla: "joomla",
  "Cursor AI": "cursor",
  Cursor: "cursor",
  Claude: "cursor"
};

export const getLevelTranslationKey = (level: string): string => levelKeyMap[level] || "intermediate";

export const getSkillDescriptionKey = (name: string): string =>
  skillTranslationKeyMap[name] || name.toLowerCase().replace(/\s+/g, "");
