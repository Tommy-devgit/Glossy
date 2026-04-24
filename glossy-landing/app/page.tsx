import type { Metadata } from "next";
import Link from "next/link";
import { LiquidBackground } from "@/components/liquid-background";
import { Reveal } from "@/components/reveal";
import { galleryItems, serviceOptions, testimonials } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Home",
  description: "Luxury epoxy-coated memory art with a cinematic handcrafted finish.",
};

export default function Home() {
  return (
    <>
      <section className="section-wrap relative pt-8 pb-20 md:pt-14 md:pb-24">
        <div className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-[#080810]">
          <LiquidBackground />
          <div className="relative z-10 px-6 py-20 md:px-14 md:py-24">
            <Reveal>
              <p className="eyebrow">Luxury Memory Preservation</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-5 max-w-4xl text-4xl leading-tight text-white sm:text-5xl md:text-7xl">
                Preserve Your Most Precious Moments In Liquid Glass
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/72 md:text-lg">
                Glossy transforms your photos into handcrafted epoxy-coated artwork designed to glow with depth,
                emotion, and timeless elegance.
              </p>
            </Reveal>

            <Reveal delay={0.3} className="mt-10 flex flex-wrap gap-4">
              <Link href="/order" className="button-primary">
                Start Order
              </Link>
              <Link href="/gallery" className="button-secondary">
                Explore Gallery
              </Link>
            </Reveal>

            <Reveal delay={0.4} className="mt-12 grid gap-4 sm:grid-cols-3">
              <article className="glass-panel rounded-2xl p-4">
                <p className="text-2xl text-white">10k+</p>
                <p className="mt-1 text-sm text-white/65">Memory artworks delivered</p>
              </article>
              <article className="glass-panel rounded-2xl p-4">
                <p className="text-2xl text-white">4.9/5</p>
                <p className="mt-1 text-sm text-white/65">Client satisfaction average</p>
              </article>
              <article className="glass-panel rounded-2xl p-4">
                <p className="text-2xl text-white">48h</p>
                <p className="mt-1 text-sm text-white/65">Design consultation turnaround</p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-wrap pb-16 md:pb-20">
        <Reveal>
          <p className="eyebrow">Signature Services</p>
          <h2 className="mt-3 text-3xl text-white md:text-5xl">Premium epoxy creations</h2>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {serviceOptions.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.08}>
              <article className="glow-card glass-panel h-full rounded-3xl p-6">
                <p className="eyebrow">{service.turnaround}</p>
                <h3 className="mt-3 text-2xl text-white">{service.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/70">{service.description}</p>
                <ul className="mt-5 space-y-2 text-sm text-white/78">
                  {service.highlights.map((item) => (
                    <li key={item}>+ {item}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-wrap pb-16 md:pb-20">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Curated Gallery</p>
              <h2 className="mt-3 text-3xl text-white md:text-5xl">A glimpse of handcrafted finishes</h2>
            </div>
            <Link href="/gallery" className="button-secondary hidden md:inline-flex">
              View Full Gallery
            </Link>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {galleryItems.slice(0, 4).map((item, index) => (
            <Reveal key={item.id} delay={index * 0.08}>
              <article
                className="shimmer-tile glow-card relative min-h-[17rem] overflow-hidden rounded-3xl border border-white/15 p-6"
                style={{ backgroundImage: item.palette }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(11,11,12,.95),transparent_55%)]" />
                <div className="relative mt-24">
                  <p className="eyebrow">{item.category}</p>
                  <h3 className="mt-2 text-2xl text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-white/70">
                    {item.size} | {item.finish}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-wrap pb-20 md:pb-28">
        <Reveal>
          <p className="eyebrow">Testimonials</p>
          <h2 className="mt-3 text-3xl text-white md:text-5xl">What our clients feel when unboxing Glossy</h2>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.08}>
              <blockquote className="glass-panel glow-card h-full rounded-3xl p-6">
                <p className="text-base leading-relaxed text-white/80">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <footer className="mt-6 text-sm text-cyan-100/90">
                  {item.name} - {item.city}
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <div className="glass-panel rounded-3xl p-8 md:flex md:items-center md:justify-between">
            <div>
              <p className="eyebrow">Ready to preserve your memory?</p>
              <h3 className="mt-2 text-2xl text-white md:text-3xl">Start your custom resin artwork today.</h3>
            </div>
            <Link href="/order" className="button-primary mt-5 md:mt-0">
              Start Order
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
