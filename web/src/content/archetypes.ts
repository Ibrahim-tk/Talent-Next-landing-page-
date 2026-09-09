/**
 * The six TALENT archetypes, one per letter — Top Performer, Athlete,
 * Leader, Entrepreneur, Not Sure, Team Player spell T-A-L-E-N-T. Rendered as
 * the horizontally scrubbed card track in the "TALENT Looks Different for
 * Everyone" section, per the Figma reference (node 173-6514).
 */

export interface Archetype {
  /** Stable key — note Team Player also shows "T", hence key ≠ letter. */
  id: string;
  /** The single letter stamped over the media. */
  letter: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const archetypes: readonly Archetype[] = [
  {
    id: "top-performer",
    letter: "T",
    name: "Top Performer",
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
    description:
      "A wider conversation if none of these feel exactly right yet. What you’ve been drawn to, what you’ve been good at, and where you might be headed.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80",
    imageAlt: "Not Sure",
  },
  {
    id: "team-player",
    letter: "T",
    name: "Team Player",
    description:
      "How you build trust, how you show up for people counting on you, and what you do when a group isn’t working well together.",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=700&q=80",
    imageAlt: "Team Player",
  },
];

export const archetypesCopy = {
  heading: "TALENT Looks Different for Everyone.",
  description:
    "Being talented isn't one thing. It can show up in what comes naturally to you, the way you approach challenges, or the role you find yourself taking without even thinking about it.",
  footnote:
    "And yes, Not Sure counts. You don't have to know where you fit before you start.",
  exploreMoreLabel: "Explore more",
  exploreMoreHref: "#get-started",
} as const;
