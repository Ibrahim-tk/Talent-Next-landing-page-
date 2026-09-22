"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button, Icon, cx } from "@gridline";
import { homeAnchors, primaryNav, site } from "@/content/site";

import styles from "./SiteHeader.module.css";

/**
 * The sticky site header.
 *
 * Client component because of the mobile drawer. The static page shipped a
 * hamburger button that did nothing; it now opens a real drawer and closes on
 * navigation.
 */
export interface SiteHeaderProps {
  /** Where both header CTAs point. Defaults to the homepage Get Started anchor. */
  ctaHref?: string;
  /** Label for both header CTAs. Defaults to the shared site label. */
  ctaLabel?: string;
}

export function SiteHeader({
  ctaHref = homeAnchors.getStarted,
  ctaLabel = site.ctaLabel,
}: SiteHeaderProps = {}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={styles.header} id="navbar">
      <div className={styles.inner}>
        <Link
          href={homeAnchors.hero}
          className={styles.brand}
          aria-label={`${site.name} home`}
        >
          <Image
            src={site.logoBlack}
            alt={site.name}
            width={104}
            height={40}
            priority
            className={styles.brandMark}
          />
        </Link>

        <nav className={styles.nav} aria-label="Main">
          {primaryNav.map((item) => (
            <Link key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <Button
            href={ctaHref}
            size="md"
            className={styles.headerCta}
          >
            {ctaLabel}
          </Button>
          <button
            type="button"
            className={styles.menuButton}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? "close" : "menu"} size={22} />
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={cx(styles.drawer, menuOpen && styles.drawerOpen)}
        hidden={!menuOpen}
      >
        <nav className={styles.drawerList} aria-label="Mobile">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.drawerLink}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button
          href={ctaHref}
          size="lg"
          fullWidth
          className={styles.drawerCta}
          onClick={closeMenu}
        >
          {ctaLabel}
        </Button>
      </div>
    </header>
  );
}
