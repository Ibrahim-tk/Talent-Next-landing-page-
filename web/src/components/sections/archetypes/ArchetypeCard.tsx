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
        <Text variant="caption" tone="secondary">
          {archetype.description}
        </Text>
      </div>
    </article>
  );
}
