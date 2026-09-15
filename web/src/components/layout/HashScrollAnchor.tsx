"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { ScrollTrigger } from "@gridline/motion";

/**
 * How long after a navigation the landing position keeps being corrected.
 * Long enough for every pinned section on the page to have registered and
 * refreshed at least once, short enough that it is over well before anyone
 * has begun scrolling for themselves.
 */
const CORRECTION_WINDOW_MS = 1500;

/**
 * Re-lands an in-page anchor once the pinned sections have been measured.
 *
 * The page is shorter when it first paints than it is a moment later: every
 * GSAP-pinned section (the archetype track, the deliverables stage) adds a
 * pin spacer worth hundreds of pixels of scroll distance, and it only does
 * so after hydration. Anything that scrolls to an anchor before that —
 * arriving on `/#what-youll-get` directly, or clicking a header link from
 * `/v1`, where the root-relative hrefs make every nav item a cross-page
 * navigation — computes its target against the short page and stops
 * thousands of pixels above the section it was aiming for.
 *
 * Nothing corrects that on its own: the scroll is a one-shot, so the
 * position stays wrong for as long as the visitor leaves it. This listens
 * for the refresh that follows pin creation and simply aims again.
 *
 * Deliberately bounded. It stops listening after `CORRECTION_WINDOW_MS`, so
 * a later refresh — a window resize, an orientation change — can never yank
 * a reading visitor back to an anchor they left behind long ago.
 */
export function HashScrollAnchor() {
  // Same-document hash clicks don't change this, and don't need to: by then
  // the pins are long since measured and the browser lands correctly on its
  // own. This is only for arrivals — a fresh load, or a cross-page nav.
  const pathname = usePathname();

  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.replace("#", ""));
    if (!id) return;

    let active = true;

    const land = () => {
      if (!active) return;
      const target = document.getElementById(id);
      if (!target) return;

      // Instant, not smooth: this is a correction to a place the visitor was
      // already supposed to be, so animating it would read as the page
      // drifting on its own after it had apparently settled.
      const root = document.documentElement;
      const previous = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      target.scrollIntoView();
      root.style.scrollBehavior = previous;
    };

    const stop = () => {
      active = false;
      ScrollTrigger.removeEventListener("refresh", land);
    };

    ScrollTrigger.addEventListener("refresh", land);
    // A final aim when the window closes, in case the last pin registered
    // after the last refresh this was listening for.
    const timer = window.setTimeout(() => {
      land();
      stop();
    }, CORRECTION_WINDOW_MS);

    return () => {
      window.clearTimeout(timer);
      stop();
    };
  }, [pathname]);

  return null;
}
