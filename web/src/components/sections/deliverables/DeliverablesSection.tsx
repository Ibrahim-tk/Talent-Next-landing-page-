"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";

import { RulerGauge, Text, cx } from "@gridline";
import {
  getStickyOffset,
  gsap,
  pinnedMediaQuery,
  prefersReducedMotion,
  useDarkNavRegion,
  useGSAP,
} from "@gridline/motion";
import { deliverableStages, deliverablesCopy } from "@/content/deliverables";

import styles from "./DeliverablesSection.module.css";

/**
 * Scroll distance allotted to each stage while stuck, in px. This is also
 * the gap between two neighbouring snap points, so it doubles as the "one
 * gesture" unit: long enough that the sticky hold still reads as a slow,
 * cinematic beat, short enough that a single deliberate flick of the wheel
 * carries you from one stage to the next rather than stalling halfway.
 */
const SCROLL_PER_STAGE = 900;

/**
 * Extra scroll, in whole stages, held at the very end after the last stage
 * has arrived — a beat to let the final image and caption sit before the
 * panel releases, instead of scrolling away the instant they arrive.
 */
const TAIL_HOLD_STAGES = 0.5;

/**
 * How each stage's beat is split, in timeline units (one unit = one
 * `SCROLL_PER_STAGE`). The two must add up to exactly 1 — the arithmetic
 * below, the snap points especially, assumes it.
 *
 * `TRANSITION_DURATION` is the moving part: the caption row, the image
 * wipe and the tab all travel over exactly this long, from exactly the
 * same start, with the same ease, so the three read as one gesture rather
 * than three things loosely following each other.
 * `HOLD_DURATION` is the still part that follows, and it is what makes a
 * stage a *place* rather than a moment you pass through — every snap
 * point aims at the centre of one.
 */
const TRANSITION_DURATION = 0.45;
const HOLD_DURATION = 1 - TRANSITION_DURATION;

/**
 * The one ease every synced move shares. Two tweens only look like a
 * single gesture if their easing matches as well as their timing, so the
 * caption step, the image wipe and the snap tween itself all use this.
 */
const STEP_EASE = "power2.inOut";

/**
 * Each stage's caption row is this tall — the height of the window one
 * stage's text occupies, and the exact distance the column steps on each
 * transition. It is deliberately taller than the square image frame
 * beside it (`--deliverables-frame-size`, set in the stylesheet), which
 * simply centres within it; the two were the same number back when the
 * frame was a portrait box, and no longer are.
 * The step math below needs the number, and so does the stylesheet
 * (three heights plus the zero-state heading's anchor, which is measured
 * from half of it) — so it is published to CSS as `--caption-row-height`
 * on the track element rather than written out again there. Changing the
 * row's scale is this one line.
 *
 * 456 is the original 380 at 1.2x. Note the cost: the zero-state heading
 * is anchored half a row above centre, so every px added here is a px of
 * headroom taken from it before `.content`'s `overflow: hidden` starts
 * trimming its top on short viewports.
 */
const CAPTION_ROW_HEIGHT = 456;

// Every number below is derived once, from the constants above and the
// (static) stage count — none of it depends on measuring the DOM — so it's
// hoisted out of the component: both the JSX (which needs `EXTRA_SCROLL_PX`
// to size `.scrollTrack`) and the GSAP effect (which needs the rest to
// schedule the timeline) read the exact same numbers.
const STAGE_COUNT = deliverableStages.length;
const GAP_COUNT = STAGE_COUNT - 1;
/** Timeline position the first stage transition begins at — one hold beat
 *  in, so stage 0 gets a resting place (and a snap point) of its own
 *  before anything starts moving.
 *
 *  This used to also include a `HEADING_EXIT_DURATION` beat: the heading
 *  was a zero-state flourish that slid up and away on first scroll, and
 *  the whole timeline had to wait for it. The heading is permanent now,
 *  so that beat is gone and the section is a full `SCROLL_PER_STAGE`
 *  shorter — the stages start almost as soon as the panel sticks. */
const CAPTION_START = HOLD_DURATION;
/** Total timeline duration, tail hold excluded. The last transition ends a
 *  `HOLD_DURATION` before this, so this lands on the end of the last
 *  stage's own hold rather than mid-move. */
const MAIN_DURATION = CAPTION_START + GAP_COUNT;
/** Total timeline duration, tail hold included — what the ruler fills
 *  across and what `.scrollTrack`'s extra scroll distance is sized to. */
const TOTAL_DURATION = MAIN_DURATION + TAIL_HOLD_STAGES;
/** How much *extra* scroll (beyond one sticky panel's own height) the
 *  track needs, in px, for the whole timeline above to play out while the
 *  panel is stuck. */
const EXTRA_SCROLL_PX = SCROLL_PER_STAGE * TOTAL_DURATION;

/**
 * Where scrolling is allowed to come to rest, as ScrollTrigger `progress`
 * values (0–1 across `EXTRA_SCROLL_PX`) — the magnetic snap targets.
 *
 * One per stage, each at the *centre* of that stage's hold beat, plus the
 * two ends: 0 (the panel just caught at the top, stage 0 showing) and 1
 * (the tail hold, last stage fully landed). Aiming at the centre of a hold rather than at
 * a transition boundary is the whole point — it guarantees the section
 * settles with a stage completely arrived, never a frame or two into the
 * next move, and it leaves half a hold of slack either side so ordinary
 * scroll jitter can't re-trigger the snap.
 *
 * `CAPTION_START + index` is the *end* of stage `index`'s hold, so backing
 * off by half a hold gives its centre. That holds for stage 0 too, whose
 * hold is the one sitting between the heading's exit and the first
 * transition.
 */
const SNAP_PROGRESS = [
  0,
  ...deliverableStages.map(
    (_stage, index) =>
      (CAPTION_START + index - HOLD_DURATION / 2) / TOTAL_DURATION,
  ),
  1,
];

/**
 * The deliverables band.
 *
 * Per the Figma reference (node 172-6348): a dark section synced three
 * ways — a left tab list, a centre ruler gauge, and a fixed image beside a
 * caption column. Rather than GSAP freezing the whole panel with
 * `pin: true`, the panel (`.stage`) is a plain `position: sticky` element:
 * `.scrollTrack`, its parent, is deliberately taller than one viewport (by
 * exactly `EXTRA_SCROLL_PX`) so the browser's own native sticky behaviour
 * — not a JS-managed fixed-position freeze — is what catches the panel at
 * the top of the viewport and holds it there while the rest of that extra
 * height scrolls past underneath. A `scrub`-only ScrollTrigger (no pin)
 * reads progress across that same extra distance to drive the timeline
 * below, so the two stay perfectly in step without GSAP ever touching the
 * panel's positioning itself.
 *
 * The intro heading sits above the image/caption row — not beside it —
 * and stays there for the section's whole span: it is a permanent label
 * for the band, not a zero-state flourish, so it is never animated and
 * takes no scroll time of its own. (It used to slide up and away on the
 * first scroll, which cost a whole stage's worth of scroll distance up
 * front and meant the heading had to be positioned absolutely so its
 * departure couldn't shift the row. Both are gone: it is a plain in-flow
 * block now, and the heading plus the row are centred in the panel as one
 * group.)
 *
 * All three indicators — the tab, the image and the caption — move as one
 * on a shared, stepped beat, never independently. Each stage transition is
 * a single `TRANSITION_DURATION` window in which the caption column steps
 * up exactly one row, the incoming image wipes in over it, and the tab
 * flips at the halfway mark; a `HOLD_DURATION` of complete stillness
 * follows before the next window opens. The caption column is a real (not
 * absolutely-stacked) list of fixed-height rows, so its travel is pure
 * arithmetic — one row-height per step, no DOM measuring needed.
 *
 * Those hold beats are what the ScrollTrigger `snap` config latches onto
 * (see `SNAP_PROGRESS`): scrolling is magnetically pulled to the centre of
 * the nearest hold in the direction of travel, so the section always comes
 * to rest on a stage that has fully arrived rather than part-way through a
 * transition. The snap is directional, so a flick past the halfway mark
 * carries on to the next stage instead of being dragged back.
 *
 * The tab list's active state is recomputed from scratch on every timeline
 * update (which beat the playhead is inside, and whether it has passed
 * that beat's midpoint), rather than toggled by a `.call()` at each
 * transition point — a scrub-driven
 * timeline can jump across several transition points in a single tick
 * (fast or jerky scrolling), and a `.call()`-based toggle can then leave
 * more than one tab marked active. Recomputing the single correct index
 * every time is immune to that regardless of how the playhead got there.
 *
 * The sticky nav inverts to a dark theme for as long as this section is the
 * active content on screen, via `useDarkNavRegion` — independent of all of
 * the above, so it still works on mobile where none of it runs.
 */
export function DeliverablesSection() {
  // `useDarkNavRegion` needs an element whose bounding box tracks real
  // scroll position for the section's entire span — `.scrollTrack` itself
  // would do (nothing here ever gets set to `position: fixed` the way a
  // GSAP-pinned box would), but this separate outer ref keeps that
  // measurement decoupled from `trackRef`, which the GSAP effect below
  // treats as its own scoped trigger element.
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const gaugeRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
  const captionStackRef = useRef<HTMLDivElement>(null);

  useDarkNavRegion(sectionRef);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const media = gsap.matchMedia();

      media.add(pinnedMediaQuery, () => {
        const root = document.documentElement;

        /**
         * The sitewide `scroll-behavior: smooth` (reset.css) fights a snap
         * tween: GSAP writes a new scroll position every frame and the
         * browser then tries to smooth its way to each one in turn, which
         * reads as a slow rubbery drift instead of a magnetic pull. It is
         * suspended for the length of a snap and restored afterwards, so
         * the smooth behaviour every in-page anchor link relies on stays
         * intact everywhere else.
         */
        const setSmoothScroll = (enabled: boolean) => {
          root.style.scrollBehavior = enabled ? "" : "auto";
        };

        // The caption steps below are relative (each `.to` targets the
        // next row), so the column's zero position has to be stated
        // explicitly — otherwise a refresh part-way through the section
        // would record wherever it currently sits as the start of step one.
        if (captionStackRef.current) {
          gsap.set(captionStackRef.current, { y: 0 });
        }

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: trackRef.current,
            start: () => `top ${getStickyOffset()}px`,
            end: `+=${EXTRA_SCROLL_PX}`,
            scrub: 0.6,
            invalidateOnRefresh: true,
            snap: {
              snapTo: SNAP_PROGRESS,
              // Scaled to how far the snap has to travel, so a small nudge
              // resolves almost instantly while a longer pull still eases.
              duration: { min: 0.2, max: 0.6 },
              // Enough of a beat that the snap waits for the gesture to
              // finish instead of tugging against a still-moving wheel.
              delay: 0.08,
              ease: STEP_EASE,
              // Resolve in the direction of travel: a flick that clears
              // the halfway mark carries on to the next stage rather than
              // being dragged back to the one it just left.
              directional: true,
              onStart: () => setSmoothScroll(false),
              onComplete: () => setSmoothScroll(true),
              onInterrupt: () => setSmoothScroll(true),
            },
          },
          onUpdate: () => {
            // The single source of truth for which tab is active — see the
            // top comment for why this is recomputed rather than toggled.
            //
            // The flip lands at the midpoint of the transition window, so
            // the tab changes while the image wipe is half drawn and the
            // caption is half travelled — dead centre of the shared beat,
            // rather than leading or trailing it.
            const elapsed = timeline.time() - CAPTION_START;
            const step = Math.floor(elapsed);
            const withinStep = elapsed - step;
            const activeIndex = gsap.utils.clamp(
              0,
              STAGE_COUNT - 1,
              elapsed < 0
                ? 0
                : withinStep >= TRANSITION_DURATION / 2
                  ? step + 1
                  : step,
            );
            tabRefs.current.forEach((tab, index) => {
              tab?.classList.toggle(styles.tabActive, index === activeIndex);
            });
          },
        });

        // The ruler fills across the entire span, tail hold included — it
        // keeps creeping while the last stage sits held at the end.
        if (gaugeRef.current) {
          timeline.fromTo(
            gaugeRef.current,
            { clipPath: "inset(0% 0% 100% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: TOTAL_DURATION,
              ease: "none",
            },
            0,
          );
        }

        // One shared beat per stage transition. Stage 0 is the zero state
        // (its caption row is already in the window and its image is the
        // default layer), so the steps run from stage 1: each schedules
        // the caption's row step and that stage's image wipe at the *same*
        // position, for the *same* duration, on the *same* ease — the tab
        // flips at their common midpoint (see `onUpdate` above). Nothing
        // moves for the `HOLD_DURATION` that follows, which is the still
        // moment `SNAP_PROGRESS` aims at.
        //
        // This replaces a caption column that drifted continuously while
        // only the image and tab stepped. Because the column never rested,
        // the three could never agree on when a stage had "arrived": by
        // the time a wipe finished, the caption had already drifted on
        // toward the next row, and the image read as forever catching up
        // to a stage the rest of the section had left.
        for (let index = 1; index < STAGE_COUNT; index += 1) {
          const startsAt = CAPTION_START + index - 1;

          if (captionStackRef.current) {
            timeline.to(
              captionStackRef.current,
              {
                y: -index * CAPTION_ROW_HEIGHT,
                duration: TRANSITION_DURATION,
                ease: STEP_EASE,
              },
              startsAt,
            );
          }

          const imageLayer = layerRefs.current[index];
          if (!imageLayer) continue;

          timeline.fromTo(
            imageLayer,
            { clipPath: "inset(100% 0 0 0)" },
            {
              clipPath: "inset(0% 0 0 0)",
              duration: TRANSITION_DURATION,
              ease: STEP_EASE,
            },
            startsAt,
          );
        }
      });

      return () => {
        media.revert();
        // A snap interrupted by unmount (or by the media query flipping to
        // the narrow layout mid-snap) would otherwise leave the document
        // stuck on `scroll-behavior: auto` for the rest of the session.
        document.documentElement.style.scrollBehavior = "";
      };
    },
    { scope: trackRef },
  );

  return (
    <div ref={sectionRef}>
      <div
        className={styles.scrollTrack}
        ref={trackRef}
        style={
          {
            "--extra-scroll": `${EXTRA_SCROLL_PX}px`,
            "--caption-row-height": `${CAPTION_ROW_HEIGHT}px`,
          } as CSSProperties
        }
      >
        <section
          className={styles.stage}
          id="what-youll-get"
          aria-labelledby="deliverables-heading"
        >
          <div className={styles.tabs}>
            {deliverableStages.map((stage, index) => (
              <div
                key={stage.id}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                className={cx(styles.tab, index === 0 && styles.tabActive)}
                aria-current={index === 0 ? "step" : undefined}
              >
                <Text variant="bodyMd" tone="inherit" as="span">
                  {stage.tabLabel}
                </Text>
              </div>
            ))}
          </div>

          <RulerGauge progressRef={gaugeRef} className={styles.gauge} />

          <div className={styles.content}>
            <div className={styles.headingBar}>
              <Text
                variant="editorialTight"
                as="h2"
                id="deliverables-heading"
                tone="inverse"
                className={styles.headline}
              >
                {deliverablesCopy.heading}
              </Text>
              <Text
                variant="bodyLg"
                tone="inverseSecondary"
                className={styles.subtext}
              >
                {deliverablesCopy.description}
              </Text>
            </div>

            <div className={styles.row}>
              <div className={styles.imageFrame}>
                {deliverableStages.map((stage, index) => (
                  <div
                    key={stage.id}
                    ref={(element) => {
                      layerRefs.current[index] = element;
                    }}
                    className={cx(
                      styles.layer,
                      index > 0 && styles.layerStacked,
                    )}
                    style={{ "--layer-index": index } as CSSProperties}
                  >
                    {/* Two images, not one: the gradient fills the square
                        frame edge to edge, and the mockup sits centred on
                        top of it at its own smaller scale. The gradient is
                        purely decorative (`alt=""`) — `imageAlt` belongs
                        to the mockup, which is the only part carrying
                        information, and the caption column beside it
                        carries the same content as text regardless. */}
                    <Image
                      src={stage.background}
                      alt=""
                      aria-hidden="true"
                      fill
                      sizes="400px"
                      className={styles.layerBackground}
                    />
                    {stage.card ? (
                      <Image
                        src={stage.card}
                        alt={stage.imageAlt}
                        fill
                        sizes="400px"
                        className={styles.layerCard}
                        style={
                          {
                            "--card-inset": stage.cardFraming?.inset,
                            "--card-bias": stage.cardFraming?.bias,
                          } as CSSProperties
                        }
                      />
                    ) : null}
                  </div>
                ))}
              </div>

              <div className={styles.captionViewport}>
                <div className={styles.captionStack} ref={captionStackRef}>
                  {deliverableStages.map((stage) => (
                    <div key={stage.id} className={styles.captionRow}>
                      {/* One step up the modular scale from headingMd:
                          headingSm runs h6 → h5, so it is 20px on mobile
                          (identical to before) and 25px at desktop width. */}
                      <Text
                        variant="headingSm"
                        tone="inverse"
                        className={styles.captionHeading}
                      >
                        {stage.tabLabel}
                      </Text>
                      <Text
                        variant="bodyMd"
                        tone="inverseSecondary"
                        className={styles.captionText}
                      >
                        {stage.description}
                      </Text>
                    </div>
                  ))}
                </div>

                <div className={styles.captionFadeTop} aria-hidden="true" />
                <div
                  className={styles.captionFadeBottom}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
