import type { Metadata } from "next";
/* import localFont from "next/font/local"; */
import "./globals.css";
import { Anek_Telugu } from "next/font/google";
import { cn } from "@/lib/utils";

const AnekTelugu = Anek_Telugu({ subsets: ["latin"], variable: "--font-caption" });

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Thibaut MILVILLE",
  description: "Portfolio of Thibaut MILVILLE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={cn(geistSans.variable, geistMono.variable, AnekTelugu.variable, "font-sans h-full bg-background text-foreground")}>{children}</body>
    </html>
  );
}

function localFont({ src, variable, weight }: { src: string; variable: string; weight: string; }) {
  return { variable };
}
