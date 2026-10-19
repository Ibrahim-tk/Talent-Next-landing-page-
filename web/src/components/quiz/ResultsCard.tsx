"use client";

import { useState, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight02Icon,
  Book02Icon,
  Briefcase01Icon,
  BubbleChatIcon,
  FlashIcon,
  Grid02Icon,
  ShieldCheckIcon,
  Tick02Icon,
  TruckIcon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { GridModule, Text } from "@gridline";
import type { IconName } from "@gridline";
import { getQuizData } from "@/lib/quizStorage";
import { builderResultsCopy } from "@/content/quizResults";

import styles from "./ResultsCard.module.css";

/**
 * The content still names icons in Gridline's vocabulary; this maps those
 * names onto the Hugeicons free set (Stroke Rounded), so the copy does not
 * have to know which icon library renders it.
 */
const hugeicon: Record<string, typeof TruckIcon> = {
  truck: TruckIcon,
  shieldCheck: ShieldCheckIcon,
  user: UserIcon,
  bolt: FlashIcon,
  gridSquares: Grid02Icon,
  ledger: Book02Icon,
  briefcase: Briefcase01Icon,
  messages: BubbleChatIcon,
};

function iconFor(name: IconName) {
  return hugeicon[name] ?? Grid02Icon;
}

/* Same link as the "Set your password" button in the welcome email. */
const setPasswordUrl = "https://tn-orcin.vercel.app/candidate#signup/create";

export function ResultsCard() {
  const [userName, setUserName] = useState("TEST");

  useEffect(() => {
    const data = getQuizData();
    if (data.contact?.firstName && data.contact.firstName.trim().length > 0) {
      setUserName(data.contact.firstName.trim());
    }
  }, []);

  return (
    <>
      <GridModule
        as="section"
        rule="bottom"
        className={styles.root}
        aria-labelledby="results-heading"
      >
        <div className={styles.poster}>
          {/* ---- Left column: the verdict -------------------------------- */}
          <aside className={styles.verdict}>
            <div className={styles.bubble}>
              <Text variant="display" as="h1" id="results-heading" className={styles.headline}>
                <small className={styles.greeting}>
                  {builderResultsCopy.headerGreeting(userName)}
                </small>
                <span className={styles.archetype}>{builderResultsCopy.archetype}</span>
              </Text>
            </div>

            <div className={styles.verdictBody}>
              <section className={styles.block}>
                <h2 className={styles.blockTitle}>{builderResultsCopy.roleTitle}</h2>
                <p className={styles.roleDescription}>{builderResultsCopy.roleDescription}</p>
              </section>

              <section className={styles.block}>
                <h2 className={styles.blockTitle}>
                  {builderResultsCopy.characteristicsTitle}
                </h2>

                <ul className={styles.traitList}>
                  {builderResultsCopy.characteristics.map((item) => (
                    <li key={item} className={styles.traitItem}>
                      <span className={styles.checkBadge}>
                        <HugeiconsIcon icon={Tick02Icon} size={16} strokeWidth={2} />
                      </span>
                      <span className={styles.traitText}>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <ul className={styles.assetButtons}>
              {builderResultsCopy.actionTiles.slice(0, 2).map((tile) => (
                <li key={tile.id} className={styles.assetButtonItem}>
                  <a href={setPasswordUrl} className={styles.assetButton}>
                    <span className={styles.assetButtonIcon}>
                      <HugeiconsIcon icon={iconFor(tile.icon)} size={20} strokeWidth={1.5} />
                    </span>
                    <span className={styles.assetButtonRow}>
                      <span className={styles.assetButtonText}>
                        {tile.line1} {tile.line2}
                      </span>
                      <span className={styles.assetButtonArrow} aria-hidden="true">
                        <HugeiconsIcon icon={ArrowRight02Icon} size={16} strokeWidth={1.5} />
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          {/* ---- Right column: where it leads ---------------------------- */}
          <div className={styles.paths}>
            <section className={styles.careers}>
              <h2 className={styles.blockTitle}>{builderResultsCopy.careerIdeasTitle}</h2>

              <ul className={styles.careerList}>
                {builderResultsCopy.careerIdeas.map((idea) => (
                  <li key={idea.title} className={styles.careerItem}>
                    <span className={styles.careerIcon}>
                      <HugeiconsIcon icon={iconFor(idea.icon)} size={16} strokeWidth={1.5} />
                    </span>
                    <div className={styles.careerText}>
                      <span className={styles.careerTitle}>{idea.title}</span>
                      <span className={styles.careerDescription}>{idea.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.nextStep}>
              <h2 className={styles.blockTitle}>{builderResultsCopy.nextStepTitle}</h2>
              <p className={styles.nextStepDescription}>
                {builderResultsCopy.nextStepDescription}
              </p>

              <ul className={styles.actionTiles}>
                {builderResultsCopy.actionTiles.slice(2).map((tile) => (
                  <li key={tile.id} className={styles.actionTileItem}>
                    <a
                      href={setPasswordUrl}
                      className={`${styles.actionTile} ${styles.actionTilePrimary}`}
                    >
                      <HugeiconsIcon icon={iconFor(tile.icon)} size={16} strokeWidth={1.5} />
                      <span className={styles.actionTileText}>
                        {tile.line1} {tile.line2}
                      </span>
                      <span className={styles.actionTileArrow} aria-hidden="true">
                        <HugeiconsIcon icon={ArrowRight02Icon} size={16} strokeWidth={1.5} />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </GridModule>
    </>
  );
}
