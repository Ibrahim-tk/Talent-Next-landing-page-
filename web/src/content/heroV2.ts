/**
 * Hero copy for the `/hero-v2` preview page — a full-bleed, dark, centred
 * composition (pill badge → three-part headline → subtitle → CTA → a real
 * session clip → a closing statement), with two floating report cards
 * pinned to the bottom corners.
 *
 * This is a standalone duplicate of `hero.ts` — edit freely here to try out
 * changes to the hero section without touching the live homepage hero.
 */

export const heroCopy = {
  /** The pill badge above the headline — the one line of copy on the page
   * that isn't restated anywhere else. */
  pill: "Talent meets clarity",

  headlineBefore: "Uncover the ",
  headlineAccent: "TALENT",
  headlineAfter: " You Already Have.",

  subtitle:
    "A 30-minute conversation that surfaces the skills you already have — and where they can take you.",

  ctaLabel: "Get started",
  ctaHref: "#get-started",
  microcopy: "Your first conversation is at no charge",

  /** The real-session clip standing in for the reference's avatar + play
   * row. One genuine photo rather than a second, invented face. */
  video: {
    src: "/assets/coaching_video.png",
    alt: "A TALENT Agent leading a live coaching conversation",
    label: "Watch a real session",
  },

  /** The closing statement lower on the page — restates the headline's
   * promise in one plainer sentence, the way the reference's bold line does. */
  statement: "Skills you already have. A future you haven't seen yet.",

  /** Bottom-left card. */
  team: {
    title: "Meet your TALENT Agent",
    footer: "Guided by real coaching science",
  },

  /** Bottom-right card — the same "72, above average" reading already used
   * elsewhere on the page, rendered as a real SegmentedMeter rather than a
   * pasted screenshot. */
  score: {
    title: "Your Talent Score",
    value: 72,
    max: 100,
    label: "Above average",
    cta: "See the full report",
  },
} as const;
