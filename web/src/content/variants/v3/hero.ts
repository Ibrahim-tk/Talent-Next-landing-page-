/**
 * Hero copy for landing page variation 3 (`/v3`).
 *
 * This variation drops v1's phone-and-cards asset stage entirely: the hero
 * is a full-bleed photographic band that cycles through several stills,
 * with the copy laid over it. So there is no phone, no glow and no floating
 * card data here — only the words and the photographs.
 */

export const heroCopy = {
  headlineBefore: "Uncover the ",
  headlineAccent: "TALENT",
  headlineAfter: " You Already Have.",
  body: "Through a 30-minute conversation with a TALENT Agent, you'll uncover skills you may not recognize in yourself and begin to see what they could mean for your future.",
  ctaLabel: "Get started",
  ctaHref: "#get-started",
} as const;

/**
 * One still in the hero's background rotation.
 *
 * No `alt`: these are atmosphere behind the headline, not information. The
 * hero's meaning is carried entirely by the copy on top of them, so they are
 * marked decorative and skipped by screen readers rather than described.
 */
export interface HeroBackdropImage {
  src: string;
  /** Intrinsic size, so `next/image` can pick a sensible source. */
  width: number;
  height: number;
}

/**
 * Ordered largest source first, so the still that holds on first paint is
 * the sharpest one available.
 *
 * NOTE: all three of these are small for a hero that runs the full width of
 * the viewport — 1200px wide is already being stretched past 2x on a large
 * display, and himg1 at 621px is stretched past 4x. No amount of CSS or
 * `next/image` tuning recovers detail that is not in the file: these need
 * re-exporting at ~2560px wide (ideally 3200px) before this variation is
 * anything but a layout preview.
 */
export const heroBackdropImages: readonly HeroBackdropImage[] = [
  { src: "/img/himg3.png", width: 1200, height: 802 },
  { src: "/img/himg2.png", width: 1024, height: 768 },
  { src: "/img/himg1.png", width: 621, height: 414 },
];

/**
 * Timing for the rotation, in seconds — how long each still holds at full
 * opacity, and how long the cross-fade between two of them takes. Kept here
 * rather than in the timeline so the pace is copy-level tuning, the same way
 * v1 keeps its card drift in the content file.
 */
export const heroBackdropTiming = {
  hold: 5,
  fade: 1.6,
} as const;
