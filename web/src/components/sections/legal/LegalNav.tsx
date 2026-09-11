"use client";

import Link from "next/link";
import { useMemo } from "react";

import { Text, cx } from "@gridline";
import { tableOfContents } from "@/content/legal/outline";
import type { LegalDoc } from "@/content/legal/types";
import { privacyNotice, termsOfUse } from "@/content/site";

import styles from "./LegalNav.module.css";
import { useActiveHeading } from "./useActiveHeading";

/** The legal documents, in the order the sidebar lists them. */
const legalDocuments = [privacyNotice, termsOfUse] as const;

export interface LegalNavProps {
  doc: LegalDoc;
}

/**
 * The left rail: the two legal documents, with the open one expanded into
 * its top-level sections.
 *
 * Sections only — subsections belong to the right rail. Splitting the
 * outline across the two rails is what keeps this list scannable: the
 * Privacy Notice has twelve sections and eleven subsections, and a single
 * nested list of all twenty-three is a wall rather than a map.
 *
 * A client component for the reading-position highlight; every entry is a
 * plain link and works without it.
 */
export function LegalNav({ doc }: LegalNavProps) {
  const sections = useMemo(
    () => tableOfContents(doc.blocks),
    [doc.blocks],
  );
  const activeId = useActiveHeading(
    useMemo(() => sections.map((section) => section.id), [sections]),
  );

  return (
    <nav className={styles.root} aria-label="Legal documents">
      <Text variant="eyebrow" as="h2" className={styles.groupTitle}>
        Legal
      </Text>

      <ul className={styles.docList}>
        {legalDocuments.map((entry) => {
          const current = entry.href === doc.href;

          return (
            <li key={entry.href}>
              <Link
                href={entry.href}
                className={cx(styles.docLink, current && styles.docLinkCurrent)}
                aria-current={current ? "page" : undefined}
              >
                {entry.label}
              </Link>

              {/* Only the open document expands. The other is a single
                  link — its own sections are not navigable from here
                  without a page load, so listing them would promise a
                  jump the link cannot make. */}
              {current && sections.length > 0 ? (
                <ul className={styles.sectionList}>
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className={cx(
                          styles.sectionLink,
                          activeId === section.id && styles.sectionLinkActive,
                        )}
                        aria-current={
                          activeId === section.id ? "true" : undefined
                        }
                      >
                        {section.number ? (
                          <span className={styles.sectionNumber}>
                            {section.number}
                          </span>
                        ) : null}
                        <span>{section.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
