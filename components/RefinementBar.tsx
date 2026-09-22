"use client";

import { useState } from "react";
import { Sparkles, Send, ArrowRight, CornerDownLeft, Wand2 } from "lucide-react";

interface RefinementBarProps {
  onRefine: (instruction: string) => Promise<void>;
  isRefining: boolean;
}

const QUICK_SUGGESTIONS = [
  "Switch to modern dark obsidian theme",
  "Add a 3-tier pricing cards section",
  "Make CTA button gradient purple with glow",
  "Add customer testimonials with avatar ratings",
  "Add mobile bottom navigation bar",
  "Enhance card hover animations with drop shadows",
];

export default function RefinementBar({ onRefine, isRefining }: RefinementBarProps) {
  const [instruction, setInstruction] = useState("");

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!instruction.trim() || isRefining) return;
    onRefine(instruction.trim());
    setInstruction("");
  };

  const handleChipClick = (promptText: string) => {
    if (isRefining) return;
    onRefine(promptText);
  };

  return (
    <div className="border-t border-zinc-800/80 bg-zinc-900/80 p-3 sm:p-4 backdrop-blur-md">
      {/* Quick Prompt Chips */}
      <div className="mb-2.5 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
        <span className="flex items-center gap-1 text-[11px] font-semibold text-zinc-400 shrink-0 mr-1">
          <Wand2 className="h-3 w-3 text-purple-400" /> Quick Refine:
        </span>
        {QUICK_SUGGESTIONS.map((chip, idx) => (
          <button
            key={idx}
            type="button"
            disabled={isRefining}
            onClick={() => handleChipClick(chip)}
            className="shrink-0 rounded-full border border-zinc-700/80 bg-zinc-800/60 px-2.5 py-1 text-[11px] text-zinc-300 hover:border-purple-500/50 hover:bg-purple-950/30 hover:text-purple-200 transition-all disabled:opacity-50 cursor-pointer"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Refine Input Form */}
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <div className="pointer-events-none absolute left-3 flex items-center">
          <Sparkles className={`h-4 w-4 ${isRefining ? "text-purple-400 animate-spin" : "text-zinc-400"}`} />
        </div>

        <input
          type="text"
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          disabled={isRefining}
          placeholder="Chat with your UI... (e.g. 'Make CTA button gradient purple', 'Add a 3-tier pricing section')"
          className="w-full rounded-xl border border-zinc-700 bg-zinc-950 py-2.5 pl-9 pr-24 text-xs text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all disabled:opacity-60"
        />

        <div className="absolute right-1.5 flex items-center gap-1">
          <button
            type="submit"
            disabled={!instruction.trim() || isRefining}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-md shadow-purple-600/30 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {isRefining ? (
              <>
                <span className="h-3 w-3 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                <span className="hidden sm:inline">Refining...</span>
              </>
            ) : (
              <>
                <span>Refine UI</span>
                <CornerDownLeft className="h-3 w-3 opacity-80" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
