import Image from "next/image";

import { GridModule, Highlight, StepperTimeline, Text } from "@gridline";
import { howItWorksCopy, nextSteps } from "@/content/howItWorks";

import styles from "./HowItWorksSection.module.css";

export function HowItWorksSection() {
  const { session, analysis, nextSteps: nextStepsCopy } = howItWorksCopy;

  return (
    <GridModule
      id="how-it-works"
      rule="bottom"
      aria-labelledby="how-it-works-heading"
    >
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
                  sizes="336px"
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
              <div className={styles.stepperWrap}>
                <StepperTimeline
                  steps={nextSteps}
                  label="Your recommended next steps"
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
