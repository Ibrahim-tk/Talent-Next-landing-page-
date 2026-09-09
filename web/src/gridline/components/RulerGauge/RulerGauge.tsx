import type { Ref } from "react";

import { cx } from "../../utils/cx";
import styles from "./RulerGauge.module.css";

export interface RulerGaugeProps {
  /**
   * Total tick count. Defaults to 101 — 20 spans of five, so the first and
   * last tick are both major and the rule reads as evenly divided.
   */
  ticks?: number;
  /** Every nth tick is drawn long. */
  majorEvery?: number;
  /**
   * Handed to an animation driver, which reveals the accent track by
   * animating its `clip-path` from `inset(0 0 100% 0)` to `inset(0 0 0% 0)`.
   */
  progressRef?: Ref<HTMLDivElement>;
  className?: string;
}

function Ticks({ count, majorEvery }: { count: number; majorEvery: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          className={cx(
            styles.tick,
            index % majorEvery === 0 && styles.tickMajor,
          )}
        />
      ))}
    </>
  );
}

/**
 * ```tsx
 * <RulerGauge progressRef={gaugeRef} />
 * ```
 */
export function RulerGauge({
  ticks = 101,
  majorEvery = 5,
  progressRef,
  className,
}: RulerGaugeProps) {
  return (
    <div className={cx(styles.root, className)} aria-hidden="true">
      <div className={styles.track}>
        <Ticks count={ticks} majorEvery={majorEvery} />
      </div>
      <div
        ref={progressRef}
        className={cx(styles.track, styles.progressTrack)}
      >
        <Ticks count={ticks} majorEvery={majorEvery} />
      </div>
    </div>
  );
}
