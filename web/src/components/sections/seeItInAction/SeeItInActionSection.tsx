import Image from "next/image";

import { GridModule, Highlight, SectionHeader } from "@gridline";
import { seeItInActionCopy } from "@/content/deliverables";

import styles from "./SeeItInActionSection.module.css";

/**
 * "See It In Action" — a centred header over a single video card, bounded by
 * the GridCanvas's own vertical rules (never past them — see GridCanvas's
 * own doc comment).
 *
 * The card is a still sat on top of the dot-matrix plate (videomask.png,
 * carried as `.plate`'s background): the plate runs the full width of the
 * column, and the video is centred on it at 80% of that width. There is no
 * scroll-driven motion here — the card is simply present at its final size.
 */
export function SeeItInActionSection() {
  return (
    <GridModule
      id="see-it-in-action"
      rule="bottom"
      aria-labelledby="see-it-in-action-heading"
    >
      {/* A plain grid-texture box — the same blueprint pattern the hero
          uses behind its own headline — standing in for a spacer above the
          heading so this section opens with some of that "grid" feel
          instead of a blank gap. */}
      <div className={styles.gridBox} aria-hidden="true" />

      <div className={styles.headerPad}>
        {/* `display` — the scale's h3 → h1 role — rather than the default
            `headingLg`: this header opens the section over a large video
            card, and at the standard module measure it read as a caption
            above the plate instead of a headline. Still an <h2>; only the
            size changes. */}
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
        />
      </div>

      <div className={styles.body}>
        <div className={styles.plate}>
          {/* Temporary placeholder for the video — see the content file's
              note on `image`. */}
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

      {/* A closing row below the video, same shape as InterviewSection's own
          footer bar — left empty until there's copy for it. */}
      <div className={styles.footerRow} />
    </GridModule>
  );
}
