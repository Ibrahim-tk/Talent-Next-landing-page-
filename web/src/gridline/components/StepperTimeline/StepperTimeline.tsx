import { cx } from "../../utils/cx";
import { Icon, type IconName } from "../Icon/Icon";
import { Text } from "../Text/Text";
import styles from "./StepperTimeline.module.css";

export type StepState = "complete" | "pending";

export interface StepperStep {
  id: string;
  label: string;
  icon: IconName;
  state: StepState;
}

export interface StepperTimelineProps {
  steps: readonly StepperStep[];
  /** Accessible name for the list. */
  label?: string;
  className?: string;
}

/**
 * A step's connector takes the state of the step *below* it, so the dashed
 * spine reads as "progress reached this far" rather than colouring the gap
 * after the last completed step.
 *
 * ```tsx
 * <StepperTimeline steps={nextSteps} label="Your recommended next steps" />
 * ```
 */
export function StepperTimeline({
  steps,
  label,
  className,
}: StepperTimelineProps) {
  return (
    <ol className={cx(styles.root, className)} aria-label={label}>
      {steps.map((step, index) => {
        const nextStep = steps[index + 1];

        return (
          <li key={step.id} className={styles.item}>
            <div className={styles.spine} aria-hidden="true">
              <span
                className={cx(
                  styles.marker,
                  step.state === "complete"
                    ? styles.markerComplete
                    : styles.markerPending,
                )}
              />
              {nextStep ? (
                <span
                  className={cx(
                    styles.connector,
                    nextStep.state === "complete"
                      ? styles.connectorComplete
                      : styles.connectorPending,
                  )}
                />
              ) : null}
            </div>
            <div className={styles.pill}>
              <Icon name={step.icon} size={16} className={styles.icon} />
              <Text variant="metricLabel">{step.label}</Text>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
