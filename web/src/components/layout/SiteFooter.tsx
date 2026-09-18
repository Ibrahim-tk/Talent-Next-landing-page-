"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { cx, Icon, Text } from "@gridline";
import { useDarkNavRegion } from "@gridline/motion";
import {
  footerColumns,
  footerCopy,
  footerSocial,
  homeAnchors,
  site,
} from "@/content/site";

import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  /* The footer is a dark band now, so the sticky nav has to invert over it
     the same way it does over the other dark sections — a white bar at 95%
     over black is the exact wash-out the dark theme exists to prevent, and
     the footer is the one band a reader is guaranteed to end on. Its bottom
     never crosses the top of the viewport, so once claimed the dark bar
     holds to the foot of the page. */
  const darkSurfaceRef = useRef<HTMLElement>(null);
  useDarkNavRegion(darkSurfaceRef);

  return (
    <footer
      className={styles.footer}
      id="footer"
      aria-label="Site footer"
      ref={darkSurfaceRef}
    >
      <div className={styles.row}>
        <div className={cx(styles.cell, styles.brandCell)}>
          <Link href={homeAnchors.hero} aria-label={`${site.name} home`}>
            <Image
              src={site.logoWhite}
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
                    size={18}
                    className={styles.socialGlyph}
                  />
                  <span className={styles.socialLabel}>{social.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.accentBar} aria-hidden="true" />

      <div className={styles.legalBar}>
        <Text variant="caption" as="span" tone="muted">
          {footerCopy.legal}
        </Text>
      </div>
    </footer>
  );
}
