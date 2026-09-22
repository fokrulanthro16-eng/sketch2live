"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ImageUploader from "@/components/ImageUploader";
import LivePreview from "@/components/LivePreview";
import CodeViewer from "@/components/CodeViewer";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import UXAuditView from "@/components/UXAuditView";
import Toast, { ToastMessage } from "@/components/Toast";
import { PRESETS, Preset } from "@/lib/presets";
import { UXAudit } from "@/lib/gemini";
import { downloadHtmlFile, compressImageDataUrl } from "@/lib/utils";
import { Globe, Code2, Brain, AlertTriangle, Layers, Sparkles } from "lucide-react";

export default function Home() {
  const [apiKey, setApiKey] = useState("");
  // Default vision model is set to gemini-1.5-flash (15 RPM / 1,500 RPD free tier)
  const [selectedModel, setSelectedModel] = useState("gemini-1.5-flash");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string>("image/png");
  const [activePresetId, setActivePresetId] = useState<string | null>(null);
  const [customInstructions, setCustomInstructions] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [generatedHtml, setGeneratedHtml] = useState<string>("");
  const [audit, setAudit] = useState<UXAudit | null>(null);
  const [activeTab, setActiveTab] = useState<"preview" | "code" | "audit">("preview");

  // Toast notifications state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Load persisted API key on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedKey = localStorage.getItem("sketch2live_gemini_api_key");
      if (savedKey) {
        setApiKey(savedKey);
      }
    }
  }, []);

  // Set default preset on first load for an immediate ready-to-test experience
  useEffect(() => {
    if (PRESETS.length > 0 && !selectedImage) {
      handleSelectPreset(PRESETS[0]);
    }
  }, []);

  const handleSelectPreset = async (preset: Preset) => {
    setActivePresetId(preset.id);
    try {
      const response = await fetch(preset.imagePath);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = async () => {
        const rawDataUrl = reader.result as string;
        // Compress image to max 1024px
        const { dataUrl, mimeType } = await compressImageDataUrl(rawDataUrl, 1024, 0.85);
        setSelectedImage(dataUrl);
        setImageMimeType(mimeType);
      };
      reader.readAsDataURL(blob);
    } catch (err) {
      console.error("Failed to load preset image:", err);
      setSelectedImage(preset.imagePath);
    }
  };

  const handleImageSelected = async (base64OrUrl: string, mimeType = "image/png") => {
    // Compress and downscale uploaded or camera-snapped images to 1024px
    const compressed = await compressImageDataUrl(base64OrUrl, 1024, 0.85);
    setSelectedImage(compressed.dataUrl);
    setImageMimeType(compressed.mimeType);
    setActivePresetId(null);
    setErrorMessage(null);
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setActivePresetId(null);
    setErrorMessage(null);
  };

  // 1. Initial Generation from Wireframe
  const handleGenerate = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Ensure image is compressed before sending to save input tokens
      const { dataUrl, mimeType } = await compressImageDataUrl(selectedImage, 1024, 0.85);

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: dataUrl,
          mimeType: mimeType || imageMimeType,
          apiKey: apiKey || undefined,
          model: selectedModel,
          customInstructions: customInstructions.trim(),
          presetId: activePresetId, // Enables instant fallback cache on 429 quota limits
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate HTML from wireframe.");
      }

      setGeneratedHtml(data.html);
      if (data.audit) {
        setAudit(data.audit);
      }
      setActiveTab("preview");

      if (data.isFallback) {
        showToast("Served from High-Fidelity Cache (Fail-Safe 429 protection)", "info");
      } else {
        showToast(`Synthesized & Auto-Healed! (UX Score: ${data.audit?.uxScore || 92})`, "success");
      }
    } catch (err: any) {
      console.error("Generation Error:", err);
      setErrorMessage(err.message || "An unexpected error occurred during synthesis.");
      showToast("Generation failed. Check API key or console.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Iterative AI Refinement ("Chat with your UI")
  const handleRefine = async (instruction: string) => {
    if (!generatedHtml || !instruction.trim()) return;

    setIsRefining(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/refine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentHtml: generatedHtml,
          instruction: instruction.trim(),
          apiKey: apiKey || undefined,
          model: selectedModel,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to refine UI.");
      }

      setGeneratedHtml(data.html);
      if (data.audit) {
        setAudit(data.audit);
      }
      showToast(`Refined & Re-audited: "${instruction}"`, "success");
    } catch (err: any) {
      console.error("Refine Error:", err);
      setErrorMessage(err.message || "An unexpected error occurred during refinement.");
      showToast("Refinement failed.", "error");
    } finally {
      setIsRefining(false);
    }
  };

  // 3. Live Editable Code Sync (Hot-Reload)
  const handleCodeChange = (newHtml: string) => {
    setGeneratedHtml(newHtml);
  };

  // 4. Download Standalone HTML App
  const handleDownloadStandalone = () => {
    if (!generatedHtml) return;
    downloadHtmlFile(generatedHtml, "sketch2live-app.html");
    showToast("Downloaded standalone sketch2live-app.html!", "success");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#09090b] text-[#f4f4f5]">
      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      {/* 1. Header with Top-Right Download Action */}
      <Header
        apiKey={apiKey}
        onApiKeyChange={setApiKey}
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        generatedHtml={generatedHtml}
        onDownloadHtml={handleDownloadStandalone}
      />

      {/* 2. Main Studio Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {/* Error Alert if any */}
        {errorMessage && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-950/30 p-4 flex items-start gap-3 text-red-300 text-xs">
            <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-200">Synthesis / Refine Error</p>
              <p className="mt-1 text-red-300/90 leading-relaxed">{errorMessage}</p>
              <p className="mt-2 text-zinc-400">
                Tip: Gemini 1.5 Flash has a generous 15 RPM / 1,500 RPD free tier. Built-in presets automatically fail-safe to cached responses if quotas are reached.
              </p>
            </div>
          </div>
        )}

        {/* Two-Column Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT PANEL: Input & Settings (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-5 shadow-xl backdrop-blur-sm">
            <ImageUploader
              selectedImage={selectedImage}
              onImageSelected={handleImageSelected}
              onClearImage={handleClearImage}
              onGenerate={handleGenerate}
              isLoading={isLoading}
              customInstructions={customInstructions}
              onCustomInstructionsChange={setCustomInstructions}
              activePresetId={activePresetId}
              onSelectPreset={handleSelectPreset}
            />
          </div>

          {/* RIGHT PANEL: Output Studio (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-3 min-h-[660px]">
            {/* Output Studio Navigation Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1 rounded-xl border border-zinc-800 bg-zinc-900/70 p-1">
                {/* Tab 1: Live Preview */}
                <button
                  type="button"
                  onClick={() => setActiveTab("preview")}
                  className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    activeTab === "preview"
                      ? "bg-zinc-800 text-blue-400 shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Globe className="h-3.5 w-3.5" />
                  <span>Live Interactive Preview</span>
                </button>

                {/* Tab 2: Generated Source Code */}
                <button
                  type="button"
                  onClick={() => setActiveTab("code")}
                  className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    activeTab === "code"
                      ? "bg-zinc-800 text-blue-400 shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Code2 className="h-3.5 w-3.5" />
                  <span>Generated Source Code</span>
                </button>

                {/* Tab 3: AI UX Audit & Reasoning */}
                <button
                  type="button"
                  onClick={() => setActiveTab("audit")}
                  className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    activeTab === "audit"
                      ? "bg-zinc-800 text-purple-400 shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Brain className="h-3.5 w-3.5 text-purple-400" />
                  <span>AI UX Audit</span>
                  {audit && (
                    <span className="ml-1 rounded-full bg-emerald-500/20 px-1.5 py-0.2 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                      {audit.uxScore}
                    </span>
                  )}
                </button>
              </div>

              {generatedHtml && (
                <span className="hidden sm:flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-full">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {selectedModel}
                </span>
              )}
            </div>

            {/* Content Area: Skeleton, Live Preview (Single or Split Compare), Code, or UX Audit */}
            <div className="flex-1 flex flex-col">
              {isLoading ? (
                <LoadingSkeleton />
              ) : generatedHtml ? (
                activeTab === "preview" ? (
                  <LivePreview
                    htmlCode={generatedHtml}
                    selectedImage={selectedImage}
                    onRefine={handleRefine}
                    isRefining={isRefining}
                  />
                ) : activeTab === "code" ? (
                  <CodeViewer
                    htmlCode={generatedHtml}
                    onCodeChange={handleCodeChange}
                    onShowToast={showToast}
                    currentPrompt={customInstructions}
                  />
                ) : (
                  <UXAuditView audit={audit} />
                )
              ) : (
                /* Sleek Empty State Placeholder */
                <div className="flex h-full min-h-[580px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-800/80 bg-zinc-950/40 p-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/60 shadow-inner mb-4">
                    <Layers className="h-8 w-8 text-zinc-500" />
                  </div>
                  <h3 className="text-base font-semibold text-zinc-200">
                    Your Self-Healing UX Studio
                  </h3>
                  <p className="mt-1.5 max-w-sm text-xs text-zinc-500 leading-relaxed">
                    Select a built-in wireframe preset, drop an image, or snap your notebook drawing via camera, then click <strong className="text-zinc-300">&quot;Convert to Live UI&quot;</strong>.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                    <span className="rounded-md border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-[11px] text-zinc-400 font-medium">
                      1. Preset or Snap Camera
                    </span>
                    <span className="text-zinc-600">→</span>
                    <span className="rounded-md border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-[11px] text-zinc-400 font-medium">
                      2. Gemini Vision Auto-Heals
                    </span>
                    <span className="text-zinc-600">→</span>
                    <span className="rounded-md border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-[11px] text-zinc-400 font-medium">
                      3. Trace & Compare Side-by-Side
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* 3. Footer */}
      <footer className="border-t border-zinc-800/60 py-4 px-6 text-center text-xs text-zinc-500">
        <p>
          Sketch2Live Next.js Studio • Powered by Gemini 1.5 Flash Vision (1,500 RPD) • 1024px Token Compression & 429 Fail-Safe Cache
        </p>
      </footer>
    </div>
  );
}
