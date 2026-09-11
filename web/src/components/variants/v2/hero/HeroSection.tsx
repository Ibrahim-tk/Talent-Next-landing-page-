import { Button, Text } from "@gridline";
import { heroCopy } from "@/content/variants/v2/hero";

import { HeroBackdrop } from "./HeroBackdrop";
import { HeroSessionStack } from "./HeroSessionStack";
import styles from "./HeroSection.module.css";

/**
 * The hero for landing page variation 2, served at `/v2`.
 *
 * A full-bleed photographic hero: one still running edge to edge of the
 * viewport and up behind the nav, with the copy set over it as a single
 * left-aligned stack.
 *
 * This is the one section on the page that steps outside the design
 * system's frame entirely. Everywhere else — including the rest of this
 * page — content is a `GridModule` inside the `GridCanvas` column, bounded
 * by the two constant vertical rules. Here there is no `GridModule`, no
 * blueprint lattice, no corner crosshairs and no hairline: the section is a
 * plain element that breaks out to the full viewport width (see
 * `.section`), so the picture genuinely runs end to end rather than
 * stopping at the rules. The frame resumes at the section below it.
 *
 * Deliberate, and the reason it is confined to this one variation: the
 * canvas rules are the design system's signature, and a hero is the only
 * place worth spending them.
 *
 * `HeroSessionStack` is the one floating artefact on this hero — a deck of
 * three cards in the bottom-right corner that cycles through the same three
 * steps the rest of the page sets out. It sits diagonally opposite the copy
 * stack, clear of the left-aligned column and of the call to action below
 * it, and is `aria-hidden` like every other decorative card on the site.
 *
 * It replaced a single static preview of an "Ask Tal AI anything" prompt.
 * A text box is a feature; the three cards are what the visitor actually
 * gets, which is the thing a hero has one screen to say.
 */
export function HeroSection() {
  return (
    <section id="hero" aria-label="Introduction" className={styles.section}>
      <HeroBackdrop />
      <HeroSessionStack />

      <div className={styles.content}>
        {/* `tone` as well as the colour in the stylesheet: relying on this
            module's own rule to beat Text's variant class means relying on
            CSS Module ordering, which the design system explicitly says not
            to do (gridline/README.md). */}
        <Text
          variant="display"
          as="h1"
          tone="inverse"
          className={styles.headline}
        >
          <span className={styles.headlineLead}>{heroCopy.headlineBefore}</span>
          <span className={styles.headlineAccent}>
            {heroCopy.headlineAccent}
          </span>
          <span className={styles.headlineLead}>{heroCopy.headlineAfter}</span>
        </Text>

        <Text
          variant="bodyMd"
          tone="inverseSecondary"
          className={styles.body}
        >
          {heroCopy.body}
        </Text>

        {/* The accent variant rather than the default black square: this is
            the one action on the page the whole hero exists to deliver, and
            black would disappear into the photograph behind it. */}
        <Button href={heroCopy.ctaHref} variant="accent" size="lg">
          {heroCopy.ctaLabel}
        </Button>
      </div>
    </section>
  );
}
