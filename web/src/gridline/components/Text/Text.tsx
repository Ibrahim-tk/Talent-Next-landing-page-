import type { ElementType, ReactNode } from "react";

import { cx } from "../../utils/cx";
import styles from "./Text.module.css";

/**
 * Every type role Gridline permits. Adding a role here is a design-system
 * decision — sections are not allowed to invent one-off sizes.
 */
export type TextVariant =
  | "display"
  | "editorial"
  | "editorialTight"
  | "monoDisplay"
  | "headingLg"
  | "headingSm"
  | "monoHeading"
  | "headingMd"
  | "title"
  | "bodyLg"
  | "bodyMd"
  | "bodySm"
  | "caption"
  | "label"
  | "kicker"
  | "metric"
  | "metricLabel"
  | "actionLg"
  | "actionMd"
  | "eyebrow";

export type TextTone =
  | "primary"
  | "heading"
  | "secondary"
  | "body"
  | "muted"
  | "accent"
  | "inverse"
  | "inverseSecondary"
  | "success"
  | "inherit";

export type TextAlign = "start" | "center" | "end";

export type TextWeight = "regular" | "medium" | "semibold" | "bold";

export type TextMeasure = "narrow" | "medium" | "wide" | "prose";

export interface TextProps {
  /** The type role to render at. */
  variant: TextVariant;
  /**
   * Element to render. Defaults to a sensible tag per variant (see
   * `defaultElementFor`) so headings stay semantic without extra props.
   */
  as?: ElementType;
  tone?: TextTone;
  align?: TextAlign;
  /** Promote or demote weight without leaving the role. */
  weight?: TextWeight;
  /** Cap the line length. */
  measure?: TextMeasure;
  className?: string;
  id?: string;
  htmlFor?: string;
  children?: ReactNode;
}

const variantClass: Record<TextVariant, string> = {
  display: styles.display,
  editorial: styles.editorial,
  editorialTight: styles.editorialTight,
  monoDisplay: styles.monoDisplay,
  headingLg: styles.headingLg,
  headingSm: styles.headingSm,
  monoHeading: styles.monoHeading,
  headingMd: styles.headingMd,
  title: styles.title,
  bodyLg: styles.bodyLg,
  bodyMd: styles.bodyMd,
  bodySm: styles.bodySm,
  caption: styles.caption,
  label: styles.label,
  kicker: styles.kicker,
  metric: styles.metric,
  metricLabel: styles.metricLabel,
  actionLg: styles.actionLg,
  actionMd: styles.actionMd,
  eyebrow: styles.eyebrow,
};

const toneClass: Record<TextTone, string> = {
  primary: styles.tonePrimary,
  heading: styles.toneHeading,
  secondary: styles.toneSecondary,
  body: styles.toneBody,
  muted: styles.toneMuted,
  accent: styles.toneAccent,
  inverse: styles.toneInverse,
  inverseSecondary: styles.toneInverseSecondary,
  success: styles.toneSuccess,
  inherit: styles.toneInherit,
};

const alignClass: Record<TextAlign, string> = {
  start: styles.alignStart,
  center: styles.alignCenter,
  end: styles.alignEnd,
};

const weightClass: Record<TextWeight, string> = {
  regular: styles.weightRegular,
  medium: styles.weightMedium,
  semibold: styles.weightSemibold,
  bold: styles.weightBold,
};

const measureClass: Record<TextMeasure, string> = {
  narrow: styles.measureNarrow,
  medium: styles.measureMedium,
  wide: styles.measureWide,
  prose: styles.measureProse,
};

/**
 * Default host element per role, so `<Text variant="headingLg">` produces an
 * `<h2>` rather than a `<div>` that needs an explicit `as`.
 */
function defaultElementFor(variant: TextVariant): ElementType {
  switch (variant) {
    case "display":
    case "editorial":
    case "editorialTight":
    case "monoDisplay":
      return "h1";
    case "headingLg":
      return "h2";
    case "headingSm":
    case "monoHeading":
    case "headingMd":
    case "title":
      return "h3";
    case "bodyLg":
    case "bodyMd":
    case "bodySm":
    case "caption":
      return "p";
    case "label":
      return "label";
    case "kicker":
    case "eyebrow":
    case "metric":
    case "metricLabel":
    case "actionLg":
    case "actionMd":
      return "span";
    default:
      return "p";
  }
}

/**
 * Text is the only sanctioned way to render type in Gridline.
 *
 * ```tsx
 * <Text variant="headingLg">What You'll Get.</Text>
 * <Text variant="bodyMd" tone="muted" measure="medium">…</Text>
 * <Text variant="display" as="h1" align="center">…</Text>
 * ```
 */
export function Text({
  variant,
  as,
  tone,
  align,
  weight,
  measure,
  className,
  children,
  ...rest
}: TextProps) {
  const Component = as ?? defaultElementFor(variant);

  return (
    <Component
      className={cx(
        styles.root,
        variantClass[variant],
        tone && toneClass[tone],
        align && alignClass[align],
        weight && weightClass[weight],
        measure && measureClass[measure],
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
