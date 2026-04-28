export type NavLink = {
  href: string;
  label: string;
};

export type StudioOffering = {
  title: string;
  description: string;
  note: string;
};

export type Artwork = {
  id: number;
  title: string;
  artist: string;
  category: "Traditional" | "Ordinary" | "Historical" | "Landscape";
  year: string;
  image: string;
};

export type ArtistProfile = {
  name: string;
  specialty: string;
  city: string;
  image: string;
};

export type PricingTier = {
  name: string;
  price: string;
  description: string;
  features: string[];
};

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const navigationLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export const studioOfferings: StudioOffering[] = [
  {
    title: "Portrait Pieces",
    description: "Hand-finished works for individual and family portraits, created to give treasured images a more elevated presence.",
    note: "For beloved faces",
  },
  {
    title: "Memory Panels",
    description: "Refined commissions for weddings, anniversaries, travel photographs, and other moments worth preserving with distinction.",
    note: "For milestone moments",
  },
  {
    title: "Signature Commissions",
    description: "Large-format works tailored to the room they will live in, with scale, finish, and presentation considered in full.",
    note: "For statement interiors",
  },
];

export const featuredWorks: Artwork[] = [
  {
    id: 1,
    title: "Muted Shore",
    artist: "Ava Mercer",
    category: "Traditional",
    year: "1892",
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    title: "Winter Passage",
    artist: "Iris Vale",
    category: "Traditional",
    year: "1904",
    image:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "After Rain",
    artist: "Milo Hart",
    category: "Ordinary",
    year: "1911",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    title: "Dusklight Meadow",
    artist: "Esme Rowan",
    category: "Historical",
    year: "1888",
    image:
      "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    title: "Velvet Hill",
    artist: "Noah Linton",
    category: "Ordinary",
    year: "1920",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    title: "Quiet Valley",
    artist: "Clara Finch",
    category: "Landscape",
    year: "1901",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 7,
    title: "Garden Crossing",
    artist: "Ella Briar",
    category: "Historical",
    year: "1876",
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 8,
    title: "Cloud Study",
    artist: "Jules Arden",
    category: "Landscape",
    year: "1898",
    image:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 9,
    title: "Marsh Echo",
    artist: "Rhea Sol",
    category: "Traditional",
    year: "1913",
    image:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 10,
    title: "Museum Steps",
    artist: "Theo Wren",
    category: "Historical",
    year: "1883",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 11,
    title: "Silk Horizon",
    artist: "Nina Sloane",
    category: "Landscape",
    year: "1907",
    image:
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 12,
    title: "Daybreak Still",
    artist: "Lea Maren",
    category: "Ordinary",
    year: "1918",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
  },
];

export const galleryCategories = [
  "All",
  "Traditional",
  "Ordinary",
  "Historical",
  "Landscape",
] as const;

export const artistProfiles: ArtistProfile[] = [
  {
    name: "Amara Bell",
    specialty: "Portrait studies",
    city: "London",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Jonah Reed",
    specialty: "Large landscapes",
    city: "Copenhagen",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Selene Frost",
    specialty: "Symbolist commissions",
    city: "Milan",
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Mina Hart",
    specialty: "Modern still life",
    city: "Paris",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
  },
];

export const pricingTiers: PricingTier[] = [
  {
    name: "Classic",
    price: "From $280",
    description: "A refined starting point for smaller photographs and intimate moments.",
    features: ["One finished artwork", "Smaller display format", "Careful image preparation"],
  },
  {
    name: "Collection",
    price: "From $460",
    description: "A more generous format with stronger visual presence, ideal for portraits and milestone images.",
    features: ["One larger-format piece", "Enhanced depth and finish", "Ready for display"],
  },
  {
    name: "Commission",
    price: "Custom",
    description: "A bespoke option for statement works, tailored in scale and presentation to the space they are made for.",
    features: ["Custom sizing", "Presentation guidance", "Private quotation"],
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Select Your Photograph",
    description: "Choose the image you would like transformed into a finished piece, whether it is a portrait, family moment, or personal landmark.",
  },
  {
    step: "02",
    title: "We Refine the Composition",
    description: "We review the image carefully and prepare it for a result that feels clear, balanced, and suited to display.",
  },
  {
    step: "03",
    title: "Your Piece Is Handcrafted",
    description: "Each work is finished by hand with a smooth, light-catching surface that lends the photograph added depth and permanence.",
  },
  {
    step: "04",
    title: "Receive and Display",
    description: "Your completed artwork arrives ready to take its place in the home, where it can be lived with for years to come.",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote: "Glossy Atelier gave our wedding photograph a completely new life. It feels less like a print and more like a true piece of art.",
    name: "Claire M.",
    role: "Private client",
  },
  {
    quote: "The finish is extraordinary. It catches the light beautifully and gives the portrait a depth we did not expect.",
    name: "Daniel R.",
    role: "Private client",
  },
  {
    quote: "I wanted something personal for our home, but still refined. The final piece felt thoughtful, elegant, and beautifully made.",
    name: "Nadia T.",
    role: "Private client",
  },
];
