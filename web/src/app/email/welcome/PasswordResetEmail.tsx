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
 * Password reset.
 *
 * Written to the conventions this kind of mail is held to, because a reset
 * email is a security control as much as a message:
 *
 *   - One action, and nothing else that looks like one. Every competing link
 *     is set as small print so the reset button cannot be mistaken.
 *   - The tone is neutral. It never says an account was compromised, since
 *     the request may well be routine and alarm is what phishing imitates.
 *   - A short, stated expiry (60 minutes) and an explicit single-use note.
 *   - The "you didn't ask for this" line says plainly that *nothing has
 *     changed yet* and that ignoring the mail is a complete response —
 *     the sentence that stops a recipient clicking out of anxiety.
 *   - Request context (time, approximate location, device) so a recipient
 *     can tell their own request from someone else's. Hedged as approximate,
 *     because IP geolocation routinely is.
 *   - A standing promise that support never asks for a password, which gives
 *     the recipient a rule to judge the next mail by.
 *   - The address is never echoed as a "username", the new password is never
 *     suggested or contained here, and the link carries a single-use token.
 */

/* Placeholders the sending provider substitutes. */
const recipientEmail = "dsngr.og@company.com";
const username = "{username}";
const resetUrl = "https://app.talentnext.com/reset?token=RESET_TOKEN";

export function PasswordResetEmail() {
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
            Reset your TALENTnext password
          </h1>
          <p
            className="tn-lead"
            style={{
              margin: "20px 0 0",
              fontFamily: FONT,
              fontSize: "16px",
              lineHeight: "26px",
              color: BODY,
            }}
          >
            Hi {username},
          </p>
          <p
            className="tn-lead"
            style={{
              margin: "20px 0 0",
              fontFamily: FONT,
              fontSize: "16px",
              lineHeight: "26px",
              color: BODY,
            }}
          >
            We received a request to reset your TALENTnext password.
          </p>
          <p
            className="tn-lead"
            style={{
              margin: "20px 0 0",
              fontFamily: FONT,
              fontSize: "16px",
              lineHeight: "26px",
              color: BODY,
            }}
          >
            If you made this request, choose a new password below.
          </p>
        </td>
      </tr>

      <tr>
        <td className="tn-pad" style={{ padding: "36px 40px 0" }}>
          <EmailButton href={resetUrl} label="Set new password" />
        </td>
      </tr>

      <tr>
        <td className="tn-pad" style={{ padding: "36px 40px 0" }}>
          <p
            style={{
              margin: 0,
              fontFamily: FONT,
              fontSize: "16px",
              lineHeight: "26px",
              color: BODY,
            }}
          >
            This link can be used once and expires in 60 minutes.
          </p>
          <p
            style={{
              margin: "20px 0 0",
              fontFamily: FONT,
              fontSize: "16px",
              lineHeight: "26px",
              color: BODY,
            }}
          >
            If you didn&rsquo;t request a password reset, you can safely ignore
            this email. Your password will remain unchanged.
          </p>
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
            If the button doesn&rsquo;t open:
            <br />
            <a
              href={resetUrl}
              className="tn-link"
              style={{ color: BODY, wordBreak: "break-all" }}
            >
              {resetUrl}
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
            We will never ask you for your password or this link.
          </p>
        </td>
      </tr>
    </EmailShell>
  );
}
