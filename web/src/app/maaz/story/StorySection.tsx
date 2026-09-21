"use client";

import Image from "next/image";
import { useRef } from "react";

import { Button, GridModule, Icon, Text, Highlight } from "@gridline";
import {
  getStickyOffset,
  gsap,
  pinnedMediaQuery,
  prefersReducedMotion,
  useGSAP,
} from "@gridline/motion";
import { archetypes, archetypesCopy } from "@/content/archetypes";
import { heroCopy } from "@/content/hero";

import styles from "./StorySection.module.css";

/**
 * The `/maaz` story sequence — hero and the TALENT archetypes rebuilt as one
 * continuous, scroll-scrubbed narrative.
 *
 * Three beats, one timeline:
 *
 *  1. EXPAND — the hero photograph starts as the band it occupies in the
 *     ordinary hero layout and opens to fill the viewport, while the hero
 *     copy lifts away. The opening is a `clip-path: inset()` on a stage that
 *     is *already* full-bleed, plus a small counter-scale on the picture
 *     itself: the composited pair reads as the image growing, and neither
 *     property touches layout on a scroll frame.
 *  2. HOLD — from the moment it is full-bleed the stage is pinned, so it
 *     stays at full width and full height for the rest of the sequence. Each
 *     following photograph cross-fades in on top of the one before it.
 *  3. CARDS — one card per archetype rides over the pinned stage: a white
 *     panel with the archetype's letter set large in accent, its name and
 *     its description. Card `n` leaves as card `n + 1` arrives, in step with
 *     the photograph behind it changing.
 *
 * Everything below `pinnedMinWidth`, and anything with reduced motion asked
 * for, gets the static fallback the markup already is: hero, then the six
 * archetypes stacked as ordinary cards with their own art. No pin, no scrub,
 * nothing to unwind.
 */

/** Timeline units. The expand beat, then one unit per archetype card. */
const EXPAND = 1;
const CARD = 1;

/**
 * Scroll distance per timeline unit, as a share of the viewport height. Under
 * 1 so a beat resolves in a little less than a full screen of scrolling —
 * seven full screens to get through the sequence reads as a page that has
 * stopped responding.
 */
const SCREENS_PER_UNIT = 0.85;

/** Extra scroll past the last card, so it can be read before the pin lets go. */
const TRAILING_SCROLL = 320;

export function StorySection() {
  const pinRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<HTMLDivElement[]>([]);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  /** Collects the stacked slides and cards into index-addressable arrays. */
  const collect =
    (bucket: { current: HTMLDivElement[] }, index: number) =>
    (node: HTMLDivElement | null) => {
      if (node) bucket.current[index] = node;
    };

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const media = gsap.matchMedia();

      media.add(pinnedMediaQuery, () => {
        const pin = pinRef.current;
        const stage = stageRef.current;
        const slot = slotRef.current;
        if (!pin || !stage || !slot) return;

        /**
         * Where the picture starts: the slot's box expressed as insets from
         * the STAGE's own edges. Measured against the stage rather than the
         * pinned box because the two are no longer the same rectangle — the
         * stage breaks out to the full viewport (see the stylesheet), so
         * insets taken from the pin would leave the opening frame offset by
         * the canvas margin and the header's height.
         *
         * Measured rather than written down, so the opening always begins on
         * exactly the band the static layout puts the photograph in, at any
         * viewport size and after any refresh. `clip-path` does not affect
         * the layout box, so the stage's rect here is always its full,
         * unclipped frame.
         */
        const startInset = () => {
          const host = stage.getBoundingClientRect();
          const box = slot.getBoundingClientRect();
          return {
            t: box.top - host.top,
            r: host.right - box.right,
            b: host.bottom - box.bottom,
            l: box.left - host.left,
          };
        };

        // The clip is written through a proxy object rather than tweened as a
        // `clip-path` string: one place owns the formatting, the four sides
        // stay plain numbers, and the property can be removed wholesale on
        // revert so the stylesheet's resting value takes back over.
        const inset = { t: 0, r: 0, b: 0, l: 0 };
        const applyInset = () => {
          stage.style.clipPath = `inset(${inset.t}px ${inset.r}px ${inset.b}px ${inset.l}px)`;
        };

        const setProgress = (value: number) =>
          progressRef.current?.style.setProperty("--story-progress", `${value}`);

        const total = EXPAND + archetypes.length * CARD;

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: pin,
            start: () => `top ${getStickyOffset()}px`,
            end: () =>
              `+=${window.innerHeight * SCREENS_PER_UNIT * total + TRAILING_SCROLL}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        /* ---- 1. EXPAND ------------------------------------------------- */

        timeline.fromTo(
          inset,
          {
            t: () => startInset().t,
            r: () => startInset().r,
            b: () => startInset().b,
            l: () => startInset().l,
          },
          {
            t: 0,
            r: 0,
            b: 0,
            l: 0,
            duration: EXPAND,
            ease: "none",
            onUpdate: applyInset,
          },
          0,
        );

        // The counter-scale. Without it the clip alone would only *reveal*
        // more of a picture that never moved; pulling the image back to 1:1
        // as the window opens is what makes it read as the photograph itself
        // growing into the screen.
        timeline.fromTo(
          slideRefs.current[0],
          { scale: 1.18 },
          { scale: 1, duration: EXPAND, ease: "none" },
          0,
        );

        // The copy is gone well before the picture finishes opening — it
        // would otherwise be sitting on top of a full-bleed photograph for
        // the last stretch of the beat, which is the one moment in the
        // sequence that should be only the image.
        timeline.to(
          introRef.current,
          { opacity: 0, y: -48, duration: EXPAND * 0.55, ease: "none" },
          0,
        );

        // The section title arrives once the stage is (almost) open, and then
        // stays for the whole run of cards as the band's standing heading.
        timeline.fromTo(
          headingRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: EXPAND * 0.35, ease: "none" },
          EXPAND * 0.62,
        );

        /* ---- 2 + 3. PHOTOGRAPHS AND CARDS ------------------------------ */

        archetypes.forEach((_, index) => {
          const at = EXPAND + index * CARD;
          const isLast = index === archetypes.length - 1;

          // Slide 0 is the hero, so the archetype photographs are offset by
          // one. Each fades in over the one before rather than the previous
          // one fading out — a fade-out would flash the white stage between
          // two pictures.
          timeline.to(
            slideRefs.current[index + 1],
            { opacity: 1, duration: CARD * 0.4, ease: "none" },
            at,
          );

          // A slow drift on the incoming picture for the whole beat it owns,
          // so a held stage is never a completely still one.
          timeline.fromTo(
            slideRefs.current[index + 1],
            { scale: 1.12 },
            { scale: 1, duration: CARD, ease: "none" },
            at,
          );

          timeline.fromTo(
            cardRefs.current[index],
            { opacity: 0, yPercent: 14 },
            { opacity: 1, yPercent: 0, duration: CARD * 0.38, ease: "none" },
            at + CARD * 0.08,
          );

          // The last card is the end of the story — it holds until the pin
          // releases instead of leaving with nothing to replace it.
          if (!isLast) {
            timeline.to(
              cardRefs.current[index],
              { opacity: 0, yPercent: -14, duration: CARD * 0.3, ease: "none" },
              at + CARD * 0.72,
            );
          }
        });

        // The readout along the stage's bottom edge. Driven off a proxy for
        // the same reason the clip is: the value written to the DOM is always
        // a plain number this file controls.
        const progress = { value: 0 };
        setProgress(0);
        timeline.to(
          progress,
          {
            value: 1,
            duration: total,
            ease: "none",
            onUpdate: () => setProgress(progress.value),
          },
          0,
        );

        return () => {
          stage.style.removeProperty("clip-path");
          progressRef.current?.style.removeProperty("--story-progress");
        };
      });

      // gsap.context reverts tweens but not a matchMedia instance.
      return () => media.revert();
    },
    { scope: pinRef },
  );

  return (
    // No `clip` on the module: the stage inside reaches past its box on three
    // sides to fill the window, and the module's own `overflow: hidden` would
    // crop it straight back to the canvas column. Nothing else in the section
    // overflows, and the stage's own `clip-path` bounds it at every point in
    // the sequence.
    <GridModule
      id="hero"
      rule="bottom"
      aria-label="Introduction and the TALENT archetypes"
      className={styles.module}
    >
      <div className={styles.pin} ref={pinRef}>
        {/* ---- The hero, as the sequence's first frame ------------------ */}
        <div className={styles.intro} ref={introRef}>
          <div className={styles.blueprint} aria-hidden="true" />

          <div className={styles.copy}>
            <Text variant="display" as="h1" className={styles.headline}>
              <span className={styles.headlineLead}>
                {heroCopy.headlineBefore}
              </span>
              <Highlight className={styles.headlineAccent}>
                {heroCopy.headlineAccent}
              </Highlight>
              <span className={styles.headlineLead}>
                {heroCopy.headlineAfter}
              </span>
            </Text>

            <Text variant="bodyMd" className={styles.body}>
              {heroCopy.body}
            </Text>

            <div className={styles.ctaDock}>
              <Button href={heroCopy.ctaHref} variant="accent" size="lg">
                {heroCopy.ctaLabel}
              </Button>
            </div>
          </div>

          {/* The band the photograph opens from. It is only a measuring box
              on desktop — the picture itself lives in the stage above — and
              below the pin breakpoint it is where the static hero image
              actually sits. */}
          <div className={styles.slot} ref={slotRef} aria-hidden="true" />
        </div>

        {/* ---- The stage: one photograph per beat, stacked -------------- */}
        <div className={styles.stage} ref={stageRef}>
          <div
            className={styles.slide}
            ref={collect(slideRefs, 0)}
            data-lead="true"
          >
            <Image
              src={heroCopy.image.src}
              alt={heroCopy.image.alt}
              fill
              priority
              sizes="100vw"
              className={styles.slideImage}
            />
          </div>

          {archetypes.map((archetype, index) => (
            <div
              className={styles.slide}
              key={archetype.id}
              ref={collect(slideRefs, index + 1)}
            >
              <Image
                src={archetype.image}
                alt={archetype.imageAlt}
                fill
                sizes="100vw"
                className={styles.slideImage}
              />
            </div>
          ))}

          <div className={styles.scrim} aria-hidden="true" />
        </div>

        {/* ---- The standing heading, over the opened stage -------------- */}
        <div className={styles.stageHeading} ref={headingRef}>
          <Text
            variant="editorial"
            as="h2"
            id="archetypes-heading"
            className={styles.stageHeadingText}
          >
            {archetypesCopy.heading}
          </Text>
        </div>

        {/* ---- The cards ------------------------------------------------ */}
        <div className={styles.cards}>
          {archetypes.map((archetype, index) => (
            <article
              className={styles.card}
              key={archetype.id}
              ref={collect(cardRefs, index)}
            >
              {/* Mobile-only art. A background image rather than a second
                  `next/image`, because a display:none background is never
                  fetched — the desktop sequence therefore pays nothing for
                  the fallback, and the fallback pays nothing for the stage. */}
              <div
                className={styles.cardArt}
                style={{ backgroundImage: `url(${archetype.image})` }}
                role="img"
                aria-label={archetype.imageAlt}
              />

              <div className={styles.cardBody}>
                <span className={styles.cardLetter} aria-hidden="true">
                  {archetype.letter}
                </span>
                <Text variant="headingLg" as="h3" className={styles.cardTitle}>
                  {archetype.name}
                </Text>
                <Text variant="bodyMd" tone="body" className={styles.cardCopy}>
                  {archetype.description}
                </Text>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.progress} ref={progressRef} aria-hidden="true" />
      </div>

      {/* The band's closing note and CTA, in ordinary flow under the pinned
          sequence — the same pair the archetype band has always ended on. */}
      <div className={styles.footerRow} id="traits">
        <Text variant="bodyMd" measure="prose">
          {archetypesCopy.footnote}
        </Text>
        <Button
          href={archetypesCopy.exploreMoreHref}
          variant="ghost"
          size="md"
          iconAfter={<Icon name="arrowRight" size={14} />}
        >
          {archetypesCopy.exploreMoreLabel}
        </Button>
      </div>
    </GridModule>
  );
}
