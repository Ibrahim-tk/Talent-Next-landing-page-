/**
 * Hero copy for landing page variation 3 (`/v3`).
 *
 * The copy is centred and the frame around it is a scatter of photographs:
 * three down each margin at staggered heights, two more rising past the
 * bottom edge. The images are cropped by the canvas rules rather than
 * stopping short of them, so the hero reads as a window onto a wider wall
 * of pictures with the sentence sitting in the clear middle of it.
 *
 * The words are unchanged from the two-column version this replaced — the
 * layout around them is the only thing that moved. The lede is the heading
 * of "It Starts with 30 Minutes." further down the page, and the body is
 * the second half of the hero paragraph every other variation runs whole.
 */


export const heroCopy = {
  headlineBefore: "Uncover the",
  headlineAccent: "TALENT",
  headlineAfter: "You Already Have.",

  /** The one-line claim under the headline, set a rung louder than the body. */
  lede: "It starts with a 30-minute conversation.",

  body: "You'll uncover skills you may not recognize in yourself, and begin to see what they could mean for your future.",

  /* ---- The capture field -------------------------------------------------
     A real form, not a picture of one: a labelled email input and a submit
     that carries the address to the intake form below (see
     `lib/heroEmailHandoff`). The label is visually hidden — the field is one
     control with a placeholder and an obvious purpose, and a visible "Email"
     above it would be the only label on the page naming something already
     named — but it is present for assistive tech, which is the part that
     cannot see the placeholder.
     ---------------------------------------------------------------------- */
  form: {
    label: "Your email address",
    placeholder: "Enter your email",
    submitLabel: "Start your session",
    /** Where submitting sends the visitor. */
    action: "#get-started",
  },

  /** The small print beneath the field. Points at a page that exists. */
  disclosure: {
    label: "See how your conversation and results are handled",
    href: "/privacy",
  },
} as const;

/* ==========================================================================
   The scatter
   ========================================================================== */

/**
 * Which band an image sits in.
 *
 * - `left` / `right` — the margins either side of the centred copy. These
 *   are real grid columns the copy is not in, which is what makes it
 *   impossible for a photograph to land on the headline at any viewport
 *   width.
 * - `bottom` — the full-width strip under the call to action. Nothing is
 *   written there, so an image in this band is free to cross the centre
 *   line and to run off the bottom of the frame.
 */
export type HeroScatterBand = "left" | "right" | "bottom";

export interface HeroScatterImage {
  /** Stable key, and the attribute the stylesheet positions it by. */
  slot: string;
  band: HeroScatterBand;
  src: string;
  /** Intrinsic size of the source, so next/image can pick a candidate. */
  width: number;
  height: number;
  /** Rendered width in px, before the responsive scale factor. */
  renderWidth: number;
  /** Aspect ratio the image is cropped to. */
  ratio: number;
  /** Top edge as a share of the band's height. */
  top: number;
  /**
   * Offset from the band's outer edge — the canvas rule for a margin, the
   * left edge for the bottom strip. A CSS length, so each band can use the
   * unit that actually suits it: the margins are in px, because a bleed is
   * a fixed bite out of a fixed-width frame, while the bottom strip is in
   * percentages, because it spans the whole canvas and its two frames have
   * to hold their spacing as that width changes.
   *
   * NEGATIVE values push an image past the rule, where the module's own
   * clip cuts it off. That crop is the point of the layout, not a side
   * effect: an image stopping neatly inside the rule reads as a thumbnail,
   * where one sliced by it reads as part of something larger continuing
   * off-screen.
   */
  x: string;
  /** Seconds of idle drift, and how far it travels in px. */
  float: { distance: number; duration: number };
}

/**
 * Eight photographs, every one already in the repo — no new art was added
 * for this layout.
 *
 * Chosen so no two show the same person: `hero` and `coaching_video` are
 * the full-frame portraits, `himg1`/`himg3`/`herobgv2` the editorial
 * scenes, and `p2`/`p4`/`p5` face crops from the call still. `p1` is
 * deliberately absent — it is itself a crop of `coaching_video`, and using
 * both would put the same man in the frame twice.
 *
 * The margins mirror each other's rhythm rather than their contents: three
 * a side at the same three heights, with the middle one on each side pushed
 * furthest past the rule, so the eye reads a pattern without finding a
 * mirror line.
 */
export const heroScatterImages: readonly HeroScatterImage[] = [
  {
    slot: "leftTop",
    band: "left",
    src: "/assets/hero.png",
    width: 1536,
    height: 1024,
    renderWidth: 236,
    ratio: 1,
    top: 0.02,
    x: "-14px",
    float: { distance: 12, duration: 7.6 },
  },
  {
    slot: "leftMid",
    band: "left",
    src: "/people/p2.jpg",
    width: 700,
    height: 700,
    renderWidth: 232,
    ratio: 1,
    top: 0.37,
    x: "-68px",
    float: { distance: 16, duration: 8.8 },
  },
  {
    slot: "leftLow",
    band: "left",
    src: "/img/himg1.png",
    width: 621,
    height: 414,
    renderWidth: 236,
    ratio: 1,
    top: 0.7,
    x: "-14px",
    float: { distance: 13, duration: 6.9 },
  },
  {
    slot: "rightTop",
    band: "right",
    src: "/assets/coaching_video.png",
    width: 3132,
    height: 1578,
    renderWidth: 236,
    ratio: 1,
    top: 0.02,
    x: "-14px",
    float: { distance: 14, duration: 8.2 },
  },
  {
    slot: "rightMid",
    band: "right",
    src: "/people/p4.jpg",
    width: 400,
    height: 400,
    renderWidth: 232,
    ratio: 1,
    top: 0.37,
    x: "-68px",
    float: { distance: 11, duration: 7.1 },
  },
  {
    slot: "rightLow",
    band: "right",
    src: "/people/p5.jpg",
    width: 400,
    height: 400,
    renderWidth: 236,
    ratio: 1,
    top: 0.7,
    x: "-14px",
    float: { distance: 15, duration: 9.1 },
  },
  {
    slot: "bottomLeft",
    band: "bottom",
    src: "/bgs/herobgv2.png",
    width: 1080,
    height: 721,
    renderWidth: 300,
    ratio: 3 / 2,
    top: 0.08,
    x: "24%",
    float: { distance: 12, duration: 7.8 },
  },
  {
    slot: "bottomRight",
    band: "bottom",
    src: "/img/himg3.png",
    width: 1200,
    height: 802,
    renderWidth: 300,
    ratio: 3 / 2,
    top: 0.34,
    x: "55%",
    float: { distance: 14, duration: 6.4 },
  },
];
