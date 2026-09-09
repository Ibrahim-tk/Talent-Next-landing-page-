"use client";

import { useRef } from "react";

import { Button, GridModule, Icon, ProgressTrack, Text } from "@gridline";
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

/** One card's share of the track: the progress hairline starts at this width. */
const INITIAL_PROGRESS = 1 / archetypes.length;

/** Extra scroll distance past the track's end, so the last card can be read. */
const TRAILING_SCROLL = 400;

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
  const progressRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

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

        if (progressRef.current) {
          timeline.fromTo(
            progressRef.current,
            { scaleX: INITIAL_PROGRESS },
            { scaleX: 1, ease: "none" },
            0,
          );
        }
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

          <ProgressTrack
            mode="scale"
            tone="accent"
            size="hairline"
            showTrack={false}
            initialScale={INITIAL_PROGRESS}
            fillRef={progressRef}
            className={styles.progress}
          />

          <div className={styles.footerRow}>
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
        </div>
      </div>
    </GridModule>
  );
}
