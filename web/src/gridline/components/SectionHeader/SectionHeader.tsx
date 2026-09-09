import type { ReactNode } from "react";

import { cx } from "../../utils/cx";
import { Text } from "../Text/Text";
import styles from "./SectionHeader.module.css";

export interface SectionHeaderProps {
  heading: ReactNode;
  description?: ReactNode;
  /** Id applied to the heading so the module can reference it via aria-labelledby. */
  headingId?: string;
  /** Suppress the closing hairline. */
  rule?: boolean;
  className?: string;
}

/**
 * The standard **centred** module header, set in the `headingLg` role. Not
 * every headline uses it — the hero, the archetype band, and the interview
 * statement are deliberately larger and left-aligned (`display` /
 * `editorial` / `editorialTight`), so they compose their own header block
 * directly rather than forcing that treatment through this component.
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
  rule = true,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cx(styles.root, !rule && styles.noRule, className)}>
      <Text variant="headingLg" id={headingId} className={styles.heading}>
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
