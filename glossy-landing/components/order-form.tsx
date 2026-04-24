"use client";

import { FormEvent, useRef, useState } from "react";

const sizeOptions = ["12 x 18 in", "18 x 24 in", "24 x 36 in", "30 x 40 in", "Custom size"];
const styleOptions = ["Signature Gloss", "Diamond Edge", "Frosted Edge", "Triptych", "Floating Mount"];

export function OrderForm() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);

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
  };

  return (
    <form className="grid gap-8 lg:grid-cols-[1.15fr_.85fr]" onSubmit={handleSubmit}>
      <div className="glass-panel space-y-5 rounded-3xl p-6 md:p-8">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">Upload</p>
          <h2 className="mt-2 text-3xl text-white">Share your photos</h2>
        </div>

        <button
          type="button"
          className={`relative w-full rounded-3xl border border-dashed p-8 text-left transition ${
            dragActive
              ? "border-cyan-300 bg-cyan-300/10"
              : "border-white/25 bg-white/5 hover:border-white/45"
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
          <p className="text-xl text-white">Drag and drop images here</p>
          <p className="mt-3 text-sm text-white/65">JPG, PNG, HEIC up to 8 files</p>
          <p className="mt-5 inline-flex rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-cyan-100">
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
          <div className="space-y-2 text-sm text-white/80">
            {files.map((file) => (
              <p key={`${file.name}-${file.lastModified}`}>- {file.name}</p>
            ))}
          </div>
        ) : null}
      </div>

      <div className="glass-panel rounded-3xl p-6 md:p-8">
        <h3 className="text-2xl text-white">Order details</h3>
        <div className="mt-5 grid gap-4">
          <label className="grid gap-2 text-sm text-white/80">
            Full name
            <input required name="name" className="input-field" placeholder="Your name" />
          </label>
          <label className="grid gap-2 text-sm text-white/80">
            Email
            <input required type="email" name="email" className="input-field" placeholder="you@email.com" />
          </label>
          <label className="grid gap-2 text-sm text-white/80">
            Size
            <select name="size" className="input-field" defaultValue={sizeOptions[1]}>
              {sizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm text-white/80">
            Style
            <select name="style" className="input-field" defaultValue={styleOptions[0]}>
              {styleOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm text-white/80">
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

        {submitted ? (
          <p className="mt-4 text-sm text-cyan-200">
            Thank you. Your draft order has been captured. Our studio team will reply within 12 hours.
          </p>
        ) : null}
      </div>
    </form>
  );
}
