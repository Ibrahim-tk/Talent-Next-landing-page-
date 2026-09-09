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
 * Scroll distance allotted to each stage while stuck, in px. Deliberately
 * long — the sticky hold is meant to read as a slow, cinematic beat rather
 * than a quick swap, so a full pass through all five stages asks for
 * several screens' worth of scrolling.
 */
const SCROLL_PER_STAGE = 1400;

/**
 * Extra scroll, in whole stages, held at the very end after the last stage
 * has arrived — a beat to let the final image and caption sit before the
 * panel releases, instead of scrolling away the instant they arrive.
 */
const TAIL_HOLD_STAGES = 0.6;

/**
 * The image reveal on each stage transition animates as a bottom-up
 * clip-path wipe, over this duration in timeline units (one unit = one
 * `SCROLL_PER_STAGE`).
 */
const WIPE_DURATION = 0.35;

/**
 * Each stage's caption row is this tall, matching `.imageFrame`'s own
 * height so the image and the caption column read as one evenly matched
 * row. Kept in one place because the drift math below needs the number.
 */
const CAPTION_ROW_HEIGHT = 380;

/**
 * How long, in timeline units, the zero-state heading takes to slide up and
 * away once scrolling begins. The caption column's own cycle doesn't start
 * until this finishes — see `CAPTION_START` below — so the two never move
 * at once: the heading goes first, on its own, then the stages begin.
 */
const HEADING_EXIT_DURATION = 1;

// Every number below is derived once, from the constants above and the
// (static) stage count — none of it depends on measuring the DOM — so it's
// hoisted out of the component: both the JSX (which needs `EXTRA_SCROLL_PX`
// to size `.scrollTrack`) and the GSAP effect (which needs the rest to
// schedule the timeline) read the exact same numbers.
const STAGE_COUNT = deliverableStages.length;
const GAP_COUNT = STAGE_COUNT - 1;
const CAPTION_DRIFT = GAP_COUNT * CAPTION_ROW_HEIGHT;
/** Timeline position the caption column starts drifting at — right after
 *  the heading has completely finished exiting, never before. */
const CAPTION_START = HEADING_EXIT_DURATION;
/** Total timeline duration, tail hold excluded. */
const MAIN_DURATION = CAPTION_START + GAP_COUNT;
/** Total timeline duration, tail hold included — what the ruler fills
 *  across and what `.scrollTrack`'s extra scroll distance is sized to. */
const TOTAL_DURATION = MAIN_DURATION + TAIL_HOLD_STAGES;
/** How much *extra* scroll (beyond one sticky panel's own height) the
 *  track needs, in px, for the whole timeline above to play out while the
 *  panel is stuck. */
const EXTRA_SCROLL_PX = SCROLL_PER_STAGE * TOTAL_DURATION;

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
 * At rest (before any scrolling) the intro heading sits above the
 * image/caption row — not beside it — with stage zero's own description
 * already showing next to the image underneath. That's a one-time
 * zero-state look, and it plays out in two strictly sequential moves,
 * never at once: first the heading slides up and fades away for good (see
 * `HEADING_EXIT_DURATION`); only once that's finished does the caption
 * column start its own cycle.
 *
 * The caption column itself is a real (not absolutely-stacked) list — one
 * row per stage, every row the same fixed height as `.imageFrame` — so its
 * scroll distance is pure arithmetic (no DOM measuring needed): it drifts
 * upward continuously, at a steady rate, one row-height per stage. The
 * image keeps its own separate, unrelated behaviour: only one stage's
 * photo is ever visible, and each later one reveals with a clip-path wipe,
 * timed to land exactly when the caption column finishes drifting onto
 * that stage's row — so the photo, the caption, and the tab all change as
 * one beat.
 *
 * The tab list's active state is recomputed from scratch on every timeline
 * update (`Math.floor` of how many stage-transitions have passed), rather
 * than toggled by a `.call()` at each transition point — a scrub-driven
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
  const headingRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
  const captionStackRef = useRef<HTMLDivElement>(null);

  useDarkNavRegion(sectionRef);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const media = gsap.matchMedia();

      media.add(pinnedMediaQuery, () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: trackRef.current,
            start: () => `top ${getStickyOffset()}px`,
            end: `+=${EXTRA_SCROLL_PX}`,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
          onUpdate: () => {
            // The single source of truth for which tab is active — see the
            // top comment for why this is recomputed rather than toggled.
            const activeIndex = Math.max(
              0,
              Math.min(
                STAGE_COUNT - 1,
                Math.floor(timeline.time() - CAPTION_START),
              ),
            );
            tabRefs.current.forEach((tab, index) => {
              tab?.classList.toggle(styles.tabActive, index === activeIndex);
            });
          },
        });

        // The heading slides up and away once, right at the start — a
        // zero-state flourish, not something that repeats per stage.
        if (headingRef.current) {
          timeline.to(
            headingRef.current,
            {
              yPercent: -130,
              autoAlpha: 0,
              duration: HEADING_EXIT_DURATION,
              ease: "power1.inOut",
            },
            0,
          );
        }

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

        // The caption column — one row per stage, stage 0 already showing
        // — only starts drifting once the heading is gone (`CAPTION_START`),
        // then moves up by exactly one row height per timeline unit, at a
        // steady rate, across the rest of the main span (the tail hold
        // afterward leaves it resting on the last row).
        if (captionStackRef.current) {
          timeline.fromTo(
            captionStackRef.current,
            { y: 0 },
            { y: -CAPTION_DRIFT, duration: GAP_COUNT, ease: "none" },
            CAPTION_START,
          );
        }

        // Stage 0 is already showing (its photo is the default), so image
        // wipes start from stage 1: each one lands at timeline position
        // `CAPTION_START + index`, exactly when the caption column's
        // continuous drift finishes bringing that stage's row into view.
        for (let index = 1; index < STAGE_COUNT; index += 1) {
          const imageLayer = layerRefs.current[index];
          if (!imageLayer) continue;

          timeline.fromTo(
            imageLayer,
            { clipPath: "inset(100% 0 0 0)" },
            {
              clipPath: "inset(0% 0 0 0)",
              duration: WIPE_DURATION,
              ease: "power1.inOut",
            },
            CAPTION_START + index,
          );
        }
      });

      return () => media.revert();
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
            <div className={styles.headingBar} ref={headingRef}>
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
                    <Image
                      src={stage.image}
                      alt={stage.imageAlt}
                      fill
                      sizes="280px"
                      className={styles.layerImage}
                    />
                  </div>
                ))}
              </div>

              <div className={styles.captionViewport}>
                <div className={styles.captionStack} ref={captionStackRef}>
                  {deliverableStages.map((stage) => (
                    <div key={stage.id} className={styles.captionRow}>
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
