import type { PillChoice } from "@gridline";

/**
 * The three-step intake questionnaire. Steps are described as data so the
 * form component owns state and validation only — not copy or layout.
 */

export const getStartedCopy = {
  heading:
    "Fill out the form below to get connected with a TALENT Agent",
  success: {
    title: "Thank you! Your information has been submitted.",
    body: "A TALENT Agent will reach out to you shortly to confirm your session.",
  },
} as const;

export const situationOptions: readonly PillChoice[] = [
  { value: "in-school", label: "In School" },
  { value: "playing-a-sport", label: "Playing a Sport" },
  { value: "working", label: "Working" },
  { value: "in-between", label: "In Between" },
];

export const goalOptions: readonly PillChoice[] = [
  { value: "figure-out-direction", label: "Figure Out My Direction" },
  { value: "see-how-i-come-across", label: "See How I Come Across" },
  { value: "a-film-i-can-send-out", label: "A Film I Can Send Out" },
  { value: "just-curious", label: "Just Curious" },
];

export const callTimeOptions: readonly PillChoice[] = [
  { value: "mornings", label: "Mornings" },
  { value: "afternoons", label: "Afternoons" },
  { value: "evenings", label: "Evenings" },
];

export const formLabels = {
  situation: "Where are you right now?",
  goal: "What are you hoping to get out of this?",
  callTime: "Best Time For A 15-Minute Call",
  whatsNext: "What's Next For You, In One Sentence?",
  whatsNextPlaceholder: "Say it however you'd say it",
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email",
  phone: "Phone Number",
  phonePlaceholder: "+1 (555) 000-0000",
  postalCode: "Postal Code",
} as const;

/** Defaults mirror the pre-selected options in the original static page. */
export const formDefaults = {
  situation: "in-school",
  goal: "see-how-i-come-across",
  callTime: "afternoons",
} as const;
