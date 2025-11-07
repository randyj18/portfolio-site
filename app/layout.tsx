import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Randy Jones | AI Strategy & Product Leader",
  description: "Leadership for the age of exponential change. Bridging strategic vision and technical execution to drive meaningful transformation.",
  keywords: ["AI Strategy", "Product Leadership", "Enterprise Transformation", "Technical Leadership", "AI Governance"],
  authors: [{ name: "Randy Jones" }],
  openGraph: {
    title: "Randy Jones | AI Strategy & Product Leader",
    description: "Leadership for the age of exponential change. Bridging strategic vision and technical execution to drive meaningful transformation.",
    url: "https://randyjones.ca",
    siteName: "Randy Jones",
    locale: "en_CA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
