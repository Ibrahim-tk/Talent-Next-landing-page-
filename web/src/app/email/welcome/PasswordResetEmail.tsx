import {
  BODY,
  EmailButton,
  EmailRule,
  EmailShell,
  FONT,
  INK,
  MUTED,
  RULE,
  SUNKEN,
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
const resetUrl = "https://app.talentnext.com/reset?token=RESET_TOKEN";

/* Request context, filled from the request that triggered the send. */
const requestMeta = [
  ["Requested", "21 Sep 2026, 14:32 GMT"],
  ["Approximate location", "Lahore, Pakistan"],
  ["Device", "Chrome on macOS"],
];

export function PasswordResetEmail() {
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
            Reset your password.
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
            Someone asked to reset the password for{" "}
            <span style={{ color: INK }}>{recipientEmail}</span>. If that was
            you, choose a new one below. The link works once and expires in 60
            minutes.
          </p>
        </td>
      </tr>

      <tr>
        <td style={{ padding: "36px 40px 0" }}>
          <EmailButton href={resetUrl} label="Choose a new password" />
        </td>
      </tr>

      {/* Request context — the panel that lets a recipient recognise their
          own request, or fail to. */}
      <tr>
        <td style={{ padding: "36px 40px 0" }}>
          <table
            role="presentation"
            cellPadding={0}
            cellSpacing={0}
            border={0}
            width="100%"
            style={{
              borderCollapse: "collapse",
              backgroundColor: SUNKEN,
              border: `1px solid ${RULE}`,
            }}
          >
            <tbody>
              {requestMeta.map(([term, value], index) => (
                <tr key={term}>
                  <td
                    style={{
                      padding: index === 0 ? "18px 24px 6px" : "0 24px 6px",
                      fontFamily: FONT,
                      fontSize: "14px",
                      lineHeight: "22px",
                      color: MUTED,
                    }}
                  >
                    {term}
                  </td>
                  <td
                    align="right"
                    style={{
                      padding: index === 0 ? "18px 24px 6px" : "0 24px 6px",
                      fontFamily: FONT,
                      fontSize: "14px",
                      lineHeight: "22px",
                      color: INK,
                    }}
                  >
                    {value}
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={2} style={{ height: "12px", fontSize: 0 }}>
                  &nbsp;
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>

      <tr>
        <td style={{ padding: "36px 40px 0" }}>
          <p
            style={{
              margin: 0,
              fontFamily: FONT,
              fontSize: "16px",
              lineHeight: "28px",
              color: BODY,
            }}
          >
            <span style={{ color: INK }}>Didn&rsquo;t request this?</span>{" "}
            Ignore this email. Your password stays as it is and no one can
            change it without the link above.
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
            If the button doesn&rsquo;t open, paste this into your browser:
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
            TALENTnext will never ask for your password, a reset link or a
            verification code &mdash; not by email, phone or chat. If something
            looks wrong, write to{" "}
            <a
              href="mailto:security@talentnext.com"
              className="tn-link"
              style={{ color: BODY }}
            >
              security@talentnext.com
            </a>
            .
          </p>
        </td>
      </tr>
    </EmailShell>
  );
}
