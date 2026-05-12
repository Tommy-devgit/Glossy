"use client";

import { FormEvent, useState } from "react";
import { useSitePreferences } from "@/components/site-preferences-provider";
import { useToast } from "@/components/toast-provider";
import { translations } from "@/lib/translations";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const { locale } = useSitePreferences();
  const { showToast } = useToast();
  const copy = translations[locale].contact;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    showToast({
      type: "success",
      title: copy.sent,
      message: "We received your enquiry and will reply with next steps.",
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
      <form className="paper-card rounded-[1.25rem] p-5 md:p-6" onSubmit={handleSubmit}>
        <p className="eyebrow">{copy.formEyebrow}</p>
        <h2 className="mt-3 text-2xl md:text-3xl">{copy.formTitle}</h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{copy.formText}</p>

        <div className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm text-[var(--soft-text)]">
            {copy.name}
            <input required className="input-field" name="name" placeholder={copy.namePlaceholder} />
          </label>
          <label className="grid gap-2 text-sm text-[var(--soft-text)]">
            {copy.email}
            <input required type="email" className="input-field" name="email" placeholder={copy.emailPlaceholder} />
          </label>
          <label className="grid gap-2 text-sm text-[var(--soft-text)]">
            {copy.details}
            <textarea
              required
              rows={5}
              className="input-field resize-none"
              name="message"
              placeholder={copy.detailsPlaceholder}
            />
          </label>
        </div>

        <button type="submit" className="button-primary mt-6">
          {copy.submit}
        </button>

        {sent ? <p className="sr-only">{copy.sent}</p> : null}
      </form>

      <aside className="grid gap-5">
        <div className="paper-card rounded-[1.25rem] p-5">
          <p className="eyebrow">{copy.consultationsEyebrow}</p>
          <h3 className="mt-3 text-2xl">{copy.consultationsTitle}</h3>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{copy.consultationsText}</p>
        </div>

        <div className="paper-card rounded-[1.25rem] p-5">
          <p className="eyebrow">{copy.emailEyebrow}</p>
          <h3 className="mt-3 text-xl md:text-2xl">hello@glossyatelier.com</h3>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{copy.emailText}</p>
          <a
            className="button-secondary mt-5"
            href="mailto:hello@glossyatelier.com"
          >
            {copy.emailButton}
          </a>
        </div>
      </aside>
    </div>
  );
}
