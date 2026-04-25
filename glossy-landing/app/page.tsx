import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { artistProfiles, featuredWorks, studioOfferings, testimonials } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Home",
  description: "An editorial landing page for Glossy Atelier inspired by a warm gallery brochure layout.",
};

const traditionalWorks = featuredWorks.slice(0, 4);
const ordinaryWorks = featuredWorks.slice(4, 8);
const historicalWorks = featuredWorks.slice(8, 12);

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
    <section className="paper-panel rounded-[2rem] p-5 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">{title}</p>
          <h2 className="mt-2 text-3xl md:text-4xl">{title}</h2>
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-[var(--muted)]">{intro}</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {works.map((work) => (
          <article key={work.id} className="paper-card overflow-hidden rounded-[1.5rem]">
            <div className="art-frame h-64">
              <img src={work.image} alt={work.title} loading="lazy" className="rounded-[1rem]" />
            </div>
            <div className="px-4 pb-4 pt-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-[var(--foreground)]">{work.title}</p>
                <span className="label-chip">{work.year}</span>
              </div>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[rgba(36,22,15,0.52)]">{work.artist}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <section className="section-wrap pb-10 pt-8 md:pb-14 md:pt-10">
        <div className="paper-panel overflow-hidden rounded-[2.5rem] px-6 py-10 md:px-12 md:py-14">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr]">
            <div>
              <Reveal>
                <p className="eyebrow">Curated editorial gallery</p>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="mt-4 max-w-3xl text-5xl md:text-7xl">The Art Of Quiet Collecting</h1>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
                  Glossy Atelier presents collections, artists, and commissioned works in a lighter, more refined
                  visual language inspired by museum brochures and gallery catalogues.
                </p>
              </Reveal>

              <Reveal delay={0.24} className="mt-8 flex flex-wrap gap-3">
                <Link href="/gallery" className="button-primary">
                  Explore Collection
                </Link>
                <Link href="/about" className="button-secondary">
                  View About Page
                </Link>
              </Reveal>

              <Reveal delay={0.32} className="mt-10 grid gap-4 md:grid-cols-3">
                {studioOfferings.map((offering) => (
                  <article key={offering.title} className="paper-card rounded-[1.5rem] p-4">
                    <p className="eyebrow">{offering.note}</p>
                    <h2 className="mt-3 text-2xl">{offering.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{offering.description}</p>
                  </article>
                ))}
              </Reveal>
            </div>

            <Reveal delay={0.2} className="relative flex items-center justify-center">
              <div className="relative mx-auto flex w-full max-w-md items-center justify-center py-6">
                {featuredWorks.slice(0, 5).map((work, index) => {
                  const rotations = [-18, -9, 0, 9, 18];
                  return (
                    <div
                      key={work.id}
                      className="art-frame absolute w-28 overflow-hidden rounded-[1.4rem] md:w-32"
                      style={{
                        transform: `translateX(${(index - 2) * 72}px) rotate(${rotations[index]}deg)`,
                        top: index % 2 === 0 ? "18%" : "32%",
                      }}
                    >
                      <img src={work.image} alt={work.title} className="aspect-[4/5] rounded-[1rem]" />
                    </div>
                  );
                })}
                <div className="paper-card flex h-[25rem] w-full max-w-sm flex-col items-center justify-end rounded-[2rem] px-6 pb-8 pt-10 text-center">
                  <span className="label-chip">New editorial direction</span>
                  <h2 className="mt-5 text-4xl">A softer gallery mood</h2>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                    Warm neutrals, compact navigation, framed artwork strips, and portrait-led artist highlights.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-wrap pb-10 md:pb-14">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            "Private residences",
            "Boutique hospitality",
            "Thoughtful commissions",
          ].map((label) => (
            <div key={label} className="paper-panel rounded-full px-5 py-4 text-center text-sm text-[rgba(36,22,15,0.72)]">
              {label}
            </div>
          ))}
        </div>
      </section>

      <section className="section-wrap space-y-8 pb-10 md:space-y-10 md:pb-14">
        <Reveal>
          <ArtworkStrip
            title="Traditional Art"
            intro="A calm opening selection with coastal studies, muted landscapes, and traditional compositions that set the tone for the rest of the page."
            works={traditionalWorks}
          />
        </Reveal>

        <Reveal delay={0.08}>
          <ArtworkStrip
            title="Ordinary Art"
            intro="An accessible, lived-in curation of scenes with soft movement and understated color, designed to echo the reference composition."
            works={ordinaryWorks}
          />
        </Reveal>

        <Reveal delay={0.16}>
          <ArtworkStrip
            title="Historical Art"
            intro="Deeper narrative pieces and museum-style framing cues that help the layout feel more like a printed catalogue than a product site."
            works={historicalWorks}
          />
        </Reveal>
      </section>

      <section className="section-wrap pb-10 md:pb-14">
        <Reveal>
          <div className="paper-panel rounded-[2rem] p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow">Explore Artists</p>
                <h2 className="mt-2 text-4xl">Portraits behind the collection</h2>
              </div>
              <Link href="/about" className="button-secondary">
                Learn the process
              </Link>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-4">
              {artistProfiles.map((artist) => (
                <article key={artist.name} className="paper-card rounded-[1.5rem] p-4">
                  <div className="art-frame h-72">
                    <img src={artist.image} alt={artist.name} loading="lazy" className="rounded-[1rem]" />
                  </div>
                  <h3 className="mt-4 text-2xl">{artist.name}</h3>
                  <p className="mt-2 text-sm text-[var(--muted)]">{artist.specialty}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.22em] text-[rgba(36,22,15,0.48)]">{artist.city}</p>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section-wrap pb-10 md:pb-14">
        <Reveal>
          <div className="paper-panel rounded-[2rem] px-6 py-12 text-center md:px-16">
            <p className="eyebrow">Canvas Of Thoughts</p>
            <h2 className="mt-4 text-4xl md:text-5xl">A landing page that feels curated rather than converted.</h2>
            <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-[var(--muted)] md:text-base">
              The structure now leans into storytelling, framed imagery, slower pacing, and section names inspired by
              the reference instead of a conventional product funnel.
            </p>
            <Link href="/contact" className="button-primary mt-7">
              Start a Conversation
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="section-wrap pb-16 md:pb-20">
        <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <Reveal>
            <div className="paper-panel rounded-[2rem] p-6 md:p-8">
              <p className="eyebrow">Clients Appreciation</p>
              <h2 className="mt-3 text-4xl">40k+ footfall inspired</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {testimonials.map((item) => (
                  <blockquote key={item.name} className="paper-card rounded-[1.4rem] p-4">
                    <p className="text-sm leading-relaxed text-[var(--muted)]">&ldquo;{item.quote}&rdquo;</p>
                    <footer className="mt-4 text-sm font-medium text-[var(--foreground)]">
                      {item.name}
                      <span className="block text-xs uppercase tracking-[0.18em] text-[rgba(36,22,15,0.45)]">
                        {item.role}
                      </span>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="paper-panel flex h-full flex-col justify-between rounded-[2rem] p-6 md:p-8">
              <div>
                <p className="eyebrow">Studio Note</p>
                <h2 className="mt-3 text-4xl">One calmer path through the site</h2>
                <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                  The old order-first journey is gone. Services, pricing, process, and brand story are folded into one
                  about page so the experience feels more intentional and less fragmented.
                </p>
              </div>
              <Link href="/about" className="button-primary mt-7 w-fit">
                Open About Page
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
