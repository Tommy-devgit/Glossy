import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { serviceOptions } from "@/lib/site-data";

const addOns = [
  "Premium edge polishing",
  "Triptych creative layout",
  "Personalized inscription plate",
  "Gift-ready luxury wrapping",
  "Interior designer consultation",
  "Express production priority",
];

export const metadata: Metadata = {
  title: "Services",
  description: "Discover Glossy epoxy artwork services, formats, and premium customization options.",
};

export default function ServicesPage() {
  return (
    <section className="section-wrap py-14 md:py-20">
      <Reveal>
        <p className="eyebrow">Services</p>
        <h1 className="mt-3 max-w-3xl text-4xl text-white md:text-6xl">Luxury epoxy artwork tailored to your memory.</h1>
      </Reveal>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {serviceOptions.map((service, index) => (
          <Reveal key={service.title} delay={index * 0.08}>
            <article className="glow-card glass-panel h-full rounded-3xl p-7">
              <p className="eyebrow">Turnaround {service.turnaround}</p>
              <h2 className="mt-3 text-3xl text-white">{service.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/72">{service.description}</p>
              <ul className="mt-5 space-y-2 text-sm text-white/78">
                {service.highlights.map((item) => (
                  <li key={item}>+ {item}</li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
        <Reveal>
          <article className="glass-panel glow-card rounded-3xl p-7 md:p-9">
            <p className="eyebrow">Custom Options</p>
            <h3 className="mt-3 text-3xl text-white">Elevate your artwork with studio add-ons</h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {addOns.map((option) => (
                <p key={option} className="rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-white/78">
                  {option}
                </p>
              ))}
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.08}>
          <article className="glass-panel rounded-3xl p-7 md:p-9">
            <h3 className="text-3xl text-white">Need a bespoke commission?</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/72">
              For oversized walls, multi-piece installations, or high-value family archives, our studio team prepares a
              custom production brief with timeline and material recommendations.
            </p>
            <Link href="/contact" className="button-primary mt-6">
              Book Consultation
            </Link>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
