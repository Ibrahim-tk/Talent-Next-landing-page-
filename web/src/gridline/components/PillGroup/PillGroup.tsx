"use client";

import type { ReactNode } from "react";

import { cx } from "../../utils/cx";
import styles from "./PillGroup.module.css";

export interface PillOptionProps {
  /** Stable value submitted with the form. */
  value: string;
  selected: boolean;
  onSelect: (value: string) => void;
  className?: string;
  children: ReactNode;
}

/**
 * One option in a `PillGroup`. Carries `role="radio"` so assistive tech reads
 * the group as a single-select control rather than a row of buttons.
 */
export function PillOption({
  value,
  selected,
  onSelect,
  className,
  children,
}: PillOptionProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={() => onSelect(value)}
      className={cx(styles.option, selected && styles.selected, className)}
    >
      {children}
    </button>
  );
}

export interface PillChoice {
  value: string;
  label: string;
}

export interface PillGroupProps {
  /** Accessible name for the group — usually the field label's text. */
  label: string;
  options: readonly PillChoice[];
  /** Currently selected value, or `null` for none. */
  value: string | null;
  onChange: (value: string) => void;
  columns?: 1 | 2 | 3;
  className?: string;
}

const columnsClass: Record<1 | 2 | 3, string> = {
  1: styles.columns1,
  2: styles.columns2,
  3: styles.columns3,
};

/**
 * A single-select group of pills.
 *
 * ```tsx
 * <PillGroup
 *   label="Where are you right now?"
 *   options={situationOptions}
 *   value={situation}
 *   onChange={setSituation}
 * />
 * ```
 */
export function PillGroup({
  label,
  options,
  value,
  onChange,
  columns = 2,
  className,
}: PillGroupProps) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cx(styles.group, columnsClass[columns], className)}
    >
      {options.map((option) => (
        <PillOption
          key={option.value}
          value={option.value}
          selected={value === option.value}
          onSelect={onChange}
        >
          {option.label}
        </PillOption>
      ))}
    </div>
  );
}
