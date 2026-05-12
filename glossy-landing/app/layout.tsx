import type { Metadata } from "next";
import { SitePreferencesProvider } from "@/components/site-preferences-provider";
import { Manrope, Parisienne, Sora } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ToastProvider } from "@/components/toast-provider";
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

const parisienne = Parisienne({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://glossyatelier.com"),
  title: {
    default: "glossy | Handcrafted Gloss-Finished Photo Art",
    template: "%s | glossy",
  },
  description: "glossy transforms treasured photographs into handcrafted artworks with depth, clarity, and a luminous finish.",
  keywords: ["photo art", "luxury photo artwork", "epoxy photo art", "gloss-finished artwork", "custom portrait art"],
  openGraph: {
    title: "glossy",
    description: "Handcrafted photo artworks with a luminous finish, created to preserve personal memories as lasting art.",
    siteName: "glossy",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${manrope.variable} ${parisienne.variable} h-full antialiased`}>
      <body className="min-h-full overflow-x-hidden text-[var(--foreground)]">
        <SitePreferencesProvider>
          <ToastProvider>
            <div className="relative z-10 flex min-h-screen flex-col">
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
          </ToastProvider>
        </SitePreferencesProvider>
      </body>
    </html>
  );
}
