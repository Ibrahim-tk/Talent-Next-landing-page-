"use client";

import { useRef } from "react";

import { Button, GridModule, Icon, Text } from "@gridline";
import {
  getStickyOffset,
  gsap,
  pinnedMediaQuery,
  prefersReducedMotion,
  useGSAP,
} from "@gridline/motion";
import { archetypes, archetypesCopy } from "@/content/archetypes";

import { ArchetypeCard } from "./ArchetypeCard";
import styles from "./ArchetypesSection.module.css";

/**
 * Drives `.footerProgress`'s `scaleX` — 0 is an untouched line, 1 a line that
 * has run the full width of the band. Written as an inline style for as long
 * as the pinned scrub owns the section, and removed on revert so the
 * stylesheet's own default takes over again.
 */
const FILL_PROPERTY = "--archetype-fill";

/**
 * Marks the section as one that actually got a scrub. The progress line is
 * only honest when something is driving it, so the stylesheet keys its
 * visibility on this rather than on the breakpoint alone — a desktop viewport
 * wide enough to fit every card gets no pin, and a progress line that can
 * never move is worse than none.
 */
const SCRUBBED_ATTRIBUTE = "data-scrubbed";

/** Extra scroll distance past the track's end, so the last card can be read. */
const TRAILING_SCROLL = 400;

/**
 * Rendered twice into `.footerRow` — the base layer and the reversed-out copy
 * inside the accent fill. Declared once so the two can never drift out of
 * alignment, which would show up as ghosting along the fill's edge.
 */
const footerContent = (
  <div className={styles.footerInner}>
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
);

/**
 * The archetype band.
 *
 * Per the Figma reference (node 173-6514), the heading sits full-width above
 * the row rather than beside it in a persistent sidebar. It still pins
 * *together* with the card track and the footer note, though: the trigger is
 * the header+track+footer block as one unit, sized to exactly one screen
 * (see `.pinWrapper`'s `100vh` height), so all three pieces — heading, cards,
 * and the "Explore more" CTA — stay on screen together for the whole time
 * the cards are scrubbing, instead of the footer scrolling into view only
 * after the scrub finishes. If the track already fits without overflow
 * (enough viewport width for all six cards), no ScrollTrigger is created at
 * all: pinning for zero scroll distance would just be a dead stop with
 * nothing to show for it.
 */
export function ArchetypesSection() {
  const pinRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const setFill = (value: number) =>
        pinRef.current?.style.setProperty(FILL_PROPERTY, `${value}`);

      // gsap.matchMedia builds and tears the timeline down as the breakpoint
      // is crossed, so a desktop→mobile resize leaves no pinned spacer behind.
      const media = gsap.matchMedia();

      media.add(pinnedMediaQuery, () => {
        const viewport = viewportRef.current;
        const track = trackRef.current;
        if (!viewport || !track) return;

        const overflowWidth = () => track.scrollWidth - viewport.clientWidth;

        // On a wide enough viewport all five cards already fit — skip the
        // pin entirely rather than lock the page for a scroll range that
        // moves nothing. (A later resize into overflow within the same
        // "desktop" breakpoint won't retroactively add the pin; that's an
        // accepted edge case, not a resize listener worth adding here.)
        if (overflowWidth() <= 0) return;

        // Only now is there something for the line to report. Set the start
        // value up front rather than leaning on the tween's first render to
        // write it — the proxy below only reports through onUpdate, which is
        // not guaranteed to fire while the timeline is parked at 0.
        pinRef.current?.setAttribute(SCRUBBED_ATTRIBUTE, "true");
        setFill(0);

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            start: () => `top ${getStickyOffset()}px`,
            end: () => `+=${overflowWidth() + TRAILING_SCROLL}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        timeline.to(track, { x: () => -overflowWidth(), ease: "none" }, 0);

        // Tweened through a proxy rather than as a CSS variable on the element
        // directly, so the written value is always a plain number this file
        // controls — and so the inline property can be removed wholesale on
        // revert, handing the resting state back to the stylesheet.
        const fill = { value: 0 };
        timeline.to(
          fill,
          {
            value: 1,
            ease: "none",
            onUpdate: () => setFill(fill.value),
          },
          0,
        );

        // Runs when the breakpoint is crossed the other way: take the line
        // away along with the scrub that was driving it, rather than leaving
        // it frozen at whatever fraction the scrub last wrote.
        return () => {
          pinRef.current?.removeAttribute(SCRUBBED_ATTRIBUTE);
          pinRef.current?.style.removeProperty(FILL_PROPERTY);
        };
      });

      // gsap.context (which useGSAP wraps) reverts tweens but not a
      // matchMedia instance, so it is killed explicitly here.
      return () => media.revert();
    },
    { scope: pinRef },
  );

  return (
    <GridModule id="traits" rule="bottom" aria-labelledby="archetypes-heading">
      <div className={styles.wrapper}>
        <div className={styles.pinWrapper} ref={pinRef}>
          <div className={styles.header}>
            <Text
              variant="editorial"
              as="h2"
              id="archetypes-heading"
              className={styles.heading}
            >
              {archetypesCopy.heading}
            </Text>
            <Text variant="bodyMd" measure="prose">
              {archetypesCopy.description}
            </Text>
          </div>

          <div className={styles.viewport} ref={viewportRef}>
            <div className={styles.track} ref={trackRef}>
              {archetypes.map((archetype) => (
                <ArchetypeCard key={archetype.id} archetype={archetype} />
              ))}
            </div>
          </div>

          {/* The footer is a link the whole width of the band, and the accent
              wash is its hover state — it used to be a scroll readout,
              filling in step with the card track. Two things were wrong with
              that. It reported progress nobody needed (the cards are right
              there, moving), and because the fill was driven by scroll
              position it spent most of its life stopped partway, which reads
              as a loading bar that has stalled rather than as a decision.

              As a hover state the same wash answers the reader instead:
              move onto the band and it lights, bringing the "Explore more"
              link at its far end forward at the moment they are heading for
              it. The row renders its
              content twice — once in ink, once reversed out inside the
              clipped fill — so a word turns white the instant the accent edge
              passes it, rather than the whole line switching at once. The two
              layers must lay out identically for that to land, which is why
              both render the same `footerContent` markup at the same width. */}
          <div className={styles.footerRow}>
            {/* The scroll readout, and the only thing in this band still tied
                to the track: a hairline-thin accent line along the row's top
                edge that runs left to right as the cards scrub. Desktop only,
                because the pin it reports on is desktop only. */}
            <div className={styles.footerProgress} aria-hidden="true" />
            {footerContent}
            <div className={styles.footerFill} aria-hidden="true" inert>
              {footerContent}
            </div>
          </div>
        </div>
      </div>
    </GridModule>
  );
}
