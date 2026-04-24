export type ServiceOption = {
  title: string;
  description: string;
  turnaround: string;
  highlights: string[];
};

export type GalleryItem = {
  id: number;
  title: string;
  category: "Wedding" | "Portrait" | "Travel" | "Heritage" | "Pet";
  size: string;
  finish: string;
  palette: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  city: string;
};

export type PricingTier = {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/pricing", label: "Pricing" },
  { href: "/process", label: "Process" },
  { href: "/order", label: "Order" },
  { href: "/contact", label: "Contact" },
] as const;

export const serviceOptions: ServiceOption[] = [
  {
    title: "Epoxy Signature Print",
    description:
      "A museum-grade print sealed in a crystal-clear resin pour with gentle depth and edge polish.",
    turnaround: "10-14 days",
    highlights: ["UV-stable resin", "Hand-leveled gloss", "Certificate of craft"],
  },
  {
    title: "Floating Acrylic Mount",
    description:
      "Your memory is elevated on a shadow-gap mount for a modern gallery presentation.",
    turnaround: "12-16 days",
    highlights: ["Diamond-polished edge", "Aluminum backing", "Ready-to-hang system"],
  },
  {
    title: "Heirloom Triptych",
    description:
      "Three connected resin panels designed to tell one emotional story across your wall.",
    turnaround: "14-20 days",
    highlights: ["Color-matched set", "Curated layout consultation", "Protective luxury crate"],
  },
];

export const galleryCategories = [
  "All",
  "Wedding",
  "Portrait",
  "Travel",
  "Heritage",
  "Pet",
] as const;

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "First Dance Glow",
    category: "Wedding",
    size: "24 x 36 in",
    finish: "Ultra Gloss",
    palette: "linear-gradient(140deg, rgba(126,102,255,.6), rgba(0,238,255,.22), rgba(11,11,12,.95))",
  },
  {
    id: 2,
    title: "Golden Hour Portrait",
    category: "Portrait",
    size: "20 x 30 in",
    finish: "Mirror Resin",
    palette: "linear-gradient(150deg, rgba(240,166,120,.45), rgba(124,94,255,.45), rgba(11,11,12,.95))",
  },
  {
    id: 3,
    title: "Iceland Memory",
    category: "Travel",
    size: "24 x 24 in",
    finish: "Frosted Edge",
    palette: "linear-gradient(160deg, rgba(114,255,245,.35), rgba(108,95,255,.45), rgba(11,11,12,.95))",
  },
  {
    id: 4,
    title: "Family Archive 1984",
    category: "Heritage",
    size: "30 x 40 in",
    finish: "Collector Gloss",
    palette: "linear-gradient(145deg, rgba(189,145,105,.45), rgba(90,70,214,.45), rgba(11,11,12,.96))",
  },
  {
    id: 5,
    title: "Luna Portrait",
    category: "Pet",
    size: "18 x 24 in",
    finish: "Soft Glow",
    palette: "linear-gradient(150deg, rgba(112,243,255,.35), rgba(122,98,255,.45), rgba(11,11,12,.95))",
  },
  {
    id: 6,
    title: "Ocean Vows",
    category: "Wedding",
    size: "24 x 36 in",
    finish: "Ultra Gloss",
    palette: "linear-gradient(160deg, rgba(88,197,255,.4), rgba(171,122,255,.45), rgba(11,11,12,.96))",
  },
  {
    id: 7,
    title: "Cityline Escape",
    category: "Travel",
    size: "20 x 30 in",
    finish: "Mirror Resin",
    palette: "linear-gradient(145deg, rgba(73,111,245,.45), rgba(117,243,255,.33), rgba(11,11,12,.96))",
  },
  {
    id: 8,
    title: "Anniversary Frame",
    category: "Portrait",
    size: "24 x 30 in",
    finish: "Diamond Edge",
    palette: "linear-gradient(150deg, rgba(232,174,204,.36), rgba(120,93,255,.5), rgba(11,11,12,.95))",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "When we opened Glossy's package, it felt like we were reliving our wedding day in perfect light.",
    name: "Maya R.",
    city: "Austin, TX",
  },
  {
    quote:
      "The finish is unreal. It looks like our old family portrait is suspended under glass.",
    name: "Daniel K.",
    city: "Seattle, WA",
  },
  {
    quote:
      "Luxury craftsmanship with real heart. Every guest asks where we had it made.",
    name: "Nora and Eli",
    city: "Toronto, ON",
  },
];

export const pricingTiers: PricingTier[] = [
  {
    name: "Standard",
    price: "$249",
    description: "For one standout memory piece in your home.",
    features: [
      "Up to 18 x 24 in",
      "Resin high-gloss finish",
      "Color enhancement",
      "Protective packaging",
    ],
  },
  {
    name: "Premium",
    price: "$449",
    description: "Our most chosen tier for weddings, portraits, and gifts.",
    highlighted: true,
    features: [
      "Up to 24 x 36 in",
      "Luxury edge polish",
      "Proof preview before pour",
      "Priority production queue",
      "Handwritten gifting card",
    ],
  },
  {
    name: "Custom",
    price: "From $799",
    description: "Curated multi-panel or oversized heirloom commissions.",
    features: [
      "Bespoke dimensions",
      "Triptych or series layout",
      "Creative direction call",
      "White-glove delivery",
    ],
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Upload",
    description: "Share your favorite photo and choose your preferred style, size, and finish.",
  },
  {
    step: "02",
    title: "Crafting",
    description: "Our studio hand-corrects color, prepares the print, and pours premium epoxy resin.",
  },
  {
    step: "03",
    title: "Delivery",
    description: "Each artwork is inspected, cured, and shipped in custom protective packaging.",
  },
];
