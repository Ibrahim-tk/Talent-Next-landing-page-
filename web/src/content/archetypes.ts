/**
 * The six Talent archetypes, one per letter — Top Performer, Athlete,
 * Leader, Entrepreneur, Not Sure, Team Player spell T-A-L-E-N-T. Rendered as
 * the horizontally scrubbed card track in the "Talent Looks Different for
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
    image: "/assets/top-performer.jpg",
    imageAlt: "A woman in a blazer shaking hands, tablet in hand, mid-greeting",
  },
  {
    id: "athlete",
    letter: "A",
    name: "Athlete",
    description:
      "How you prepare, how you take coaching and criticism, and what you do after things don’t go your way.",
    image: "/assets/athlete.jpg",
    imageAlt: "An athlete holding a plank in the gym, pulling a dumbbell off the floor",
  },
  {
    id: "leader",
    letter: "L",
    name: "Leader",
    description:
      "How you set direction, how you get people to come with you, and how you pull the best out of the people around you.",
    image: "/assets/leader.jpg",
    imageAlt: "A man on his feet at a meeting table, talking a seated team through an idea",
  },
  {
    id: "entrepreneur",
    letter: "E",
    name: "Entrepreneur",
    description:
      "How you start things before you have them figured out, how you test an idea, and how you decide whether to keep going or move on.",
    image: "/assets/entrepreneur.jpg",
    imageAlt: "Two colleagues working an idea out in sticky notes across a glass wall",
  },
  {
    id: "not-sure",
    letter: "N",
    name: "Not Sure",
    description:
      "A wider conversation if none of these feel exactly right yet. What you’ve been drawn to, what you’ve been good at, and where you might be headed.",
    image: "/assets/not-sure.jpg",
    imageAlt: "Two people mid-conversation across a low table, one thinking something over",
  },
  {
    id: "team-player",
    letter: "T",
    name: "Team Player",
    description:
      "How you build trust, how you show up for people counting on you, and what you do when a group isn’t working well together.",
    image: "/assets/team-player.jpg",
    imageAlt: "Five colleagues meeting in a high-five over a shared desk",
  },
];

export const archetypesCopy = {
  heading: "Talent Looks Different for Everyone.",
  description:
    "Being talented isn't one thing. It can show up in what comes naturally to you, the way you approach challenges, or the role you find yourself taking without even thinking about it.",
  footnote:
    "And yes, Not Sure counts. You don't have to know where you fit before you start.",
  exploreMoreLabel: "Explore more",
  exploreMoreHref: "#get-started",
} as const;
