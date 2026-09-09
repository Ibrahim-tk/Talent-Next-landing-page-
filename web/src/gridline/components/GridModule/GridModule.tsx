import type { ElementType, ReactNode } from "react";

import { cx } from "../../utils/cx";
import styles from "./GridModule.module.css";

/** Which edges of the module draw a hairline rule. */
export type GridModuleRule = "bottom" | "top" | "block" | "none";

export interface GridModuleProps {
  /** Defaults to `section`. */
  as?: ElementType;
  rule?: GridModuleRule;
  /** Clip overflow — required for modules with full-bleed visuals. */
  clip?: boolean;
  /** Use the sunken surface instead of the canvas white. */
  sunken?: boolean;
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  className?: string;
  children: ReactNode;
}

const ruleClass: Record<GridModuleRule, string | undefined> = {
  bottom: styles.ruleBottom,
  top: styles.ruleTop,
  block: styles.ruleBlock,
  none: undefined,
};

/**
 * A ruled section box on the GridCanvas.
 *
 * ```tsx
 * <GridModule id="what-youll-get" rule="bottom" aria-label="Deliverables">
 *   …
 * </GridModule>
 * ```
 */
export function GridModule({
  as: Component = "section",
  rule = "bottom",
  clip = false,
  sunken = false,
  className,
  children,
  ...rest
}: GridModuleProps) {
  return (
    <Component
      className={cx(
        styles.root,
        ruleClass[rule],
        clip && styles.clip,
        sunken && styles.sunken,
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
