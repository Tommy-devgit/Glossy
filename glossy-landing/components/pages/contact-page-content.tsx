"use client";

import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { useSitePreferences } from "@/components/site-preferences-provider";
import { translations } from "@/lib/translations";

export function ContactPageContent() {
  const { locale } = useSitePreferences();
  const copy = translations[locale].contact;

  return (
    <section className="section-wrap py-8 md:py-10">
      <Reveal>
        <div className="paper-panel rounded-[1.5rem] px-5 py-7 md:px-8 md:py-9">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 className="mt-3 max-w-4xl text-3xl md:text-4xl">{copy.title}</h1>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-[var(--muted)] md:text-base">{copy.intro}</p>
        </div>
      </Reveal>

      <Reveal className="mt-8">
        <div className="paper-panel rounded-[1.5rem] p-5 md:p-6">
          <ContactForm />
        </div>
      </Reveal>
    </section>
  );
}
