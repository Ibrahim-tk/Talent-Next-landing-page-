"use client";

import { useState, useEffect } from "react";
import { GridModule, Icon, Text } from "@gridline";
import { getQuizData } from "@/lib/quizStorage";
import { builderResultsCopy } from "@/content/quizResults";

import styles from "./ResultsCard.module.css";

export function ResultsCard() {
  const [userName, setUserName] = useState("TEST");
  const [email, setEmail] = useState("your email address");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const data = getQuizData();
    if (data.contact?.firstName && data.contact.firstName.trim().length > 0) {
      setUserName(data.contact.firstName.trim());
    }
    if (data.contact?.email) {
      setEmail(data.contact.email);
    }
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

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
                        <Icon name="check" size={12} />
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
                  <button
                    type="button"
                    className={styles.assetButton}
                    onClick={() => setIsModalOpen(true)}
                  >
                    <span className={styles.assetButtonIcon}>
                      <Icon name={tile.icon} size={24} />
                    </span>
                    <span className={styles.assetButtonText}>
                      {tile.line1} {tile.line2}
                    </span>
                  </button>
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
                      <Icon name={idea.icon} size={18} />
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
                    <button
                      type="button"
                      className={`${styles.actionTile} ${styles.actionTilePrimary}`}
                      onClick={() => setIsModalOpen(true)}
                    >
                      <Icon name={tile.icon} size={18} />
                      <span className={styles.actionTileText}>
                        {tile.line1} {tile.line2}
                      </span>
                      <span className={styles.actionTileArrow} aria-hidden="true">
                        <Icon name="arrowRight" size={16} />
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </GridModule>

      {/* Check Your Email Modal */}
      {isModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-email-title"
        >
          <div className={styles.modalDialog}>
            <button
              type="button"
              className={styles.modalCloseButton}
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
            >
              <Icon name="close" size={18} />
            </button>

            <div className={styles.emailIconBadge}>
              <Icon name="mail" size={32} />
            </div>

            <Text variant="headingLg" as="h2" id="modal-email-title" className={styles.emailTitle}>
              Check Your Email!
            </Text>

            <p className={styles.emailBody}>
              Your full diagnostic dossier and next steps have been sent to
              <br />
              <strong>{email}</strong>.
              <br />
              Please check your inbox to access your results.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
