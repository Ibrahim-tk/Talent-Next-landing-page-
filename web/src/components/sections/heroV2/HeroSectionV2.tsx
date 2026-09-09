"use client";

import { useId, useRef } from "react";

import {
  Button,
  Crosshair,
  GridModule,
  Highlight,
  Icon,
  Text,
  TintedMedia,
} from "@gridline";
import {
  gsap,
  prefersReducedMotion,
  SplitText,
  useGSAP,
} from "@gridline/motion";
import { heroCopy } from "@/content/heroV2";

import { HeroStageV2 } from "./HeroStageV2";
import styles from "./HeroSectionV2.module.css";

/**
 * Standalone duplicate of `HeroSection`, for the `/hero-v2` preview page.
 * Edit this copy (and its module.css / HeroStageV2 / content/heroV2.ts)
 * freely — nothing here is shared with the live homepage hero.
 *
 * Modelled on a reference hero (full-bleed, dark, centred: pill badge →
 * three-part headline → subtitle → CTA → a real session clip → a closing
 * statement, with two report cards pinned to the bottom corners) but
 * rebuilt entirely in this system's own vocabulary rather than copying its
 * pixels: `--gl-color-surface-inverse` / `-text-inverse*` (already the
 * system's documented dark-surface tokens, used elsewhere for deliverable
 * cards) instead of a photograph, `SurfaceCard` + `SegmentedMeter` instead
 * of pasted product screenshots, and the grid/crosshair language recoloured
 * for a dark ground rather than dropped. `DashedFrame` is deliberately not
 * used for the CTA here — its background/border are hardcoded light-theme
 * rgba values with no dark counterpart, and fighting that would mean
 * fighting another module's stylesheet (see gridline/README.md, "CSS
 * Module ordering"), so a plain `Button` stands on its own instead.
 */
export function HeroSectionV2() {
  // Namespaced per render so multiple instances of this hero (or a future
  // reuse of the same filter id) never collide — the same reasoning
  // gridline/components/Icon/Icon.tsx already uses for its mask ids.
  const grainFilterId = useId();

  const gridRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const lineMaskRefs = useRef<(HTMLSpanElement | null)[]>([null, null, null]);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const microRef = useRef<HTMLDivElement>(null);
  const videoRowRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);

  // Entrance choreography — one timeline, gated behind reduced motion. Every
  // element's CSS default is its final, fully visible state; only this
  // effect (which never runs for a reduced-motion viewer) sets the hidden
  // starting point, so there's no risk of a viewer getting stuck mid-reveal.
  useGSAP(() => {
    if (prefersReducedMotion()) return;

    // Each headline line is a `.lineMask` (overflow: hidden) around exactly
    // one child — the lead span or the accent Highlight. Reading
    // `firstElementChild` lets the same reveal treat both alike without
    // needing a ref forwarded through `Highlight`.
    const lineInners = lineMaskRefs.current
      .map((mask) => mask?.firstElementChild)
      .filter((el): el is Element => Boolean(el));

    const split = subtitleRef.current
      ? SplitText.create(subtitleRef.current, { type: "lines", mask: "lines" })
      : null;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.set(gridRef.current, { opacity: 0 })
      .set(pillRef.current, { opacity: 0, y: 10 })
      .set(lineInners, { yPercent: 115 })
      .set(ctaRef.current, { opacity: 0, y: 16, scale: 0.96 })
      .set(microRef.current, { opacity: 0 })
      .set(videoRowRef.current, { opacity: 0, y: 12 })
      .set(statementRef.current, { opacity: 0, y: 14 });

    if (split) tl.set(split.lines, { yPercent: 100 });

    tl.to(
      gridRef.current,
      { opacity: 1, duration: 1.3, ease: "power2.out" },
      0,
    )
      .to(pillRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.1)
      .to(lineInners, { yPercent: 0, duration: 1, stagger: 0.14 }, 0.32);

    if (split) {
      tl.to(split.lines, { yPercent: 0, duration: 0.7, stagger: 0.05 }, 0.95);
    }

    tl.to(ctaRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.6 }, 1.15)
      .to(microRef.current, { opacity: 1, duration: 0.5 }, 1.35)
      .to(videoRowRef.current, { opacity: 1, y: 0, duration: 0.6 }, 1.45)
      .to(statementRef.current, { opacity: 1, y: 0, duration: 0.7 }, 1.6);

    return () => split?.revert();
  }, []);

  return (
    <GridModule
      id="hero-v2"
      rule="bottom"
      clip
      aria-label="Introduction"
      className={styles.section}
    >
      {/* Fills the module with the dark surface tone before anything else
          paints. A competing `background-color` declared directly on
          `.section` would be racing GridModule's own `.root` for the same
          property — see gridline/README.md, "CSS Module ordering" — so this
          is a separate layer instead, pinned behind everything via
          `--gl-z-below`. */}
      <div className={styles.backdrop} aria-hidden="true" />

      {/* The "picture" behind the headline: no photograph — a fully
          code-rendered synthetic orb (two independently animated gradient
          layers, no image file at all), a film-grain SVG filter, and a
          vignette. Deliberately artificial rather than photographic. */}
      <div className={styles.orb} aria-hidden="true">
        <div className={styles.orbCore} />
      </div>

      <div className={styles.blueprint} ref={gridRef} aria-hidden="true" />

      <svg className={styles.arcs} aria-hidden="true" viewBox="0 0 1600 900">
        <path d="M -40 620 Q 420 380 900 520 T 1660 300" />
        <path d="M -60 220 Q 500 60 980 240 T 1680 120" />
      </svg>

      <svg className={styles.grain} aria-hidden="true">
        <filter id={grainFilterId}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves={2}
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.9 0"
          />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${grainFilterId})`} />
      </svg>

      <div className={styles.vignette} aria-hidden="true" />

      <Crosshair corner="topLeft" />
      <Crosshair corner="topRight" />
      <Crosshair corner="bottomLeft" />
      <Crosshair corner="bottomRight" />

      <div className={styles.center}>
        <div className={styles.pill} ref={pillRef}>
          <Icon name="star" size={13} />
          <Text variant="caption" as="span" tone="inverse">
            {heroCopy.pill}
          </Text>
        </div>

        <Text variant="display" as="h1" className={styles.headline}>
          <span
            className={styles.lineMask}
            ref={(el) => {
              lineMaskRefs.current[0] = el;
            }}
          >
            <span className={styles.headlineLead}>
              {heroCopy.headlineBefore}
            </span>
          </span>
          <span
            className={styles.lineMask}
            ref={(el) => {
              lineMaskRefs.current[1] = el;
            }}
          >
            <Highlight className={styles.headlineAccent}>
              {heroCopy.headlineAccent}
            </Highlight>
          </span>
          <span
            className={styles.lineMask}
            ref={(el) => {
              lineMaskRefs.current[2] = el;
            }}
          >
            <span className={styles.headlineLead}>
              {heroCopy.headlineAfter}
            </span>
          </span>
        </Text>

        <div className={styles.subtitle} ref={subtitleRef}>
          <Text variant="bodyMd" tone="inverseSecondary">
            {heroCopy.subtitle}
          </Text>
        </div>

        <div className={styles.ctaDock} ref={ctaRef}>
          <Button
            href={heroCopy.ctaHref}
            variant="accent"
            size="lg"
            iconAfter={<Icon name="arrowRight" size={16} />}
          >
            {heroCopy.ctaLabel}
          </Button>
        </div>

        <div className={styles.microcopy} ref={microRef}>
          <Text variant="caption" as="span" tone="inverseSecondary">
            {heroCopy.microcopy}
          </Text>
        </div>

        <div className={styles.videoRow} ref={videoRowRef}>
          <div className={styles.avatar}>
            <TintedMedia
              src={heroCopy.video.src}
              alt=""
              width={96}
              height={96}
              className={styles.avatarMedia}
            />
          </div>
          <button
            type="button"
            className={styles.playButton}
            aria-label={heroCopy.video.label}
          >
            <Icon name="play" size={13} />
          </button>
          <Text variant="caption" as="span" tone="inverseSecondary">
            {heroCopy.video.label}
          </Text>
        </div>

        <div className={styles.statement} ref={statementRef}>
          <Text variant="editorial" as="p" tone="inverse" align="center">
            {heroCopy.statement}
          </Text>
        </div>
      </div>

      <HeroStageV2 />
    </GridModule>
  );
}
