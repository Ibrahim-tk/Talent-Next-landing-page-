import Link from "next/link";

import { GridCanvas, Icon, Text } from "@gridline";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import type { LegalDoc } from "@/content/legal/types";

import { LegalDocument } from "./LegalDocument";
import { LegalNav } from "./LegalNav";
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
 * rail carrying the whole outline on the left, and the article beside it.
 * Deliberately none of the canvas's ruled-module idiom applies here — no
 * `GridModule`, and so no hairline running the full width of the frame
 * between bands. A document is read in one continuous pass, and the
 * horizontal rules that make the landing page read as a stack of bands only
 * chop it up. No rules are drawn between the columns either: the rail is
 * set apart from the prose by type and by the gutter, not by a line.
 *
 * Subsections used to have a column of their own on the right. They fold
 * into the left rail instead, which leaves the article a single neighbour
 * and the reader a single place to look.
 */
export function LegalPage({ doc }: LegalPageProps) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <GridCanvas>
        <SiteHeader />

        <main id="main-content" className={styles.shell}>
          {/* The rail is a two-box pair: the outer cell is the full-height
              grid item, the inner box is what actually sticks. Making the
              cell itself sticky would shrink it to its own content, which
              leaves the sticky box nothing tall enough to stay stuck
              against for the length of the scroll. */}
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
        </main>

        <SiteFooter />
      </GridCanvas>
    </>
  );
}
