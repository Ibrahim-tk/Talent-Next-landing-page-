"use client";

import { useMemo } from "react";

import { Text, cx } from "@gridline";
import { tableOfContents } from "@/content/legal/outline";
import type { LegalTocEntry } from "@/content/legal/outline";
import type { LegalBlock } from "@/content/legal/types";

import styles from "./LegalOnThisPage.module.css";
import { useActiveHeading } from "./useActiveHeading";

export interface LegalOnThisPageProps {
  blocks: readonly LegalBlock[];
}

/** Every subsection in the document, flattened out of its parent section. */
function subsectionsOf(entries: readonly LegalTocEntry[]): LegalTocEntry[] {
  return entries.flatMap((entry) => entry.children);
}

/**
 * The right rail: the document's subsections.
 *
 * The counterpart to `LegalNav`, which takes the top-level sections. A
 * document with no subsections — the Terms of Use — renders nothing here,
 * and the page drops the column entirely rather than leaving an empty
 * gutter beside the text.
 *
 * The entries are numbered ("6.2", "7.3"), which is what lets them stand on
 * their own as a flat list: the number says which section each belongs to
 * without the list having to nest and repeat its parents.
 */
export function LegalOnThisPage({ blocks }: LegalOnThisPageProps) {
  const entries = useMemo(
    () => subsectionsOf(tableOfContents(blocks)),
    [blocks],
  );
  const activeId = useActiveHeading(
    useMemo(() => entries.map((entry) => entry.id), [entries]),
  );

  if (entries.length === 0) return null;

  return (
    <nav className={styles.root} aria-label="On this page">
      <Text variant="eyebrow" as="h2" className={styles.title}>
        On this page
      </Text>

      <ul className={styles.list}>
        {entries.map((entry) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              className={cx(
                styles.link,
                activeId === entry.id && styles.linkActive,
              )}
              aria-current={activeId === entry.id ? "true" : undefined}
            >
              {entry.number ? (
                <span className={styles.number}>{entry.number}</span>
              ) : null}
              <span>{entry.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
