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

export function WelcomeEmail() {
  return (
    <EmailShell recipientEmail={recipientEmail}>
      <tr>
        <td className="tn-pad" style={{ padding: "56px 40px 0" }}>
          <h1
            className="tn-h1"
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
            className="tn-lead"
            style={{
              margin: "20px 0 0",
              fontFamily: FONT,
              fontSize: "16px",
              lineHeight: "28px",
              color: BODY,
            }}
          >
            Confirm <span style={{ color: INK }}>{recipientEmail}</span> to
            activate your account.
          </p>
        </td>
      </tr>

      <tr>
        <td className="tn-pad" style={{ padding: "36px 40px 0" }}>
          <EmailButton href={verifyUrl} label="Verify email address" />
        </td>
      </tr>

      <tr>
        <td className="tn-pad" style={{ padding: "44px 40px 0" }}>
          <EmailRule />
        </td>
      </tr>

      <tr>
        <td className="tn-pad" style={{ padding: "24px 40px 48px" }}>
          <p
            style={{
              margin: 0,
              fontFamily: FONT,
              fontSize: "14px",
              lineHeight: "22px",
              color: MUTED,
            }}
          >
            Expires in 24 hours. If the button doesn&rsquo;t open:
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
            Didn&rsquo;t sign up? Ignore this email.
          </p>
        </td>
      </tr>
    </EmailShell>
  );
}
