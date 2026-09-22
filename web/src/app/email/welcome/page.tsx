import type { Metadata } from "next";

import { EmailPreview } from "./EmailPreview";

export const metadata: Metadata = {
  title: "Email templates — TALENTnext",
  robots: { index: false, follow: false },
};

export default function EmailTemplatesPage() {
  return <EmailPreview />;
}
