import type { StepperStep } from "@gridline";

/** "It Starts with 30 Minutes." — the three-panel process matrix. */

export const howItWorksCopy = {
  headingBefore: "It Starts with ",
  headingAccent: "30",
  headingAfter: " Minutes.",
  session: {
    heading: "Talk About You",
    description:
      "Meet one-on-one with a TALENT Agent and talk through experiences from your life.",
    image: "/assets/video_call_session.png",
    imageAlt: "Video meeting conversation with TALENT Agent",
  },
  analysis: {
    heading: "See What Stands Out",
    description:
      "Your interview is analyzed to identify the skills you demonstrate, including where you’re strongest and where you have room to improve.",
    cardTitle: "Top Strength",
  },
  nextSteps: {
    heading: "Get Your Next Steps",
    description:
      "Get recommended focus areas and personalized plan based on your results",
  },
} as const;

export interface SkillScore {
  name: string;
  value: number;
}

export const topStrengths: readonly SkillScore[] = [
  { name: "Leadership", value: 72 },
  { name: "Communication", value: 46 },
  { name: "Adaptability", value: 83 },
];

export const nextSteps: readonly StepperStep[] = [
  {
    id: "explore-course",
    label: "Explore a Course",
    icon: "book",
    state: "complete",
  },
  {
    id: "daily-pace",
    label: "Set Daily Pace",
    icon: "clock",
    state: "complete",
  },
  {
    id: "unlock-growth",
    label: "Unlock Your Growth",
    icon: "star",
    state: "pending",
  },
];
