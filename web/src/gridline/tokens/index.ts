/**
 * GRIDLINE — token accessors for TypeScript.
 *
 * CSS remains the single source of truth for token *values* (see
 * `primitives.css` / `semantic.css`). This module exposes:
 *
 *  1. `token()` — a typed way to reference a semantic token from inline
 *     styles or a `style` prop without hand-writing `var(--gl-…)`.
 *  2. `layout` — the handful of numeric constants the GSAP scroll
 *     choreography genuinely needs in JS (ScrollTrigger offsets cannot read
 *     a CSS custom property).
 *
 * Anything that can be expressed in CSS should be, so this file stays small
 * on purpose.
 */

/** Semantic colour tokens available to components. */
export const colorTokens = [
  "surface-canvas",
  "surface-raised",
  "surface-hover",
  "surface-sunken",
  "surface-muted",
  "surface-inverse",
  "surface-letterbox",
  "surface-accent-soft",
  "surface-success",
  "border-rule",
  "border-subtle",
  "border-elevated",
  "border-interactive",
  "border-strong",
  "border-selected",
  "text-primary",
  "text-heading",
  "text-secondary",
  "text-body",
  "text-muted",
  "text-metric",
  "text-inverse",
  "text-accent",
  "text-decoration",
  "text-success",
  "accent",
  "accent-hover",
  "data-fill",
  "data-track",
  "data-inert",
] as const;

export type ColorToken = (typeof colorTokens)[number];

/** `color("accent")` → `"var(--gl-color-accent)"` */
export function color(name: ColorToken): string {
  return `var(--gl-color-${name})`;
}

/** `space(11)` → `"var(--gl-space-11)"` */
export function space(step: number): string {
  return `var(--gl-space-${step})`;
}

/**
 * Numeric layout constants mirrored from `primitives.css`.
 *
 * `headerHeight` MUST stay in sync with `--gl-header-height`: the pinned
 * scroll sections offset their ScrollTrigger start by exactly this value so
 * they come to rest flush beneath the sticky header.
 */
export const layout = {
  /** Sticky header height in px — mirrors `--gl-header-height`. */
  headerHeight: 78,
  /** Below this width the pinned/horizontal scroll choreography is disabled. */
  pinnedMinWidth: 769,
} as const;

/** Media query used by every pinned GSAP section. */
export const pinnedMediaQuery = `(min-width: ${layout.pinnedMinWidth}px)`;
