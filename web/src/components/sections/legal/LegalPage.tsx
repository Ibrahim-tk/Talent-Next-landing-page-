import Link from "next/link";

import { GridCanvas, Icon, Text, cx } from "@gridline";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { tableOfContents } from "@/content/legal/outline";
import type { LegalDoc } from "@/content/legal/types";

import { LegalDocument } from "./LegalDocument";
import { LegalNav } from "./LegalNav";
import { LegalOnThisPage } from "./LegalOnThisPage";
import styles from "./LegalPage.module.css";

export interface LegalPageProps {
  doc: LegalDoc;
}

/**
 * The shell both legal routes render.
 *
 * `/privacy` and `/terms` differ only in the document they pass in, so they
 * are one component and two four-line route files — the same arrangement the
 * `/v1`–`/v3` variations use.
 *
 * The layout is a documentation site's, not a marketing page's: a sticky
 * rail of sections on the left, the article in the middle, and the article's
 * subsections on the right. Deliberately none of the canvas's ruled-module
 * idiom applies here — no `GridModule`, and so no hairline running the full
 * width of the frame between bands. The only rules drawn are the two that
 * separate the three columns, plus the track inside the left rail. A
 * document is read in one continuous pass, and the horizontal rules that
 * make the landing page read as a stack of bands only chop it up.
 *
 * A document with no subsections (the Terms of Use) drops the right column
 * outright rather than leaving an empty gutter beside the text.
 */
export function LegalPage({ doc }: LegalPageProps) {
  const hasSubsections = tableOfContents(doc.blocks).some(
    (section) => section.children.length > 0,
  );

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <GridCanvas>
        <SiteHeader />

        <main
          id="main-content"
          className={cx(styles.shell, hasSubsections && styles.shellWithRail)}
        >
          {/* Each rail is a two-box pair: the outer cell is the full-height
              grid item and carries the column divider, the inner box is
              what actually sticks. Making the cell itself sticky would
              shrink it to its own content and take the divider with it,
              leaving the line stopping partway down the page. */}
          <div className={styles.navCell}>
            <div className={styles.navInner}>
              <LegalNav doc={doc} />
            </div>
          </div>

          <article className={styles.articleCell}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/" className={styles.crumbLink}>
                Home
              </Link>
              <Icon
                name="chevronRight"
                size={12}
                className={styles.crumbSeparator}
              />
              <span className={styles.crumbCurrent} aria-current="page">
                {doc.title}
              </span>
            </nav>

            <Text variant="display" as="h1" className={styles.title}>
              {doc.title}
            </Text>

            <Text variant="caption" className={styles.meta}>
              {doc.lastUpdated}
            </Text>

            <LegalDocument blocks={doc.blocks} />
          </article>

          {hasSubsections ? (
            <div className={styles.railCell}>
              <div className={styles.railInner}>
                <LegalOnThisPage blocks={doc.blocks} />
              </div>
            </div>
          ) : null}
        </main>

        <SiteFooter />
      </GridCanvas>
    </>
  );
}
