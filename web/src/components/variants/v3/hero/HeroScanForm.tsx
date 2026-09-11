"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { Icon } from "@gridline";
import { heroCopy } from "@/content/variants/v3/hero";
import { stashHeroEmail } from "@/lib/heroEmailHandoff";

import styles from "./HeroScanForm.module.css";

/**
 * The hero's capture field: one email input and a submit.
 *
 * A real form rather than a styled link that looks like one. The reference
 * layout this hero follows opens with a field because a field reads as
 * "start here" in a way a button does not — but a field that discards what
 * you type is worse than no field at all, so submitting stashes the address
 * and the intake form below picks it up on its last step (see
 * `lib/heroEmailHandoff`).
 *
 * Navigation is a router push rather than letting the form submit
 * natively: a native submit to `#get-started` would append the input's
 * value to the URL as a query string, putting the visitor's email address
 * in their history and in any proxy log along the way — the exact thing the
 * sessionStorage handoff exists to avoid.
 */
export function HeroScanForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email) stashHeroEmail(email);
    router.push(heroCopy.form.action);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate={false}>
      <label htmlFor="hero-email" className="gl-visually-hidden">
        {heroCopy.form.label}
      </label>

      <div className={styles.field}>
        <input
          id="hero-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={styles.input}
          placeholder={heroCopy.form.placeholder}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        {/* Square, not the reference's circle. Gridline's one standing rule
            about shape is that actions carry zero radius and radius is
            reserved for content surfaces — so the field can round and the
            button cannot. */}
        <button type="submit" className={styles.submit}>
          <span className="gl-visually-hidden">
            {heroCopy.form.submitLabel}
          </span>
          <Icon name="arrowRight" size={16} />
        </button>
      </div>
    </form>
  );
}
