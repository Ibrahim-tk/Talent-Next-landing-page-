import { useEffect, useState, type ReactNode } from "react";

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
 * never black, body copy at 16px/#5F6672, and the rose accent carrying the
 * one action each email is sent to get.
 */

/* The palette, flattened from the Gridline tokens an email cannot read. */
export const ROSE = "#F9423A"; /* --gl-rose-600 */
export const INK = "#23282F"; /* --gl-neutral-790, heading ink */
export const BODY = "#5F6672"; /* --gl-neutral-675, body copy */
export const MUTED = "#69707C"; /* --gl-neutral-640, captions */
export const RULE = "#F0F0F2"; /* --gl-color-border-rule */
export const SUNKEN = "#F8F9FA"; /* --gl-color-surface-sunken */
export const BLACK = "#000000"; /* --gl-color-action-primary-bg */
export const ROSE_PRESSED = "#BF3629"; /* --gl-rose-700, the accent's hover step */
const FOOTER = "#111111"; /* --gl-neutral-900, inverse surface */
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

/**
 * The primary action, as a table so Outlook renders the fill.
 *
 * ROSE AT REST, not on hover. It was a black bar that turned rose when
 * pointed at, which is the site's own primary button — but a page has a
 * dozen things to look at and an email has one. Black is the site's
 * "somewhere to click" and rose is its "this is the thing"; in a sheet
 * containing exactly one action, that is the same statement made twice, and
 * the quieter of the two was winning. More practically, half of what opens
 * these never renders a hover at all — touch has no pointer, and Gmail's
 * mobile apps strip the <style> block the hover lives in — so an accent that
 * only exists on hover is an accent most readers never see.
 *
 * SMALLER, for the same reason it is now coloured. At 17px/40px of padding
 * the bar ran most of the sheet's width and had the weight of a banner; a
 * button that is the only coloured object on a white page does not need to
 * be large as well, and the trimmed size reads as a considered control
 * rather than as a strip of colour.
 */
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
          {/* The fill is set on the cell AND on the anchor: Outlook paints the
              td and ignores a background on the <a>, everything else does the
              reverse. Both have to be the accent or the button arrives
              two-tone in one client and correct in the other. */}
          <td align="center" style={{ backgroundColor: ROSE }}>
            <a
              href={href}
              className="tn-btn"
              style={{
                display: "block",
                backgroundColor: ROSE,
                padding: "13px 28px",
                fontFamily: FONT,
                fontSize: "14px",
                lineHeight: "18px",
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
/**
 * The copy button, in the code block's lower-right corner.
 *
 * IT ONLY EXISTS WHERE IT CAN WORK. Copying to the clipboard needs
 * JavaScript, and every email client on earth strips <script> — so in an
 * actual inbox this control could never do anything. Rendering it there would
 * be worse than leaving it out: a button that looks pressable, gets pressed,
 * and does nothing is a defect, where a plain selectable code is simply how
 * codes have always been copied.
 *
 * So it is gated on `mounted`, which is only ever true after hydration in a
 * real browser. Two consequences, both wanted:
 *
 *   - In the preview it appears and works, which is where you are reviewing.
 *   - Rendered to static HTML for the sending provider, it is absent from the
 *     markup entirely — no dead button, no stray markup for a client to
 *     mangle.
 *
 * If these templates are ever also served as a web page ("view in browser"),
 * this is live there too, for free.
 *
 * NO CONTAINER AT REST. The glyph sits directly on the code block's own
 * ground, and the neutral pill only appears under hover, focus or the moment
 * after a copy — see `.tn-copy` in the stylesheet. A button-shaped box parked
 * permanently in the corner competes with the six digits it belongs to, which
 * are the one thing on this sheet anybody opened it for.
 */
function CopyButton({ code }: { code: string }) {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timer);
  }, [copied]);

  if (!mounted) return null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      /* Clipboard denied (an insecure origin, or a browser that wants a
         different gesture). Say nothing and leave the code selectable — the
         reader has lost a convenience, not the code. */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={`tn-copy${copied ? " tn-copy--done" : ""}`}
      aria-label={copied ? "Code copied" : "Copy code"}
      style={{
        position: "absolute",
        right: "-8px",
        bottom: "-14px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "30px",
        height: "30px",
        padding: 0,
        border: 0,
        borderRadius: "7px",
        backgroundColor: "transparent",
        color: copied ? ROSE : MUTED,
        cursor: "pointer",
        /* The glyph is drawn at the code's own optical weight, not the
           body's — it belongs to the block, not to the paragraph above it. */
        lineHeight: 0,
      }}
    >
      {copied ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M20 6 9 17l-5-5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect
            x="9"
            y="9"
            width="11"
            height="11"
            rx="2.5"
            stroke="currentColor"
            strokeWidth="1.9"
          />
          <path
            d="M6 15H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}

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
            className="tn-code"
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
            {/* The positioning context for the copy button. A <div> inside the
                cell rather than `position: relative` on the <td> itself: a
                positioned table cell is unreliable across engines, and this
                wrapper is inert markup that no email client can get wrong. */}
            <div style={{ position: "relative" }}>
              {code}
              <CopyButton code={code} />
            </div>
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
            a.tn-btn:hover { background-color: ${ROSE_PRESSED} !important; }
            a.tn-social:hover svg path { fill: ${ROSE} !important; }

            /* THE COPY BUTTON'S GROUND.

               Nothing at rest — the glyph sits straight on the code block —
               and a neutral pill fades in under hover, under keyboard focus,
               and for the moment after a copy lands. That last one matters:
               a copy made by keyboard, or by a pointer that has already moved
               away, still needs to show that something happened, and the
               colour change on the glyph alone is easy to miss at 15px.

               Only ever in a browser. The button is not rendered into the
               markup a sending provider receives, so these rules have nothing
               to match in an inbox.

               No !important here: the inline style sets the transparent rest
               state and these are pseudo-class rules, which lose to a style
               attribute — so the rest colour is repeated as a variable-free
               declaration on .tn-copy itself and the states override it by
               specificity of state, not of weight. */
            /* HIDDEN UNTIL THE BLOCK IS POINTED AT, on a pointer device. The
               code is what the sheet is for; a control parked beside it at
               rest is a second thing to look at in the one place there should
               only be one. Hovering the block is also the gesture someone is
               already making on their way to select the digits by hand, so
               the button arrives exactly when it becomes useful.

               Opacity, not display: the button keeps its box, so nothing
               shifts when it appears and a keyboard tab can still reach it —
               which is what the :focus-within pair below is for.

               It stays PERMANENTLY VISIBLE on touch, where there is no hover
               to reveal it with and a hidden control is simply a missing one.
               Two guards for that, because they catch different devices: the
               phone breakpoint further down, and hover: none here for any
               touch screen wide enough to miss it. */
            .tn-code .tn-copy {
              opacity: 0;
              transition: opacity 120ms ease-out, background-color 120ms ease-out,
                color 120ms ease-out;
            }
            .tn-code:hover .tn-copy,
            .tn-code:focus-within .tn-copy,
            .tn-copy--done { opacity: 1 !important; }

            @media (hover: none) {
              .tn-code .tn-copy { opacity: 1 !important; }
            }

            .tn-copy { transition: background-color 120ms ease-out, color 120ms ease-out; }
            .tn-copy:hover { background-color: #ECEEF1 !important; color: ${INK} !important; }
            .tn-copy:focus-visible {
              background-color: #ECEEF1 !important;
              color: ${INK} !important;
              outline: 2px solid ${ROSE};
              outline-offset: 1px;
            }
            .tn-copy--done { background-color: #ECEEF1 !important; }

            /* THE PHONE LAYOUT.

               Every style in these templates is inline, because that is what
               an email client understands — but an inline style cannot carry
               a media query, so the handful of values that must change on a
               narrow screen are overridden here by class. That is also why
               each rule is !important: it is competing with a style attribute,
               which otherwise wins outright.

               Keyed at 600px, the sheet's own width. Clients that strip
               <style> (a few Outlooks) simply get the desktop sheet scaled
               down, which is legible — nothing here is load-bearing, it is the
               difference between comfortable and cramped.

               Only four things move: the side padding, which at 40px eats a
               fifth of a 390px screen; the headline, which at 36px wraps a
               three-word sentence onto three lines; the code block, whose
               wide tracking pushes six digits past the sheet edge; and the
               two-column metadata tables, which stack. */
            @media only screen and (max-width: 600px) {
              /* The sheet's own 600px is a fixed width AND an HTML width
                 attribute; below the breakpoint it gives both up. */
              .tn-sheet { width: 100% !important; }
              .tn-pad { padding-left: 24px !important; padding-right: 24px !important; }
              .tn-h1 { font-size: 27px !important; line-height: 34px !important; }
              .tn-lead { font-size: 15px !important; line-height: 26px !important; }
              .tn-code {
                font-size: 30px !important;
                line-height: 38px !important;
                letter-spacing: 0.14em !important;
                text-indent: 0.14em !important;
                padding: 22px 12px !important;
              }
              /* The two-column rows become one column: a 42%/58% split at this
                 width leaves "Approximate location" wrapping to three lines
                 against a value that fits on one.

                 The width is auto, NOT 100%. These cells carry 24px of
                 horizontal padding in one of the templates, and a block-level
                 box is content-box by default — so 100% resolved to the full
                 sheet width and then ADDED the 48px of padding on top, pushing
                 every one of those rows past the right edge and putting a
                 horizontal scrollbar on the whole email. Auto lets a block
                 fill its parent and subtract its own padding, which is the
                 behaviour that was wanted; border-box is belt and braces for
                 any client that resolves a stray width against the padding
                 box anyway.

                 NOTE, since this bit me: this comment lives inside a JS
                 template literal, so it can contain no backticks. */
              .tn-meta-term,
              .tn-meta-value {
                display: block !important;
                width: auto !important;
                box-sizing: border-box !important;
                text-align: left !important;
              }
              .tn-meta-term { padding-bottom: 0 !important; border-bottom: 0 !important; }
              .tn-meta-value { padding-top: 0 !important; border-top: 0 !important; }
              .tn-foot { padding-left: 20px !important; padding-right: 20px !important; }
              /* No hover to reveal it with — see the note on .tn-code .tn-copy. */
              .tn-code .tn-copy { opacity: 1 !important; }
            }
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
                className="tn-sheet"
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

                  {/* The masthead. No rule under it: the logo sits directly
                      above the first line of the message now.

                      The hairline was drawing a box the content did not need.
                      The rose cap three pixels above it is already the sheet's
                      top edge, and a second horizontal a few millimetres below
                      it made a band of chrome out of what should read as one
                      sheet of paper with a mark at the top. Every template
                      opens on generous white space, which separates the logo
                      from the message better than a line does. */}
                  <tr>
                    <td
                      className="tn-pad"
                      style={{ padding: "22px 40px 4px" }}
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
                      className="tn-foot"
                      style={{
                        backgroundColor: FOOTER,
                        padding: "28px 32px 26px",
                      }}
                    >
                      <img
                        src="/img/talentnext-logo-white.svg"
                        alt="TALENTnext"
                        width={96}
                        height={22}
                        style={{
                          display: "block",
                          border: 0,
                          width: "96px",
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
                          margin: "18px auto 0",
                        }}
                      >
                        <tbody>
                          <tr>
                            {socials.map((social) => (
                              <td
                                key={social.label}
                                style={{ padding: "0 10px" }}
                              >
                                <a
                                  href={social.href}
                                  aria-label={social.label}
                                  className="tn-social"
                                  style={{ display: "block", lineHeight: 0 }}
                                >
                                  <svg
                                    width="18"
                                    height="18"
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

                      <p
                        style={{
                          margin: "22px 0 0",
                          fontFamily: FONT,
                          fontSize: "11px",
                          lineHeight: "18px",
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
