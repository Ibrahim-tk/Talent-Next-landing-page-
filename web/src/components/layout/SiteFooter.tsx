import Image from "next/image";
import Link from "next/link";

import { cx, Icon, Text } from "@gridline";
import { footerColumns, footerCopy, footerSocial, site } from "@/content/site";

import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer} id="footer" aria-label="Site footer">
      <div className={styles.row}>
        <div className={cx(styles.cell, styles.brandCell)}>
          <Link href="#hero" aria-label={`${site.name} home`}>
            <Image
              src={site.logoBlack}
              alt={site.name}
              width={52}
              height={20}
              className={styles.brandMark}
            />
          </Link>
          <Text variant="bodyMd" className={styles.tagline}>
            {footerCopy.tagline}
          </Text>
          <Text
            variant="caption"
            as="p"
            tone="muted"
            className={styles.copyright}
          >
            {footerCopy.legal}
          </Text>
        </div>

        {footerColumns.map((column) => (
          <div key={column.title} className={styles.cell}>
            <Text variant="eyebrow" as="h2" className={styles.columnTitle}>
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

        <div className={styles.cell}>
          <Text variant="eyebrow" as="h2" className={styles.columnTitle}>
            Connect
          </Text>
          <div className={styles.socialRow}>
            {footerSocial.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className={styles.socialLink}
              >
                <Icon name={social.icon} size={17} />
              </Link>
            ))}
          </div>
          <Text
            variant="caption"
            as="p"
            tone="muted"
            className={styles.credit}
          >
            {footerCopy.credit}
          </Text>
        </div>
      </div>
    </footer>
  );
}
