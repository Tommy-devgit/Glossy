"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useSitePreferences } from "@/components/site-preferences-provider";
import { galleryCategories, featuredWorks, type Artwork } from "@/lib/site-data";
import { translations } from "@/lib/translations";

type ApiArtwork = {
  _id: string;
  title: string;
  imageUrl: string;
  category?: Artwork["category"];
  createdAt?: string;
};

type WorksResponse = {
  items: ApiArtwork[];
  page: number;
  pages: number;
  total: number;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
const PAGE_SIZE = 6;

export function GalleryFilter() {
  const [activeCategory, setActiveCategory] =
    useState<(typeof galleryCategories)[number]>("All");
  const [uploadedWorks, setUploadedWorks] = useState<Artwork[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { locale } = useSitePreferences();
  const copy = translations[locale].gallery;

  useEffect(() => {
    let ignore = false;

    async function loadWorks() {
      setIsLoading(true);

      try {
        const response = await fetch(`${API_URL}/api/works?page=${page}&limit=${PAGE_SIZE}`);

        if (!response.ok) {
          throw new Error("Unable to load uploaded works");
        }

        const data = (await response.json()) as WorksResponse;

        if (ignore) {
          return;
        }

        setPages(data.pages || 1);
        setUploadedWorks((current) => {
          const nextWorks = data.items.map((item) => ({
            id: item._id,
            title: item.title,
            artist: "glossy upload",
            category: item.category ?? "Ordinary",
            year: item.createdAt ? new Date(item.createdAt).getFullYear().toString() : "New",
            image: item.imageUrl,
          }));

          if (page === 1) {
            return nextWorks;
          }

          const seen = new Set(current.map((item) => item.id));
          return [...current, ...nextWorks.filter((item) => !seen.has(item.id))];
        });
      } catch {
        if (!ignore && page === 1) {
          setUploadedWorks([]);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadWorks();

    return () => {
      ignore = true;
    };
  }, [page]);

  const galleryItems = useMemo(() => [...featuredWorks, ...uploadedWorks], [uploadedWorks]);

  const filteredItems = useMemo(
    () =>
      activeCategory === "All"
        ? galleryItems
        : galleryItems.filter((item) => item.category === activeCategory),
    [activeCategory, galleryItems],
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
                ? "border-[var(--line)] bg-[var(--foreground)] text-[var(--background)]"
                : "border-[var(--line)] bg-[var(--chip-surface)] text-[var(--soft-text)] hover:bg-[var(--nav-surface)]"
            }`}
          >
            {category === "All"
              ? copy.filters.all
              : category === "Traditional"
                ? copy.filters.traditional
                : category === "Ordinary"
                  ? copy.filters.ordinary
                  : category === "Historical"
                    ? copy.filters.historical
                    : copy.filters.landscape}
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
              <div className="art-frame h-72">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={900}
                  height={1125}
                  unoptimized={typeof item.image === "string"}
                  className="h-full rounded-[1rem] w-full object-cover"
                />
              </div>
              <div className="px-2 pb-2 pt-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-2xl">{item.title}</h3>
                    <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[var(--soft-text-strong)]">{item.artist}</p>
                  </div>
                  <span className="label-chip">
                    {item.category === "Traditional"
                      ? copy.filters.traditional
                      : item.category === "Ordinary"
                        ? copy.filters.ordinary
                        : item.category === "Historical"
                          ? copy.filters.historical
                          : copy.filters.landscape}
                  </span>
                </div>
                <p className="mt-4 text-sm text-[var(--muted)]">{copy.itemNote}</p>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {page < pages ? (
        <div className="flex justify-center">
          <button
            type="button"
            className="button-secondary"
            disabled={isLoading}
            onClick={() => setPage((value) => value + 1)}
          >
            {isLoading ? "Loading..." : "View more"}
          </button>
        </div>
      ) : null}
    </section>
  );
}
