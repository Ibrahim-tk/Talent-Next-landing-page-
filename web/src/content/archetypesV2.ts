/**
 * Archetype copy for the `/hero-v2` preview page's second section — the
 * static 2×3 tile grid that replaces the pinned, horizontally scrubbed card
 * track on the live homepage.
 *
 * This is a standalone duplicate of `archetypes.ts` (same convention as
 * `heroV2.ts`): edit freely here without touching the live section. The one
 * addition over the original shape is `statement` — the short headline line
 * each tile leads with, with the longer `description` demoted to a caption
 * beneath it. The original section had no room for both; this layout does.
 */

export interface ArchetypeV2 {
  /** Stable key — note Team Player also shows "T", hence key ≠ letter. */
  id: string;
  /** The single letter stamped over the media. */
  letter: string;
  /** The tracked-out accent eyebrow on the tile. */
  name: string;
  /** The tile's headline — one line, the promise of the conversation. */
  statement: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const archetypesV2: readonly ArchetypeV2[] = [
  {
    id: "top-performer",
    letter: "T",
    name: "Top Performer",
    statement: "The standard you hold, and how you meet it",
    description:
      "The standard you hold yourself to, what you do when the work falls short of it, and how you show up the next day.",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=700&q=80",
    imageAlt: "Top Performer",
  },
  {
    id: "athlete",
    letter: "A",
    name: "Athlete",
    statement: "How you prepare, and how you take coaching",
    description:
      "How you prepare, how you take coaching and criticism, and what you do after things don’t go your way.",
    image:
      "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=700&q=80",
    imageAlt: "Athlete",
  },
  {
    id: "leader",
    letter: "L",
    name: "Leader",
    statement: "How you set direction and bring people with you",
    description:
      "How you set direction, how you get people to come with you, and how you pull the best out of the people around you.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=700&q=80",
    imageAlt: "Leader",
  },
  {
    id: "entrepreneur",
    letter: "E",
    name: "Entrepreneur",
    statement: "How you start before it’s figured out",
    description:
      "How you start things before you have them figured out, how you test an idea, and how you decide whether to keep going or move on.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80",
    imageAlt: "Entrepreneur",
  },
  {
    id: "not-sure",
    letter: "N",
    name: "Not Sure",
    statement: "A wider conversation when nothing fits yet",
    description:
      "What you’ve been drawn to, what you’ve been good at, and where you might be headed — if none of these feel exactly right.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80",
    imageAlt: "Not Sure",
  },
  {
    id: "team-player",
    letter: "T",
    name: "Team Player",
    statement: "How you build trust and show up for people",
    description:
      "How you build trust, how you show up for people counting on you, and what you do when a group isn’t working well together.",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=700&q=80",
    imageAlt: "Team Player",
  },
];

export const archetypesV2Copy = {
  eyebrow: "The six archetypes",
  heading: "TALENT looks different for everyone",
  description:
    "Being talented isn’t one thing. It shows up in what comes naturally to you, the way you approach a challenge, or the role you take without thinking about it.",
  /** The oversized accent mark closing the section, à la a plate number. */
  mark: "TALENT",
  footnote:
    "And yes, Not Sure counts. You don’t have to know where you fit before you start.",
  ctaLabel: "Explore more",
  ctaHref: "#get-started",
} as const;
