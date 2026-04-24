"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigationLinks } from "@/lib/site-data";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0b0c]/65 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link href="/" className="text-lg font-semibold tracking-[0.2em] text-white">
          GLOSSY
        </Link>

        <button
          type="button"
          aria-label="Toggle navigation"
          className="inline-flex rounded-full border border-white/20 px-4 py-2 text-sm text-white md:hidden"
          onClick={() => setMenuOpen((state) => !state)}
        >
          Menu
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-2 text-sm transition ${
                isActive(link.href)
                  ? "bg-white/15 text-white"
                  : "text-white/75 hover:bg-white/10 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/order" className="button-primary ml-2 text-sm">
            Start Order
          </Link>
        </nav>
      </div>

      {menuOpen ? (
        <nav className="border-t border-white/10 px-5 py-4 md:hidden">
          <div className="grid gap-2">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-2xl px-4 py-2 text-sm transition ${
                  isActive(link.href)
                    ? "bg-white/15 text-white"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/order" className="button-primary mt-2 text-sm" onClick={() => setMenuOpen(false)}>
              Start Order
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
