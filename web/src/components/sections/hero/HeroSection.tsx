import { Button, Crosshair, GridModule, Highlight, Text } from "@gridline";
import { heroCopy } from "@/content/hero";

import { HeroImage } from "./HeroImage";
import styles from "./HeroSection.module.css";

/**
 * The hero. Fully server-rendered: the stage is a single photograph ruled
 * edge to edge, with nothing layered over it and nothing animating on scroll.
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

      <HeroImage />
    </GridModule>
  );
}
