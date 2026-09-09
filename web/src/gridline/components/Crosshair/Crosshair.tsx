import { cx } from "../../utils/cx";
import styles from "./Crosshair.module.css";

export type CrosshairCorner =
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight";

/**
 * `inset` marks a module corner from inside; `outset` straddles the corner of
 * a framed element (see `DashedFrame`).
 */
export type CrosshairPlacement = "inset" | "outset";

export interface CrosshairProps {
  corner: CrosshairCorner;
  placement?: CrosshairPlacement;
  className?: string;
}

const insetClass: Record<CrosshairCorner, string> = {
  topLeft: styles.insetTopLeft,
  topRight: styles.insetTopRight,
  bottomLeft: styles.insetBottomLeft,
  bottomRight: styles.insetBottomRight,
};

const outsetClass: Record<CrosshairCorner, string> = {
  topLeft: styles.outsetTopLeft,
  topRight: styles.outsetTopRight,
  bottomLeft: styles.outsetBottomLeft,
  bottomRight: styles.outsetBottomRight,
};

/**
 * A decorative registration mark. The host element must be positioned.
 *
 * ```tsx
 * <Crosshair corner="topLeft" />
 * <Crosshair corner="bottomRight" placement="outset" />
 * ```
 */
export function Crosshair({
  corner,
  placement = "inset",
  className,
}: CrosshairProps) {
  const positionClass =
    placement === "inset" ? insetClass[corner] : outsetClass[corner];
  const scaleClass =
    placement === "inset" ? styles.scaleModule : styles.scaleFrame;

  return (
    <span
      className={cx(styles.root, scaleClass, positionClass, className)}
      aria-hidden="true"
    >
      +
    </span>
  );
}

/** All four corners at once — the common case for a framed element. */
export function CrosshairSet({
  placement = "outset",
}: {
  placement?: CrosshairPlacement;
}) {
  return (
    <>
      <Crosshair corner="topLeft" placement={placement} />
      <Crosshair corner="topRight" placement={placement} />
      <Crosshair corner="bottomLeft" placement={placement} />
      <Crosshair corner="bottomRight" placement={placement} />
    </>
  );
}
