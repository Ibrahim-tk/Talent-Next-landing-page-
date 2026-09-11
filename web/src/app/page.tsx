import { GridCanvas } from "@gridline";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AgentSection } from "@/components/sections/agent/AgentSection";
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
          {/* The Tal band. It started on `/v2` and the homepage has adopted
              it — the same component reading the same copy, not a second
              copy of it, so the two pages stay in step.

              It sits between "It Starts with 30 Minutes." and "Know Where
              You Stand" on both pages, and the position is the argument: the
              section above has just described the half-hour, the section
              below describes what comes back, and Tal is the thing standing
              between the two.

              It is the one section on the page with no heading of its own,
              no closing line and no blueprint grid, and the only one whose
              tabs turn by themselves. */}
          <AgentSection />
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
