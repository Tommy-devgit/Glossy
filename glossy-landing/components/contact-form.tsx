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
        <p className="eyebrow">Contact</p>
        <h2 className="mt-3 text-4xl">Tell us about your project</h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
          Share the space, mood, or kind of collection you have in mind and the studio can respond with a tailored direction.
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
            Project details
            <textarea
              required
              rows={5}
              className="input-field resize-none"
              name="message"
              placeholder="Residential, hospitality, retail, or commissioned collection?"
            />
          </label>
        </div>

        <button type="submit" className="button-primary mt-6">
          Send Message
        </button>

        {sent ? <p className="mt-4 text-sm text-[rgba(36,22,15,0.76)]">Message sent. The studio will follow up shortly.</p> : null}
      </form>

      <aside className="grid gap-5">
        <div className="paper-card rounded-[1.8rem] p-6">
          <p className="eyebrow">Studio Hours</p>
          <h3 className="mt-3 text-3xl">By appointment</h3>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            Monday to Friday, with remote consultations for private clients and project teams.
          </p>
        </div>

        <div className="paper-card rounded-[1.8rem] p-6">
          <p className="eyebrow">Email</p>
          <h3 className="mt-3 text-3xl">hello@glossyatelier.com</h3>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            Use this for commissions, collaborations, procurement, or replacement of the temporary placeholder content.
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
