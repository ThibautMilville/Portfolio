import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import '../globals.css';
import Navigation from '@/components/Navigation';
import { ThemeProvider } from '@/components/ThemeProvider';
import { IMAGES } from '@/lib/images';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import StructuredData from '@/components/StructuredData';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['en', 'fr'];

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'], 
  variable: '--font-mono' 
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const isFrench = locale === 'fr';
  
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    title: isFrench 
      ? 'Thibaut MILVILLE - Développeur Fullstack React & Next.js | Portfolio'
      : 'Thibaut MILVILLE - Fullstack React & Next.js Developer | Portfolio',
    description: isFrench
      ? 'Développeur Fullstack spécialisé en React, Next.js et NestJS. Créateur d\'applications web modernes et performantes. Découvrez mes projets, compétences et expériences professionnelles.'
      : 'Fullstack developer specialized in React, Next.js and NestJS. Creator of modern and performant web applications. Discover my projects, skills and professional experiences.',
    keywords: isFrench
      ? [
          'développeur fullstack',
          'react developer',
          'next.js',
          'nestjs',
          'javascript',
          'typescript',
          'portfolio',
          'développement web',
          'frontend',
          'backend',
          'thibaut milville'
        ]
      : [
          'fullstack developer',
          'react developer',
          'next.js',
          'nestjs',
          'javascript',
          'typescript',
          'portfolio',
          'web development',
          'frontend',
          'backend',
          'thibaut milville'
        ],
    authors: [{ name: 'Thibaut MILVILLE' }],
    creator: 'Thibaut MILVILLE',
    publisher: 'Thibaut MILVILLE',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: isFrench ? 'fr_FR' : 'en_US',
      url: 'https://thibaut-milville.dev',
      title: isFrench
        ? 'Thibaut MILVILLE - Développeur Fullstack React & Next.js'
        : 'Thibaut MILVILLE - Fullstack React & Next.js Developer',
      description: isFrench
        ? 'Développeur Fullstack spécialisé en React, Next.js et NestJS. Créateur d\'applications web modernes et performantes.'
        : 'Fullstack developer specialized in React, Next.js and NestJS. Creator of modern and performant web applications.',
      siteName: isFrench ? 'Portfolio Thibaut MILVILLE' : 'Thibaut MILVILLE Portfolio',
      images: [
        {
          url: '/images/photo_profil.png',
          width: 1200,
          height: 630,
          alt: isFrench ? 'Thibaut MILVILLE - Développeur Fullstack' : 'Thibaut MILVILLE - Fullstack Developer',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isFrench
        ? 'Thibaut MILVILLE - Développeur Fullstack React & Next.js'
        : 'Thibaut MILVILLE - Fullstack React & Next.js Developer',
      description: isFrench
        ? 'Développeur Fullstack spécialisé en React, Next.js et NestJS. Créateur d\'applications web modernes et performantes.'
        : 'Fullstack developer specialized in React, Next.js and NestJS. Creator of modern and performant web applications.',
      images: ['/images/photo_profil.png'],
    },
    icons: {
      icon: IMAGES.favicon,
      apple: IMAGES.favicon,
    },
    alternates: {
      canonical: 'https://thibaut-milville.dev',
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body id="top" className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <StructuredData />
        <NextIntlClientProvider messages={messages}>
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
            <Footer />
            <BackToTop />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
