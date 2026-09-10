/**
 * Hero copy for landing page variation 2 (`/v2`).
 *
 * Where v1 closes the hero with the phone-and-cards asset cloud, this
 * variation closes it with one full-width photograph, so the phone, the
 * glow and the floating cards are gone from this file entirely.
 */

export const heroCopy = {
  headlineBefore: "Uncover the ",
  headlineAccent: "TALENT",
  headlineAfter: " You Already Have.",
  body: "Through a 30-minute conversation with a TALENT Agent, you'll uncover skills you may not recognize in yourself and begin to see what they could mean for your future.",
  ctaLabel: "Get started",
  ctaHref: "#get-started",

  /**
   * The band that closes the hero. Cropped to a wide strip rather than
   * shown at its own 3:2, so the source's 621x414 is being upscaled — swap
   * in a larger export before this variation ships.
   */
  image: {
    src: "/img/himg1.png",
    alt: "Two colleagues reviewing results together on a tablet",
  },
} as const;
