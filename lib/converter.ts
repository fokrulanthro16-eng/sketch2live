/**
 * Converts pure HTML5 + Tailwind CSS into clean, production-ready React / Next.js TSX component code.
 */

export function convertHtmlToReactTsx(htmlCode: string, componentName = "SynthesizedPage"): string {
  if (!htmlCode) return "";

  // 1. Extract content inside <body>...</body> if present
  let jsxBody = htmlCode;
  const bodyMatch = htmlCode.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch && bodyMatch[1]) {
    jsxBody = bodyMatch[1];
  } else {
    // Strip <!DOCTYPE>, <html>, <head> tags if body not explicitly found
    jsxBody = jsxBody
      .replace(/<!DOCTYPE[^>]*>/gi, "")
      .replace(/<html[^>]*>/gi, "")
      .replace(/<\/html>/gi, "")
      .replace(/<head[\s\S]*?<\/head>/gi, "");
  }

  // 2. Remove external script tags from inside body (e.g. lucide.createIcons or CDN scripts)
  jsxBody = jsxBody.replace(/<script[\s\S]*?<\/script>/gi, "");

  // 3. Replace HTML attributes with JSX equivalents
  // class="..." -> className="..."
  jsxBody = jsxBody.replace(/\bclass=(["'])/gi, "className=$1");

  // for="..." -> htmlFor="..."
  jsxBody = jsxBody.replace(/\bfor=(["'])/gi, "htmlFor=$1");

  // SVG camelCase attributes
  jsxBody = jsxBody
    .replace(/\bstroke-width=/gi, "strokeWidth=")
    .replace(/\bstroke-linecap=/gi, "strokeLinecap=")
    .replace(/\bstroke-linejoin=/gi, "strokeLinejoin=")
    .replace(/\bstroke-miterlimit=/gi, "strokeMiterlimit=")
    .replace(/\bfill-rule=/gi, "fillRule=")
    .replace(/\bclip-rule=/gi, "clipRule=")
    .replace(/\bclip-path=/gi, "clipPath=")
    .replace(/\bstop-color=/gi, "stopColor=")
    .replace(/\bstop-opacity=/gi, "stopOpacity=");

  // style="background-color: red; ..." -> style={{ ... }} or keep clean Tailwind
  jsxBody = jsxBody.replace(/\bstyle="([^"]*)"/gi, (match, styleStr) => {
    // Convert basic inline CSS string into JSX style object
    const styles: string[] = [];
    styleStr.split(";").forEach((pair: string) => {
      const [k, v] = pair.split(":");
      if (k && v) {
        const camelK = k.trim().replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        styles.push(`${camelK}: "${v.trim()}"`);
      }
    });
    return styles.length > 0 ? `style={{ ${styles.join(", ")} }}` : "";
  });

  // 4. Ensure void tags are properly self-closed (<input>, <img>, <br>, <hr>)
  const voidTags = ["input", "img", "br", "hr", "link", "meta", "source"];
  voidTags.forEach((tag) => {
    const regex = new RegExp(`<(${tag})([^>]*?)(?<!\\/)>`, "gi");
    jsxBody = jsxBody.replace(regex, "<$1$2 />");
  });

  // Format indentation
  const indentedBody = jsxBody
    .trim()
    .split("\n")
    .map((line) => (line.trim() ? `    ${line}` : ""))
    .join("\n");

  return `import React from "react";
// Tip: Ensure Tailwind CSS and Lucide Icons (lucide-react) are installed in your Next.js project.

export default function ${componentName}() {
  return (
${indentedBody}
  );
}
`;
}
