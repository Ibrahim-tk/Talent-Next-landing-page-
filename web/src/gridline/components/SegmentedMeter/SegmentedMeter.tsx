import { cx } from "../../utils/cx";
import { Text } from "../Text/Text";
import styles from "./SegmentedMeter.module.css";

export type SegmentedMeterSize = "sm" | "md";

export interface SegmentedMeterProps {
  /** Current value, on the same scale as `max`. */
  value: number;
  /** Upper bound of the scale. Defaults to 100 so `value` reads as a percent. */
  max?: number;
  /** How many discrete ticks to quantise the scale into. */
  segments?: number;
  size?: SegmentedMeterSize;
  /** Accessible description, e.g. "Leadership score 72%". Required. */
  label: string;
  className?: string;
}

const sizeClass: Record<SegmentedMeterSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
};

const defaultSegments: Record<SegmentedMeterSize, number> = {
  sm: 20,
  md: 15,
};

/**
 * A quantised progress mark exposed as a native `meter` role.
 *
 * ```tsx
 * <SegmentedMeter value={72} label="Leadership score 72%" />
 * <SegmentedMeter value={3} max={15} size="md" label="Level 3 of 15" />
 * ```
 */
export function SegmentedMeter({
  value,
  max = 100,
  segments,
  size = "sm",
  label,
  className,
}: SegmentedMeterProps) {
  const total = segments ?? defaultSegments[size];
  const clamped = Math.min(Math.max(value, 0), max);
  const filled = Math.round((clamped / max) * total);

  return (
    <div
      className={cx(styles.root, sizeClass[size], className)}
      role="meter"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label}
    >
      {Array.from({ length: total }, (_, index) => (
        <span
          key={index}
          className={cx(styles.segment, index < filled && styles.filled)}
        />
      ))}
    </div>
  );
}

export interface MeterRowProps {
  /** Skill or dimension name. */
  name: string;
  /** Percentage, 0–100. */
  value: number;
  size?: SegmentedMeterSize;
  segments?: number;
  className?: string;
}

/**
 * A labelled meter: name on the left, percentage on the right, meter below.
 *
 * ```tsx
 * <MeterRow name="Leadership" value={72} />
 * ```
 */
export function MeterRow({
  name,
  value,
  size = "sm",
  segments,
  className,
}: MeterRowProps) {
  return (
    <div className={cx(styles.row, className)}>
      <div className={styles.rowHeader}>
        <Text variant="metricLabel">{name}</Text>
        <Text variant="metric">{value}%</Text>
      </div>
      <SegmentedMeter
        value={value}
        size={size}
        segments={segments}
        label={`${name} score ${value}%`}
      />
    </div>
  );
}
