import Image from "next/image";
import type { CSSProperties } from "react";

import { cx } from "@gridline";

import {
  heroScatterImages,
  type HeroScatterBand,
} from "@/content/variants/v3/hero";

import styles from "./HeroScatter.module.css";

/**
 * One band of the hero's photograph scatter.
 *
 * The three bands are real grid areas laid out by `HeroSection.module.css`,
 * not absolutely positioned strips floated over the section. That is the
 * whole reason a photograph cannot land on the headline at any viewport
 * width: the margins are columns the copy is not in, and the bottom strip
 * is a row below everything that is written. There is no z-index race and
 * no set of hand-tuned offsets to re-check when the type reflows.
 *
 * No JavaScript. The images sit where CSS puts them and drift on a CSS
 * animation, so the scatter renders on the server, survives a failed
 * hydration, and needs no entry timeline to become visible — the mistake
 * the version before this one made, where art that was `opacity: 0` until
 * a script ran meant no script, no hero.
 */
export function HeroScatter({ band }: { band: HeroScatterBand }) {
  const images = heroScatterImages.filter((image) => image.band === band);

  return (
    <div
      className={cx(styles.band, band === "bottom" && styles.bandBottom)}
      data-scatter-band={band}
      aria-hidden="true"
    >
      {images.map((image) => (
        <div
          key={image.slot}
          className={styles.item}
          style={
            {
              "--scatter-width": `${image.renderWidth}px`,
              "--scatter-ratio": `${image.ratio}`,
              "--scatter-top": `${image.top * 100}%`,
              "--scatter-x": image.x,
              "--scatter-distance": `${image.float.distance}px`,
              "--scatter-duration": `${image.float.duration}s`,
            } as CSSProperties
          }
        >
          <Image
            className={styles.image}
            src={image.src}
            alt=""
            width={image.width}
            height={image.height}
            // Every frame renders at 300px or less, so the candidate this
            // picks stays small however large the source file is.
            sizes="320px"
          />
        </div>
      ))}
    </div>
  );
}
