import {
  Button,
  Crosshair,
  DashedFrame,
  GridModule,
  Highlight,
  Text,
} from "@gridline";
import { heroCopy } from "@/content/hero";

import { HeroStage } from "./HeroStage";
import styles from "./HeroSection.module.css";

/**
 * The hero. Server-rendered apart from `HeroStage`, which owns the
 * scroll-scrubbed asset cloud and therefore runs on the client.
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

        <DashedFrame className={styles.ctaDock}>
          <Button href={heroCopy.ctaHref} size="lg">
            {heroCopy.ctaLabel}
          </Button>
        </DashedFrame>

        <Text variant="caption" as="span" className={styles.microcopy}>
          {heroCopy.microcopy}
        </Text>
      </div>

      <HeroStage />
    </GridModule>
  );
}
