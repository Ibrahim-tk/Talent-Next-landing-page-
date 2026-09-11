"use client";

import Image from "next/image";
import { useRef } from "react";

import { useDarkNavRegion } from "@gridline/motion";
import { heroCopy } from "@/content/variants/v2/hero";

import styles from "./HeroBackdrop.module.css";

/**
 * The hero's full-bleed photograph and the scrim that buys the copy its
 * contrast.
 *
 * This element is `inset: 0` of the hero, so its bounding box tracks the
 * section's exactly — which is why `useDarkNavRegion` is called here rather
 * than in `HeroSection`. That keeps the rest of the hero server-rendered:
 * this is the only part of it that needs the client, and it needs the
 * client only to claim the nav.
 *
 * Unlike v3's backdrop there is no rotation and no drift here — one still,
 * held — so there is no GSAP timeline either.
 */
export function HeroBackdrop() {
  const rootRef = useRef<HTMLDivElement>(null);

  // "blur" rather than "dark": this hero runs *behind* the nav, so a dark
  // plate would sit on top of the photograph. Frosted glass keeps the
  // picture visible through the bar while still giving the bar an edge —
  // which is what separates this from v3's fully transparent "overlay".
  useDarkNavRegion(rootRef, "blur");

  return (
    <div className={styles.backdrop} ref={rootRef} aria-hidden="true">
      <Image
        src={heroCopy.image.src}
        alt=""
        fill
        /* The box is the whole viewport width at every breakpoint, so there
           is no smaller candidate for the browser to pick. */
        sizes="100vw"
        quality={90}
        priority
        className={styles.image}
      />

      <div className={styles.scrim} />
    </div>
  );
}
