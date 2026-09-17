import Link from "next/link";
import { GridModule } from "@gridline";
import { quizCtaCopy } from "@/content/quizCta";

import styles from "./QuizCtaSection.module.css";

export interface QuizCtaSectionProps {
  headingLine1?: string;
  headingLine2?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
}

/**
 * QuizCtaSection — Immersive full-screen backdrop CTA infused just above the footer on `/new`.
 *
 * - Full-width bleed background image (/assets/form_gradient.png) matching the design reference.
 * - Centered layout with display heading ("Discover / What’s Next").
 * - Inspiring one-liner description.
 * - Single red CTA button ("Take Talentnext").
 */
export function QuizCtaSection({
  headingLine1 = quizCtaCopy.headingLine1,
  headingLine2 = quizCtaCopy.headingLine2,
  description = quizCtaCopy.description,
  buttonLabel = quizCtaCopy.buttonLabel,
  buttonHref = quizCtaCopy.buttonHref,
}: QuizCtaSectionProps) {
  return (
    <GridModule id="quiz-cta" rule="bottom" aria-labelledby="quiz-cta-heading">
      <div className={styles.bleed}>
        <div className={styles.content}>
          <h2 id="quiz-cta-heading" className={styles.heading}>
            {headingLine1}
            <br />
            {headingLine2}
          </h2>
          {description ? <p className={styles.description}>{description}</p> : null}
          <Link href={buttonHref} className={styles.ctaButton}>
            {buttonLabel}
          </Link>
        </div>
      </div>
    </GridModule>
  );
}
