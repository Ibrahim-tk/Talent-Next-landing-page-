import type { ReactNode } from "react";

import { cx } from "../../utils/cx";
import { Text } from "../Text/Text";
import type { TextVariant } from "../Text/Text";
import styles from "./SectionHeader.module.css";

/**
 * The heading roles this header may be set in — `headingLg` (the default)
 * plus the three larger heading roles, for a section that wants its header
 * to carry more weight than a standard module's. Deliberately a subset of
 * `TextVariant`: a section can reach for a bigger role, but not for a body
 * or label role, and not for a one-off size of its own.
 */
export type SectionHeaderVariant = Extract<
  TextVariant,
  "headingLg" | "editorialTight" | "editorial" | "display"
>;

export interface SectionHeaderProps {
  heading: ReactNode;
  description?: ReactNode;
  /** Id applied to the heading so the module can reference it via aria-labelledby. */
  headingId?: string;
  /**
   * Type role for the heading. Defaults to `headingLg`, the standard module
   * measure; the larger roles top out at the scale's h1 (`display`) for a
   * section meant to read as a headline rather than a section label. The
   * rendered element stays an `<h2>` whichever role is picked — this is a
   * *size* choice, not a change of heading level (`display` on its own
   * would default to `<h1>`, which belongs to the page, not to a module).
   */
  headingVariant?: SectionHeaderVariant;
  /** Suppress the closing hairline. */
  rule?: boolean;
  className?: string;
}

/**
 * The standard **centred** module header, set in the `headingLg` role by
 * default and optionally in one of the larger heading roles via
 * `headingVariant`. Not every headline uses it — the hero, the archetype
 * band, and the interview statement are deliberately larger and
 * left-aligned, so they compose their own header block directly rather than
 * forcing this component's centred treatment on themselves.
 *
 * ```tsx
 * <SectionHeader
 *   heading="What You’ll Get."
 *   description="A complete, verified diagnostic dossier…"
 * />
 * ```
 */
export function SectionHeader({
  heading,
  description,
  headingId,
  headingVariant = "headingLg",
  rule = true,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cx(styles.root, !rule && styles.noRule, className)}>
      <Text
        variant={headingVariant}
        as="h2"
        id={headingId}
        className={styles.heading}
      >
        {heading}
      </Text>
      {description ? (
        <Text variant="bodyLg" className={styles.description}>
          {description}
        </Text>
      ) : null}
    </div>
  );
}
