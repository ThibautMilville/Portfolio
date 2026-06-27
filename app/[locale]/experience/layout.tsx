import type { Metadata } from "next";
import { createStaticPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return createStaticPageMetadata("experiences", locale);
}

export default function ExperienceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
