"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Button, Icon, ProgressTrack } from "@gridline";
import { quizQuestions } from "@/content/quizQuestions";
import { saveQuizData, getQuizData, clearQuizData } from "@/lib/quizStorage";

import styles from "./QuizFlow.module.css";

export function QuizFlow() {
  const router = useRouter();

  /* Contact details are worth keeping — someone who lands back here after
     the OTP step should not retype them. The answers are not: the quiz
     always opens on question 1, and restoring them meant every question
     arrived with last attempt's choice already selected. Entering the flow
     starts a fresh set of answers. */
  const initialData = typeof window !== "undefined" ? getQuizData() : null;

  const [isFormStep, setIsFormStep] = useState(false);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    clearQuizData();
    if (initialData?.contact) saveQuizData({ contact: initialData.contact });
    // Once, when the flow is entered.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [contact, setContact] = useState({
    firstName: initialData?.contact.firstName || "",
    lastName: initialData?.contact.lastName || "",
    email: initialData?.contact.email || "",
    phone: initialData?.contact.phone || "",
    postalCode: initialData?.contact.postalCode || "",
  });

  const totalQuestions = quizQuestions.length; // 12
  const currentQuestion = quizQuestions[questionIndex];
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;

  const handleSelectOption = (value: string) => {
    if (!currentQuestion) return;
    const updated = { ...answers, [currentQuestion.id]: value };
    setAnswers(updated);
    saveQuizData({ answers: updated });
  };

  const handleNextQuestion = () => {
    if (questionIndex < totalQuestions - 1) {
      setQuestionIndex((prev) => prev + 1);
    } else {
      setIsFormStep(true);
    }
  };

  const handlePrevQuestion = () => {
    if (isFormStep) {
      setIsFormStep(false);
    } else if (questionIndex > 0) {
      setQuestionIndex((prev) => prev - 1);
    }
  };

  const handleContactChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updated = { ...contact, [name]: value };
    setContact(updated);
    saveQuizData({ contact: updated });
  };

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contact.firstName || !contact.email || !contact.phone) return;

    saveQuizData({ answers, contact });
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
                value={((questionIndex + 1) / totalQuestions) * 100}
                tone="accent"
                size="sm"
                label={`Question ${questionIndex + 1} of ${totalQuestions}`}
              />
            </div>

            <div className={styles.questionHeader}>
              <h1 className={styles.questionTitle}>{currentQuestion.question}</h1>
            </div>

            {/* Options list: NO circle icon, selected has accent border, accent text, 15% red bg fill */}
            <div className={styles.optionsStack}>
              {currentQuestion.options.map((option) => {
                const isSelected = currentAnswer === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelectOption(option.value)}
                    className={`${styles.pillButton} ${
                      isSelected ? styles.pillButtonSelected : ""
                    }`}
                  >
                    <span>{option.label}</span>
                  </button>
                );
              })}
            </div>

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
                {questionIndex === totalQuestions - 1 ? "Next: Final Info" : "Next"}
              </Button>
            </div>
          </div>
        )}

        {/* Step 13: Personal Info Form (No big heading, description only) */}
        {isFormStep && (
          <form onSubmit={handleContactSubmit} className={styles.stageContainer}>
            <div className={styles.questionHeader}>
              <p className={styles.formDescription}>
                We will match your diagnostic answers to your profile so your Talent Agent can prepare your custom strategy.
              </p>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formRow}>
                <div className={styles.inputField}>
                  <label htmlFor="firstName" className={styles.inputLabel}>
                    First Name *
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={contact.firstName}
                    onChange={handleContactChange}
                    placeholder="e.g. Alex"
                    className={styles.textInput}
                  />
                </div>
                <div className={styles.inputField}>
                  <label htmlFor="lastName" className={styles.inputLabel}>
                    Last Name *
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={contact.lastName}
                    onChange={handleContactChange}
                    placeholder="e.g. Morgan"
                    className={styles.textInput}
                  />
                </div>
              </div>

              <div className={styles.inputField}>
                <label htmlFor="email" className={styles.inputLabel}>
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={contact.email}
                  onChange={handleContactChange}
                  placeholder="alex.morgan@company.com"
                  className={styles.textInput}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.inputField}>
                  <label htmlFor="phone" className={styles.inputLabel}>
                    Phone Number (for SMS verification) *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={contact.phone}
                    onChange={handleContactChange}
                    placeholder="+1 (555) 019-2834"
                    className={styles.textInput}
                  />
                </div>
                <div className={styles.inputField}>
                  <label htmlFor="postalCode" className={styles.inputLabel}>
                    Postal / Zip Code
                  </label>
                  <input
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    value={contact.postalCode}
                    onChange={handleContactChange}
                    placeholder="e.g. 94107"
                    className={styles.textInput}
                  />
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
                Send Verification Code
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
