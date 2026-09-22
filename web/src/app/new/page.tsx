import { GridCanvas } from "@gridline";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AgentSection } from "@/components/sections/agent/AgentSection";
import { ArchetypesSection } from "@/components/sections/archetypes/ArchetypesSection";
import { DeliverablesSection } from "@/components/sections/deliverables/DeliverablesSection";
import { QuizCtaSection } from "@/components/sections/quizCta/QuizCtaSection";
import { HeroSection } from "@/components/sections/hero/HeroSection";
import { HowItWorksSection } from "@/components/sections/howItWorks/HowItWorksSection";
import { InterviewSection } from "@/components/sections/interview/InterviewSection";
import { SeeItInActionSection } from "@/components/sections/seeItInAction/SeeItInActionSection";

/**
 * The new landing page variation / workspace, served at `/new`.
 * Updated with the infused banner CTA just above the footer.
 */
/** Every CTA on `/new` opens the quiz, the same route the Get Started band uses. */
const QUIZ_HREF = "/new/get-started";

export default function NewLandingPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <GridCanvas>
        <SiteHeader ctaHref={QUIZ_HREF} />

        <main id="main-content">
          <HeroSection ctaHref={QUIZ_HREF} />
          <ArchetypesSection exploreMoreHref={QUIZ_HREF} />
          <InterviewSection />
          <HowItWorksSection />
          <AgentSection />
          <DeliverablesSection />
          <SeeItInActionSection tone="inverse" />
          <QuizCtaSection buttonHref={QUIZ_HREF} />
        </main>

        <SiteFooter />
      </GridCanvas>
    </>
  );
}
