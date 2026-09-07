# Impeccable Design Skill Suite (v4.1.3)

> **Status:** Installed & Active in `.agents/skills/impeccable/` and `~/.gemini/config/skills/impeccable/`
> **Author:** Paul Bakaus ([github.com/pbakaus/impeccable](https://github.com/pbakaus/impeccable))

---

## 1. What is Impeccable?

**Impeccable** is an autonomous design intelligence skill system built for AI coding agents. It prevents generic "AI slop" and enforces award-winning design craft, visual hierarchy, production-grade typography, accessible contrast, and deterministic design principles across frontend interfaces.

### Core Philosophy
- **Anti-Generic / Anti-AI Slop:** Enforces strict bans on cliché AI tropes (cheesy gradients, fake webcam widgets, cards-inside-cards, generic purple glows).
- **Production-Grade Craft:** Impeccable treats interface design like an award-winning design director: crisp modular typography, deliberate white space, tactile box models, and human emotional resonance.
- **Strict Quality Floor:** Zero tolerance for sloppy alignment, uncalibrated padding, or inaccessible contrast ratios.

---

## 2. Available Commands & Playbooks

| Command | Category | Description | Purpose |
|---|---|---|---|
| `shape [feature]` | **Build** | Plan UX/UI architecture before writing code | Maps user mental models, information architecture, and core components. |
| `init` | **Build** | Capture durable product context in `PRODUCT.md` | Establishes the project's brand voice, target audience, and constraints. |
| `document` | **Build** | Generate `DESIGN.md` from existing code | Reverse-engineers design tokens, type scales, and component catalogs. |
| `extract [target]` | **Build** | Pull reusable tokens & components into design system | Isolates primitives, variables, and shared layout shells. |
| `critique [target]` | **Evaluate** | Heuristic UX design review with score | Deep heuristic review across hierarchy, cognitive load, and visual rhythm. |
| `audit [target]` | **Evaluate** | Technical quality checks | Tests accessibility (WCAG AA), responsiveness, and layout stability. |
| `polish [target]` | **Refine** | Final high-craft pass before shipping | Micro-edits, pixel alignments, border calibration, and hover states. |
| `bolder [target]` | **Refine** | Amplify safe or timid designs | Boosts typographic contrast, assertive focal points, and distinctive character. |
| `quieter [target]` | **Refine** | Tone down overstimulating designs | Strips gratuitous noise, softens aggressive palettes, and restores breathing room. |
| `distill [target]` | **Refine** | Strip to the essence, remove complexity | Eliminates unnecessary UI chrome, redundant cards, and visual clutter. |
| `harden [target]` | **Refine** | Production-ready stress test | Edge cases, text overflows, error states, and responsive edge conditions. |
| `typeset [target]` | **Enhance** | Editorial typography & type scale hierarchy | Optimizes font pairings, tracking, leading, measure, and font-weight contrast. |
| `layout [target]` | **Enhance** | Spatial rhythm & visual hierarchy | Solves layout tension, irregular gutters, and improper content grouping. |
| `colorize [target]` | **Enhance** | Strategic color application | Introduces disciplined palette accents to monochromatic or dull interfaces. |
| `delight [target]` | **Enhance** | Memorable human touches | Subtle tactile feedback, thoughtful micro-copy, and micro-interactions. |
| `clarify [target]` | **Fix** | UX copy & messaging clarity | Removes jargon, clarifies error states, and crafts human, empathetic copy. |
| `adapt [target]` | **Fix** | Deep responsive adaptation | Custom breakpoints for mobile, tablet, laptop, and ultra-wide displays. |
| `optimize [target]` | **Fix** | Layout performance | Eliminates layout thrashing, heavy repaints, and asset bottlenecks. |

---

## 3. Installed Skill Files

The skill suite is fully installed and discoverable by Antigravity in:
- **Workspace Skills Root:** [`.agents/skills/impeccable/`](file:///Users/muhammad.ibrahim/Desktop/Code/TalentNext-V2/.agents/skills/impeccable/SKILL.md)
- **Global Skills Root:** `~/.gemini/config/skills/impeccable/`

### Subdirectories Included:
1. `agents/`:
   - `impeccable-asset-producer.md`
   - `impeccable-documenter.md`
   - `impeccable-finish-reviewer.md`
   - `impeccable-manual-edit-applier.md`
2. `reference/`:
   - Playbooks for all 23 commands (`audit.md`, `bolder.md`, `craft-floor.md`, `critique.md`, `distill.md`, `harden.md`, `polish.md`, `typeset.md`, `shape.md`, `quieter.md`, etc.).
3. `scripts/`:
   - Context, linting, and quality verification tools.

---

## 4. How to Use with Antigravity

Whenever you want to review, critique, audit, polish, or redesign any page or component, you can simply say:

- *"Impeccable: critique the hero section"*
- *"Impeccable: audit accessibility and mobile responsiveness"*
- *"Impeccable: polish this landing page for human-crafted aesthetics"*
- *"Impeccable: distill the layout to remove visual clutter"*
- *"Impeccable: typeset the typography hierarchy"*
