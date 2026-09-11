import type { Key, ReactNode } from "react";
import Link from "next/link";

import { Icon, Text, cx } from "@gridline";
import type { LegalBlock, LegalListItem } from "@/content/legal/types";

import styles from "./LegalDocument.module.css";

/* --------------------------------------------------------------------------
   Inline markup
   --------------------------------------------------------------------------
   Legal copy needs exactly two inline affordances — a bolded defined term
   ("**Notice**") and the occasional link — so rather than pull in a Markdown
   renderer, content files write `**bold**` and `[label](href)` and this
   splitter handles both. Anything else is emitted as plain text, so a stray
   bracket or asterisk in the source can never become markup by accident.
   -------------------------------------------------------------------------- */

const INLINE_PATTERN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
const LINK_PATTERN = /^\[([^\]]+)\]\(([^)]+)\)$/;

function renderInline(text: string): ReactNode {
  const parts = text.split(INLINE_PATTERN).filter((part) => part !== "");

  return parts.map((part, index) => {
    const key: Key = `${index}-${part.slice(0, 12)}`;

    if (part.startsWith("**") && part.endsWith("**")) {
      /* Recurse so a link inside a bolded sentence is still a link. The bold
         pattern cannot match another `**`, so this bottoms out immediately. */
      return (
        <strong key={key} className={styles.term}>
          {renderInline(part.slice(2, -2))}
        </strong>
      );
    }

    const link = LINK_PATTERN.exec(part);
    if (link) {
      const [, label, href] = link;
      const external = /^(https?:|mailto:|tel:)/.test(href);

      return external ? (
        <a
          key={key}
          href={href}
          className={styles.link}
          {...(href.startsWith("http")
            ? { target: "_blank", rel: "noreferrer noopener" }
            : {})}
        >
          {label}
        </a>
      ) : (
        <Link key={key} href={href} className={styles.link}>
          {label}
        </Link>
      );
    }

    return part;
  });
}

/* --------------------------------------------------------------------------
   Lists
   -------------------------------------------------------------------------- */

function renderListItem(item: LegalListItem, index: number) {
  if (typeof item === "string") {
    return (
      <li key={index} className={styles.listItem}>
        {renderInline(item)}
      </li>
    );
  }

  return (
    <li key={index} className={styles.listItem}>
      {renderInline(item.text)}
      <ul className={cx(styles.list, styles.nestedList)}>
        {item.items.map((child, childIndex) => (
          <li key={childIndex} className={styles.listItem}>
            {renderInline(child)}
          </li>
        ))}
      </ul>
    </li>
  );
}

/* --------------------------------------------------------------------------
   Blocks
   -------------------------------------------------------------------------- */

function renderBlock(block: LegalBlock, index: number) {
  switch (block.type) {
    case "section":
      return (
        <div key={index} id={block.id} className={styles.sectionHead}>
          {block.number ? (
            <Text variant="kicker" as="span" className={styles.sectionNumber}>
              {block.number}
            </Text>
          ) : null}
          <Text variant="headingLg" as="h2" className={styles.sectionHeading}>
            {block.heading}
          </Text>
        </div>
      );

    case "subsection":
      return (
        <div key={index} id={block.id} className={styles.subsectionHead}>
          <Text variant="headingMd" as="h3" className={styles.subsectionHeading}>
            {block.number ? (
              <span className={styles.subsectionNumber}>{block.number}</span>
            ) : null}
            {block.heading}
          </Text>
        </div>
      );

    case "heading":
      return (
        <Text
          key={index}
          variant="eyebrow"
          as="h4"
          className={styles.runInHeading}
        >
          {block.heading}
        </Text>
      );

    case "paragraph":
      return (
        <Text key={index} variant="bodyMd" tone="body" className={styles.paragraph}>
          {renderInline(block.text)}
        </Text>
      );

    case "list": {
      const ListTag = block.ordered ? "ol" : "ul";
      return (
        <ListTag
          key={index}
          className={cx(styles.list, block.ordered && styles.orderedList)}
        >
          {block.items.map(renderListItem)}
        </ListTag>
      );
    }

    case "notice":
      return (
        <div key={index} className={styles.notice}>
          <div className={styles.noticeHead}>
            <Icon name="info" size={15} className={styles.noticeIcon} />
            <Text variant="eyebrow" as="p" className={styles.noticeLabel}>
              {block.label ?? "Note"}
            </Text>
          </div>
          <Text variant="bodyMd" tone="body" className={styles.noticeText}>
            {renderInline(block.text)}
          </Text>
        </div>
      );

    case "contact":
      return (
        <div key={index} className={styles.contact}>
          {block.heading ? (
            <Text variant="eyebrow" as="h4" className={styles.contactHeading}>
              {block.heading}
            </Text>
          ) : null}
          {block.lines.map((line, lineIndex) => (
            <Text
              key={lineIndex}
              variant="bodyMd"
              tone="body"
              className={styles.contactLine}
            >
              {renderInline(line)}
            </Text>
          ))}
        </div>
      );

    default:
      return null;
  }
}

export interface LegalDocumentProps {
  blocks: readonly LegalBlock[];
}

/**
 * The body of a legal document: the measured prose column itself.
 *
 * Deliberately plain. These pages exist to be read and cited, so the
 * architectural devices the marketing sections lean on — full-bleed media,
 * ruled matrices, pinned stages — are all absent; the only Gridline idioms
 * kept are the hairline that opens each section and the mono kicker that
 * numbers it.
 *
 * This component renders no module and no page structure of its own: it is
 * the right-hand cell of the two-column layout `LegalPage` builds, and the
 * page owns where that cell sits. Keeping the two separate is what lets the
 * sidebar be sticky while the document scrolls past it.
 */
export function LegalDocument({ blocks }: LegalDocumentProps) {
  return <div className={styles.column}>{blocks.map(renderBlock)}</div>;
}
