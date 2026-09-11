import { GridCanvas } from "@gridline";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ArchetypesSection } from "@/components/sections/archetypes/ArchetypesSection";
import { DeliverablesSection } from "@/components/sections/deliverables/DeliverablesSection";
import { GetStartedSection } from "@/components/sections/getStarted/GetStartedSection";
import { HowItWorksMatrixSection } from "@/components/sections/howItWorksMatrix/HowItWorksMatrixSection";
import { InterviewSection } from "@/components/sections/interview/InterviewSection";
import { SeeItInActionSection } from "@/components/sections/seeItInAction/SeeItInActionSection";
import { HeroSection } from "@/components/variants/v1/hero/HeroSection";

/**
 * Landing page variation 1, served at `/v1`.
 *
 * The hero is the ONLY thing this variation varies. It comes from
 * `components/variants/v1/hero/` and reads its copy from
 * `content/variants/v1/hero.ts`; everything below it is the exact same
 * component the live homepage renders, imported from
 * `components/sections/` and reading the same copy from `src/content/`.
 *
 * One shared section is picked rather than inherited: this page renders
 * `HowItWorksMatrixSection`, the three-panel matrix, where the homepage and
 * `/v2` render `sections/howItWorks/` — the same three steps laid out as
 * one list beside a single still. Both are shared components reading the
 * same copy from `howItWorksCopy`; neither is a private copy, and a change
 * to the words reaches all four pages.
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
export default function Variant1Page() {
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
          <HowItWorksMatrixSection />
          <DeliverablesSection />
          <SeeItInActionSection />
          <GetStartedSection />
        </main>

        <SiteFooter />
      </GridCanvas>
    </>
  );
}
