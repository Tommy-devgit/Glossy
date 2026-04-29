"use client";

import { GalleryFilter } from "@/components/gallery-filter";
import { Reveal } from "@/components/reveal";
import { useSitePreferences } from "@/components/site-preferences-provider";
import { translations } from "@/lib/translations";

export function GalleryPageContent() {
  const { locale } = useSitePreferences();
  const copy = translations[locale].gallery;

  return (
    <section className="section-wrap py-8 md:py-10">
      <Reveal>
        <div className="paper-panel rounded-[2rem] px-6 py-9 md:px-9 md:py-12">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl md:text-5xl">{copy.title}</h1>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-[var(--muted)] md:text-base">{copy.intro}</p>
        </div>
      </Reveal>

      <Reveal className="mt-8">
        <div className="paper-panel rounded-[2rem] p-6 md:p-8">
          <GalleryFilter />
        </div>
      </Reveal>
    </section>
  );
}
