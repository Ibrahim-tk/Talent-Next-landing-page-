import Image from "next/image";
import Link from "next/link";

import { Text } from "@gridline";
import { footerColumns, footerCopy, site } from "@/content/site";

import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer} id="footer" aria-label="Site footer">
      <div className={styles.top}>
        <div className={styles.brandCol}>
          <Link href="#hero" aria-label={`${site.name} home`}>
            <Image
              src={site.logoBlack}
              alt={site.name}
              width={52}
              height={20}
              className={styles.brandMark}
            />
          </Link>
          <Text variant="bodyMd">{footerCopy.tagline}</Text>
        </div>

        <div className={styles.columns}>
          {footerColumns.map((column) => (
            <div key={column.title}>
              <Text
                variant="eyebrow"
                as="h2"
                className={styles.columnTitle}
              >
                {column.title}
              </Text>
              <ul className={styles.linkList}>
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <Link href={link.href} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bottom}>
        <Text variant="caption" as="span">
          {footerCopy.legal}
        </Text>
        <Text variant="caption" as="span">
          {footerCopy.credit}
        </Text>
      </div>
    </footer>
  );
}
