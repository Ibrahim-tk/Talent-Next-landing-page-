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
 * Password reset, by code.
 *
 * This replaced a mobile verification template — a phone-number confirmation
 * with the SMS printed underneath it. There is no such send: the product
 * verifies a reset by emailing a six-digit code to the address on file, and
 * a template demonstrating an SMS nobody sends was showing reviewers a flow
 * that does not exist.
 *
 * It is the code half of the reset. `PasswordResetEmail` is the link half,
 * and the two are alternative mechanics for the same request rather than two
 * steps of one: whichever the product actually sends, the other should come
 * out rather than sit in the set as a template someone might wire up by
 * mistake.
 *
 * Written to the conventions a reset is held to, which are stricter than an
 * ordinary transactional mail:
 *
 *   - The code, and nothing else that could be acted on. No button and no
 *     link, so there is nothing in the sheet for a forwarded copy to be
 *     clicked through.
 *   - A neutral tone. It never suggests the account was compromised — the
 *     request is usually routine, and alarm is what phishing imitates.
 *   - A short, stated expiry and an explicit single-use note.
 *   - The "you didn't ask for this" line says plainly that nothing has
 *     changed yet and that ignoring the mail is a complete response.
 *   - NO sign-in context. The link reset carries a time/location/device
 *     table and the super admin code carries a fuller one, because there the
 *     reader is being asked to judge a request before acting on it. Here they
 *     are not: a code they did not request is answered by ignoring it, and
 *     three rows of metadata above that instruction is a paragraph of reading
 *     between the reader and the six digits they opened the mail for.
 *   - A standing promise that support never asks for the code, which gives
 *     the recipient a rule to judge the next mail by.
 */

/* Placeholders the sending provider substitutes. */
const recipientEmail = "dsngr.og@company.com";

/**
 * SIX DIGITS, UNBROKEN. It used to be written "482 913" — a literal space
 * splitting it into two groups of three. Grouping is a convention for numbers
 * that are read aloud or copied by hand, and this one is neither: it is
 * selected, copied and pasted into a single field, and the space travels with
 * it and fails validation. The `CodeBlock` sets it at wide tracking, which is
 * what keeps the digits separable by eye without putting a character between
 * them.
 */
const code = "482913";

export function PasswordResetOtpEmail() {
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
            Password reset
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
            Your reset code.
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
            Enter this code to set a new password. It expires in 10 minutes
            and works once.
          </p>
        </td>
      </tr>

      <tr>
        <td className="tn-pad" style={{ padding: "32px 40px 0" }}>
          <CodeBlock code={code} />
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
            Didn&rsquo;t ask for this? Ignore this email &mdash; nothing has
            changed. We will never ask you to share this code.
          </p>
        </td>
      </tr>
    </EmailShell>
  );
}
