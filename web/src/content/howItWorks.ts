import type { PlanPhase } from "@gridline";

/**
 * "It Starts with 30 Minutes." — copy for both versions of the section.
 *
 * There are two: the three-panel matrix (`sections/howItWorksMatrix/`, on
 * `/v1` and `/v3`) and the step list beside a single still
 * (`sections/howItWorks/`, on the homepage and `/v2`). They are different
 * layouts of the *same* three steps, so the words live once, in
 * `howItWorksCopy` below, and `showcaseSteps` is derived from it rather than
 * restated — which is what stops the two versions drifting into saying
 * slightly different things.
 */

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

/* --------------------------------------------------------------------------
   The step list — `sections/howItWorks/`
   -------------------------------------------------------------------------- */

export interface ShowcaseStep {
  id: string;
  /** "01", "02", "03" — the list's own numbering. */
  index: string;
  heading: string;
  description: string;
}

export const howItWorksStepsCopy = {
  /** The single still on the right. */
  showcase: {
    src: "/bgs/meet.png",
    alt: "A Talent Agent session in progress, the participant speaking on screen with the viewer’s own camera in the corner",
    /**
     * The artwork's own width ÷ height (1470 x 1070), written as the
     * division rather than a rounded decimal so it stays checkable against
     * the file. The frame reads this, so the still is never cropped or
     * distorted — swap the image and change this line with it.
     */
    ratio: 1470 / 1070,
  },
} as const;

/**
 * The same three steps the matrix shows, in the order the list reads them.
 * Headings and descriptions are taken from `howItWorksCopy` rather than
 * retyped, so editing a step's words there updates both versions at once.
 */
export const showcaseSteps: readonly ShowcaseStep[] = [
  {
    id: "talk",
    index: "01",
    heading: howItWorksCopy.session.heading,
    description: howItWorksCopy.session.description,
  },
  {
    id: "analysis",
    index: "02",
    heading: howItWorksCopy.analysis.heading,
    description: howItWorksCopy.analysis.description,
  },
  {
    id: "next-steps",
    index: "03",
    heading: howItWorksCopy.nextSteps.heading,
    description: howItWorksCopy.nextSteps.description,
  },
];

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
