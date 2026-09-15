import type { CSSProperties, Ref } from "react";

import { cx } from "../../utils/cx";
import styles from "./RulerGauge.module.css";

export interface RulerGaugeProps {
  /**
   * Distance from one minor tick to the next, in whole pixels. A fixed
   * pitch, rather than "N ticks divided across whatever height the box
   * happens to be": see the module CSS for why that distinction is the
   * whole point of this component.
   */
  pitch?: number;
  /** Every nth tick is drawn taller and lighter. */
  majorEvery?: number;
  /**
   * Handed to an animation driver, which reveals the accent track by
   * animating its `clip-path` from `inset(0 0 100% 0)` to `inset(0 0 0% 0)`.
   */
  progressRef?: Ref<HTMLDivElement>;
  className?: string;
}

/**
 * ```tsx
 * <RulerGauge progressRef={gaugeRef} />
 * ```
 */
export function RulerGauge({
  pitch = 10,
  majorEvery = 5,
  progressRef,
  className,
}: RulerGaugeProps) {
  return (
    <div
      className={cx(styles.root, className)}
      style={
        {
          "--gl-ruler-pitch": `${pitch}px`,
          "--gl-ruler-pitch-major": `${pitch * majorEvery}px`,
        } as CSSProperties
      }
      aria-hidden="true"
    >
      <div className={styles.track} />
      <div
        ref={progressRef}
        className={cx(styles.track, styles.progressTrack)}
      />
    </div>
  );
}
