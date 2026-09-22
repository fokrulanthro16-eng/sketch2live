"use client";

import { useState, useRef, useEffect } from "react";
import {
  Upload,
  Camera,
  Image as ImageIcon,
  Sparkles,
  Clipboard,
  X,
  Sliders,
  Check,
  ScanLine,
} from "lucide-react";
import { PRESETS, Preset } from "@/lib/presets";
import WebcamModal from "./WebcamModal";

interface ImageUploaderProps {
  selectedImage: string | null;
  onImageSelected: (base64OrUrl: string, mimeType?: string) => void;
  onClearImage: () => void;
  onGenerate: () => void;
  isLoading: boolean;
  customInstructions: string;
  onCustomInstructionsChange: (val: string) => void;
  activePresetId: string | null;
  onSelectPreset: (preset: Preset) => void;
}

export default function ImageUploader({
  selectedImage,
  onImageSelected,
  onClearImage,
  onGenerate,
  isLoading,
  customInstructions,
  onCustomInstructionsChange,
  activePresetId,
  onSelectPreset,
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [showPromptOptions, setShowPromptOptions] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Global Clipboard Paste Handler
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (!e.clipboardData) return;
      const items = e.clipboardData.items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            processFile(file);
            break;
          }
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (PNG, JPG, WEBP).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        onImageSelected(result, file.type);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleCameraCapture = (dataUrl: string) => {
    onImageSelected(dataUrl, "image/jpeg");
  };

  return (
    <div className="flex flex-col gap-5">
      {/* 1. Quick Presets Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            Built-in Sample Wireframes
          </label>
          <span className="text-[11px] text-zinc-500">1-Click Test</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {PRESETS.map((preset) => {
            const isSelected = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => onSelectPreset(preset)}
                className={`group relative flex flex-col items-start rounded-xl border p-3 text-left transition-all ${
                  isSelected
                    ? "border-blue-500 bg-blue-950/30 ring-1 ring-blue-500"
                    : "border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 hover:bg-zinc-900"
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <span className="text-xs font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {preset.title}
                  </span>
                  {isSelected && (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-white">
                      <Check className="h-2.5 w-2.5" />
                    </span>
                  )}
                </div>
                <span className="mt-1 text-[11px] text-zinc-400 line-clamp-2">
                  {preset.description}
                </span>
                <div className="mt-2.5 flex flex-wrap gap-1">
                  {preset.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-zinc-800 px-1.5 py-0.5 text-[9px] font-medium text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Drag & Drop / Preview Box */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
            <ImageIcon className="h-3.5 w-3.5 text-indigo-400" />
            Input Wireframe
          </label>
          {selectedImage && (
            <button
              onClick={onClearImage}
              className="text-[11px] text-zinc-400 hover:text-red-400 flex items-center gap-1 transition-colors"
            >
              <X className="h-3 w-3" /> Clear Image
            </button>
          )}
        </div>

        {selectedImage ? (
          /* Preview Display */
          <div className="relative rounded-xl border border-zinc-800 bg-zinc-900/50 p-2 overflow-hidden group">
            <div className="relative w-full rounded-lg overflow-hidden border border-zinc-800 bg-black/40 flex items-center justify-center min-h-[260px] max-h-[380px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedImage}
                alt="Selected Wireframe"
                className="w-full h-full object-contain"
              />
              <button
                onClick={onClearImage}
                className="absolute top-3 right-3 rounded-full bg-black/70 p-1.5 text-zinc-300 hover:bg-red-600 hover:text-white transition-all shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100"
                title="Remove image"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between px-1 text-[11px] text-zinc-400">
              <span className="flex items-center gap-1">
                <Check className="h-3 w-3 text-emerald-400" /> Ready for synthesis
              </span>
              <span className="text-zinc-500">Supports PNG, JPG, WebP</span>
            </div>
          </div>
        ) : (
          /* Dropzone */
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition-all ${
              isDragging
                ? "border-blue-500 bg-blue-500/10 scale-[0.99]"
                : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/80"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/webp"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  processFile(e.target.files[0]);
                }
              }}
              className="hidden"
            />

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800 text-zinc-300 shadow-inner group-hover:scale-110 transition-transform">
              <Upload className="h-6 w-6 text-blue-400" />
            </div>

            <p className="mt-3 text-sm font-semibold text-zinc-200">
              Drop your sketch here, or <span className="text-blue-400 underline">browse</span>
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Photos of notebook sketches, whiteboard mockups, or UI drawings
            </p>

            <div className="mt-4 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-zinc-800/80 px-2 py-1 text-[10px] font-medium text-zinc-400">
                <Clipboard className="h-2.5 w-2.5" /> Ctrl+V to paste
              </span>
            </div>
          </div>
        )}

        {/* 📸 Prominent Integrated Webcam Snapshot Action */}
        <div className="mt-2.5">
          <button
            type="button"
            onClick={() => setIsCameraModalOpen(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-blue-950/30 to-purple-950/40 py-2 px-3 text-xs font-semibold text-indigo-300 hover:border-indigo-500/60 hover:text-white transition-all shadow-sm"
          >
            <Camera className="h-4 w-4 text-indigo-400" />
            <span>📸 Snap Sketch with Camera</span>
            <span className="rounded bg-indigo-500/20 px-1.5 py-0.2 text-[9px] font-mono text-indigo-300">
              Zero Upload
            </span>
          </button>
        </div>
      </div>

      {/* 3. Optional Design Preferences */}
      <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-3">
        <button
          type="button"
          onClick={() => setShowPromptOptions(!showPromptOptions)}
          className="flex w-full items-center justify-between text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <Sliders className="h-3.5 w-3.5 text-blue-400" />
            Optional Styling Preferences
          </span>
          <span className="text-[11px] text-zinc-500">
            {showPromptOptions ? "Hide" : "Customize"}
          </span>
        </button>

        {showPromptOptions && (
          <div className="mt-3 pt-3 border-t border-zinc-800 space-y-2">
            <textarea
              value={customInstructions}
              onChange={(e) => onCustomInstructionsChange(e.target.value)}
              placeholder="E.g., Use an emerald and dark slate palette, soft shadows, rounded-2xl buttons, and high contrast typography..."
              rows={3}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-2.5 text-xs text-zinc-200 placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <p className="text-[10px] text-zinc-500">
              Gemini will incorporate these color & aesthetic cues while preserving the sketch wireframe structure.
            </p>
          </div>
        )}
      </div>

      {/* 4. Main Conversion Trigger CTA */}
      <button
        type="button"
        disabled={!selectedImage || isLoading}
        onClick={onGenerate}
        className={`group relative flex w-full items-center justify-center gap-2 rounded-xl py-3 px-4 text-sm font-semibold text-white shadow-lg transition-all duration-200 ${
          !selectedImage
            ? "cursor-not-allowed bg-zinc-800 text-zinc-500"
            : isLoading
            ? "cursor-wait bg-blue-700"
            : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.01] active:scale-[0.99]"
        }`}
      >
        {isLoading ? (
          <>
            <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            <span>Analyzing Wireframe Layout...</span>
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4 text-blue-200 group-hover:rotate-12 transition-transform" />
            <span>Convert to Live UI</span>
          </>
        )}
      </button>

      {/* Integrated Live Webcam Modal */}
      <WebcamModal
        isOpen={isCameraModalOpen}
        onClose={() => setIsCameraModalOpen(false)}
        onCapture={handleCameraCapture}
      />
    </div>
  );
}
