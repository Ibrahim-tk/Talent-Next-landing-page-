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
    /* A 3:1 letterbox plate, and the aspect is the composition: one person
       standing still and level with the camera while the crowd around them
       is dragged into motion blur. That is the headline's claim as a
       picture, and it only reads at this ratio — cropped to something
       nearer square the blurred figures either side fall out of frame and
       the subject is just a portrait.

       At canvas width the plate stands about 470px tall, which is inside
       `HeroImage`'s height cap, so nothing is trimmed on a desktop and the
       cap is only there for very wide windows. See that stylesheet for what
       the ratio changes about the mobile crop.

       PNG as supplied. `next/image` re-encodes to AVIF/WebP per request, so
       what ships is a fraction of the 1.6MB on disk and no re-encode of the
       source is needed the way the previous 12MB original required one. */
    src: "/assets/talent-next-hero-image.png",
    alt: "A young professional standing still and facing the camera, the crowd moving around them blurred",
    width: 2172,
    height: 724,
  },
} as const;
