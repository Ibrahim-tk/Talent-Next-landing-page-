"use client";

import Link from "next/link";
import { useRef } from "react";

import { GridModule } from "@gridline";
import { useDarkNavRegion } from "@gridline/motion";
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
  /* The sticky nav inverts over this band, the same way it does over Get
     Started on the homepage: the backdrop is a deep red curtain and the
     default bar — white at 95%, with a near-black CTA on it — sits on that
     as a bright slab. The ref goes on `.bleed`, the box that carries the
     image, so the bar flips over exactly the range that is dark. */
  const darkSurfaceRef = useRef<HTMLDivElement>(null);
  useDarkNavRegion(darkSurfaceRef);

  return (
    /* `rule="none"`: GridModule rules its bottom edge by default, and this
       band is the last thing above the dark footer — that hairline was the
       white line running between the two. The footer's own change of colour
       is the division; there is nothing left for a rule to separate. */
    <GridModule id="quiz-cta" rule="none" aria-labelledby="quiz-cta-heading">
      <div className={styles.bleed} ref={darkSurfaceRef}>
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
