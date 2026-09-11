/**
 * Hero copy and asset cloud for landing page variation 3 (`/v3`).
 *
 * This variation sets the copy the way v1 does — one centred stack, the
 * accent word carrying the headline — and surrounds it with a cloud of
 * photographs that fly in from beyond the canvas rules on load.
 *
 * The copy itself is unchanged from every other variation. What varies is
 * only where it sits and what arrives around it.
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
 * Which rail an orbit item flies in from, and therefore which side of the
 * centred copy it comes to rest in.
 */
export type HeroOrbitSide = "left" | "right";

/**
 * One item in the cloud — a photograph, or the circular video.
 *
 * `width` is the item's rendered width in the rail, in pixels, and it is the
 * one number that makes the composition read as a cloud rather than a row:
 * every item is a different size. `top` is where its own top edge sits as a
 * share of the rail's height, so the stagger survives the hero growing or
 * shrinking with its type.
 *
 * `inset` nudges the item away from the rail's outer edge, again as a share
 * of the rail — a small positive value on some and zero on others is what
 * stops the four of them lining up on a single vertical margin.
 */
export interface HeroOrbitItem {
  /** Stable key, and the class hook for the item's resting position. */
  slot: string;
  side: HeroOrbitSide;
  /** `image` renders through next/image; `video` renders a muted loop. */
  kind: "image" | "video";
  src: string;
  /** Intrinsic size of the source, so next/image can pick a candidate. */
  width: number;
  height: number;
  /** Rendered width in the rail, px. Every item's is different. */
  renderWidth: number;
  /** Aspect ratio the item is cropped to. 1 for the circular video. */
  ratio: number;
  /** Top edge as a share of the rail's height, 0–1. */
  top: number;
  /** Distance from the rail's outer edge as a share of the rail's width. */
  inset: number;
  /** Resting tilt, degrees. Zero for the video — a tilted circle is a circle. */
  rotation: number;
  /**
   * Seconds of idle drift, and how far it travels in px. A different period
   * per item is what keeps the cloud from breathing in unison, which reads
   * as a single moving object rather than five floating ones.
   */
  float: { distance: number; duration: number };
}

/**
 * The cloud: four photographs at four different sizes, plus the circular
 * video. Two items per rail, with the video making a third on the right —
 * it is the smallest thing in the composition, so the rails still balance.
 *
 * Ordered the way they should arrive, not the way they sit: the entry
 * timeline staggers straight down this array, so alternating the sides here
 * is what makes the cloud assemble from both directions at once instead of
 * filling one rail and then the other.
 *
 * NOTE on the art itself: these are the best-fitting photographs already in
 * `public/`, not a set commissioned for this hero. `himg1` and `himg3` were
 * freed up when v2's hero moved to its own background, `coaching_video`
 * also appears in the deliverables band further down this page, and
 * `herobgv2` is v2's hero background — a different page, so no visitor sees
 * it twice. A purpose-shot set of five portraits would be better, and the
 * `renderWidth`/`ratio` pairs below are what a replacement has to fit.
 */
export const heroOrbitItems: readonly HeroOrbitItem[] = [
  {
    slot: "leftUpper",
    side: "left",
    kind: "image",
    src: "/img/himg1.png",
    width: 621,
    height: 414,
    renderWidth: 196,
    ratio: 4 / 5,
    top: 0.08,
    inset: 0.06,
    rotation: -3.5,
    float: { distance: 14, duration: 7.5 },
  },
  {
    slot: "rightUpper",
    side: "right",
    kind: "image",
    src: "/assets/coaching_video.png",
    width: 3132,
    height: 1578,
    renderWidth: 164,
    ratio: 1,
    top: 0.04,
    inset: 0,
    rotation: 4,
    float: { distance: 11, duration: 6.2 },
  },
  {
    slot: "leftLower",
    side: "left",
    kind: "image",
    src: "/bgs/herobgv2.png",
    width: 1080,
    height: 721,
    renderWidth: 248,
    ratio: 5 / 4,
    top: 0.52,
    inset: 0,
    rotation: 2.5,
    float: { distance: 17, duration: 8.4 },
  },
  {
    slot: "rightLower",
    side: "right",
    kind: "image",
    src: "/img/himg3.png",
    width: 1200,
    height: 802,
    renderWidth: 224,
    ratio: 3 / 4,
    top: 0.42,
    inset: 0.1,
    rotation: -2.5,
    float: { distance: 13, duration: 6.9 },
  },
  {
    slot: "rightVideo",
    side: "right",
    kind: "video",
    src: "/video/candidate-loop.mp4",
    width: 512,
    height: 512,
    renderWidth: 132,
    ratio: 1,
    top: 0.84,
    inset: 0.34,
    rotation: 0,
    float: { distance: 10, duration: 5.6 },
  },
];

/**
 * Entry timing, in seconds. Kept here rather than in the timeline so the
 * pace is copy-level tuning, the same way v1 keeps its card drift in the
 * content file.
 *
 * `delay` holds the cloud back for a beat so the headline is what the
 * visitor reads first and the photographs arrive around a composition that
 * is already legible — the hero's job is the sentence, not the motion.
 */
export const heroOrbitTiming = {
  delay: 0.25,
  duration: 1.15,
  stagger: 0.1,
} as const;
