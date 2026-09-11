"use client";

import Image from "next/image";
import { useRef } from "react";

import { GridModule, Highlight, SectionHeader } from "@gridline";
import { useDarkNavRegion } from "@gridline/motion";
import { seeItInActionCopy } from "@/content/deliverables";

import styles from "./SeeItInActionSection.module.css";

export type SeeItInActionTone = "default" | "inverse";

export interface SeeItInActionSectionProps {
  /**
   * `default` is the light section, with the dot-matrix plate behind the
   * video. `inverse` flips it to the system's dark surface and swaps that
   * plate for the blueprint grid used behind the hero copy — what the
   * homepage and `/v2` both render; `/v1` and `/v3` still take the light
   * one.
   *
   * A prop rather than a private copy of this section under
   * `components/variants/v2/`: per that folder's own note, every page but
   * the hero deliberately shares one component, because the per-variant
   * copies that used to exist had already drifted out of sync with the
   * homepage. Varying by prop keeps one source of truth.
   */
  tone?: SeeItInActionTone;
}

/**
 * "See It In Action" — a centred header over a single video card, bounded by
 * the GridCanvas's own vertical rules (never past them — see GridCanvas's
 * own doc comment).
 *
 * The card is a still sat on a full-width plate: the dot-matrix artwork
 * (videomask.png) at the default tone, the blueprint grid when inverse. The
 * video is centred on that plate at 80% of the column's width. There is no
 * scroll-driven motion here — the card is simply present at its final size.
 *
 * A client component only for `useDarkNavRegion` below; nothing here is
 * interactive.
 */
export function SeeItInActionSection({
  tone = "default",
}: SeeItInActionSectionProps = {}) {
  // At the inverse tone the sticky nav has to invert with the section, the
  // same way it does over the deliverables band immediately above — the
  // translucent white bar is unreadable sitting on this black surface.
  // The hook is called unconditionally because hooks must be; the ref is
  // attached to `.track` only in the dark case, and an unattached ref makes
  // the hook a no-op, so the light tone (`/v1`, `/v3`) is untouched.
  //
  // `.track` and not the module: it is the box that actually carries the
  // dark surface, so the bar flips over exactly the scroll range that is
  // black and not a pixel more.
  const darkSurfaceRef = useRef<HTMLDivElement>(null);
  useDarkNavRegion(darkSurfaceRef);

  return (
    <GridModule
      id="see-it-in-action"
      /* No closing rule at the inverse tone, and the reason is geometric
         rather than aesthetic. GridModule draws its hairline on the module
         box, which is canvas-width; the dark surface underneath is painted
         by `.track`, which breaks out to the full window. So that 1px row
         was dark across the canvas and bare page background — white — in
         the two margins either side of it, which is precisely the pair of
         white ticks that showed up between this section and the form.
         Nothing needs to replace it: the band ends where the next
         section's full-bleed image begins, and that tonal change is
         already a harder division than a hairline. The light tone (`/v1`,
         `/v3`) has no breakout track and so keeps its rule. */
      rule={tone === "inverse" ? "none" : "bottom"}
      aria-labelledby="see-it-in-action-heading"
      className={tone === "inverse" ? styles.toneInverse : undefined}
    >
      {/* `.track` / `.stage` are the same two-box container
          DeliverablesSection uses for its own dark band: the track breaks
          out to the full window width and carries the surface colour, the
          stage re-applies the frame measure so the content still lines up
          on the sitewide vertical rules and re-draws that pair against the
          dark. At the default tone both are inert pass-throughs and the
          section lays out exactly as it always did. */}
      <div
        className={styles.track}
        ref={tone === "inverse" ? darkSurfaceRef : undefined}
      >
        <div className={styles.stage}>
          {/* A plain grid-texture box — the same blueprint pattern the hero
              uses behind its own headline — standing in for a spacer above
              the heading so this section opens with some of that "grid"
              feel instead of a blank gap. */}
          <div className={styles.gridBox} aria-hidden="true" />

          <div className={styles.headerPad}>
            {/* `display` — the scale's h3 → h1 role — rather than the
                default `headingLg`: this header opens the section over a
                large video card, and at the standard module measure it read
                as a caption above the plate instead of a headline. Still an
                <h2>; only the size changes.

                `rule={false}` drops SectionHeader's closing hairline. That
                rule earns its place where a header sits directly on top of
                the content it introduces; here the next thing down is the
                plate, which is already its own clearly-bounded band, so the
                line read as a stray mark floating in the gap rather than as
                a division between two things. */}
            <SectionHeader
              headingId="see-it-in-action-heading"
              heading={
                <>
                  {seeItInActionCopy.headingBefore}
                  <Highlight>{seeItInActionCopy.headingAccent}</Highlight>
                  {seeItInActionCopy.headingAfter}
                </>
              }
              description={seeItInActionCopy.description}
              headingVariant="display"
              rule={false}
            />
          </div>

          <div className={styles.body}>
            <div className={styles.plate}>
              {/* Temporary placeholder for the video — see the content
                  file's note on `image`. */}
              <div className={styles.mediaFrame}>
                <Image
                  src={seeItInActionCopy.image}
                  alt={seeItInActionCopy.imageAlt}
                  fill
                  sizes="(max-width: 920px) 85vw, 1200px"
                  className={styles.mediaImage}
                  priority={false}
                />
              </div>
            </div>
          </div>

          {/* A closing row below the video, same shape as InterviewSection's
              own footer bar — left empty until there's copy for it. */}
          <div className={styles.footerRow} />
        </div>
      </div>
    </GridModule>
  );
}
