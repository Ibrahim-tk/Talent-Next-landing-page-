/**
 * Carries an email address from a hero's capture field to the intake form
 * further down the page.
 *
 * The hero on `/v3` opens with a single field and a submit — the shape a
 * visitor reads as "start here". Submitting it sends them to the intake
 * form, which asks its own questions and only gets to contact details on
 * its last step. Without a handoff the address they typed would simply be
 * thrown away and asked for again three steps later, which is the kind of
 * small betrayal that makes a form feel like a prop.
 *
 * `sessionStorage` rather than a query parameter: an email address does not
 * belong in a URL that gets shared, logged by a proxy, or left in history.
 * It is read once and cleared, so a refresh does not resurrect it — the
 * handoff is a single hop, not a stored preference.
 *
 * Every access is wrapped: `sessionStorage` throws outright in some privacy
 * modes rather than returning null, and a hero form that crashes the page
 * because storage is disabled is far worse than one that forgets.
 */
const HERO_EMAIL_KEY = "talentnext:hero-email";

export function stashHeroEmail(email: string): void {
  try {
    window.sessionStorage.setItem(HERO_EMAIL_KEY, email);
  } catch {
    // Storage disabled. The visitor still reaches the form; they just type
    // the address again.
  }
}

/** Reads the stashed address and clears it, so it is used exactly once. */
export function takeHeroEmail(): string {
  try {
    const stored = window.sessionStorage.getItem(HERO_EMAIL_KEY);
    if (stored) window.sessionStorage.removeItem(HERO_EMAIL_KEY);
    return stored ?? "";
  } catch {
    return "";
  }
}
