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
  roleTitle: "The hands-on maker",
  roleDescription:
    "You're driven by craft, independence, and ownership. You'd rather build something that lasts than keep watch over what already runs.",
  characteristicsTitle: "Characteristics of a Builder",
  characteristics: ["Quality over complexity", "Trusted relationships", "Control of the schedule"],
  careerIdeasTitle: "Career ideas",
  careerIdeas: [
    {
      title: "Supply Chain Manager",
      description: "Streamlining logistics, suppliers, and the flow of operations.",
      icon: "truck" as IconName,
    },
    {
      title: "Quality Assurance Manager",
      description: "Setting the standard a product has to meet before it ships.",
      icon: "shieldCheck" as IconName,
    },
    {
      title: "Product Owner",
      description: "Owning the vision, the priorities, and what gets built next.",
      icon: "user" as IconName,
    },
    {
      title: "Electrician Business Owner",
      description: "Running a licensed trade as a business of your own.",
      icon: "bolt" as IconName,
    },
    {
      title: "Process Improvement Specialist",
      description: "Redesigning workflows so the work costs less and breaks less.",
      icon: "gridSquares" as IconName,
    },
  ],
  nextStepTitle: "Your next step",
  nextStepDescription:
    "Download the Builder Playbook, access the Builder Toolkit, or connect with a TALENT Next Agent.",
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
