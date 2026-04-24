"use client";

import { AnimatePresence, motion } from "framer-motion";
import { galleryCategories, galleryItems } from "@/lib/site-data";
import { useMemo, useState } from "react";

export function GalleryFilter() {
  const [activeCategory, setActiveCategory] =
    useState<(typeof galleryCategories)[number]>("All");

  const filteredItems = useMemo(
    () =>
      activeCategory === "All"
        ? galleryItems
        : galleryItems.filter((item) => item.category === activeCategory),
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
            className={`rounded-full border px-5 py-2 text-sm transition ${
              activeCategory === category
                ? "border-cyan-300/80 bg-cyan-300/15 text-white"
                : "border-white/15 bg-white/5 text-white/70 hover:border-white/30 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.article
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.35 }}
              className="shimmer-tile glow-card relative min-h-64 overflow-hidden rounded-3xl border border-white/15 p-5"
              style={{ backgroundImage: item.palette }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(11,11,12,.95),transparent_55%)]" />
              <div className="relative mt-28">
                <p className="text-xs uppercase tracking-[0.22em] text-cyan-100/70">{item.category}</p>
                <h3 className="mt-2 text-xl text-white">{item.title}</h3>
                <p className="mt-3 text-sm text-white/70">
                  {item.size} | {item.finish}
                </p>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
