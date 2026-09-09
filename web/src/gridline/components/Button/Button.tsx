import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import { cx } from "../../utils/cx";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "accent";

/**
 * Two sizes only — they map 1:1 onto the two button label type roles the
 * system defines (`actionLg` at 14px, `actionMd` at 12px).
 */
export type ButtonSize = "md" | "lg";

interface ButtonOwnProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Stretch to fill the parent. */
  fullWidth?: boolean;
  /** Glyph rendered before the label (e.g. a back arrow). */
  iconBefore?: ReactNode;
  /** Glyph rendered after the label (e.g. a forward arrow). */
  iconAfter?: ReactNode;
  className?: string;
  children?: ReactNode;
}

type ButtonAsButton = ButtonOwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonOwnProps> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonOwnProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonOwnProps> & {
    /** Renders an anchor (via next/link) instead of a button. */
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClass: Record<ButtonVariant, string> = {
  primary: styles.variantPrimary,
  secondary: styles.variantSecondary,
  ghost: styles.variantGhost,
  accent: styles.variantAccent,
};

const sizeClass: Record<ButtonSize, string> = {
  md: styles.sizeMd,
  lg: styles.sizeLg,
};

/**
 * The single action primitive.
 *
 * ```tsx
 * <Button href="#get-started" size="lg">Get started</Button>
 * <Button variant="secondary" size="md" iconBefore={<Icon name="arrowLeft" />} onClick={back}>
 *   Previous
 * </Button>
 * ```
 */
export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    fullWidth = false,
    iconBefore,
    iconAfter,
    className,
    children,
    ...rest
  } = props;

  const classes = cx(
    styles.root,
    variantClass[variant],
    sizeClass[size],
    fullWidth && styles.fullWidth,
    className,
  );

  const content = (
    <>
      {iconBefore ? (
        <span className={styles.affix} aria-hidden="true">
          {iconBefore}
        </span>
      ) : null}
      {children}
      {iconAfter ? (
        <span className={styles.affix} aria-hidden="true">
          {iconAfter}
        </span>
      ) : null}
    </>
  );

  if (typeof rest.href === "string") {
    const { href, ...anchorProps } =
      rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

    return (
      <Link href={href} className={classes} {...anchorProps}>
        {content}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } =
    rest as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button type={type} className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
