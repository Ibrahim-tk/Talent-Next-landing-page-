import { GridModule } from "@gridline";

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
  return (
    <GridModule
      id="get-started"
      rule="bottom"
      aria-labelledby="get-started-heading"
    >
      <div className={styles.bleed}>
        <div className={styles.wrapper}>
          <IntakeForm />
        </div>
      </div>
    </GridModule>
  );
}
