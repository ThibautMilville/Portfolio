import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";
import { createStaticPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return createStaticPageMetadata("contact", locale);
}

export default function ContactPage() {
  return <ContactSection namespace="Pages.contact" />;
}
