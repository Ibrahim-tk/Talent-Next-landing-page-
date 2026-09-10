import type { CSSProperties } from "react";

import { cx } from "../../utils/cx";
import { Text } from "../Text/Text";
import styles from "./PlanStack.module.css";

export type PlanPhaseTone = "neutral" | "accent" | "sunken";

export interface PlanPhase {
  id: string;
  /** The small line above the name — "Week 1". */
  kicker: string;
  /** The phase itself — "Foundations". */
  label: string;
  /** Card fill. Defaults to `neutral` (white). */
  tone?: PlanPhaseTone;
}

export interface PlanStackProps {
  phases: readonly PlanPhase[];
  /** Accessible name for the list. */
  label?: string;
  className?: string;
}

/**
 * The number of beats in one turn of the loop, and the reason this component
 * wants exactly six phases.
 *
 * A card's life is six equal beats long: it waits below the window, rises
 * through the three visible slots one beat at a time, leaves through the top,
 * and is parked out of sight for one beat before the loop hands it back to
 * the bottom. Those six beats are written into `@keyframes planCycle` as
 * fixed percentages — keyframe offsets cannot be a `calc()` of a custom
 * property, so the choreography cannot read the real list length.
 *
 * What the length does control is the stagger: card `i` starts `i/6` of a
 * cycle in, via a negative `animation-delay`. Six phases therefore fill every
 * beat exactly. Fewer than six still runs — the stack simply shows a gap
 * where the missing beats are. More than six is the case to avoid: card 6
 * lands on the same beat as card 0 and the two ride the loop stacked on top
 * of each other.
 */
const PHASE_BEATS = 6;

const toneClass: Record<PlanPhaseTone, string> = {
  neutral: styles.toneNeutral,
  accent: styles.toneAccent,
  sunken: styles.toneSunken,
};

/**
 * A looping stack of plan cards: a personalised programme dealing itself out,
 * one week at a time, forever.
 *
 * Every card runs the *same* infinite keyframe animation and is separated
 * only by a negative delay, so there is no JavaScript, no timer to drift, and
 * nothing to re-render — the loop is handed to the compositor once at paint
 * and stays there. Only `transform` and `opacity` are animated, which are the
 * two properties the compositor can run without the main thread, so the loop
 * holds its frame rate even while the page is doing something else.
 *
 * ```tsx
 * <PlanStack phases={planPhases} label="A sample three-week plan" />
 * ```
 */
export function PlanStack({ phases, label, className }: PlanStackProps) {
  return (
    <ol className={cx(styles.root, className)} aria-label={label}>
      {phases.map((phase, index) => (
        <li
          key={phase.id}
          className={cx(styles.card, toneClass[phase.tone ?? "neutral"])}
          style={
            {
              "--plan-index": index,
              "--plan-offset": index / PHASE_BEATS,
            } as CSSProperties
          }
        >
          <Text variant="metricLabel" tone="muted" className={styles.kicker}>
            {phase.kicker}
          </Text>
          <Text variant="title" as="span" tone="heading">
            {phase.label}
          </Text>
        </li>
      ))}
    </ol>
  );
}
