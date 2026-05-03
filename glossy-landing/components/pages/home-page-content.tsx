"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { useSitePreferences } from "@/components/site-preferences-provider";
import { artistProfiles, featuredWorks, homeFeatureImages, telegramOrderUrl, testimonials } from "@/lib/site-data";
import { translations } from "@/lib/translations";

const portraitWorks = featuredWorks.slice(0, 4);
const milestoneWorks = featuredWorks.slice(4, 8);
const commissionWorks = featuredWorks.slice(8, 12);

function ArtworkStrip({
  title,
  intro,
  works,
}: {
  title: string;
  intro: string;
  works: typeof featuredWorks;
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
        {works.map((work) => (
          <article key={work.id} className="paper-card overflow-hidden rounded-[1.5rem]">
              <div className="art-frame h-56">
              <Image
                src={work.image}
                alt={work.title}
                width={900}
                height={1125}
                className="h-full w-full rounded-[1rem] object-cover"
              />
            </div>
            <div className="px-4 pb-4 pt-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-[var(--foreground)]">{work.title}</p>
                <span className="label-chip">{work.year}</span>
              </div>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[var(--soft-text-strong)]">{work.artist}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function HomePageContent() {
  const { locale } = useSitePreferences();
  const copy = translations[locale].home;
  const localizedProfiles =
    locale === "am"
      ? artistProfiles.map((artist, index) => ({
          ...artist,
          specialty: ["የፖርትሬት ጥናቶች", "ትልቅ የውስጥ ስራዎች", "ልዩ ኮሚሽኖች", "ዘመናዊ የግል ስራዎች"][index],
        }))
      : artistProfiles;
  const localizedTestimonials =
    locale === "am"
      ? [
          {
            quote: "glossy የሰርጋችንን ፎቶ ፈጽሞ አዲስ ሕይወት ሰጠው። ከተለመደ ፕሪንት ይልቅ እውነተኛ የስነ ጥበብ ስራ ይመስላል።",
            name: "Claire M.",
            role: "የግል ደንበኛ",
          },
          {
            quote: "የጨረሱ ጥራት አስደናቂ ነው። ብርሃንን በውብ ሁኔታ ይይዛል እና ለፖርትሬቱ ያልጠበቅነውን ጥልቀት ሰጥቶታል።",
            name: "Daniel R.",
            role: "የግል ደንበኛ",
          },
          {
            quote: "ለቤታችን የግል ነገር እፈልግ ነበር፣ ነገር ግን የተጠራጠረ ሆኖ እንዲቆይ ፈልጌ ነበር። የመጨረሻው ስራ በእውነት የተመረመረ እና ውብ ነበር።",
            name: "Nadia T.",
            role: "የግል ደንበኛ",
          },
        ]
      : testimonials;

  return (
    <>
      <section className="section-wrap pb-10 pt-8 md:pb-12 md:pt-10">
        <div className="paper-panel overflow-hidden rounded-[2rem] px-5 py-5 md:px-7 md:py-7">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
            <Reveal className="relative min-h-[28rem] overflow-hidden rounded-[1.5rem] lg:min-h-[34rem]">
              <Image
                src={homeFeatureImages.hero}
                alt="A refined portrait displayed in a warmly lit interior"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
                className="object-cover"
              />
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
                <Image
                  src={homeFeatureImages.gallery}
                  alt="Close detail of a framed artwork in soft light"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
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
        <Reveal>
          <ArtworkStrip title={copy.stripTitles[0]} intro={copy.stripIntros[0]} works={portraitWorks} />
        </Reveal>

        <Reveal delay={0.08}>
          <ArtworkStrip title={copy.stripTitles[1]} intro={copy.stripIntros[1]} works={milestoneWorks} />
        </Reveal>

        <Reveal delay={0.16}>
          <ArtworkStrip title={copy.stripTitles[2]} intro={copy.stripIntros[2]} works={commissionWorks} />
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

            <div className="mt-6 grid gap-4 md:grid-cols-4">
              {localizedProfiles.map((artist) => (
                <article key={artist.name} className="paper-card rounded-[1.5rem] p-4">
                  <div className="art-frame h-60">
                    <Image
                      src={artist.image}
                      alt={artist.name}
                      width={900}
                      height={1125}
                      className="h-full w-full rounded-[1rem] object-cover"
                    />
                  </div>
                  <h3 className="mt-4 text-xl">{artist.name}</h3>
                  <p className="mt-2 text-sm text-[var(--muted)]">{artist.specialty}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.22em] text-[var(--soft-text-strong)]">{artist.city}</p>
                </article>
              ))}
            </div>
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
                {localizedTestimonials.map((item) => (
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
