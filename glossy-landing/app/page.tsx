import type { Metadata } from "next";
import { HomePageContent } from "@/components/pages/home-page-content";

export const metadata: Metadata = {
  title: "Home",
  description: "Discover handcrafted photo artworks by glossy, finished with a luminous surface that preserves cherished moments beautifully.",
};

export default function Home() {
  return <HomePageContent />;
}
