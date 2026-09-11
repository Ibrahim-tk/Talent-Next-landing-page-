import type { Metadata } from "next";

import { LegalPage } from "@/components/sections/legal/LegalPage";
import { termsOfUseDoc } from "@/content/legal/terms";

export const metadata: Metadata = {
  title: `${termsOfUseDoc.title} — Talentnext`,
  description: termsOfUseDoc.description,
};

export default function TermsPage() {
  return <LegalPage doc={termsOfUseDoc} />;
}
