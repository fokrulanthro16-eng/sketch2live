import { NextRequest, NextResponse } from "next/server";
import { refineExistingUI } from "@/lib/gemini";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { currentHtml, instruction, apiKey, model = "gemini-1.5-flash" } = body;

    if (!currentHtml) {
      return NextResponse.json(
        { error: "Current HTML document is required for refinement." },
        { status: 400 }
      );
    }

    if (!instruction || !instruction.trim()) {
      return NextResponse.json(
        { error: "Refinement instruction cannot be empty." },
        { status: 400 }
      );
    }

    const result = await refineExistingUI({
      currentHtml,
      instruction: instruction.trim(),
      apiKey: apiKey || process.env.GEMINI_API_KEY,
      modelName: model,
    });

    return NextResponse.json({
      success: true,
      html: result.html,
      audit: result.audit,
      model: result.model,
    });
  } catch (error: any) {
    console.error("Gemini UI Refinement Error:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to refine UI.",
      },
      { status: 500 }
    );
  }
}
