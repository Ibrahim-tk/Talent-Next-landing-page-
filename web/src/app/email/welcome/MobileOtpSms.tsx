import {
  BODY,
  CodeBlock,
  EmailRule,
  EmailShell,
  FONT,
  INK,
  MUTED,
  RULE,
  SUNKEN,
} from "./EmailShell";

/**
 * Mobile verification code, for a new user confirming their phone number.
 *
 * The code goes out twice: as an SMS to the number being verified, and as
 * this email to the address already on file, so a mistyped digit in the
 * number doesn't strand the sign-up. That is why it wears the same sheet as
 * the rest — rose cap, masthead, black footer — rather than standing on its
 * own. The code is the hero; the SMS is shown underneath, verbatim, so the
 * two readings of the same message can be checked against each other.
 *
 * The SMS copy follows the conventions these are held to:
 *
 *   - The brand is named first, so the message is recognisable in a
 *     notification preview that may show only one line.
 *   - The code is the second thing read, in digits, unbroken.
 *   - No link. A verification SMS that contains a URL trains people to tap
 *     links in texts, which is exactly what smishing relies on.
 *   - A short stated expiry, and the "we will never ask for this code" line.
 *   - It stays inside one 160-character GSM-7 segment, so it sends as one
 *     message and arrives whole. The counter below tracks that.
 *
 * The last line, `@domain #code`, is the autofill hint Android and iOS read
 * to offer the code straight into the field; phones hide it from the reader.
 */

/* Placeholders the sending provider substitutes. */
const recipientEmail = "dsngr.og@company.com";
const maskedNumber = "+92 3•• ••• ••82";
const code = "482 913";
const codeDigits = code.replace(/\s/g, "");

const smsBody = `TALENTnext: ${codeDigits} is your verification code. It expires in 10 minutes. We will never ask you for it.`;

const notes = [
  ["Sender ID", "TALENTNEXT"],
  ["Expiry", "10 minutes, single use"],
  ["Resend", "After 60 seconds, 3 per hour"],
];

export function MobileOtpSms() {
  const segments = Math.ceil(smsBody.length / 160);

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
            Mobile verification
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
            Your verification code.
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
            Enter this to confirm{" "}
            <span style={{ color: INK }}>{maskedNumber}</span>. It expires in
            10 minutes and works once.
          </p>
        </td>
      </tr>

      <tr>
        <td style={{ padding: "32px 40px 0" }}>
          <CodeBlock code={code} />
        </td>
      </tr>

      {/* The SMS, verbatim — the same code as it lands on the phone. */}
      <tr>
        <td style={{ padding: "36px 40px 0" }}>
          <p
            style={{
              margin: "0 0 12px",
              fontFamily: FONT,
              fontSize: "11px",
              lineHeight: "16px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            Also sent by SMS
          </p>
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
              <tr>
                <td
                  style={{
                    padding: "22px 24px",
                    fontFamily: FONT,
                    fontSize: "15px",
                    lineHeight: "26px",
                    color: INK,
                  }}
                >
                  {smsBody}
                  <br />
                  <span style={{ color: MUTED }}>
                    @talentnext.com #{codeDigits}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <p
            style={{
              margin: "10px 0 0",
              fontFamily: FONT,
              fontSize: "13px",
              lineHeight: "20px",
              color: MUTED,
            }}
          >
            {smsBody.length} characters &middot; {segments} segment
            {segments === 1 ? "" : "s"} &middot; the last line is the autofill
            hint, which phones hide
          </p>
        </td>
      </tr>

      {/* Delivery rules. */}
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
              {notes.map(([term, value]) => (
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
            Didn&rsquo;t ask for this? Someone may have typed your number by
            mistake &mdash; ignore it, or tell us at{" "}
            <a
              href="mailto:support@talentnext.com"
              className="tn-link"
              style={{ color: BODY }}
            >
              support@talentnext.com
            </a>
            . We will never ask you to read this code out or forward it.
          </p>
        </td>
      </tr>
    </EmailShell>
  );
}
