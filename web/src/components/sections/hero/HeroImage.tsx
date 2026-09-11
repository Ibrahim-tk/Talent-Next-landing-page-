import Image from "next/image";

import { heroCopy } from "@/content/hero";

import styles from "./HeroImage.module.css";

/**
 * The hero's single photograph, spanning the full width of the canvas column
 * — left rule to right rule — and sitting flush on the module's bottom rule.
 *
 * Server-rendered: unlike the asset cloud it replaced, there is nothing here
 * to scrub on scroll, so no client boundary is needed.
 */
export function HeroImage() {
  return (
    <div className={styles.frame}>
      <Image
        src={heroCopy.image.src}
        alt={heroCopy.image.alt}
        width={heroCopy.image.width}
        height={heroCopy.image.height}
        priority
        sizes="100vw"
        className={styles.image}
      />
    </div>
  );
}
