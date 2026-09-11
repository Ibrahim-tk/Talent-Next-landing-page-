import type { LegalBlock } from "./types";

export interface LegalTocEntry {
  /** The `id` of the heading this entry jumps to. */
  id: string;
  /** "7.2" where the document numbers its sections; absent in the Terms. */
  number?: string;
  label: string;
  /** Subsections nested under a top-level section. */
  children: LegalTocEntry[];
}

/**
 * Derive a document's table of contents from its own blocks.
 *
 * The outline is computed rather than authored so it cannot fall out of step
 * with the document: adding a section to `privacy.ts` puts it in the sidebar,
 * renaming one renames the link, and there is no second list to remember to
 * update. Every `section` and `subsection` block already carries the `id` the
 * link needs, so nothing here invents an anchor.
 *
 * `subsection` blocks nest under the most recent `section`. A subsection that
 * somehow appears before any section is promoted to the top level rather than
 * dropped — it is still a real heading in the document, and silently losing
 * it from the outline would be worse than showing it a level too high.
 */
export function tableOfContents(
  blocks: readonly LegalBlock[],
): LegalTocEntry[] {
  const entries: LegalTocEntry[] = [];

  for (const block of blocks) {
    if (block.type === "section") {
      entries.push({
        id: block.id,
        number: block.number,
        label: block.heading,
        children: [],
      });
      continue;
    }

    if (block.type === "subsection") {
      const child: LegalTocEntry = {
        id: block.id,
        number: block.number,
        label: block.heading,
        children: [],
      };
      const parent = entries.at(-1);
      if (parent) parent.children.push(child);
      else entries.push(child);
    }
  }

  return entries;
}
