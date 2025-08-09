'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Home, GraduationCap, Briefcase, Code2, Mail, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { LocalImage } from '@/components/ui/image';

const messages = {
  fr: { home: 'Accueil', formations: 'Formations', experiences: 'Expériences', projects: 'Projets', contact: 'Contact' },
  en: { home: 'Home', formations: 'Education', experiences: 'Experience', projects: 'Projects', contact: 'Contact' },
} as const;

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [locale, setLocale] = useState<'fr' | 'en'>('en');
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('locale');
      if (stored === 'fr' || stored === 'en') setLocale(stored);
      else setLocale((navigator.language || 'en').toLowerCase().startsWith('fr') ? 'fr' : 'en');
    } catch {}
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
          scrolled
            ? "bg-background/90 backdrop-blur-lg border-b border-border/50"
            : "bg-gradient-to-b from-background/20 to-transparent backdrop-blur-sm"
        )}
      >
        <nav className="max-w-6xl mx-auto px-6 py-4">
          <div className="grid grid-cols-[auto,1fr,auto] items-center">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="justify-self-start"
            >
              <Link href="/" className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <LocalImage
                    imageName="photo_profil.jpg"
                    alt="Thibaut Milville"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation (grid centered) */}
            <motion.div 
              className="hidden md:flex items-center space-x-8 justify-self-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            >
              {[
                { href: '/', label: messages[locale].home, icon: Home },
                { href: '/formations', label: messages[locale].formations, icon: GraduationCap },
                { href: '/experiences', label: messages[locale].experiences, icon: Briefcase },
                { href: '/projets', label: messages[locale].projects, icon: Code2 },
                { href: '/contact', label: messages[locale].contact, icon: Mail },
              ].map((item, index) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1, ease: "easeOut" }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 text-sm font-medium transition-colors relative py-2 hover:scale-105",
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary rounded-full"
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Language & Theme & Mobile Menu */}
            <motion.div 
              className="flex items-center gap-4 justify-self-end"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
            >
              {/* Language Switcher (desktop) */}
              <div className="hidden md:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="h-9 w-[72px] rounded-full px-3 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none">
                      <span className="mr-2">{locale === 'fr' ? '🇫🇷' : '🇬🇧'}</span>
                      <span className="text-xs font-medium">{locale.toUpperCase()}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" sideOffset={6} className="w-fit min-w-[96px] text-center">
                    <DropdownMenuItem className="justify-center" onClick={() => { setLocale('fr'); try { localStorage.setItem('locale','fr'); } catch {}; try { (document.activeElement as HTMLElement)?.blur?.(); } catch {} }}>
                      <span className="mr-2">🇫🇷</span> <span>Français</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="justify-center" onClick={() => { setLocale('en'); try { localStorage.setItem('locale','en'); } catch {}; try { (document.activeElement as HTMLElement)?.blur?.(); } catch {} }}>
                      <span className="mr-2">🇬🇧</span> <span>English</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="h-9 w-9 hover:scale-110 transition-transform duration-200"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                className="md:hidden h-9 w-9 hover:scale-110 transition-transform duration-200"
              >
                {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </motion.div>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-background border-t"
            >
              <div className="px-6 py-4 space-y-2">
                {[
                  { href: '/', label: messages[locale].home, icon: Home },
                  { href: '/formations', label: messages[locale].formations, icon: GraduationCap },
                  { href: '/experiences', label: messages[locale].experiences, icon: Briefcase },
                  { href: '/projets', label: messages[locale].projects, icon: Code2 },
                  { href: '/contact', label: messages[locale].contact, icon: Mail },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={toggleMenu}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer pour éviter que le contenu passe sous la navigation */}
      <div className="h-20" />
    </>
  );
}