"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type ToastType = "success" | "error" | "info" | "warning";

type Toast = {
  id: number;
  title: string;
  message?: string;
  type: ToastType;
};

type ToastInput = Omit<Toast, "id">;

type ToastContextValue = {
  showToast: (toast: ToastInput) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);
const TOAST_LIFETIME_MS = 4600;

const toastStyles: Record<ToastType, string> = {
  success: "border-emerald-500/30 bg-emerald-50 text-emerald-950",
  error: "border-red-500/30 bg-red-50 text-red-950",
  info: "border-stone-400/40 bg-white text-stone-950",
  warning: "border-amber-500/35 bg-amber-50 text-amber-950",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismissToast = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (toast: ToastInput) => {
      const id = Date.now() + Math.random();
      setToasts((current) => [...current.slice(-3), { ...toast, id }]);
      window.setTimeout(() => dismissToast(id), TOAST_LIFETIME_MS);
    },
    [dismissToast],
  );

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-4 z-[120] grid w-[min(24rem,calc(100vw-2rem))] gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className={`rounded-[1rem] border px-4 py-3 shadow-[0_18px_45px_rgb(30_22_17_/_0.14)] ${toastStyles[toast.type]}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold">{toast.title}</p>
                {toast.message ? <p className="mt-1 text-sm opacity-75">{toast.message}</p> : null}
              </div>
              <button
                type="button"
                aria-label="Dismiss notification"
                className="rounded-full px-2 text-lg leading-none opacity-60 hover:opacity-100"
                onClick={() => dismissToast(toast.id)}
              >
                x
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context;
}
