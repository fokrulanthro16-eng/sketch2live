import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sketch2Live - AI Wireframe to Live Code Studio",
  description: "Convert hand-drawn UI/UX wireframes into responsive HTML5 + Tailwind CSS with live interactive preview powered by Google Gemini Vision.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#09090b] text-[#f4f4f5] antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
