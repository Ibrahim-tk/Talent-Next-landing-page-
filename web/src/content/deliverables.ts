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
  image: string;
  imageAlt: string;
  /** The small description next to the stage's image. */
  description: string;
}

export const deliverableStages: readonly DeliverableStage[] = [
  {
    id: "talent-level",
    tabLabel: "Your TALENT Level",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=700&q=80",
    imageAlt: "Reviewing a TALENT Level score",
    description:
      "A clear score based on the six TALENT traits, giving you an objective baseline for where your natural abilities lie.",
  },
  {
    id: "strengths-gaps",
    tabLabel: "Your Strengths + Skill Gaps",
    image:
      "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=700&q=80",
    imageAlt: "Reviewing strengths and skill gaps",
    description:
      "A breakdown of what you're naturally good at, along with the specific areas where focused effort could have the biggest impact.",
  },
  {
    id: "highlights",
    tabLabel: "Highlights From Your Interview",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80",
    imageAlt: "Reviewing interview highlight clips",
    description:
      "Key moments from your conversation that illustrate your strengths in action, curated by your Agent.",
  },
  {
    id: "personalized-plan",
    tabLabel: "Your Personalized Development Plan",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=700&q=80",
    imageAlt: "Reviewing a personalized development plan",
    // Placeholder — no source copy exists for this stage yet; distinguish
    // it from "12 Weeks…" as the roadmap/strategy, not the weekly schedule.
    description:
      "A tailored roadmap built around your specific strengths and growth areas, mapped to real next steps you can start on right away.",
  },
  {
    id: "development-plan",
    tabLabel: "12 Weeks of Development Built for You",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80",
    imageAlt: "Reviewing a 12-week development schedule",
    description:
      "Recommended next steps based on your results, designed to help you build on what you already have.",
  },
];

export const deliverablesCopy = {
  heading: "Know Where You Stand and What to Do Next.",
  description:
    "This is where TALENTnext goes beyond a conversation. You’ll get specific results from your interview and something you can actually use afterward.",
} as const;

export const seeItInActionCopy = {
  heading: "See What a TALENTnext Conversation Is Really Like",
  description:
    "Wondering what you’ll be asked? Watch part of a real conversation with a TALENT Agent and see for yourself.",
  videoSources: ["/video/agent-loop.mp4", "/video/candidate-loop.mp4"],
  videoLabel:
    "Excerpt from a TALENTnext conversation between a candidate and a TALENT Agent",
  poster:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85",
  // Temporary stand-in for the video above — swap `SeeItInActionSection`
  // back to `VideoFrame` once the real clip is ready.
  image: "/assets/coaching_video.png",
  imageAlt: "A TALENT Agent mid-conversation during a coaching session",
} as const;
