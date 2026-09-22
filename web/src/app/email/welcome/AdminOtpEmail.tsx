import {
  BODY,
  CodeBlock,
  EmailRule,
  EmailShell,
  FONT,
  INK,
  MUTED,
} from "./EmailShell";

/**
 * Super-admin sign-in code, sent on every single sign-in.
 *
 * A privileged step-up code, so it is stricter than the user-facing ones:
 *
 *   - No button and no link anywhere in the body. A code mail that contains
 *     a clickable "sign in" is a phishing template waiting to be copied; the
 *     admin already has the session open and types the code into it.
 *   - The code is live text on a panel, never an image, because images are
 *     blocked by default and a picture of a code cannot be copied.
 *   - A tight five-minute expiry and a one-attempt-per-code rule, both
 *     stated, so an unexpected mail is legible as an event.
 *   - The sign-in attempt's context is listed in full, including the IP:
 *     an admin is the one recipient who can act on that detail.
 *   - The "wasn't you" path is an instruction, not reassurance. For an
 *     ordinary user, ignoring the mail is the right answer; for a super
 *     admin it is not, so this one says to lock the account and tell
 *     security immediately.
 *
 * Send this to the admin's registered address only, never to an address
 * supplied at sign-in, and log every issue and every use.
 */

/* Placeholders the sending provider substitutes. */
const recipientEmail = "admin@talentnext.com";
const username = "{username}";
/* Six digits, unbroken — the space that used to group them travels with the
   code when it is copied and fails validation at the other end. `CodeBlock`'s
   tracking is what keeps them separable by eye. */
const code = "748210";

export function AdminOtpEmail() {
  return (
    <EmailShell recipientEmail={recipientEmail}>
      <tr>
        <td className="tn-pad" style={{ padding: "48px 40px 0" }}>
          <p
            style={{
              margin: 0,
              fontFamily: FONT,
              fontSize: "11px",
              lineHeight: "16px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            Super admin
          </p>
          <h1
            className="tn-h1"
            style={{
              margin: "14px 0 0",
              fontFamily: FONT,
              fontSize: "36px",
              lineHeight: "44px",
              fontWeight: 400,
              letterSpacing: "-0.01em",
              color: INK,
            }}
          >
            Your TALENTnext sign-in code
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
            Use the code below to complete your TALENTnext admin sign-in:
          </p>
        </td>
      </tr>

      <tr>
        <td className="tn-pad" style={{ padding: "32px 40px 0" }}>
          <CodeBlock code={code} />
        </td>
      </tr>

      <tr>
        <td className="tn-pad" style={{ padding: "32px 40px 0" }}>
          <p
            style={{
              margin: 0,
              fontFamily: FONT,
              fontSize: "16px",
              lineHeight: "26px",
              color: BODY,
            }}
          >
            This code expires in 5 minutes and can only be used once.
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
            If you didn&rsquo;t try to sign in, don&rsquo;t share or enter this
            code. You can safely ignore this email.
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
            We will never ask you to read this code out or forward it. There
            is deliberately no link in this email.
          </p>
        </td>
      </tr>
    </EmailShell>
  );
}
