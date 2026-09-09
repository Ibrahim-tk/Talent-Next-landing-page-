"use client";

import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Synchronous check, safe to call during an effect or a GSAP setup callback.
 * Returns `false` on the server, where no preference is knowable.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia(QUERY).matches;
}

/**
 * Reactive variant, for components that need to re-render when the viewer
 * changes the preference mid-session.
 *
 * Starts `false` so the server and first client render agree, then settles to
 * the real value after mount.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const list = window.matchMedia(QUERY);
    setReduced(list.matches);

    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    list.addEventListener("change", onChange);
    return () => list.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
