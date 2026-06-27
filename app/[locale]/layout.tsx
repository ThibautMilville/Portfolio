import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import BackToTop from "@/components/BackToTop";
import Chatbot from "@/components/Chatbot";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import StructuredData from "@/components/StructuredData";
import { ThemeProvider } from "@/components/ThemeProvider";
import { IMAGES } from "@/lib/images";
import { getSiteMetadata } from "@/lib/seo";

const locales = ["en", "fr"];

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700", "800"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    ...getSiteMetadata(locale),
    icons: {
      icon: IMAGES.favicon,
      apple: IMAGES.appleTouchIcon,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as (typeof locales)[number])) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        id="top"
        className={`${inter.variable} ${jetbrainsMono.variable} ${plusJakartaSans.variable} font-sans antialiased`}
      >
        <StructuredData locale={locale} />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange={false}
          >
            <Navigation />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <BackToTop />
            <Chatbot />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
