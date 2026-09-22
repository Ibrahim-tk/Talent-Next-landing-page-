import { GridCanvas } from "@gridline";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { QuizFlow } from "@/components/quiz/QuizFlow";

export const metadata = {
  title: "Get Started — TALENTnext Diagnostic Quiz",
  description:
    "Take the 12-question TALENTnext diagnostic to uncover your talent profile and discover what comes next.",
};

/**
 * Get Started page for the `/new` variation.
 *
 * Houses the 12-step questionnaire, personal info capture, SMS OTP verification,
 * diagnostic results preview, and email instructions page.
 */
export default function NewGetStartedPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <GridCanvas>
        <SiteHeader
          ctaHref="/new/get-started"
          ctaLabel="Take TALENTnext Quiz"
          homeHref="/new"
        />

        <main id="main-content">
          <QuizFlow />
        </main>

        <SiteFooter />
      </GridCanvas>
    </>
  );
}
