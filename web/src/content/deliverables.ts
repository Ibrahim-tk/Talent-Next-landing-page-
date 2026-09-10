/**
 * "Know Where You Stand and What to Do Next" — the deliverables band.
 *
 * Per the Figma reference (node 172-6348), this is a synced three-way
 * indicator (left tab list, ruler gauge, image + description) stepping
 * through five deliverables as the section scrubs — see
 * DeliverablesSection.tsx for the choreography.
 */

export interface DeliverableStage {
  id: string;
  /** Label shown in the left-hand tab list. */
  tabLabel: string;
  /**
   * The square frame's backdrop — a full-bleed gradient, cropped to the
   * frame. Deliberately separate from `card` below: the frame is composed
   * in the browser (gradient behind, mockup centred on top) rather than
   * shipped as one pre-flattened image, so the two can be re-cropped and
   * re-scaled independently as the frame's proportions change.
   */
  background: string;
  /**
   * The product mockup centred on top of `background`, at its own scale
   * with the gradient showing around it. Needs transparency around the
   * mockup itself, since it sits over the gradient rather than replacing
   * it.
   *
   * Optional while the cut-out artwork is still being produced — a stage
   * with no `card` yet simply shows its gradient, which is the intended
   * backdrop either way, rather than falling back to the old flattened
   * `del*.png` composite (that would put a second, differently-cropped
   * gradient inside the frame's own).
   */
  card?: string;
  /**
   * How `card`'s artwork is framed inside its own PNG canvas, as
   * percentages of the square frame — the two knobs that let one CSS rule
   * place five differently-cropped exports so they read as a consistent
   * set. Both are measured from the PNG's alpha channel, not guessed, and
   * both are only needed because the exports disagree with each other:
   *
   * `inset` — padding around the artwork. d1/d2/d4/d5 carry a generous
   * transparent margin of their own, so they need very little; d3 is
   * cropped tight to its content and needs far more to come out at the
   * same visual size.
   *
   * `bias` — a downward nudge. d1/d2/d4/d5 sit their card in the TOP of
   * the canvas with the drop shadow filling the bottom, so the opaque
   * card body's centre is 12% of the canvas height ABOVE the canvas
   * centre. Centring the canvas would therefore leave the card visibly
   * stuck to the top of the frame; this pushes the card body itself to
   * dead centre, which is where the old flattened composites had it.
   *
   * Omit both for artwork that is already centred and tightly cropped.
   */
  cardFraming?: { inset: string; bias: string };
  /** Describes `card` — the frame's only informative content. */
  imageAlt: string;
  /** The small description next to the stage's image. */
  description: string;
}

export const deliverableStages: readonly DeliverableStage[] = [
  {
    id: "talent-level",
    tabLabel: "Your Talent Level",
    background: "/bgs/b1.png",
    card: "/bgs/d1.png",
    cardFraming: { inset: "6%", bias: "10.6%" },
    imageAlt: "A Talent Level card reading Level 4 of 6, Emerging leader",
    description:
      "A clear score based on the six Talent traits, giving you an objective baseline for where your natural abilities lie.",
  },
  {
    id: "strengths-gaps",
    tabLabel: "Your Strengths + Skill Gaps",
    background: "/bgs/b2.png",
    card: "/bgs/d2.png",
    cardFraming: { inset: "6%", bias: "10.6%" },
    imageAlt: "A strength curve card highlighting Communication and Adaptability",
    description:
      "A breakdown of what you're naturally good at, along with the specific areas where focused effort could have the biggest impact.",
  },
  {
    id: "highlights",
    tabLabel: "Highlights From Your Interview",
    background: "/bgs/b3.png",
    card: "/bgs/d3.png",
    // Cropped tight to its own content and already vertically
    // centred, so: a much larger inset, and no bias at all.
    cardFraming: { inset: "17.5%", bias: "0%" },
    imageAlt: "Three highlight clips from a recorded interview",
    description:
      "Key moments from your conversation that illustrate your strengths in action, curated by your Agent.",
  },
  {
    id: "personalized-plan",
    tabLabel: "Your Personalized Development Plan",
    background: "/bgs/b4.png",
    card: "/bgs/d4.png",
    cardFraming: { inset: "6%", bias: "10.6%" },
    imageAlt: "A Tal recommends card listing personalized next steps",
    // Placeholder — no source copy exists for this stage yet; distinguish
    // it from "12 Weeks…" as the roadmap/strategy, not the weekly schedule.
    description:
      "A tailored roadmap built around your specific strengths and growth areas, mapped to real next steps you can start on right away.",
  },
  {
    id: "development-plan",
    tabLabel: "12 Weeks of Development Built for You",
    background: "/bgs/b5.png",
    card: "/bgs/d5.png",
    cardFraming: { inset: "6%", bias: "10.6%" },
    imageAlt: "A 12-week development plan laid out week by week",
    description:
      "Recommended next steps based on your results, designed to help you build on what you already have.",
  },
];

export const deliverablesCopy = {
  heading: "Know Where You Stand and What to Do Next.",
  description:
    "This is where Talentnext goes beyond a conversation. You’ll get specific results from your interview and something you can actually use afterward.",
} as const;

export const seeItInActionCopy = {
  // Split for the accent, the same way `howItWorksCopy` carries its own
  // heading. The break falls mid-word — "Talent" is accented and "next"
  // is not — so `headingAfter` deliberately opens with no leading space:
  // the two must still render as the single word "Talentnext".
  headingBefore: "See What a ",
  headingAccent: "Talent",
  headingAfter: "next Conversation Is Really Like",
  description:
    "Wondering what you’ll be asked? Watch part of a real conversation with a Talent Agent and see for yourself.",
  videoSources: ["/video/agent-loop.mp4", "/video/candidate-loop.mp4"],
  videoLabel:
    "Excerpt from a Talentnext conversation between a candidate and a Talent Agent",
  poster:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85",
  // Temporary stand-in for the video above — swap `SeeItInActionSection`
  // back to `VideoFrame` once the real clip is ready.
  image: "/assets/coaching_video.png",
  imageAlt: "A Talent Agent mid-conversation during a coaching session",
} as const;
