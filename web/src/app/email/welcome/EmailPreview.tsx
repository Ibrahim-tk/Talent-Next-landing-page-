"use client";

import { useState } from "react";

import { AdminOtpEmail } from "./AdminOtpEmail";
import { MobileOtpSms } from "./MobileOtpSms";
import { PasswordResetEmail } from "./PasswordResetEmail";
import { WelcomeEmail } from "./WelcomeEmail";

/**
 * Preview chrome for the transactional email templates.
 *
 * The tab strip and the grey surround are *not* part of any email — an inbox
 * supplies its own frame. They exist so the four templates can be compared
 * side by side in a browser before the markup is lifted into the sending
 * provider.
 *
 * All four share `EmailShell` — the rose cap, the ruled masthead and the
 * black footer — except the SMS, which has no chrome at all because a phone
 * renders plain text.
 */

const TABS = [
  { id: "welcome", label: "Welcome / verify" },
  { id: "reset", label: "Password reset" },
  { id: "otp", label: "Mobile OTP" },
  { id: "admin", label: "Super admin OTP" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const FONT = '"Helvetica Neue", Helvetica, Arial, sans-serif';

export function EmailPreview() {
  const [active, setActive] = useState<TabId>("welcome");

  return (
    <div style={{ backgroundColor: "#F8F9FA", minHeight: "100vh" }}>
      {/* Tab strip — sticky so it stays reachable down a long template. */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #F0F0F2",
        }}
      >
        <div
          role="tablist"
          aria-label="Email templates"
          style={{
            display: "flex",
            gap: "4px",
            padding: "0 16px",
            maxWidth: "960px",
            margin: "0 auto",
            overflowX: "auto",
          }}
        >
          {TABS.map((tab) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(tab.id)}
                style={{
                  appearance: "none",
                  background: "none",
                  border: 0,
                  borderBottom: `2px solid ${selected ? "#F9423A" : "transparent"}`,
                  padding: "18px 14px 16px",
                  fontFamily: FONT,
                  fontSize: "13px",
                  lineHeight: "18px",
                  letterSpacing: "0.04em",
                  whiteSpace: "nowrap",
                  color: selected ? "#23282F" : "#69707C",
                  cursor: "pointer",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ padding: "48px 16px" }}>
        {active === "welcome" && <WelcomeEmail />}
        {active === "reset" && <PasswordResetEmail />}
        {active === "otp" && <MobileOtpSms />}
        {active === "admin" && <AdminOtpEmail />}
      </div>
    </div>
  );
}
