export const artworkCategories = ["Religious", "Wedding", "Portrait", "Art"] as const;

export const galleryCategories = ["All", ...artworkCategories] as const;

export type ArtworkCategory = (typeof artworkCategories)[number];

export type Artwork = {
  id: string;
  title: string;
  category: ArtworkCategory;
  date: string;
  image: string;
};

type ApiArtwork = {
  _id: string;
  title: string;
  imageUrl: string;
  category?: ArtworkCategory | "Traditional" | "Ordinary" | "Historical" | "Landscape";
  createdAt?: string;
};

type WorksResponse = {
  items: ApiArtwork[];
};

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

const legacyCategoryMap: Record<string, ArtworkCategory> = {
  Traditional: "Portrait",
  Ordinary: "Wedding",
  Historical: "Art",
  Landscape: "Art",
};

export function normalizeArtworkCategory(category?: string): ArtworkCategory {
  if (artworkCategories.includes(category as ArtworkCategory)) {
    return category as ArtworkCategory;
  }

  return legacyCategoryMap[category ?? ""] ?? "Portrait";
}

function getOptimizedImageUrl(imageUrl: string) {
  if (!imageUrl.includes("res.cloudinary.com") || imageUrl.includes("/f_auto,q_auto/")) {
    return imageUrl;
  }

  return imageUrl.replace("/upload/", "/upload/f_auto,q_auto,c_limit,w_1400/");
}

export async function fetchWorks(limit = 100) {
  const response = await fetch(`${API_URL}/api/works?page=1&limit=${limit}`);

  if (!response.ok) {
    throw new Error("Unable to load works");
  }

  const data = (await response.json()) as WorksResponse;

  return data.items.map((item) => ({
    id: item._id,
    title: item.title,
    category: normalizeArtworkCategory(item.category),
    date: item.createdAt
      ? new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(item.createdAt))
      : "New",
    image: getOptimizedImageUrl(item.imageUrl),
  }));
}
