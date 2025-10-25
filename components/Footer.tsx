import Link from 'next/link';
import { LocalImage } from '@/components/ui/image';
import { FOOTER_DATA } from '@/lib/footer';
import { Github, Linkedin, Mail, MessageCircle, ArrowUpRight } from 'lucide-react';
import { Tooltip } from '@/components/ui/tooltip';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Navigation');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t bg-background/80 pt-12 px-4">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-8 pt-6">
        <div className="flex flex-col items-center lg:items-start gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20 shadow-lg">
            <LocalImage
              imageName="photo_profil.jpg"
              alt="Thibaut Milville"
              className="w-full h-full object-cover"
            />
          </div>
          <Link href="/" className="font-bold text-lg hover:text-primary transition-colors">
            Thibaut MILVILLE
          </Link>
          <p className="text-sm text-muted-foreground text-center lg:text-left">
            {t('description')}
          </p>
        </div>

        <div className="flex flex-col items-center lg:items-start">
          <h3 className="font-semibold mb-3 text-primary">{t('navigation')}</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="hover:underline text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {tNav('home')}
              </Link>
            </li>
            <li>
              <Link
                href="/projets"
                className="hover:underline text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {tNav('projects')}
              </Link>
            </li>
            <li>
              <Link
                href="/formations"
                className="hover:underline text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {tNav('formations')}
              </Link>
            </li>
            <li>
              <Link
                href="/experiences"
                className="hover:underline text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {tNav('experiences')}
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:underline text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {tNav('contact')}
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center lg:items-start">
          <h3 className="font-semibold mb-3 text-primary">{t('formations')}</h3>
          <ul className="space-y-2">
            {FOOTER_DATA.diplomes.map((item: { title: string; href: string }) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className="hover:underline text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center lg:items-start">
          <h3 className="font-semibold mb-3 text-primary">{t('projects')}</h3>
          <ul className="space-y-2">
            {FOOTER_DATA.projets.map((item: { title: string; href: string }) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className="hover:underline text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  {item.title}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t">
        <div className="max-w-6xl mx-auto py-5 flex flex-col md:flex-row items-center gap-4 md:gap-6 justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {FOOTER_DATA.skills.map((skill: string) => (
              <span key={skill} className="text-xs rounded-full px-2 py-1 bg-muted text-muted-foreground">
                {skill}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <Tooltip content="GitHub" position="top" distance={4}>
              <a
                href={FOOTER_DATA.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
            </Tooltip>
            <Tooltip content="LinkedIn" position="top" distance={4}>
              <a
                href={FOOTER_DATA.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </Tooltip>
            <Tooltip content="Email" position="top" distance={4}>
              <a
                href={`mailto:${FOOTER_DATA.social.email}`}
                aria-label="Email"
                className="hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </Tooltip>
            <Tooltip content="Telegram" position="top" distance={4}>
              <a
                href={FOOTER_DATA.social.telegram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="hover:text-primary transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </Tooltip>
          </div>
        </div>
      </div>

      <div className="border-t pt-4 pb-6">
        <div className="max-w-6xl mx-auto flex items-center justify-center text-sm text-muted-foreground">
          <p>
            © {currentYear} <Link href="/" className="hover:text-primary font-semibold transition-colors">Thibaut MILVILLE</Link>. {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}


