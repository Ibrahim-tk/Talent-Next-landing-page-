"use client";

import { useState, useEffect } from "react";
import { Button, GridModule, Highlight, Icon, Text } from "@gridline";
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
        <div className={styles.bento}>
          {/* ---- Identity — the headline tile ---------------------------- */}
          <article className={`${styles.tile} ${styles.identity}`}>
            <Text variant="display" as="h1" id="results-heading" className={styles.headline}>
              {builderResultsCopy.headerGreeting(userName)}{" "}
              <Highlight>{builderResultsCopy.archetype}</Highlight>
            </Text>

            <p className={styles.roleDescription}>{builderResultsCopy.roleDescription}</p>

            <ul className={styles.traitChips}>
              {builderResultsCopy.characteristics.map((item) => (
                <li key={item} className={styles.traitChip}>
                  <span className={styles.checkBadge}>
                    <Icon name="check" size={12} />
                  </span>
                  <span className={styles.traitText}>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* ---- Two stat chips ----------------------------------------- */}
          <article className={`${styles.tile} ${styles.statInverse}`}>
            <div className={styles.statLine}>
              <span className={styles.statFigure}>
                {builderResultsCopy.characteristics.length}
              </span>
              <p className={styles.statLabel}>{builderResultsCopy.traitStatLabel}</p>
              <Icon name="trendUp" size={26} />
            </div>
          </article>

          <article className={`${styles.tile} ${styles.statSoft}`}>
            <div className={styles.statLine}>
              <span className={styles.statFigure}>{builderResultsCopy.careerIdeas.length}</span>
              <p className={styles.statLabel}>{builderResultsCopy.careerStatLabel}</p>
              <Icon name="shieldCheck" size={26} />
            </div>
          </article>

          {/* ---- Career ideas ------------------------------------------- */}
          <article className={`${styles.tile} ${styles.careers}`}>
            <Text variant="eyebrow" as="h2" className={styles.tileEyebrow}>
              {builderResultsCopy.careerIdeasTitle}
            </Text>

            <ul className={styles.careerList}>
              {builderResultsCopy.careerIdeas.map((idea) => (
                <li key={idea.title} className={styles.careerItem}>
                  <span className={styles.careerIconBadge}>
                    <Icon name={idea.icon} size={15} />
                  </span>
                  <span className={styles.careerTitle}>{idea.title}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* ---- Next step headline ------------------------------------- */}
          <article className={`${styles.tile} ${styles.nextStep}`}>
            <Text variant="eyebrow" as="h2" className={styles.nextStepEyebrow}>
              {builderResultsCopy.nextStepTitle}
            </Text>
            <p className={styles.nextStepLine}>{builderResultsCopy.nextStepDescription}</p>
          </article>

          {/* ---- CTA ----------------------------------------------------- */}
          <article className={`${styles.tile} ${styles.cta}`}>
            <span className={styles.ctaTitle}>{builderResultsCopy.ctaEyebrow}</span>

            <ul className={styles.ctaAssets}>
              {builderResultsCopy.actionTiles.map((tile) => (
                <li key={tile.id} className={styles.ctaAsset}>
                  <Icon name={tile.icon} size={16} />
                  <span>
                    {tile.line1} {tile.line2}
                  </span>
                </li>
              ))}
            </ul>

            <Button
              variant="primary"
              size="lg"
              className={styles.ctaButton}
              onClick={() => setIsModalOpen(true)}
              iconAfter={<Icon name="arrowRight" size={16} />}
            >
              {builderResultsCopy.ctaLabel}
            </Button>
          </article>
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
