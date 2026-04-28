import pic1 from "@/assets/pic-1.jpg";
import pic2 from "@/assets/pic-2.jpg";
import pic3 from "@/assets/pic-3.jpg";
import pic4 from "@/assets/pic-4.jpg";
import pic5 from "@/assets/pic-5.jpg";
import pic6 from "@/assets/pic-6.jpg";
import pic7 from "@/assets/pic-7.jpg";
import pic8 from "@/assets/pic-8.jpg";
import pic9 from "@/assets/pic-9.jpg";
import pic10 from "@/assets/pic-10.jpg";
import pic11 from "@/assets/pic-11.jpg";
import pic12 from "@/assets/pic-12.jpg";
import pic13 from "@/assets/pic-13.jpg";
import pic14 from "@/assets/pic-14.jpg";
import pic15 from "@/assets/pic-15.jpg";
import pic16 from "@/assets/pic-16.jpg";
import pic17 from "@/assets/pic-17.jpg";
import pic18 from "@/assets/pic-18.jpg";
import pic19 from "@/assets/pic-19.jpg";

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
  image: typeof pic1;
};

export type ArtistProfile = {
  name: string;
  specialty: string;
  city: string;
  image: typeof pic1;
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
  { id: 1, title: "Muted Shore", artist: "Ava Mercer", category: "Traditional", year: "1892", image: pic1 },
  { id: 2, title: "Winter Passage", artist: "Iris Vale", category: "Traditional", year: "1904", image: pic2 },
  { id: 3, title: "After Rain", artist: "Milo Hart", category: "Ordinary", year: "1911", image: pic3 },
  { id: 4, title: "Dusklight Meadow", artist: "Esme Rowan", category: "Historical", year: "1888", image: pic4 },
  { id: 5, title: "Velvet Hill", artist: "Noah Linton", category: "Ordinary", year: "1920", image: pic5 },
  { id: 6, title: "Quiet Valley", artist: "Clara Finch", category: "Landscape", year: "1901", image: pic6 },
  { id: 7, title: "Garden Crossing", artist: "Ella Briar", category: "Historical", year: "1876", image: pic7 },
  { id: 8, title: "Cloud Study", artist: "Jules Arden", category: "Landscape", year: "1898", image: pic8 },
  { id: 9, title: "Marsh Echo", artist: "Rhea Sol", category: "Traditional", year: "1913", image: pic9 },
  { id: 10, title: "Museum Steps", artist: "Theo Wren", category: "Historical", year: "1883", image: pic10 },
  { id: 11, title: "Silk Horizon", artist: "Nina Sloane", category: "Landscape", year: "1907", image: pic11 },
  { id: 12, title: "Daybreak Still", artist: "Lea Maren", category: "Ordinary", year: "1918", image: pic12 },
];

export const galleryCategories = [
  "All",
  "Traditional",
  "Ordinary",
  "Historical",
  "Landscape",
] as const;

export const artistProfiles: ArtistProfile[] = [
  { name: "Amara Bell", specialty: "Portrait studies", city: "London", image: pic13 },
  { name: "Jonah Reed", specialty: "Large landscapes", city: "Copenhagen", image: pic14 },
  { name: "Selene Frost", specialty: "Symbolist commissions", city: "Milan", image: pic15 },
  { name: "Mina Hart", specialty: "Modern still life", city: "Paris", image: pic16 },
];

export const homeFeatureImages = {
  hero: pic17,
  gallery: pic18,
  accent: pic19,
};

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
    quote: "glossy gave our wedding photograph a completely new life. It feels less like a print and more like a true piece of art.",
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
