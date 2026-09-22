"use client";

import { useState, useRef, useEffect } from "react";
import {
  Monitor,
  Tablet,
  Smartphone,
  RotateCcw,
  ExternalLink,
  Columns,
  Square,
  Image as ImageIcon,
  Sparkles,
} from "lucide-react";
import RefinementBar from "./RefinementBar";

interface LivePreviewProps {
  htmlCode: string;
  selectedImage?: string | null;
  onRefine?: (instruction: string) => Promise<void>;
  isRefining?: boolean;
}

type ViewportMode = "desktop" | "tablet" | "mobile";
type LayoutMode = "single" | "split";

export default function LivePreview({
  htmlCode,
  selectedImage,
  onRefine,
  isRefining = false,
}: LivePreviewProps) {
  const [viewport, setViewport] = useState<ViewportMode>("desktop");
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("single");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const splitIframeRef = useRef<HTMLIFrameElement>(null);

  // Auto-sync srcDoc whenever htmlCode changes
  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = htmlCode;
    }
    if (splitIframeRef.current) {
      splitIframeRef.current.srcdoc = htmlCode;
    }
  }, [htmlCode, layoutMode]);

  const handleRefresh = () => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = htmlCode;
    }
    if (splitIframeRef.current) {
      splitIframeRef.current.srcdoc = htmlCode;
    }
  };

  const handleOpenNewTab = () => {
    const blob = new Blob([htmlCode], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  return (
    <div className="flex h-full flex-col rounded-2xl border border-zinc-800/80 bg-zinc-950/60 overflow-hidden shadow-2xl shadow-black/40">
      {/* Top Toolbar / Viewport Switcher & Layout Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 bg-zinc-900/60 px-4 py-2.5">
        <div className="flex items-center gap-2">
          {/* Side-by-Side "Trace & Compare" View Toggle */}
          <div className="flex items-center rounded-lg border border-zinc-800 bg-zinc-950 p-1">
            <button
              onClick={() => setLayoutMode("single")}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition-all ${
                layoutMode === "single"
                  ? "bg-zinc-800 text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
              title="Single live interactive preview"
            >
              <Square className="h-3.5 w-3.5" />
              <span>Single View</span>
            </button>

            <button
              onClick={() => setLayoutMode("split")}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition-all ${
                layoutMode === "split"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
              title="Side-by-side Trace & Compare view"
            >
              <Columns className="h-3.5 w-3.5" />
              <span>Split Compare</span>
              <span className="rounded bg-blue-400/20 px-1 py-0.2 text-[9px] text-blue-300">
                Trace
              </span>
            </button>
          </div>

          {/* Device Viewport Buttons (Active in Single View) */}
          {layoutMode === "single" && (
            <div className="hidden sm:flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-950 p-1">
              <button
                onClick={() => setViewport("desktop")}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                  viewport === "desktop"
                    ? "bg-zinc-800 text-white shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
                title="Desktop (100% Full Width)"
              >
                <Monitor className="h-3.5 w-3.5" />
                <span className="hidden md:inline">Desktop</span>
              </button>

              <button
                onClick={() => setViewport("tablet")}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                  viewport === "tablet"
                    ? "bg-zinc-800 text-white shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
                title="Tablet (768px)"
              >
                <Tablet className="h-3.5 w-3.5" />
                <span className="hidden md:inline">Tablet</span>
              </button>

              <button
                onClick={() => setViewport("mobile")}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                  viewport === "mobile"
                    ? "bg-zinc-800 text-white shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
                title="Mobile (375px)"
              >
                <Smartphone className="h-3.5 w-3.5" />
                <span className="hidden md:inline">Mobile</span>
              </button>
            </div>
          )}
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-xs font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
            title="Reload Preview Sandbox"
          >
            <RotateCcw className="h-3.5 w-3.5 text-zinc-400" />
            <span className="hidden md:inline">Reload</span>
          </button>

          <button
            onClick={handleOpenNewTab}
            className="flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-xs font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
            title="Open standalone preview in new tab"
          >
            <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
            <span className="hidden md:inline">Open New Tab</span>
          </button>
        </div>
      </div>

      {/* Frame Sandbox Container */}
      <div className="relative flex flex-1 items-start justify-center bg-[#07090e] p-3 sm:p-5 overflow-auto min-h-[560px]">
        {layoutMode === "split" ? (
          /* Side-by-Side "Trace & Compare" Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-[580px]">
            {/* Left: Original Wireframe Sketch */}
            <div className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-xl">
              <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/90 px-3 py-2 text-xs font-semibold text-zinc-300">
                <span className="flex items-center gap-1.5">
                  <ImageIcon className="h-3.5 w-3.5 text-blue-400" />
                  Original Wireframe Sketch
                </span>
                <span className="rounded bg-blue-500/20 px-2 py-0.5 text-[10px] font-mono text-blue-300">
                  Input Ground Truth
                </span>
              </div>
              <div className="flex-1 bg-black/60 p-4 flex items-center justify-center overflow-hidden">
                {selectedImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={selectedImage}
                    alt="Original Wireframe Input"
                    className="max-h-full max-w-full object-contain rounded-lg shadow-md"
                  />
                ) : (
                  <div className="text-center text-zinc-500 text-xs">
                    No wireframe image selected
                  </div>
                )}
              </div>
            </div>

            {/* Right: Synthesized Live Interactive UI */}
            <div className="flex flex-col rounded-xl border border-zinc-800 bg-white overflow-hidden shadow-xl">
              <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/90 px-3 py-2 text-xs font-semibold text-zinc-300">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                  Live Synthesized UI (Tailwind)
                </span>
                <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono text-emerald-300">
                  Interactive Sandbox
                </span>
              </div>
              <iframe
                ref={splitIframeRef}
                srcDoc={htmlCode}
                title="Split Live Synthesized Preview"
                sandbox="allow-scripts allow-modals allow-forms allow-same-origin"
                className="w-full flex-1 border-none bg-white"
              />
            </div>
          </div>
        ) : (
          /* Single View with Device Viewport Simulator */
          <div
            className={`transition-all duration-300 ease-out flex flex-col bg-white overflow-hidden shadow-2xl ${
              viewport === "desktop"
                ? "w-full h-[580px] rounded-xl border border-zinc-800"
                : viewport === "tablet"
                ? "w-[768px] h-[580px] rounded-2xl border-4 border-zinc-800 ring-1 ring-zinc-700"
                : "w-[375px] h-[580px] rounded-[36px] border-[6px] border-zinc-800 ring-1 ring-zinc-700"
            }`}
          >
            {/* Simulated Mobile Notch / Dynamic Island */}
            {viewport === "mobile" && (
              <div className="h-5 w-full bg-zinc-900 flex items-center justify-center shrink-0">
                <div className="h-3 w-24 rounded-full bg-zinc-950" />
              </div>
            )}

            {/* Sandbox IFrame */}
            <iframe
              ref={iframeRef}
              srcDoc={htmlCode}
              title="Live Wireframe Synthesized Preview"
              sandbox="allow-scripts allow-modals allow-forms allow-same-origin"
              className="w-full flex-1 border-none bg-white"
            />

            {/* Simulated Mobile Home Bar */}
            {viewport === "mobile" && (
              <div className="h-4 w-full bg-zinc-900 flex items-center justify-center shrink-0">
                <div className="h-1 w-28 rounded-full bg-zinc-700" />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Iterative AI Refinement Bar ("Chat with your UI") */}
      {onRefine && (
        <RefinementBar onRefine={onRefine} isRefining={isRefining} />
      )}
    </div>
  );
}
