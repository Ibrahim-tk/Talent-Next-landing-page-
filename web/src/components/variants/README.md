# Landing page variations

`v1/`, `v2/` and `v3/` are three alternative heroes for the landing page,
served at `/v1`, `/v2` and `/v3`. Each page is the live homepage with its
hero swapped out — nothing else about it changes.

## What is isolated

The hero, and only the hero. Each variation owns `v<n>/hero/` (the section,
its CSS module, and whatever extra components that hero needs) plus its copy
in `content/variants/v<n>/hero.ts`. A component in `v2/hero/` imports only
from `@/content/variants/v2/hero` and its own sibling files, so an edit to one
variation's hero cannot reach the homepage or the other two. CSS modules hash
per file, so duplicated class names never collide either.

## Two versions of "It Starts with 30 Minutes."

This section is the one place where the four pages do not all render the
same component — but note that **neither version is a private copy**. Both
live in `components/sections/` and both read their words from the same
`howItWorksCopy`, so they are alternative *layouts* of identical content:

| | component | rendered by |
| --- | --- | --- |
| Step list beside one still | `sections/howItWorks/` | `/` and `/v2` |
| Three-panel matrix | `sections/howItWorksMatrix/` | `/v1` and `/v3` |

Changing a step's wording in `content/howItWorks.ts` therefore reaches all
four pages; only the arrangement differs. Changing a *layout* reaches the
two pages that render it.

The step-list version began as a private copy under `variants/v2/`, which
is the escape hatch described under "Making changes" below. When the
homepage adopted it, it was promoted into `components/sections/` and the
copy deleted rather than left to drift — which is the move to repeat if a
variation's experiment ever graduates again.

## What is shared

Everything else: all six sections below the hero, imported straight from
`components/sections/` and reading the same copy from `src/content/` as the
live homepage — plus the site header, the site footer, `content/site.ts` and
the whole `gridline` design system.

**The homepage is the source of truth for every non-hero section.** A change
to one of them changes all four pages at once, and that is the point.

This replaced an earlier arrangement in which each variation held a private
copy of all seven sections. The copies drifted almost immediately:
improvements to the homepage's deliverables band and intake form never
reached the variations, so `/v1`–`/v3` were quietly serving stale versions of
sections nobody had set out to vary, and every homepage fix silently became
four fixes. Sharing the components removes that whole class of problem.

## Making changes

- **A different hero** — edit that variation's own `hero/` folder. Blast
  radius is the one page.
- **Anything else** — edit the shared section under `components/sections/`,
  and expect it on the homepage too, because it is the same component. If a
  variation genuinely needs its own version of a lower section, copy that
  section into the variation's folder and repoint its `app/<v>/page.tsx`
  import — the same way the heroes are set up. Do that deliberately, not by
  default: an unnecessary copy is what the old arrangement was.

## Adding or dropping a section

Section order lives in `app/<v>/page.tsx` — that file is the page's outline.
Re-ordering the JSX re-orders the page; deleting a line drops the section.
