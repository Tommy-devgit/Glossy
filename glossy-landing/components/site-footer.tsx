import Link from "next/link";
import { navigationLinks } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="section-wrap pb-10 pt-20 md:pb-14">
      <div className="paper-panel rounded-[2rem] px-6 py-8 md:px-10 md:py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">Glossy Atelier</p>
            <h2 className="mt-3 text-3xl text-[var(--foreground)] md:text-4xl">
              Curated art stories for spaces that prefer atmosphere over noise.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-[var(--muted)]">
              Built as an editorial gallery landing page with warm tones, placeholder artworks from Unsplash, and a
              calmer navigation structure.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {navigationLinks.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-full border border-[var(--line)] bg-white/70 px-4 py-2 text-sm text-[rgba(36,22,15,0.76)]">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
