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
    title: "Collection Advisory",
    description: "We shape art selections for private residences, hospitality projects, and quiet luxury retail spaces.",
    note: "Thoughtful curation",
  },
  {
    title: "Art Placement",
    description: "From moodboards to wall spacing, we help each piece live naturally within the room around it.",
    note: "Spatial styling",
  },
  {
    title: "Commission Planning",
    description: "We coordinate artists, timelines, framing, and delivery for one-of-a-kind commissions and editions.",
    note: "Bespoke process",
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
    name: "Room Edit",
    price: "$420",
    description: "A focused recommendation for one room or one collector wall.",
    features: ["Up to 5 suggested works", "Placement notes", "2 rounds of refinement"],
  },
  {
    name: "Collector Set",
    price: "$980",
    description: "For residential projects that need art direction, sourcing, and framing guidance.",
    features: ["Up to 12 shortlisted works", "Artist outreach", "Framing and styling notes"],
  },
  {
    name: "Signature Project",
    price: "Custom",
    description: "End-to-end curation for hospitality, retail, showrooms, and commissioned collections.",
    features: ["Project roadmap", "Installation planning", "Vendor and logistics support"],
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    description: "We begin with the mood of the space, the collector's story, and the atmosphere the work should carry.",
  },
  {
    step: "02",
    title: "Curate",
    description: "A tailored shortlist is assembled with medium, scale, framing, and context explained in clear language.",
  },
  {
    step: "03",
    title: "Install",
    description: "We refine the final selection, coordinate delivery, and make sure the collection settles beautifully in place.",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote: "The site now feels like the studio itself: calm, refined, and deeply considered.",
    name: "Rina Sol",
    role: "Boutique hotel founder",
  },
  {
    quote: "Every recommendation felt intentional. We stopped decorating and started collecting with meaning.",
    name: "Elias Hart",
    role: "Private client",
  },
  {
    quote: "Glossy translated our concept into a visual story guests immediately noticed.",
    name: "Camille Wren",
    role: "Creative director",
  },
];
