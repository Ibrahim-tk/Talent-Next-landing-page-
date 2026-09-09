import type { Ref } from "react";

import { cx } from "../../utils/cx";
import styles from "./ProgressTrack.module.css";

export type ProgressTone = "primary" | "accent";
export type ProgressSize = "hairline" | "sm";

/**
 * `width` renders a declarative percentage fill.
 * `scale` renders a full-width fill whose `scaleX` an animation driver owns —
 * used by the scroll-scrubbed section indicator.
 */
export type ProgressMode = "width" | "scale";

export interface ProgressTrackProps {
  /** 0–100. Ignored in `scale` mode, where the driver owns the transform. */
  value?: number;
  tone?: ProgressTone;
  size?: ProgressSize;
  mode?: ProgressMode;
  /** Draw the unfilled portion of the track. */
  showTrack?: boolean;
  /**
   * Initial `scaleX` for `scale` mode, so the bar renders at the right width
   * before the animation driver attaches.
   */
  initialScale?: number;
  /** Handed to an animation driver (e.g. GSAP) to own the fill element. */
  fillRef?: Ref<HTMLSpanElement>;
  /** Omit only when an adjacent element already announces the value. */
  label?: string;
  className?: string;
}

const toneClass: Record<ProgressTone, string> = {
  primary: styles.tonePrimary,
  accent: styles.toneAccent,
};

const sizeClass: Record<ProgressSize, string> = {
  hairline: styles.sizeHairline,
  sm: styles.sizeSm,
};

/**
 * ```tsx
 * <ProgressTrack value={66} label="Step 2 of 3" />
 * <ProgressTrack mode="scale" tone="accent" size="hairline"
 *                showTrack={false} initialScale={0.166} fillRef={barRef} />
 * ```
 */
export function ProgressTrack({
  value = 0,
  tone = "primary",
  size = "sm",
  mode = "width",
  showTrack = true,
  initialScale = 1,
  fillRef,
  label,
  className,
}: ProgressTrackProps) {
  const clamped = Math.min(Math.max(value, 0), 100);

  return (
    <div
      className={cx(
        styles.root,
        sizeClass[size],
        showTrack ? styles.trackFilled : styles.trackBare,
        className,
      )}
      role={label ? "progressbar" : undefined}
      aria-valuenow={label ? clamped : undefined}
      aria-valuemin={label ? 0 : undefined}
      aria-valuemax={label ? 100 : undefined}
      aria-label={label}
    >
      <span
        ref={fillRef}
        className={cx(
          styles.fill,
          toneClass[tone],
          mode === "width" ? styles.modeWidth : styles.modeScale,
        )}
        style={
          mode === "width"
            ? { width: `${clamped}%` }
            : { transform: `scaleX(${initialScale})` }
        }
      />
    </div>
  );
}
