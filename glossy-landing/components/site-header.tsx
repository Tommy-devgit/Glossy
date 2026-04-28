"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigationLinks } from "@/lib/site-data";
import { translations } from "@/lib/translations";
import { useSitePreferences } from "@/components/site-preferences-provider";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { locale, theme, setLocale, setTheme } = useSitePreferences();
  const copy = translations[locale].nav;

  const isActive = (href: string) => pathname === href;
  const navLabels: Record<string, string> = {
    "/": copy.home,
    "/about": copy.about,
    "/gallery": copy.gallery,
    "/contact": copy.contact,
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="section-wrap pt-4 md:pt-6">
        <div className="paper-panel flex items-center justify-between rounded-full px-4 py-3 md:px-6">
          <Link href="/" className="text-sm font-semibold tracking-[0.3em] text-[var(--foreground)] uppercase">
            Glossy Atelier
          </Link>

          <nav className="hidden items-center gap-1 rounded-full border border-[var(--line)] bg-[var(--nav-surface)] p-1 md:flex">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm ${
                  isActive(link.href)
                    ? "bg-[var(--foreground)] text-[var(--background)]"
                    : "text-[var(--soft-text)] hover:bg-[var(--chip-surface)] hover:text-[var(--foreground)]"
                }`}
              >
                {navLabels[link.href] ?? link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <div className="flex items-center rounded-full border border-[var(--line)] bg-[var(--nav-surface)] p-1">
              <button
                type="button"
                className={`rounded-full px-3 py-2 text-xs ${theme === "light" ? "bg-[var(--foreground)] text-[var(--background)]" : "text-[var(--soft-text)]"}`}
                onClick={() => setTheme("light")}
              >
                {copy.themeLight}
              </button>
              <button
                type="button"
                className={`rounded-full px-3 py-2 text-xs ${theme === "dark" ? "bg-[var(--foreground)] text-[var(--background)]" : "text-[var(--soft-text)]"}`}
                onClick={() => setTheme("dark")}
              >
                {copy.themeDark}
              </button>
            </div>

            <div className="flex items-center rounded-full border border-[var(--line)] bg-[var(--nav-surface)] p-1">
              <button
                type="button"
                className={`rounded-full px-3 py-2 text-xs ${locale === "en" ? "bg-[var(--foreground)] text-[var(--background)]" : "text-[var(--soft-text)]"}`}
                onClick={() => setLocale("en")}
              >
                {copy.languageEn}
              </button>
              <button
                type="button"
                className={`rounded-full px-3 py-2 text-xs ${locale === "am" ? "bg-[var(--foreground)] text-[var(--background)]" : "text-[var(--soft-text)]"}`}
                onClick={() => setLocale("am")}
              >
                {copy.languageAm}
              </button>
            </div>

            <Link href="/contact" className="button-primary text-sm">
              {copy.cta}
            </Link>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation"
            className="inline-flex rounded-full border border-[var(--line)] bg-[var(--chip-surface)] px-4 py-2 text-sm text-[var(--soft-text)] md:hidden"
            onClick={() => setMenuOpen((state) => !state)}
          >
            {copy.menu}
          </button>
        </div>

        {menuOpen ? (
          <nav className="paper-panel mt-3 grid gap-2 rounded-[1.75rem] p-4 md:hidden">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-3 text-sm ${
                  isActive(link.href)
                    ? "bg-[var(--foreground)] text-[var(--background)]"
                    : "bg-[var(--chip-surface)] text-[var(--soft-text)]"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {navLabels[link.href] ?? link.label}
              </Link>
            ))}
            <div className="mt-2 grid gap-2 rounded-[1.5rem] border border-[var(--line)] bg-[var(--nav-surface)] p-3">
              <div className="flex items-center rounded-full border border-[var(--line)] p-1">
                <button
                  type="button"
                  className={`flex-1 rounded-full px-3 py-2 text-xs ${theme === "light" ? "bg-[var(--foreground)] text-[var(--background)]" : "text-[var(--soft-text)]"}`}
                  onClick={() => setTheme("light")}
                >
                  {copy.themeLight}
                </button>
                <button
                  type="button"
                  className={`flex-1 rounded-full px-3 py-2 text-xs ${theme === "dark" ? "bg-[var(--foreground)] text-[var(--background)]" : "text-[var(--soft-text)]"}`}
                  onClick={() => setTheme("dark")}
                >
                  {copy.themeDark}
                </button>
              </div>

              <div className="flex items-center rounded-full border border-[var(--line)] p-1">
                <button
                  type="button"
                  className={`flex-1 rounded-full px-3 py-2 text-xs ${locale === "en" ? "bg-[var(--foreground)] text-[var(--background)]" : "text-[var(--soft-text)]"}`}
                  onClick={() => setLocale("en")}
                >
                  {copy.languageEn}
                </button>
                <button
                  type="button"
                  className={`flex-1 rounded-full px-3 py-2 text-xs ${locale === "am" ? "bg-[var(--foreground)] text-[var(--background)]" : "text-[var(--soft-text)]"}`}
                  onClick={() => setLocale("am")}
                >
                  {copy.languageAm}
                </button>
              </div>
            </div>

            <Link href="/contact" className="button-primary mt-2" onClick={() => setMenuOpen(false)}>
              {copy.cta}
            </Link>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
