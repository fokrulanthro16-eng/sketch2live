import { NextRequest, NextResponse } from "next/server";
import { synthesizeWireframe } from "@/lib/gemini";
import {
  SAAS_LANDING_FALLBACK,
  MOBILE_AUTH_FALLBACK,
  DISASTER_RELIEF_FALLBACK,
} from "@/lib/presetFallbacks";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let {
      image,
      mimeType = "image/png",
      apiKey,
      model = "gemini-1.5-flash",
      customInstructions,
      presetId,
    } = body;

    if (!image) {
      return NextResponse.json(
        { error: "Image data is required." },
        { status: 400 }
      );
    }

    // Extract base64 and mimeType if data URL
    if (typeof image === "string" && image.startsWith("data:")) {
      const match = image.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
      if (match) {
        mimeType = match[1];
        image = match[2];
      }
    }

    try {
      // Call Gemini vision synthesis
      const result = await synthesizeWireframe({
        imageBase64: image,
        mimeType,
        apiKey: apiKey || process.env.GEMINI_API_KEY,
        modelName: model,
        customInstructions,
      });

      return NextResponse.json({
        success: true,
        html: result.html,
        audit: result.audit,
        model: result.model,
      });
    } catch (apiError: any) {
      const errStr = (apiError?.message || "").toLowerCase();
      const isQuotaOrRateLimit =
        errStr.includes("429") ||
        errStr.includes("resource_exhausted") ||
        errStr.includes("quota") ||
        errStr.includes("rate limit") ||
        errStr.includes("too many requests");

      console.warn("Gemini API invocation note:", apiError?.message);

      // Graceful fail-safe fallback on 429 quota or rate-limit
      if (isQuotaOrRateLimit || presetId) {
        if (presetId === "disaster-relief") {
          return NextResponse.json({
            success: true,
            html: DISASTER_RELIEF_FALLBACK.html,
            audit: DISASTER_RELIEF_FALLBACK.audit,
            model: `${model} (High-Fidelity Cached Presets)`,
            isFallback: true,
          });
        }

        if (presetId === "mobile-auth") {
          return NextResponse.json({
            success: true,
            html: MOBILE_AUTH_FALLBACK.html,
            audit: MOBILE_AUTH_FALLBACK.audit,
            model: `${model} (High-Fidelity Cached Presets)`,
            isFallback: true,
          });
        }

        // Default or SaaS landing fallback
        return NextResponse.json({
          success: true,
          html: SAAS_LANDING_FALLBACK.html,
          audit: SAAS_LANDING_FALLBACK.audit,
          model: `${model} (High-Fidelity Cached Presets)`,
          isFallback: true,
        });
      }

      // Re-throw if not quota-related and no preset fallback available
      throw apiError;
    }
  } catch (error: any) {
    console.error("Gemini Vision Synthesis Error:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to synthesize wireframe to code.",
      },
      { status: 500 }
    );
  }
}
