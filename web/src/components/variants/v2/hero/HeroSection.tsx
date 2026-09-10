import Image from "next/image";

import { Button, Crosshair, GridModule, Highlight, Text } from "@gridline";
import { heroCopy } from "@/content/variants/v2/hero";

import styles from "./HeroSection.module.css";

/**
 * The hero for landing page variation 2, served at `/v2`.
 *
 * Where v1 ends on the scroll-scrubbed asset cloud (`HeroStage` — the
 * phone, its glow, and three drifting product cards), this variation ends
 * on a single photograph running the full width of the canvas. That makes
 * the whole section server-rendered: there is no scroll-driven motion left
 * in it, so nothing here needs to run on the client.
 */
export function HeroSection() {
  return (
    <GridModule
      id="hero"
      rule="bottom"
      clip
      aria-label="Introduction"
      className={styles.section}
    >
      <div className={styles.blueprint} aria-hidden="true" />
      <Crosshair corner="topLeft" />
      <Crosshair corner="topRight" />

      <div className={styles.content}>
        <Text variant="display" as="h1" className={styles.headline}>
          <span className={styles.headlineLead}>{heroCopy.headlineBefore}</span>
          <Highlight className={styles.headlineAccent}>
            {heroCopy.headlineAccent}
          </Highlight>
          <span className={styles.headlineLead}>{heroCopy.headlineAfter}</span>
        </Text>

        <Text variant="bodyMd" className={styles.body}>
          {heroCopy.body}
        </Text>

        <div className={styles.ctaDock}>
          {/* The accent variant rather than the default black square: this is
              the one action on the page the whole hero exists to deliver, and
              the accent is already carrying the headline's key word right
              above it. */}
          <Button href={heroCopy.ctaHref} variant="accent" size="lg">
            {heroCopy.ctaLabel}
          </Button>
        </div>
      </div>

      {/* The closing band. `fill` + `cover` rather than an intrinsically
          sized image: the band's height is set by the layout (a wide strip,
          not the photo's own 3:2) and the photo is cropped into it. */}
      <div className={styles.media}>
        <Image
          src={heroCopy.image.src}
          alt={heroCopy.image.alt}
          fill
          sizes="100vw"
          priority
          className={styles.mediaImage}
        />
      </div>
    </GridModule>
  );
}
