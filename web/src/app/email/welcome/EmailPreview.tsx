"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

import { AdminOtpEmail } from "./AdminOtpEmail";
import { PasswordResetEmail } from "./PasswordResetEmail";
import { PasswordResetOtpEmail } from "./PasswordResetOtpEmail";
import { WelcomeEmail } from "./WelcomeEmail";

/**
 * Preview chrome for the transactional email templates.
 *
 * The tab strip and the grey surround are *not* part of any email — an inbox
 * supplies its own frame. They exist so the templates can be compared side by
 * side, at both widths, before the markup is lifted into the sending provider.
 *
 * All four share `EmailShell` — the rose cap, the ruled masthead and the
 * black footer.
 *
 * Two of them are alternative password resets, by link and by code. That is
 * deliberate for review, not for sending: whichever mechanic the product
 * actually uses, the other should come out of the set.
 *
 * EACH TEMPLATE IS RENDERED INSIDE AN IFRAME. That is the whole reason the
 * mobile switch can be trusted. An email's responsive behaviour is a
 * `@media (max-width: 600px)` query, and a media query asks the VIEWPORT how
 * wide it is — not the box the email happens to be sitting in. Render the
 * sheet into a 390px-wide div on a 1440px monitor and it will dutifully
 * shrink to 390px while every media query in it still reports "desktop", so
 * the padding, the headings and the code block all stay at their full size
 * and the preview shows a layout no phone will ever produce. An iframe has a
 * viewport of its own, so at 390px wide the queries fire exactly as they do
 * on a handset.
 */

const TABS = [
  { id: "welcome", label: "Welcome / verify" },
  { id: "reset", label: "Password reset (link)" },
  { id: "otp", label: "Password reset (code)" },
  { id: "admin", label: "Super admin OTP" },
] as const;

type TabId = (typeof TABS)[number]["id"];

/**
 * The two widths worth checking.
 *
 * `desktop` is 720px rather than the sheet's own 600: an email is never seen
 * flush to the edge of a reading pane, and the 60px either side is what the
 * grey surround needs to read as an inbox rather than as a crop.
 *
 * `mobile` is 390px — an iPhone 15's CSS width, and comfortably under the
 * 600px breakpoint the templates switch at.
 */
const VIEWPORTS = [
  { id: "desktop", label: "Desktop", width: 720 },
  { id: "mobile", label: "Mobile", width: 390 },
] as const;

type ViewportId = (typeof VIEWPORTS)[number]["id"];

const FONT = '"Helvetica Neue", Helvetica, Arial, sans-serif';
const INK = "#23282F";
const MUTED = "#69707C";
const RULE = "#F0F0F2";
const ROSE = "#F9423A";

/**
 * An iframe with a React tree portalled into its body.
 *
 * `createPortal` rather than `renderToStaticMarkup` into `srcDoc`: the
 * templates stay live React (so a state change in one re-renders in place),
 * and nothing has to pull the server renderer into the browser bundle.
 *
 * The height is driven by a ResizeObserver on the document inside, because an
 * iframe will not size itself to its content — left alone it is 150px tall
 * with its own scrollbar, which is an inbox nobody has.
 */
function EmailFrame({ width, children }: { width: number; children: ReactNode }) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [body, setBody] = useState<HTMLElement | null>(null);
  const [height, setHeight] = useState(600);

  useEffect(() => {
    const frame = frameRef.current;
    const doc = frame?.contentDocument;
    if (!frame || !doc) return;

    /* A fresh document each time: the only things in it are the reset below
       and whatever the portal puts there, so an email cannot inherit a single
       style from the page hosting the preview. That isolation is the second
       reason for the iframe — a template that only looks right because the
       site's reset is in scope would look wrong in every real inbox. */
    doc.open();
    doc.write(
      '<!doctype html><html><head><meta charset="utf-8" />' +
        '<meta name="viewport" content="width=device-width, initial-scale=1" />' +
        "<style>html,body{margin:0;padding:0;background:#F8F9FA;}" +
        /* No scrollbar inside the frame. The frame is grown to its content by
           the observer below, so an inner scroller would be a second bar
           scrolling the same pixels the page already scrolls — and it would
           steal the wheel the moment the pointer crossed into the preview. */
        "html{overflow:hidden;}</style>" +
        "</head><body></body></html>",
    );
    doc.close();

    setBody(doc.body);

    /* Measured off the body, not the documentElement: with `overflow: hidden`
       on the html box its scrollHeight collapses to the viewport height the
       iframe currently has, which would latch the frame at whatever size it
       was first given. The body reports the content. */
    const measure = () => setHeight(doc.body.scrollHeight);

    const observer = new ResizeObserver(measure);
    observer.observe(doc.body);
    measure();

    return () => observer.disconnect();
  }, []);

  return (
    <iframe
      ref={frameRef}
      title="Email preview"
      /* Belt and braces with the `overflow: hidden` inside: a couple of
         clients-of-the-preview (Safari) will still paint a bar for a frame
         that is a pixel short of its content. */
      scrolling="no"
      style={{
        display: "block",
        overflow: "hidden",
        width: `${width}px`,
        maxWidth: "100%",
        height: `${height}px`,
        margin: "0 auto",
        border: `1px solid ${RULE}`,
        borderRadius: "8px",
        backgroundColor: "#FFFFFF",
        /* The frame is the preview's own chrome, not the email's. */
        boxShadow: "0 12px 40px rgba(15, 23, 42, 0.06)",
      }}
    >
      {body ? createPortal(children, body) : null}
    </iframe>
  );
}

export function EmailPreview() {
  const [active, setActive] = useState<TabId>("welcome");
  const [viewport, setViewport] = useState<ViewportId>("desktop");

  const width = VIEWPORTS.find((v) => v.id === viewport)?.width ?? 720;

  return (
    <div style={{ backgroundColor: "#F8F9FA", minHeight: "100vh" }}>
      {/* Tab strip — sticky so it stays reachable down a long template. */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: "#FFFFFF",
          borderBottom: `1px solid ${RULE}`,
        }}
      >
        {/* The two controls sit on one row on a wide screen and stack on a
            narrow one. `wrap` rather than a breakpoint: the row folds at
            whatever width it actually runs out of, which is the only width
            that matters and is not a number anyone has to maintain. */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "8px",
            padding: "0 16px",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          <div
            role="tablist"
            aria-label="Email templates"
            style={{
              display: "flex",
              gap: "4px",
              overflowX: "auto",
              /* The strip scrolls sideways on a phone rather than wrapping to
                 two rows: four tabs stacked would push the preview itself
                 below the fold on the one screen with least of it. */
              maxWidth: "100%",
            }}
          >
            {TABS.map((tab) => {
              const selected = tab.id === active;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(tab.id)}
                  style={{
                    appearance: "none",
                    background: "none",
                    border: 0,
                    borderBottom: `2px solid ${selected ? ROSE : "transparent"}`,
                    padding: "16px 12px 14px",
                    fontFamily: FONT,
                    fontSize: "13px",
                    lineHeight: "18px",
                    letterSpacing: "0.04em",
                    whiteSpace: "nowrap",
                    color: selected ? INK : MUTED,
                    cursor: "pointer",
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* The width switch. A segmented pair rather than tabs, because it
              is a different KIND of choice from the strip beside it — which
              template versus how wide — and giving the two the same underline
              treatment would read as eight tabs in one group. */}
          <div
            role="group"
            aria-label="Preview width"
            style={{
              display: "flex",
              flex: "none",
              gap: "2px",
              padding: "3px",
              margin: "8px 0",
              borderRadius: "999px",
              backgroundColor: "#F3F4F6",
            }}
          >
            {VIEWPORTS.map((option) => {
              const selected = option.id === viewport;
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setViewport(option.id)}
                  style={{
                    appearance: "none",
                    border: 0,
                    borderRadius: "999px",
                    padding: "7px 14px",
                    fontFamily: FONT,
                    fontSize: "12px",
                    lineHeight: "16px",
                    letterSpacing: "0.04em",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    backgroundColor: selected ? "#FFFFFF" : "transparent",
                    color: selected ? INK : MUTED,
                    boxShadow: selected
                      ? "0 1px 3px rgba(15, 23, 42, 0.12)"
                      : "none",
                  }}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ padding: "32px 16px 64px" }}>
        {/* Keyed on both, so switching either one builds a fresh frame rather
            than re-using a document sized for the last combination. */}
        <EmailFrame key={`${active}-${viewport}`} width={width}>
          {active === "welcome" && <WelcomeEmail />}
          {active === "reset" && <PasswordResetEmail />}
          {active === "otp" && <PasswordResetOtpEmail />}
          {active === "admin" && <AdminOtpEmail />}
        </EmailFrame>

        <p
          style={{
            margin: "16px auto 0",
            maxWidth: `${width}px`,
            fontFamily: FONT,
            fontSize: "12px",
            lineHeight: "18px",
            color: MUTED,
            textAlign: "center",
          }}
        >
          {width}px viewport &middot; the sheet is 600px and collapses below it
        </p>
      </div>
    </div>
  );
}
