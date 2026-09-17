"use client";

import { useState, useEffect } from "react";
import { GridModule, Highlight, Icon, Text } from "@gridline";
import { getQuizData } from "@/lib/quizStorage";
import { builderResultsCopy } from "@/content/quizResults";

import styles from "./ResultsCard.module.css";

export function ResultsCard() {
  const [userName, setUserName] = useState("TEST");
  const [email, setEmail] = useState("your email address");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);

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

  const handleShare = async () => {
    if (typeof window === "undefined") return;
    const shareUrl = `${window.location.origin}/new/get-started`;
    const shareData = {
      title: "TALENTnext Diagnostic",
      text: builderResultsCopy.sharePrompt,
      url: shareUrl,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2400);
    } catch {
      // Ignore copy error
    }
  };

  return (
    <>
      <GridModule
        as="section"
        rule="bottom"
        className={styles.root}
        aria-labelledby="results-heading"
      >
        {/* Blueprint Lattice Spacer — identical to the landing page sections */}
        <div className={styles.gridBox} aria-hidden="true" />

        {/* Header Row: Quiz Results Eyebrow, Archetype Announcement & Role Callout */}
        <div className={styles.headerRow}>
          <div className={styles.kickerRow}>
            <span className={styles.kickerBadge}>
              <Icon name="check" size={13} />
              {builderResultsCopy.kicker}
            </span>
          </div>

          <Text variant="display" as="h1" id="results-heading" className={styles.headline}>
            {builderResultsCopy.headerGreeting(userName)}{" "}
            <Highlight>{builderResultsCopy.archetype}</Highlight>
          </Text>

          <div className={styles.roleBox}>
            <Text variant="headingMd" as="h2" className={styles.roleTitle}>
              {builderResultsCopy.roleTitle}
            </Text>
            <Text variant="bodyLg" className={styles.roleDescription}>
              {builderResultsCopy.roleDescription}
            </Text>
          </div>
        </div>

        {/* Two-Column Matrix Grid: Characteristics (Left) & Career Ideas (Right) */}
        <div className={styles.grid}>
          {/* Left Column: Characteristics of a Builder */}
          <div className={styles.leftColumn}>
            <Text variant="eyebrow" className={styles.columnEyebrow}>
              {builderResultsCopy.characteristicsTitle}
            </Text>

            <ul className={styles.characteristicsList}>
              {builderResultsCopy.characteristics.map((item, index) => (
                <li key={index} className={styles.characteristicItem}>
                  <span className={styles.checkBadge}>
                    <Icon name="check" size={13} />
                  </span>
                  <Text variant="bodyLg" className={styles.characteristicText}>
                    {item}
                  </Text>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Career Ideas */}
          <div className={styles.rightColumn}>
            <Text variant="eyebrow" className={styles.columnEyebrow}>
              {builderResultsCopy.careerIdeasTitle}
            </Text>

            <ul className={styles.careerList}>
              {builderResultsCopy.careerIdeas.map((idea, index) => (
                <li key={index} className={styles.careerItem}>
                  <span className={styles.careerIconBadge}>
                    <Icon name={idea.icon} size={18} />
                  </span>
                  <div className={styles.careerText}>
                    <span className={styles.careerTitle}>{idea.title}</span>
                    <span className={styles.dash}> – </span>
                    <span>{idea.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Full-width Row: Your Next Step & 3 Action Cards */}
        <div className={styles.nextStepSection}>
          <div className={styles.nextStepHeader}>
            <Text variant="eyebrow" className={styles.nextStepTitle}>
              {builderResultsCopy.nextStepTitle}
            </Text>
            <Text variant="bodyLg" className={styles.nextStepDescription}>
              {builderResultsCopy.nextStepDescription}
            </Text>
          </div>

          <div className={styles.actionTilesGrid}>
            {builderResultsCopy.actionTiles.map((tile) => {
              const isAgentTile = tile.id === "agent";
              return (
                <button
                  key={tile.id}
                  type="button"
                  className={`${styles.actionTile} ${isAgentTile ? styles.actionTileActive : ""}`}
                  onClick={() => setIsModalOpen(true)}
                >
                  <span className={styles.actionTileIcon}>
                    <Icon name={tile.icon} size={28} />
                  </span>
                  <span className={styles.actionTileText}>
                    <span>{tile.line1}</span>
                    <span>{tile.line2}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Share Bar */}
        <div className={styles.shareRow}>
          <Text variant="bodyMd" className={styles.sharePrompt}>
            {builderResultsCopy.sharePrompt}
          </Text>

          <button
            type="button"
            className={styles.shareBadge}
            onClick={handleShare}
            title="Share this quiz"
          >
            <span>{builderResultsCopy.shareLabel}</span>
            <span className={styles.shareIcons}>
              <Icon name="instagram" size={14} />
              <Icon name="linkedin" size={14} />
              <Icon name="youtube" size={14} />
            </span>
            {copiedNotification && (
              <span className={styles.copiedTag}>Copied!</span>
            )}
          </button>
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
