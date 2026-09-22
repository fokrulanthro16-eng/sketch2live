"use client";

import { useState, useRef, useEffect } from "react";
import { Camera, X, RefreshCw, Sparkles, Check, AlertCircle } from "lucide-react";

interface WebcamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (dataUrl: string) => void;
}

export default function WebcamModal({ isOpen, onClose, onCapture }: WebcamModalProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");
  const [isCapturingFlash, setIsCapturingFlash] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      return;
    }
    startCamera();
    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode]);

  const startCamera = async () => {
    stopCamera();
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setHasPermission(true);
    } catch (err: any) {
      console.error("Camera access error:", err);
      setHasPermission(false);
      setCameraError(
        err.name === "NotAllowedError" || err.name === "PermissionDeniedError"
          ? "Camera permission was denied. Please allow camera access in your browser settings to snap your drawing."
          : "No camera device found or camera is in use by another application."
      );
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const handleCapture = () => {
    if (!videoRef.current) return;

    // Flash effect
    setIsCapturingFlash(true);
    setTimeout(() => setIsCapturingFlash(false), 250);

    const video = videoRef.current;
    let width = video.videoWidth || 1280;
    let height = video.videoHeight || 720;

    // Image Token Optimization: Downscale to max 1024px
    const maxDim = 1024;
    if (width > maxDim || height > maxDim) {
      if (width > height) {
        height = Math.round((height * maxDim) / width);
        width = maxDim;
      } else {
        width = Math.round((width * maxDim) / height);
        height = maxDim;
      }
    }

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.drawImage(video, 0, 0, width, height);
      // Compress to 85% JPEG quality for dramatic token efficiency
      const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
      onCapture(dataUrl);
      onClose();
    }
  };

  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl border border-zinc-800 bg-zinc-950 p-5 shadow-2xl shadow-black/90 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <Camera className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Live Sketch Camera Scanner</h3>
              <p className="text-[11px] text-zinc-400">Position your paper drawing inside the guideline frame</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Viewfinder Container */}
        <div className="mt-4 relative rounded-2xl overflow-hidden bg-black aspect-[4/3] sm:aspect-video border border-zinc-800 flex items-center justify-center">
          {cameraError ? (
            <div className="p-6 text-center max-w-md">
              <AlertCircle className="h-10 w-10 text-amber-400 mx-auto mb-3" />
              <p className="text-xs font-semibold text-white mb-1">Camera Unavailable</p>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">{cameraError}</p>
              <button
                onClick={startCamera}
                className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-800 border border-zinc-700 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-zinc-700"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Retry Camera
              </button>
            </div>
          ) : (
            <>
              {/* Live Video Feed */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />

              {/* Shutter Flash Animation */}
              {isCapturingFlash && (
                <div className="absolute inset-0 bg-white animate-in fade-in duration-100 pointer-events-none" />
              )}

              {/* Guideline Overlay Frame */}
              <div className="pointer-events-none absolute inset-6 sm:inset-8 border-2 border-dashed border-blue-400/60 rounded-2xl flex flex-col justify-between p-4">
                <div className="flex justify-between items-center text-[10px] font-mono text-blue-300/80 uppercase tracking-widest">
                  <span>[SKETCH_FRAME]</span>
                  <span>ALIGN WIREFRAME</span>
                </div>
                <div className="flex justify-center">
                  <span className="rounded-full bg-black/60 backdrop-blur-sm px-3 py-1 text-[11px] text-zinc-200 border border-white/10">
                    Hold paper steady & flat
                  </span>
                </div>
                <div className="flex justify-between text-[10px] font-mono text-blue-300/80">
                  <span>📐 1024PX OPTIMIZED</span>
                  <span>AUTO_FOCUS</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Controls */}
        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={toggleFacingMode}
            className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
            title="Switch between front and rear cameras"
          >
            <RefreshCw className="h-3.5 w-3.5 text-zinc-400" />
            <span className="hidden sm:inline">Flip Camera</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-zinc-800 px-4 py-2 text-xs font-medium text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 transition-colors"
            >
              Cancel
            </button>

            {!cameraError && (
              <button
                type="button"
                onClick={handleCapture}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-600/30 hover:from-blue-500 hover:to-indigo-500 hover:scale-105 active:scale-95 transition-all"
              >
                <Camera className="h-4 w-4" />
                <span>Snap Sketch Photo</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
