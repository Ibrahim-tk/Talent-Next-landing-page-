import { Button, GridModule, Icon, Text } from "@gridline";
import { archetypesV2, archetypesV2Copy } from "@/content/archetypesV2";

import { ArchetypeTileV2 } from "./ArchetypeTileV2";
import styles from "./ArchetypesSectionV2.module.css";

/**
 * The archetype band, v2 — the second section of the `/hero-v2` preview page.
 *
 * Where the live homepage band pins the whole module and scrubs a six-card
 * track sideways, this one lays the same six archetypes out as a static 2×3
 * grid of overlap tiles: a tinted portrait overhanging a wider panel that
 * carries the plate number, the archetype name, and its statement. Nothing
 * here is pinned, scrubbed, or client-side — the layout is the whole idea,
 * so this stays a server component.
 *
 * Modelled on a reference grid (numbered panels with a product card
 * overhanging each one, a split header, and a plate mark closing the page)
 * but rebuilt in this system's vocabulary rather than copied: sunken
 * `SurfaceCard` panels and `TintedMedia` portraits instead of screenshots on
 * a dark ground, `Crosshair` registration marks instead of the reference's
 * corner dots, the accent used once per tile on the kicker, and the plate
 * number dropped to the hairline grey so it annotates rather than shouts.
 */
export function ArchetypesSectionV2() {
  return (
    <GridModule
      id="traits-v2"
      rule="bottom"
      aria-labelledby="archetypes-v2-heading"
    >
      <div className={styles.header}>
        <div className={styles.headerLead}>
          <Text variant="kicker" as="span">
            {archetypesV2Copy.eyebrow}
          </Text>
          <Text
            variant="editorial"
            as="h2"
            id="archetypes-v2-heading"
            className={styles.heading}
          >
            {archetypesV2Copy.heading}
          </Text>
        </div>

        <Text variant="bodyLg" tone="secondary" className={styles.headerNote}>
          {archetypesV2Copy.description}
        </Text>
      </div>

      <div className={styles.grid}>
        {archetypesV2.map((archetype, i) => (
          <ArchetypeTileV2
            key={archetype.id}
            archetype={archetype}
            index={i + 1}
          />
        ))}
      </div>

      <div className={styles.footer}>
        <Text variant="editorial" as="span" tone="accent" className={styles.mark}>
          {archetypesV2Copy.mark}
        </Text>

        <span className={styles.footerRule} aria-hidden="true" />

        <Text variant="bodySm" tone="muted" className={styles.footnote}>
          {archetypesV2Copy.footnote}
        </Text>

        <Button
          href={archetypesV2Copy.ctaHref}
          variant="primary"
          size="md"
          iconAfter={<Icon name="arrowRight" size={14} />}
        >
          {archetypesV2Copy.ctaLabel}
        </Button>
      </div>
    </GridModule>
  );
}
