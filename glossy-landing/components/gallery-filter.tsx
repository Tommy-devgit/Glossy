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
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
const ITEMS_PER_PAGE = 6;
const UPLOAD_FETCH_LIMIT = 100;

export function GalleryFilter() {
  const [activeCategory, setActiveCategory] =
    useState<(typeof galleryCategories)[number]>("All");
  const [uploadedWorks, setUploadedWorks] = useState<Artwork[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { locale } = useSitePreferences();
  const copy = translations[locale].gallery;

  useEffect(() => {
    let ignore = false;

    async function loadWorks() {
      setIsLoading(true);

      try {
        const response = await fetch(`${API_URL}/api/works?page=1&limit=${UPLOAD_FETCH_LIMIT}`);

        if (!response.ok) {
          throw new Error("Unable to load uploaded works");
        }

        const data = (await response.json()) as WorksResponse;

        if (ignore) {
          return;
        }

        setUploadedWorks(
          data.items.map((item) => ({
            id: item._id,
            title: item.title,
            artist: "glossy upload",
            category: item.category ?? "Ordinary",
            year: item.createdAt ? new Date(item.createdAt).getFullYear().toString() : "New",
            image: item.imageUrl,
          })),
        );
      } catch {
        if (!ignore) {
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
  }, []);

  const galleryItems = useMemo(() => [...featuredWorks, ...uploadedWorks], [uploadedWorks]);

  const filteredItems = useMemo(
    () =>
      activeCategory === "All"
        ? galleryItems
        : galleryItems.filter((item) => item.category === activeCategory),
    [activeCategory, galleryItems],
  );

  const totalPages = Math.max(Math.ceil(filteredItems.length / ITEMS_PER_PAGE), 1);
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedItems = useMemo(
    () => filteredItems.slice((safeCurrentPage - 1) * ITEMS_PER_PAGE, safeCurrentPage * ITEMS_PER_PAGE),
    [safeCurrentPage, filteredItems],
  );

  return (
    <section className="space-y-8">
      <div className="flex flex-wrap gap-3">
        {galleryCategories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => {
              setActiveCategory(category);
              setCurrentPage(1);
            }}
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
          {paginatedItems.map((item) => (
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

      {totalPages > 1 ? (
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            className="button-secondary px-4 py-2 text-sm disabled:opacity-45"
            disabled={safeCurrentPage === 1}
            onClick={() => setCurrentPage((value) => Math.max(value - 1, 1))}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              aria-label={`Go to gallery page ${pageNumber}`}
              className={`flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] text-sm ${
                safeCurrentPage === pageNumber
                  ? "bg-[var(--foreground)] text-[var(--background)]"
                  : "bg-[var(--chip-surface)] text-[var(--soft-text)] hover:text-[var(--foreground)]"
              }`}
              onClick={() => setCurrentPage(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
          <button
            type="button"
            className="button-secondary px-4 py-2 text-sm disabled:opacity-45"
            disabled={safeCurrentPage === totalPages}
            onClick={() => setCurrentPage((value) => Math.min(value + 1, totalPages))}
          >
            Next
          </button>
        </div>
      ) : null}

      {isLoading ? <p className="text-center text-sm text-[var(--muted)]">Loading gallery updates...</p> : null}
    </section>
  );
}
