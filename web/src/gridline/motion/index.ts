"use client";

/**
 * GRIDLINE — motion runtime
 *
 * Single place where GSAP and its plugins are registered, so no component
 * has to know about plugin setup and the registration only happens once.
 *
 * Import `gsap`, `ScrollTrigger` and `useGSAP` from here — never from the
 * packages directly.
 */

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { layout } from "../tokens";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export { gsap, ScrollTrigger, useGSAP };

export { layout, pinnedMediaQuery } from "../tokens";
export { prefersReducedMotion, useReducedMotion } from "./useReducedMotion";
export { useDarkNavRegion } from "./useDarkNavRegion";

/**
 * The sticky nav's actual rendered height, read from the DOM rather than the
 * `layout.headerHeight` constant. A pinned section's `start: "top <offset>"`
 * should call this instead of using the constant directly — it can't drift
 * out of sync with the real nav (a different font's line-height, a wrapped
 * nav link, anything that nudges the nav's real height) the way a hardcoded
 * number can, which is what leaves a pinned section's top edge sliding in
 * under the translucent nav instead of stopping flush below it.
 */
export function getStickyOffset(): number {
  if (typeof document === "undefined") return layout.headerHeight;
  const nav = document.getElementById("navbar");
  return nav ? nav.getBoundingClientRect().height : layout.headerHeight;
}
