import Image from "next/image";
import type { ReactNode } from "react";

import { cx } from "../../utils/cx";
import { Text } from "../Text/Text";
import styles from "./Media.module.css";

/* ==========================================================================
   TintedMedia
   ========================================================================== */

export interface TintedMediaProps {
  src: string;
  alt: string;
  /** Rendered intrinsic size hint for next/image. */
  width?: number;
  height?: number;
  /** Fill the positioned parent instead of using intrinsic sizing. */
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  /** Overlaid on top of the tint — e.g. the archetype letter. */
  children?: ReactNode;
  className?: string;
}

/**
 * Photography under the house crimson duotone.
 *
 * ```tsx
 * <TintedMedia src={photo} alt="Athlete" fill sizes="320px">
 *   <span>A</span>
 * </TintedMedia>
 * ```
 */
export function TintedMedia({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes,
  priority = false,
  children,
  className,
}: TintedMediaProps) {
  return (
    <div className={cx(styles.tinted, className)}>
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={styles.tintedImage}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width ?? 700}
          height={height ?? 500}
          sizes={sizes}
          priority={priority}
          className={styles.tintedImage}
        />
      )}
      <span className={styles.tintedOverlay} aria-hidden="true" />
      {children}
    </div>
  );
}

/* ==========================================================================
   Thumbnail
   ========================================================================== */

export interface ThumbnailProps {
  src: string;
  alt: string;
  caption: ReactNode;
  sizes?: string;
  className?: string;
}

/**
 * ```tsx
 * <Thumbnail src={clip.src} alt={clip.alt} caption="Problem Solving (1:40)" />
 * ```
 */
export function Thumbnail({
  src,
  alt,
  caption,
  sizes = "(max-width: 768px) 30vw, 160px",
  className,
}: ThumbnailProps) {
  return (
    <figure className={cx(styles.thumbnail, className)}>
      <div className={styles.thumbnailMedia}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={styles.thumbnailImage}
        />
      </div>
      <figcaption className={styles.thumbnailCaption}>
        <Text variant="bodySm" as="span" tone="primary" weight="medium">
          {caption}
        </Text>
      </figcaption>
    </figure>
  );
}

/* ==========================================================================
   VideoFrame
   ========================================================================== */

export interface VideoFrameProps {
  /** One or more sources, tried in order. */
  sources: readonly string[];
  poster?: string;
  /** Describes the clip for anyone who can't play it. */
  label: string;
  className?: string;
}

/**
 * A letterboxed, autoplaying, muted loop. Always muted and `playsInline` so
 * mobile browsers permit autoplay.
 *
 * ```tsx
 * <VideoFrame sources={["/video/agent-loop.mp4"]} label="…" />
 * ```
 */
export function VideoFrame({
  sources,
  poster,
  label,
  className,
}: VideoFrameProps) {
  return (
    <div className={cx(styles.videoFrame, className)}>
      {/* Decorative ambient loop, no dialogue — described by aria-label. */}
      <video
        className={styles.video}
        autoPlay
        loop
        muted
        playsInline
        poster={poster}
        aria-label={label}
      >
        {sources.map((source) => (
          <source key={source} src={source} type="video/mp4" />
        ))}
      </video>
    </div>
  );
}
