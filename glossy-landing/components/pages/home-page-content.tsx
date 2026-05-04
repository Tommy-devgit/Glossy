"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Reveal } from "@/components/reveal";
import { useSitePreferences } from "@/components/site-preferences-provider";
import { telegramOrderUrl, testimonials } from "@/lib/site-data";
import { translations } from "@/lib/translations";
import { fetchWorks, type Artwork } from "@/lib/works";

const HOME_FETCH_LIMIT = 100;

function FeaturedImage({
  work,
  alt,
  priority = false,
}: {
  work?: Artwork;
  alt: string;
  priority?: boolean;
}) {
  if (!work) {
    return <div className="h-full w-full bg-[linear-gradient(135deg,var(--background-strong),var(--accent-soft))]" />;
  }

  return (
    <Image
      src={work.image}
      alt={alt}
      fill
      sizes="(min-width: 1024px) 50vw, 100vw"
      priority={priority}
      unoptimized
      className="object-cover"
    />
  );
}

function ArtworkStrip({
  title,
  intro,
  works,
}: {
  title: string;
  intro: string;
  works: Artwork[];
}) {
  return (
    <section className="paper-panel rounded-[1.5rem] p-5 md:p-7">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">{title}</p>
          <h2 className="mt-2 text-2xl md:text-3xl">{title}</h2>
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-[var(--muted)]">{intro}</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {works.length ? (
          works.map((work) => (
            <article key={work.id} className="paper-card overflow-hidden rounded-[1.5rem]">
              <div className="art-frame h-56">
                <Image
                  src={work.image}
                  alt={work.title}
                  width={900}
                  height={1125}
                  unoptimized
                  className="h-full w-full rounded-[1rem] object-cover"
                />
              </div>
              <div className="px-4 pb-4 pt-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-[var(--foreground)]">{work.title}</p>
                  <span className="label-chip">{work.date}</span>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="col-span-full rounded-[1.25rem] border border-dashed border-[var(--line)] px-5 py-8 text-center text-sm text-[var(--muted)]">
            No works in this section yet.
          </div>
        )}
      </div>
    </section>
  );
}

export function HomePageContent() {
  const { locale } = useSitePreferences();
  const copy = translations[locale].home;
  const [works, setWorks] = useState<Artwork[]>([]);
  const [isLoadingWorks, setIsLoadingWorks] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function loadWorks() {
      try {
        const nextWorks = await fetchWorks(HOME_FETCH_LIMIT);

        if (!ignore) {
          setWorks(nextWorks);
        }
      } catch {
        if (!ignore) {
          setWorks([]);
        }
      } finally {
        if (!ignore) {
          setIsLoadingWorks(false);
        }
      }
    }

    loadWorks();

    return () => {
      ignore = true;
    };
  }, []);

  const portraitWorks = useMemo(
    () => works.filter((work) => work.category === "Traditional").slice(0, 4),
    [works],
  );
  const milestoneWorks = useMemo(() => works.filter((work) => work.category === "Ordinary").slice(0, 4), [works]);
  const commissionWorks = useMemo(
    () => works.filter((work) => work.category === "Historical" || work.category === "Landscape").slice(0, 4),
    [works],
  );
  const fallbackSections = useMemo(
    () => [works.slice(0, 4), works.slice(4, 8), works.slice(8, 12)],
    [works],
  );

  return (
    <>
      <section className="section-wrap pb-10 pt-8 md:pb-12 md:pt-10">
        <div className="paper-panel overflow-hidden rounded-[2rem] px-5 py-5 md:px-7 md:py-7">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
            <Reveal className="relative min-h-[28rem] overflow-hidden rounded-[1.5rem] lg:min-h-[34rem]">
              <FeaturedImage work={works[0]} alt={works[0]?.title ?? "Featured glossy artwork"} priority />
              <div className="absolute inset-0 bg-black/42" />
              <div className="relative z-10 flex h-full flex-col justify-between p-6 text-[#f9f2ea] md:p-10">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#efe2d6]/72">{copy.eyebrow}</p>
                  <h1 className="mt-4 max-w-3xl text-4xl md:text-6xl">{copy.headline}</h1>
                  <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#f4e7db]/84 md:text-base">
                    {copy.subtext}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a href={telegramOrderUrl} className="button-primary" target="_blank" rel="noreferrer">
                    {copy.primaryCta}
                  </a>
                  <Link
                    href="/gallery"
                    className="inline-flex items-center justify-center rounded-full border border-white/18 bg-white/10 px-5 py-3 text-sm text-[#f9f2ea] backdrop-blur"
                  >
                    {copy.secondaryCta}
                  </Link>
                </div>
              </div>
            </Reveal>

            <div className="grid gap-6">
              <Reveal delay={0.08} className="paper-card rounded-[1.5rem] p-6 md:p-7">
                <span className="label-chip">{copy.heroBadge}</span>
                <h2 className="mt-5 text-3xl">{copy.heroCardTitle}</h2>
                <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] md:text-base">
                  {copy.heroCardText}
                </p>
                <div className="mt-8 grid gap-3">
                  {copy.trustBadges.map((label) => (
                    <div
                      key={label}
                      className="flex items-center justify-between rounded-[1.25rem] border border-[var(--line)] bg-[var(--chip-surface)] px-4 py-3 text-sm text-[var(--soft-text)]"
                    >
                      <span>{label}</span>
                      <span className="text-[var(--soft-text-strong)]">01</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.16} className="relative min-h-[18rem] overflow-hidden rounded-[1.5rem]">
                <FeaturedImage work={works[1] ?? works[0]} alt={works[1]?.title ?? works[0]?.title ?? "Glossy artwork"} />
                <div className="absolute inset-0 bg-black/35" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-[#f9f2ea]">
                  <p className="text-xs uppercase tracking-[0.22em] text-[#efe2d6]/72">{copy.galleryEyebrow}</p>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-[#f6ecdf]/84">{copy.galleryText}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section-wrap pb-10 md:pb-14">
        <div className="grid gap-4 md:grid-cols-3">
          {copy.trustBadges.map((label) => (
            <div key={label} className="paper-panel rounded-full px-5 py-4 text-center text-sm text-[var(--soft-text)]">
              {label}
            </div>
          ))}
        </div>
      </section>

      <section className="section-wrap space-y-8 pb-10 md:space-y-10 md:pb-14">
        {isLoadingWorks ? <p className="text-center text-sm text-[var(--muted)]">Loading gallery works...</p> : null}
        <Reveal>
          <ArtworkStrip title={copy.stripTitles[0]} intro={copy.stripIntros[0]} works={portraitWorks.length ? portraitWorks : fallbackSections[0]} />
        </Reveal>

        <Reveal delay={0.08}>
          <ArtworkStrip title={copy.stripTitles[1]} intro={copy.stripIntros[1]} works={milestoneWorks.length ? milestoneWorks : fallbackSections[1]} />
        </Reveal>

        <Reveal delay={0.16}>
          <ArtworkStrip title={copy.stripTitles[2]} intro={copy.stripIntros[2]} works={commissionWorks.length ? commissionWorks : fallbackSections[2]} />
        </Reveal>
      </section>

      <section className="section-wrap pb-10 md:pb-14">
        <Reveal>
          <div className="paper-panel rounded-[1.5rem] p-6 md:p-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow">{copy.aboutEyebrow}</p>
                <h2 className="mt-2 text-3xl">{copy.aboutTitle}</h2>
              </div>
              <Link href="/about" className="button-secondary">
                {copy.aboutCta}
              </Link>
            </div>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-[var(--muted)] md:text-base">
              {copy.heroCardText}
            </p>
          </div>
        </Reveal>
      </section>

      <section className="section-wrap pb-10 md:pb-14">
        <Reveal>
          <div className="paper-panel rounded-[1.5rem] px-6 py-10 text-center md:px-14">
            <p className="eyebrow">{copy.galleryEyebrow}</p>
            <h2 className="mt-4 text-3xl md:text-4xl">{copy.galleryTitle}</h2>
            <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-[var(--muted)] md:text-base">
              {copy.galleryText}
            </p>
            <Link href="/gallery" className="button-primary mt-7">
              {copy.galleryCta}
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="section-wrap pb-16 md:pb-20">
        <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <Reveal>
            <div className="paper-panel rounded-[1.5rem] p-6 md:p-7">
              <p className="eyebrow">{copy.testimonialsEyebrow}</p>
              <h2 className="mt-3 text-3xl">{copy.testimonialsTitle}</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {testimonials.map((item) => (
                  <blockquote key={item.name} className="paper-card rounded-[1.4rem] p-4">
                    <p className="text-sm leading-relaxed text-[var(--muted)]">&ldquo;{item.quote}&rdquo;</p>
                    <footer className="mt-4 text-sm font-medium text-[var(--foreground)]">
                      {item.name}
                      <span className="block text-xs uppercase tracking-[0.18em] text-[var(--soft-text-strong)]">
                        {item.role}
                      </span>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="paper-panel flex h-full flex-col justify-between rounded-[1.5rem] p-6 md:p-7">
              <div>
                <p className="eyebrow">{copy.ctaEyebrow}</p>
                <h2 className="mt-3 text-3xl">{copy.ctaTitle}</h2>
                <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">{copy.ctaText}</p>
              </div>
              <a href={telegramOrderUrl} className="button-primary mt-7 w-fit" target="_blank" rel="noreferrer">
                {copy.ctaButton}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
