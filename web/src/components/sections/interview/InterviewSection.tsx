import Image from "next/image";

import { GridModule, Text } from "@gridline";
import { interviewCopy, interviewStages } from "@/content/interview";

import styles from "./InterviewSection.module.css";

/**
 * The reassurance band — a centred heading over a static three-up row.
 * Each panel is identical in structure: a gradient plate (grad1–3) with the
 * matching still (pic1–3) floating over it, and one line of copy underneath.
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
              <Image
                src={stage.background}
                alt=""
                aria-hidden
                fill
                sizes="(max-width: 860px) 100vw, 34vw"
                className={styles.backdrop}
              />
              <div className={styles.overlay}>
                <Image
                  src={stage.overlay}
                  alt={stage.overlayAlt}
                  fill
                  sizes="(max-width: 860px) 83vw, 28vw"
                  className={styles.overlayImage}
                />
              </div>
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
