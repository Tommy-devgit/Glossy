import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "About",
  description: "Learn the story behind Glossy and our handcrafted epoxy art process.",
};

export default function AboutPage() {
  return (
    <section className="section-wrap py-14 md:py-20">
      <Reveal>
        <p className="eyebrow">Our Story</p>
        <h1 className="mt-3 max-w-3xl text-4xl text-white md:text-6xl">We built Glossy to make memories physically timeless.</h1>
      </Reveal>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <Reveal>
          <article className="glass-panel glow-card rounded-3xl p-7 md:p-10">
            <h2 className="text-3xl text-white">Brand origin</h2>
            <p className="mt-4 text-base leading-relaxed text-white/72">
              Glossy began after restoring a faded family photograph that had survived decades but lost its emotional
              depth. We imagined a process that could protect photos from time while giving them the visual richness of
              gallery art. That idea became a dedicated resin studio focused on heirloom-quality memory pieces.
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/72">
              Today, every order is treated as a personal story. Weddings, milestone portraits, travel moments, and
              heritage photographs are transformed by hand using layered craft techniques and controlled epoxy curing.
            </p>
          </article>
        </Reveal>

        <Reveal delay={0.08}>
          <article className="glass-panel glow-card rounded-3xl p-7 md:p-10">
            <p className="eyebrow">Craftsmanship</p>
            <h2 className="mt-3 text-3xl text-white">A slow process by design</h2>
            <ul className="mt-6 space-y-4 text-sm leading-relaxed text-white/75">
              <li>+ Color correction tuned for resin depth and long-term UV resilience.</li>
              <li>+ Precision print mounting that avoids micro-bubbles and edge warp.</li>
              <li>+ Hand-poured epoxy layers polished to a crystal-like glass finish.</li>
              <li>+ Multi-point inspection before final curing and shipping.</li>
            </ul>
          </article>
        </Reveal>
      </div>

      <Reveal className="mt-8">
        <article className="glass-panel rounded-3xl p-7 md:flex md:items-center md:justify-between md:gap-8 md:p-10">
          <div className="max-w-3xl">
            <p className="eyebrow">Why it matters</p>
            <h3 className="mt-3 text-3xl text-white">A memory should feel alive every time you look at it.</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/72">
              We are not printing software and we are not mass production. Glossy is a physical studio of artists and
              finish specialists preserving emotional moments through handcrafted resin art.
            </p>
          </div>
          <Link href="/order" className="button-primary mt-6 md:mt-0">
            Start Your Piece
          </Link>
        </article>
      </Reveal>
    </section>
  );
}
