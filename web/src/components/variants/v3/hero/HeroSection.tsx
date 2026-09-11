"use client";

import { useRef } from "react";

import { Button, Crosshair, GridModule, Highlight, Text } from "@gridline";
import { heroCopy } from "@/content/variants/v3/hero";

import { HeroOrbit, useHeroOrbitEntry } from "./HeroOrbit";
import styles from "./HeroSection.module.css";

/**
 * The hero for landing page variation 3, served at `/v3`.
 *
 * The copy is set the way v1 sets it — one centred stack, lead line, accent
 * word, lead line, then the paragraph and the call to action — on the
 * blueprint lattice with the corner crosshairs, inside the canvas rules.
 * The words themselves are identical to every other variation's.
 *
 * What this variation adds is the cloud around it: four photographs at four
 * different sizes and a circular video, which fly in from beyond the two
 * canvas rules on load and settle into the columns either side of the copy.
 *
 * The composition is a three-column grid — rail, copy, rail — and that is
 * the load-bearing decision in this file. The photographs cannot overlap
 * the headline at any viewport width because they are positioned inside
 * boxes the headline is not in. There is no z-index race, no set of
 * hand-tuned offsets that hold at 1440px and break at 1280px, and no width
 * at which the art has to be nudged out of the type's way: the grid makes
 * the overlap structurally impossible rather than merely unlikely.
 *
 * Client-rendered only because the entry timeline needs a ref to the
 * module. The copy is static markup either way.
 *
 * This replaced a full-bleed photographic hero that ran behind the nav and
 * cross-faded stills behind bottom-aligned copy. That treatment now lives
 * on `/v2`, which is why it is gone from here rather than kept in both.
 */
export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useHeroOrbitEntry(sectionRef);

  return (
    <GridModule
      id="hero"
      rule="bottom"
      clip
      aria-label="Introduction"
      className={styles.section}
      ref={sectionRef}
    >
      <div className={styles.blueprint} aria-hidden="true" />
      <Crosshair corner="topLeft" />
      <Crosshair corner="topRight" />

      <div className={styles.columns}>
        <HeroOrbit side="left" />

        <div className={styles.content}>
          <Text variant="display" as="h1" className={styles.headline}>
            <span className={styles.headlineLead}>
              {heroCopy.headlineBefore}
            </span>
            <Highlight className={styles.headlineAccent}>
              {heroCopy.headlineAccent}
            </Highlight>
            <span className={styles.headlineLead}>
              {heroCopy.headlineAfter}
            </span>
          </Text>

          <Text variant="bodyMd" className={styles.body}>
            {heroCopy.body}
          </Text>

          {/* The accent variant rather than the default black square: this
              is the one action on the page the whole hero exists to
              deliver, and the accent is already carrying the headline's key
              word right above it. */}
          <Button href={heroCopy.ctaHref} variant="accent" size="lg">
            {heroCopy.ctaLabel}
          </Button>
        </div>

        <HeroOrbit side="right" />
      </div>
    </GridModule>
  );
}
