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
6. **Photography is tinted by default.** `TintedMedia` applies the house
   crimson duotone, which unifies stock imagery from mixed sources into one
   palette. Pass `tint={false}` for commissioned or curated photography —
   the archetype cards do, now that their six portraits are a deliberate
   set rather than assorted stock: there is nothing left to unify, and the
   tint only stands between the viewer and the photograph.

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

### Typeface

One face everywhere: **Helvetica Neue Light**. It is a platform font rather
than a hosted one, so it is declared as a stack in `primitives.css` and the
app downloads no webfont at all — the earlier Plus Jakarta Sans / Geist Mono /
Space Mono / Outfit imports are gone, and the `--gl-font-mono` and
`--gl-font-accent-mono` aliases survive as token names but resolve to the same
family. Light is reached with `font-weight: 300`, which maps to the real
Helvetica Neue Light cut on Apple platforms; Windows and Linux fall through to
Helvetica/Arial and render Regular, since neither ships a Light cut.

### Type scale

One modular scale — 1rem (16px) base, 1.25 ratio — and every size in the
system is a step on it:

| step | rem         | px     | role         |
| ---- | ----------- | ------ | ------------ |
| +11  | `11.6415rem`| 186.26 | hero accent  |
| +10  | `9.3132rem` | 149.01 |              |
| +9   | `7.4506rem` | 119.21 |              |
| +8   | `5.9605rem` | 95.37  |              |
| +7   | `4.7684rem` | 76.29  |              |
| +6   | `3.8147rem` | 61.04  | `h1`         |
| +5   | `3.0518rem` | 48.83  | `h2`         |
| +4   | `2.4414rem` | 39.06  | `h3`         |
| +3   | `1.9531rem` | 31.25  | `h4`         |
| +2   | `1.5625rem` | 25.00  | `h5`         |
| +1   | `1.25rem`   | 20.00  | `h6`         |
| 0    | `1rem`      | 16.00  | `p`          |
| −1   | `0.8rem`    | 12.80  | `small`      |
| −2   | `0.64rem`   | 10.24  | footnote     |

Fluid roles `clamp()` between two steps, so a heading is never off-scale at
any viewport width — only which step it has reached changes. The five steps
above `h1` exist solely because the hero headline runs past `h1`; they are the
same ratio carried further, not a second scale.

This is also how a request like "make the hero headline 1.5x" gets answered:
1.5 is not a power of 1.25, so it would land between steps. Two steps up is
1.5625x — within 4% of the ask, and still on the scale. Round to the ratio,
never to the number.

Where a setting genuinely has to sit between rungs, multiply the step rather
than replacing it: the hero headline carries a `--hero-type-trim` factor on
its own class, applied with `calc()` to both clamp bounds and the `vw` term.
The size still says which rung it came from, and the deviation is one number
to retune. That is the escape hatch, not the norm — a role in `semantic.css`
never does this.

### Composite type roles

Each role in `semantic.css` bundles size, leading, weight and tracking, so a
`Text` variant is one lookup rather than four:

```css
--gl-type-display-size: var(--gl-size-display);
--gl-type-display-leading: var(--gl-leading-tight);
--gl-type-display-weight: var(--gl-weight-light);
--gl-type-display-tracking: var(--gl-tracking-tightest);
```

Weight is close to a constant: everything at 16px and above is Light (300).
Below 16px the system holds at Regular (400) — `bodySm`, `caption`, `kicker`,
`actionLg`, `actionMd`, `metric`. That is a legibility floor rather than a
hierarchy device: at 12.8px and 10.24px a 300 weight leaves too little ink to
survive antialiasing, and those roles are also the ones most likely to be
uppercase and tracked out, which thins them further.

### Making hierarchy work at one weight

With weight held constant, three other things have to carry it, and all three
are tuned for Light rather than inherited from the semibold system that came
before:

1. **Size.** The h6 step (20px) is the heading tier's floor and belongs to it
   alone. `bodyLg` sits a full ratio step below at 16px, so the smallest
   heading and the largest body never meet — that gap is what makes the two
   tiers read as different kinds of thing.
2. **Colour.** Three prose tiers, all darkened for Light and all clearing 7:1
   on white: near-black (`--gl-color-text-primary` / `-heading`) for headings,
   `-secondary` at 10.4:1 or `-body` at 7.9:1 for prose, `-muted` at 7.5:1 for
   captions. A grey that measured fine at semibold reads washed out at 300
   even though its contrast ratio has not moved, so these are deliberately
   darker than a heavier system would need.
3. **Leading.** Tight at display sizes, generous in body copy.

Negative tracking is the trap here, and the system no longer takes it:
**every heading tracks at 0**, in the `Text` roles, in the bare `h1`–`h6`
defaults, and in the hero's own headline spans. Tightening was fighting the
face — Helvetica Neue Light already has open counters and close sidebearings,
so pulling the letters together read as cramped rather than as crisp, most
visibly on the long headline settings this site is built around. An earlier
ramp ran to -0.035em (tuned for semibold), then to -0.02em; both were
wrong in kind rather than in degree. The negative steps stay in
`primitives.css` as an unused part of the ramp so one alias can bring
tightening back if a setting ever wants it. Positive tracking on uppercase
marks is untouched, since letter-spacing genuinely helps there.

`Text`'s `weight` prop remains the escape hatch when one piece of copy
genuinely needs more ink.

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
| `SectionHeader` | Centred module header, closed by a hairline; `headingVariant` raises it from `headingLg` to a larger heading role |
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
