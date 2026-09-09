/**
 * "This isn't a Job Interview" — a static three-up row. Each panel pairs the
 * same house "Top Strength" card (see howItWorks.ts for the pattern this
 * reuses) over a shared ambient-glow backdrop with one line of reassurance
 * copy underneath. Unlike howItWorks, this section keeps its own copy of
 * the skill scores rather than importing them — content files in this
 * codebase don't cross-import from one another.
 */

export interface InterviewStage {
  id: string;
  body: string;
}

export const interviewStages: readonly InterviewStage[] = [
  {
    id: "no-preparation",
    body: "There are no right answers and nothing to prepare.",
  },
  {
    id: "real-stories",
    body: "Your TALENT Agent will ask about real experiences from your life and give you a chance to talk through what happened and how you handled it.",
  },
  {
    id: "hidden-strengths",
    body: "The point isn’t to impress anyone. It’s to uncover skills you may not recognize in yourself.",
  },
];

export interface SkillScore {
  name: string;
  value: number;
}

/** Identical in all three panels, by design — see the reference layout. */
export const interviewTopStrengths: readonly SkillScore[] = [
  { name: "Leadership", value: 72 },
  { name: "Communication", value: 46 },
  { name: "Adaptability", value: 83 },
];

export const interviewCopy = {
  heading: "This isn’t a Job Interview.",
  cardTitle: "Top Strength",
} as const;
