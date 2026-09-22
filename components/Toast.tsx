"use client";

import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export default function Toast({ toasts, onDismiss }: ToastProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center gap-2.5 rounded-xl border px-4 py-3 text-xs font-medium shadow-2xl backdrop-blur-md transition-all animate-in slide-in-from-bottom-5 duration-200 ${
            toast.type === "success"
              ? "border-emerald-500/30 bg-emerald-950/90 text-emerald-200 shadow-emerald-950/50"
              : toast.type === "error"
              ? "border-red-500/30 bg-red-950/90 text-red-200 shadow-red-950/50"
              : "border-blue-500/30 bg-zinc-900/95 text-zinc-200 shadow-black/60"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          ) : toast.type === "error" ? (
            <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
          ) : (
            <Info className="h-4 w-4 text-blue-400 shrink-0" />
          )}

          <span className="leading-snug">{toast.message}</span>

          <button
            onClick={() => onDismiss(toast.id)}
            className="ml-2 rounded p-0.5 text-zinc-400 hover:text-white"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ))}
    </div>
  );
}
