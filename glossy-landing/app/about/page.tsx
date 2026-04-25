import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { pricingTiers, processSteps, studioOfferings } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About",
  description: "A single about page that now carries the studio story, services, pricing, and process in one place.",
};

export default function AboutPage() {
  return (
    <section className="section-wrap py-8 md:py-10">
      <Reveal>
        <div className="paper-panel rounded-[2.5rem] px-6 py-10 md:px-10 md:py-14">
          <p className="eyebrow">About Glossy Atelier</p>
          <h1 className="mt-4 max-w-4xl text-5xl md:text-7xl">One page for the story, the offering, the pricing, and the process.</h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
            The site no longer separates services, pricing, process, and brand background into disconnected routes.
            This page carries all of that information in one editorial flow so the experience feels closer to a gallery
            brochure than a set of sales pages.
          </p>
        </div>
      </Reveal>

      <div className="mt-8 grid gap-8">
        <Reveal>
          <section className="paper-panel rounded-[2rem] p-6 md:p-8">
            <div className="max-w-3xl">
              <p className="eyebrow">Studio Story</p>
              <h2 className="mt-3 text-4xl">Designed to feel like a quieter, more considered art company.</h2>
              <p className="mt-5 text-sm leading-relaxed text-[var(--muted)] md:text-base">
                The new direction favors warm paper tones, framed imagery, generous spacing, and softer editorial copy.
                Instead of pushing visitors immediately toward an order funnel, the site now introduces the collection,
                explains the studio's role, and invites conversation in a calmer sequence.
              </p>
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.08}>
          <section className="paper-panel rounded-[2rem] p-6 md:p-8">
            <p className="eyebrow">Services</p>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {studioOfferings.map((offering) => (
                <article key={offering.title} className="paper-card rounded-[1.5rem] p-5">
                  <span className="label-chip">{offering.note}</span>
                  <h2 className="mt-4 text-3xl">{offering.title}</h2>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">{offering.description}</p>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.12}>
          <section className="paper-panel rounded-[2rem] p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow">Pricing</p>
                <h2 className="mt-3 text-4xl">Clear starting points for different project scales.</h2>
              </div>
              <p className="max-w-xl text-sm leading-relaxed text-[var(--muted)]">
                These tiers are presented more like advisory packages than product cards, which fits the new tone much
                better than the previous order-led pricing page.
              </p>
            </div>
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {pricingTiers.map((tier) => (
                <article key={tier.name} className="paper-card rounded-[1.5rem] p-5">
                  <p className="eyebrow">{tier.name}</p>
                  <p className="mt-3 text-4xl">{tier.price}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{tier.description}</p>
                  <ul className="mt-5 space-y-2 text-sm text-[rgba(36,22,15,0.78)]">
                    {tier.features.map((feature) => (
                      <li key={feature}>+ {feature}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.16}>
          <section className="paper-panel rounded-[2rem] p-6 md:p-8">
            <p className="eyebrow">Process</p>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {processSteps.map((step) => (
                <article key={step.step} className="paper-card rounded-[1.5rem] p-5">
                  <p className="text-5xl leading-none text-[rgba(36,22,15,0.14)]">{step.step}</p>
                  <h2 className="mt-3 text-3xl">{step.title}</h2>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">{step.description}</p>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.2}>
          <section className="paper-panel rounded-[2rem] p-6 md:flex md:items-center md:justify-between md:gap-8 md:p-8">
            <div className="max-w-3xl">
              <p className="eyebrow">Next Step</p>
              <h2 className="mt-3 text-4xl">If someone likes the collection, they talk to the studio instead of placing an order cold.</h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                That shift is the core structural change across the repo. The contact page is now the main action point,
                while the older utility pages redirect here.
              </p>
            </div>
            <Link href="/contact" className="button-primary mt-6 md:mt-0">
              Contact the Studio
            </Link>
          </section>
        </Reveal>
      </div>
    </section>
  );
}
