"use client";

import Image from "next/image";
import { useRef } from "react";

import {
  gsap,
  prefersReducedMotion,
  useDarkNavRegion,
  useGSAP,
} from "@gridline/motion";
import {
  heroBackdropImages,
  heroBackdropTiming,
} from "@/content/variants/v3/hero";

import styles from "./HeroBackdrop.module.css";

/**
 * The hero's full-bleed photographic background: the stills stacked on top
 * of each other, cross-fading on a loop, under a dark scrim that buys the
 * copy its contrast.
 *
 * This element is `inset: 0` of the hero, so its bounding box tracks the
 * section's exactly — which is why `useDarkNavRegion` is called here rather
 * than in `HeroSection`. That keeps the whole section server-rendered:
 * this is the only part of the hero that needs the client.
 */
export function HeroBackdrop() {
  const rootRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // "overlay" rather than the default "dark": this hero runs *behind* the
  // nav, so the bar has to disappear entirely instead of turning into a
  // dark plate sitting on top of the photograph.
  useDarkNavRegion(rootRef, "overlay");

  useGSAP(
    () => {
      // A single still, held. Reduced motion means no cross-fade and no
      // drift — but the first photograph is CSS-visible by default, so the
      // hero still looks finished rather than blank.
      if (prefersReducedMotion()) return;

      const layers = layerRefs.current.filter(
        (el): el is HTMLDivElement => el !== null,
      );
      if (layers.length < 2) return;

      const { hold, fade } = heroBackdropTiming;
      const step = hold + fade;
      const cycle = step * layers.length;

      // The cross-fade. Opacity and stacking order only — the drift below
      // is a separate tween, so neither can push the other's timing around.
      //
      // Every step is placed at an absolute time rather than with `+=`:
      // relative positions accumulate from whatever the timeline's current
      // end happens to be, which makes the real interval between two
      // stills a function of every tween queued before it. Absolute times
      // mean each still is on screen for exactly `hold` seconds.
      //
      // `zIndex` is set explicitly on every step because DOM order alone
      // can't carry a cycle: the last-to-first hand-off fades in a layer
      // that sits *underneath* the outgoing one, and without lifting it
      // first that fade would be invisible.
      const fades = gsap.timeline({ repeat: -1 });

      layers.forEach((current, index) => {
        const next = layers[(index + 1) % layers.length];
        const start = index * step + hold;

        fades
          .set(next, { zIndex: 2 }, start)
          .set(current, { zIndex: 1 }, start)
          .fromTo(
            next,
            { opacity: 0 },
            { opacity: 1, duration: fade, ease: "power1.inOut" },
            start,
          )
          .set(current, { opacity: 0, zIndex: 0 }, start + fade);
      });

      // A slow breath across the whole rotation, so a still that is holding
      // is never completely static. One tween over every layer at once, at
      // the full cycle's length: only one layer is ever visible, so they
      // can share a scale, and sharing it keeps the drift from restarting
      // on each hand-off.
      gsap.to(layers, {
        scale: 1.07,
        duration: cycle,
        repeat: -1,
        yoyo: true,
        ease: "none",
      });
    },
    { scope: rootRef },
  );

  return (
    <div className={styles.backdrop} ref={rootRef} aria-hidden="true">
      {heroBackdropImages.map((image, index) => (
        <div
          key={image.src}
          ref={(el) => {
            layerRefs.current[index] = el;
          }}
          className={styles.layer}
          /* Only the first still is visible before the timeline starts —
             and it stays that way for a reduced-motion viewer. */
          data-initial={index === 0 ? "" : undefined}
        >
          <Image
            src={image.src}
            alt=""
            fill
            sizes="100vw"
            quality={90}
            priority={index === 0}
            className={styles.image}
          />
        </div>
      ))}

      <div className={styles.scrim} />
    </div>
  );
}
