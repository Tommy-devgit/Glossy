export const artworkCategories = ["Traditional", "Ordinary", "Historical", "Landscape"] as const;

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
  category?: ArtworkCategory;
  createdAt?: string;
};

type WorksResponse = {
  items: ApiArtwork[];
};

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export async function fetchWorks(limit = 100) {
  const response = await fetch(`${API_URL}/api/works?page=1&limit=${limit}`);

  if (!response.ok) {
    throw new Error("Unable to load works");
  }

  const data = (await response.json()) as WorksResponse;

  return data.items.map((item) => ({
    id: item._id,
    title: item.title,
    category: item.category ?? "Ordinary",
    date: item.createdAt
      ? new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(item.createdAt))
      : "New",
    image: item.imageUrl,
  }));
}
