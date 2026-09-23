import {
  BODY,
  EmailButton,
  EmailRule,
  EmailShell,
  FONT,
  INK,
} from "./EmailShell";

/**
 * Invitation / set your password.
 *
 * Sent when a super admin creates a role and adds someone's email to it. The
 * account exists but has no password yet, so — as with the welcome mail —
 * there is exactly one action on the sheet: set it.
 *
 * The invite names who sent it and the role it grants, because an invitation
 * from nobody in particular is indistinguishable from a phishing lure. The
 * link lives for 7 days rather than the welcome mail's 24 hours: the
 * recipient did not ask for this and may not open it the same day.
 */

/* Placeholders the sending provider substitutes. */
const recipientEmail = "new.member@company.com";
const username = "{username}";
const inviterName = "{inviterName}";
const roleName = "{roleName}";
const setPasswordUrl = "https://app.talentnext.com/set-password?token=INVITE_TOKEN";

export function AdminInviteEmail() {
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
            You&rsquo;ve been invited to TALENTnext
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
            {inviterName} has invited you to join TALENTnext as{" "}
            <strong style={{ fontWeight: 700, color: INK }}>{roleName}</strong>.
            <br />
            Set your password to activate your account.
          </p>
        </td>
      </tr>

      <tr>
        <td className="tn-pad" style={{ padding: "36px 40px 0" }}>
          <EmailButton href={setPasswordUrl} label="Set Password" />
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
            Once your password is set, you can sign in with this email address
            and get started.
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
            This link expires in 7 days.
            <br />
            If you weren&rsquo;t expecting this invitation, you can safely
            ignore this email.
          </p>
        </td>
      </tr>
    </EmailShell>
  );
}
