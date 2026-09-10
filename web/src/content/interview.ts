/**
 * "This isn't a Job Interview" — a static three-up row. Each panel pairs a
 * gradient plate (grad1–3) with a product still (pic1–3) floating over it,
 * and one line of reassurance copy underneath. The gradients and stills are
 * paired index-for-index: panel one gets grad1 + pic1, and so on.
 *
 * The `-trim` stills are the source PNGs with their transparent margins
 * cropped off (the originals ship a lot of empty canvas below the artwork,
 * which made the three read as different heights and sat them off-centre on
 * their plates). pic1 needed no crop, so it's referenced as-is.
 */

export interface InterviewStage {
  id: string;
  /** Full-bleed gradient plate behind the panel's media area. */
  background: string;
  /** Still that floats, centred, over the gradient. */
  overlay: string;
  overlayAlt: string;
  body: string;
}

export const interviewStages: readonly InterviewStage[] = [
  {
    id: "no-preparation",
    background: "/assets/grad1.png",
    overlay: "/assets/pic1.png",
    overlayAlt: "A soft, abstract portrait — no camera-ready pose required",
    body: "There are no right answers and nothing to prepare.",
  },
  {
    id: "real-stories",
    background: "/assets/grad2.png",
    overlay: "/assets/pic2-trim.png",
    overlayAlt: "The Tal AI prompt panel, ready for a question",
    body: "Your Talent Agent will ask about real experiences from your life and give you a chance to talk through what happened and how you handled it.",
  },
  {
    id: "hidden-strengths",
    background: "/assets/grad3.png",
    overlay: "/assets/pic3-trim.png",
    overlayAlt: "A Tal recommendation card matching a strength to a need",
    body: "The point isn’t to impress anyone. It’s to uncover skills you may not recognize in yourself.",
  },
];

export const interviewCopy = {
  heading: "This isn’t a Job Interview.",
} as const;
