"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { Button, Icon } from "@gridline";
import { getQuizData } from "@/lib/quizStorage";

import styles from "./QuizFlow.module.css";

export function OtpCard() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("+1 (555) 019-2834");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState<string>("");
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const data = getQuizData();
    if (data.contact?.phone) {
      setPhoneNumber(data.contact.phone);
    }
  }, []);

  const handleOtpChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const nextOtp = [...otp];
    nextOtp[index] = val.slice(-1);
    setOtp(nextOtp);
    setOtpError("");

    if (val && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = () => {
    const entered = otp.join("");
    if (entered.length < 6) {
      setOtpError("Please enter all 6 digits of your verification code.");
      return;
    }
    // Simulation: any 6-digit code passes and routes to results
    router.push("/new/get-started/results");
  };

  return (
    <div className={styles.section}>
      <div className={styles.card}>
        {/* NO PROGRESS BAR as requested */}
        <div className={styles.stageContainer}>
          <div className={styles.otpCenteredContent}>
            <div className={styles.otpCenterHeader}>
              <h1 className={styles.questionTitle}>Verify Your Phone Number</h1>
              <p className={styles.questionSubtitle}>
                We sent a 6-digit verification code via SMS to <strong>{phoneNumber}</strong>.
              </p>
            </div>

          <div className={styles.otpBox}>
            <div className={styles.otpGrid}>
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    otpInputRefs.current[idx] = el;
                  }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  className={styles.otpInput}
                  autoFocus={idx === 0}
                />
              ))}
            </div>

            {otpError && <p className={styles.otpErrorText}>{otpError}</p>}

            <div className={styles.resendRow}>
              <span>Didn&apos;t receive a code?</span>
              <button
                type="button"
                onClick={() => alert("A new demo code has been sent.")}
                className={styles.resendButton}
              >
                Resend SMS
              </button>
            </div>
          </div>
        </div>

        <div className={styles.footerNav}>
            <Button
              variant="ghost"
              size="md"
              onClick={() => router.push("/new/get-started")}
              iconBefore={<Icon name="arrowLeft" size={14} />}
            >
              Change Details
            </Button>

            <Button
              variant="accent"
              size="md"
              onClick={handleVerifyOtp}
              iconAfter={<Icon name="arrowRight" size={14} />}
            >
              Verify & Unlock Results
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
