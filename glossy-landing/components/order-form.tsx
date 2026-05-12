"use client";

import { FormEvent, useRef, useState } from "react";
import { useToast } from "@/components/toast-provider";

const sizeOptions = ["12 x 18 in", "18 x 24 in", "24 x 36 in", "30 x 40 in", "Custom size"];
const styleOptions = ["Signature Gloss", "Diamond Edge", "Frosted Edge", "Triptych", "Floating Mount"];

export function OrderForm() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();

  const addFiles = (nextFiles: FileList | null) => {
    if (!nextFiles) {
      return;
    }

    setFiles((current) => {
      const combined = [...current, ...Array.from(nextFiles)];
      return combined.slice(0, 8);
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    showToast({
      type: "success",
      title: "Request captured",
      message: "Thank you. Our studio team will reply within 12 hours.",
    });
  };

  return (
    <form className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]" onSubmit={handleSubmit}>
      <div className="paper-panel space-y-5 rounded-[1.25rem] p-5 md:p-6">
        <div>
          <p className="eyebrow">Upload</p>
          <h2 className="mt-2 text-2xl md:text-3xl">Share your photos</h2>
        </div>

        <button
          type="button"
          className={`relative w-full rounded-[1.1rem] border border-dashed p-6 text-left transition ${
            dragActive
              ? "border-[var(--foreground)] bg-[var(--accent-soft)]"
              : "border-[var(--line)] bg-[var(--surface-strong)] hover:border-[var(--foreground)]"
          }`}
          onClick={() => inputRef.current?.click()}
          onDragEnter={(event) => {
            event.preventDefault();
            setDragActive(true);
          }}
          onDragOver={(event) => {
            event.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={(event) => {
            event.preventDefault();
            setDragActive(false);
          }}
          onDrop={(event) => {
            event.preventDefault();
            setDragActive(false);
            addFiles(event.dataTransfer.files);
          }}
        >
          <p className="text-lg font-semibold text-[var(--foreground)]">Drag and drop images here</p>
          <p className="mt-3 text-sm text-[var(--muted)]">JPG, PNG, HEIC up to 8 files</p>
          <p className="mt-5 inline-flex rounded-full bg-[var(--chip-surface)] px-4 py-2 text-xs uppercase tracking-[0.18em] text-[var(--chip-text)]">
            Browse Files
          </p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(event) => addFiles(event.target.files)}
          />
        </button>

        {files.length > 0 ? (
          <div className="space-y-2 text-sm text-[var(--soft-text)]">
            {files.map((file) => (
              <p key={`${file.name}-${file.lastModified}`}>- {file.name}</p>
            ))}
          </div>
        ) : null}
      </div>

      <div className="paper-panel rounded-[1.25rem] p-5 md:p-6">
        <h3 className="text-2xl">Order details</h3>
        <div className="mt-5 grid gap-4">
          <label className="grid gap-2 text-sm text-[var(--soft-text)]">
            Full name
            <input required name="name" className="input-field" placeholder="Your name" />
          </label>
          <label className="grid gap-2 text-sm text-[var(--soft-text)]">
            Email
            <input required type="email" name="email" className="input-field" placeholder="you@email.com" />
          </label>
          <label className="grid gap-2 text-sm text-[var(--soft-text)]">
            Size
            <select name="size" className="input-field" defaultValue={sizeOptions[1]}>
              {sizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm text-[var(--soft-text)]">
            Style
            <select name="style" className="input-field" defaultValue={styleOptions[0]}>
              {styleOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm text-[var(--soft-text)]">
            Notes
            <textarea
              name="notes"
              rows={4}
              className="input-field resize-none"
              placeholder="Tell us the story, mood, or any customization notes."
            />
          </label>
        </div>

        <button type="submit" className="button-primary mt-6 w-full justify-center">
          Submit Request
        </button>

        {submitted ? <p className="sr-only">Thank you. Your draft order has been captured.</p> : null}
      </div>
    </form>
  );
}
