"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type ChangeEvent, type FocusEvent, type FormEvent } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon, GlobeIcon } from "@hugeicons/core-free-icons";
import { Button, Icon, ProgressTrack } from "@gridline";
import { quizQuestions } from "@/content/quizQuestions";
import { detectCountry, normalisePhone, phoneCountries } from "@/content/phoneCountries";
import { saveQuizData, getQuizData, clearQuizData } from "@/lib/quizStorage";

import {
  validateContact,
  validateField,
  type ContactErrors,
  type ContactFields,
} from "@/lib/contactValidation";

import styles from "./QuizFlow.module.css";

export function QuizFlow() {
  const router = useRouter();

  /* Entering the flow starts clean: empty answers and an empty contact form,
     so a previous attempt's details never show up pre-filled. The exception
     is Back from the OTP step (?step=details), which reopens the details
     form with the answers and contact details kept. */
  const initialData = typeof window !== "undefined" ? getQuizData() : null;
  const resuming =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("step") === "details";

  const [isFormStep, setIsFormStep] = useState(resuming);
  const [questionIndex, setQuestionIndex] = useState<number>(
    resuming ? quizQuestions.length - 1 : 0,
  );
  const [answers, setAnswers] = useState<Record<string, string>>(
    resuming ? initialData?.answers ?? {} : {},
  );

  useEffect(() => {
    if (resuming) return;
    clearQuizData();
    // Once, when the flow is entered.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [contact, setContact] = useState({
    firstName: (resuming && initialData?.contact?.firstName) || "",
    lastName: (resuming && initialData?.contact?.lastName) || "",
    email: (resuming && initialData?.contact?.email) || "",
    phone: (resuming && initialData?.contact?.phone) || "",
    postalCode: (resuming && initialData?.contact?.postalCode) || "",
  });

  /* Errors show once a field has been left, or after a submit attempt. */
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFields, boolean>>>({});

  const totalQuestions = quizQuestions.length; // 12
  const currentQuestion = quizQuestions[questionIndex];
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;

  const handleSelectOption = (value: string) => {
    if (!currentQuestion) return;
    const updated = { ...answers, [currentQuestion.id]: value };
    setAnswers(updated);
    saveQuizData({ answers: updated });
    setNeedsAnswer(false);
  };

  /* Next stays clickable, but it only advances once an option is chosen;
     without one it asks for a choice instead. */
  const [needsAnswer, setNeedsAnswer] = useState(false);

  const handleNextQuestion = () => {
    if (!currentAnswer) {
      setNeedsAnswer(true);
      return;
    }
    setNeedsAnswer(false);
    if (questionIndex < totalQuestions - 1) {
      setQuestionIndex((prev) => prev + 1);
    } else {
      setIsFormStep(true);
    }
  };

  const handlePrevQuestion = () => {
    setNeedsAnswer(false);
    if (isFormStep) {
      setIsFormStep(false);
    } else if (questionIndex > 0) {
      setQuestionIndex((prev) => prev - 1);
    }
  };

  const handleContactChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    let { value } = e.target;
    /* Phone takes digits with one leading +; postal code takes digits only. */
    /* Digits typed without a + go after the picked country's code. */
    if (name === "phone" && shown && /^\d/.test(value)) value = shown.dial + value;
    if (name === "phone") value = normalisePhone(value);
    if (name === "postalCode") value = value.replace(/\D/g, "");
    const updated = { ...contact, [name]: value };
    setContact(updated);
    saveQuizData({ contact: updated });
    const key = name as keyof ContactFields;
    /* Phone is only checked on submit; editing it just clears a shown error. */
    if (key === "phone") setErrors((prev) => ({ ...prev, phone: undefined }));
    else if (touched[key]) setErrors((prev) => ({ ...prev, [key]: validateField(key, value) }));
  };

  const handleContactBlur = (e: FocusEvent<HTMLInputElement>) => {
    const key = e.target.name as keyof ContactFields;
    if (key === "phone") return;
    const value = key === "email" ? contact.email.trim() : contact[key];
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors((prev) => ({ ...prev, [key]: validateField(key, value) }));
  };

  /* No country until one is typed or picked: a globe and a neutral example
     number. Typing a dial code switches the flag on its own; picking a
     country swaps the dial code at the front of whatever is typed. */
  const [pickedIso, setPickedIso] = useState<string | null>("US");
  const country = detectCountry(contact.phone);
  const shown = country ?? phoneCountries.find((c) => c.iso === pickedIso);
  const phonePlaceholder = shown
    ? `${shown.dial} ${"1234567890123".slice(0, shown.digits[0])}`
    : "+00 123 456 7890";

  const handleCountrySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const next = phoneCountries.find((c) => c.iso === e.target.value);
    if (!next) return;
    setPickedIso(next.iso);
    const rest = country ? contact.phone.slice(country.dial.length) : contact.phone.replace(/^\+/, "");
    const updated = { ...contact, phone: rest ? normalisePhone(next.dial + rest) : "" };
    setContact(updated);
    saveQuizData({ contact: updated });
    setErrors((prev) => ({ ...prev, phone: undefined }));
  };


  const handleContactSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cleaned: ContactFields = {
      ...contact,
      firstName: contact.firstName.trim().replace(/\s+/g, " "),
      lastName: contact.lastName.trim().replace(/\s+/g, " "),
      email: contact.email.trim().toLowerCase(),
    };
    const found = validateContact(cleaned);
    setErrors(found);
    setTouched({ firstName: true, lastName: true, email: true, phone: true, postalCode: true });
    const firstInvalid = (Object.keys(cleaned) as (keyof ContactFields)[]).find((k) => found[k]);
    if (firstInvalid) {
      e.currentTarget.querySelector<HTMLInputElement>(`#${firstInvalid}`)?.focus();
      return;
    }

    setContact(cleaned);
    saveQuizData({ answers, contact: cleaned });
    router.push("/new/get-started/otp");
  };

  return (
    <div className={styles.section}>
      <div className={styles.card}>
        {/* Step 1 to 12: Questions */}
        {!isFormStep && currentQuestion && (
          <div className={styles.stageContainer}>
            {/* Progress Header: Left: QUESTION, Right: X of 12 (NO percentage) */}
            <div className={styles.progressHeader}>
              <div className={styles.progressMeta}>
                <span className={styles.stepLabel}>QUESTION</span>
                <span className={styles.questionNumberText}>
                  {questionIndex + 1} of {totalQuestions}
                </span>
              </div>
              <ProgressTrack
                value={(questionIndex / totalQuestions) * 100}
                tone="accent"
                size="sm"
                label={`Question ${questionIndex + 1} of ${totalQuestions}`}
              />
            </div>

            <div className={styles.questionHeader}>
              <h1 className={styles.questionTitle}>{currentQuestion.question}</h1>
            </div>

            {/* Options list: one radio row per choice — see QuizFlow.module.css
                for the shared geometry across unselected/hover/focus/selected. */}
            <div
              className={styles.optionsStack}
              role="radiogroup"
              aria-label={currentQuestion.question}
            >
              {currentQuestion.options.map((option) => {
                const isSelected = currentAnswer === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => handleSelectOption(option.value)}
                    className={`${styles.pillButton} ${
                      isSelected ? styles.pillButtonSelected : ""
                    }`}
                  >
                    <span className={styles.pillRadio} aria-hidden="true" />
                    <span>{option.label}</span>
                  </button>
                );
              })}
            </div>

            {needsAnswer && (
              <p className={styles.fieldError} role="alert">
                Select an option to continue.
              </p>
            )}

            {/* Previous and Next buttons pinned to the bottom */}
            <div className={styles.footerNav}>
              {questionIndex > 0 ? (
                <Button
                  variant="ghost"
                  size="md"
                  onClick={handlePrevQuestion}
                  iconBefore={<Icon name="arrowLeft" size={14} />}
                >
                  Previous
                </Button>
              ) : (
                <span />
              )}

              <Button
                variant={currentAnswer ? "primary" : "secondary"}
                size="md"
                onClick={handleNextQuestion}
                iconAfter={<Icon name="arrowRight" size={14} />}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Step 13: Personal Info Form (No big heading, description only) */}
        {isFormStep && (
          <form noValidate onSubmit={handleContactSubmit} className={styles.stageContainer}>
            <div className={styles.questionHeader}>
              <h1 className={styles.questionTitle}>Final Step</h1>
              <p className={styles.formDescription}>
                Where should we send your results and resources?
              </p>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formRow}>
                <div className={styles.inputField}>
                  <label htmlFor="firstName" className={styles.inputLabel}>
                    First Name <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="firstName"
                    maxLength={50}
                    onBlur={handleContactBlur}
                    aria-invalid={!!errors.firstName}
                    aria-describedby={errors.firstName ? "firstName-error" : undefined}
                    name="firstName"
                    type="text"
                    required
                    value={contact.firstName}
                    onChange={handleContactChange}
                    placeholder="e.g. Alex"
                    className={`${styles.textInput} ${errors.firstName ? styles.invalid : ""}`}
                  />
                  {errors.firstName && (
                    <p id="firstName-error" className={styles.fieldError} role="alert">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div className={styles.inputField}>
                  <label htmlFor="lastName" className={styles.inputLabel}>
                    Last Name <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="lastName"
                    maxLength={50}
                    onBlur={handleContactBlur}
                    aria-invalid={!!errors.lastName}
                    aria-describedby={errors.lastName ? "lastName-error" : undefined}
                    name="lastName"
                    type="text"
                    required
                    value={contact.lastName}
                    onChange={handleContactChange}
                    placeholder="e.g. Morgan"
                    className={`${styles.textInput} ${errors.lastName ? styles.invalid : ""}`}
                  />
                  {errors.lastName && (
                    <p id="lastName-error" className={styles.fieldError} role="alert">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className={styles.inputField}>
                <label htmlFor="email" className={styles.inputLabel}>
                  Email Address <span className={styles.required}>*</span>
                </label>
                <input
                  id="email"
                    maxLength={254}
                    onBlur={handleContactBlur}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={contact.email}
                  onChange={handleContactChange}
                  placeholder="alex.morgan@company.com"
                  className={`${styles.textInput} ${errors.email ? styles.invalid : ""}`}
                />
                  {errors.email && (
                    <p id="email-error" className={styles.fieldError} role="alert">
                      {errors.email}
                    </p>
                  )}
              </div>

              <div className={styles.formRow}>
                <div className={styles.inputField}>
                  <label htmlFor="phone" className={styles.inputLabel}>
                    Phone Number <span className={styles.required}>*</span>
                  </label>
                  <div className={`${styles.phoneField} ${errors.phone ? styles.invalid : ""}`}>
                    <input
                      id="phone"
                    maxLength={country ? country.dial.length + country.digits[1] : 16}
                    onBlur={handleContactBlur}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      required
                      value={contact.phone}
                      onChange={handleContactChange}
                      placeholder={phonePlaceholder}
                      className={styles.phoneInput}
                    />
                    <div className={styles.countryPicker}>
                      <span className={styles.flag} aria-hidden="true">
                        {shown ? shown.flag : <HugeiconsIcon icon={GlobeIcon} size={20} strokeWidth={1.5} />}
                      </span>
                      <span className={styles.chevron} aria-hidden="true">
                        <HugeiconsIcon icon={ArrowDown01Icon} size={14} strokeWidth={1.5} />
                      </span>
                      <select
                        aria-label="Country code"
                        value={shown?.iso ?? ""}
                        onChange={handleCountrySelect}
                        className={styles.countryNative}
                      >
                        <option value="" disabled>
                          Select country
                        </option>
                        {phoneCountries.map((c) => (
                          <option key={c.iso} value={c.iso}>
                            {c.flag} {c.name} ({c.dial})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {errors.phone && (
                    <p id="phone-error" className={styles.fieldError} role="alert">
                      {errors.phone}
                    </p>
                  )}
                </div>
                <div className={styles.inputField}>
                  <label htmlFor="postalCode" className={styles.inputLabel}>
                    Zip Code
                  </label>
                  <input
                    id="postalCode"
                    maxLength={10}
                    onBlur={handleContactBlur}
                    aria-invalid={!!errors.postalCode}
                    aria-describedby={errors.postalCode ? "postalCode-error" : undefined}
                    name="postalCode"
                    type="text"
                    inputMode="numeric"
                    value={contact.postalCode}
                    onChange={handleContactChange}
                    placeholder="e.g. 94107"
                    className={`${styles.textInput} ${errors.postalCode ? styles.invalid : ""}`}
                  />
                  {errors.postalCode && (
                    <p id="postalCode-error" className={styles.fieldError} role="alert">
                      {errors.postalCode}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.footerNav}>
              <Button
                variant="ghost"
                size="md"
                onClick={handlePrevQuestion}
                iconBefore={<Icon name="arrowLeft" size={14} />}
              >
                Back to Questions
              </Button>

              <Button
                type="submit"
                variant="accent"
                size="md"
                iconAfter={<Icon name="arrowRight" size={14} />}
              >
                Get My Results
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
