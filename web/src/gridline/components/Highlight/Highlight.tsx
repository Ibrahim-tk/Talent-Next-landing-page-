import type { ReactNode } from "react";

import { cx } from "../../utils/cx";
import styles from "./Highlight.module.css";

export interface HighlightProps {
  className?: string;
  children: ReactNode;
}

/**
 * Marks one word or phrase in the accent colour.
 *
 * ```tsx
 * <Text variant="display">
 *   Uncover the <Highlight>TALENT</Highlight> You Already Have.
 * </Text>
 * ```
 */
export function Highlight({ className, children }: HighlightProps) {
  return <span className={cx(styles.root, className)}>{children}</span>;
}
