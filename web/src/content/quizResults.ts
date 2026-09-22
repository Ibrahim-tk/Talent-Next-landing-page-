import type { IconName } from "@gridline";

export interface CareerIdea {
  title: string;
  description: string;
  icon: IconName;
}

export interface ActionTile {
  id: string;
  line1: string;
  line2: string;
  icon: IconName;
}

/**
 * Exact content verbatim from the Builder results reference layout.
 */
export const builderResultsCopy = {
  kicker: "QUIZ RESULTS",
  traitStatLabel: "Core traits identified",
  careerStatLabel: "Career paths matched",
  toolkitTitle: "Your toolkit",
  headerGreeting: (name: string = "TEST") => `HEY ${name.toUpperCase()} ! YOU ARE A`,
  archetype: "BUILDER",
  roleTitle: "THE INDEPENDENT EXPERT",
  roleDescription: "You'd rather build something than simply maintain it.",
  characteristicsTitle: "CHARACTERISTICS OF A BUILDER",
  characteristics: ["Quality over complexity", "Trusted relationships", "Control of the schedule"],
  careerIdeasTitle: "CAREER IDEAS",
  careerIdeas: [
    { title: "Supply Chain Manager", description: "Logistics & operations flow.", icon: "truck" as IconName },
    { title: "Quality Assurance Manager", description: "Standards & product quality.", icon: "shieldCheck" as IconName },
    { title: "Product Owner", description: "Vision & priorities.", icon: "user" as IconName },
    { title: "Electrician Business Owner", description: "Runs the trade as a business.", icon: "bolt" as IconName },
    { title: "Process Improvement Specialist", description: "Workflows & cost.", icon: "gridSquares" as IconName },
  ],
  nextStepTitle: "YOUR NEXT STEP",
  nextStepDescription: "Your Builder playbook, toolkit, and an agent — all in one email.",
  ctaEyebrow: "What you'll get",
  ctaLabel: "Send my playbook",
  actionTiles: [
    {
      id: "playbook",
      line1: "Builder",
      line2: "Playbook",
      icon: "ledger" as IconName,
    },
    {
      id: "toolkit",
      line1: "Builder",
      line2: "Toolkit",
      icon: "briefcase" as IconName,
    },
    {
      id: "agent",
      line1: "Connect with",
      line2: "Talent Next Agent",
      icon: "messages" as IconName,
    },
  ],
  sharePrompt: "Know someone else trying to figure out their next step? Share this quiz with them.",
  shareLabel: "Share —",
} as const;
