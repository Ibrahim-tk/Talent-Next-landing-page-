import type { ReactNode } from "react";

/**
 * GRIDLINE — Icon
 *
 * A closed set of 1.5–2px stroked glyphs drawn on a 24px grid. Icons inherit
 * `currentColor` so they take their colour from the surrounding text or
 * button variant.
 *
 * Adding a glyph is a design-system change: extend `iconPaths` rather than
 * inlining an `<svg>` in a section component.
 */
export type IconName =
  | "menu"
  | "close"
  | "arrowRight"
  | "arrowLeft"
  | "book"
  | "clock"
  | "star"
  | "check";

export interface IconProps {
  name: IconName;
  /** Rendered square, in px. Defaults to 16. */
  size?: number;
  strokeWidth?: number;
  className?: string;
  /** Provide only when the icon carries meaning on its own. */
  title?: string;
}

const iconPaths: Record<IconName, ReactNode> = {
  menu: (
    <>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </>
  ),
  close: (
    <>
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </>
  ),
  arrowRight: (
    <>
      <line x1="4" y1="12" x2="20" y2="12" />
      <polyline points="14 6 20 12 14 18" />
    </>
  ),
  arrowLeft: (
    <>
      <line x1="20" y1="12" x2="4" y2="12" />
      <polyline points="10 6 4 12 10 18" />
    </>
  ),
  book: (
    <>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </>
  ),
  star: (
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  ),
  check: <polyline points="20 6 9 17 4 12" />,
};

export function Icon({
  name,
  size = 16,
  strokeWidth = 2,
  className,
  title,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {iconPaths[name]}
    </svg>
  );
}
