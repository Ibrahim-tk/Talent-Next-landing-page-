"use client";

import Image from "next/image";
import { useRef } from "react";

import { cx } from "@gridline";
import { gsap, prefersReducedMotion, useGSAP } from "@gridline/motion";
import {
  heroCopy,
  heroFloatingCards,
  type HeroCardSlot,
} from "@/content/variants/v1/hero";

import styles from "./HeroStage.module.css";

const slotClass: Record<HeroCardSlot, string> = {
  ai: styles.slotAi,
  strength: styles.slotStrength,
  score: styles.slotScore,
};

/**
 * The hero's asset cloud.
 *
 * On scroll the three product cards drift outward and fade while the phone
 * stays put — the composition opens up rather than sliding away as a block.
 * Each card's drift comes from `heroFloatingCards[].drift` so the motion is
 * data, not hard-coded numbers in the timeline.
 */
export function HeroStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<HeroCardSlot, HTMLDivElement>>(new Map());

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // Triggered on the whole hero module, not the stage: the spread should
      // begin the moment the page starts moving, well before the stage's own
      // top reaches the top of the viewport.
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom center",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      for (const card of heroFloatingCards) {
        const element = cardRefs.current.get(card.slot);
        if (!element) continue;

        timeline.to(
          element,
          {
            x: card.drift.x,
            y: card.drift.y,
            rotation: card.drift.rotation,
            opacity: card.drift.opacity,
            ease: "power1.out",
          },
          0,
        );
      }
    },
    { scope: stageRef },
  );

  return (
    <div className={styles.stage} ref={stageRef}>
      <div className={styles.glow} aria-hidden="true">
        <Image
          src={heroCopy.glow.src}
          alt=""
          width={heroCopy.glow.width}
          height={heroCopy.glow.height}
          priority
          className={cx(styles.glowLayer, styles.glowNear)}
        />
        <Image
          src={heroCopy.glow.src}
          alt=""
          width={heroCopy.glow.width}
          height={heroCopy.glow.height}
          className={cx(styles.glowLayer, styles.glowFar)}
        />
      </div>

      {heroFloatingCards.map((card) => (
        <div
          key={card.slot}
          ref={(element) => {
            if (element) cardRefs.current.set(card.slot, element);
            else cardRefs.current.delete(card.slot);
          }}
          className={cx(styles.card, slotClass[card.slot])}
          aria-hidden="true"
        >
          <div className={styles.cardInner}>
            <Image
              src={card.src}
              alt=""
              width={card.width}
              height={card.height}
              priority={card.slot === "strength"}
              className={styles.cardImage}
            />
          </div>
        </div>
      ))}

      <div className={styles.phone}>
        <Image
          src={heroCopy.phone.src}
          alt={heroCopy.phone.alt}
          width={heroCopy.phone.width}
          height={heroCopy.phone.height}
          priority
          className={styles.phoneImage}
        />
      </div>
    </div>
  );
}
