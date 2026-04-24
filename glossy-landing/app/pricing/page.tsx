import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { pricingTiers } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Clear pricing tiers for Glossy resin artwork including standard, premium, and custom commissions.",
};

export default function PricingPage() {
  return (
    <section className="section-wrap py-14 md:py-20">
      <Reveal>
        <p className="eyebrow">Pricing</p>
        <h1 className="mt-3 max-w-3xl text-4xl text-white md:text-6xl">Transparent pricing for premium handcrafted quality.</h1>
      </Reveal>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {pricingTiers.map((tier, index) => (
          <Reveal key={tier.name} delay={index * 0.08}>
            <article
              className={`h-full rounded-3xl p-7 ${
                tier.highlighted
                  ? "glow-card border border-cyan-300/35 bg-gradient-to-b from-cyan-200/12 to-violet-400/8"
                  : "glass-panel glow-card"
              }`}
            >
              <p className="eyebrow">{tier.name}</p>
              <p className="mt-3 text-4xl text-white">{tier.price}</p>
              <p className="mt-3 text-sm text-white/72">{tier.description}</p>
              <ul className="mt-6 space-y-2 text-sm text-white/78">
                {tier.features.map((feature) => (
                  <li key={feature}>+ {feature}</li>
                ))}
              </ul>
              <Link href="/order" className="button-primary mt-7">
                Choose {tier.name}
              </Link>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-8">
        <article className="glass-panel rounded-3xl p-7 md:p-9">
          <h2 className="text-3xl text-white">What is always included</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/72">
            Every tier includes premium archival printing, UV-stable resin, hand-finishing, packaging engineered for
            transit safety, and direct support from the Glossy studio team.
          </p>
        </article>
      </Reveal>
    </section>
  );
}
