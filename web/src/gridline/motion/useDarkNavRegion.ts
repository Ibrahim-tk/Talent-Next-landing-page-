"use client";

import { useEffect } from "react";
import type { RefObject } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * `data-nav-theme` on `<html>`. `SiteHeader` reads this attribute (see
 * `SiteHeader.module.css`) to invert its own colours; nothing else should
 * read or set it directly.
 */
const NAV_THEME_ATTR = "data-nav-theme";

function setNavTheme(theme: "dark" | null) {
  const root = document.documentElement;
  if (theme) root.setAttribute(NAV_THEME_ATTR, theme);
  else root.removeAttribute(NAV_THEME_ATTR);
}

/**
 * Inverts the sticky nav to a dark theme for as long as the given element is
 * the active content in view — independent of whether that element is also
 * GSAP-pinned. A dark-surface section still needs this on mobile, where the
 * pin itself is skipped but the black background scrolls through the
 * viewport just the same.
 *
 * This is a plain discrete state toggle, not an eased animation, so — unlike
 * the pin/wipe/cross-fade choreography elsewhere — it runs regardless of
 * `prefers-reduced-motion`: reduced motion means less movement, not worse
 * nav contrast.
 *
 * ```tsx
 * const sectionRef = useRef<HTMLDivElement>(null);
 * useDarkNavRegion(sectionRef);
 * ```
 */
export function useDarkNavRegion(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const enterDark = () => setNavTheme("dark");
    const exitDark = () => setNavTheme(null);

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom top",
      onEnter: enterDark,
      onEnterBack: enterDark,
      onLeave: exitDark,
      onLeaveBack: exitDark,
    });

    return () => {
      trigger.kill();
      exitDark();
    };
  }, [ref]);
}
