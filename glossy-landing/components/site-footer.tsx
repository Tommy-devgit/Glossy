"use client";

import Link from "next/link";
import { BrandWordmark } from "@/components/brand-wordmark";
import {
  FacebookIcon,
  InstagramIcon,
  PinterestIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "@/components/site-icons";
import { useSitePreferences } from "@/components/site-preferences-provider";
import { navigationLinks } from "@/lib/site-data";
import { translations } from "@/lib/translations";

export function SiteFooter() {
  const { locale } = useSitePreferences();
  const copy = translations[locale].footer;
  const navLabels: Record<string, string> = {
    "/": translations[locale].nav.home,
    "/about": translations[locale].nav.about,
    "/gallery": translations[locale].nav.gallery,
    "/contact": translations[locale].nav.contact,
  };
  const socialLinks = [
    { name: "Instagram", href: "https://instagram.com/glossy", icon: InstagramIcon },
    { name: "Pinterest", href: "https://pinterest.com/glossy", icon: PinterestIcon },
    { name: "WhatsApp", href: "https://wa.me/251911000000", icon: WhatsAppIcon },
    { name: "TikTok", href: "https://tiktok.com/@glossy", icon: TikTokIcon },
    { name: "Facebook", href: "https://facebook.com/glossy", icon: FacebookIcon },
  ];

  return (
    <footer className="section-wrap pb-10 pt-16 md:pb-14">
      <div className="paper-panel rounded-[1.5rem] px-6 py-9 md:px-9 md:py-10">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_.75fr_.75fr_.75fr]">
          <div className="max-w-xl">
            <div className="text-[2.25rem] text-[var(--foreground)] md:text-[2.6rem]">
              <BrandWordmark />
            </div>
            <h2 className="mt-3 text-2xl text-[var(--foreground)] md:text-3xl">{copy.headline}</h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-[var(--muted)]">{copy.body}</p>
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    title={social.name}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--chip-surface)] text-[var(--soft-text)] hover:-translate-y-0.5 hover:bg-[var(--foreground)] hover:text-[var(--background)]"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon className="h-[1.05rem] w-[1.05rem]" />
                  </a>
                );
              })}
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
          <p className="text-[1.7rem] text-[var(--foreground)]">
            <BrandWordmark />
          </p>
          <p>&copy; 2026 {copy.brand}. {copy.rights}</p>
        </div>
      </div>
    </footer>
  );
}
