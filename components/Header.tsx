"use client";

import { useState, useEffect } from "react";
import {
  Zap,
  Key,
  Check,
  Eye,
  EyeOff,
  X,
  ExternalLink,
  Sparkles,
  Download,
} from "lucide-react";

interface HeaderProps {
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  selectedModel: string;
  onModelChange: (model: string) => void;
  generatedHtml?: string;
  onDownloadHtml?: () => void;
}

export default function Header({
  apiKey,
  onApiKeyChange,
  selectedModel,
  onModelChange,
  generatedHtml,
  onDownloadHtml,
}: HeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey);
  const [showKey, setShowKey] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setTempKey(apiKey);
  }, [apiKey]);

  const handleSave = () => {
    onApiKeyChange(tempKey.trim());
    if (typeof window !== "undefined") {
      if (tempKey.trim()) {
        localStorage.setItem("sketch2live_gemini_api_key", tempKey.trim());
      } else {
        localStorage.removeItem("sketch2live_gemini_api_key");
      }
    }
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setIsModalOpen(false);
    }, 800);
  };

  const handleClear = () => {
    setTempKey("");
    onApiKeyChange("");
    if (typeof window !== "undefined") {
      localStorage.removeItem("sketch2live_gemini_api_key");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md px-4 lg:px-8 py-3 transition-colors">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-md shadow-blue-500/20">
              <Zap className="h-5 w-5 text-white fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-white">Sketch2Live</span>
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-blue-500/30 bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-blue-400">
                  <Sparkles className="h-2.5 w-2.5" /> Next.js Studio
                </span>
              </div>
              <p className="hidden md:block text-xs text-zinc-400">
                Wireframe Sketch & Whiteboard to Live HTML5 + Tailwind CSS
              </p>
            </div>
          </div>

          {/* Model Selector, API Key Settings & Top Download Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Vision Model Selector */}
            <div className="relative">
              <select
                value={selectedModel}
                onChange={(e) => onModelChange(e.target.value)}
                className="h-8 rounded-lg border border-zinc-800 bg-zinc-900/90 px-2.5 text-xs font-medium text-zinc-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
              >
                <option value="gemini-1.5-flash">Gemini 1.5 Flash (Fast)</option>
                <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
                <option value="gemini-1.5-pro">Gemini 1.5 Pro (Deep Reasoning)</option>
                <option value="gemini-2.0-flash">Gemini 2.0 Flash</option>
              </select>
            </div>

            {/* API Key Modal Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className={`flex h-8 items-center gap-1.5 rounded-lg border px-3 text-xs font-medium transition-all ${
                apiKey
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                  : "border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20"
              }`}
            >
              <Key className="h-3.5 w-3.5" />
              <span className="hidden xs:inline">
                {apiKey ? "API Key Configured" : "Configure API Key"}
              </span>
              <span className={`h-2 w-2 rounded-full ${apiKey ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
            </button>

            {/* 💾 Primary "Download .html" Action Button */}
            {generatedHtml && onDownloadHtml && (
              <button
                type="button"
                onClick={onDownloadHtml}
                className="flex h-8 items-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 px-3 text-xs font-bold text-white shadow-md shadow-emerald-600/30 hover:from-emerald-500 hover:to-teal-500 hover:scale-105 active:scale-95 transition-all"
                title="Download standalone index.html ready to run offline"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download .html</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* API Key Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl shadow-black/80">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Key className="h-4 w-4 text-blue-400" />
                <h3>Gemini API Key Settings</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <p className="text-xs text-zinc-400 leading-relaxed">
                Your API key is stored locally in your browser&apos;s <code className="text-zinc-300 bg-zinc-800 px-1 py-0.5 rounded">localStorage</code> and transmitted securely only to your Next.js route handler. If left blank, the server will fall back to <code className="text-zinc-300 bg-zinc-800 px-1 py-0.5 rounded">GEMINI_API_KEY</code> environment variable.
              </p>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Google Gemini API Key
                </label>
                <div className="relative">
                  <input
                    type={showKey ? "text" : "password"}
                    value={tempKey}
                    onChange={(e) => setTempKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 pr-10 text-xs font-mono text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-2.5 top-2.5 text-zinc-400 hover:text-white"
                  >
                    {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-zinc-400">
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-400 hover:underline"
                >
                  Get a free Gemini API key <ExternalLink className="h-3 w-3" />
                </a>
                {tempKey && (
                  <button
                    onClick={handleClear}
                    className="text-red-400 hover:underline"
                  >
                    Clear Key
                  </button>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-zinc-700 px-4 py-1.5 text-xs font-medium text-zinc-300 hover:bg-zinc-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-blue-500 transition-all shadow-md shadow-blue-600/30"
                >
                  {savedSuccess ? (
                    <>
                      <Check className="h-3.5 w-3.5" /> Saved!
                    </>
                  ) : (
                    "Save & Apply"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
