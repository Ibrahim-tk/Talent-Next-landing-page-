/** Hero copy and the single full-bleed image beneath it. */

export const heroCopy = {
  headlineBefore: "Uncover the ",
  headlineAccent: "TALENT",
  headlineAfter: " You Already Have.",
  body: "Through a 30-minute conversation with a TALENT Agent, you'll uncover skills you may not recognize in yourself and begin to see what they could mean for your future.",
  ctaLabel: "Get started",
  ctaHref: "#get-started",
  /**
   * One photograph carrying the whole stage, ruled edge to ruled edge. It
   * replaced the phone-plus-floating-cards cloud: a single image at this
   * width is the composition, so nothing is layered over it and nothing
   * drifts on scroll.
   */
  image: {
    src: "/assets/herov1.png",
    alt: "A person standing out from the crowd in a lift",
    width: 1684,
    height: 934,
  },
} as const;
