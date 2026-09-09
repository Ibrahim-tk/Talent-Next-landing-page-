"use client";

import { useRef, useState, type FormEvent } from "react";

import {
  Button,
  Field,
  FieldRow,
  Icon,
  PillGroup,
  ProgressTrack,
  SurfaceCard,
  Text,
  TextField,
} from "@gridline";
import {
  callTimeOptions,
  formDefaults,
  formLabels,
  getStartedCopy,
  goalOptions,
  situationOptions,
} from "@/content/getStarted";

import styles from "./IntakeForm.module.css";

const STEP_COUNT = 3;

/** Percentage shown on the intro panel's progress bar for each step. */
const stepProgress = [33, 66, 100] as const;

/**
 * The three-step intake questionnaire.
 *
 * Laid out as two panels sharing one card: a dark intro panel (heading +
 * step progress, tinted and blurred via `backdrop-filter` straight through
 * to the section's own background image — no image layer of its own)
 * beside the active step's fields, painted fully opaque white. Real React
 * state drives which step is mounted, so the browser's own validation can
 * run on submit.
 */
export function IntakeForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  const [situation, setSituation] = useState<string>(formDefaults.situation);
  const [goal, setGoal] = useState<string>(formDefaults.goal);
  const [callTime, setCallTime] = useState<string>(formDefaults.callTime);

  const goNext = () => setStep((current) => Math.min(current + 1, STEP_COUNT));
  const goBack = () => setStep((current) => Math.max(current - 1, 1));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: POST to the intake endpoint once it exists. Until then the form
    // behaves exactly as the static page did — it confirms locally.
    setSubmitted(true);
    requestAnimationFrame(() => {
      successRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  };

  const progress = stepProgress[step - 1] ?? 0;

  return (
    <SurfaceCard
      tone="none"
      radius="none"
      border="rule"
      elevation="none"
      padding="none"
      clip
      className={styles.shell}
    >
      <div className={styles.introPanel}>
        <Text
          variant="headingLg"
          as="h2"
          tone="inverse"
          className={styles.introHeading}
        >
          {getStartedCopy.heading}
        </Text>
        <ProgressTrack
          value={progress}
          tone="accent"
          size="sm"
          label={`Step ${step} of ${STEP_COUNT}`}
        />
      </div>

      <div className={styles.stepPanel}>
        {submitted ? (
          <div className={styles.success} ref={successRef} role="status">
            <div className={styles.successBadge}>
              <Icon name="check" size={24} />
            </div>
            <Text variant="headingMd" className={styles.successTitle}>
              {getStartedCopy.success.title}
            </Text>
            <Text variant="bodyMd">{getStartedCopy.success.body}</Text>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            {step === 1 ? (
              <>
                <div className={styles.fieldGroup}>
                  <Field label={formLabels.situation} required>
                    <PillGroup
                      label={formLabels.situation}
                      options={situationOptions}
                      value={situation}
                      onChange={setSituation}
                      columns={1}
                    />
                  </Field>
                </div>

                <div className={styles.fieldGroup}>
                  <Field label={formLabels.goal} required>
                    <PillGroup
                      label={formLabels.goal}
                      options={goalOptions}
                      value={goal}
                      onChange={setGoal}
                      columns={1}
                    />
                  </Field>
                </div>
              </>
            ) : null}

            {step === 2 ? (
              <>
                <div className={styles.fieldGroup}>
                  <Field label={formLabels.callTime} required>
                    <PillGroup
                      label={formLabels.callTime}
                      options={callTimeOptions}
                      value={callTime}
                      onChange={setCallTime}
                      columns={1}
                    />
                  </Field>
                </div>

                <div className={styles.fieldGroup}>
                  <TextField
                    id="whats-next"
                    name="whats_next"
                    type="text"
                    label={formLabels.whatsNext}
                    placeholder={formLabels.whatsNextPlaceholder}
                  />
                </div>
              </>
            ) : null}

            {step === 3 ? (
              <div className={styles.fieldStack}>
                <FieldRow>
                  <TextField
                    id="first-name"
                    name="first_name"
                    type="text"
                    autoComplete="given-name"
                    label={formLabels.firstName}
                    required
                  />
                  <TextField
                    id="last-name"
                    name="last_name"
                    type="text"
                    autoComplete="family-name"
                    label={formLabels.lastName}
                    required
                  />
                </FieldRow>

                <TextField
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  label={formLabels.email}
                  required
                />

                <FieldRow layout="wide">
                  <TextField
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    label={formLabels.phone}
                    placeholder={formLabels.phonePlaceholder}
                    required
                  />
                  <TextField
                    id="postal-code"
                    name="postal_code"
                    type="text"
                    autoComplete="postal-code"
                    label={formLabels.postalCode}
                    required
                  />
                </FieldRow>
              </div>
            ) : null}

            {/* Values from earlier steps travel with the submission even
                though their controls are unmounted. */}
            {step === 3 ? (
              <>
                <input type="hidden" name="situation" value={situation} />
                <input type="hidden" name="goal" value={goal} />
                <input type="hidden" name="call_time" value={callTime} />
              </>
            ) : null}

            <div className={styles.footer}>
              {step > 1 ? (
                <Button
                  variant="ghost"
                  size="md"
                  onClick={goBack}
                  iconBefore={<Icon name="arrowLeft" size={14} />}
                >
                  Previous
                </Button>
              ) : (
                <span />
              )}

              {step < STEP_COUNT ? (
                <Button
                  size="md"
                  onClick={goNext}
                  iconAfter={<Icon name="arrowRight" size={14} />}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  size="md"
                  iconAfter={<Icon name="arrowRight" size={14} />}
                >
                  Send it in
                </Button>
              )}
            </div>
          </form>
        )}
      </div>
    </SurfaceCard>
  );
}
