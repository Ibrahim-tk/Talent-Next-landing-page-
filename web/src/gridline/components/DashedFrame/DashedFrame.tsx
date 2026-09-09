import type { ReactNode } from "react";

import { cx } from "../../utils/cx";
import { CrosshairSet } from "../Crosshair/Crosshair";
import styles from "./DashedFrame.module.css";

export interface DashedFrameProps {
  className?: string;
  children: ReactNode;
}

/**
 * Stages a single primary action inside a dashed, crosshaired enclosure.
 *
 * ```tsx
 * <DashedFrame>
 *   <Button href="#get-started" size="lg">Get started</Button>
 * </DashedFrame>
 * ```
 */
export function DashedFrame({ className, children }: DashedFrameProps) {
  return (
    <div className={cx(styles.root, className)}>
      <CrosshairSet placement="outset" />
      {children}
    </div>
  );
}
