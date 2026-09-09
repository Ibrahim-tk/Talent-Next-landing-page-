/** Hero copy and the floating asset cloud that frames the phone. */

export const heroCopy = {
  headlineBefore: "Uncover the ",
  headlineAccent: "TALENT",
  headlineAfter: " You Already Have.",
  body: "What you do next may start with what you're already good at. Through a 30-minute conversation with a TALENT Agent, you'll uncover skills you may not recognize in yourself and begin to see what they could mean for your future.",
  ctaLabel: "Get started",
  ctaHref: "#get-started",
  microcopy: "Your first conversation is at no charge",
  phone: {
    src: "/assets/phone-hero.png",
    alt: "TALENT Agent on iPhone",
    width: 820,
    height: 1180,
  },
  glow: {
    src: "/img/red-hero-blur.png",
    width: 1200,
    height: 520,
  },
} as const;

/**
 * Which floating card is which. `slot` selects the CSS placement and the
 * ambient float loop; `drift` is the scroll-scrubbed spread the GSAP
 * timeline applies as the hero scrolls away.
 */
export type HeroCardSlot = "ai" | "strength" | "score";

export interface HeroFloatingCard {
  slot: HeroCardSlot;
  src: string;
  /** Decorative: these cards restate information already in the copy. */
  alt: string;
  width: number;
  height: number;
  drift: {
    x: number;
    y: number;
    rotation: number;
    opacity: number;
  };
}

export const heroFloatingCards: readonly HeroFloatingCard[] = [
  {
    slot: "ai",
    src: "/assets/ai-card.png",
    alt: "Ask Tal AI anything",
    width: 540,
    height: 320,
    drift: { x: -240, y: -70, rotation: -8, opacity: 0.35 },
  },
  {
    slot: "strength",
    src: "/assets/strenght-card.png",
    alt: "Top Strength diagnostics",
    width: 580,
    height: 380,
    drift: { x: 260, y: -110, rotation: 8, opacity: 0.35 },
  },
  {
    slot: "score",
    src: "/assets/talent-score-card.png",
    alt: "Your Talent Score: 72, above average",
    width: 350,
    height: 300,
    drift: { x: 230, y: 120, rotation: -6, opacity: 0.3 },
  },
];
