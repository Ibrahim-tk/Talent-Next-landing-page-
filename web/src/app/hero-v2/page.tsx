import { GridCanvas } from "@gridline";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ArchetypesSectionV2 } from "@/components/sections/archetypesV2/ArchetypesSectionV2";
import { HeroSectionV2 } from "@/components/sections/heroV2/HeroSectionV2";

/**
 * Hero section playground.
 *
 * Section 1 is a standalone copy of the homepage's hero; section 2 is the
 * archetype band re-laid out as a static grid of overlap tiles
 * (`archetypesV2`) instead of the homepage's pinned horizontal scrub. Both
 * duplicate their content and styles, so nothing here is shared with the
 * live page.
 *
 * Everything is duplicated under `heroV2` / `archetypesV2` (components,
 * styles, and `content/heroV2.ts` / `content/archetypesV2.ts`) and dropped
 * into the same header/footer chrome as the real page so it previews in
 * context. Edit those files freely.
 */
export default function HeroV2Page() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <GridCanvas>
        <SiteHeader />

        <main id="main-content">
          <HeroSectionV2 />
          <ArchetypesSectionV2 />
        </main>

        <SiteFooter />
      </GridCanvas>
    </>
  );
}
