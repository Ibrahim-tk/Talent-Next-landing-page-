# Gridline

**The TALENTnext design system.**

Gridline is named for the thing that holds every page together: two constant
1px vertical rules that run from the top of the sticky header to the bottom of
the footer, and the ruled "module boxes" that stack between them. The visual
language is a technical drawing — a measured plan with crosshair registration
marks, quantised meters, square actions, and a single accent — not a
conventional marketing page.

## Design principles

1. **The frame is constant.** Everything lives inside one `GridCanvas`. No
   section bleeds past the two vertical rules. Dividers are always exactly one
   hairline, never two.
2. **Actions are square, content is rounded.** A `Button` has zero border
   radius, no border, and an uppercase tracked-out label. Radius is reserved
   for *artefacts* placed on the plan: cards, thumbnails, inputs, media.
3. **One accent, used sparingly.** The page is black, white and grey. Rose
   (`--gl-rose-600`) appears on one highlighted word per section, on
   quantitative marks, and on focus rings. If more than ~10% of a viewport is
   red, pull it back.
4. **Quantise quantities.** Scores and progress are drawn as discrete ticks
   (`SegmentedMeter`, `RulerGauge`), which keeps data marks in the same idiom
   as the grid. There are no smooth gradient bars.
5. **Type is a closed set.** Sections pick a role from `Text`; they never set
   `font-size`. Adding a role is a design-system decision.
6. **Photography is always tinted.** `TintedMedia` applies the house crimson
   duotone, which unifies stock imagery from mixed sources into one palette.

## Architecture

```
src/gridline/
  tokens/
    primitives.css   Layer 1 — raw values. Never referenced by components.
    semantic.css     Layer 2 — role aliases. The ONLY layer components use.
    index.ts         Typed accessors + the few constants JS genuinely needs.
  styles/
    reset.css        Global element defaults.
  components/        One folder per component: .tsx + .module.css + index.ts
  motion/            GSAP registration, reduced-motion helpers.
  utils/cx.ts        Class-name joiner.
  index.ts           The public surface. Import from `@gridline`.
```

### The two token layers

Primitives are context-free (`--gl-rose-600`, `--gl-space-11`). Semantic
aliases give them a job (`--gl-color-accent`, `--gl-color-border-rule`).

**Components may only consume semantic aliases.** Re-theming Gridline means
re-pointing the aliases in `semantic.css` at different primitives — never
editing a component stylesheet. `--gl-color-border-rule` is the load-bearing
one: it draws the two vertical rules, every module divider, and every hairline.

Prefix is `--gl-`, following the short-prefix convention used by Carbon
(`--cds-`) and Polaris (`--p-`).

### Composite type roles

Each role in `semantic.css` bundles size, leading, weight and tracking, so a
`Text` variant is one lookup rather than four:

```css
--gl-type-display-size: var(--gl-size-display);
--gl-type-display-leading: var(--gl-leading-tight);
--gl-type-display-weight: var(--gl-weight-semibold);
--gl-type-display-tracking: var(--gl-tracking-tightest);
```

## Usage

```tsx
import { Button, GridModule, Highlight, SectionHeader, Text } from "@gridline";

<GridModule id="offer" rule="bottom" aria-labelledby="offer-heading">
  <SectionHeader
    headingId="offer-heading"
    heading="What You’ll Get."
    description="A complete, verified diagnostic dossier."
  />
  <Text variant="display" as="h1">
    Uncover the <Highlight>TALENT</Highlight> You Already Have.
  </Text>
  <Button href="#get-started" size="lg">Get started</Button>
</GridModule>
```

## Component inventory

| Component | Role |
| --- | --- |
| `GridCanvas` | The architectural frame — the two constant vertical rules |
| `GridModule` | A ruled section box; `rule` picks which edges draw a hairline |
| `SectionHeader` | Centred module header, closed by a hairline |
| `SurfaceCard` | Generic content surface; tone / border / radius / elevation / padding |
| `Text` | Every type role in the system |
| `Highlight` | One accent-coloured word inside a heading |
| `Button` | The action primitive — square, two sizes, four variants |
| `PillGroup` / `PillOption` | Single-select choice group (`role="radiogroup"`) |
| `Field` / `TextField` / `FieldRow` | Form field composition |
| `SegmentedMeter` / `MeterRow` | Quantised score marks |
| `ProgressTrack` | Continuous progress; `width` or scroll-driven `scale` mode |
| `RulerGauge` | Vertical measuring rule with an animatable accent overlay |
| `StepperTimeline` | Vertical step sequence on a dashed spine |
| `TintedMedia` / `Thumbnail` / `VideoFrame` | Media treatments |
| `Crosshair` / `CrosshairSet` / `DashedFrame` | Registration marks and framing |
| `Icon` | The closed glyph set |

### Sizing conventions

Two sizes exist wherever there are two, because the type system defines
exactly two button label roles (`actionLg` 14px, `actionMd` 12px). Don't add a
third button size without adding the corresponding type role first.

## Motion

Import GSAP from `@gridline/motion`, never from `gsap` directly — that module
is the single place plugins are registered.

```tsx
import { gsap, pinnedMediaQuery, prefersReducedMotion, useGSAP } from "@gridline/motion";
```

Rules for scroll choreography:

- **Always check `prefersReducedMotion()` first** and bail out. `reset.css`
  also neutralises CSS animation and transition durations under that query.
- **Gate pinned sections behind `pinnedMediaQuery`** using `gsap.matchMedia()`,
  so crossing the breakpoint tears the pin down rather than leaving a spacer.
- **Return `() => media.revert()`** from the `useGSAP` callback.
  `gsap.context` (which `useGSAP` wraps) reverts tweens but not a `matchMedia`
  instance.
- **Read measurements as functions** (`end: () => …`) with
  `invalidateOnRefresh: true`, so resize and font swap recompute them.
- **Offset pins by `layout.headerHeight`.** That constant mirrors
  `--gl-header-height`; ScrollTrigger cannot read a CSS custom property, so the
  two must be kept in sync manually.

## CSS Module ordering — a real constraint

Two single-class rules in different `.module.css` files have equal
specificity, and Next.js does not guarantee their insertion order. So a
consumer's class **cannot** be relied on to override a component's own class
for the same property.

Two consequences are baked into the system:

- `ProgressTrack` deliberately sets no `flex` value. A consumer that needs it
  to expand adds `flex: 1` in its own class (see the intake form footer).
- Where a consumer must control a component's box, it wraps it rather than
  passing a `className` that fights it — as `ArchetypeCard` does around
  `TintedMedia`.

When you need to size a component from outside, wrap it.

## Palette provenance and known inconsistencies

The palette was extracted verbatim from the production `css/v4.css`
stylesheet, so this build is pixel-identical to the static site it replaces.
The Figma file (`Talent-Next-Website`, node `165-4571`) requires a login and
could not be read directly — if it disagrees with these values, Figma wins and
`primitives.css` is the one file to change.

Two inherited inconsistencies were preserved rather than silently "fixed",
and both are worth a design decision:

1. **Two reds.** The accent is `#E11D48` (rose-600), but meter fills and
   timeline markers use `#E11D2E` (`--gl-signal-600`), a warmer red. They are
   aliased separately as `--gl-color-accent` and `--gl-color-data-fill`.
   Unifying them is a one-line change in `semantic.css`.
2. **Near-duplicate greys.** The source used pairs of visually
   indistinguishable greys for distinct roles — `#ECECEF`/`#F0F0F3`/`#EFEFEF`
   for hairlines, `#E5E7EB`/`#E2E8F0` for track fills. They survive as
   half-steps (`--gl-neutral-225`, `--gl-neutral-250`) with their origin
   annotated. Collapsing each pair would shrink the ramp with no visible
   difference.

The neutral ramp also mixes Tailwind `zinc` and `gray` values, which is why a
few steps are 25/50 apart rather than 100.
