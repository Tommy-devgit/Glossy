import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { processSteps } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Process",
  description: "Understand the 3-step Glossy process from upload to crafting and delivery.",
};

export default function ProcessPage() {
  return (
    <section className="section-wrap py-14 md:py-20">
      <Reveal>
        <p className="eyebrow">Process</p>
        <h1 className="mt-3 max-w-3xl text-4xl text-white md:text-6xl">From upload to delivery in three precise steps.</h1>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {processSteps.map((step, index) => (
          <Reveal key={step.step} delay={index * 0.1}>
            <article className="glass-panel glow-card relative h-full rounded-3xl p-7">
              <p className="text-6xl font-semibold leading-none text-white/13">{step.step}</p>
              <h2 className="mt-3 text-3xl text-white">{step.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/72">{step.description}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-8">
        <article className="glass-panel rounded-3xl p-7 md:flex md:items-center md:justify-between md:gap-8 md:p-9">
          <div className="max-w-2xl">
            <p className="eyebrow">Need help choosing format?</p>
            <h3 className="mt-2 text-3xl text-white">Our team can recommend the right size, style, and finish.</h3>
            <p className="mt-4 text-sm text-white/72">Get a personalized recommendation before submitting your order.</p>
          </div>
          <Link href="/contact" className="button-primary mt-6 md:mt-0">
            Contact Studio
          </Link>
        </article>
      </Reveal>
    </section>
  );
}
