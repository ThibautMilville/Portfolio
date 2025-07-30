import './globals.css';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Navigation from '@/components/Navigation';
import { ThemeProvider } from '@/components/ThemeProvider';
import Link from 'next/link';
import { Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { IMAGES } from '@/lib/images';
import { LocalImage } from '@/components/ui/image';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'], 
  variable: '--font-mono' 
});

export const metadata: Metadata = {
  title: 'Thibaut MILVILLE - Développeur Fullstack',
  description: 'Portfolio de Thibaut MILVILLE, Software Engineer spécialisé en React, Next.js et NestJS',
  icons: {
    icon: IMAGES.favicon,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Données pour le footer
  const footerProjets = [
    { title: "E-Commerce Platform", href: "/projets#e-commerce-platform" },
    { title: "Task Management SaaS", href: "/projets#task-management-saas" },
    { title: "API GraphQL Microservices", href: "/projets#api-graphql-microservices" },
  ];
  const footerSkills = [
    "React", "Next.js", "NestJS", "Node.js", "TypeScript", "PostgreSQL"
  ];
  const footerDiplomes = [
    { title: "Master Informatique - Développement Web", href: "/formations#master-informatique" },
    { title: "Certification AWS Solutions Architect", href: "/formations#aws-solutions-architect" },
    { title: "Formation NestJS Avancée", href: "/formations#nestjs-avancee" },
  ];

  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <TooltipProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange={false}
          >
            <Navigation />
            <main className="min-h-screen">
              {children}
            </main>
            <footer className="mt-16 border-t bg-background/80 pt-12 px-4">
              <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-6">
                                 {/* Colonne 1 : Logo, nom, réseaux */}
                 <div className="flex flex-col items-center gap-4">
                   {/* Logo avec photo de profil */}
                   <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20 shadow-lg">
                     <LocalImage
                       imageName="photo_profil.jpg"
                       alt="Thibaut Milville"
                       className="w-full h-full object-cover"
                     />
                   </div>
                  <Link href="/" className="font-bold text-lg hover:text-primary transition-colors">Thibaut MILVILLE</Link>
                  <div className="flex gap-4 mt-2">
                    <a href="https://github.com/ThibautMilville" target="_blank" rel="noopener noreferrer" className="hover:text-primary"><Github className="h-5 w-5" /></a>
                    <a href="https://fr.linkedin.com/in/thibaut-milville" target="_blank" rel="noopener noreferrer" className="hover:text-primary"><Linkedin className="h-5 w-5" /></a>
                    <a href="mailto:tmilville.pro@gmail.com" className="hover:text-primary"><Mail className="h-5 w-5" /></a>
                    <a href="https://t.me/Thybow" target="_blank" rel="noopener noreferrer" className="hover:text-primary"><MessageCircle className="h-5 w-5" /></a>
                  </div>
                </div>
                {/* Colonne 2 : Diplômes & Certifications */}
                <div className="flex flex-col items-center md:items-start">
                  <h3 className="font-semibold mb-3 text-primary">Diplômes & Certifications</h3>
                  <ul className="space-y-2">
                    {footerDiplomes.map((d) => (
                      <li key={d.title}>
                        <Link href={d.href} className="hover:underline text-sm text-muted-foreground hover:text-primary transition-colors">{d.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Colonne 3 : Projets phares */}
                <div className="flex flex-col items-center md:items-start">
                  <h3 className="font-semibold mb-3 text-primary">Projets phares</h3>
                  <ul className="space-y-2">
                    {footerProjets.map((p) => (
                      <li key={p.title}>
                        <Link href={p.href} className="hover:underline text-sm text-muted-foreground hover:text-primary transition-colors">{p.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="border-t pt-4 pb-2">
                <div className="flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} <Link href="/" className="hover:text-primary font-semibold transition-colors">Thibaut MILVILLE</Link>. Tous droits réservés.
                  </p>
                </div>
              </div>
            </footer>
          </ThemeProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}