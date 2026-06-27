import type { Metadata } from "next";
import { createStaticPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return createStaticPageMetadata("formations", locale);
}

export default function EducationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
