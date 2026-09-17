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
  headerGreeting: (name: string = "TEST") => `HEY ${name.toUpperCase()} ! YOU ARE A`,
  archetype: "BUILDER",
  roleTitle: "THE INDEPENDENT EXPERT",
  roleDescription:
    "You enjoy creating results through quality work, independence, and ownership. You'd rather build something than simply maintain it.",
  characteristicsTitle: "CHARACTERISTICS OF A BUILDER",
  characteristics: [
    "Values quality over complexity.",
    "Builds trusted relationships.",
    "Wants control over their schedule.",
  ],
  careerIdeasTitle: "CAREER IDEAS",
  careerIdeas: [
    {
      title: "Supply Chain Manager",
      description: "Streamlines logistics and operations flow.",
      icon: "truck" as IconName,
    },
    {
      title: "Quality Assurance Manager",
      description: "Ensures product standards and quality.",
      icon: "shieldCheck" as IconName,
    },
    {
      title: "Product Owner",
      description: "Drives product vision and priorities.",
      icon: "user" as IconName,
    },
    {
      title: "Electrician Business Owner",
      description: "Runs electrical services company operations.",
      icon: "bolt" as IconName,
    },
    {
      title: "Process Improvement Specialist",
      description: "Optimizes workflows and reduces costs.",
      icon: "gridSquares" as IconName,
    },
  ],
  nextStepTitle: "YOUR NEXT STEP",
  nextStepDescription:
    "Download the Builder Playbook, access the Builder Toolkit, or connect with a TALENT Next Agent.",
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
