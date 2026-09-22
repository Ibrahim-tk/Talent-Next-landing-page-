/**
 * Helper to persist quiz answers and contact info across the multi-page quiz flow.
 */

export interface StoredQuizData {
  answers: Record<string, string>;
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    postalCode: string;
  };
}

const STORAGE_KEY = "talentnext_quiz_state";

export function saveQuizData(data: Partial<StoredQuizData>): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getQuizData();
    const updated = { ...existing, ...data };
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignore storage quota/security errors
  }
}

/** Wipes the stored attempt, so re-entering the quiz starts clean. */
export function clearQuizData(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage/security errors
  }
}

export function getQuizData(): StoredQuizData {
  if (typeof window === "undefined") {
    return {
      answers: {},
      contact: { firstName: "", lastName: "", email: "", phone: "", postalCode: "" },
    };
  }
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        answers: {},
        contact: { firstName: "", lastName: "", email: "", phone: "", postalCode: "" },
      };
    }
    return JSON.parse(raw);
  } catch {
    return {
      answers: {},
      contact: { firstName: "", lastName: "", email: "", phone: "", postalCode: "" },
    };
  }
}
