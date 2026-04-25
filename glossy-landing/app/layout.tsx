import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://glossyatelier.com"),
  title: {
    default: "Glossy Atelier | Curated Art Landing Page",
    template: "%s | Glossy",
  },
  description: "A warm editorial landing page for Glossy Atelier, featuring curated art collections, artists, and commissions.",
  keywords: ["art curation", "gallery landing page", "art advisory", "artists", "editorial design"],
  openGraph: {
    title: "Glossy Atelier",
    description: "Curated art, thoughtful collections, and commissioned works for refined spaces.",
    siteName: "Glossy Atelier",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${manrope.variable} h-full antialiased`}>
      <body className="min-h-full overflow-x-hidden text-[var(--foreground)]">
        <div className="relative z-10 flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
