import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Glossy for commissions, support, or collaboration.",
};

export default function ContactPage() {
  return (
    <section className="section-wrap py-14 md:py-20">
      <Reveal>
        <p className="eyebrow">Contact</p>
        <h1 className="mt-3 max-w-3xl text-4xl text-white md:text-6xl">Let us help shape your next heirloom artwork.</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70">
          We support private clients, gift projects, interior designers, and large custom commissions.
        </p>
      </Reveal>

      <Reveal className="mt-10">
        <ContactForm />
      </Reveal>
    </section>
  );
}
