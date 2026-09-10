"use client";

import { useEffect } from "react";
import type { RefObject } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * `data-nav-theme` on `<html>`. `SiteHeader` reads this attribute (see
 * `SiteHeader.module.css`) to restyle itself; nothing else should read or
 * set it directly.
 */
const NAV_THEME_ATTR = "data-nav-theme";

/**
 * How the nav should look over the region.
 *
 * - `dark` — a dark translucent bar. For a dark *surface* underneath, where
 *   the bar is still meant to read as a bar.
 * - `overlay` — no bar at all: transparent, no hairline, just a soft scrim
 *   for legibility. For a full-bleed image that is meant to run behind the
 *   nav rather than stop under it.
 */
export type NavRegionTheme = "dark" | "overlay";

function setNavTheme(theme: NavRegionTheme | null) {
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
 * useDarkNavRegion(sectionRef);            // dark translucent bar
 * useDarkNavRegion(sectionRef, "overlay"); // no bar; image runs behind it
 * ```
 */
export function useDarkNavRegion(
  ref: RefObject<HTMLElement | null>,
  theme: NavRegionTheme = "dark",
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const enterDark = () => setNavTheme(theme);
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

    // A ScrollTrigger that is already in range when it is created does not
    // reliably fire `onEnter` for that initial state — it reports the state
    // but leaves the callback for a real crossing. That is invisible for a
    // section further down the page, but a hero region is in range at
    // scroll zero on every single load, so the nav would keep its default
    // styling until the visitor scrolled past the hero and back.
    //
    // Read straight off the DOM rather than off `trigger.isActive`: this is
    // the same condition the trigger encodes (`top top` to `bottom top`, so
    // "the element's top is at or above the viewport top and its bottom is
    // still below it"), and evaluating it here doesn't depend on how far
    // ScrollTrigger has got with its own first refresh. `setNavTheme` just
    // writes an attribute, so doing it twice costs nothing on the loads
    // where the callback does fire.
    const rect = el.getBoundingClientRect();
    if (rect.top <= 0 && rect.bottom > 0) enterDark();

    return () => {
      trigger.kill();
      exitDark();
    };
  }, [ref, theme]);
}
