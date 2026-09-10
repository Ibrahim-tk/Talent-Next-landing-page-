import { Text, TintedMedia } from "@gridline";
import type { Archetype } from "@/content/archetypes";

import styles from "./ArchetypeCard.module.css";

export interface ArchetypeCardProps {
  archetype: Archetype;
}

export function ArchetypeCard({ archetype }: ArchetypeCardProps) {
  return (
    <article className={styles.card}>
      {/* The sizing lives on this wrapper, not on TintedMedia: two
          single-class rules setting `height` would be resolved by CSS Module
          insertion order, which is not something to rely on. */}
      <div className={styles.media}>
        <TintedMedia
          src={archetype.image}
          alt={archetype.imageAlt}
          fill
          tint={false}
          sizes="(max-width: 768px) 260px, 305px"
        >
          <span className={styles.letter} aria-hidden="true">
            {archetype.letter}
          </span>
        </TintedMedia>
      </div>

      <div className={styles.content}>
        <Text variant="title" className={styles.title}>
          {archetype.name}
        </Text>
        {/* Light rather than the caption role's Regular. The system holds
            sub-16px roles at 400 as a legibility floor, but this is a full
            paragraph of card copy sitting directly under a Light title —
            at 400 it reads heavier than the heading above it. */}
        <Text variant="caption" tone="secondary" weight="light">
          {archetype.description}
        </Text>
      </div>
    </article>
  );
}
