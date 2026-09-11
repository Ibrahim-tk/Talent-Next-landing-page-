/**
 * Hero copy for landing page variation 2 (`/v2`).
 *
 * This variation is a full-bleed photographic hero: one still running edge
 * to edge of the viewport, with the copy set over it at the left. So there
 * is no phone and no glow here — only the words and the photograph, plus
 * one floating artefact in the bottom-right corner: `HeroSessionStack`, a
 * deck of three cards that cycles through what the product actually
 * produces. Its copy is `heroSessionCards` below.
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

/* ==========================================================================
   The floating deck
   ========================================================================== */

/**
 * What one card in the deck shows below its heading.
 *
 * Three shapes rather than one flexible block, because the three cards are
 * making three different kinds of claim and a single "body text" field
 * would flatten that. The session is a promise about time, the summary is a
 * set of measurements, and the plan is a sequence — so each gets the
 * Gridline primitive that says that: plain type, `MeterRow`, and
 * `StepperTimeline` respectively.
 */
export type HeroSessionBody =
  | { kind: "note"; text: string; meta: string }
  | { kind: "meters"; meters: readonly { name: string; value: number }[] }
  | {
      kind: "steps";
      steps: readonly {
        id: string;
        label: string;
        icon: "book" | "star" | "check" | "clock";
        state: "complete" | "pending";
      }[];
    };

export interface HeroSessionCard {
  id: string;
  /** Small label above the heading — the step's place in the sequence. */
  eyebrow: string;
  icon: "clock" | "star" | "check";
  heading: string;
  body: HeroSessionBody;
}

/**
 * The deck, in order.
 *
 * These are not invented product features. They are the same three steps
 * "It Starts with 30 Minutes." already sets out further down every page —
 * talk, see what stands out, get your next steps — restated at card size,
 * with their headings taken verbatim from `content/howItWorks.ts` so the
 * hero is previewing the page rather than describing a different product.
 *
 * NOTE on the numbers: the meters on the summary card are illustrative. The
 * site talks about "six Talent traits" but never names them in copy, so
 * these three are stand-ins chosen to read plausibly at a glance. The card
 * is `aria-hidden` decoration and no figure here is quoted anywhere else,
 * but swap in the real trait names and a real sample profile when they
 * exist rather than letting these harden into canon.
 */
export const heroSessionCards: readonly HeroSessionCard[] = [
  {
    id: "session",
    eyebrow: "Step 1",
    icon: "clock",
    heading: "Talk About You",
    body: {
      kind: "note",
      text: "One-on-one with a TALENT Agent, talking through experiences from your life.",
      meta: "30 minutes · nothing to prepare",
    },
  },
  {
    id: "summary",
    eyebrow: "Step 2",
    icon: "star",
    heading: "See What Stands Out",
    body: {
      kind: "meters",
      meters: [
        { name: "Communication", value: 82 },
        { name: "Problem solving", value: 74 },
        { name: "Adaptability", value: 66 },
      ],
    },
  },
  {
    id: "plan",
    eyebrow: "Step 3",
    icon: "check",
    heading: "Get Your Next Steps",
    body: {
      kind: "steps",
      steps: [
        { id: "foundations", label: "Foundations", icon: "book", state: "complete" },
        { id: "practice", label: "Practice", icon: "star", state: "complete" },
        { id: "applied", label: "Applied work", icon: "check", state: "pending" },
      ],
    },
  },
];

/**
 * How long each card holds at the front of the deck, in milliseconds.
 *
 * Long enough to read three short lines without rushing, and long enough
 * that the movement registers as a deck shuffling rather than a carousel
 * demanding attention — this sits beside a headline that is the actual
 * point of the page.
 */
export const heroSessionCycleMs = 4200;

