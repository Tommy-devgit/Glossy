"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigationLinks } from "@/lib/site-data";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50">
      <div className="section-wrap pt-4 md:pt-6">
        <div className="paper-panel flex items-center justify-between rounded-full px-4 py-3 md:px-6">
          <Link href="/" className="text-sm font-semibold tracking-[0.3em] text-[var(--foreground)] uppercase">
            Glossy
          </Link>

          <nav className="hidden items-center gap-1 rounded-full border border-[var(--line)] bg-white/55 p-1 md:flex">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm ${
                  isActive(link.href) ? "bg-[var(--foreground)] text-[#fff8ef]" : "text-[rgba(36,22,15,0.7)] hover:bg-white hover:text-[var(--foreground)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link href="/contact" className="button-primary text-sm">
              Book a Call
            </Link>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation"
            className="inline-flex rounded-full border border-[var(--line)] bg-white/70 px-4 py-2 text-sm md:hidden"
            onClick={() => setMenuOpen((state) => !state)}
          >
            Menu
          </button>
        </div>

        {menuOpen ? (
          <nav className="paper-panel mt-3 grid gap-2 rounded-[1.75rem] p-4 md:hidden">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-3 text-sm ${
                  isActive(link.href) ? "bg-[var(--foreground)] text-[#fff8ef]" : "bg-white/70 text-[rgba(36,22,15,0.76)]"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact" className="button-primary mt-2" onClick={() => setMenuOpen(false)}>
              Book a Call
            </Link>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
