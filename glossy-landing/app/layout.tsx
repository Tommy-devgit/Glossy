import type { Metadata } from "next";
import { SitePreferencesProvider } from "@/components/site-preferences-provider";
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
    default: "Glossy Atelier | Handcrafted Gloss-Finished Photo Art",
    template: "%s | Glossy Atelier",
  },
  description: "Glossy Atelier transforms treasured photographs into handcrafted artworks with a luminous, glass-like finish.",
  keywords: ["photo art", "luxury photo artwork", "epoxy photo art", "gloss-finished artwork", "custom portrait art"],
  openGraph: {
    title: "Glossy Atelier",
    description: "Handcrafted photo artworks with a luminous finish, created to preserve personal memories as lasting art.",
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
        <SitePreferencesProvider>
          <div className="relative z-10 flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </SitePreferencesProvider>
      </body>
    </html>
  );
}
