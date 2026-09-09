import type { ReactNode } from "react";

import { cx } from "../../utils/cx";
import styles from "./GridCanvas.module.css";

export interface GridCanvasProps {
  className?: string;
  children: ReactNode;
}

/**
 * The architectural frame: a max-width column bounded by the two constant
 * vertical rules. Wrap the entire page in one of these.
 */
export function GridCanvas({ className, children }: GridCanvasProps) {
  return <div className={cx(styles.root, className)}>{children}</div>;
}
