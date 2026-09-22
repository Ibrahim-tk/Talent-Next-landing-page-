import {
  BODY,
  EmailButton,
  EmailRule,
  EmailShell,
  FONT,
  INK,
  MUTED,
} from "./EmailShell";

/**
 * Welcome / email-verification.
 *
 * Sent the moment an account is created. One job — confirm the address —
 * so there is exactly one action on the sheet.
 */

/* Placeholders the sending provider substitutes. */
const recipientEmail = "dsngr.og@company.com";
const verifyUrl = "https://app.talentnext.com/verify?token=VERIFICATION_TOKEN";
const loginUrl = "https://app.talentnext.com/login";

export function WelcomeEmail() {
  return (
    <EmailShell recipientEmail={recipientEmail}>
      <tr>
        <td style={{ padding: "56px 40px 0" }}>
          <h1
            style={{
              margin: 0,
              fontFamily: FONT,
              fontSize: "36px",
              lineHeight: "44px",
              fontWeight: 400,
              letterSpacing: "-0.01em",
              color: INK,
            }}
          >
            Welcome to TALENTnext.
          </h1>
          <p
            style={{
              margin: "20px 0 0",
              fontFamily: FONT,
              fontSize: "16px",
              lineHeight: "28px",
              color: BODY,
            }}
          >
            Confirm <span style={{ color: INK }}>{recipientEmail}</span> and
            your account is live. From there it&rsquo;s one sign-in to the
            assessment, and your TALENT profile starts building.
          </p>
        </td>
      </tr>

      <tr>
        <td style={{ padding: "36px 40px 0" }}>
          <EmailButton href={verifyUrl} label="Verify email address" />
          <p
            style={{
              margin: "16px 0 0",
              fontFamily: FONT,
              fontSize: "14px",
              lineHeight: "22px",
              color: MUTED,
            }}
          >
            Already verified?{" "}
            <a href={loginUrl} className="tn-link" style={{ color: INK }}>
              Go straight to sign in
            </a>
            .
          </p>
        </td>
      </tr>

      <tr>
        <td style={{ padding: "44px 40px 0" }}>
          <EmailRule />
        </td>
      </tr>

      <tr>
        <td style={{ padding: "24px 40px 48px" }}>
          <p
            style={{
              margin: 0,
              fontFamily: FONT,
              fontSize: "14px",
              lineHeight: "22px",
              color: MUTED,
            }}
          >
            The link expires in 24 hours. If the button doesn&rsquo;t open,
            paste this into your browser:
            <br />
            <a
              href={verifyUrl}
              className="tn-link"
              style={{ color: BODY, wordBreak: "break-all" }}
            >
              {verifyUrl}
            </a>
          </p>
          <p
            style={{
              margin: "16px 0 0",
              fontFamily: FONT,
              fontSize: "14px",
              lineHeight: "22px",
              color: MUTED,
            }}
          >
            Didn&rsquo;t sign up? Ignore this email, or write to{" "}
            <a
              href="mailto:support@talentnext.com"
              className="tn-link"
              style={{ color: BODY }}
            >
              support@talentnext.com
            </a>
            .
          </p>
        </td>
      </tr>
    </EmailShell>
  );
}
