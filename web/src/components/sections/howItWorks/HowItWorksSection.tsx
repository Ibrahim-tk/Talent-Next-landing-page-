import Image from "next/image";
import type { CSSProperties } from "react";

import { GridModule, Highlight, Text } from "@gridline";
import {
  howItWorksCopy,
  howItWorksStepsCopy,
  showcaseSteps,
} from "@/content/howItWorks";

import styles from "./HowItWorksSection.module.css";

/**
 * "It Starts with 30 Minutes." — the homepage's version of the section.
 *
 * All three steps are written out in one list down the left, with a single
 * still of the product on the right. Rendered by the homepage and by `/v2`.
 *
 * There is a second version of this same section:
 * `sections/howItWorksMatrix/`, which gives each step its own panel in a
 * three-cell matrix and is what `/v1` and `/v3` render. The two are
 * alternative *layouts*, not alternative copy — both read their words from
 * `howItWorksCopy`, so a wording change lands on all four pages and only
 * the arrangement differs. See that file's own note.
 *
 * Static, deliberately — nothing here opens, advances or animates. An
 * earlier pass made the left a self-advancing accordion and the right a
 * grid of tiles that dealt themselves out; this replaced it. So there is no
 * client boundary, no state and no motion: the whole section is a server
 * component that renders once.
 */
export function HowItWorksSection() {
  const { showcase } = howItWorksStepsCopy;

  return (
    <GridModule
      id="how-it-works"
      rule="bottom"
      aria-labelledby="how-it-works-heading"
    >
      {/* The same two-row blueprint spacer the shared section opens with. */}
      <div className={styles.gridBox} aria-hidden="true" />

      <div className={styles.headerRow}>
        <Text
          variant="display"
          as="h2"
          id="how-it-works-heading"
          align="center"
          className={styles.heading}
        >
          {howItWorksCopy.headingBefore}
          <Highlight>{howItWorksCopy.headingAccent}</Highlight>
          {howItWorksCopy.headingAfter}
        </Text>
      </div>

      <div className={styles.grid}>
        <div className={styles.stepsCell}>
          <ol className={styles.steps}>
            {showcaseSteps.map((step) => (
              <li key={step.id} className={styles.step}>
                <Text variant="metricLabel" as="span" className={styles.index}>
                  {step.index}
                </Text>
                <div className={styles.stepText}>
                  <Text variant="headingMd" as="h3" className={styles.stepHeading}>
                    {step.heading}
                  </Text>
                  <Text variant="bodyLg" tone="body" className={styles.copy}>
                    {step.description}
                  </Text>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.stageCell}>
          <div className={styles.stage}>
            <div className={styles.stageGrid} aria-hidden="true" />

            <figure
              className={styles.frame}
              style={
                { "--v2-showcase-ratio": showcase.ratio } as CSSProperties
              }
            >
              <Image
                src={showcase.src}
                alt={showcase.alt}
                fill
                sizes="(max-width: 980px) 90vw, 48vw"
                className={styles.image}
              />
            </figure>

            {/* A static white fade over the foot of the stage, so the still
                dissolves into the section instead of stopping against a
                hard edge. Non-interactive by design. */}
            <div className={styles.fade} aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* A closing row below the grid, same shape as the shared section's
          own footer bar — left empty until there's copy for it. */}
      <div className={styles.footerRow} />
    </GridModule>
  );
}
