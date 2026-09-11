/**
 * Hero copy for landing page variation 2 (`/v2`).
 *
 * This variation is a full-bleed photographic hero: one still running edge
 * to edge of the viewport, with the copy set over it at the left. So there
 * is no phone, no glow and no floating card data here — only the words and
 * the photograph.
 *
 * It differs from v3, which is also photographic, in two ways: v3 rotates
 * through several stills and bottom-aligns its copy across three columns,
 * where this one holds a single frame and sets the copy as one left-aligned
 * stack in the middle of it.
 */

export const heroCopy = {
  headlineBefore: "Uncover the",
  headlineAccent: "TALENT",
  headlineAfter: "You Already Have.",
  body: "Through a 30-minute conversation with a TALENT Agent, you'll uncover skills you may not recognize in yourself and begin to see what they could mean for your future.",
  ctaLabel: "Get started",
  ctaHref: "#get-started",

  /**
   * The photograph behind the whole hero: a woman standing still while the
   * commuters around her blur past. Chosen because it is the headline's
   * argument in one frame — the thing already there, if you stop and look.
   *
   * No `alt`: it is atmosphere behind the headline, not information. The
   * hero's meaning is carried entirely by the copy on top of it, so the
   * image is marked decorative and skipped by screen readers rather than
   * described.
   *
   * This is an upscale, not a native 4K export. The source that came in
   * (`herobgv2.png`, kept alongside it) is 1080x721, which is under a third
   * of the width a full-bleed hero needs on a large display. It was taken
   * to 3840 wide with a Lanczos resample and a mild unsharp pass, which is
   * the best a resampler can do: it reconstructs edges far more cleanly
   * than the bilinear scaling the browser would otherwise apply on its own,
   * but it cannot invent detail that was never in the file. That it holds
   * up as well as it does here is partly luck of subject — most of this
   * frame is motion-blurred by design, so there is little fine detail to
   * lose, and the one genuinely sharp region (the standing figure) survives
   * the enlargement with its weave pattern intact.
   *
   * So: a real 3840px original would still be better, and this is not a
   * reason to skip getting one. It is, however, good enough to ship.
   */
  image: {
    src: "/bgs/herobgv2-uhd.jpg",
    width: 3840,
    height: 2564,
  },
} as const;
