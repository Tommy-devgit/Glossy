import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Glossy Atelier about collections, commissions, or replacing the placeholder artwork.",
};

export default function ContactPage() {
  return (
    <section className="section-wrap py-8 md:py-10">
      <Reveal>
        <div className="paper-panel rounded-[2.5rem] px-6 py-10 md:px-10 md:py-14">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-4 max-w-4xl text-5xl md:text-7xl">The contact page replaces the old order-first journey.</h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
            Visitors can now ask about commissions, collection direction, or future content updates without being sent
            through a product-style checkout flow.
          </p>
        </div>
      </Reveal>

      <Reveal className="mt-8">
        <div className="paper-panel rounded-[2rem] p-6 md:p-8">
          <ContactForm />
        </div>
      </Reveal>
    </section>
  );
}
