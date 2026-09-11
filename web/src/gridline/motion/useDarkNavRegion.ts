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
 * How far below the viewport top a region may still start and count as
 * already in range on the first paint. See the long note at the call site
 * for why this is not zero.
 */
const INITIAL_RANGE_SLACK_PX = 2;

/**
 * How the nav should look over the region.
 *
 * - `dark` — a dark translucent bar. For a dark *surface* underneath, where
 *   the bar is still meant to read as a bar.
 * - `overlay` — no bar at all: transparent, no hairline, just a soft scrim
 *   for legibility. For a full-bleed image that is meant to run behind the
 *   nav rather than stop under it.
 * - `blur` — a glass bar: the photograph behind it stays visible but is
 *   blurred out and dimmed, so the bar still reads as a bar without
 *   putting an opaque plate on top of the picture. Also for a full-bleed
 *   image running behind the nav; the difference from `overlay` is whether
 *   the bar is meant to have an edge of its own.
 */
export type NavRegionTheme = "dark" | "overlay" | "blur";

/**
 * Every region currently in view, oldest first, each identified by a token
 * private to one hook instance. The last entry wins.
 *
 * A single "current theme" variable is not enough once two dark sections
 * are stacked with no light section between them (Deliverables into
 * "See It in Action"): their ranges meet at exactly one scroll position, so
 * the leaving section's `onLeave` and the arriving one's `onEnter` both
 * fire for the same scroll event. With one variable, whichever fires second
 * decides — and when it is the `onLeave`, it clears a theme the arriving
 * section had just asked for and the bar goes white over a black band.
 * Tracking the set instead makes the two callbacks order-independent:
 * leaving removes only that region's own claim, and the bar stays dark for
 * as long as anything still claims it.
 */
const activeRegions: { token: object; theme: NavRegionTheme }[] = [];

function syncNavTheme() {
  const root = document.documentElement;
  const active = activeRegions[activeRegions.length - 1];
  if (active) root.setAttribute(NAV_THEME_ATTR, active.theme);
  else root.removeAttribute(NAV_THEME_ATTR);
}

function enterRegion(token: object, theme: NavRegionTheme) {
  const existing = activeRegions.findIndex((region) => region.token === token);
  if (existing !== -1) activeRegions.splice(existing, 1);
  // Pushed to the end so the most recently entered region is the one that
  // shows, which is what you want in the one case two can genuinely overlap:
  // an `overlay` hero whose image runs under the bar should beat a plain
  // dark surface behind it.
  activeRegions.push({ token, theme });
  syncNavTheme();
}

function exitRegion(token: object) {
  const existing = activeRegions.findIndex((region) => region.token === token);
  if (existing === -1) return;
  activeRegions.splice(existing, 1);
  syncNavTheme();
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
 * useDarkNavRegion(sectionRef, "blur");    // glass bar over the image
 * ```
 *
 * A ref that is never attached to anything is a no-op, which is how a
 * section with both a light and a dark treatment opts in: call the hook
 * unconditionally (hooks cannot be conditional) and attach the ref only in
 * the dark case. See `SeeItInActionSection`.
 */
export function useDarkNavRegion(
  ref: RefObject<HTMLElement | null>,
  theme: NavRegionTheme = "dark",
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Identity for this hook instance's claim on the nav, for as long as the
    // effect lives.
    const token = {};
    const enterDark = () => enterRegion(token, theme);
    const exitDark = () => exitRegion(token);

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
    // ScrollTrigger has got with its own first refresh. Entering is
    // idempotent per token, so doing it twice costs nothing on the loads
    // where the callback does fire.
    //
    // The slack is not cosmetic. A hero that runs behind the nav cancels the
    // bar's height with a negative margin, and "the bar's height" is an
    // easy thing to get a pixel wrong: the header is `--gl-header-height`
    // of content *plus* a hairline border, so a hero pulling up by the token
    // alone lands its top edge at y=1 rather than y=0. Tested against a bare
    // zero that reads as out of range, and the whole theme silently fails to
    // apply until the visitor scrolls down and back — the exact bug this
    // block exists to prevent, reintroduced by a rounding error. Sub-pixel
    // layout and browser zoom can cost the same pixel on a hero whose
    // arithmetic is perfectly correct.
    const rect = el.getBoundingClientRect();
    if (rect.top <= INITIAL_RANGE_SLACK_PX && rect.bottom > 0) enterDark();

    return () => {
      trigger.kill();
      exitDark();
    };
  }, [ref, theme]);
}
