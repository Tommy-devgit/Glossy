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
const heroStatFallbacks = [120, 70, 35] as const;

function useCountUp(target: number) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      const timer = window.setTimeout(() => setValue(target), 0);
      return () => window.clearTimeout(timer);
    }

    let frame = 0;
    const duration = 1200;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    }

    frame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frame);
  }, [target]);

  return value;
}

function HeroCounter({ label, value }: { label: string; value: number }) {
  const count = useCountUp(value);

  return (
    <div className="rounded-[1rem] border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-3">
      <p className="font-display text-2xl font-semibold leading-none text-[var(--foreground)] md:text-3xl">
        {count}+
      </p>
      <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[var(--soft-text-strong)]">{label}</p>
    </div>
  );
}

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
    <section className="paper-panel rounded-[1.25rem] p-5 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">{title}</p>
          <h2 className="mt-2 text-xl md:text-2xl">{title}</h2>
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-[var(--muted)]">{intro}</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {works.length ? (
          works.map((work) => (
            <article key={work.id} className="paper-card overflow-hidden rounded-[1.25rem]">
              <div className="art-frame h-52 rounded-[1rem]">
                <Image
                  src={work.image}
                  alt={work.title}
                  width={900}
                  height={1125}
                  unoptimized
                  className="h-full w-full rounded-[0.8rem] object-cover"
                />
              </div>
              <div className="px-4 pb-4 pt-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[var(--foreground)]">{work.title}</p>
                    <p className="mt-1 text-xs text-[var(--muted)]">{work.date}</p>
                  </div>
                  <a href={telegramOrderUrl} className="button-secondary shrink-0 px-3 py-2 text-xs" target="_blank" rel="noreferrer">
                    Order Now
                  </a>
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
    () => works.filter((work) => work.category === "Portrait").slice(0, 4),
    [works],
  );
  const milestoneWorks = useMemo(() => works.filter((work) => work.category === "Wedding").slice(0, 4), [works]);
  const commissionWorks = useMemo(
    () => works.filter((work) => work.category === "Religious" || work.category === "Art").slice(0, 4),
    [works],
  );
  const fallbackSections = useMemo(
    () => [works.slice(0, 4), works.slice(4, 8), works.slice(8, 12)],
    [works],
  );

  return (
    <>
      <section className="section-wrap pb-9 pt-7 md:pb-11 md:pt-9">
        <div className="paper-panel overflow-hidden rounded-[1.35rem] px-5 py-7 md:px-8 md:py-9">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <Reveal>
              <p className="eyebrow">{copy.eyebrow}</p>
              <h1 className="mt-4 max-w-3xl text-4xl md:text-5xl lg:text-[3.65rem]">
                Depth, Clarity, and Quiet Presence
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
                Each piece is made to give a personal photograph the presence of a polished, lasting work of art.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a href={telegramOrderUrl} className="button-primary" target="_blank" rel="noreferrer">
                  {copy.primaryCta}
                </a>
                <Link href="/gallery" className="button-secondary">
                  {copy.secondaryCta}
                </Link>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {[
                  Math.max(portraitWorks.length, heroStatFallbacks[0]),
                  Math.max(milestoneWorks.length, heroStatFallbacks[1]),
                  Math.max(commissionWorks.length, heroStatFallbacks[2]),
                ].map((value, index) => (
                  <HeroCounter key={copy.trustBadges[index]} label={copy.trustBadges[index]} value={value} />
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.08} className="hero-depth-stage min-h-[20rem] sm:min-h-[25rem]">
              <div className="hero-resin-frame art-frame relative mx-auto h-[20rem] w-full max-w-[28rem] overflow-hidden rounded-[1.35rem] p-3 sm:h-[25rem]">
                <FeaturedImage work={works[0]} alt={works[0]?.title ?? "Featured glossy artwork"} priority />
                <div className="absolute inset-x-5 bottom-5 z-10 rounded-[1rem] bg-[var(--surface-strong)] px-4 py-3 shadow-[0_12px_28px_rgb(35_25_18_/_0.16)]">
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--soft-text-strong)]">{copy.heroBadge}</p>
                  <p className="mt-1 text-sm font-semibold text-[var(--foreground)]">{copy.heroCardTitle}</p>
                </div>
              </div>
            </Reveal>
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
            <h2 className="mt-4 text-2xl md:text-3xl">{copy.galleryTitle}</h2>
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
