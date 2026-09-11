/**
 * Tal — the assistant band, rendered by `sections/agent/` and currently
 * mounted on `/v2` only.
 *
 * Three things Tal does, in the order a user meets them: it reads the page
 * you are on, it answers what you ask from wherever you ask it, and it takes
 * the answer by voice if you would rather talk than type.
 *
 * NOTE ON PROVENANCE. This file used to hold a hard rule — that nothing in
 * it could introduce a capability the rest of `src/content` did not already
 * state — and every line was a restatement of a claim made elsewhere on the
 * site. That is no longer true of the three headings and bodies below: they
 * are supplied product copy for Tal, and they are the only place on the site
 * that describes reading a screen, answering from live figures, or dictating
 * a message. Nothing else in `src/content` corroborates them. If the rest of
 * the site is meant to say the same things, this is the file those claims
 * came in through.
 *
 * The mock data further down is held to the older, stricter line: it
 * demonstrates the mechanic each heading describes and invents no number,
 * price, or guarantee that the heading has not already implied.
 */

import type { IconName } from "@gridline";

export interface AgentBehaviour {
  id: string;
  /**
   * The glyph on this behaviour's tab in the pill switcher, and again in the
   * badge row above its headline. One icon, two placements, so the tab the
   * reader clicked is restated by the panel it opened.
   */
  icon: IconName;
  /**
   * The tab's label, and the only place it appears — it used to be printed a
   * second time as an accent tagline over the headline, which was the same
   * word said twice a centimetre apart.
   *
   * One or two words, and a NOUN for what the panel shows rather than a
   * description of it: the labels sit in a segmented control a few
   * millimetres tall, and "Summaries" is scannable there where "The Read"
   * had to be decoded first.
   */
  label: string;
  heading: string;
  body: string;
}

/**
 * Three, not four. The pill draws one icon per entry and the band advances
 * through them in this order, so the list is the tab order, the badge order
 * and the auto-advance order at once.
 *
 * Order is load-bearing twice over: it is the order of the tabs left to
 * right, and `agentBehaviours[0]` is the panel the band opens on. It runs
 * passive to active — Tal reading without being asked, then Tal answering
 * when asked, then the user not even having to type.
 */
export const agentBehaviours: readonly AgentBehaviour[] = [
  {
    id: "reads-the-screen",
    icon: "ledger",
    label: "Summaries",
    heading: "Every screen, read back to you in seconds",
    body: "Tal reads each page the moment you land on it, surfacing the figures that matter and the one move worth making next, so nothing gets lost in the noise.",
  },
  {
    id: "answers-anywhere",
    icon: "messages",
    label: "Ask Tal",
    heading: "Answers the moment you need them",
    body: "Ask from any page and get a clear reply built on your real numbers, your progress and your next step. Not a generic FAQ, a straight answer.",
  },
  {
    id: "say-it-out-loud",
    icon: "mic",
    label: "Voice",
    heading: "Just say it out loud",
    body: "Tap the mic and talk. Tal listens, transcribes as you speak, and hands you a message you can tidy before you send. Typing optional.",
  },
];

/* --------------------------------------------------------------------------
   Panel 1 — the read.

   Three pages, each with the figures Tal pulls off it and the single move it
   would make next. Three rather than one because the claim is not "Tal can
   summarise a page" but "Tal reads EACH page the moment you land on it" —
   and the only way to show "each" is to let the reader change page and watch
   the digest change with it.
   -------------------------------------------------------------------------- */

export interface AgentDigestFigure {
  label: string;
  value: string;
  /** A short movement note. `direction` colours it; it is never a claim. */
  delta?: string;
  direction?: "up" | "down";
}

/**
 * One run of the summary Tal types back. `accent` marks the handful of
 * phrases that are highlighted as they are typed — the figure, the title,
 * the target. Segments rather than a single string because the highlight has
 * to be part of the typing: a phrase that lights up only once the sentence
 * has finished reads as formatting applied afterwards, where one that fills
 * inside its own chip reads as Tal deciding, mid-sentence, that this is the
 * part you needed to see.
 */
export interface AgentSummarySegment {
  text: string;
  accent?: boolean;
}

/** A summary, as paragraphs of runs. Two paragraphs: what is true, then what to do. */
export type AgentSummary = readonly (readonly AgentSummarySegment[])[];

export interface AgentDigestPage {
  id: string;
  /** The page Tal is reading, as it appears in the product's own nav. */
  name: string;
  /**
   * The figures Tal pulled off the page. These are no longer rendered as a
   * list — the mock types the prose below instead — but they stay here as
   * the fact base the summaries and panel 2's answers both quote, which is
   * the rule this file has always held itself to.
   */
  figures: readonly AgentDigestFigure[];
  /** The one move worth making next. One sentence, one action. */
  nextMove: string;
  /**
   * The same page, read back in Tal's own voice: a paragraph of what is
   * true, then a paragraph of what to do about it. Every number in it comes
   * from `figures` and every instruction from `nextMove` — the prose is a
   * restatement, never a new claim.
   */
  summary: AgentSummary;
}

export const agentDigestPages: readonly AgentDigestPage[] = [
  {
    id: "overview",
    name: "Overview",
    figures: [
      { label: "Sessions this week", value: "128", delta: "+14", direction: "up" },
      { label: "Completed", value: "91%", delta: "+3 pts", direction: "up" },
      { label: "Awaiting review", value: "11" },
    ],
    nextMove:
      "Clear the eleven awaiting review — nine of them have been sitting longer than your usual two days.",
    summary: [
      [
        { text: "You've run " },
        { text: "128 sessions this week", accent: true },
        { text: ", up fourteen, and " },
        { text: "91% of them finished", accent: true },
        { text: " — three points better than last week." },
      ],
      [
        { text: "Eleven are still awaiting review", accent: true },
        {
          text: ", and nine have been sitting longer than your usual two days. Clearing those is the one move worth making today.",
        },
      ],
    ],
  },
  {
    id: "candidates",
    name: "Candidates",
    figures: [
      { label: "In progress", value: "34" },
      { label: "Dropped mid-session", value: "6", delta: "-2", direction: "down" },
      { label: "Median session", value: "28 min" },
    ],
    nextMove:
      "Follow up the six who dropped mid-session; four stopped at the same question.",
    summary: [
      [
        { text: "Thirty-four candidates are in progress", accent: true },
        { text: ", running a " },
        { text: "median session of 28 minutes", accent: true },
        { text: ". Drop-offs are down two, to six." },
      ],
      [
        { text: "Four of those six stopped at the same question", accent: true },
        {
          text: ", so following them up — and taking another look at that question — is the next move.",
        },
      ],
    ],
  },
  {
    id: "reports",
    name: "Reports",
    figures: [
      { label: "Ready to send", value: "23" },
      { label: "Opened", value: "78%", delta: "+6 pts", direction: "up" },
      { label: "Oldest unsent", value: "9 days" },
    ],
    nextMove:
      "Send the twenty-three that are ready — the oldest has been waiting nine days.",
    summary: [
      [
        { text: "Twenty-three reports are ready to send", accent: true },
        { text: ", and the ones already out are " },
        { text: "opening at 78%", accent: true },
        { text: " — six points up on last week." },
      ],
      [
        { text: "The oldest has been waiting nine days", accent: true },
        {
          text: ". Send the twenty-three today and the backlog is clear before the week turns.",
        },
      ],
    ],
  },
];

/**
 * Tal's mark — the blob, as an mp4 in `public/assets/`.
 *
 * A video and not a CSS shape or a sprite: the blob is the one thing in the
 * band that is meant to read as the assistant itself rather than as an icon
 * from the set, and the supplied asset is the brand's own rendering of it.
 * It is decorative in every placement, so it is always `aria-hidden` and
 * never needs a caption.
 *
 * NOTE ON WEIGHT. The file is ~19MB, which is far too heavy for a landing
 * page that already ships five deliverable stills — it is bigger than every
 * other asset on the site put together. It streams rather than blocking, so
 * nothing waits on it, but it should be re-encoded before this page is
 * shipped: a few seconds of a looping blob at the size it is drawn here
 * (roughly 80px square) has no business being more than a few hundred KB.
 * A webm/h264 pair at 2x the drawn size, short and seamlessly looped, is the
 * right shape of asset.
 */
export const agentBlobVideo = "/assets/blob.mp4";

export const agentDigestCopy = {
  /** The byline on the typed summary, beside Tal's mark. */
  summaryLabel: "Summary by Tal",
} as const;

/* --------------------------------------------------------------------------
   Panel 2 — the answer.

   One conversation, running on its own: the learner asks, and Tal replies
   with a small table of the figures the question was actually about, a line
   of reading, and the one place to go next.

   THREE TURNS OFF ONE FACT BASE. Every figure below belongs to a single
   made-up learner, five weeks into the programme, and the three turns quote
   that one set rather than each inventing its own:

     13 chapters, 5 finished          75% average, cohort average 79%
     day 34 of 90, week 5 of 13       Talent Level 4 of 6
     Communication and Adaptability the two strongest of the six traits

   That is the whole point of the panel. "A clear reply built on your real
   numbers" means nothing if turn two contradicts turn one, and a reader
   watching three exchanges go past WILL notice two different answers to how
   far along they are. The programme length, the Level scale and the two
   named traits all come from `content/deliverables.ts`, which is where the
   site already states them.

   The reply is a TABLE and not a paragraph, because the claim the headline
   makes is about figures. Prose can restate a number; a table is the shape
   an answer takes when the numbers are the answer.

   AND IT IS ONLY THE TABLE. Each reply used to close on a sentence reading
   the figures back — what they meant, what was still open. It is gone: the
   rows already say it, the sentence was the same fact in worse form, and
   three lines of prose under three lines of table made the answer look like
   a report when what it has to look like is a glance.
   -------------------------------------------------------------------------- */

/** One line of the table in a reply: the figure, and what it is. */
export interface AgentAnswerRow {
  /** The figure. Short — it is set large, and it has a column of its own. */
  value: string;
  /** What the figure is, in the learner's own terms. */
  label: string;
}

export interface AgentChatTurn {
  id: string;
  /** What the learner asks, as they would type it. */
  question: string;
  /** What Tal is showing them. Two or three words, sentence case. */
  title: string;
  /**
   * The answer itself. Three rows, always: two reads as a fragment and four
   * stops being a glance, and the mock staggers them in on a fixed rhythm
   * that a variable row count would make uneven.
   */
  rows: readonly AgentAnswerRow[];
  /** The one place to go next. Drawn, and inert — nothing in a mock navigates. */
  action: string;
}

export const agentChatTurns: readonly AgentChatTurn[] = [
  {
    id: "overall",
    question: "How am I doing overall?",
    title: "Where you are",
    rows: [
      { value: "5 of 13", label: "chapters finished" },
      { value: "75%", label: "Your average" },
      { value: "Day 34", label: "of 90, week 5 of 13" },
    ],
    action: "Open course progress",
  },
  {
    id: "strongest",
    question: "Where am I strongest?",
    title: "What is carrying you",
    rows: [
      { value: "Level 4", label: "of 6 on the Talent Level scale" },
      { value: "Communication", label: "your highest of the six traits" },
      { value: "Adaptability", label: "second, and the one that has moved most since week 1" },
    ],
    action: "Open your strengths",
  },
  {
    id: "this-week",
    question: "What should I do this week?",
    title: "Week 5, the halfway mark",
    rows: [
      { value: "3 chapters", label: "left before week 6 opens" },
      { value: "Feedback Loop", label: "this week's phase of the plan" },
      { value: "4 points", label: "between you and the cohort average" },
    ],
    action: "Open week 5",
  },
];

export const agentAskCopy = {
  /**
   * The learner asking. One photograph, beside their own message, and the
   * only face in the whole band — it is what turns a panel of figures into
   * somebody's conversation.
   *
   * `alt` is empty on purpose. The person is a stand-in and carries no
   * information the message beside them has not already given, so a screen
   * reader that announced them would only be announcing stock photography.
   */
  asker: {
    src: "/people/p1.jpg",
    alt: "",
    width: 900,
    height: 900,
  },
  /**
   * Under the typing dots, for assistive tech only. The dots themselves are
   * decorative — three bouncing circles say nothing out loud.
   */
  thinkingLabel: "Tal is answering",
} as const;

/* --------------------------------------------------------------------------
   Panel 3 — the voice.

   One word. The panel is the blob at size with a level overlaid on it, and
   the only text is the status under it.

   It used to hold a whole dictation — `agentDictation`, `agentDictationDraft`
   and six labels for the mic, the transcript and the draft. All of that is
   gone: a paragraph of invented dictation under the blob was a second thing
   to read on a card whose left column is already the reading, and it pinned
   the panel to one scenario where the blob alone makes the claim with
   nothing specific attached. The single label below survives because a level
   that moves needs to say what it is listening TO nothing in particular.
   -------------------------------------------------------------------------- */

export const agentVoiceCopy = {
  /**
   * Under the stage. Written in sentence case with its own ellipsis and set
   * in small caps by the panel — the trailing dots are the point, so they
   * belong to the string rather than to a `::after` in the stylesheet where
   * a translator would never find them.
   */
  listeningLabel: "Listening…",
} as const;

export const agentCopy = {
  /**
   * The band's heading, over the card and centred.
   *
   * The section ran without one for a long while, on the argument that a
   * demonstration should be allowed to demonstrate rather than be introduced.
   * What that missed is that the band is the only section on the page a
   * visitor meets with no idea what they are looking at: every other one
   * announces itself, and this one opened on a card of unlabelled product
   * screens. The heading is the label, and it is the section's accessible
   * name as well — `GridModule` points `aria-labelledby` at it, which is why
   * there is no longer a separate `sectionLabel` saying something else to
   * screen readers than the page says on screen.
   *
   * It also restores the outline: this is the `h2`, and the open tab's own
   * headline — which was standing in as one — drops to the `h3` it always
   * was in meaning.
   *
   * Three fields rather than one string, the same shape every other accented
   * heading on the site takes: the middle one goes in `Highlight`, and a
   * heading that is one string cannot have a word in it picked out without
   * putting markup in the content file.
   */
  headingBefore: "Built ",
  /** Wrapped in `Highlight` — the one accent word in the line. */
  headingAccent: "Smart",
  headingAfter: ", From the Start",
  /** Names the tab switcher for assistive tech. */
  tablistLabel: "What Tal does",
} as const;
