import type { PlanPhase } from "@gridline";

/** "It Starts with 30 Minutes." — the three-panel process matrix. */

export const howItWorksCopy = {
  headingBefore: "It Starts with ",
  headingAccent: "30",
  headingAfter: " Minutes.",
  session: {
    heading: "Talk About You",
    description:
      "Meet one-on-one with a Talent Agent and talk through experiences from your life.",
    image: "/assets/video_call_session.png",
    imageAlt: "Video meeting conversation with Talent Agent",
  },
  analysis: {
    heading: "See What Stands Out",
    description:
      "Your interview is analyzed to identify the skills you demonstrate, including where you’re strongest and where you have room to improve.",
    image: "/assets/talagent.png",
    imageAlt: "The Talent Agent, rendered as a softly glowing orb",
  },
  nextSteps: {
    heading: "Get Your Next Steps",
    description:
      "Get recommended focus areas and personalized plan based on your results",
  },
} as const;

/**
 * The looping plan stack in the "Get Your Next Steps" panel — a sample
 * programme, dealing itself out one week at a time.
 *
 * Six entries, because `PlanStack` runs a six-beat loop: six is what fills
 * every beat exactly, fewer leaves a visible gap in the rotation, and more
 * puts two cards on the same beat. The tints alternate rather than repeat
 * so the turnover is legible while it moves.
 */
export const planPhases: readonly PlanPhase[] = [
  { id: "foundations", kicker: "Week 1", label: "Foundations", tone: "accent" },
  { id: "practice", kicker: "Week 2", label: "Practice" },
  {
    id: "reassessment",
    kicker: "Week 3",
    label: "Reassessment",
    tone: "sunken",
  },
  { id: "applied-work", kicker: "Week 4", label: "Applied Work" },
  { id: "feedback", kicker: "Week 5", label: "Feedback Loop", tone: "accent" },
  { id: "next-goal", kicker: "Week 6", label: "Your Next Goal", tone: "sunken" },
];
