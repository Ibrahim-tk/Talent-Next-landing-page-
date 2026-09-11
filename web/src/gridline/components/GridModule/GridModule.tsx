import type { ElementType, Ref, ReactNode } from "react";

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
  /**
   * Forwarded to the host element. Declared here rather than left to the
   * `...rest` spread because a caller that needs to measure the module — a
   * hero whose art has to know where the canvas rules are, say — should not
   * have to reach for `getElementById` or `closest()` to find a box this
   * component already owns.
   *
   * React 19 passes `ref` as an ordinary prop to function components, so
   * there is no `forwardRef` wrapper involved; this type is the whole of
   * the change.
   */
  ref?: Ref<HTMLElement>;
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
