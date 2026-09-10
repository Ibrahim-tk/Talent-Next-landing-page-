import { Crosshair, SurfaceCard, Text, TintedMedia } from "@gridline";
import type { ArchetypeV2 } from "@/content/archetypesV2";

import styles from "./ArchetypeTileV2.module.css";

export interface ArchetypeTileV2Props {
  archetype: ArchetypeV2;
  /** 1-based position, stamped as the tile's plate number ("01/"). */
  index: number;
}

/**
 * One tile of the archetype grid: a portrait overhanging the left
 * edge of a wider sunken panel that carries the plate number, the archetype
 * name, and its statement.
 *
 * The overlap is done with a single-cell grid — media and panel both occupy
 * `grid-area: 1 / 1`, the panel inset from the left by a fraction of the
 * media's width — rather than absolute positioning, so the row still takes
 * its height from whichever of the two is taller.
 */
export function ArchetypeTileV2({ archetype, index }: ArchetypeTileV2Props) {
  return (
    <article className={styles.tile}>
      <SurfaceCard
        tone="sunken"
        border="rule"
        radius="md"
        padding="none"
        interactive
        className={styles.panel}
      >
        {/* SurfaceCard's own `padding="none"` rule and a `padding` here
            would be two single-class rules of equal specificity — insertion
            order decides, which the system says not to rely on. So the
            panel's padding lives on this inner box instead. */}
        <div className={styles.panelInner}>
          <Text variant="editorial" as="span" className={styles.plate}>
            {String(index).padStart(2, "0")}
            <span className={styles.plateSlash}>/</span>
          </Text>

          <div className={styles.copy}>
            <Text variant="kicker" as="span">
              {archetype.name}
            </Text>
            <Text variant="headingMd" as="h3" className={styles.statement}>
              {archetype.statement}
            </Text>
            {/* Light, matching the live archetype card — see the note there. */}
            <Text
              variant="caption"
              tone="muted"
              weight="light"
              className={styles.description}
            >
              {archetype.description}
            </Text>
          </div>
        </div>

        <Crosshair corner="topRight" />
        <Crosshair corner="bottomRight" />
      </SurfaceCard>

      {/* Sizing lives on this wrapper, never on TintedMedia's own class —
          two single-class rules setting `height` would be resolved by CSS
          Module insertion order (see gridline/README.md). */}
      <div className={styles.media}>
        <TintedMedia
          src={archetype.image}
          alt={archetype.imageAlt}
          fill
          tint={false}
          sizes="(max-width: 768px) 100vw, (max-width: 1100px) 260px, 300px"
        >
          <span className={styles.letter} aria-hidden="true">
            {archetype.letter}
          </span>
        </TintedMedia>
      </div>
    </article>
  );
}
