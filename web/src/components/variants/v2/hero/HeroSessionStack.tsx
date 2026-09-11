"use client";

import { useEffect, useState } from "react";

import {
  Icon,
  MeterRow,
  StepperTimeline,
  SurfaceCard,
  Text,
} from "@gridline";
import { useReducedMotion } from "@gridline/motion";
import {
  heroSessionCards,
  heroSessionCycleMs,
  type HeroSessionCard,
} from "@/content/variants/v2/hero";

import styles from "./HeroSessionStack.module.css";

/**
 * The /v2 hero's one floating artefact: a deck of three cards in the
 * bottom-right corner, cycling so each takes its turn at the front.
 *
 * It replaced a single static card previewing an "Ask Tal AI anything"
 * prompt. The three cards here are the same three steps the rest of the
 * page already sets out — talk, see what stands out, get your next steps —
 * so the hero previews the product rather than advertising a text box.
 *
 * Every pixel is drawn from Gridline. The cards are `SurfaceCard`; the
 * summary's bars are `MeterRow`; the plan's sequence is `StepperTimeline`.
 * That is deliberate and it is also what makes the deck cheap: three cards
 * of bespoke markup would be three things to restyle when the system moves,
 * where this is three arrangements of components that move with it.
 *
 * Entirely decorative. The whole deck is `aria-hidden` and built from
 * non-interactive elements, so it never offers assistive tech or the
 * keyboard a control that does nothing — the same rule every other floating
 * card on the site follows. It is also why the cycling needs no pause
 * control: there is nothing here to read that is not repeated, in full and
 * in order, in the section below.
 */
export function HeroSessionStack() {
  const reduced = useReducedMotion();
  const [front, setFront] = useState(0);

  useEffect(() => {
    // A deck that shuffles itself is motion the visitor did not ask for, so
    // reduced motion stops the cycle outright rather than merely shortening
    // it. The deck still renders — three cards fanned, the first in front —
    // which is the same composition, just held.
    if (reduced) return;

    const id = window.setInterval(
      () => setFront((current) => (current + 1) % heroSessionCards.length),
      heroSessionCycleMs,
    );
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <div className={styles.slot} aria-hidden="true">
      <div className={styles.floater}>
        <div className={styles.stack}>
          {heroSessionCards.map((card, index) => {
            // How far back this card sits right now: 0 is the front, and
            // the rest fan out behind it in order. Computed from the
            // distance to `front` rather than stored per card, so the deck
            // has exactly one piece of state and cannot get into a
            // position where two cards both think they are on top.
            const depth =
              (index - front + heroSessionCards.length) %
              heroSessionCards.length;

            return (
              <div
                key={card.id}
                className={styles.layer}
                data-depth={depth}
                style={{ zIndex: heroSessionCards.length - depth }}
              >
                <SessionCard card={card} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SessionCard({ card }: { card: HeroSessionCard }) {
  return (
    <SurfaceCard
      tone="raised"
      border="elevated"
      radius="lg"
      elevation="sm"
      padding="md"
      className={styles.card}
    >
      <div className={styles.head}>
        <span className={styles.badge}>
          <Icon name={card.icon} size={13} />
        </span>
        <Text variant="eyebrow" tone="muted" as="span">
          {card.eyebrow}
        </Text>
      </div>

      <Text variant="title" tone="primary" as="p" className={styles.heading}>
        {card.heading}
      </Text>

      {card.body.kind === "note" ? (
        <>
          <Text variant="bodySm" tone="secondary" as="p">
            {card.body.text}
          </Text>
          <Text
            variant="caption"
            tone="muted"
            as="p"
            className={styles.meta}
          >
            {card.body.meta}
          </Text>
        </>
      ) : null}

      {card.body.kind === "meters" ? (
        <div className={styles.meters}>
          {card.body.meters.map((meter) => (
            <MeterRow key={meter.name} name={meter.name} value={meter.value} />
          ))}
        </div>
      ) : null}

      {card.body.kind === "steps" ? (
        <StepperTimeline steps={card.body.steps} className={styles.steps} />
      ) : null}
    </SurfaceCard>
  );
}
