import type { Metadata } from "next";

import { LegalPage } from "@/components/sections/legal/LegalPage";
import { privacyNoticeDoc } from "@/content/legal/privacy";

export const metadata: Metadata = {
  title: `${privacyNoticeDoc.title} — Talentnext`,
  description: privacyNoticeDoc.description,
};

export default function PrivacyPage() {
  return <LegalPage doc={privacyNoticeDoc} />;
}
