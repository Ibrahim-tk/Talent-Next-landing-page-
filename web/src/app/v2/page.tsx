import { GridCanvas } from "@gridline";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AgentSection } from "@/components/sections/agent/AgentSection";
import { ArchetypesSection } from "@/components/sections/archetypes/ArchetypesSection";
import { DeliverablesSection } from "@/components/sections/deliverables/DeliverablesSection";
import { GetStartedSection } from "@/components/sections/getStarted/GetStartedSection";
import { HowItWorksSection } from "@/components/sections/howItWorks/HowItWorksSection";
import { InterviewSection } from "@/components/sections/interview/InterviewSection";
import { SeeItInActionSection } from "@/components/sections/seeItInAction/SeeItInActionSection";
import { HeroSection } from "@/components/variants/v2/hero/HeroSection";

/**
 * Landing page variation 2, served at `/v2`.
 *
 * The hero comes from `components/variants/v2/hero/` and reads its copy
 * from `content/variants/v2/hero.ts`. It is no longer quite the only thing
 * this page varies: `AgentSection` — the Talent Agent panel — is
 * rendered here and not on the homepage. It is a shared component in
 * `components/sections/agent/` reading `content/agent.ts`, not a private
 * copy under `variants/v2/`, so adding its one line to the homepage's own
 * list is all it would take to adopt it. The step-list treatment of
 * "It Starts with 30 Minutes." started
 * here as a private copy under `components/variants/v2/`, the homepage has
 * since adopted it, and it now lives in `sections/howItWorks/` where both
 * pages render the very same component. (`/v1` and `/v3` stay on
 * `sections/howItWorksMatrix/`, the older three-panel layout — also shared,
 * also reading the same copy.)
 *
 * Everything else is the exact same component the live homepage renders,
 * imported from `components/sections/` and reading the same copy from
 * `src/content/`. The dark treatment of "See It in Action" started on this
 * page and the homepage has since adopted it; the tone is still passed
 * explicitly on both rather than baked into the section, so either can be
 * taken back to the light plate on its own.
 *
 * The hero is also the one section on this page that is not inside the
 * GridCanvas frame. It is a full-bleed photograph that breaks out to the
 * full viewport width and runs up behind the sticky nav, which it puts
 * into its frosted "blur" theme for as long as it is on screen. It still
 * renders inside `GridCanvas` — everything on the page does — but it
 * deliberately crosses the canvas's two vertical rules rather than
 * stopping at them. The frame resumes at `ArchetypesSection` below it.
 *
 * That is deliberate, and it replaced an earlier arrangement where each
 * variation owned a private copy of all seven sections. The copies had
 * already drifted: improvements made to the homepage's deliverables band
 * and intake form never reached them, so the variations were quietly
 * showing stale versions of sections nobody intended to vary. Sharing the
 * components means the homepage is the single source of truth for
 * everything but the hero, and a fix made there shows up on all four
 * pages at once.
 *
 * So: to try a different hero, edit this variation's own hero folder. To
 * change anything else, edit the shared section — and expect it to change
 * the homepage too, because it is the same component.
 *
 * Sections are listed in render order: re-ordering the page is re-ordering
 * this list, and dropping a section is deleting its line.
 */
export default function Variant2Page() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <GridCanvas>
        <SiteHeader />

        <main id="main-content">
          <HeroSection />
          <ArchetypesSection />
          <InterviewSection />
          <HowItWorksSection />
          {/* The Tal band. It sits between "It Starts with 30 Minutes." and
              "Know Where You Stand", and that is the whole reason it is here
              rather than higher up the page: the section above it has just
              described the half-hour, the section below it describes what
              comes back, and Tal is the thing standing between the two. Put
              earlier — straight after "This isn't a Job Interview." — it was
              demonstrating an assistant before the reader had any process
              for it to assist with.

              It is the one section on the page with no heading of its own,
              no closing line, and no blueprint grid: a three-state
              demonstration on a pale mesh, flush to the canvas's two
              vertical rules and never past them. Its tabs also turn by
              themselves every few seconds, which nothing else on the page
              does — see the section for the four things that stop them. */}
          <AgentSection />
          <DeliverablesSection />
          <SeeItInActionSection tone="inverse" />
          <GetStartedSection />
        </main>

        <SiteFooter />
      </GridCanvas>
    </>
  );
}
