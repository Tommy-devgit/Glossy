import type { Metadata } from "next";
import { OrderForm } from "@/components/order-form";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Order",
  description: "Upload your photo and configure your custom Glossy epoxy artwork order.",
};

export default function OrderPage() {
  return (
    <section className="section-wrap py-14 md:py-20">
      <Reveal>
        <p className="eyebrow">Start Order</p>
        <h1 className="mt-3 max-w-4xl text-4xl text-white md:text-6xl">Turn your photo into a handcrafted luxury resin piece.</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70">
          Upload your image, choose size and style, and share the story behind your memory. Our studio team will
          review and confirm every detail before crafting begins.
        </p>
      </Reveal>

      <Reveal className="mt-10">
        <OrderForm />
      </Reveal>
    </section>
  );
}
