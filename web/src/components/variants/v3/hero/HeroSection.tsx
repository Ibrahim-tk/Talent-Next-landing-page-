import Link from "next/link";

import { GridModule, Highlight, Icon, Text } from "@gridline";
import { heroCopy } from "@/content/variants/v3/hero";

import { HeroScanForm } from "./HeroScanForm";
import { HeroScatter } from "./HeroScatter";
import styles from "./HeroSection.module.css";

/**
 * The hero for landing page variation 3, served at `/v3`.
 *
 * Centred copy — headline, one-line claim, supporting sentence, a capture
 * field and its small print — inside a scatter of photographs: three down
 * each margin at staggered heights, two more rising past the bottom edge.
 *
 * The words are unchanged from the two-column version this replaced; only
 * the frame around them moved. The photographs are all already in the repo
 * (see `heroScatterImages`), cropped by the canvas rules rather than
 * stopping short of them, so the hero reads as a window onto a wider wall
 * of pictures with the sentence in the clear middle of it.
 *
 * The composition is a grid — margin, copy, margin, with a full-width strip
 * underneath — and that is the load-bearing decision in this file. A
 * photograph cannot overlap the headline at any viewport width because it
 * is rendered into an area the copy is not in: the margins are columns
 * beside it, the strip is a row below everything written. There is no
 * z-index race, no set of offsets that holds at 1440px and breaks at
 * 1280px, and no width at which the art has to be nudged out of the type's
 * way. The grid makes the overlap structurally impossible rather than
 * merely unlikely.
 *
 * `clip` on the module is what does the cropping: frames pushed past the
 * rules by a negative offset are cut there, and the bottom strip's images
 * are taller than the strip so they are cut by the hero's own bottom edge.
 *
 * Server-rendered apart from `HeroScanForm`, which owns the field's state.
 * The scatter needs no client at all — it drifts on a CSS animation, so
 * there is no script the art can fail to wait for.
 */
export function HeroSection() {
  return (
    <GridModule
      id="hero"
      rule="bottom"
      clip
      aria-label="Introduction"
      className={styles.section}
    >
      <div className={styles.grid}>
        <HeroScatter band="left" />

        <div className={styles.content}>
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

          <Text
            variant="bodyLg"
            weight="medium"
            tone="primary"
            className={styles.lede}
          >
            {heroCopy.lede}
          </Text>

          <Text variant="bodyMd" tone="muted" className={styles.body}>
            {heroCopy.body}
          </Text>

          <HeroScanForm />

          <Link href={heroCopy.disclosure.href} className={styles.disclosure}>
            <Text variant="bodySm" tone="secondary" as="span">
              {heroCopy.disclosure.label}
            </Text>
            <Icon name="chevronRight" size={14} />
          </Link>
        </div>

        <HeroScatter band="right" />
        <HeroScatter band="bottom" />
      </div>
    </GridModule>
  );
}
