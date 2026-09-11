"use client";

import Image from "next/image";
import {
  Fragment,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import { Icon, Text } from "@gridline";
import { useReducedMotion } from "@gridline/motion";
import {
  agentAskCopy,
  agentVoiceCopy,
  agentBlobVideo,
  agentDigestCopy,
  agentDigestPages,
  agentChatTurns,
  type AgentSummary,
} from "@/content/agent";

import styles from "./AgentPanelVisual.module.css";

/**
 * The right-hand column of the Tal panel — one working mock per tab.
 *
 * **There is no frame around them.** Each mock used to sit in a white card
 * on a rose-tinted plate — two stacked surfaces, the back one wider — which
 * is how a product screenshot is usually staged. That went: the panel's own
 * card is already a white surface floating on a mesh, so a second card
 * inside it was a box inside a box, and the thing it was framing was mostly
 * type. The mocks now sit directly in the card's white space, and what makes
 * three different pictures read as one product is the blob and the shared
 * chip, label and caret treatments rather than a border.
 *
 * They are mocks, not a product: nothing here calls anything, no microphone
 * is opened, and no message is sent. They are interactive anyway, because
 * each one is making an argument a still picture cannot make — that Tal
 * reads *each* page and not one page, that an answer is built on the figures
 * already on screen, and that dictation ends in a draft you still control.
 *
 * Every value they display comes from `content/agent.ts`. Nothing in this
 * file is copy.
 */
export interface AgentPanelVisualProps {
  /** An `agentBehaviours` id. Anything unrecognised renders nothing. */
  behaviourId: string;
}

export function AgentPanelVisual({ behaviourId }: AgentPanelVisualProps) {
  switch (behaviourId) {
    case "reads-the-screen":
      return <DigestMock />;
    case "answers-anywhere":
      return <AskMock />;
    case "say-it-out-loud":
      return <VoiceMock />;
    default:
      return null;
  }
}

/* ==========================================================================
   1. The read — "Every screen, read back to you in seconds"
   ========================================================================== */

/**
 * How fast the summary types, in milliseconds per character.
 *
 * Fast enough that the longest of the three summaries finishes inside five
 * seconds, which matters because the band turns itself over every eight: a
 * summary that is still typing when its tab is replaced has demonstrated
 * nothing. Slow enough that the words arrive as words rather than as a page
 * of text appearing.
 */
const SUMMARY_MS_PER_CHAR = 18;

/**
 * How long a finished summary is left on screen before the loop moves to the
 * next page. It has to be long enough to READ what has just been typed —
 * typing a sentence and whipping it away is a worse demonstration than not
 * typing it at all — and the summaries are two short paragraphs, so two and a
 * half seconds is about one unhurried pass.
 */
const SUMMARY_HOLD_MS = 2500;

/** Characters in a summary, which is also what sets how long it takes. */
function summaryLength(summary: AgentSummary): number {
  return summary.reduce(
    (sum, paragraph) =>
      sum + paragraph.reduce((count, run) => count + run.text.length, 0),
    0,
  );
}

/**
 * Three pages across the top, and under them the summary Tal types back for
 * whichever one is selected.
 *
 * It is a GRAPHIC, not a control. There were three chips above it — one per
 * page — and picking one swapped the summary. They are gone: the right-hand
 * column of this band is now a thing to watch rather than a thing to operate,
 * and a row of buttons nobody is meant to press was competing with the pill
 * above it, which is the one control here that does matter.
 *
 * So the three pages cycle on their own, forever, and all three summaries
 * are shown rather than one being picked. That is also what carries the
 * argument the chips used to carry: a summary of ONE page only shows that Tal
 * can summarise, where watching a second and a third type themselves out is
 * what shows it reads *each* page — which is what the headline claims.
 *
 * The dwell is the summary's own length plus a beat, not a fixed interval:
 * the three summaries are different lengths, and a fixed tick would leave the
 * short one sitting finished while the long one was cut off mid-sentence.
 */
function DigestMock() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  const page = agentDigestPages[index % agentDigestPages.length];

  useEffect(() => {
    /* Under reduced motion the summary is not typed at all — it arrives
       whole — so there is nothing to wait for and the dwell is the hold on
       its own. The loop still runs: all three summaries are the content, and
       a reader who asked for less motion has not asked to be shown less. */
    const typing = reduced ? 0 : summaryLength(page.summary) * SUMMARY_MS_PER_CHAR;

    const timer = window.setTimeout(
      () => setIndex((current) => current + 1),
      typing + SUMMARY_HOLD_MS,
    );
    return () => window.clearTimeout(timer);
  }, [page, reduced]);

  return (
    <MockStack tone="green" art="bars">
      {/* No box, no label and no chips — the byline and the summary sit
          straight on the card's white, and the blob is what holds the top of
          the column now that nothing else does. */}
      <div className={styles.summary}>
        <p className={styles.summaryHead}>
          <TalBlob />
          {agentDigestCopy.summaryLabel}
        </p>

        {/* Keyed on the page so the typewriter restarts rather than
            continuing from wherever the last one had got to. */}
        <SummaryTypewriter key={page.id} summary={page.summary} />
      </div>
    </MockStack>
  );
}

/**
 * The summary, typed out a character at a time.
 *
 * **The whole sentence is in the DOM from the first frame.** Only the
 * un-typed tail is hidden — `visibility: hidden`, not removed — so every
 * line break is settled before the first character appears. A typewriter
 * that appends text reflows on almost every frame: words jump to the line
 * above, the block grows a line, and the card under it grows with it. That
 * jitter is the entire difference between this reading as a considered
 * effect and as a loading state.
 *
 * **A highlighted phrase is drawn as two halves while it is mid-typed** —
 * the typed part in a chip with its right edge squared off, the rest in a
 * hidden chip with its left edge squared off. The two together occupy
 * exactly the width of the finished chip, so the highlight fills in place
 * instead of the chip growing sideways and shoving the rest of the line.
 *
 * **It is paced off elapsed time, not off frames.** A dropped frame costs a
 * character, not a stall, and the summary takes the same length of time on
 * any machine.
 *
 * Reduced motion gets the finished summary immediately. The point being made
 * is that Tal reads the page; the typing is how that is dramatised, and a
 * reader who asked for less motion has not asked to be told less.
 */
function SummaryTypewriter({ summary }: { summary: AgentSummary }) {
  const reduced = useReducedMotion();

  const total = useMemo(
    () =>
      summary.reduce(
        (sum, paragraph) =>
          sum + paragraph.reduce((count, run) => count + run.text.length, 0),
        0,
      ),
    [summary],
  );

  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (reduced) {
      setShown(total);
      return;
    }

    setShown(0);

    let frame = 0;
    let start: number | null = null;

    const tick = (now: number) => {
      if (start === null) start = now;
      const typed = Math.floor((now - start) / SUMMARY_MS_PER_CHAR);

      if (typed >= total) {
        setShown(total);
        return;
      }

      setShown(typed);
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [summary, total, reduced]);

  const typing = shown < total;

  /* One cursor walked across every run of every paragraph. `left` is how
     many characters of the budget are still unspent when this run is
     reached; the caret belongs to the run that spends the last of them. */
  let left = shown;
  let caretPlaced = false;

  const caret = <span className={styles.summaryCaret} aria-hidden="true" />;

  const nodeLists = summary.map((runs) => {
    const nodes: ReactNode[] = [];

    runs.forEach((run, runIndex) => {
      const length = run.text.length;
      const take = Math.max(0, Math.min(length, left));
      const here = !caretPlaced && typing && left > 0 && left <= length;

      const placeCaret = () => {
        nodes.push(<Fragment key={`${runIndex}-caret`}>{caret}</Fragment>);
        caretPlaced = true;
      };

      if (run.accent) {
        if (take <= 0) {
          nodes.push(
            <b
              key={runIndex}
              className={`${styles.summaryAccent} ${styles.summaryGhost}`}
            >
              {run.text}
            </b>,
          );
        } else if (take >= length) {
          nodes.push(
            <b key={runIndex} className={styles.summaryAccent}>
              {run.text}
            </b>,
          );
          if (here) placeCaret();
        } else {
          nodes.push(
            <b
              key={`${runIndex}-open`}
              className={`${styles.summaryAccent} ${styles.summaryAccentOpen}`}
            >
              {run.text.slice(0, take)}
            </b>,
          );
          if (here) placeCaret();
          nodes.push(
            <b
              key={`${runIndex}-close`}
              className={`${styles.summaryAccent} ${styles.summaryAccentClose} ${styles.summaryGhost}`}
            >
              {run.text.slice(take)}
            </b>,
          );
        }
      } else {
        if (take > 0) {
          nodes.push(
            <Fragment key={runIndex}>{run.text.slice(0, take)}</Fragment>,
          );
        }
        if (here) placeCaret();
        if (take < length) {
          nodes.push(
            <span key={`${runIndex}-ghost`} className={styles.summaryGhost}>
              {run.text.slice(take)}
            </span>,
          );
        }
      }

      left -= length;
    });

    return nodes;
  });

  /* Nothing has been typed yet: the caret has to sit in front of the first
     character rather than nowhere. */
  if (typing && !caretPlaced && nodeLists.length > 0) {
    nodeLists[0].unshift(<Fragment key="caret-start">{caret}</Fragment>);
  }

  const paragraphs = nodeLists.map((nodes, index) => (
    <p key={index} className={styles.summaryBody}>
      {nodes}
    </p>
  ));

  return (
    <div className={styles.summaryText}>
      {/* The animated copy is hidden from assistive tech: half of it is
          `visibility: hidden` at any given moment, so a screen reader
          arriving mid-animation would be read a sentence that stops in the
          middle of a word. The finished text is given once, in full, below
          — and it is never announced twice. */}
      <div aria-hidden="true">{paragraphs}</div>
      <p className={styles.summaryScreenReader}>
        {summary
          .map((runs) => runs.map((run) => run.text).join(""))
          .join(" ")}
      </p>
    </div>
  );
}

/* ==========================================================================
   2. The answer — "Answers the moment you need them"
   ========================================================================== */

/** How long the learner's message sits alone before Tal starts answering. */
const CHAT_ASK_MS = 900;

/** How long the typing dots run. A beat, not a wait. */
const CHAT_THINK_MS = 1100;

/**
 * How long the finished reply is held before the loop clears it. The table
 * staggers itself in over the first ~700ms of this, so what is left is about
 * three seconds of a finished answer on screen — one unhurried read of three
 * rows and a sentence.
 */
const CHAT_REPLY_MS = 3800;

/** The fade-out between one exchange and the next. */
const CHAT_CLEAR_MS = 360;

/** Lead-in before the first table row lands, measured from the reply's start. */
const ROW_LEAD_MS = 140;

/** Gap between one row landing and the next. */
const ROW_STAGGER_MS = 90;

type ChatStage = "asking" | "thinking" | "replying" | "clearing";

/**
 * One conversation, running on its own, forever: a question goes up, Tal
 * thinks for a beat, and the answer builds itself out of a table.
 *
 * **Nothing here is a control.** This panel used to be a drawn field and
 * three chips you picked from, and it is now a thing to watch — the same
 * move the read panel made, and for the same reason. A row of buttons nobody
 * is meant to press competes with the tabs directly above it, and the claim
 * being made ("ask from any page and get a straight answer") is a claim
 * about a SEQUENCE: you ask, it thinks, it answers. A picture of a filled-in
 * field has already skipped the only part worth showing.
 *
 * **The reply is a table.** The headline promises an answer "built on your
 * real numbers", and prose that quotes a number is still prose — a table is
 * the shape an answer takes when the figures ARE the answer. Under it, one
 * sentence of what the figures mean, and one place to go next.
 *
 * **The motion is the argument, so it is built to hold frame rate.** Every
 * keyframe in the chat touches `transform` and `opacity` and nothing else,
 * the rows stagger on `animation-delay` rather than on a timer per row, and
 * the four stage changes are the only thing React re-renders for. What
 * animates is composited; what is scheduled is four `setTimeout`s.
 *
 * Under reduced motion the thinking beat is skipped and the reply is simply
 * there. The loop still runs — three exchanges are the content, and a reader
 * who asked for less motion has not asked to be shown one of them.
 */
function AskMock() {
  const [index, setIndex] = useState(0);
  const [stage, setStage] = useState<ChatStage>("asking");
  const reduced = useReducedMotion();

  const turn = agentChatTurns[index % agentChatTurns.length];

  useEffect(() => {
    if (reduced) {
      /* No thinking beat and no clearing fade: the exchange is on screen,
         and the loop is the only thing still running. */
      setStage("replying");
      const next = window.setTimeout(
        () => setIndex((current) => current + 1),
        CHAT_ASK_MS + CHAT_REPLY_MS,
      );
      return () => window.clearTimeout(next);
    }

    setStage("asking");

    const timers = [
      window.setTimeout(() => setStage("thinking"), CHAT_ASK_MS),
      window.setTimeout(
        () => setStage("replying"),
        CHAT_ASK_MS + CHAT_THINK_MS,
      ),
      /* The reply is held mounted through the fade rather than being
         unmounted at the end of its dwell — an element that has already left
         the DOM cannot animate out, and a reply that vanished on a frame
         would undo the care taken over the way it arrived. */
      window.setTimeout(
        () => setStage("clearing"),
        CHAT_ASK_MS + CHAT_THINK_MS + CHAT_REPLY_MS,
      ),
      window.setTimeout(
        () => setIndex((current) => current + 1),
        CHAT_ASK_MS + CHAT_THINK_MS + CHAT_REPLY_MS + CHAT_CLEAR_MS,
      ),
    ];

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [index, reduced]);

  const answered = stage === "replying" || stage === "clearing";

  return (
    <MockStack tone="amber" art="shapes">
      <div className={styles.chat} data-stage={stage}>
        {/* The question, and the only face in the band. Keyed on the turn so
            the bubble replays its entrance when the conversation moves on —
            it does not remount between the stages of one exchange, so it
            arrives once and then stays put while the answer is built. */}
        <div className={styles.ask} key={`${turn.id}-ask`}>
          <p className={styles.askBubble}>{turn.question}</p>
          <Image
            className={styles.asker}
            src={agentAskCopy.asker.src}
            alt={agentAskCopy.asker.alt}
            width={96}
            height={96}
          />
        </div>

        {stage === "thinking" ? (
          <p className={styles.thinking}>
            <TalBlob size="sm" />
            <span className={styles.dots} aria-hidden="true">
              {[0, 1, 2].map((dot) => (
                <span
                  key={dot}
                  className={styles.dot}
                  style={{ animationDelay: `${dot * 140}ms` }}
                />
              ))}
            </span>
            <span className={styles.tabLabelHidden}>
              {agentAskCopy.thinkingLabel}
            </span>
          </p>
        ) : null}

        {answered ? (
          <div className={styles.reply} key={`${turn.id}-reply`}>
            <p className={styles.replyHead}>
              <TalBlob size="sm" />
              <Icon name="trendUp" size={15} />
              {turn.title}
            </p>

            {/* Three rows on one grid, so the figures line up down the left
                whatever length they are. The delay is inline because it is
                the row's INDEX — everything else about the stagger lives in
                the stylesheet. */}
            <div className={styles.table}>
              {turn.rows.map((row, rowIndex) => (
                <div
                  key={row.value}
                  className={styles.row}
                  style={{
                    animationDelay: `${ROW_LEAD_MS + rowIndex * ROW_STAGGER_MS}ms`,
                  }}
                >
                  <span className={styles.rowValue}>{row.value}</span>
                  <span className={styles.rowLabel}>{row.label}</span>
                </div>
              ))}
            </div>

            {/* Drawn, and inert. Nothing in a mock navigates, and a link that
                goes nowhere is worse than one that never invited the click —
                so this is a span. */}
            <span className={styles.replyAction}>
              {turn.action}
              <Icon name="arrowRight" size={14} />
            </span>
          </div>
        ) : null}
      </div>
    </MockStack>
  );
}

/* ==========================================================================
   3. The voice — "Just say it out loud"
   ========================================================================== */

/**
 * The level's bars, and the peak each one reaches.
 *
 * Authored rather than generated, for the same reason the plate art is: a run
 * randomised at render time is a different run on the server and in the
 * browser, which is a hydration mismatch, and one randomised once at module
 * scope is stable but untunable. Hand-set, the row can be given the shape a
 * voice actually has — an uneven middle that runs hot, tapering at both ends,
 * with no two neighbours the same height and no figure repeating on a short
 * enough beat to read as a pattern.
 */
const WAVE_PEAKS: readonly number[] = [
  0.22, 0.44, 0.31, 0.62, 0.48, 0.8, 0.57, 0.93, 0.68, 1, 0.74, 0.88, 0.55,
  0.96, 0.63, 0.79, 0.41, 0.7, 0.34, 0.52, 0.26,
];

/**
 * The eleven the overlay actually draws — the middle of the run above, where
 * the peaks are highest. Taken from the same sequence rather than authored
 * separately so there is one place to tune the level's shape, and taken from
 * the MIDDLE because the ends of that run taper: a short slice off either end
 * would be a level that never gets loud.
 */
const OVERLAY_PEAKS: readonly number[] = WAVE_PEAKS.slice(5, 16);

/**
 * The stage: the blob, lit, with rings leaving it — and nothing else.
 *
 * It ran a whole dictation at one point: phrases arriving one at a time into
 * a transcript, then a tidied draft with an edit affordance. That is gone.
 * The panel is a PICTURE of Tal listening, and a paragraph of invented
 * dictation underneath it ("Hi Priya — I've just reviewed your session…")
 * was a second thing to read on a card whose left column is already the
 * reading. It also dated the panel to one scenario, where a blob and a ring
 * leaving it is the whole claim with nothing specific attached.
 *
 * With the transcript went the state machine behind it — a stage, a phrase
 * counter, three timers and a reduced-motion branch. The stage is simply
 * always listening now, which is what the rings already looked like.
 *
 * **THE BLOB IS THE SUBJECT HERE, not a mark.** Every other panel uses it as
 * a byline — a small disc saying who is talking, beside something else that
 * is doing the talking. On this one it IS the thing: the claim is that you
 * can speak to Tal, and the assistant's own face at the size of a face says
 * that more directly than any glyph of a microphone. It replaced a drawn dial
 * — three rings, a white disc and five bars — which was a careful picture of
 * a voice UI in general rather than a picture of this product.
 *
 * **Nothing is in a box.** The blob sits on the card's own white with a field
 * of light behind it and the level laid over it. There is no disc behind the
 * blob and no panel behind anything else. A frame drawn around a voice in a
 * room is exactly the wrong metaphor, and there were three of them here.
 */
function VoiceMock() {
  return (
    <MockStack tone="azure" art="wave">
      {/* The stage: the blob at twice the size it was, the room lit behind
          it, and the level laid ON it rather than under it.

          The level moved because the two were competing. A row of bars
          sitting below the blob is a second object, and the panel then has
          two centres — where a level overlaid on the blob makes one object
          that is visibly doing something. It is also what let the blob grow:
          the stage no longer has to share the surface's height with a meter.

          There is no glow behind the blob any more. It was a rose radial
          wash the rings dissolved into, and on a panel whose whole point is
          to be calm it read as a red stain under the one warm object on the
          card. The rings now leave into plain white and are neutral
          themselves.

          Decorative in full: the label underneath says what is happening, and
          a halo announces nothing to a screen reader. */}
      <div className={styles.stage} data-listening="">
        <span className={styles.ring} aria-hidden="true" />
        <span className={styles.ring} aria-hidden="true" />
        <TalBlob size="xl" />

        {/* The level. Each bar on one shared keyframe at its own peak and its
            own NEGATIVE delay — negative, so the row is already mid-motion on
            its first frame instead of rippling into life from the left, which
            is a loading bar and not a voice.

            Eleven bars and not the full twenty-one: this is now sitting on
            the blob rather than spanning the card, and a level wider than the
            thing it belongs to reads as a caption strip across it. */}
        <div className={styles.waveOverlay} data-listening="" aria-hidden="true">
          {OVERLAY_PEAKS.map((peak, index) => (
            <span
              key={index}
              className={styles.waveBar}
              style={
                {
                  "--agent-wave-peak": peak,
                  animationDelay: `-${index * 80}ms`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      </div>

      {/* At the foot of the surface, not under the stage — `margin-top: auto`
          pushes it to the bottom edge whatever height the stage takes. */}
      <p className={styles.listening}>{agentVoiceCopy.listeningLabel}</p>
    </MockStack>
  );
}



/* ==========================================================================
   Shared pieces
   ========================================================================== */

/**
 * Which backdrop runs behind a mock. One per tab, and they are not
 * interchangeable — each is a picture of what its panel is doing.
 *
 * `bars`   fine vertical rules of varying height: a page being read off
 * `shapes` loose outlined geometry: structure, without claiming a structure
 * `wave`   fat rounded columns: the shape every product uses for a voice
 */
type PlateArtKind = "bars" | "shapes" | "wave";

interface PlateMark {
  /** Height as a percentage of the strip, which is itself a third of the
      plate — so these are proportions, never pixels. */
  h: number;
  /** `shapes` only. Ignored by the other two kinds. */
  shape?: "circle" | "square" | "triangle" | "ring";
}

/**
 * The three backdrops, written out rather than generated.
 *
 * Deliberately NOT random, despite the brief asking for "random vector
 * graphics". A run that is generated at render time is a different run on
 * the server and in the browser, which is a hydration mismatch; one
 * generated once at module scope is stable but unreadable, and nobody can
 * tune a silhouette they cannot see in the source. These are hand-set so the
 * rhythm reads as irregular without ever repeating on a short beat — the run
 * is duplicated and translated by half its width, so what the eye must not
 * catch is the seam, and an authored sequence is the only way to be sure the
 * first and last marks do not rhyme.
 */
const PLATE_ART: Record<PlateArtKind, readonly PlateMark[]> = {
  bars: [
    { h: 38 }, { h: 72 }, { h: 54 }, { h: 90 }, { h: 46 }, { h: 66 },
    { h: 100 }, { h: 58 }, { h: 34 }, { h: 78 }, { h: 62 }, { h: 44 },
    { h: 86 }, { h: 50 }, { h: 70 }, { h: 40 }, { h: 94 }, { h: 56 },
  ],
  shapes: [
    { h: 46, shape: "circle" }, { h: 68, shape: "square" },
    { h: 34, shape: "triangle" }, { h: 80, shape: "ring" },
    { h: 52, shape: "square" }, { h: 40, shape: "circle" },
    { h: 72, shape: "triangle" }, { h: 58, shape: "ring" },
    { h: 44, shape: "square" }, { h: 64, shape: "circle" },
  ],
  wave: [
    { h: 34 }, { h: 62 }, { h: 96 }, { h: 70 }, { h: 44 }, { h: 84 },
    { h: 52 }, { h: 100 }, { h: 40 }, { h: 76 }, { h: 58 }, { h: 90 },
    { h: 48 }, { h: 66 },
  ],
};

/**
 * The backdrop: a strip a third of the plate's height, centred on it, running
 * right to left forever behind the surface.
 *
 * A third and centred is what makes it read as a horizon rather than as
 * wallpaper — at full height it filled the margins top to bottom and fought
 * the card for the eye, where a band level with the card's middle passes
 * behind it and comes out the other side.
 *
 * Two identical runs translated by half the track's width, the same seamless
 * loop the ticker below uses: at -50% the second run sits exactly where the
 * first began, and because the distance is a percentage, editing `PLATE_ART`
 * cannot break it.
 *
 * Decorative throughout, so `aria-hidden` and never labelled.
 */
function PlateArt({ kind }: { kind: PlateArtKind }) {
  const marks = PLATE_ART[kind];

  return (
    <div className={styles.plateArt} data-kind={kind} aria-hidden="true">
      <div className={styles.artTrack}>
        {[0, 1].map((copy) => (
          <div className={styles.artRun} key={copy}>
            {marks.map((mark, index) => (
              <span
                key={index}
                className={styles.artMark}
                data-shape={mark.shape}
                style={{ height: `${mark.h}%` }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

interface MockStackProps {
  /**
   * Which of the three grounds the plate under this mock takes. One per
   * behaviour, in `agentBehaviours` order — the band turns itself over on a
   * timer, and a reader who looks up mid-cycle should be able to tell that a
   * new panel has arrived before reading a word of it. Three panels that
   * differ only in their contents read as one panel rewriting itself.
   */
  tone: "green" | "amber" | "azure";
  /** Which backdrop runs behind this panel. */
  art: PlateArtKind;
  /** A small grey heading above the mock. The voice mock draws its own. */
  label?: string;
  children: ReactNode;
}

/**
 * The mock's own vertical rhythm, and nothing else — no surface, no border,
 * no padding, no shadow. It exists so the three mocks agree about the gap
 * between their parts, which after the frame came off is the only structure
 * holding them together.
 */
function MockStack({ tone, art, label, children }: MockStackProps) {
  return (
    <div className={styles.plate} data-tone={tone}>
      <PlateArt kind={art} />

      {/* The surface. This is the card the mock actually lives on, and the
          one thing in the column with a hard edge. */}
      <div className={styles.surface}>
        {label ? (
          <Text
            variant="caption"
            as="p"
            tone="muted"
            className={styles.mockTitle}
          >
            {label}
          </Text>
        ) : null}
        {children}
      </div>

    </div>
  );
}

interface TalBlobProps {
  /**
   * `sm` sits beside an answer, `lg` is the byline mark on the read panel,
   * and `xl` is the voice panel's subject — the blob as the thing that is
   * listening, rather than as a mark next to something else.
   */
  size?: "sm" | "lg" | "xl";
}

/**
 * Tal's mark: the supplied blob, played as a looping video.
 *
 * `mix-blend-mode: multiply` rather than a mask or a circular clip. The asset
 * is a blob on a light ground, and multiplying it into the card drops that
 * ground away wherever it is white while leaving the blob itself untouched —
 * where a circular clip would cut the corners off an organic shape and a
 * chroma key would need an alpha channel the file does not have. It is safe
 * because the surface underneath is flat `--gl-neutral-0`; if the card is
 * ever tinted, this is the declaration that has to be revisited.
 *
 * Always decorative. The byline beside it already says "Summary by Tal" and
 * the answer beside it is the answer, so there is nothing here for a screen
 * reader that the copy has not said.
 *
 * Under reduced motion it is paused on its first frame rather than removed:
 * the mark is Tal's face, and a reader who asked for less motion has not
 * asked to be shown less of the product.
 */
function TalBlob({ size = "lg" }: TalBlobProps) {
  const reduced = useReducedMotion();

  return (
    <video
      className={styles.blob}
      data-size={size}
      src={agentBlobVideo}
      autoPlay
      muted
      loop
      playsInline
      /* `metadata`, not `auto`: the file is far heavier than it should be
         (see the note on `agentBlobVideo`) and this page must not spend its
         connection on a decorative loop before the copy has painted. */
      preload="metadata"
      aria-hidden="true"
      onLoadedData={(event) => {
        if (reduced) event.currentTarget.pause();
      }}
    />
  );
}
