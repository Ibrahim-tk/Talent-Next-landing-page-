#f95873
# TALENTnext Landing Page — Design & Conversion Blueprint

> Ideation-stage spec: design system + information architecture + conversion copy.
> Assumption made: "Skipper UI" is read as a request for a clean, accessible, headless-component approach (Radix-primitive + Tailwind style, the same family as shadcn/ui) — swap in your actual library name if you meant something else.

---

## 1. Design System

### 1.1 Foundation: Carbon-inspired, not Carbon-copied
Borrow Carbon Design System's *discipline*, not its IBM-blue skin:
- **2px base unit grid** for spacing (multiples of 8/16/24/32/48/64/96)
- **Flat, high-contrast surfaces** — no heavy drop shadows, use 1px borders and subtle elevation
- **Motion restraint now, expressive later** — ship with 150–250ms ease-out transitions; your planned GSAP layer next year hooks into the same components without a rebuild
- **IBM Plex Sans (or Inter as a free-alternative)** for UI, a humanist serif or rounded display face for hero headlines to keep it warm (TALENTnext is emotional/coaching, not enterprise software)

### 1.2 Grid structure — two constant vertical rules, edge to edge
The grid is now the visual system, not just a layout aid. Two vertical rule lines run the **full height of the page** — through the header and into the footer, unbroken — and every section sits inside a boxed/bordered module hung off those same two lines. Think: a single continuous ruled sheet that each section slots into, rather than independent floating blocks.

| Breakpoint | Rule position | Content columns between rules | Outer margin (outside rules) |
|---|---|---|---|
| Mobile (<640px) | 20px from each edge | 4 | — (rules sit at margin) |
| Tablet (640–1024px) | 40px from each edge | 8 | — |
| Desktop (1024–1440px) | 64px from each edge | 12 | — |
| Wide (1440px+) | rules pin to a 1280px centered frame | 12 | remainder is neutral canvas |

Rules of the grid:
- **The two vertical lines are constant** (`--color-border-subtle`, 1px): they start at the top of the sticky header and run, uninterrupted, to the bottom of the footer. No section is allowed to bleed past them except explicit full-bleed exceptions (hero background, image treatments) — and even those keep the rule lines drawn *on top*.
- **Every section = one bordered box** between the two rules, with a 1px bottom border separating it from the next section (so the page reads as a stacked set of framed panels, not a scroll of loose content).
- **Inside a section**, subdivide with thin internal rules when a section has multiple parts (e.g., the 3-column How It Works panel gets 2 internal vertical dividers so it reads as 3 boxed cells, not 3 floating cards).
- Cards (trait cards, plan cards, testimonial cards) get the same treatment: 1px border, no shadow, square or barely-rounded corners (2–4px radius max) — boxes, not floating chips.

### 1.3 Color tokens — near-monochromatic, one accent
```
--color-bg-canvas:      #FFFFFF
--color-bg-surface:     #F5F5F5   /* used only to distinguish alternating section boxes */
--color-bg-inverse:     #111111
--color-text-primary:   #111111
--color-text-secondary: #6B6B6B
--color-border-subtle:  #D9D9D9   /* the two constant grid rules use this */
--color-border-strong:  #111111   /* section-box dividers, form outlines */
--color-accent:         #D13739   /* the ONLY color in the system — CTAs, active states, key highlights */
--color-accent-tint:    #FDF2F3   /* accent background, used sparingly (e.g. active trait card) */
```
Usage discipline: everything on the page is black, white, and grays. The accent (`#F95873`) appears only on primary buttons, link hovers, the active/selected trait letter, and one deliberate highlight word per section (e.g., "30 minutes"). If more than ~10% of a viewport is pink, pull it back — the restraint is what makes the accent read as intentional rather than decorative.

### 1.4 Typography scale (type ramp, Carbon-style modular scale)
```
Display   64/72   — hero headline (desktop) / 36/44 mobile
H1        40/48
H2        28/36
H3        20/28
Body-lg   18/28
Body      16/24
Caption   14/20  — eyebrow labels, form microcopy
```

### 1.5 Component inventory (build once, reuse everywhere)
- `Button` (primary / secondary / ghost — 3 sizes)
- `EyebrowLabel` (small caps tag above headlines, e.g. "HOW IT WORKS")
- `StatBadge` (used in social proof strip)
- `StepCard` (numbered, for How It Works)
- `TraitCard` (flip/expand card — for the T-A-L-E-N-T grid)
- `TestimonialCard` (quote + name + role + optional video thumbnail)
- `PlanCard` (pricing/tier card with feature checklist)
- `VideoEmbed` (lazy-loaded, poster-frame first for performance)
- `StickyNav` (the existing top bar: How It Works | What You'll Get | See It in Action | Get Started — sits *inside* the two constant vertical rules, with a bottom border matching the section-box divider below it)
- `LeadForm` (the shared TALENTnext form — reuse the Trailblazer/Builder form as noted in your doc)
- `FinalCTABand` (full-bleed, portal link + primary CTA)

### 1.6 Motion notes for a 2-year-out, GSAP-ready build
- Keep all entrance animation on **opacity + transform** only (no layout-shifting animations) so swapping a fade-in for a GSAP scrub timeline later is a drop-in change
- Section headers: fade-up 24px, staggered children (cards) by 80ms
- Numbers/stats: count-up on viewport-enter (cheap win, high perceived polish)
- Reserve one "hero moment" (likely the T-A-L-E-N-T letter grid or the 30-min call visual) as the place GSAP scroll-scrubbing gets added first — architect that section's DOM now as discrete, animatable layers

---

## 2. Information Architecture (Sections, in order)

1. **Sticky Nav** — logo + How It Works / What You'll Get / See It in Action / Get Started + primary button
2. **Hero** — main CTA, start-your-journey framing
3. **Social Proof / Trust strip** — thin band under hero (logos, stat, or "X people uncovered their TALENT")
4. **How TALENT Looks Different for Everyone** — the T-A-L-E-N-T trait grid (this is your "how we help you" / differentiation section)
5. **How It Works** — 3-step process (Talk / See What Stands Out / Get Next Steps)
6. **This Isn't a Job Interview** — objection-handling / anxiety-reduction section (short, visual, not "written")
7. **What You'll Get** — the deeper value/services breakdown (TALENT Level, Strengths+Gaps, Highlights, Dev Plan, 12-Week Program)
8. **See It in Action** — embedded interview clip, builds trust pre-CTA
9. **Plans** *(new — you mentioned adding this)*
10. **Testimonials** *(new — you mentioned adding this)*
11. **Final CTA + Lead Form** — Get Started, portal/dashboard entry point
12. **Footer** — portal login, secondary links

Competitive note: college.io and betterapp.com both lean on a single dominant hero CTA + a short proof-driven scroll before any form — mirrored above by pushing the lead form to section 11, using sections 2–10 purely to build trust and reduce the "is this legit / is this for me" hesitation your "Not Sure" trait already anticipates.

---

## 3. Section-by-Section Copy (conversion-first, humanized)

### 3.1 Hero
**Eyebrow:** YOUR NEXT MOVE STARTS HERE
**Headline:** Uncover the TALENT You Already Have.
**Subhead:** What you do next may start with what you're already good at. One 30-minute conversation is enough to see it.
**Primary CTA:** Start Your Journey →
**Microcopy under CTA:** Your first conversation is free. No prep, no pressure.

### 3.2 Trust strip (new, thin band)
**Line:** Built on real conversations, not personality quizzes.
*(Optional: stat badges — "30 minutes," "6 TALENT types," "12-week plan" — reused as a visual rhythm, not paragraphs)*

### 3.3 TALENT Looks Different for Everyone (trait grid)
**Eyebrow:** HOW WE SEE YOU
**Headline:** Talented isn't one thing.
**Subhead:** It shows up in how you handle a bad day, lead a room, or start something before you're ready.

Trait cards (short, punchy — not the long descriptions from your doc, tightened for scannability):
- **T — Top Performer:** The standard you hold yourself to.
- **A — Athlete:** How you take coaching, and what you do after a loss.
- **L — Leader:** How you get people to follow you.
- **E — Entrepreneur:** How you test an idea before it's proven.
- **N — Not Sure:** That counts too. We'll help you find it.
- **T — Team Player:** How you show up when the group is struggling.

**Closing line:** You don't have to know where you fit before you start.

### 3.4 How It Works
**Eyebrow:** HOW IT WORKS
**Headline:** It starts with 30 minutes.

- **01 Talk About You** — One-on-one with a TALENT Agent. Real experiences, real conversation.
- **02 See What Stands Out** — We analyze your interview to find your strongest skills — and where you have room to grow.
- **03 Get Your Next Steps** — Walk away with focus areas and a plan built around your results.

### 3.5 This Isn't a Job Interview (objection handling)
**Headline:** No right answers. Nothing to prepare.
**Body (short):** Your TALENT Agent asks about real moments from your life — not trick questions. The goal isn't to impress anyone. It's to notice what you already do well.
**Micro-CTA:** See what it's like ↓ *(anchors to video section)*

### 3.6 What You'll Get
**Eyebrow:** WHAT YOU'LL GET
**Headline:** Know where you stand. Know what to do next.
**Subhead:** This goes further than a conversation — you leave with something real.

- **Your TALENT Level** — See where you stand, based on your interview.
- **Strengths + Skill Gaps** — The specific skills behind your results.
- **Highlights From Your Interview** — 3 video clips of your TALENT in action.
- **Your Development Plan** — Focus areas built around your results.
- **12 Weeks of Development** — Interactive training, then reassess your level.

### 3.7 See It in Action
**Headline:** See what a real conversation looks like.
**Subhead:** Curious what you'll be asked? Watch a piece of a real TALENT Agent conversation.
**CTA under video:** Ready for yours? Start Your Journey →

### 3.8 Plans *(placeholder structure — fill once pricing/tiers are set)*
**Eyebrow:** PLANS
**Headline:** Choose how far you want to go.
- **Discovery** — The free 30-minute conversation. *(Get Started)*
- **Development** — Full plan + 12-week program. *(pricing TBD)*
- **Team / Organization** — For leaders bringing this to their people. *(Talk to us)*

### 3.9 Testimonials *(placeholder — swap in real quotes/video)*
**Headline:** Hear it from people who've done it.
*(3-card carousel: photo/video thumbnail, 1–2 sentence quote, name + one-line context — e.g. "Discovered she was a natural leader, not just 'good at her job.'")*

### 3.10 Final CTA + Form
**Headline:** Ready to uncover your TALENT?
**Subhead:** Fill out the form and we'll connect you with a TALENT Agent for your first conversation — free.
**Button:** Get Started
**Form:** [reuse existing Trailblazer/Builder — NextInLeadership form]

### 3.11 Footer
- Portal login (top-right or footer, persistent across site)
- Quick links: How It Works / What You'll Get / Plans / Contact
- Legal + social

---

## 4. Build Notes for Prototype Phase
- Treat every section above as an isolated component that accepts content as props — swapping copy, trait counts, or plan tiers later shouldn't touch layout code
- Ship v1 with CSS transitions only; the "GSAP-ready" note in §1.6 tells you which sections to keep animatable-by-layer for the future upgrade
- Reuse the existing lead form component as-is rather than rebuilding — noted in your source doc as shared with the Trailblazer/Builder page