import { GridCanvas } from "@gridline";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ArchetypesSection } from "@/components/sections/archetypes/ArchetypesSection";
import { DeliverablesSection } from "@/components/sections/deliverables/DeliverablesSection";
import { GetStartedSection } from "@/components/sections/getStarted/GetStartedSection";
import { HeroSection } from "@/components/sections/hero/HeroSection";
import { HowItWorksSection } from "@/components/sections/howItWorks/HowItWorksSection";
import { InterviewSection } from "@/components/sections/interview/InterviewSection";
import { SeeItInActionSection } from "@/components/sections/seeItInAction/SeeItInActionSection";

/**
 * The TALENTnext landing page.
 *
 * Reads top to bottom in the same order the visitor does. Every section is
 * self-contained: it owns its layout and its copy comes from `src/content`,
 * so re-ordering the page is re-ordering this list.
 */
export default function HomePage() {
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
          <DeliverablesSection />
          {/* The dark treatment — the same one `/v2` asked for, now the
              homepage's as well. It is this section's own `tone` prop and
              not a second copy of the section, so the two pages stay in
              step. */}
          <SeeItInActionSection tone="inverse" />
          <GetStartedSection />
        </main>

        <SiteFooter />
      </GridCanvas>
    </>
  );
}
