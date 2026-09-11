import Image from "next/image";
import Link from "next/link";

import { cx, Icon, Text } from "@gridline";
import {
  footerColumns,
  footerCopy,
  footerSocial,
  homeAnchors,
  privacyNotice,
  site,
  termsOfUse,
} from "@/content/site";

import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer} id="footer" aria-label="Site footer">
      <div className={styles.row}>
        <div className={cx(styles.cell, styles.brandCell)}>
          <Link href={homeAnchors.hero} aria-label={`${site.name} home`}>
            <Image
              src={site.logoBlack}
              alt={site.name}
              width={104}
              height={40}
              className={styles.brandMark}
            />
          </Link>
          <Text variant="bodyMd" className={styles.tagline}>
            {footerCopy.tagline}
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
          <ul className={styles.socialList}>
            {footerSocial.map((social) => (
              <li key={social.label}>
                <Link href={social.href} className={styles.socialLink}>
                  <Icon
                    name={social.icon}
                    size={22}
                    className={styles.socialGlyph}
                  />
                  <span>{social.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.accentBar} aria-hidden="true" />

      <div className={styles.legalBar}>
        <div className={styles.legalLeft}>
          <Text variant="caption" as="span" tone="muted">
            {footerCopy.legal}
          </Text>
          <span className={styles.legalDot} aria-hidden="true" />
          <Link href={privacyNotice.href} className={styles.legalLink}>
            {privacyNotice.label}
          </Link>
          <span className={styles.legalDot} aria-hidden="true" />
          <Link href={termsOfUse.href} className={styles.legalLink}>
            {termsOfUse.label}
          </Link>
        </div>
        <Text variant="caption" as="span" tone="muted">
          {footerCopy.credit}
        </Text>
      </div>
    </footer>
  );
}
