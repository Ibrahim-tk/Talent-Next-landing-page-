"use client";

import { useRef } from "react";

import { Icon, SegmentedMeter, SurfaceCard, Text, TintedMedia } from "@gridline";
import { gsap, prefersReducedMotion, useGSAP } from "@gridline/motion";
import { heroCopy } from "@/content/heroV2";

import styles from "./HeroStageV2.module.css";

/**
 * The hero's floating layer: two report cards pinned to the bottom
 * corners, standing in for the reference's "Meet our Team" / product-shot
 * pair. Built as real `SurfaceCard` + `SegmentedMeter` content rather than
 * pasted product screenshots — the same "our own design language" call
 * `HeroSectionV2` makes for its background and CTA.
 *
 * Standalone duplicate of `HeroStage` for the `/hero-v2` preview page. Same
 * behaviour, but scoped to its own module and content so edits here never
 * touch the live homepage hero.
 */
export function HeroStageV2() {
  const stageRef = useRef<HTMLDivElement>(null);
  // Two layers per card, deepest first: `.cardEnter` (the one-time GSAP
  // load-in — opacity/y/rotation) and `.cardSlot` (the outer, absolutely
  // positioned element, owned exclusively by the scroll-scrubbed drift
  // below). A scrubbed ScrollTrigger timeline renders once, synchronously,
  // the moment it's created, to sync itself to the current scroll position
  // — which for a fresh page load happens before the entrance timeline's
  // own `.to()` tweens have had a tick to run, so it would capture the
  // entrance's *hidden* starting values as its baseline if the two shared
  // a target. Splitting them onto separate elements is what avoids that.
  const teamEnterRef = useRef<HTMLDivElement>(null);
  const teamSlotRef = useRef<HTMLDivElement>(null);
  const scoreEnterRef = useRef<HTMLDivElement>(null);
  const scoreSlotRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // Load-in entrance — the two cards settle up into place, staggered.
      const enterTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      enterTl
        .set(teamEnterRef.current, { opacity: 0, y: 60, rotation: -3 })
        .set(scoreEnterRef.current, { opacity: 0, y: 60, rotation: 3 })
        .to(
          teamEnterRef.current,
          { opacity: 1, y: 0, rotation: 0, duration: 1 },
          0.9,
        )
        .to(
          scoreEnterRef.current,
          { opacity: 1, y: 0, rotation: 0, duration: 1 },
          1.05,
        );

      // Scroll-scrubbed drift — a small, gentle separation as the hero
      // scrolls away, echoing the same "cards drift apart" idea the
      // earlier iterations of this page used, at a much quieter amplitude
      // now that the cards are load-bearing content rather than ambient
      // decoration.
      gsap.timeline({
        scrollTrigger: {
          trigger: "#hero-v2",
          start: "top top",
          end: "bottom center",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      })
        .to(teamSlotRef.current, { y: -40, x: -20, ease: "power1.out" }, 0)
        .to(scoreSlotRef.current, { y: -40, x: 20, ease: "power1.out" }, 0);
    },
    { scope: stageRef },
  );

  return (
    <div className={styles.stage} ref={stageRef}>
      <div className={styles.cardSlot} data-corner="left" ref={teamSlotRef}>
        <div ref={teamEnterRef}>
          <SurfaceCard
            radius="lg"
            border="rule"
            elevation="sm"
            padding="none"
            clip
            className={styles.card}
          >
            <div className={styles.cardHeader}>
              <Text variant="headingSm" as="span">
                {heroCopy.team.title}
              </Text>
              <Icon
                name="arrowRight"
                size={16}
                className={styles.cardArrow}
              />
            </div>
            <div className={styles.cardMedia}>
              <TintedMedia
                src={heroCopy.video.src}
                alt={heroCopy.video.alt}
                fill
                sizes="(max-width: 768px) 45vw, 220px"
              />
            </div>
            <div className={styles.cardFooter}>
              <Text variant="caption" tone="muted">
                {heroCopy.team.footer}
              </Text>
            </div>
          </SurfaceCard>
        </div>
      </div>

      <div className={styles.cardSlot} data-corner="right" ref={scoreSlotRef}>
        <div ref={scoreEnterRef}>
          <SurfaceCard
            radius="lg"
            border="rule"
            elevation="sm"
            padding="lg"
            className={styles.card}
          >
            <Text variant="headingSm" as="span">
              {heroCopy.score.title}
            </Text>
            <div className={styles.scoreRow}>
              <Text variant="display" as="span" className={styles.scoreValue}>
                {heroCopy.score.value}
              </Text>
              <Text variant="bodySm" tone="muted">
                {heroCopy.score.label}
              </Text>
            </div>
            <SegmentedMeter
              value={heroCopy.score.value}
              max={heroCopy.score.max}
              label={`Talent score ${heroCopy.score.value} of ${heroCopy.score.max}`}
            />
            <div className={styles.cardFooterLink}>
              <Text variant="actionMd" as="span">
                {heroCopy.score.cta}
              </Text>
              <Icon name="arrowRight" size={14} />
            </div>
          </SurfaceCard>
        </div>
      </div>
    </div>
  );
}
