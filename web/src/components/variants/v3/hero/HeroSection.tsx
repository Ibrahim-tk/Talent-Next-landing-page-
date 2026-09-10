import { Button, GridModule, Highlight, Text } from "@gridline";
import { heroCopy } from "@/content/variants/v3/hero";

import { HeroBackdrop } from "./HeroBackdrop";
import styles from "./HeroSection.module.css";

/**
 * The hero for landing page variation 3, served at `/v3`.
 *
 * A full-bleed photographic hero: the stills cross-fade behind a dark
 * scrim (`HeroBackdrop`) and the copy sits over them, pushed to the bottom
 * of the frame and split across three columns — an oversized headline at
 * the lower left, an empty middle column holding the two apart, and the
 * body plus the call to action at the lower right.
 *
 * The middle column is real, not a gap: it is what keeps the two blocks
 * pinned to their own corners at every width instead of drifting toward
 * each other as the viewport narrows. It stays empty by design.
 *
 * v1's blueprint grid and corner crosshairs are gone here. Both are drawn
 * in the light theme's own colours and would need to be re-tinted to read
 * on a photograph — and the section's whole surface is now an image, which
 * is doing the job the blueprint was there to do.
 */
export function HeroSection() {
  return (
    <GridModule
      id="hero"
      rule="bottom"
      aria-label="Introduction"
      className={styles.section}
    >
      <HeroBackdrop />

      <div className={styles.columns}>
        <div className={styles.headlineColumn}>
          {/* `tone` as well as the colour in the stylesheet: relying on
              this module's own rule to beat Text's variant class means
              relying on CSS Module ordering, which the design system
              explicitly says not to do (gridline/README.md). */}
          <Text
            variant="display"
            as="h1"
            tone="inverse"
            className={styles.headline}
          >
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
        </div>

        {/* Deliberately empty — see the component doc comment. */}
        <div className={styles.spacerColumn} aria-hidden="true" />

        <div className={styles.asideColumn}>
          <Text variant="bodyMd" tone="inverseSecondary" className={styles.body}>
            {heroCopy.body}
          </Text>

          <Button href={heroCopy.ctaHref} variant="accent" size="lg">
            {heroCopy.ctaLabel}
          </Button>
        </div>
      </div>
    </GridModule>
  );
}
