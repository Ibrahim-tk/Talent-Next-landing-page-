# TALENTnext Landing Page — Design & Content Specification

**Purpose of this document:** This is a full build brief for an agent/developer/AI to implement the TALENTnext landing page. It contains the exact copy, the visual design system, and section-by-section layout, spacing, and content instructions. Follow it in order, top to bottom, section by section.

**Design inspiration references:** attio.com (bento-grid structure, restrained monochrome UI, product-style cards), betterup.com (human warmth, generous whitespace, soft reassurance sections), eteo.com (grid discipline). Do not copy these sites directly — use them as tonal/structural references only.

**Images:** This spec does not include image files. Anywhere an image, illustration, or photo is called for, it is marked with `[IMAGE PLACEHOLDER: description]`. The client will supply Unsplash URLs for these slots — build the layout with a clearly defined image container (correct aspect ratio, object-fit: cover) even before the final image is dropped in.

---

## 1. Global Design System

### 1.1 Visual concept
A **monochromatic "carbon" design system**: near-black graphite backgrounds, layered greys for elevation, off-white text — with **one accent color** used sparingly and consistently to mark interactivity, key data points, and emotional emphasis. The palette should feel disciplined and product-grade (like Attio), not flat or lifeless (like BetterUp's warmth).

### 1.2 Color tokens

| Token | Hex | Usage |
|---|---|---|
| `--bg-base` | `#0B0B0C` | Page background |
| `--bg-surface-1` | `#1A1A1C` | Card/section surface, first elevation |
| `--bg-surface-2` | `#232326` | Nested card, hover surface, second elevation |
| `--bg-surface-3` | `#2E2E31` | Highest elevation / active states |
| `--border-subtle` | `#3A3A3E` | Hairline borders on cards/inputs |
| `--text-primary` | `#F2F2F0` | Headlines, primary copy |
| `--text-secondary` | `#9A9A9E` | Subheads, supporting copy, captions |
| `--text-muted` | `#6B6B6F` | Micro-copy, timestamps, disclaimers |
| `--accent` | *(client to choose: amber `#F5A623`, electric green `#5EEAD4`, or coral `#FF6B4A`)* | CTAs, active states, key numbers, the "TALENT" letters, links, focus rings |
| `--accent-soft` | accent at 12–15% opacity | Background glows, soft highlight fills, hover backgrounds |

**Rule:** Never use more than one accent color on screen at once. Everything else is grayscale. If in doubt, make it grey — accent color is earned, not decorative.

### 1.3 Typography

- **Font family:** A confident, geometric/grotesk sans-serif (e.g. Inter, General Sans, or Neue Montreal). One family for the whole site — vary via weight, not typeface.
- **Headline (H1):** 56–72px desktop / 32–40px mobile, weight 600, tight letter-spacing (-1% to -2%), line-height 1.05–1.1
- **Section heading (H2):** 36–44px desktop / 26–30px mobile, weight 600, line-height 1.15
- **Card heading (H3):** 20–24px, weight 600
- **Body copy:** 16–18px, weight 400, `--text-secondary`, line-height 1.6
- **Micro-copy / eyebrow labels:** 12–13px, uppercase, letter-spacing +6–8%, `--text-muted`

### 1.4 Grid & spacing

- **Base grid:** 12-column, max content width 1280px, gutters 24px desktop / 16px mobile
- **Section vertical padding:** 120–160px desktop between major sections, 64–80px mobile
- **Card internal padding:** 32–40px desktop, 24px mobile
- **Card gap (within a grid of cards):** 16–24px
- **Rule:** Most sections should sit inside the 12-column grid conventionally, but 1–2 sections per page should deliberately break the grid with an oversized or asymmetric element (see Section 3 and Section 6 below) — this is what keeps a strict monochrome grid from feeling static, per the Attio reference.

### 1.5 Components (reused across sections)

- **Primary button:** filled `--accent` background, dark text (near-black) or white depending on accent contrast, fully rounded or 8px radius (pick one and use everywhere), subtle scale/brighten on hover
- **Nav bar:** transparent background over hero, becomes `--bg-surface-1` with a hairline bottom border on scroll; logo left, 3–4 text links center/right, one filled accent button far right
- **Card component (reused in Sections 3 and 5):** `--bg-surface-1` background, `--border-subtle` 1px border, 12–16px corner radius, padding per 1.4, hover state lifts to `--bg-surface-2` with a very subtle upward translate (2–4px) and 150–200ms ease transition
- **Numbered step marker (Section 4):** circular badge, `--bg-surface-2` fill, `--accent` numeral, connected by a 1px `--border-subtle` horizontal line between steps

### 1.6 Motion (keep minimal and premium, not flashy)
- Fade + slight upward translate (8–12px) on scroll-into-view for section headings and cards, staggered 60–80ms per item in a grid
- Hover states: 150–200ms ease transitions only, no bouncy easing
- No autoplay animations, no parallax gimmicks

---

## 2. Navigation Bar

**Layout:** Fixed/sticky top bar, full width, transparent over the hero, transitions to `--bg-surface-1` with a hairline bottom border after ~80px scroll.

**Content (exact copy):**
- Logo: "TALENTnext" (left)
- Nav links (center or right-aligned, evenly spaced): `How It Works` | `What You'll Get` | `See It in Action` | `Get Started`
- Far right: filled accent button linking to the Get Started form — label can reuse "Get Started" or "GET STARTED"

**Spacing:** 24px vertical padding, 48–64px horizontal padding desktop (24px mobile). Nav collapses to a hamburger menu below 768px.

---

## 3. Hero Section

**Layout:** Two-column split, ~55/45. Left column: eyebrow label (optional), headline, subhead, CTA button, micro-disclaimer. Right column: image/visual placeholder. On mobile, stack — text first, image below.

**This is one of the two sections allowed to break the strict grid** — let the right-column visual bleed slightly past the standard container edge or overlap the section boundary for a bit of visual tension.

**Exact copy:**
> **Headline:** Uncover the TALENT You Already Have.
>
> **Subhead:** What you do next may start with what you're already good at. Through a 30-minute conversation with a TALENT Agent, you'll uncover skills you may not recognize in yourself and begin to see what they could mean for your future.
>
> **Button:** GET STARTED
>
> **Micro-copy under button:** Your first conversation is at no charge

**Spacing:** 100–140px top padding (accounting for fixed nav), headline max-width ~600px so it wraps to 2–3 lines naturally, 24px gap between headline and subhead, 32px gap before button, 12px gap between button and micro-copy.

**Visual treatment:** Micro-copy should look like a quiet trust signal — small, `--text-muted`, maybe preceded by a small checkmark icon in `--accent`. Do not style it like a banner or badge.

`[IMAGE PLACEHOLDER: right-column hero visual — a warm, candid photo of a one-on-one conversation/interview setting, or an abstract carbon-textured graphic with a soft accent-color glow. Aspect ratio ~4:5 or 1:1, object-fit cover, rounded corners 16-24px]`

---

## 4. "TALENT Looks Different for Everyone" Section

**Layout:** Bento-style grid of 6 cards, one per letter of TALENT. Use an asymmetric arrangement — e.g. a 3-column x 2-row grid where one card (suggest "Not Sure," since it needs the most explanatory room) spans 2 columns or sits visually larger. Do not use a perfectly uniform 6-equal-box grid — that's the flat, generic version of this pattern.

**Section intro copy (centered, above the grid, max-width ~700px):**
> **Heading:** TALENT Looks Different for Everyone.
>
> **Subhead:** Being talented isn't one thing. It can show up in what comes naturally to you, the way you approach challenges, or the role you find yourself taking without even thinking about it.

**The six cards (exact copy):**

1. **T — Top Performer**
   The standard you hold yourself to, what you do when the work falls short of it, and how you show up the next day.
2. **A — Athlete**
   How you prepare, how you take coaching and criticism, and what you do after things don't go your way.
3. **L — Leader**
   How you set direction, how you get people to come with you, and how you pull the best out of the people around you.
4. **E — Entrepreneur**
   How you start things before you have them figured out, how you test an idea, and how you decide whether to keep going or move on.
5. **N — Not Sure**
   A wider conversation if none of these feel exactly right yet. What you've been drawn to, what you've been good at, and where you might be headed.
6. **T — Team Player**
   How you build trust, how you show up for people counting on you, and what you do when a group isn't working well together.

**Closing line below the grid (centered, smaller, `--text-secondary`):**
> And yes, Not Sure counts. You don't have to know where you fit before you start.

**Card content structure (apply to all six):** large single letter top-left or top-center in `--accent` color (48–64px, bold), archetype name below it in H3 style, description in body copy style below that. On hover: card surface lifts to `--bg-surface-2`, letter brightens slightly.

**"Not Sure" card differentiation:** same base card style, but use a dashed `--border-subtle` border instead of solid, and/or a small question-mark glyph accent, so it reads as "a legitimate option," not a weaker choice. Do not shrink or grey it out relative to the others.

**Spacing:** 24px gap between cards, card min-height should be consistent across the row even though widths vary (use align-items: stretch). Section intro to grid gap: 64px. Grid to closing line gap: 40px.

---

## 5. "This Isn't a Job Interview" Section

**Layout:** Single column, centered, narrow measure (max-width ~640–680px) — a deliberate pullback from the grid-heavy sections around it. Generous top/bottom padding to let it breathe. This is the section where the monochrome palette should soften most — introduce the accent as a soft ambient glow behind the text block rather than as a hard UI element, and consider a warmer photographic image rather than an abstract graphic if imagery is used at all.

**Exact copy:**
> **Heading:** This Isn't a Job Interview.
>
> **Subhead line:** There are no right answers and nothing to prepare.
>
> **Body:** Your TALENT Agent will ask about real experiences from your life and give you a chance to talk through what happened and how you handled it.
>
> **Body:** The point isn't to impress anyone. It's to uncover skills you may not recognize in yourself.

**Spacing:** 140–160px top and bottom padding (this section should feel like a breath after the busy grid section above it). 16px between heading and subhead line, 24px between each body paragraph. Text center-aligned or left-aligned within the narrow column — pick one and stay consistent with Section 3's intro copy alignment.

`[IMAGE PLACEHOLDER: optional — a soft, warm portrait or candid conversation photo, small/inset rather than full-bleed, or omit entirely and let typography and the accent glow carry the section]`

---

## 6. "How It Works" Section

**Layout:** Three-column grid, equal width, representing a linear process. Connect the three steps with a thin horizontal `--border-subtle` line running behind/between the numbered badges, so the eye reads it as a sequence rather than three unrelated cards.

**Section heading (centered above the steps):**
> It Starts with 30 Minutes.

**The three steps (exact copy):**

1. **Talk About You**
   Meet one-on-one with a TALENT Agent and talk through experiences from your life.
2. **See What Stands Out**
   Your interview is analyzed to identify the skills you demonstrate, including where you're strongest and where you have room to improve.
3. **Get Your Next Steps**
   Get recommended focus areas and a personalized plan based on your results.

**Step structure:** numbered circular badge (01/02/03) in `--accent` numeral on `--bg-surface-2` fill, step title in H3 style below the badge, description in body copy below that. Optional: a simple monochrome line-icon above or beside each badge (e.g. a conversation bubble, a magnifying glass/chart, a checklist) — icons stay grayscale, only the number/badge accent gets color.

**Motion:** consider a scroll-triggered draw-in of the connecting line as the user scrolls into the section, with each step fading in staggered by ~100ms.

**Spacing:** 64px gap between heading and step row, 32–40px gap between the three step columns, 16px between badge and title, 8px between title and description.

---

## 7. "What You'll Get" Section

**Layout:** Asymmetric bento grid, 5 items of varying visual weight. This is the richest content section — give the two most "visual" deliverables (video highlights and the 12-week plan) larger tiles that include a simple mock product-UI illustration (e.g. a stylized video-thumbnail strip, a stylized progress-tracker bar) rendered in grayscale with one accent highlight, in the style of Attio's product-in-card marketing pattern. The other three items can sit in smaller, text-forward cards.

**Section intro copy:**
> **Heading:** Know Where You Stand and What to Do Next.
>
> **Subhead:** This is where TALENTnext goes beyond a conversation. You'll get specific results from your interview and something you can actually use afterward.

**The five items (exact copy):**

1. **Your TALENT Level**
   See where you stand based on your overall strengths and weaknesses demonstrated during your interview.
2. **Your Strengths + Skill Gaps**
   Take a closer look at the specific skills behind your results and understand what contributed to your current level.
3. **Highlights From Your Interview**
   Get 3 video clips pulled from your conversation so you can see moments when your TALENT came through.
   *(Suggest: larger tile, include a mock video-thumbnail-strip UI element, 3 small rounded-rect placeholders side by side representing the clips)*
4. **Your Personalized Development Plan**
   Get recommended focus areas based on your results so you know which skills to work on and why.
5. **12 Weeks of Development Built for You**
   Put your plan into action with interactive training tailored to the skills identified during your interview. When you're finished, you'll have the opportunity to reassess your TALENT Level.
   *(Suggest: larger tile, include a mock horizontal progress-bar or week-tracker UI element with the accent color marking current progress)*

**Card structure:** consistent with Section 3's card component (same border/radius/padding system) so the whole page feels like one component language, but sized differently per the bento logic above.

**Spacing:** 24px gap between cards in the grid, section intro to grid gap 64px, card internal padding 32–40px (40px for the two larger tiles to give the mock UI elements room).

`[IMAGE PLACEHOLDER: none required if using illustrated/mock UI elements as described above — these should be built as simple CSS/SVG shapes, not photos. If the client prefers, a supporting photo can replace the mock UI in the two larger tiles.]`

---

## 8. "See It in Action" Section

**Layout:** Centered, full-width or large centered video frame (max-width ~960–1040px). Minimal copy above it. Let the video be the visual anchor of the section — this is the second section allowed to break the strict grid (the frame can be wider than the standard 12-column max-width if desired).

**Exact copy:**
> **Heading:** See What a TALENTnext Conversation Is Really Like
>
> **Subhead:** Wondering what you'll be asked? Watch part of a real conversation with a TALENT Agent and see for yourself.

**Video frame treatment:** bordered in `--border-subtle` or a subtle carbon-textured frame, 16:9 aspect ratio, large centered play button in `--accent` as the section's single pop of color. Rounded corners 16–24px to match the card system.

**Spacing:** 48–56px gap between heading/subhead and video frame. 100–140px section top/bottom padding.

`[IMAGE PLACEHOLDER: this is a video embed slot — client will provide the interview clip / embed code / thumbnail. Use a placeholder 16:9 block with the play-button treatment until the real embed is added.]`

---

## 9. "Get Started" Section (Form)

**Layout:** Two-column split, ~50/50 or 55/45. Left: form. Right: reassurance copy, and optionally a small stat or testimonial to reinforce trust (client to supply if available). On mobile, stack — reassurance copy first or form first, whichever tests better; default to form first for mobile since it's the conversion point.

**Exact copy:**
> **Heading:** Ready to Uncover Your TALENT?
>
> **Subhead:** Complete the form below and we'll connect you with a TALENT Agent to schedule your first 30-minute conversation at no charge.
>
> **Button:** GET STARTED

**Form:** *(Note: per source content, this form should be the same form currently used on the "TALENTnext Landing- Builder and Trailblazer – NextinLeadership" page — reuse those exact fields/integration, do not invent new form fields.)*

**Form styling:** fields sit on a `--bg-surface-1` card, thin `--border-subtle` borders (not heavy fills) on inputs, `--accent` filled submit button, `--accent` focus ring on active input. Keep the card visually consistent with the card component used elsewhere on the page.

**Spacing:** 100–140px section top padding, 24px between heading and subhead, 32px between subhead and form card, 16–20px vertical gap between form fields, 24px gap between form and button.

**Visual tone:** this is the last section before conversion — keep it calm and uncluttered. No competing visual elements near the CTA.

---

## 10. Footer (not detailed in source copy — minimal recommendation)

Keep it simple and consistent with the carbon system: `--bg-surface-1` background, logo, a repeat of the nav links, and standard legal/contact info if the client supplies it. Do not introduce new visual patterns here — reuse existing type scale and spacing tokens.

---

## 11. Build Checklist Summary

- [ ] One accent color chosen and used consistently — never more than one on screen
- [ ] All body/section copy matches the exact wording above — no paraphrasing
- [ ] Card component reused across Sections 3, 6/step-badges, and 7 for visual consistency
- [ ] Sections 3 (hero) and 8 (video) are the two sections allowed to break the 12-column grid
- [ ] Section 5 ("Not a Job Interview") is visually the calmest, narrowest, most breathing-room section on the page
- [ ] "Not Sure" card in Section 4 is differentiated, not diminished
- [ ] Section 7's two larger tiles include mock product-UI elements, not just text
- [ ] Get Started form reuses the existing TALENTnext/NextinLeadership form fields — do not create new ones
- [ ] All image placeholders left as clearly bounded containers with correct aspect ratios for the client to drop in Unsplash URLs