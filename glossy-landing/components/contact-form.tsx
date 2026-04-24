"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
      <form className="glass-panel rounded-3xl p-6 md:p-8" onSubmit={handleSubmit}>
        <h2 className="text-3xl text-white">Contact our studio</h2>
        <p className="mt-2 text-sm text-white/65">Tell us about your project and we will send a tailored recommendation.</p>

        <div className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm text-white/80">
            Name
            <input required className="input-field" name="name" placeholder="Full name" />
          </label>
          <label className="grid gap-2 text-sm text-white/80">
            Email
            <input required type="email" className="input-field" name="email" placeholder="you@email.com" />
          </label>
          <label className="grid gap-2 text-sm text-white/80">
            Message
            <textarea
              required
              rows={5}
              className="input-field resize-none"
              name="message"
              placeholder="What memory would you like transformed?"
            />
          </label>
        </div>

        <button type="submit" className="button-primary mt-6">
          Send Message
        </button>

        {sent ? <p className="mt-4 text-sm text-cyan-200">Message sent. A Glossy specialist will respond shortly.</p> : null}
      </form>

      <aside className="space-y-5">
        <div className="glass-panel rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">WhatsApp</p>
          <h3 className="mt-2 text-2xl text-white">Instant support</h3>
          <p className="mt-3 text-sm text-white/65">Share inspiration images and ask about dimensions, finishes, and delivery windows.</p>
          <a
            className="mt-5 inline-flex rounded-full border border-white/25 px-5 py-2 text-sm text-white transition hover:border-cyan-300 hover:text-cyan-100"
            href="https://wa.me/15551234567"
            target="_blank"
            rel="noreferrer"
          >
            Chat on WhatsApp
          </a>
        </div>

        <div className="glass-panel rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">Email</p>
          <h3 className="mt-2 text-2xl text-white">hello@glossy.art</h3>
          <p className="mt-3 text-sm text-white/65">For partnerships, interior design collaborations, and custom commissions.</p>
          <a
            className="mt-5 inline-flex rounded-full border border-white/25 px-5 py-2 text-sm text-white transition hover:border-cyan-300 hover:text-cyan-100"
            href="mailto:hello@glossy.art"
          >
            Send Email
          </a>
        </div>
      </aside>
    </div>
  );
}
