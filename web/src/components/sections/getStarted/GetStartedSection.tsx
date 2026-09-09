import { GridModule } from "@gridline";

import { IntakeForm } from "./IntakeForm";
import styles from "./GetStartedSection.module.css";

/**
 * The heading that used to sit centred above the form now lives inside
 * `IntakeForm`'s own intro panel (see the reference layout), so this
 * section is just the textured backdrop + the card itself. The backdrop
 * (`.bleed`) breaks out to the full viewport width; the card (`.wrapper`)
 * stays on the normal centred measure. See GetStartedSection.module.css.
 */
export function GetStartedSection() {
  return (
    <GridModule id="get-started" rule="bottom" aria-label="Schedule your session">
      <div className={styles.bleed}>
        <div className={styles.wrapper}>
          <IntakeForm />
        </div>
      </div>
    </GridModule>
  );
}
