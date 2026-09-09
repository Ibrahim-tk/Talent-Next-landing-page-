# TALENTnext — Next.js site

The TALENTnext landing page, rebuilt from the static `index.html` +
`css/v4.css` in the repository root as a component-based Next.js App Router
app on the **[Gridline](./src/gridline/README.md)** design system.

The original static site is untouched and still lives at the repo root.

## Prerequisites

Node.js **18.18+** (20 LTS or newer recommended). It is not currently
installed on this machine — `nvm install --lts` or `brew install node` first.

## Getting started

```bash
cd web
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint (next/core-web-vitals + next/typescript)
npm run typecheck  # tsc --noEmit
```

## Layout

```
web/
  public/                 img/ assets/ video/ — copied from the repo root
  src/
    app/
      layout.tsx          fonts, metadata, stylesheet order
      page.tsx            the page — a list of sections, in reading order
      globals.css         page-scoped globals (skip link)
    gridline/             THE DESIGN SYSTEM — see its own README
    components/
      layout/             SiteHeader, SiteFooter
      sections/           one folder per page section
    content/              all copy and data, as typed modules
```

### Three layers, strictly separated

- **`src/gridline`** — the design system. Knows nothing about TALENTnext's
  content. Every token, primitive and pattern lives here.
- **`src/components`** — composition. Sections arrange Gridline components and
  own their own layout CSS. No section defines a colour or a font size.
- **`src/content`** — data. Every string on the page is here, typed. Adding an
  archetype or a form option is a data edit; the components map over it.

`page.tsx` is deliberately just a list. Re-ordering the page is re-ordering
that list.

## Path aliases

| Alias | Resolves to |
| --- | --- |
| `@gridline` | `src/gridline/index.ts` — the design system's public surface |
| `@gridline/*` | `src/gridline/*` — e.g. `@gridline/motion` |
| `@/*` | `src/*` |

## Notes on the conversion

**What was ported faithfully.** Every section, all copy, the full token
palette, and all four GSAP scroll behaviours: the hero card spread, the pinned
horizontal archetype track, the pinned interview wipe/ruler/copy sequence, and
the ambient card float loops.

**What changed, and why.**

- **The three GSAP timelines are now data-driven.** The interview sequence was
  three hand-tuned copies of the same offsets; it is now derived from
  `interviewStages.length` (see the `OFFSET` table in `InterviewSection.tsx`),
  so adding a fourth stage needs no timeline edit.
- **Pinned sections use `gsap.matchMedia()`** with an explicit
  `media.revert()` cleanup, rather than the deprecated
  `ScrollTrigger.matchMedia`. This also means crossing the breakpoint tears
  the pin down instead of leaving a stale spacer.
- **`prefers-reduced-motion` is now respected.** Every GSAP hook bails out
  under that query, and the reset neutralises CSS animation.
- **The intake form is real React state.** The original toggled
  `style.display` and carried `novalidate`; steps are now conditionally
  rendered, earlier answers travel with the submission as hidden inputs, and
  the browser's own validation runs on submit. It still confirms locally —
  there is a `TODO` in `IntakeForm.tsx` marking where the endpoint goes.
- **The mobile menu button now works.** It rendered in the static page but had
  no handler; it opens a drawer that closes on navigation.
- **Accessibility.** Added a skip link, `aria-labelledby` on every section,
  `role="radiogroup"`/`role="radio"` on the pill choices, `role="meter"` on
  score bars, and the footer moved out of `<main>` (it was nested inside).
- **Repeated markup is generated.** The 202 hand-written `<span class="ruler-tick">`
  elements and 60 meter segments are now loops.
- **The doubled edge rule is gone.** The two pinned sections drew borders on
  all four sides while sitting inside the canvas, which already draws the left
  and right rules — a 2px seam at both edges. They now draw top and bottom
  only.
- **Images go through `next/image`.** SVG optimization is enabled in
  `next.config.ts` for the wordmark, with the documented CSP mitigation.

**Not yet resolved.**

- The palette came from `css/v4.css`, not from Figma — the Figma file requires
  a login and returned 403. If it disagrees, `src/gridline/tokens/primitives.css`
  is the single file to change.
- The archetype and interview photography is still hot-linked from Unsplash
  (allow-listed in `next.config.ts`). These should become owned assets.
- `see-it-in-action` previously played a third-party GitHub-hosted MP4 ahead of
  the local files; that source was dropped, so it now plays
  `public/video/agent-loop.mp4`.
- `assets/strenght-card.png` keeps its original misspelled filename.
