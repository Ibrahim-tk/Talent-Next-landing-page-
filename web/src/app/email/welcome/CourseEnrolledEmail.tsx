import {
  BODY,
  EmailButton,
  EmailRule,
  EmailShell,
  FONT,
  INK,
  MUTED,
  RULE,
} from "./EmailShell";

/**
 * Course enrolment confirmed.
 *
 * Sent the moment someone enrols in a course. It confirms the enrolment and
 * answers the one thing they will want next — when it starts — in a short
 * details panel, then sends them to the dashboard where the course lives.
 */

/* Placeholders the sending provider substitutes. */
const recipientEmail = "dsngr.og@company.com";
const username = "{username}";
const courseName = "Leading Through Change";
const dashboardUrl = "https://tn-orcin.vercel.app/candidate";

const DETAILS = [
  { label: "Course", value: courseName },
  { label: "Starts", value: "Monday, October 12, 2026" },
  { label: "Duration", value: "6 weeks" },
  { label: "Format", value: "Online, self-paced with weekly live sessions" },
];

const paragraph = {
  margin: "20px 0 0",
  fontFamily: FONT,
  fontSize: "16px",
  lineHeight: "26px",
  color: BODY,
} as const;

function DetailsPanel() {
  return (
    <table
      role="presentation"
      cellPadding={0}
      cellSpacing={0}
      border={0}
      width="100%"
      style={{ borderCollapse: "collapse" }}
    >
      <tbody>
        {DETAILS.map((row, i) => (
          <tr key={row.label}>
            <td
              width={120}
              valign="top"
              style={{
                padding: "14px 0",
                borderTop: i === 0 ? "none" : `1px solid ${RULE}`,
                fontFamily: FONT,
                fontSize: "14px",
                lineHeight: "22px",
                color: MUTED,
              }}
            >
              {row.label}
            </td>
            <td
              valign="top"
              style={{
                padding: "14px 0 14px 16px",
                borderTop: i === 0 ? "none" : `1px solid ${RULE}`,
                fontFamily: FONT,
                fontSize: "16px",
                lineHeight: "22px",
                color: INK,
              }}
            >
              {row.value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function CourseEnrolledEmail() {
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
            You&rsquo;re enrolled
          </h1>
          <p className="tn-lead" style={paragraph}>
            Hi {username},
          </p>
          <p className="tn-lead" style={paragraph}>
            You&rsquo;re confirmed for <strong style={{ color: INK }}>{courseName}</strong>.
            Here are the details to keep handy.
          </p>
        </td>
      </tr>

      <tr>
        <td className="tn-pad" style={{ padding: "32px 40px 0" }}>
          <DetailsPanel />
        </td>
      </tr>

      <tr>
        <td className="tn-pad" style={{ padding: "36px 40px 0" }}>
          <EmailButton href={dashboardUrl} label="Go to your dashboard" />
        </td>
      </tr>

      <tr>
        <td className="tn-pad" style={{ padding: "24px 40px 0" }}>
          <p style={{ ...paragraph, margin: 0 }}>
            Your course materials and session links will appear on your
            dashboard before the start date.
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
          <p style={{ ...paragraph, margin: 0 }}>
            Can&rsquo;t make the start date? You can change or cancel your
            enrolment from your dashboard.
          </p>
        </td>
      </tr>
    </EmailShell>
  );
}
