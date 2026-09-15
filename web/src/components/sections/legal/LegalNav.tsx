"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { Icon, Text, cx } from "@gridline";
import { tableOfContents } from "@/content/legal/outline";
import type { LegalTocEntry } from "@/content/legal/outline";
import type { LegalDoc } from "@/content/legal/types";
import { privacyNotice, termsOfUse } from "@/content/site";

import styles from "./LegalNav.module.css";
import { useActiveHeading } from "./useActiveHeading";

/** The legal documents, in the order the sidebar lists them. */
const legalDocuments = [privacyNotice, termsOfUse] as const;

export interface LegalNavProps {
  doc: LegalDoc;
}

/** Every heading id in the outline, sections and subsections alike. */
function allIds(entries: readonly LegalTocEntry[]): string[] {
  return entries.flatMap((entry) => [
    entry.id,
    ...entry.children.map((child) => child.id),
  ]);
}

/**
 * The left rail: the two legal documents, with the open one expanded into
 * its sections, and each section that has subsections expandable in turn.
 *
 * The whole outline lives here — there is no second rail on the right. What
 * keeps twenty-three entries from reading as a wall is that the subsections
 * stay folded until asked for: the section a reader is currently in opens
 * itself, and a click opens any other.
 *
 * Nothing is drawn to express the three levels — no track, no fill, no
 * leading bar. Size, weight and colour carry the hierarchy, and every entry
 * hangs off the same left edge.
 *
 * A client component for the reading-position highlight and the disclosure;
 * every entry is a plain link and works without either.
 */
export function LegalNav({ doc }: LegalNavProps) {
  const sections = useMemo(() => tableOfContents(doc.blocks), [doc.blocks]);
  const activeId = useActiveHeading(
    useMemo(() => allIds(sections), [sections]),
  );

  /* Only sections the reader has actually clicked land here. Everything
     else falls through to the reading position, so the rail follows the
     document on its own until someone overrides it — and a section the
     reader deliberately closed stays closed even while they read it. */
  const [toggled, setToggled] = useState<Record<string, boolean>>({});

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
                  {sections.map((section) => {
                    const childIds = section.children.map((child) => child.id);
                    const within =
                      activeId === section.id ||
                      (activeId !== null && childIds.includes(activeId));
                    const open = toggled[section.id] ?? within;
                    const panelId = `${section.id}-subsections`;

                    return (
                      <li key={section.id}>
                        <div className={styles.sectionRow}>
                          <a
                            href={`#${section.id}`}
                            className={cx(
                              styles.sectionLink,
                              activeId === section.id &&
                                styles.sectionLinkActive,
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

                          {section.children.length > 0 ? (
                            <button
                              type="button"
                              className={styles.disclosure}
                              aria-expanded={open}
                              aria-controls={panelId}
                              aria-label={`${open ? "Hide" : "Show"} subsections of ${section.label}`}
                              onClick={() =>
                                setToggled((previous) => ({
                                  ...previous,
                                  [section.id]: !open,
                                }))
                              }
                            >
                              <Icon
                                name="chevronRight"
                                size={14}
                                className={cx(
                                  styles.chevron,
                                  open && styles.chevronOpen,
                                )}
                              />
                            </button>
                          ) : null}
                        </div>

                        {section.children.length > 0 ? (
                          <ul
                            id={panelId}
                            className={styles.subList}
                            hidden={!open}
                          >
                            {section.children.map((child) => (
                              <li key={child.id}>
                                <a
                                  href={`#${child.id}`}
                                  className={cx(
                                    styles.subLink,
                                    activeId === child.id &&
                                      styles.subLinkActive,
                                  )}
                                  aria-current={
                                    activeId === child.id ? "true" : undefined
                                  }
                                >
                                  {child.number ? (
                                    <span className={styles.sectionNumber}>
                                      {child.number}
                                    </span>
                                  ) : null}
                                  <span>{child.label}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
