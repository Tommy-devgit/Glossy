"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

type UploadState = "idle" | "saving" | "saved" | "error";
type GateState = "idle" | "checking" | "unlocked" | "error";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export function AdminDashboard() {
  const [adminKey, setAdminKey] = useState("");
  const [password, setPassword] = useState("");
  const [gateState, setGateState] = useState<GateState>("idle");
  const [gateMessage, setGateMessage] = useState("");
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<UploadState>("idle");
  const [message, setMessage] = useState("");
  const previewUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const nextPhoto = event.target.files?.[0] ?? null;

    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }

    setPhoto(nextPhoto);

    if (nextPhoto) {
      const objectUrl = URL.createObjectURL(nextPhoto);
      previewUrlRef.current = objectUrl;
      setPreview(objectUrl);
    } else {
      setPreview(null);
    }
  }

  async function handleUnlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!password) {
      setGateState("error");
      setGateMessage("Enter the admin password.");
      return;
    }

    setGateState("checking");
    setGateMessage("Checking access...");

    try {
      const response = await fetch(`${API_URL}/api/admin/verify`, {
        method: "POST",
        headers: {
          "x-admin-key": password,
        },
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { message?: string } | null;
        throw new Error(data?.message ?? "Invalid password");
      }

      setAdminKey(password);
      setPassword("");
      setGateState("unlocked");
      setGateMessage("");
    } catch (error) {
      setAdminKey("");
      setGateState("error");
      setGateMessage(error instanceof Error ? error.message : "Invalid password");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!adminKey || !title || !photo) {
      setStatus("error");
      setMessage("Add the admin key, a title, and a photo.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("photo", photo);

    setStatus("saving");
    setMessage("Uploading the new work...");

    try {
      const response = await fetch(`${API_URL}/api/works`, {
        method: "POST",
        headers: {
          "x-admin-key": adminKey,
        },
        body: formData,
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { message?: string } | null;
        throw new Error(data?.message ?? "Upload failed");
      }

      setTitle("");
      setPhoto(null);
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = null;
      }
      setPreview(null);
      setStatus("saved");
      setMessage("Saved. It will appear at the end of the gallery list.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Upload failed");
    }
  }

  return (
    <section className="section-wrap py-8 md:py-10">
      <div className="paper-panel rounded-[2rem] px-6 py-9 md:px-9 md:py-12">
        <p className="eyebrow">Admin</p>
        <h1 className="mt-4 max-w-3xl text-4xl md:text-5xl">Upload a new finished piece</h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[var(--muted)] md:text-base">
          This page is locked. Enter the admin password to upload finished pieces to the gallery.
        </p>
      </div>

      {gateState !== "unlocked" ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/45 px-4 backdrop-blur-sm">
          <form className="paper-panel w-full max-w-md rounded-[1.5rem] p-6 shadow-2xl" onSubmit={handleUnlock}>
            <p className="eyebrow">Private access</p>
            <h2 className="mt-3 text-3xl">Admin password</h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
              Enter the private key to open the upload dashboard.
            </p>
            <label className="mt-5 grid gap-2 text-sm font-medium text-[var(--foreground)]">
              Password
              <input
                className="input-field"
                type="password"
                value={password}
                autoComplete="current-password"
                autoFocus
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Admin password"
              />
            </label>
            <button type="submit" className="button-primary mt-5 w-full" disabled={gateState === "checking"}>
              {gateState === "checking" ? "Checking..." : "Unlock dashboard"}
            </button>
            {gateMessage ? (
              <p className={`mt-4 text-sm ${gateState === "error" ? "text-red-600" : "text-[var(--muted)]"}`}>
                {gateMessage}
              </p>
            ) : null}
          </form>
        </div>
      ) : null}

      {gateState === "unlocked" ? (
      <div className="mt-8 grid gap-6 lg:grid-cols-[.95fr_1.05fr]">
        <form className="paper-panel rounded-[1.5rem] p-6 md:p-7" onSubmit={handleSubmit}>
          <div className="grid gap-5">
            <label className="grid gap-2 text-sm font-medium text-[var(--foreground)]">
              Artwork title
              <input
                className="input-field"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="e.g. Family Celebration"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-[var(--foreground)]">
              Photo
              <input
                className="input-field"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </label>

            <button type="submit" className="button-primary w-fit" disabled={status === "saving"}>
              {status === "saving" ? "Uploading..." : "Upload piece"}
            </button>

            {message ? (
              <p className={`text-sm ${status === "error" ? "text-red-600" : "text-[var(--muted)]"}`}>
                {message}
              </p>
            ) : null}
          </div>
        </form>

        <div className="paper-card rounded-[1.5rem] p-4">
          <div className="art-frame h-[28rem]">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt={title || "New gallery upload preview"}
                className="h-full w-full rounded-[1rem] object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center rounded-[1rem] bg-[var(--chip-surface)] text-sm text-[var(--muted)]">
                Preview
              </div>
            )}
          </div>
          <div className="px-2 pb-2 pt-4">
            <h2 className="text-2xl">{title || "Artwork title"}</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">New gallery item preview</p>
          </div>
        </div>
      </div>
      ) : null}
    </section>
  );
}
