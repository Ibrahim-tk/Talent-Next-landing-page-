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
    image: "/assets/del1.png",
    imageAlt: "A Talent Level card reading Level 4 of 6, Emerging leader",
    description:
      "A clear score based on the six TALENT traits, giving you an objective baseline for where your natural abilities lie.",
  },
  {
    id: "strengths-gaps",
    tabLabel: "Your Strengths + Skill Gaps",
    image: "/assets/del2.png",
    imageAlt: "A strength curve card highlighting Communication and Adaptability",
    description:
      "A breakdown of what you're naturally good at, along with the specific areas where focused effort could have the biggest impact.",
  },
  {
    id: "highlights",
    tabLabel: "Highlights From Your Interview",
    image: "/assets/del3.png",
    imageAlt: "Three highlight clips from a recorded interview",
    description:
      "Key moments from your conversation that illustrate your strengths in action, curated by your Agent.",
  },
  {
    id: "personalized-plan",
    tabLabel: "Your Personalized Development Plan",
    image: "/assets/del4.png",
    imageAlt: "A Tal recommends card listing personalized next steps",
    // Placeholder — no source copy exists for this stage yet; distinguish
    // it from "12 Weeks…" as the roadmap/strategy, not the weekly schedule.
    description:
      "A tailored roadmap built around your specific strengths and growth areas, mapped to real next steps you can start on right away.",
  },
  {
    id: "development-plan",
    tabLabel: "12 Weeks of Development Built for You",
    image: "/assets/del5.png",
    imageAlt: "A 12-week development plan laid out week by week",
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
  // Split for the accent, the same way `howItWorksCopy` carries its own
  // heading. The break falls mid-word — "TALENT" is accented and "next"
  // is not — so `headingAfter` deliberately opens with no leading space:
  // the two must still render as the single word "TALENTnext".
  headingBefore: "See What a ",
  headingAccent: "TALENT",
  headingAfter: "next Conversation Is Really Like",
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
