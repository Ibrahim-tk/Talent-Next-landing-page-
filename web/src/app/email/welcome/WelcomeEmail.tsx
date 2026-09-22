import {
  BODY,
  EmailButton,
  EmailRule,
  EmailShell,
  FONT,
  INK,
} from "./EmailShell";

/**
 * Welcome / set your password.
 *
 * Sent the moment an account is created. One job — set the first password —
 * so there is exactly one action on the sheet.
 *
 * It used to be an address verification, with a "Verify email address"
 * button. The supplied copy makes it a password set instead: the account
 * already exists and is waiting on a password, and receiving the mail at the
 * address is itself the proof the address is good, so a separate verification
 * step was a click that confirmed something the next click confirms anyway.
 *
 * The copy in this file is supplied product copy and is reproduced verbatim.
 */

/* Placeholders the sending provider substitutes. */
const recipientEmail = "dsngr.og@company.com";
const username = "{username}";
const setPasswordUrl = "https://app.talentnext.com/set-password?token=INVITE_TOKEN";

export function WelcomeEmail() {
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
            Welcome to TALENTnext
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
            Welcome to TALENTnext.
            <br />
            Your account is ready. Set your password to activate your account.
          </p>
        </td>
      </tr>

      <tr>
        <td className="tn-pad" style={{ padding: "36px 40px 0" }}>
          <EmailButton href={setPasswordUrl} label="Set your password" />
        </td>
      </tr>

      <tr>
        <td className="tn-pad" style={{ padding: "24px 40px 0" }}>
          <p
            style={{
              margin: 0,
              fontFamily: FONT,
              fontSize: "16px",
              lineHeight: "26px",
              color: BODY,
            }}
          >
            Once your password is set, you can sign in and begin your
            TALENTnext journey.
          </p>
        </td>
      </tr>

      <tr>
        <td className="tn-pad" style={{ padding: "36px 40px 0" }}>
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
            This link expires in 24 hours.
            <br />
            If you weren&rsquo;t expecting this email, you can safely ignore
            it.
          </p>
        </td>
      </tr>
    </EmailShell>
  );
}
