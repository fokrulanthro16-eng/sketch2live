import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cleanHtmlCode(rawText: string): string {
  if (!rawText) return "";

  let text = rawText.trim();

  // Pattern match code fences like ```html ... ``` or ``` ... ```
  const codeBlockRegex = /^```(?:html|xml)?\s*\n?([\s\S]*?)\n?```$/i;
  const match = text.match(codeBlockRegex);
  if (match && match[1]) {
    text = match[1].trim();
  } else {
    // Fallback manual trimming
    if (text.startsWith("```html")) {
      text = text.substring(7);
    } else if (text.startsWith("```")) {
      text = text.substring(3);
    }
    if (text.endsWith("```")) {
      text = text.substring(0, text.length - 3);
    }
    text = text.trim();
  }

  // Find start of HTML document
  let htmlStart = text.indexOf("<!DOCTYPE html");
  if (htmlStart === -1) {
    htmlStart = text.indexOf("<html");
  }

  if (htmlStart !== -1) {
    const htmlEnd = text.lastIndexOf("</html>");
    if (htmlEnd !== -1) {
      text = text.substring(htmlStart, htmlEnd + 7);
    } else {
      text = text.substring(htmlStart);
    }
  }

  text = text.trim();

  // Ensure minimal HTML structure exists
  if (!text.includes("<!DOCTYPE html") && !text.includes("<html")) {
    text = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sketch2Live Synthesized UI</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <script src="https://unpkg.com/lucide@latest"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }</style>
</head>
<body class="bg-slate-900 text-slate-100 min-h-screen">
${text}
  <script>if (window.lucide) lucide.createIcons();</script>
</body>
</html>`;
  }

  return text;
}

export function downloadHtmlFile(content: string, filename = "index.html") {
  const blob = new Blob([content], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Downscales and compresses image data URLs to max 1024px before sending to Gemini,
 * drastically reducing multimodal input token usage and speeding up inference.
 */
export async function compressImageDataUrl(
  dataUrl: string,
  maxDimension = 1024,
  quality = 0.85
): Promise<{ dataUrl: string; mimeType: string }> {
  // If not running in browser, return unchanged
  if (typeof window === "undefined" || !dataUrl.startsWith("data:")) {
    return { dataUrl, mimeType: "image/png" };
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;

      // Only resize if exceeds maxDimension
      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve({ dataUrl, mimeType: "image/jpeg" });
        return;
      }

      // Fill white background to avoid transparent PNG issues when saving to JPEG
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);

      const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
      resolve({ dataUrl: compressedDataUrl, mimeType: "image/jpeg" });
    };

    img.onerror = () => {
      resolve({ dataUrl, mimeType: "image/png" });
    };

    img.src = dataUrl;
  });
}
