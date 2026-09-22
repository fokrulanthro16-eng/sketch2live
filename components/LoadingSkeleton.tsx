"use client";

import { Sparkles, Code, Layout, Cpu } from "lucide-react";

export default function LoadingSkeleton() {
  return (
    <div className="flex h-full min-h-[550px] w-full flex-col items-center justify-center rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-8 text-center backdrop-blur-sm">
      <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/10 shadow-xl shadow-blue-500/10">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 animate-pulse" />
        <Sparkles className="h-9 w-9 text-blue-400 animate-spin" style={{ animationDuration: "6s" }} />
      </div>

      <h3 className="text-base font-semibold text-white tracking-tight">
        Gemini Vision is Synthesizing Your Wireframe
      </h3>
      <p className="mt-1.5 max-w-sm text-xs text-zinc-400 leading-relaxed">
        Extracting bounding boxes, hierarchy, form elements, buttons, and applying responsive Tailwind CSS...
      </p>

      {/* Pulsing processing steps */}
      <div className="mt-6 flex flex-col gap-2.5 w-full max-w-xs text-left">
        <div className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/70 px-3 py-2 text-xs text-zinc-300">
          <Layout className="h-4 w-4 text-blue-400 animate-pulse" />
          <span>Detecting layout grid & structure</span>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/70 px-3 py-2 text-xs text-zinc-300">
          <Cpu className="h-4 w-4 text-indigo-400 animate-pulse" />
          <span>Synthesizing UI components & typography</span>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/70 px-3 py-2 text-xs text-zinc-300">
          <Code className="h-4 w-4 text-emerald-400 animate-pulse" />
          <span>Generating clean Tailwind CSS & HTML5</span>
        </div>
      </div>
    </div>
  );
}
