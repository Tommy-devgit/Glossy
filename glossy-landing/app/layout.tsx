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
  metadataBase: new URL("https://glossy.art"),
  title: {
    default: "Glossy | Resin Memory Art",
    template: "%s | Glossy",
  },
  description:
    "Glossy transforms your personal photos into handcrafted epoxy-coated artwork with a glass-like luxury finish.",
  keywords: [
    "epoxy art",
    "resin photo print",
    "luxury wall art",
    "memory preservation",
    "handcrafted resin artwork",
  ],
  openGraph: {
    title: "Glossy",
    description: "Luxury resin-coated photo artwork for lasting memories.",
    siteName: "Glossy",
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
      <body className="min-h-full overflow-x-hidden text-white">
        <div className="site-bg" aria-hidden />
        <div className="relative z-10 flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
