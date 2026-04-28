import type { Metadata } from "next";
import { AboutPageContent } from "@/components/pages/about-page-content";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Glossy Atelier, the craftsmanship behind each piece, and the services, pricing, and process offered by the studio.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
