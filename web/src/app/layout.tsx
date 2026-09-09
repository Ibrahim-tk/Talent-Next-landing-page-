import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

/* Gridline stylesheets, in dependency order: primitives define the raw
   values, semantic aliases point at them, then the reset consumes the
   aliases. Application globals come last so they can override. */
import "@/gridline/tokens/primitives.css";
import "@/gridline/tokens/semantic.css";
import "@/gridline/styles/reset.css";
import "./globals.css";

import { site } from "@/content/site";

/* No next/font import: Helvetica Neue is the system's single typeface and
   is a platform font, not a hosted one, so it is declared as a font stack in
   gridline/tokens/primitives.css instead. Plus Jakarta Sans, Geist Mono and
   Space Mono were removed with that switch — the app downloads no webfont. */

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
