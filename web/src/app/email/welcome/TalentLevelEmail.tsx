import {
  BODY,
  EmailButton,
  EmailRule,
  EmailShell,
  FONT,
  INK,
  ROSE,
} from "./EmailShell";

/**
 * Talent Level assigned.
 *
 * Sent once the TALENTnext Agent has finished the interview and placed the
 * candidate on the 15-level ladder. One fact to land — which level — so the
 * ladder gets the panel and the sheet's one action takes them to the full
 * breakdown.
 */

/* Placeholders the sending provider substitutes. */
const recipientEmail = "dsngr.og@company.com";
const username = "{username}";
/* Three tracks of five levels each — Explorer → Builder → Trailblazer — the
   same ladder the candidate portal shows. `levelIndex` is 0-based over all 15. */
const TRACKS = [
  { name: "Explorer", code: "E" },
  { name: "Builder", code: "B" },
  { name: "Trailblazer", code: "T" },
] as const;
const LEVELS_PER_TRACK = 5;
const TOTAL_LEVELS = TRACKS.length * LEVELS_PER_TRACK;
const levelIndex = 2; /* E3 */
const resultsUrl = "https://tn-orcin.vercel.app/candidate#assessed/dashboard";

const track = TRACKS[Math.floor(levelIndex / LEVELS_PER_TRACK)];
const levelCode = `${track.code}${(levelIndex % LEVELS_PER_TRACK) + 1}`;

const PANEL = "#111111"; /* --gl-color-surface-inverse */
const CELL = "#2A2A2A";
const CELL_DONE = "#4A2522";
const ON_DARK = "#FFFFFF";
const ON_DARK_MUTED = "#A3A7AE";

const paragraph = {
  margin: "20px 0 0",
  fontFamily: FONT,
  fontSize: "16px",
  lineHeight: "26px",
  color: BODY,
} as const;

/**
 * The ladder: fifteen cells on a dark panel, levels behind the candidate in a
 * dim rose, their own level in full rose, the rest unlit, with the three
 * track names under the first cell of each track. All table cells, so it
 * survives image blocking; the gradient is a progressive extra over a solid
 * `bgcolor` for the clients that drop CSS backgrounds.
 */
function LadderPanel() {
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
        <tr>
          <td
            {...{ bgcolor: PANEL }}
            className="tn-ladder"
            style={{
              backgroundColor: PANEL,
              backgroundImage:
                "radial-gradient(120% 140% at 85% 0%, rgba(249,66,58,0.22) 0%, rgba(17,17,17,0) 60%)",
              padding: "28px 24px 24px",
              fontFamily: FONT,
            }}
          >
            <table
              role="presentation"
              cellPadding={0}
              cellSpacing={0}
              border={0}
              width="100%"
              style={{ borderCollapse: "collapse" }}
            >
              <tbody>
                <tr>
                  <td valign="bottom">
                    <p
                      style={{
                        margin: 0,
                        fontSize: "28px",
                        lineHeight: "34px",
                        fontWeight: 400,
                        color: ON_DARK,
                      }}
                    >
                      {track.name} <span style={{ color: ROSE }}>{levelCode}</span>
                    </p>
                  </td>
                  <td valign="bottom" align="right" style={{ whiteSpace: "nowrap" }}>
                    <p style={{ margin: 0, fontSize: "18px", lineHeight: "24px", color: ON_DARK }}>
                      {levelIndex + 1}
                      <span style={{ fontSize: "14px", color: ON_DARK_MUTED }}> of {TOTAL_LEVELS}</span>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Cells */}
            <table
              role="presentation"
              cellPadding={0}
              cellSpacing={0}
              border={0}
              width="100%"
              style={{ borderCollapse: "separate", borderSpacing: "2px 0", marginTop: "24px", tableLayout: "fixed" }}
            >
              <tbody>
                <tr>
                  {Array.from({ length: TOTAL_LEVELS }, (_, i) => {
                    const t = TRACKS[Math.floor(i / LEVELS_PER_TRACK)];
                    const isCurrent = i === levelIndex;
                    const bg = isCurrent ? ROSE : i < levelIndex ? CELL_DONE : CELL;
                    return (
                      <td
                        key={i}
                        align="center"
                        {...{ bgcolor: bg }}
                        className="tn-ladder-cell"
                        style={{
                          backgroundColor: bg,
                          padding: "8px 0",
                          fontSize: "11px",
                          lineHeight: "14px",
                          fontWeight: isCurrent ? 700 : 400,
                          color: isCurrent ? ON_DARK : ON_DARK_MUTED,
                        }}
                      >
                        {t.code}
                        {(i % LEVELS_PER_TRACK) + 1}
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  {TRACKS.map((t) => (
                    <td
                      key={t.code}
                      colSpan={LEVELS_PER_TRACK}
                      style={{
                        paddingTop: "12px",
                        fontSize: "12px",
                        lineHeight: "16px",
                        color: t.code === track.code ? ON_DARK : ON_DARK_MUTED,
                      }}
                    >
                      {t.name}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export function TalentLevelEmail() {
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
            Your Talent Level is in
          </h1>
          <p className="tn-lead" style={paragraph}>
            Hi {username},
          </p>
          <p className="tn-lead" style={paragraph}>
            Based on your interview, you&rsquo;re at {track.name} {levelCode}.
          </p>
        </td>
      </tr>

      <tr>
        <td className="tn-pad" style={{ padding: "32px 40px 0" }}>
          <LadderPanel />
        </td>
      </tr>

      <tr>
        <td className="tn-pad" style={{ padding: "32px 40px 0" }}>
          <p style={{ ...paragraph, margin: 0 }}>
            Three tracks, five levels each. See your next steps on your
            dashboard.
          </p>
        </td>
      </tr>

      <tr>
        <td className="tn-pad" style={{ padding: "36px 40px 0" }}>
          <EmailButton href={resultsUrl} label="View your results" />
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
            Questions about your level? Reply to this email and your
            TALENTnext Agent will get back to you.
          </p>
        </td>
      </tr>
    </EmailShell>
  );
}
