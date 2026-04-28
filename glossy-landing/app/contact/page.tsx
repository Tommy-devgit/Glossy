import type { Metadata } from "next";
import { ContactPageContent } from "@/components/pages/contact-page-content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact glossy to begin a commission and transform a treasured photograph into a polished artwork.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
