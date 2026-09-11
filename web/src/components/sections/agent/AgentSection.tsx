"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";

import { GridModule, Highlight, Icon, Text } from "@gridline";
import { useReducedMotion } from "@gridline/motion";
import { agentBehaviours, agentCopy } from "@/content/agent";

import { AgentPanelVisual } from "./AgentPanelVisual";
import styles from "./AgentSection.module.css";

/**
 * How long a tab stays open before the band turns to the next one.
 *
 * Eight seconds is set by the longest panel, not by a house rhythm: the copy
 * on the left of each card is three to four lines, and a reader who has just
 * arrived needs to get through that AND glance at the mock beside it before
 * the card is replaced under them. Five felt like being hurried; twelve and
 * the band stops reading as something that turns at all.
 */
const AUTO_ADVANCE_MS = 8000;

/**
 * How much of the band has to be on screen before it starts turning. A third
 * rather than any sliver: the point of advancing is that the reader sees it
 * happen, and a band creeping in at the bottom of the window has already
 * spent two of its eight seconds by the time it is worth looking at.
 */
const IN_VIEW_THRESHOLD = 0.35;

/**
 * The Tal band — the page's one immersive section, and the only place the
 * product talks about its own assistant rather than about what the visitor
 * will get.
 *
 * **It carries a heading and nothing else around the card** — no standfirst,
 * no footnote. It carried no heading at all for a long time, on the argument
 * that a demonstration should demonstrate rather than be introduced; what
 * that missed is that this is the one section a visitor meets with no idea
 * what they are looking at, since every other section on the page announces
 * itself and this one opened on a card of unlabelled product screens. The
 * heading is the label and the section's accessible name both — the module
 * takes `aria-labelledby` rather than an `aria-label` that said something
 * else — and it puts the outline back the right way up: the heading is the
 * `h2`, and the open tab's headline, which had been standing in as one,
 * is the `h3` it always was in meaning.
 *
 * **It is sized by its content.** It ran a full viewport tall for a while
 * and that was too much: a card of about seven hundred pixels centred in a
 * screen-high box leaves a third of a screen of empty mesh above it and
 * another third below. The panel is now as tall as the card plus its own
 * block padding, which on a normal desktop window is comfortably less than a
 * screen and reads as a band rather than as a slide.
 *
 * **The tabs turn on their own,** and they keep turning. Every eight seconds
 * the band opens the next behaviour, wrapping at the end — three states
 * nobody has to discover the switcher to see. It pauses under three
 * conditions, each a different kind of "someone is looking at this":
 *
 * - the pointer is over the SWITCHER, or focus is anywhere in the band;
 * - the band is not on screen;
 * - the viewer has asked for reduced motion, in which case it never starts.
 *
 * The pointer condition used to be the whole panel, and that was too much:
 * the pointer rests over the card while you read it, so the band that is
 * supposed to turn by itself spent most of its time not turning. Over the
 * switcher it still does the job it was added for — nobody reaching for a
 * tab gets a different one moved under their finger.
 *
 * Picking a tab used to be a fourth, and a permanent one. It is not any
 * more: it restarts the clock so the chosen tab gets a full dwell, and then
 * the rotation carries on. One click killing the rotation for the rest of
 * the visit cost more than it saved, since the rotation is what the band is
 * for and hovering already pauses it for anyone actually reading.
 *
 * Focus and the switcher hover are also what makes this pass WCAG 2.2.2:
 * moving content that runs longer than five seconds needs a mechanism to
 * pause it, and both are one — tabbing into the band stops it for as long as
 * focus is there, and so does resting the pointer on the control itself.
 *
 * Composition, top to bottom:
 *
 * 1. The ground — a flat, near-white grey and nothing else. It was four
 *    blurred rose blooms drifting on a timer; see the stylesheet for why
 *    they went. There is no blueprint lattice over it either: every other
 *    section on this site draws that grid, and this one deliberately does
 *    not, because a ruled grid over a ground this pale reads as a screen
 *    door in front of the card rather than as structure behind it.
 * 2. Open ground — the band's top margin, and the only thing in it.
 * 3. `.switcher` — three circles in one rounded container, centred,
 *    pulled down by exactly half its own height so it straddles the seam
 *    between the mesh and the card below. A real `tablist`: arrow keys move
 *    between them, and the tab that is focused is the tab that is open.
 * 4. `.card` — a white card holding the open behaviour: its copy on the
 *    left, and on the right the one visual that demonstrates it
 *    (`AgentPanelVisual`).
 *
 * **Three states, one card.** The pill is not decoration and the three
 * panels are not three crops of the same picture: each owns its own
 * headline, its own paragraph and its own working mock, and switching tabs
 * replaces all three. `agentBehaviours` is the single ordered list behind the
 * tabs, the badges, the panels and the auto-advance order, so adding a fourth
 * behaviour is a content edit and the pill grows a fourth icon on its own.
 *
 * **Motion** is two things and deliberately not more:
 *
 * - The visual container's own ambience: a ticker that never stops and a
 *   voice cue that surfaces every twenty seconds. Both live in
 *   `AgentPanelVisual`, and both are CSS.
 * - Switching tabs cross-fades the card's two columns. That one is keyed on
 *   React's `key` rather than tweened: giving the copy and the visual the
 *   open behaviour's id as their key remounts both on every switch, which
 *   restarts the CSS enter animation without a timeline to manage or a
 *   previous tween to interrupt when someone clicks three tabs quickly.
 *
 * Both animate `transform` and `opacity` only.
 *
 * A client component because the tabs, the auto-advance and all three mocks
 * are interactive.
 */
export function AgentSection() {
  const [activeId, setActiveId] = useState(agentBehaviours[0].id);

  /**
   * Bumped whenever the reader picks a tab, and read by nothing but the
   * interval's dependency list — changing it tears the running timer down
   * and starts a fresh one, so a tab you chose gets a full dwell rather
   * than whatever was left on the clock when you clicked.
   *
   * It replaces a one-way `autoplay` latch that picking a tab set to false
   * for good. That was the wrong trade: it is true that a set of tabs
   * fighting the reader is bad, but the cost was that ONE click anywhere in
   * the band killed the rotation for the rest of the visit — and the
   * rotation is the thing the band is for. Pausing on hover and on focus
   * already covers someone who is reading; nothing needs to cover someone
   * who has moved on.
   */
  const [nudge, setNudge] = useState(0);
  /** Pointer inside the band, or focus inside it. */
  const [engaged, setEngaged] = useState(false);
  const [inView, setInView] = useState(false);

  const reduced = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  /**
   * One base id per mount, so the `aria-controls` / `aria-labelledby` pair
   * between a tab and its panel is unique even if this section is ever
   * rendered twice on one page.
   */
  const baseId = useId();
  const tabId = (id: string) => `${baseId}-tab-${id}`;
  const panelId = (id: string) => `${baseId}-panel-${id}`;
  /* The section's heading, and therefore the section's accessible name —
     `GridModule` is pointed at this rather than given an `aria-label`, so
     what a screen reader announces is the heading on the screen. */
  const headingId = `${baseId}-heading`;

  /* The tab buttons, so arrow keys can move focus as well as selection. A
     tablist that moves selection without moving focus leaves the keyboard
     user looking at a panel they cannot tab into from where they are. */
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const node = panelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: IN_VIEW_THRESHOLD },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const turning = inView && !engaged && !reduced;

  useEffect(() => {
    if (!turning) return;

    /* `setActiveId` takes the updater form rather than closing over
       `activeId`, so this effect does not have to re-run — and restart its
       interval — on every advance. Re-running it would reset the clock each
       time and the last tab of a cycle would get a different dwell from the
       first. */
    const timer = window.setInterval(() => {
      setActiveId((current) => {
        const index = agentBehaviours.findIndex(
          (behaviour) => behaviour.id === current,
        );
        return agentBehaviours[(index + 1) % agentBehaviours.length].id;
      });
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(timer);
  }, [turning, nudge]);

  /** Any deliberate choice: a click on a tab, or an arrow key. */
  const choose = useCallback((id: string) => {
    setActiveId(id);
    setNudge((current) => current + 1);
  }, []);

  const chooseAt = useCallback(
    (index: number) => {
      const next =
        agentBehaviours[
          (index + agentBehaviours.length) % agentBehaviours.length
        ];
      choose(next.id);
      tabRefs.current[next.id]?.focus();
    },
    [choose],
  );

  const onTabKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          event.preventDefault();
          chooseAt(index + 1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
          event.preventDefault();
          chooseAt(index - 1);
          break;
        case "Home":
          event.preventDefault();
          chooseAt(0);
          break;
        case "End":
          event.preventDefault();
          chooseAt(agentBehaviours.length - 1);
          break;
        default:
          break;
      }
    },
    [chooseAt],
  );

  const active =
    agentBehaviours.find((behaviour) => behaviour.id === activeId) ??
    agentBehaviours[0];

  return (
    <GridModule
      id="the-agent"
      aria-labelledby={headingId}
      className={styles.root}
    >
      {/* The panel. Flush to the canvas's two vertical rules — `overflow:
          hidden` is what keeps the mesh's oversized, drifting layers inside
          it rather than letting them add horizontal scroll to the page or
          spill past the rules.

          Focus anywhere in the band pauses the rotation; the POINTER only
          pauses it over the switcher itself, which is why that pair of
          handlers is on the switcher and not here. `*Capture` on the focus
          pair, because focus and blur do not bubble. */}
      <div
        className={styles.panel}
        ref={panelRef}
        onFocusCapture={() => setEngaged(true)}
        onBlurCapture={() => setEngaged(false)}
      >
        {/* The band's heading. It sits on the ground above the card, centred,
            and it is the section's accessible name — see `agentCopy.heading`
            for why the band stopped being the one section on the page that
            never said what it was. */}
        <Text
          variant="display"
          as="h2"
          align="center"
          id={headingId}
          className={styles.sectionHeading}
        >
          {agentCopy.headingBefore}
          <Highlight>{agentCopy.headingAccent}</Highlight>
          {agentCopy.headingAfter}
        </Text>

        <div
          className={styles.card}
          id={panelId(active.id)}
          role="tabpanel"
          aria-labelledby={tabId(active.id)}
          /* Not a tab stop itself: everything inside either panel is already
             reachable, and a focusable wrapper would add a stop that
             announces nothing. */
        >
          {/* The copy column: the switcher, then the words. Only the words
              are keyed — see the switcher's own note. */}
          <div className={styles.cardCopy}>
            {/* The switcher, and it lives HERE now — inside the card, at
                the head of the copy column — rather than floating above the
                card as a separate object. Two things follow from the move.

                It is a segmented control and not a row of icon buttons: at
                this size and in this position it is reading as navigation
                for the column under it, and navigation gets a label. The
                filled accent disc is gone with it — a saturated red circle
                was the loudest thing on a card whose whole job is to be
                read, and it was competing with the accent inside the copy
                directly beneath it.

                It also sits OUTSIDE the keyed block below, deliberately. The
                copy remounts on every switch to replay its entrance; if the
                switcher remounted with it, the sliding thumb would be
                rebuilt at its new position every time instead of travelling
                there, which is the whole point of a thumb. */}
            <div
              className={styles.switcher}
              role="tablist"
              aria-label={agentCopy.tablistLabel}
              /* The pointer pause, and it lives on the control rather than on
                 the band. It used to be the whole panel, which meant that
                 resting the pointer anywhere over the card — which is where
                 it sits while you read — stopped the rotation for as long as
                 it stayed there, and the band the page is meant to turn by
                 itself simply never turned. Over the switcher it still does
                 the job it was added for: someone reaching for a tab is not
                 shown a different one under their finger. */
              onPointerEnter={() => setEngaged(true)}
              onPointerLeave={() => setEngaged(false)}
              /* The thumb's position, handed to CSS as an index. One
                 declaration in the stylesheet turns it into a translation,
                 so nothing here has to know a pixel. */
              style={
                {
                  "--agent-tab-index": agentBehaviours.findIndex(
                    (behaviour) => behaviour.id === active.id,
                  ),
                  "--agent-tab-count": agentBehaviours.length,
                } as CSSProperties
              }
            >
              <span className={styles.thumb} aria-hidden="true" />

              {agentBehaviours.map((behaviour, index) => {
                const selected = behaviour.id === active.id;

                return (
                  <button
                    key={behaviour.id}
                    type="button"
                    ref={(node) => {
                      tabRefs.current[behaviour.id] = node;
                    }}
                    id={tabId(behaviour.id)}
                    className={styles.tab}
                    role="tab"
                    aria-selected={selected}
                    aria-controls={panelId(behaviour.id)}
                    /* Roving tabindex: one stop for the whole group, and the
                       arrow keys move within it. */
                    tabIndex={selected ? 0 : -1}
                    onClick={() => choose(behaviour.id)}
                    onKeyDown={(event) => onTabKeyDown(event, index)}
                  >
                    <Icon name={behaviour.icon} size={15} />
                    <span className={styles.tabLabel}>{behaviour.label}</span>
                  </button>
                );
              })}
            </div>

            {/* A headline and a paragraph, and nothing else. Three things
                have been stripped from over and under this block in turn: a
                glyph tile, a "Learn more" link, and now the accent tagline
                that printed the open tab's label a second time. The label is
                already on screen — it is the lit segment in the control
                directly above — and repeating it in red a centimetre below
                was the same word twice, in the loudest colour on the card.

                Keyed on the open behaviour so it remounts and replays its
                entrance on every switch, whether the switch came from a
                click or from the clock. See the component note above for why
                this is a `key` and not a timeline. */}
            <div className={styles.copyBody} key={`${active.id}-copy`}>
              <Text variant="headingLg" as="h3" className={styles.panelHeading}>
                {active.heading}
              </Text>

              <Text variant="bodyMd" tone="body" className={styles.panelBody}>
                {active.body}
              </Text>
            </div>
          </div>

          <div className={styles.cardVisual} key={`${active.id}-visual`}>
            <AgentPanelVisual behaviourId={active.id} />
          </div>
        </div>
      </div>

      {/* Two whole rows of the sitewide blueprint lattice, closing the band.
          The panel above it is the one section on this site that draws no
          grid — a ruled lattice over a wash only a few percent off white
          reads as a screen door in front of the card — and this is where the
          page picks the grid back up. It is empty on purpose: it holds
          nothing, and every other section opens with the same two rows, so
          the band leaves the reader back on the structure it borrowed them
          from.

          The spacer below it is unchanged and still does its own job. */}
      <div className={styles.gridBox} aria-hidden="true" />

      {/* An empty box, inside the module and below the panel. It is not
          decoration and it holds nothing: it is the gap between the mesh's
          bottom edge and whatever section follows, and it lives here rather
          than as padding on `.root` so it travels with the section to every
          page that mounts it. The panel's own block padding sets the space
          INSIDE the band; this sets the space after it. */}
    </GridModule>
  );
}
