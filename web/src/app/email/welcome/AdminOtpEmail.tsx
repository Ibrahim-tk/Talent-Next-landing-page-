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
/* Six digits, unbroken — the space that used to group them travels with the
   code when it is copied and fails validation at the other end. `CodeBlock`'s
   tracking is what keeps them separable by eye. */
const code = "748210";

/**
 * Three rows: when, where, what from.
 *
 * It listed five. The IP address and the console hostname came out because
 * neither is a fact the reader can judge — an admin looking at 203.0.113.42
 * cannot tell whether it is theirs, and the console is the same value on
 * every one of these sends, so it was a constant printed as if it were
 * evidence. Time, place and device are the three a person can check against
 * their own morning, and the shorter table is read where the longer one was
 * skipped.
 */
const attemptMeta = [
  ["Attempted", "21 Sep 2026, 14:32 GMT"],
  ["Approximate location", "Lahore, Pakistan"],
  ["Device", "Chrome 141 on macOS"],
];

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
            Your sign-in code.
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
            Enter this in the window you already have open. Expires in five
            minutes.
          </p>
        </td>
      </tr>

      <tr>
        <td className="tn-pad" style={{ padding: "32px 40px 0" }}>
          <CodeBlock code={code} />
        </td>
      </tr>

      {/* The attempt, in full — the reason this mail is worth reading even
          when the code is expected. */}
      <tr>
        <td className="tn-pad" style={{ padding: "36px 40px 0" }}>
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
                    className="tn-meta-term"
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
                    className="tn-meta-value"
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
        <td className="tn-pad" style={{ padding: "32px 40px 0" }}>
          <p
            style={{
              margin: 0,
              fontFamily: FONT,
              fontSize: "16px",
              lineHeight: "28px",
              color: BODY,
            }}
          >
            <span style={{ color: INK }}>If this wasn&rsquo;t you</span>,
            don&rsquo;t enter the code &mdash; tell security now at{" "}
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
