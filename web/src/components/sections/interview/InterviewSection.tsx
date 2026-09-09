import { GridModule, MeterRow, SurfaceCard, Text } from "@gridline";
import {
  interviewCopy,
  interviewStages,
  interviewTopStrengths,
} from "@/content/interview";

import styles from "./InterviewSection.module.css";

/**
 * The reassurance band — a centred heading over a static three-up row.
 * Each panel is identical in structure: the same "Top Strength" card (the
 * pattern lives in HowItWorksSection — a SurfaceCard of MeterRows) floating
 * over the same ambient-glow backdrop, with one line of copy underneath.
 * Only that one line of copy differs panel to panel.
 */
export function InterviewSection() {
  return (
    <GridModule
      id="reassurance"
      rule="bottom"
      aria-labelledby="interview-heading"
    >
      <div className={styles.headerRow}>
        <Text
          variant="editorial"
          as="h2"
          id="interview-heading"
          align="center"
          className={styles.heading}
        >
          {interviewCopy.heading}
        </Text>
      </div>

      <div className={styles.grid}>
        {interviewStages.map((stage) => (
          <div key={stage.id} className={styles.panel}>
            <div className={styles.media}>
              <SurfaceCard
                radius="xl"
                border="elevated"
                elevation="sm"
                padding="lg"
                className={styles.strengthCard}
              >
                <Text
                  variant="metricLabel"
                  as="h4"
                  className={styles.strengthCardTitle}
                >
                  {interviewCopy.cardTitle}
                </Text>
                <div className={styles.strengthRows}>
                  {interviewTopStrengths.map((strength) => (
                    <MeterRow
                      key={strength.name}
                      name={strength.name}
                      value={strength.value}
                    />
                  ))}
                </div>
              </SurfaceCard>
            </div>

            <div className={styles.caption}>
              <Text variant="bodyMd" tone="body" measure="medium">
                {stage.body}
              </Text>
            </div>
          </div>
        ))}
      </div>

      {/* A closing row below the grid, same shape as the Archetypes
          section's own footer bar — left empty until there's copy for it. */}
      <div className={styles.footerRow} />
    </GridModule>
  );
}
