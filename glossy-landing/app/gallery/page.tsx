import type { Metadata } from "next";
import { GalleryFilter } from "@/components/gallery-filter";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse the temporary curated collection used to shape the new editorial art direction.",
};

export default function GalleryPage() {
  return (
    <section className="section-wrap py-8 md:py-10">
      <Reveal>
        <div className="paper-panel rounded-[2.5rem] px-6 py-10 md:px-10 md:py-14">
          <p className="eyebrow">Gallery</p>
          <h1 className="mt-4 max-w-4xl text-5xl md:text-7xl">A placeholder collection built with Unsplash imagery.</h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
            This page keeps the art-led structure from the reference while using temporary images that can later be
            swapped for the final studio or company assets.
          </p>
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
