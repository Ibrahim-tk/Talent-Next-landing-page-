import { GridCanvas } from "@gridline";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { OtpCard } from "@/components/quiz/OtpCard";

export const metadata = {
  title: "OTP Verification — TALENTnext Diagnostic",
  description: "Verify your phone number to reveal your diagnostic results.",
};

export default function OtpPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <GridCanvas>
        <SiteHeader />

        <main id="main-content">
          <OtpCard />
        </main>

        <SiteFooter />
      </GridCanvas>
    </>
  );
}
