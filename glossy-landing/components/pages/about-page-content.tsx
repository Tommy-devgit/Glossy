"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/reveal";
import { useSitePreferences } from "@/components/site-preferences-provider";
import { fetchWorks, type Artwork } from "@/lib/works";
import { processSteps, studioOfferings, telegramOrderUrl } from "@/lib/site-data";
import { translations } from "@/lib/translations";

const ABOUT_IMAGE_LIMIT = 6;
const fallbackAboutImages: Artwork[] = [
  {
    id: "about-fallback-1",
    title: "Finished glossy artwork",
    category: "Art",
    date: "Studio",
    image: "/about-gallery-1.webp",
  },
  {
    id: "about-fallback-2",
    title: "Portrait finish detail",
    category: "Portrait",
    date: "Studio",
    image: "/about-gallery-2.webp",
  },
];

export function AboutPageContent() {
  const { locale } = useSitePreferences();
  const copy = translations[locale].about;
  const [aboutImages, setAboutImages] = useState<Artwork[]>([]);
  const displayImages = aboutImages.length ? aboutImages : fallbackAboutImages;

  useEffect(() => {
    let ignore = false;

    async function loadImages() {
      try {
        const works = await fetchWorks(ABOUT_IMAGE_LIMIT);

        if (!ignore) {
          setAboutImages(works);
        }
      } catch {
        if (!ignore) {
          setAboutImages([]);
        }
      }
    }

    loadImages();

    return () => {
      ignore = true;
    };
  }, []);

  const localizedProcess =
    locale === "am"
      ? [
          { step: "01", title: "Choose the photo", description: "Send the portrait, wedding image, religious piece, or artwork reference you want preserved." },
          { step: "02", title: "We review it", description: "The image is checked for clarity, composition, and the best finish for the final piece." },
          { step: "03", title: "The piece is made", description: "Your work is prepared by hand with a polished surface and display-ready presence." },
          { step: "04", title: "We share the result", description: "Final details, timing, and payment are handled privately through direct messages." },
        ]
      : processSteps;

  return (
    <section className="section-wrap py-7 md:py-9">
      <Reveal>
        <div className="paper-panel rounded-[1.5rem] px-5 py-7 md:px-8 md:py-9">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 className="mt-3 max-w-4xl text-3xl md:text-4xl">{copy.title}</h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--muted)] md:text-base">{copy.intro}</p>
        </div>
      </Reveal>

      <div className="mt-6 grid gap-6">
        <Reveal>
          <section className="paper-panel rounded-[1.5rem] p-5 md:p-6">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="max-w-3xl">
                <p className="eyebrow">{copy.storyEyebrow}</p>
                <h2 className="mt-3 text-2xl md:text-3xl">{copy.storyTitle}</h2>
                <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] md:text-base">{copy.storyText}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {displayImages.slice(0, 4).map((image, index) => (
                  <div
                    key={image.id}
                    className={`art-frame relative overflow-hidden rounded-[1rem] ${index === 0 ? "min-h-56" : "min-h-40"}`}
                  >
                    <Image
                      src={image.image}
                      alt={image.title}
                      fill
                      sizes="(min-width: 1024px) 22vw, 45vw"
                      unoptimized
                      className="rounded-[0.8rem] object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.08}>
          <section className="paper-panel rounded-[1.5rem] p-5 md:p-6">
            <p className="eyebrow">{locale === "am" ? "Services" : "Services"}</p>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {studioOfferings.map((offering) => (
                <article key={offering.title} className="paper-card rounded-[1.25rem] p-5">
                  <span className="label-chip">{offering.note}</span>
                  <h2 className="mt-4 text-xl">{offering.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{offering.description}</p>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.12}>
          <section className="paper-panel rounded-[1.5rem] p-5 md:p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow">Studio Work</p>
                <h2 className="mt-3 text-2xl md:text-3xl">Made for homes, ceremonies, gifts, and personal spaces.</h2>
              </div>
              <p className="max-w-xl text-sm leading-relaxed text-[var(--muted)]">
                We keep pricing and payment details private in direct messages, so each order can match the image, size, finish, and timeline.
              </p>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {displayImages.slice(0, 6).map((image) => (
                <article key={image.id} className="paper-card overflow-hidden rounded-[1.25rem] p-3">
                  <div className="art-frame relative h-52 rounded-[1rem]">
                    <Image
                      src={image.image}
                      alt={image.title}
                      fill
                      sizes="(min-width: 1024px) 20vw, (min-width: 640px) 45vw, 90vw"
                      unoptimized
                      className="rounded-[0.8rem] object-cover"
                    />
                  </div>
                  <div className="px-2 pb-2 pt-3">
                    <h3 className="text-lg">{image.title}</h3>
                    <p className="mt-1 text-xs text-[var(--muted)]">{image.category}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.16}>
          <section className="paper-panel rounded-[1.5rem] p-5 md:p-6">
            <p className="eyebrow">{copy.processEyebrow}</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {localizedProcess.map((step) => (
                <article key={step.step} className="paper-card rounded-[1.25rem] p-5">
                  <p className="text-3xl leading-none text-[color-mix(in_srgb,var(--foreground)_14%,transparent)]">{step.step}</p>
                  <h2 className="mt-3 text-xl">{step.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{step.description}</p>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.2}>
          <section className="paper-panel rounded-[1.5rem] p-5 md:flex md:items-center md:justify-between md:gap-8 md:p-6">
            <div className="max-w-3xl">
              <p className="eyebrow">{copy.nextEyebrow}</p>
              <h2 className="mt-3 text-2xl md:text-3xl">{copy.nextTitle}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{copy.nextText}</p>
            </div>
            <a href={telegramOrderUrl} className="button-primary mt-5 md:mt-0" target="_blank" rel="noreferrer">
              {copy.nextButton}
            </a>
          </section>
        </Reveal>
      </div>
    </section>
  );
}
