import Image from "next/image";

import { GridModule, Highlight, PlanStack, Text } from "@gridline";
import { howItWorksCopy, planPhases } from "@/content/howItWorks";

import styles from "./HowItWorksMatrixSection.module.css";

/**
 * "It Starts with 30 Minutes." — the three-panel matrix.
 *
 * A centred banner heading over a two-column matrix: a tall session panel
 * on the left, two stacked outcome rows on the right, each with its own
 * visual. Rendered by `/v1` and `/v3`.
 *
 * The homepage and `/v2` render `sections/howItWorks/` instead, which lays
 * the same three steps out as one list beside a single still. The two are
 * alternative layouts of identical copy — both read their words from
 * `howItWorksCopy` — so changing a step's wording changes all four pages
 * and only the arrangement differs between them.
 */
export function HowItWorksMatrixSection() {
  const { session, analysis, nextSteps: nextStepsCopy } = howItWorksCopy;

  return (
    <GridModule
      id="how-it-works"
      rule="bottom"
      aria-labelledby="how-it-works-heading"
    >
      {/* A plain grid-texture box opening the section, the same device
          SeeItInActionSection uses above its own header: two whole rows of
          the blueprint lattice, standing in for a spacer so the section
          starts on some of that "grid" feel rather than a blank gap. Two
          rows, not a fixed height, so it matches that section exactly and
          both track the frame width together. */}
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
        <div className={styles.sessionPanel}>
          <div className={styles.sessionMedia}>
            <Image
              src={session.image}
              alt={session.imageAlt}
              fill
              sizes="(max-width: 860px) 90vw, 45vw"
              quality={95}
              className={styles.sessionImage}
            />
          </div>
          <div className={styles.sessionText}>
            <Text variant="headingMd" className={styles.panelHeading}>
              {session.heading}
            </Text>
            <Text variant="bodyLg" tone="body" measure="medium">
              {session.description}
            </Text>
          </div>
        </div>

        <div className={styles.outcomes}>
          <div className={styles.outcomeRow}>
            <div className={styles.outcomeVisual}>
              <div className={styles.analysisMedia}>
                <Image
                  src={analysis.image}
                  alt={analysis.imageAlt}
                  fill
                  sizes="302px"
                  quality={95}
                  className={styles.analysisImage}
                />
              </div>
            </div>
            <div className={styles.outcomeText}>
              <Text variant="title" className={styles.panelHeading}>
                {analysis.heading}
              </Text>
              <Text variant="bodyLg" tone="body" measure="medium">
                {analysis.description}
              </Text>
            </div>
          </div>

          <div className={styles.outcomeRow}>
            <div className={styles.outcomeVisual}>
              <div className={styles.planWrap}>
                <PlanStack
                  phases={planPhases}
                  label="An example week-by-week plan"
                />
              </div>
            </div>
            <div className={styles.outcomeText}>
              <Text variant="title" className={styles.panelHeading}>
                {nextStepsCopy.heading}
              </Text>
              <Text variant="bodyLg" tone="body" measure="medium">
                {nextStepsCopy.description}
              </Text>
            </div>
          </div>
        </div>
      </div>

      {/* A closing row below the grid, same shape as InterviewSection's own
          footer bar — left empty until there's copy for it. */}
      <div className={styles.footerRow} />
    </GridModule>
  );
}
