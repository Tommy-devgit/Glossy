"use client";

import { AnimatePresence, motion } from "framer-motion";
import { galleryCategories, featuredWorks } from "@/lib/site-data";
import { useMemo, useState } from "react";

export function GalleryFilter() {
  const [activeCategory, setActiveCategory] =
    useState<(typeof galleryCategories)[number]>("All");

  const filteredItems = useMemo(
    () =>
      activeCategory === "All"
        ? featuredWorks
        : featuredWorks.filter((item) => item.category === activeCategory),
    [activeCategory],
  );

  return (
    <section className="space-y-8">
      <div className="flex flex-wrap gap-3">
        {galleryCategories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`rounded-full border px-5 py-2 text-sm ${
              activeCategory === category
                ? "border-[rgba(36,22,15,0.18)] bg-[var(--foreground)] text-[#fff8ef]"
                : "border-[var(--line)] bg-white/70 text-[rgba(36,22,15,0.72)] hover:bg-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.article
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.97, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.28 }}
              className="paper-card overflow-hidden rounded-[1.6rem] p-3"
            >
              <div className="art-frame h-80">
                <img src={item.image} alt={item.title} loading="lazy" className="rounded-[1rem]" />
              </div>
              <div className="px-2 pb-2 pt-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-2xl">{item.title}</h3>
                    <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[rgba(36,22,15,0.48)]">{item.artist}</p>
                  </div>
                  <span className="label-chip">{item.category}</span>
                </div>
                <p className="mt-4 text-sm text-[var(--muted)]">Placeholder artwork from Unsplash for the temporary gallery direction.</p>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
