import type { Metadata } from "next";
import { GalleryFilter } from "@/components/gallery-filter";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse the Glossy gallery of epoxy-coated memory artwork by category.",
};

export default function GalleryPage() {
  return (
    <section className="section-wrap py-14 md:py-20">
      <Reveal>
        <p className="eyebrow">Gallery</p>
        <h1 className="mt-3 max-w-4xl text-4xl text-white md:text-6xl">A luminous collection of handcrafted resin artwork</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70">
          Explore by category and discover how each memory gains depth, reflection, and permanence under our signature
          glass-like finish.
        </p>
      </Reveal>

      <Reveal className="mt-10">
        <GalleryFilter />
      </Reveal>
    </section>
  );
}
