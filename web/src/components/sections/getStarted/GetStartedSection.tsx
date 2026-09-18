"use client";

import { useRef } from "react";

import { GridModule } from "@gridline";
import { useDarkNavRegion } from "@gridline/motion";

import { IntakeForm } from "./IntakeForm";
import styles from "./GetStartedSection.module.css";

/**
 * The heading that used to sit centred above the form now lives inside
 * `IntakeForm`'s own intro panel (see the reference layout), so this
 * section is just the textured backdrop + the card itself. It is still
 * this section's heading for all that it sits inside the card, so the
 * module is `aria-labelledby` it rather than carrying an `aria-label`
 * that restated it in different words. The backdrop
 * (`.bleed`) breaks out to the full viewport width; the card (`.wrapper`)
 * stays on the normal centred measure. See GetStartedSection.module.css.
 */
export function GetStartedSection() {
  /* The sticky nav inverts over this section, the same way it does over the
     deliverables band and "See It in Action". This band's backdrop is a
     deep red-to-black gradient, and the default bar — white at 95% — sat on
     it as a bright slab with a near-black CTA on it, which is the one
     combination the dark theme exists to prevent.

     The ref goes on `.bleed` and not on the module, because `.bleed` is the
     box that actually carries the gradient: the bar flips over exactly the
     scroll range that is dark and not a pixel more. */
  const darkSurfaceRef = useRef<HTMLDivElement>(null);
  useDarkNavRegion(darkSurfaceRef);

  /* `rule="none"`: GridModule rules `bottom` by default, and that hairline
     landed between this section's gradient and the footer's dark — a light
     line across the seam of two dark bands, which read as a gap in the page
     rather than as the division it is meant to be. The footer below draws
     its own top edge by being a different colour, so there is nothing left
     for this rule to separate. */
  return (
    <GridModule
      id="get-started"
      rule="none"
      aria-labelledby="get-started-heading"
    >
      <div className={styles.bleed} ref={darkSurfaceRef}>
        <div className={styles.wrapper}>
          <IntakeForm />
        </div>
      </div>
    </GridModule>
  );
}
