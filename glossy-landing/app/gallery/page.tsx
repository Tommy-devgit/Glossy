import type { Metadata } from "next";
import { GalleryPageContent } from "@/components/pages/gallery-page-content";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse the Glossy Atelier gallery and see how personal photographs are transformed into polished, light-filled artworks.",
};

export default function GalleryPage() {
  return <GalleryPageContent />;
}
