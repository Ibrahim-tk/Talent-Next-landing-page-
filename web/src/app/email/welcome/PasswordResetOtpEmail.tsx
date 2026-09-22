import { BODY, CodeBlock, EmailRule, EmailShell, FONT, INK } from "./EmailShell";

/**
 * Password reset. The only one — a link version stood beside this while it
 * was undecided which the product would send, and it has been removed.
 *
 * The copy is the supplied product copy, with the six-digit code standing
 * where the link version put its button. Where that one named the mechanism
 * this one names the code: "this code can be used once and expires in 60
 * minutes", and a closing promise about the code rather than about a link.
 * The paste-this-URL fallback went with the button, there being no URL.
 *
 * No button and no link anywhere on the sheet, which is the real advantage
 * of resetting by code: a forwarded copy has nothing in it to click.
 */

/* Placeholders the sending provider substitutes. */
const recipientEmail = "dsngr.og@company.com";
const username = "{username}";

/**
 * SIX DIGITS, UNBROKEN. A grouping space travels with the code when it is
 * selected and pasted, and fails validation at the other end. `CodeBlock`
 * sets it at wide tracking, which is what keeps the digits separable by eye
 * without putting a character between them.
 */
const code = "482913";

export function PasswordResetOtpEmail() {
  return (
    <EmailShell recipientEmail={recipientEmail}>
      <tr>
        <td className="tn-pad" style={{ padding: "28px 40px 0" }}>
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
            Reset your password
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
            <br />
            If you made this request, choose a new password below.
          </p>
        </td>
      </tr>

      {/* Where the link version puts its button. */}
      <tr>
        <td className="tn-pad" style={{ padding: "36px 40px 0" }}>
          <CodeBlock code={code} />
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
            This code can be used once and expires in 60 minutes.
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
              fontSize: "16px",
              lineHeight: "26px",
              color: BODY,
            }}
          >
            We will never ask you for your password or this code.
          </p>
        </td>
      </tr>
    </EmailShell>
  );
}
