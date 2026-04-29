"use client";

import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { useSitePreferences } from "@/components/site-preferences-provider";
import { pricingTiers, processSteps, studioOfferings } from "@/lib/site-data";
import { translations } from "@/lib/translations";

export function AboutPageContent() {
  const { locale } = useSitePreferences();
  const copy = translations[locale].about;

  const offeringText =
    locale === "am"
      ? [
          {
            title: "የፖርትሬት ስራዎች",
            description: "የምትወዷቸው ምስሎች ከፍ ያለ ቅርጽ እንዲኖራቸው ለግል እና ለቤተሰብ ፖርትሬቶች በእጅ የሚጠናቀቁ ስራዎች።",
            note: "ለተወዳጅ ፊቶች",
          },
          {
            title: "የትዝታ ፓነሎች",
            description: "ለሰርግ፣ ለአመታዊ በዓላት፣ ለጉዞ ፎቶዎች እና ለሌሎች ልዩ አጋጣሚዎች በክብር የሚቀመጡ የተጠራጠሩ ስራዎች።",
            note: "ለአስፈላጊ ጊዜዎች",
          },
          {
            title: "ልዩ ኮሚሽኖች",
            description: "በሙሉ የተመረመሩ መጠን፣ ጨረስ እና አቀራረብ ያላቸው ለቦታ የተዘጋጁ ትልቅ ስራዎች።",
            note: "ለታላቅ ውስጣዊ ቦታዎች",
          },
        ]
      : studioOfferings;

  const localizedPricing =
    locale === "am"
      ? [
          {
            ...pricingTiers[0],
            name: "ክላሲክ",
            description: "ለአነስተኛ ፎቶዎች እና ለቅርብ ትዝታዎች የተጠራጠረ የመነሻ ምርጫ።",
            features: ["አንድ የተጠናቀቀ ስራ", "አነስተኛ የማሳያ መጠን", "በጥንቃቄ የተዘጋጀ ምስል"],
            price: "ከ $280 ጀምሮ",
          },
          {
            ...pricingTiers[1],
            name: "ስብስብ",
            description: "ለፖርትሬቶች እና ለልዩ ምስሎች ተስማሚ የሆነ፣ የበለጠ ክብር ያለው መጠን።",
            features: ["አንድ ትልቅ ስራ", "የበለጠ ጥልቀትና ጨረስ", "ለማሳየት ዝግጁ"],
            price: "ከ $460 ጀምሮ",
          },
          {
            ...pricingTiers[2],
            name: "ኮሚሽን",
            description: "ለቦታው በተስማሚው መጠንና አቀራረብ የሚዘጋጅ ልዩ የክብር አማራጭ።",
            features: ["ብጁ መጠን", "የአቀራረብ መመሪያ", "የግል ዋጋ ጥቅስ"],
          },
        ]
      : pricingTiers;

  const localizedProcess =
    locale === "am"
      ? [
          { step: "01", title: "ፎቶዎን ይምረጡ", description: "ወደ የተጠናቀቀ ስራ እንዲለወጥ የሚፈልጉትን ምስል ይምረጡ።" },
          { step: "02", title: "እኛ እናጠራዋለን", description: "ምስሉን በጥንቃቄ እንመርምራለን እና ለማሳያ ተስማሚ እንዲሆን እናዘጋጃለን።" },
          { step: "03", title: "ስራዎ በእጅ ይጠናቀቃል", description: "እያንዳንዱ ስራ ብርሃንን በሚያጠራጥር እና ጥልቀት በሚሰጥ ገጽ በእጅ ይጠናቀቃል።" },
          { step: "04", title: "ይደርሳል እና ይታያል", description: "የተጠናቀቀው ስራ በቤትዎ ውስጥ ለመኖር ዝግጁ ሆኖ ይደርሳል።" },
        ]
      : processSteps;

  return (
    <section className="section-wrap py-8 md:py-10">
      <Reveal>
        <div className="paper-panel rounded-[2rem] px-6 py-9 md:px-9 md:py-12">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl md:text-5xl">{copy.title}</h1>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-[var(--muted)] md:text-base">{copy.intro}</p>
        </div>
      </Reveal>

      <div className="mt-8 grid gap-8">
        <Reveal>
          <section className="paper-panel rounded-[2rem] p-6 md:p-8">
            <div className="max-w-3xl">
              <p className="eyebrow">{copy.storyEyebrow}</p>
              <h2 className="mt-3 text-3xl">{copy.storyTitle}</h2>
              <p className="mt-5 text-sm leading-relaxed text-[var(--muted)] md:text-base">{copy.storyText}</p>
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.08}>
          <section className="paper-panel rounded-[2rem] p-6 md:p-8">
            <p className="eyebrow">{locale === "am" ? "አገልግሎቶች" : "Services"}</p>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {offeringText.map((offering) => (
                <article key={offering.title} className="paper-card rounded-[1.5rem] p-5">
                  <span className="label-chip">{offering.note}</span>
                  <h2 className="mt-4 text-2xl">{offering.title}</h2>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">{offering.description}</p>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.12}>
          <section className="paper-panel rounded-[2rem] p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow">{copy.pricingEyebrow}</p>
                <h2 className="mt-3 text-3xl">{copy.pricingTitle}</h2>
              </div>
              <p className="max-w-xl text-sm leading-relaxed text-[var(--muted)]">{copy.pricingText}</p>
            </div>
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {localizedPricing.map((tier) => (
                <article key={tier.name} className="paper-card rounded-[1.5rem] p-5">
                  <p className="eyebrow">{tier.name}</p>
                  <p className="mt-3 text-3xl">{tier.price}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{tier.description}</p>
                  <ul className="mt-5 space-y-2 text-sm text-[var(--soft-text)]">
                    {tier.features.map((feature) => (
                      <li key={feature}>+ {feature}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.16}>
          <section className="paper-panel rounded-[2rem] p-6 md:p-8">
            <p className="eyebrow">{copy.processEyebrow}</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {localizedProcess.map((step) => (
                <article key={step.step} className="paper-card rounded-[1.5rem] p-5">
                  <p className="text-4xl leading-none text-[color-mix(in_srgb,var(--foreground)_14%,transparent)]">{step.step}</p>
                  <h2 className="mt-3 text-2xl">{step.title}</h2>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">{step.description}</p>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.2}>
          <section className="paper-panel rounded-[2rem] p-6 md:flex md:items-center md:justify-between md:gap-8 md:p-8">
            <div className="max-w-3xl">
              <p className="eyebrow">{copy.nextEyebrow}</p>
              <h2 className="mt-3 text-3xl">{copy.nextTitle}</h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">{copy.nextText}</p>
            </div>
            <Link href="/contact" className="button-primary mt-6 md:mt-0">
              {copy.nextButton}
            </Link>
          </section>
        </Reveal>
      </div>
    </section>
  );
}
