import type { InputHTMLAttributes, ReactNode } from "react";

import { cx } from "../../utils/cx";
import { Text } from "../Text/Text";
import type { TextVariant } from "../Text/Text";
import styles from "./TextField.module.css";

export interface FieldProps {
  /** Visible label text. */
  label: ReactNode;
  /**
   * Id of the control the label points at. Omit for composite controls that
   * name themselves (a `PillGroup` carries its own `aria-label`): the label
   * then renders as plain text rather than a dangling `<label for>`.
   */
  htmlFor?: string;
  required?: boolean;
  hint?: ReactNode;
  /**
   * Type role for the label. Defaults to `label` (16px) — the right size
   * for naming a control ("Email", "Postal Code"). Step it up to `title`
   * (20px, the h6 rung) for a label that should read a rung louder than the
   * control it names.
   */
  labelVariant?: TextVariant;
  /**
   * Marks this label as the *question* a whole step is asking rather than
   * the name of a box, which earns it a heading's space beneath it instead
   * of the tight label gap. Kept separate from `labelVariant` on purpose:
   * how loud the question is set and how much air sits under it are two
   * decisions, and a question can want the extra room at any size. A label
   * stepped up past the `label` role implies it too, so callers that only
   * raise `labelVariant` keep the wider gap they already had.
   */
  question?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * Label + control + optional hint. Use it to wrap any control that isn't a
 * plain text input (a `PillGroup`, for instance).
 */
export function Field({
  label,
  htmlFor,
  required = false,
  hint,
  labelVariant = "label",
  question = false,
  className,
  children,
}: FieldProps) {
  return (
    <div className={cx(styles.field, className)}>
      <Text
        variant={labelVariant}
        as={htmlFor ? "label" : "span"}
        htmlFor={htmlFor}
        className={cx(
          styles.label,
          (question || labelVariant !== "label") && styles.labelQuestion,
        )}
      >
        {label}
        {required ? <span aria-hidden="true">*</span> : null}
      </Text>
      {children}
      {hint ? (
        <Text variant="caption" className={styles.hint}>
          {hint}
        </Text>
      ) : null}
    </div>
  );
}

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "className"> {
  id: string;
  label: ReactNode;
  hint?: ReactNode;
  /** Passed straight through to `Field` — see its own note. */
  labelVariant?: TextVariant;
  /** Passed straight through to `Field` — see its own note. */
  question?: boolean;
  className?: string;
}

/**
 * ```tsx
 * <TextField id="email" name="email" type="email" label="Email" required />
 * ```
 */
export function TextField({
  id,
  label,
  hint,
  required,
  labelVariant,
  question,
  className,
  ...inputProps
}: TextFieldProps) {
  return (
    <Field
      label={label}
      htmlFor={id}
      required={required}
      hint={hint}
      labelVariant={labelVariant}
      question={question}
      className={className}
    >
      <input
        id={id}
        required={required}
        className={styles.input}
        {...inputProps}
      />
    </Field>
  );
}

export type FieldRowLayout = "even" | "wide";

export interface FieldRowProps {
  /** `even` splits 1:1; `wide` splits 1.4:1 (e.g. phone beside postal code). */
  layout?: FieldRowLayout;
  className?: string;
  children: ReactNode;
}

/** Places sibling fields on a single line, collapsing on narrow screens. */
export function FieldRow({
  layout = "even",
  className,
  children,
}: FieldRowProps) {
  return (
    <div
      className={cx(
        styles.row,
        layout === "wide" ? styles.rowWide : styles.rowEven,
        className,
      )}
    >
      {children}
    </div>
  );
}
