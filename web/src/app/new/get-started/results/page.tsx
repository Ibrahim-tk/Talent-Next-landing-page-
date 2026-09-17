import { GridCanvas } from "@gridline";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ResultsCard } from "@/components/quiz/ResultsCard";

export const metadata = {
  title: "Diagnostic Results — TALENTnext",
  description: "View your personalized talent archetype profile and breakdown.",
};

export default function ResultsPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <GridCanvas>
        <SiteHeader />

        <main id="main-content">
          <ResultsCard />
        </main>

        <SiteFooter />
      </GridCanvas>
    </>
  );
}
