import type { ReactNode } from "react";

/**
 * The chrome every transactional email shares: the rose cap, the ruled
 * masthead, and the black footer with the social row.
 *
 * These are *emails*, not pages, so everything here is written the way an
 * email client needs it: nested tables, every style inline, no CSS modules,
 * no custom properties, no webfonts. Each template supplies only its body;
 * the frame is defined once here so the four cannot drift apart.
 *
 * It is the site's design language rebuilt in that constrained vocabulary:
 * a white sheet, hairline rules at #F0F0F2, ink headings that are dark but
 * never black, body copy at 16px/#5F6672, the rose accent spent sparingly,
 * and the black bar the site uses for its primary action.
 */

/* The palette, flattened from the Gridline tokens an email cannot read. */
export const ROSE = "#F9423A"; /* --gl-rose-600 */
export const INK = "#23282F"; /* --gl-neutral-790, heading ink */
export const BODY = "#5F6672"; /* --gl-neutral-675, body copy */
export const MUTED = "#69707C"; /* --gl-neutral-640, captions */
export const RULE = "#F0F0F2"; /* --gl-color-border-rule */
export const SUNKEN = "#F8F9FA"; /* --gl-color-surface-sunken */
export const BLACK = "#000000"; /* --gl-color-action-primary-bg */
const FOOTER = "#111111"; /* --gl-neutral-900, inverse surface */
const FOOTER_RULE = "#1E1E1E"; /* --gl-color-border-inverse */
export const FONT = '"Helvetica Neue", Helvetica, Arial, sans-serif';

/* The social row. Glyphs are inline SVG so the preview needs no assets; for
   a real send, swap each for a hosted 20x20 white PNG, since a few clients
   (Outlook desktop, Gmail's web app) drop inline SVG. */
const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/talentnext",
    path: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21h-4V9Z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/talentnext",
    path: "M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 3.05A6.75 6.75 0 1 0 18.75 12 6.75 6.75 0 0 0 12 5.25Zm0 11.13A4.38 4.38 0 1 1 16.38 12 4.38 4.38 0 0 1 12 16.38Zm6.99-11.4a1.58 1.58 0 1 1-1.58-1.58 1.58 1.58 0 0 1 1.58 1.58Z",
  },
  {
    label: "X",
    href: "https://x.com/talentnext",
    path: "M17.53 3h3.2l-7 8 8.23 10h-6.44l-5.05-6.1L4.7 21H1.5l7.49-8.56L1.1 3h6.6l4.56 5.6L17.53 3Zm-1.12 16.1h1.77L7.72 4.8H5.82l10.59 14.3Z",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@talentnext",
    path: "M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.27 5 12 5 12 5s-6.27 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.73 19 12 19 12 19s6.27 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15.1V8.9l5.2 3.1-5.2 3.1Z",
  },
];

/** The black primary action, as a table so Outlook renders the fill. */
export function EmailButton({ href, label }: { href: string; label: string }) {
  return (
    <table
      role="presentation"
      cellPadding={0}
      cellSpacing={0}
      border={0}
      style={{ borderCollapse: "collapse" }}
    >
      <tbody>
        <tr>
          <td align="center" style={{ backgroundColor: BLACK }}>
            <a
              href={href}
              className="tn-btn"
              style={{
                display: "block",
                backgroundColor: BLACK,
                padding: "17px 40px",
                fontFamily: FONT,
                fontSize: "15px",
                lineHeight: "20px",
                color: "#FFFFFF",
                textDecoration: "none",
              }}
            >
              {label}
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

/** A full-width hairline, drawn as its own row so padding stays predictable. */
export function EmailRule() {
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
            style={{
              borderTop: `1px solid ${RULE}`,
              fontSize: 0,
              lineHeight: 0,
              height: "1px",
            }}
          >
            &nbsp;
          </td>
        </tr>
      </tbody>
    </table>
  );
}

/**
 * A one-time code, set large and letter-spaced on a sunken panel.
 *
 * Deliberately selectable text rather than an image: people copy these, and
 * a code rendered as a picture cannot be copied and is invisible when images
 * are blocked — which is the default in most clients.
 */
export function CodeBlock({ code, tone = "ink" }: { code: string; tone?: "ink" | "rose" }) {
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
            align="center"
            style={{
              backgroundColor: SUNKEN,
              border: `1px solid ${RULE}`,
              padding: "28px 24px",
              fontFamily: FONT,
              fontSize: "40px",
              lineHeight: "48px",
              letterSpacing: "0.22em",
              /* The trailing letter-space would push the code visually
                 off-centre; this pulls it back. */
              textIndent: "0.22em",
              color: tone === "rose" ? ROSE : INK,
            }}
          >
            {code}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export function EmailShell({
  children,
  recipientEmail,
}: {
  children: ReactNode;
  recipientEmail: string;
}) {
  return (
    <>
      {/* Inline styles cannot express `:hover`, so the one interactive
          flourish the design asks for — links turning rose under the
          cursor — lives in a <style> block. Clients that strip <style>
          (Gmail's mobile apps, some Outlooks) simply show the rest state,
          which is already legible; nothing depends on it. */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            a.tn-link:hover { color: ${ROSE} !important; }
            a.tn-btn:hover { background-color: ${ROSE} !important; }
            a.tn-social:hover svg path { fill: ${ROSE} !important; }
          `,
        }}
      />
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
            <td align="center" style={{ padding: 0 }}>
              <table
                role="presentation"
                cellPadding={0}
                cellSpacing={0}
                border={0}
                width={600}
                style={{
                  borderCollapse: "collapse",
                  width: "600px",
                  maxWidth: "100%",
                  backgroundColor: "#FFFFFF",
                  border: `1px solid ${RULE}`,
                }}
              >
                <tbody>
                  {/* The one bright mark on the sheet: a 3px rose cap, the
                      email's equivalent of the site's accent rule. */}
                  <tr>
                    <td
                      style={{
                        backgroundColor: ROSE,
                        height: "3px",
                        fontSize: 0,
                        lineHeight: 0,
                      }}
                    >
                      &nbsp;
                    </td>
                  </tr>

                  <tr>
                    <td
                      style={{
                        padding: "28px 40px",
                        borderBottom: `1px solid ${RULE}`,
                      }}
                    >
                      <img
                        src="/img/talentnext-logo-black.svg"
                        alt="TALENTnext"
                        width={132}
                        height={30}
                        style={{
                          display: "block",
                          border: 0,
                          width: "132px",
                          height: "auto",
                        }}
                      />
                    </td>
                  </tr>

                  {children}

                  {/* -------------------------------------------- footer */}
                  <tr>
                    <td
                      align="center"
                      style={{
                        backgroundColor: FOOTER,
                        padding: "36px 40px 32px",
                      }}
                    >
                      <img
                        src="/img/talentnext-logo-white.svg"
                        alt="TALENTnext"
                        width={112}
                        height={26}
                        style={{
                          display: "block",
                          border: 0,
                          width: "112px",
                          height: "auto",
                          margin: "0 auto",
                        }}
                      />

                      <table
                        role="presentation"
                        cellPadding={0}
                        cellSpacing={0}
                        border={0}
                        style={{
                          borderCollapse: "collapse",
                          margin: "24px auto 0",
                        }}
                      >
                        <tbody>
                          <tr>
                            {socials.map((social) => (
                              <td
                                key={social.label}
                                style={{ padding: "0 12px" }}
                              >
                                <a
                                  href={social.href}
                                  aria-label={social.label}
                                  className="tn-social"
                                  style={{ display: "block", lineHeight: 0 }}
                                >
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="#FFFFFF"
                                    aria-hidden="true"
                                    style={{ display: "block" }}
                                  >
                                    <path d={social.path} />
                                  </svg>
                                </a>
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>

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
                              style={{
                                borderTop: `1px solid ${FOOTER_RULE}`,
                                fontSize: 0,
                                lineHeight: 0,
                                height: "1px",
                                padding: "28px 0 0",
                              }}
                            >
                              &nbsp;
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <p
                        style={{
                          margin: "20px 0 0",
                          fontFamily: FONT,
                          fontSize: "12px",
                          lineHeight: "20px",
                          color: "#8A909B",
                        }}
                      >
                        Sent to {recipientEmail} &middot;{" "}
                        <a
                          href="{{unsubscribe_url}}"
                          className="tn-link"
                          style={{ color: "#8A909B" }}
                        >
                          Unsubscribe
                        </a>
                        <br />
                        &copy; {new Date().getFullYear()} TALENTnext
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
