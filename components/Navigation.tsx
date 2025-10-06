"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Home,
  GraduationCap,
  Briefcase,
  Code2,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { LocalImage } from "@/components/ui/image";
import { FrenchFlagIcon, BritishFlagIcon } from "@/components/ui/flag-icons";
import { FOOTER_DATA } from "@/lib/footer";
import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";

const messages = {
  fr: {
    home: "Accueil",
    formations: "Formations",
    experiences: "Expériences",
    projects: "Projets",
    contact: "Contact",
  },
  en: {
    home: "Home",
    formations: "Education",
    experiences: "Experience",
    projects: "Projects",
    contact: "Contact",
  },
} as const;

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [locale, setLocale] = useState<"fr" | "en">("en");
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fermer le menu mobile au scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isOpen]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("locale");
      if (stored === "fr" || stored === "en") setLocale(stored);
      else
        setLocale(
          (navigator.language || "en").toLowerCase().startsWith("fr")
            ? "fr"
            : "en"
        );
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
          "transition-all duration-500 ease-out",
          scrolled ? "nav-glass-scrolled" : "nav-glass"
        )}
      >
        <div className="nav-glass__inner flex items-center justify-between gap-4">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
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

          {/* Desktop Navigation */}
          <motion.nav
            className="nav-glass__nav hidden md:flex items-center space-x-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            aria-label="Navigation principale"
          >
            {[
              { href: "/", label: messages[locale].home, icon: Home },
              {
                href: "/formations",
                label: messages[locale].formations,
                icon: GraduationCap,
              },
              {
                href: "/experiences",
                label: messages[locale].experiences,
                icon: Briefcase,
              },
              {
                href: "/projets",
                label: messages[locale].projects,
                icon: Code2,
              },
              {
                href: "/contact",
                label: messages[locale].contact,
                icon: Mail,
              },
            ].map((item, index) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.7 + index * 0.1,
                    ease: "easeOut",
                  }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "nav-link-glass flex items-center gap-2 text-sm font-medium relative py-2",
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
          </motion.nav>

          {/* Language & Theme & Mobile Menu */}
          <motion.div
            className="nav-glass__actions flex items-center gap-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          >
            {/* Language Switcher (desktop) */}
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-9 w-[80px] rounded-full px-3 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none bg-background/20 backdrop-blur-sm border-white/20 hover:bg-background/30 transition-all duration-200"
                  >
                    <span className="mr-2">
                      {locale === "fr" ? (
                        <FrenchFlagIcon className="w-5 h-5" />
                      ) : (
                        <BritishFlagIcon className="w-5 h-5" />
                      )}
                    </span>
                    <span className="text-xs font-medium">
                      {locale.toUpperCase()}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  sideOffset={6}
                  className="w-fit min-w-[120px] text-center bg-background/95 backdrop-blur-md border-white/20 z-[99999]"
                >
                  <DropdownMenuItem
                    className="justify-center hover:bg-primary/10 transition-colors"
                    onClick={() => {
                      setLocale("fr");
                      try {
                        localStorage.setItem("locale", "fr");
                      } catch {}
                      try {
                        (document.activeElement as HTMLElement)?.blur?.();
                      } catch {}
                    }}
                  >
                    <span className="mr-2">
                      <FrenchFlagIcon className="w-4 h-4" />
                    </span>
                    <span>Français</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="justify-center hover:bg-primary/10 transition-colors"
                    onClick={() => {
                      setLocale("en");
                      try {
                        localStorage.setItem("locale", "en");
                      } catch {}
                      try {
                        (document.activeElement as HTMLElement)?.blur?.();
                      } catch {}
                    }}
                  >
                    <span className="mr-2">
                      <BritishFlagIcon className="w-4 h-4" />
                    </span>
                    <span>English</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-9 w-9 hover:scale-110 transition-transform duration-200"
              aria-label="Changer le thème"
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
              aria-label="Ouvrir le menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </motion.div>
        </div>
      </motion.header>

      {/* Mobile Navigation - Outside header container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mobile-menu-glass"
            onClick={(e) => {
              // Fermer seulement si on clique sur l'overlay (pas sur le contenu)
              if (e.target === e.currentTarget) {
                toggleMenu();
              }
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
          >
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="mobile-nav-glass"
              onClick={(e) => e.stopPropagation()}
              role="navigation"
              aria-label="Navigation mobile"
            >
              {/* Bouton de fermeture */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                className="mobile-close-button h-10 w-10 hover:scale-110 transition-transform duration-200"
                aria-label="Fermer le menu"
              >
                <X className="h-5 w-5" />
              </Button>
              {[
                { href: "/", label: messages[locale].home, icon: Home },
                {
                  href: "/formations",
                  label: messages[locale].formations,
                  icon: GraduationCap,
                },
                {
                  href: "/experiences",
                  label: messages[locale].experiences,
                  icon: Briefcase,
                },
                {
                  href: "/projets",
                  label: messages[locale].projects,
                  icon: Code2,
                },
                {
                  href: "/contact",
                  label: messages[locale].contact,
                  icon: Mail,
                },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={toggleMenu}
                    className={cn(
                      "nav-link-glass flex items-center justify-center gap-3 px-6 py-4 rounded-lg text-base font-medium transition-all duration-200",
                      isActive
                        ? "bg-primary/20 text-primary border border-primary/30"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/10"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {/* Language Switcher (mobile) */}
              <div className="pt-6 border-t border-white/10 w-full">
                <div className="flex flex-col items-center gap-4">
                  <span className="text-sm text-muted-foreground font-medium">
                    Choisir la langue
                  </span>
                  <div className="flex gap-3 w-full justify-center">
                    <Button
                      variant={locale === "fr" ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setLocale("fr");
                        try {
                          localStorage.setItem("locale", "fr");
                        } catch {}
                      }}
                      className="flex-1 max-w-[120px] h-12 rounded-lg"
                    >
                      <span className="mr-2">
                        <FrenchFlagIcon className="w-4 h-4" />
                      </span>
                      <span className="text-sm font-medium">Français</span>
                    </Button>
                    <Button
                      variant={locale === "en" ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setLocale("en");
                        try {
                          localStorage.setItem("locale", "en");
                        } catch {}
                      }}
                      className="flex-1 max-w-[120px] h-12 rounded-lg"
                    >
                      <span className="mr-2">
                        <BritishFlagIcon className="w-4 h-4" />
                      </span>
                      <span className="text-sm font-medium">English</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Réseaux sociaux */}
              <div className="pt-6 border-t border-white/10 w-full">
                <div className="flex flex-col items-center gap-3">
                  <span className="text-sm text-muted-foreground font-medium">
                    Me suivre
                  </span>
                  <div className="flex items-center gap-4">
                    <a
                      href={FOOTER_DATA.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="hover:text-primary transition-colors p-2 rounded-lg hover:bg-white/10"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a
                      href={FOOTER_DATA.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="hover:text-primary transition-colors p-2 rounded-lg hover:bg-white/10"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href={`mailto:${FOOTER_DATA.social.email}`}
                      aria-label="Email"
                      className="hover:text-primary transition-colors p-2 rounded-lg hover:bg-white/10"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                    <a
                      href={FOOTER_DATA.social.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Telegram"
                      className="hover:text-primary transition-colors p-2 rounded-lg hover:bg-white/10"
                    >
                      <MessageCircle className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer pour éviter que le contenu passe sous la navigation */}
      <div className="h-16 md:h-20" />
    </>
  );
}
