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
    /* Served from a 2400px re-encode rather than from the 8256px, 12MB
       original that was dropped in (`hero section.jpeg`, kept alongside it).
       Next's optimiser would happily resize the original on request, but it
       would do that work against a 45-megapixel source, and nothing on this
       page is ever served wider than the canvas — 2400 is already over twice
       the largest rendition anyone sees. The hyphenated filename is the
       other half of it: a space in a public path survives `next/image`'s own
       encoding but not much else that touches a URL. */
    src: "/assets/hero-section.jpg",
    alt: "A young professional at their desk, turning to face the camera",
    width: 2400,
    height: 1600,
  },
} as const;
