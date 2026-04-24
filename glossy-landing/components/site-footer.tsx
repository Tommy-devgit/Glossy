import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "Story" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-white/10 py-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 md:flex-row md:items-end md:justify-between md:px-8">
        <div className="max-w-md">
          <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/70">Glossy Studio</p>
          <h2 className="mt-3 text-2xl text-white">Handcrafted resin art for your most meaningful photographs.</h2>
          <p className="mt-4 text-sm text-white/60">Designed, poured, and polished in small-batch production.</p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="glass-panel px-4 py-2 text-white/75 hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
