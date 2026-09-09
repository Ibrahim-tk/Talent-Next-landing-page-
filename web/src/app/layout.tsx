import type { Metadata, Viewport } from "next";
import { Geist_Mono, Plus_Jakarta_Sans, Space_Mono } from "next/font/google";
import type { ReactNode } from "react";

/* Gridline stylesheets, in dependency order: primitives define the raw
   values, semantic aliases point at them, then the reset consumes the
   aliases. Application globals come last so they can override. */
import "@/gridline/tokens/primitives.css";
import "@/gridline/tokens/semantic.css";
import "@/gridline/styles/reset.css";
import "./globals.css";

import { site } from "@/content/site";

/* Plus Jakarta Sans is the system's typeface, per the Figma reference
   (node 173-6514). Geist Mono is unchanged — nothing in the source material
   asked for a different mono pairing. Both are variable fonts, so no
   `weight` is declared: next/font rejects an explicit weight list for a
   variable family, and the whole axis is available either way. */
const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--gl-font-plus-jakarta",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--gl-font-geist-mono",
});

/* Space Mono is a one-off pairing for the hero headline's accent word only
   (the "TALENT" callout) — not a system-wide mono swap. It isn't a variable
   font, so the weights it actually ships (400/700) must be declared. */
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--gl-font-space-mono",
});

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  applicationName: site.name,
  openGraph: {
    title: site.title,
    description: site.description,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sansFont.variable} ${geistMono.variable} ${spaceMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
