"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useToast } from "@/components/toast-provider";
import { API_URL, artworkCategories, normalizeArtworkCategory, type Artwork, type ArtworkCategory } from "@/lib/works";

type SaveState = "idle" | "saving" | "saved" | "error";
type GateState = "idle" | "checking" | "unlocked" | "error";
type ApiArtwork = {
  _id: string;
  title: string;
  imageUrl: string;
  category?: string;
  createdAt?: string;
};

const MAX_UPLOAD_SIZE = 1600;
const IMAGE_QUALITY = 0.82;

function getArtworkDate(createdAt?: string) {
  return createdAt
    ? new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(createdAt))
    : "New";
}

function mapApiArtwork(item: ApiArtwork): Artwork {
  return {
    id: item._id,
    title: item.title,
    category: normalizeArtworkCategory(item.category),
    date: getArtworkDate(item.createdAt),
    image: item.imageUrl,
  };
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Image compression failed"));
        }
      },
      type,
      quality,
    );
  });
}

async function prepareImageForUpload(file: File) {
  if (!file.type.startsWith("image/")) {
    throw new Error("Upload an image file");
  }

  const imageBitmap = await createImageBitmap(file);
  const scale = Math.min(MAX_UPLOAD_SIZE / imageBitmap.width, MAX_UPLOAD_SIZE / imageBitmap.height, 1);

  if (scale === 1 && file.size < 1_200_000) {
    imageBitmap.close();
    return file;
  }

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(imageBitmap.width * scale);
  canvas.height = Math.round(imageBitmap.height * scale);
  const context = canvas.getContext("2d");

  if (!context) {
    imageBitmap.close();
    return file;
  }

  context.drawImage(imageBitmap, 0, 0, canvas.width, canvas.height);
  imageBitmap.close();

  const blob = await canvasToBlob(canvas, "image/jpeg", IMAGE_QUALITY);
  return new File([blob], file.name.replace(/\.[^.]+$/, ".jpg"), { type: "image/jpeg" });
}

export function AdminDashboard() {
  const [adminKey, setAdminKey] = useState("");
  const [password, setPassword] = useState("");
  const [gateState, setGateState] = useState<GateState>("idle");
  const [gateMessage, setGateMessage] = useState("");
  const [works, setWorks] = useState<Artwork[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ArtworkCategory>("Portrait");
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<SaveState>("idle");
  const [message, setMessage] = useState("");
  const [isLoadingWorks, setIsLoadingWorks] = useState(false);
  const previewUrlRef = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { showToast } = useToast();

  const selectedWork = works.find((work) => work.id === selectedId);
  const isEditing = Boolean(selectedWork);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  function setLocalPreview(nextPhoto: File | null, fallbackImage?: string) {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }

    if (nextPhoto) {
      const objectUrl = URL.createObjectURL(nextPhoto);
      previewUrlRef.current = objectUrl;
      setPreview(objectUrl);
      return;
    }

    setPreview(fallbackImage ?? null);
  }

  async function loadWorks() {
    setIsLoadingWorks(true);

    try {
      const response = await fetch(`${API_URL}/api/works?page=1&limit=100`, { cache: "no-store" });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { message?: string } | null;
        throw new Error(data?.message ?? "Unable to load works");
      }

      const data = (await response.json()) as { items: ApiArtwork[] };
      setWorks(data.items.map(mapApiArtwork));
    } catch (error) {
      const nextMessage = error instanceof Error ? error.message : "Unable to load works";
      setMessage(nextMessage);
      setStatus("error");
      showToast({ type: "error", title: "Unable to load works", message: nextMessage });
    } finally {
      setIsLoadingWorks(false);
    }
  }

  function resetForm() {
    setSelectedId("");
    setTitle("");
    setCategory("Portrait");
    setPhoto(null);
    setLocalPreview(null);
    setStatus("idle");
    setMessage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function selectWork(workId: string) {
    const nextWork = works.find((work) => work.id === workId);
    setSelectedId(workId);
    setTitle(nextWork?.title ?? "");
    setCategory(nextWork?.category ?? "Portrait");
    setPhoto(null);
    setLocalPreview(null, nextWork?.image);
    setStatus("idle");
    setMessage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const nextPhoto = event.target.files?.[0] ?? null;
    setPhoto(nextPhoto);
    setLocalPreview(nextPhoto, selectedWork?.image);
  }

  async function handleUnlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!password) {
      setGateState("error");
      setGateMessage("Enter the admin password.");
      showToast({ type: "warning", title: "Password required", message: "Enter the admin password to continue." });
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
      showToast({ type: "success", title: "Dashboard unlocked", message: "Gallery management is ready." });
      await loadWorks();
    } catch (error) {
      const nextMessage = error instanceof Error ? error.message : "Invalid password";
      setAdminKey("");
      setGateState("error");
      setGateMessage(nextMessage);
      showToast({ type: "error", title: "Access denied", message: nextMessage });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!adminKey || !title || (!isEditing && !photo)) {
      const nextMessage = isEditing ? "Add a title before saving." : "Add a title and a photo before uploading.";
      setStatus("error");
      setMessage(nextMessage);
      showToast({ type: "warning", title: "Missing details", message: nextMessage });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);

    setStatus("saving");
    setMessage(photo ? "Preparing image..." : "Saving changes...");

    try {
      if (photo) {
        formData.append("photo", await prepareImageForUpload(photo));
      }

      const response = await fetch(`${API_URL}/api/works${isEditing ? `/${selectedWork?.id}` : ""}`, {
        method: isEditing ? "PATCH" : "POST",
        headers: {
          "x-admin-key": adminKey,
        },
        body: formData,
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { message?: string } | null;
        throw new Error(data?.message ?? "Save failed");
      }

      const data = (await response.json()) as { item: ApiArtwork };
      const savedWork = mapApiArtwork(data.item);

      setWorks((currentWorks) =>
        isEditing
          ? currentWorks.map((work) => (work.id === savedWork.id ? savedWork : work))
          : [savedWork, ...currentWorks],
      );
      setSelectedId(savedWork.id);
      setTitle(savedWork.title);
      setCategory(savedWork.category);
      setPhoto(null);
      setLocalPreview(null, savedWork.image);
      setStatus("saved");
      setMessage(isEditing ? "Updated. The gallery will use the new details." : "Saved. It will appear in the gallery and home page.");
      showToast({
        type: "success",
        title: isEditing ? "Piece updated" : "Piece uploaded",
        message: isEditing ? "The gallery will use the new details." : "It will appear in the gallery and home page.",
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      const nextMessage = error instanceof Error ? error.message : "Save failed";
      setStatus("error");
      setMessage(nextMessage);
      showToast({ type: "error", title: "Save failed", message: nextMessage });
    }
  }

  async function handleDelete() {
    if (!adminKey || !selectedWork) {
      return;
    }

    const confirmed = window.confirm(`Delete "${selectedWork.title}" from the gallery?`);

    if (!confirmed) {
      return;
    }

    setStatus("saving");
    setMessage("Deleting item...");

    try {
      const response = await fetch(`${API_URL}/api/works/${selectedWork.id}`, {
        method: "DELETE",
        headers: {
          "x-admin-key": adminKey,
        },
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { message?: string } | null;
        throw new Error(data?.message ?? "Delete failed");
      }

      setWorks((currentWorks) => currentWorks.filter((work) => work.id !== selectedWork.id));
      resetForm();
      setStatus("saved");
      setMessage("Deleted from the gallery.");
      showToast({ type: "success", title: "Piece deleted", message: "The item was removed from the gallery." });
    } catch (error) {
      const nextMessage = error instanceof Error ? error.message : "Delete failed";
      setStatus("error");
      setMessage(nextMessage);
      showToast({ type: "error", title: "Delete failed", message: nextMessage });
    }
  }

  return (
    <section className="section-wrap py-7 md:py-9">
      <div className="paper-panel rounded-[1.5rem] px-5 py-7 md:px-8 md:py-9">
        <p className="eyebrow">Admin</p>
        <h1 className="mt-3 max-w-3xl text-3xl md:text-4xl">Manage gallery pieces</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
          Add new work, select an existing item to update it, or remove pieces that no longer belong in the gallery.
        </p>
      </div>

      {gateState !== "unlocked" ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/45 px-4">
          <form className="paper-panel w-full max-w-sm rounded-[1.25rem] p-5 shadow-2xl" onSubmit={handleUnlock}>
            <p className="eyebrow">Private access</p>
            <h2 className="mt-3 text-2xl">Admin password</h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">Enter the private key to open the dashboard.</p>
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
            {gateMessage ? <p className="sr-only">{gateMessage}</p> : null}
          </form>
        </div>
      ) : null}

      {gateState === "unlocked" ? (
        <div className="mt-6 grid gap-5 lg:grid-cols-[0.75fr_1fr_0.8fr]">
          <aside className="paper-panel rounded-[1.25rem] p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="eyebrow">Items</p>
                <h2 className="mt-2 text-xl">Gallery list</h2>
              </div>
              <button type="button" className="button-secondary px-3 py-2 text-xs" onClick={resetForm}>
                Add New
              </button>
            </div>

            <div className="mt-4 grid max-h-[30rem] gap-2 overflow-y-auto pr-1">
              {isLoadingWorks ? <p className="text-sm text-[var(--muted)]">Loading works...</p> : null}
              {!isLoadingWorks && works.length === 0 ? <p className="text-sm text-[var(--muted)]">No works uploaded yet.</p> : null}
              {works.map((work) => (
                <button
                  key={work.id}
                  type="button"
                  onClick={() => selectWork(work.id)}
                  className={`grid grid-cols-[3.25rem_1fr] items-center gap-3 rounded-[1rem] border p-2 text-left ${
                    selectedId === work.id
                      ? "border-[var(--foreground)] bg-[var(--chip-surface)]"
                      : "border-[var(--line)] bg-transparent hover:bg-[var(--chip-surface)]"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={work.image} alt="" className="h-12 w-12 rounded-[0.7rem] object-cover" />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-[var(--foreground)]">{work.title}</span>
                    <span className="block text-xs text-[var(--muted)]">{work.category}</span>
                  </span>
                </button>
              ))}
            </div>
          </aside>

          <form className="paper-panel rounded-[1.25rem] p-5 md:p-6" onSubmit={handleSubmit}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="eyebrow">{isEditing ? "Update" : "Add"}</p>
                <h2 className="mt-2 text-2xl">{isEditing ? "Edit selected piece" : "Upload a new piece"}</h2>
              </div>
              {isEditing ? (
                <button type="button" className="button-secondary px-3 py-2 text-xs" onClick={resetForm}>
                  Clear Selection
                </button>
              ) : null}
            </div>

            <div className="mt-5 grid gap-4">
              <label className="grid gap-2 text-sm font-medium text-[var(--foreground)]">
                Artwork title
                <input className="input-field" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Family Celebration" />
              </label>

              <label className="grid gap-2 text-sm font-medium text-[var(--foreground)]">
                Category
                <select className="input-field" value={category} onChange={(event) => setCategory(event.target.value as ArtworkCategory)}>
                  {artworkCategories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm font-medium text-[var(--foreground)]">
                Photo {isEditing ? <span className="text-xs font-normal text-[var(--muted)]">Leave empty to keep the current image</span> : null}
                <input ref={fileInputRef} className="input-field" type="file" accept="image/*" onChange={handlePhotoChange} />
              </label>

              <div className="flex flex-wrap gap-3">
                <button type="submit" className="button-primary" disabled={status === "saving"}>
                  {status === "saving" ? "Saving..." : isEditing ? "Update piece" : "Upload piece"}
                </button>
                {isEditing ? (
                  <button type="button" className="button-secondary text-red-600" disabled={status === "saving"} onClick={handleDelete}>
                    Delete piece
                  </button>
                ) : null}
              </div>

              {message ? <p className="sr-only">{message}</p> : null}
            </div>
          </form>

          <div className="paper-card rounded-[1.25rem] p-3">
            <div className="art-frame h-[23rem] rounded-[1rem]">
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={preview} alt={title || "Gallery preview"} className="h-full w-full rounded-[0.8rem] object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center rounded-[0.8rem] bg-[var(--chip-surface)] text-sm text-[var(--muted)]">
                  Preview
                </div>
              )}
            </div>
            <div className="px-2 pb-2 pt-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl">{title || "Artwork title"}</h2>
                  <p className="mt-1 text-sm text-[var(--muted)]">{category}</p>
                </div>
                <span className="label-chip">{selectedWork?.date ?? "New"}</span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
