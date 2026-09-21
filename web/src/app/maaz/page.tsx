import { GridCanvas } from "@gridline";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AgentSection } from "@/components/sections/agent/AgentSection";
import { DeliverablesSection } from "@/components/sections/deliverables/DeliverablesSection";
import { QuizCtaSection } from "@/components/sections/quizCta/QuizCtaSection";
import { HowItWorksSection } from "@/components/sections/howItWorks/HowItWorksSection";
import { InterviewSection } from "@/components/sections/interview/InterviewSection";
import { SeeItInActionSection } from "@/components/sections/seeItInAction/SeeItInActionSection";

import { StorySection } from "./story/StorySection";

/**
 * The `/maaz` variant of the `/new` landing page.
 *
 * Everything below the fold is the shared page, unchanged. The difference is
 * at the top: the hero and the archetype band are replaced by `StorySection`,
 * a single scroll-scrubbed sequence that runs from the hero photograph
 * opening to full bleed through to the last TALENT card. It lives under this
 * route's own folder so the change cannot reach `/new` or the main page.
 */
export default function MaazLandingPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <GridCanvas>
        <SiteHeader />

        <main id="main-content">
          <StorySection />
          <InterviewSection />
          <HowItWorksSection />
          <AgentSection />
          <DeliverablesSection />
          <SeeItInActionSection tone="inverse" />
          <QuizCtaSection />
        </main>

        <SiteFooter />
      </GridCanvas>
    </>
  );
}
