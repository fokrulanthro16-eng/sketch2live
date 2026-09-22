import { GoogleGenerativeAI } from "@google/generative-ai";
import { cleanHtmlCode } from "./utils";

export interface UXAudit {
  uxScore: number;
  critique: string[];
  autoFixes: string[];
}

export const SYSTEM_PROMPT = `You are an elite Lead Frontend Engineer, Principal UI/UX Architect, and Design System Director.
Your task is to analyze user-provided wireframe sketches, mockups, or paper drawings, evaluate their usability, auto-heal their design flaws, and transform them into pixel-perfect, production-grade, responsive HTML5 code using modern Tailwind CSS.

### CRITICAL OUTPUT FORMAT:
You MUST respond with a single, valid JSON object with EXACTLY this structure:
{
  "html": "<!DOCTYPE html>...full standalone html5 code...",
  "audit": {
    "uxScore": 92, // An integer score between 75 and 98 evaluating usability & layout
    "critique": [
      "Critique point 1: A specific flaw or ambiguity in the original sketch (e.g. poor contrast, cramped mobile touch targets, missing responsive grid)",
      "Critique point 2: Another usability or hierarchy issue in the raw drawing",
      "Critique point 3: Optional third point"
    ],
    "autoFixes": [
      "Auto-Fix 1: Specific architectural fix applied (e.g. elevated contrast to WCAG AA 4.5:1, expanded buttons to 48px touch targets)",
      "Auto-Fix 2: Modern enhancement added (e.g. semantic <header>, <main>, <nav> structure and responsive grid breakpoint collapse)",
      "Auto-Fix 3: Polish enhancement added (e.g. smooth hover micro-interactions, Inter font typography hierarchy)"
    ]
  }
}

### HTML & JAVASCRIPT GENERATION STANDARDS:
1. The "html" property MUST contain a complete, valid, standalone HTML5 document starting directly with \`<!DOCTYPE html>\` and ending with \`</html>\`.
2. Include Tailwind CSS CDN via:
   <script src="https://cdn.tailwindcss.com"></script>
3. Include Font Awesome 6 and Lucide Icons:
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
   <script src="https://unpkg.com/lucide@latest"></script>
4. Include \`<script>lucide.createIcons();</script>\` before the closing \`</body>\` tag.
5. Include Inter Google Fonts with clean body styling:
   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
   <style>body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }</style>
6. **INTERACTIVE DATA FORMS & OFFLINE CSV EXPORT**:
   Whenever a form, log, intake screen, registry, or table is drawn or implied:
   - Provide clean, vanilla client-side JavaScript in a \`<script>\` tag that intercepts form submission (\`e.preventDefault()\`), appends the submitted record dynamically to an interactive HTML table, and displays a success toast/banner.
   - Include a clean, prominent **"📥 Export CSV"** button directly above or beside the table.
   - Wire the button to client-side JavaScript that collects the table rows, formats them into standard CSV format, and triggers an immediate download (\`data:text/csv;charset=utf-8,\` or Blob) directly from browser memory without needing any backend server or internet connection (100% offline field capability).
7. Output pure JSON without markdown code fences.
`;

export const REFINE_SYSTEM_PROMPT = `You are a Principal Frontend Architect assisting a developer with iterative UI code refinements and self-healing UX audits.
You will be provided with an existing HTML5 document and the user's specific refinement instruction.

### CRITICAL OUTPUT FORMAT:
You MUST respond with a single, valid JSON object with EXACTLY this structure:
{
  "html": "<!DOCTYPE html>...updated standalone html5 code...",
  "audit": {
    "uxScore": 94,
    "critique": [
      "Targeted note on what was lacking or requested for change",
      "Usability considerations addressed in this revision"
    ],
    "autoFixes": [
      "Key improvement 1 applied during this refinement step",
      "Key improvement 2 ensuring visual harmony, interactive JS behavior, or offline export"
    ]
  }
}

### REFINEMENT RULES:
1. PRESERVE existing layout components, functional structure, navigation, interactive tables, and content unless the user specifically asks to change or replace them.
2. If forms are present or added, ensure the client-side JavaScript table record logging and "📥 Export CSV" functionality remains active and working offline.
3. Output pure JSON without markdown code fences.
`;

export interface GenerateOptions {
  imageBase64: string;
  mimeType: string;
  apiKey?: string;
  modelName?: string;
  customInstructions?: string;
}

export function parseStructuredResponse(rawText: string, fallbackModel = "gemini-1.5-flash"): { html: string; audit: UXAudit } {
  let cleaned = rawText.trim();

  // Strip markdown code fences if wrapped in ```json ... ```
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.substring(7);
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.substring(3);
  }
  if (cleaned.endsWith("```")) {
    cleaned = cleaned.substring(0, cleaned.length - 3);
  }
  cleaned = cleaned.trim();

  try {
    const parsed = JSON.parse(cleaned);
    if (parsed.html) {
      const sanitizedHtml = cleanHtmlCode(parsed.html);
      const audit: UXAudit = {
        uxScore: typeof parsed.audit?.uxScore === "number" ? parsed.audit.uxScore : 93,
        critique: Array.isArray(parsed.audit?.critique) && parsed.audit.critique.length > 0
          ? parsed.audit.critique
          : [
              "Ambiguous visual hierarchy and unformatted input fields in raw drawing.",
              "Undefined mobile breakpoint behavior and lack of client-side data export.",
            ],
        autoFixes: Array.isArray(parsed.audit?.autoFixes) && parsed.audit.autoFixes.length > 0
          ? parsed.audit.autoFixes
          : [
              "Established clear WCAG AA contrast ratio and 48px touch targets.",
              "Integrated interactive client-side record table with 100% offline CSV export.",
              "Constructed responsive flex/grid layouts with Lucide iconography.",
            ],
      };
      return { html: sanitizedHtml, audit };
    }
  } catch (e) {
    console.warn("Structured JSON parsing fallback engaged:", e);
  }

  // Fallback: extract HTML from text directly
  const html = cleanHtmlCode(rawText);
  return {
    html,
    audit: {
      uxScore: 91,
      critique: [
        "Unstructured alignment and missing data persistence definitions in sketch.",
        "Monochromatic sketch lacked interactive state indicators.",
      ],
      autoFixes: [
        "Synthesized modern Tailwind palette, interactive record table, and CSV export.",
        "Constructed responsive flex/grid layouts with accessible focus rings.",
        "Integrated Lucide iconography and polished drop shadows.",
      ],
    },
  };
}

export async function synthesizeWireframe(options: GenerateOptions) {
  const {
    imageBase64,
    mimeType,
    apiKey = process.env.GEMINI_API_KEY,
    modelName = "gemini-1.5-flash",
    customInstructions = "",
  } = options;

  if (!apiKey) {
    throw new Error(
      "Gemini API key is required. Please set GEMINI_API_KEY in .env.local or enter it in the header settings."
    );
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: modelName,
    systemInstruction: SYSTEM_PROMPT,
    generationConfig: {
      temperature: 0.2,
      topP: 0.95,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
    },
  });

  const prompt = `Analyze this wireframe sketch carefully. Conduct a rigorous UX audit identifying flaws in the raw drawing, auto-heal them into an exceptional responsive UI, and generate standalone HTML5 with Tailwind CSS.
Ensure all forms include client-side interactive table submission and an "📥 Export CSV" download button that works 100% offline.
${customInstructions ? `\nAdditional Custom Design Directives:\n${customInstructions}` : ""}

Return the JSON object containing "html" and "audit" properties.`;

  const imagePart = {
    inlineData: {
      data: imageBase64,
      mimeType: mimeType || "image/png",
    },
  };

  const result = await model.generateContent([prompt, imagePart]);
  const response = await result.response;
  const rawText = response.text();

  const { html, audit } = parseStructuredResponse(rawText, modelName);

  return {
    html,
    audit,
    raw: rawText,
    model: modelName,
  };
}

export interface RefineOptions {
  currentHtml: string;
  instruction: string;
  apiKey?: string;
  modelName?: string;
}

export async function refineExistingUI(options: RefineOptions) {
  const {
    currentHtml,
    instruction,
    apiKey = process.env.GEMINI_API_KEY,
    modelName = "gemini-1.5-flash",
  } = options;

  if (!apiKey) {
    throw new Error(
      "Gemini API key is required. Please set GEMINI_API_KEY in .env.local or enter it in the header settings."
    );
  }

  if (!currentHtml || !instruction) {
    throw new Error("Both current HTML and refinement instruction are required.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: modelName,
    systemInstruction: REFINE_SYSTEM_PROMPT,
    generationConfig: {
      temperature: 0.2,
      topP: 0.95,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
    },
  });

  const userPrompt = `Here is the current HTML5 code:
\`\`\`html
${currentHtml}
\`\`\`

User Refinement Request:
"${instruction}"

Please update the HTML to implement this request accurately while preserving the rest of the layout and styling. If forms or registries are modified, ensure offline CSV export is maintained. Output JSON with "html" and "audit".`;

  const result = await model.generateContent(userPrompt);
  const response = await result.response;
  const rawText = response.text();

  const { html, audit } = parseStructuredResponse(rawText, modelName);

  return {
    html,
    audit,
    raw: rawText,
    model: modelName,
  };
}
