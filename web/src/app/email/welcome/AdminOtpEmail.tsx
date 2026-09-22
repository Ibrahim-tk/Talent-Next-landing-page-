import {
  BODY,
  CodeBlock,
  EmailRule,
  EmailShell,
  FONT,
  INK,
  MUTED,
  RULE,
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
const code = "748 210";

const attemptMeta = [
  ["Attempted", "21 Sep 2026, 14:32 GMT"],
  ["IP address", "203.0.113.42"],
  ["Approximate location", "Lahore, Pakistan"],
  ["Device", "Chrome 141 on macOS"],
  ["Console", "admin.talentnext.com"],
];

export function AdminOtpEmail() {
  return (
    <EmailShell recipientEmail={recipientEmail}>
      <tr>
        <td style={{ padding: "48px 40px 0" }}>
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
            Super admin &middot; Sign-in code
          </p>
          <h1
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
            Your sign-in code.
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
            Enter this in the window you already have open. It expires in five
            minutes and works once.
          </p>
        </td>
      </tr>

      <tr>
        <td style={{ padding: "32px 40px 0" }}>
          <CodeBlock code={code} />
        </td>
      </tr>

      {/* The attempt, in full — the reason this mail is worth reading even
          when the code is expected. */}
      <tr>
        <td style={{ padding: "36px 40px 0" }}>
          <table
            role="presentation"
            cellPadding={0}
            cellSpacing={0}
            border={0}
            width="100%"
            style={{ borderCollapse: "collapse" }}
          >
            <tbody>
              {attemptMeta.map(([term, value]) => (
                <tr key={term}>
                  <td
                    style={{
                      borderTop: `1px solid ${RULE}`,
                      padding: "13px 0",
                      fontFamily: FONT,
                      fontSize: "14px",
                      lineHeight: "22px",
                      color: MUTED,
                      width: "42%",
                    }}
                  >
                    {term}
                  </td>
                  <td
                    align="right"
                    style={{
                      borderTop: `1px solid ${RULE}`,
                      padding: "13px 0",
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
            </tbody>
          </table>
        </td>
      </tr>

      <tr>
        <td style={{ padding: "32px 40px 0" }}>
          <p
            style={{
              margin: 0,
              fontFamily: FONT,
              fontSize: "16px",
              lineHeight: "28px",
              color: BODY,
            }}
          >
            <span style={{ color: INK }}>If this wasn&rsquo;t you</span>, treat
            it as an attempt on the console: don&rsquo;t enter the code, lock
            the account from any signed-in session, and tell security now at{" "}
            <a
              href="mailto:security@talentnext.com"
              className="tn-link"
              style={{ color: INK }}
            >
              security@talentnext.com
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
            This code is required at every sign-in to the admin console. No one
            at TALENTnext will ever ask you to read it out, forward it or type
            it into a page reached from a link. There is deliberately no link
            in this email.
          </p>
        </td>
      </tr>
    </EmailShell>
  );
}
