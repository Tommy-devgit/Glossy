export type NavLink = {
  href: string;
  label: string;
};

export type StudioOffering = {
  title: string;
  description: string;
  note: string;
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

export const telegramOrderUrl = "https://t.me/glossy";

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
