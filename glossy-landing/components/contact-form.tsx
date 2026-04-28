"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
      <form className="paper-card rounded-[1.8rem] p-6 md:p-8" onSubmit={handleSubmit}>
        <p className="eyebrow">Begin Your Piece</p>
        <h2 className="mt-3 text-4xl">Tell us about the photograph you would like to preserve</h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
          Share the image, occasion, or setting in mind, and we will respond with a considered recommendation.
        </p>

        <div className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm text-[rgba(36,22,15,0.8)]">
            Name
            <input required className="input-field" name="name" placeholder="Full name" />
          </label>
          <label className="grid gap-2 text-sm text-[rgba(36,22,15,0.8)]">
            Email
            <input required type="email" className="input-field" name="email" placeholder="you@email.com" />
          </label>
          <label className="grid gap-2 text-sm text-[rgba(36,22,15,0.8)]">
            Artwork details
            <textarea
              required
              rows={5}
              className="input-field resize-none"
              name="message"
              placeholder="Portrait, family photograph, wedding image, or special moment"
            />
          </label>
        </div>

        <button type="submit" className="button-primary mt-6">
          Send Enquiry
        </button>

        {sent ? <p className="mt-4 text-sm text-[rgba(36,22,15,0.76)]">Enquiry received. The studio will be in touch shortly.</p> : null}
      </form>

      <aside className="grid gap-5">
        <div className="paper-card rounded-[1.8rem] p-6">
          <p className="eyebrow">Consultations</p>
          <h3 className="mt-3 text-3xl">By appointment</h3>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            Monday to Friday, with private guidance offered remotely for clients near and far.
          </p>
        </div>

        <div className="paper-card rounded-[1.8rem] p-6">
          <p className="eyebrow">Email</p>
          <h3 className="mt-3 text-3xl">hello@glossyatelier.com</h3>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            For commissions, private questions, or bespoke requests, write to the studio directly.
          </p>
          <a
            className="button-secondary mt-5"
            href="mailto:hello@glossyatelier.com"
          >
            Send Email
          </a>
        </div>
      </aside>
    </div>
  );
}
