"use client";

import { useState, useMemo } from "react";
import {
  Copy,
  Check,
  Download,
  FileCode,
  CheckCircle2,
  Atom,
  Edit3,
  Eye,
  MessageSquareCode,
  Flame,
} from "lucide-react";
import { downloadHtmlFile } from "@/lib/utils";
import { convertHtmlToReactTsx } from "@/lib/converter";

interface CodeViewerProps {
  htmlCode: string;
  onCodeChange?: (newHtml: string) => void;
  onShowToast?: (message: string, type?: "success" | "error" | "info") => void;
  currentPrompt?: string;
}

type FrameworkMode = "html" | "react";

export default function CodeViewer({
  htmlCode,
  onCodeChange,
  onShowToast,
  currentPrompt = "",
}: CodeViewerProps) {
  const [framework, setFramework] = useState<FrameworkMode>("html");
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [isEditMode, setIsEditMode] = useState(true);

  // Generate React TSX memoized
  const reactTsxCode = useMemo(() => {
    return convertHtmlToReactTsx(htmlCode);
  }, [htmlCode]);

  const activeDisplayCode = framework === "html" ? htmlCode : reactTsxCode;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(activeDisplayCode);
      setCopiedCode(true);
      if (onShowToast) {
        onShowToast(
          `Copied ${framework === "html" ? "HTML5 + Tailwind" : "React TSX"} code to clipboard!`,
          "success"
        );
      }
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleCopyPrompt = async () => {
    const promptText = currentPrompt || "Convert wireframe sketch to clean HTML5 + Tailwind CSS.";
    try {
      await navigator.clipboard.writeText(promptText);
      setCopiedPrompt(true);
      if (onShowToast) {
        onShowToast("Copied generation prompt to clipboard!", "info");
      }
      setTimeout(() => setCopiedPrompt(false), 2000);
    } catch (err) {
      console.error("Failed to copy prompt:", err);
    }
  };

  const handleDownload = () => {
    if (framework === "html") {
      downloadHtmlFile(htmlCode, "sketch2live-output.html");
      if (onShowToast) onShowToast("Downloaded sketch2live-output.html!", "success");
    } else {
      const blob = new Blob([reactTsxCode], { type: "text/typescript;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "GeneratedUI.tsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      if (onShowToast) onShowToast("Downloaded GeneratedUI.tsx!", "success");
    }
  };

  const lines = activeDisplayCode.split("\n");

  return (
    <div className="flex h-full flex-col rounded-2xl border border-zinc-800/80 bg-zinc-950/80 overflow-hidden shadow-2xl">
      {/* Code Header Bar with Framework Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 bg-zinc-900/60 px-4 py-2.5">
        {/* Framework Switcher Pills */}
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-zinc-800 bg-zinc-950 p-1">
            <button
              onClick={() => setFramework("html")}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition-all ${
                framework === "html"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <FileCode className="h-3.5 w-3.5" />
              <span>HTML5 + Tailwind</span>
            </button>

            <button
              onClick={() => setFramework("react")}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition-all ${
                framework === "react"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Atom className="h-3.5 w-3.5" />
              <span>React / Next.js TSX</span>
            </button>
          </div>

          {framework === "html" && onCodeChange && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-amber-400/90 bg-amber-950/30 border border-amber-800/30 px-2 py-0.5 rounded-full">
              <Flame className="h-3 w-3 text-amber-400" /> Hot-Reload Sync Active
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Edit / View Mode Toggle for HTML */}
          {framework === "html" && onCodeChange && (
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className="flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-xs font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all"
              title="Toggle Live Editable Editor"
            >
              {isEditMode ? (
                <>
                  <Eye className="h-3.5 w-3.5 text-zinc-400" />
                  <span className="hidden md:inline">View Only</span>
                </>
              ) : (
                <>
                  <Edit3 className="h-3.5 w-3.5 text-blue-400" />
                  <span className="hidden md:inline">Edit Code</span>
                </>
              )}
            </button>
          )}

          {/* Copy Prompt Button */}
          <button
            onClick={handleCopyPrompt}
            className="flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-xs font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all"
            title="Copy system and generation prompt"
          >
            {copiedPrompt ? (
              <Check className="h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <MessageSquareCode className="h-3.5 w-3.5 text-zinc-400" />
            )}
            <span className="hidden md:inline">Copy Prompt</span>
          </button>

          {/* Copy Code */}
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-200 hover:bg-zinc-800 hover:text-white transition-all"
            title="Copy code to clipboard"
          >
            {copiedCode ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-zinc-400" />
                <span>Copy Code</span>
              </>
            )}
          </button>

          {/* Download */}
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 rounded-lg border border-blue-600/40 bg-blue-600/10 px-3 py-1 text-xs font-medium text-blue-300 hover:bg-blue-600/20 hover:text-blue-200 transition-all"
            title={`Download ${framework === "html" ? "index.html" : "GeneratedUI.tsx"}`}
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">
              Download {framework === "html" ? "HTML" : "TSX"}
            </span>
          </button>
        </div>
      </div>

      {/* Code Editor Body: Live Editable or Read-Only */}
      <div className="relative flex-1 overflow-auto bg-[#090b10] font-mono text-xs text-zinc-300 min-h-[500px]">
        {framework === "html" && isEditMode && onCodeChange ? (
          /* Live Editable Code Textarea with Instant Sync */
          <div className="flex h-full min-h-[500px]">
            {/* Line Numbers Column */}
            <div className="select-none text-right text-zinc-600 py-4 pl-3 pr-3 border-r border-zinc-800/80 bg-[#07080d] shrink-0 font-mono">
              {lines.map((_, i) => (
                <div key={i} className="leading-6">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Editable Textarea */}
            <textarea
              value={htmlCode}
              onChange={(e) => onCodeChange(e.target.value)}
              spellCheck={false}
              className="w-full flex-1 bg-transparent p-4 font-mono text-xs text-zinc-200 leading-6 resize-none focus:outline-none focus:ring-0 selection:bg-blue-600/30"
              style={{ minHeight: "500px" }}
              placeholder="Edit your HTML/Tailwind classes here to hot-reload the preview in real-time..."
            />
          </div>
        ) : (
          /* Read-Only Syntax Block */
          <pre className="flex p-4">
            <div className="mr-4 select-none text-right text-zinc-600 pr-3 border-r border-zinc-800/80 shrink-0">
              {lines.map((_, i) => (
                <div key={i} className="leading-6">
                  {i + 1}
                </div>
              ))}
            </div>

            <code className="leading-6 block flex-1 whitespace-pre overflow-x-auto text-zinc-200">
              {lines.map((line, i) => (
                <div key={i}>{line || " "}</div>
              ))}
            </code>
          </pre>
        )}
      </div>

      {/* Footer Info */}
      <div className="border-t border-zinc-800/80 bg-zinc-900/40 px-4 py-2 flex items-center justify-between text-[11px] text-zinc-500">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="h-3 w-3 text-emerald-400" />
          {framework === "html"
            ? "Live Sync: Changes immediately reflect in Live Preview tab"
            : "TypeScript React component with Tailwind & Lucide icons"}
        </span>
        <span>
          {lines.length} lines • {activeDisplayCode.length} chars
        </span>
      </div>
    </div>
  );
}
