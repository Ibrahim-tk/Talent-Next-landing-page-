import { GridModule } from "@gridline";

import { IntakeForm } from "./IntakeForm";
import styles from "./GetStartedSection.module.css";

/**
 * The heading that used to sit centred above the form now lives inside
 * `IntakeForm`'s own intro panel (see the reference layout), so this
 * section is just the textured backdrop + the card itself.
 */
export function GetStartedSection() {
  return (
    <GridModule
      id="get-started"
      rule="bottom"
      aria-label="Schedule your session"
      className={styles.section}
    >
      <div className={styles.wrapper}>
        <IntakeForm />
      </div>
    </GridModule>
  );
}
