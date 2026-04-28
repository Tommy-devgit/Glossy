"use client";

import Link from "next/link";
import { navigationLinks } from "@/lib/site-data";
import { translations } from "@/lib/translations";
import { useSitePreferences } from "@/components/site-preferences-provider";

export function SiteFooter() {
  const { locale } = useSitePreferences();
  const copy = translations[locale].footer;
  const navLabels: Record<string, string> = {
    "/": translations[locale].nav.home,
    "/about": translations[locale].nav.about,
    "/gallery": translations[locale].nav.gallery,
    "/contact": translations[locale].nav.contact,
  };

  return (
    <footer className="section-wrap pb-10 pt-20 md:pb-14">
      <div className="paper-panel rounded-[2rem] px-6 py-10 md:px-10 md:py-12">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_.75fr_.75fr_.75fr]">
          <div className="max-w-xl">
            <p className="eyebrow">{copy.brand}</p>
            <h2 className="mt-3 text-3xl text-[var(--foreground)] md:text-4xl">{copy.headline}</h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-[var(--muted)]">{copy.body}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {copy.socialItems.map((social) => (
                <a
                  key={social}
                  href={
                    social === "Instagram"
                      ? "https://instagram.com"
                      : social === "Pinterest"
                        ? "https://pinterest.com"
                        : "https://wa.me"
                  }
                  className="rounded-full border border-[var(--line)] bg-[var(--chip-surface)] px-4 py-2 text-sm text-[var(--soft-text)]"
                  target="_blank"
                  rel="noreferrer"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow">{copy.navigation}</p>
            <div className="mt-4 grid gap-3">
              {navigationLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm text-[var(--soft-text)] hover:text-[var(--foreground)]">
                  {navLabels[link.href] ?? link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow">{copy.services}</p>
            <div className="mt-4 grid gap-3">
              {copy.serviceItems.map((item) => (
                <p key={item} className="text-sm text-[var(--soft-text)]">
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow">{copy.contact}</p>
            <div className="mt-4 grid gap-3 text-sm text-[var(--soft-text)]">
              <a href="mailto:hello@glossyatelier.com" className="hover:text-[var(--foreground)]">
                hello@glossyatelier.com
              </a>
              <a href="tel:+251911000000" className="hover:text-[var(--foreground)]">
                +251 91 100 0000
              </a>
              <p>Addis Ababa, Ethiopia</p>
            </div>
          </div>
        </div>

        <div className="soft-divider mt-10" />
        <div className="mt-6 flex flex-col gap-3 text-sm text-[var(--soft-text)] md:flex-row md:items-center md:justify-between">
          <p>{copy.brand}</p>
          <p>© 2026 {copy.brand}. {copy.rights}</p>
        </div>
      </div>
    </footer>
  );
}
