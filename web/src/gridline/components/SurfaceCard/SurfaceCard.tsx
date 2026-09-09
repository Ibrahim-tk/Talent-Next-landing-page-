import type { ElementType, ReactNode } from "react";

import { cx } from "../../utils/cx";
import styles from "./SurfaceCard.module.css";

export type SurfaceTone = "raised" | "sunken" | "canvas" | "none";
export type SurfaceBorder = "rule" | "elevated" | "none";
export type SurfaceRadius = "none" | "md" | "lg" | "xl";
export type SurfaceElevation = "none" | "xs" | "sm" | "lg";
export type SurfacePadding = "none" | "sm" | "md" | "lg" | "xl";

export interface SurfaceCardProps {
  as?: ElementType;
  tone?: SurfaceTone;
  border?: SurfaceBorder;
  radius?: SurfaceRadius;
  elevation?: SurfaceElevation;
  padding?: SurfacePadding;
  /** Clip children to the radius — needed when a card contains media. */
  clip?: boolean;
  /** Apply the standard hover wash. */
  interactive?: boolean;
  id?: string;
  className?: string;
  children: ReactNode;
}

const toneClass: Record<SurfaceTone, string> = {
  raised: styles.toneRaised,
  sunken: styles.toneSunken,
  canvas: styles.toneCanvas,
  none: styles.toneNone,
};

const borderClass: Record<SurfaceBorder, string> = {
  rule: styles.borderRule,
  elevated: styles.borderElevated,
  none: styles.borderNone,
};

const radiusClass: Record<SurfaceRadius, string> = {
  none: styles.radiusNone,
  md: styles.radiusMd,
  lg: styles.radiusLg,
  xl: styles.radiusXl,
};

const elevationClass: Record<SurfaceElevation, string> = {
  none: styles.elevationNone,
  xs: styles.elevationXs,
  sm: styles.elevationSm,
  lg: styles.elevationLg,
};

const paddingClass: Record<SurfacePadding, string> = {
  none: styles.paddingNone,
  sm: styles.paddingSm,
  md: styles.paddingMd,
  lg: styles.paddingLg,
  xl: styles.paddingXl,
};

/**
 * ```tsx
 * <SurfaceCard radius="xl" border="elevated" elevation="sm" padding="lg">
 *   …
 * </SurfaceCard>
 * ```
 */
export function SurfaceCard({
  as: Component = "div",
  tone = "raised",
  border = "rule",
  radius = "md",
  elevation = "none",
  padding = "none",
  clip = false,
  interactive = false,
  className,
  children,
  ...rest
}: SurfaceCardProps) {
  return (
    <Component
      className={cx(
        styles.root,
        toneClass[tone],
        borderClass[border],
        radiusClass[radius],
        elevationClass[elevation],
        paddingClass[padding],
        clip && styles.clip,
        interactive && styles.interactive,
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
