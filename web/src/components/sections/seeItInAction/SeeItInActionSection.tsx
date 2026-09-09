"use client";

import Image from "next/image";
import { useRef } from "react";

import { GridModule, SectionHeader } from "@gridline";
import { gsap, prefersReducedMotion, useGSAP } from "@gridline/motion";
import { seeItInActionCopy } from "@/content/deliverables";

import styles from "./SeeItInActionSection.module.css";

/** The card's starting size, as a fraction of its resting scale. */
const START_SCALE = 0.7;

/**
 * "See It In Action" — a centred header over a single video card, bounded by
 * the GridCanvas's own vertical rules (never past them — see GridCanvas's
 * own doc comment).
 *
 * The card is laid out at its true resting size from the start (so nothing
 * reflows); the "small at first" look is purely a `transform: scale()` sat
 * below 1, scrubbed up to 1 across a long scroll span with a soft
 * `power2.out` ease and a generous `scrub` lag, so the growth reads as a
 * gradual settle rather than a snap. There's no opacity tween — the card is
 * always visible, just smaller, so the effect reads as an expansion rather
 * than a fade-in.
 */
export function SeeItInActionSection() {
  const frameRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !frameRef.current) return;

      gsap.fromTo(
        frameRef.current,
        { scale: START_SCALE },
        {
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: frameRef.current,
            start: "top 95%",
            end: "top 10%",
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        },
      );
    },
    { scope: frameRef },
  );

  return (
    <GridModule
      id="see-it-in-action"
      rule="bottom"
      aria-labelledby="see-it-in-action-heading"
    >
      {/* A plain grid-texture box — the same blueprint pattern the hero
          uses behind its own headline — standing in for a spacer above the
          heading so this section opens with some of that "grid" feel
          instead of a blank gap. */}
      <div className={styles.gridBox} aria-hidden="true" />

      <div className={styles.headerPad}>
        <SectionHeader
          headingId="see-it-in-action-heading"
          heading={seeItInActionCopy.heading}
          description={seeItInActionCopy.description}
        />
      </div>

      <div className={styles.body}>
        <div className={styles.frameWrap} ref={frameRef}>
          {/* Temporary placeholder for the video — see the content file's
              note on `image`. */}
          <div className={styles.mediaFrame}>
            <Image
              src={seeItInActionCopy.image}
              alt={seeItInActionCopy.imageAlt}
              fill
              sizes="(max-width: 860px) 100vw, 1560px"
              className={styles.mediaImage}
              priority={false}
            />
          </div>
        </div>
      </div>

      {/* A closing row below the video, same shape as InterviewSection's own
          footer bar — left empty until there's copy for it. */}
      <div className={styles.footerRow} />
    </GridModule>
  );
}
