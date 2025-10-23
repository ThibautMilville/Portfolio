import './globals.css';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Navigation from '@/components/Navigation';
import { ThemeProvider } from '@/components/ThemeProvider';
import { IMAGES } from '@/lib/images';
import Footer from '@/components/Footer';
import StructuredData from '@/components/StructuredData';
import BackToTop from '@/components/BackToTop';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'], 
  variable: '--font-mono' 
});

export const metadata: Metadata = {
  title: 'Thibaut MILVILLE - Développeur Fullstack React & Next.js | Portfolio',
  description: 'Développeur Fullstack spécialisé en React, Next.js et NestJS. Créateur d\'applications web modernes et performantes. Découvrez mes projets, compétences et expériences professionnelles.',
  keywords: [
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
    locale: 'fr_FR',
    url: 'https://thibaut-milville.dev',
    title: 'Thibaut MILVILLE - Développeur Fullstack React & Next.js',
    description: 'Développeur Fullstack spécialisé en React, Next.js et NestJS. Créateur d\'applications web modernes et performantes.',
    siteName: 'Portfolio Thibaut MILVILLE',
    images: [
      {
        url: '/images/photo_profil.png',
        width: 1200,
        height: 630,
        alt: 'Thibaut MILVILLE - Développeur Fullstack',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thibaut MILVILLE - Développeur Fullstack React & Next.js',
    description: 'Développeur Fullstack spécialisé en React, Next.js et NestJS. Créateur d\'applications web modernes et performantes.',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body id="top" className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
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
      </body>
    </html>
  );
}