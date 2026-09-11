"use client";

import Image from "next/image";
import type { CSSProperties, RefObject } from "react";

import { cx } from "@gridline";
import {
  gsap,
  prefersReducedMotion,
  useGSAP,
  useReducedMotion,
} from "@gridline/motion";
import {
  heroOrbitItems,
  heroOrbitTiming,
  type HeroOrbitItem,
} from "@/content/variants/v3/hero";

import styles from "./HeroOrbit.module.css";

/**
 * One rail of the hero's asset cloud — the column of space between the
 * centred copy and the canvas rule on that side.
 *
 * The rails are real grid columns, not absolutely positioned strips laid
 * over the section (see `HeroSection.module.css`). That is the whole reason
 * the photographs cannot land on the headline at any viewport width: they
 * are positioned inside a box that the copy is not in, so there is no width
 * at which the two can meet and no magic number holding them apart.
 *
 * Both rails render the same component and it filters the shared list by
 * side, so the items' order in `heroOrbitItems` stays the order they arrive
 * in rather than being split across two arrays that would have to be kept
 * in sync.
 */
export function HeroOrbit({ side }: { side: "left" | "right" }) {
  const items = heroOrbitItems.filter((item) => item.side === side);

  return (
    <div className={styles.rail} aria-hidden="true" data-orbit-rail={side}>
      {items.map((item) => (
        <OrbitItem key={item.slot} item={item} />
      ))}
    </div>
  );
}

function OrbitItem({ item }: { item: HeroOrbitItem }) {
  // Reactive rather than the synchronous check, because this one decides
  // what gets *rendered* (an autoplaying video or a paused one), not just
  // whether a timeline runs. Starting `false` keeps the server and first
  // client render in agreement.
  const reduced = useReducedMotion();

  return (
    <figure
      className={cx(styles.item, item.kind === "video" && styles.itemVideo)}
      data-orbit-slot={item.slot}
      style={
        {
          "--orbit-width": `${item.renderWidth}px`,
          "--orbit-ratio": `${item.ratio}`,
          "--orbit-top": `${item.top * 100}%`,
          "--orbit-inset": `${item.inset * 100}%`,
          "--orbit-rotation": `${item.rotation}deg`,
        } as CSSProperties
      }
    >
      {item.kind === "video" ? (
        <video
          className={styles.media}
          src={item.src}
          width={item.width}
          height={item.height}
          // `muted` is not optional — a video with sound is not allowed to
          // autoplay in any current browser, so dropping it does not make
          // the hero noisy, it makes the circle a frozen first frame.
          muted
          loop
          playsInline
          // `playsInline` above stops iOS taking this fullscreen; without it
          // a decorative loop hijacks the whole screen on tap.
          autoPlay={!reduced}
          preload="metadata"
          tabIndex={-1}
        />
      ) : (
        <Image
          className={styles.media}
          src={item.src}
          alt=""
          width={item.width}
          height={item.height}
          // The rendered widths are all under 260px, so the candidate this
          // picks is small however large the source file is.
          sizes="280px"
          priority
        />
      )}
    </figure>
  );
}

/**
 * A little past the rule, so an item's leading edge is genuinely off-canvas
 * at the start of its travel rather than sitting exactly on the boundary
 * where a sub-pixel rounding error would show a sliver of it.
 */
const OFF_CANVAS_SLACK_PX = 32;

/**
 * The entry animation, owned by the hero section rather than by either rail.
 *
 * It lives here — one hook driving both rails — because the stagger has to
 * run down `heroOrbitItems` in order, alternating sides. Two per-rail
 * timelines could not do that without sharing a clock.
 *
 * Call this from the section with a ref to the module.
 */
export function useHeroOrbitEntry(scopeRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const scope = scopeRef.current;
      if (!scope) return;

      // Paired rather than two parallel arrays. The rails are `display:
      // none` below the breakpoint, and a hidden item measures as a zero
      // rect — so the list of things to animate is genuinely shorter than
      // the list of items, and indexing one by the other's position would
      // hand each node the wrong item's rotation and float period.
      const targets = heroOrbitItems
        .map((item) => ({
          item,
          node: scope.querySelector<HTMLElement>(
            `[data-orbit-slot="${item.slot}"]`,
          ),
        }))
        .filter(
          (pair): pair is { item: HeroOrbitItem; node: HTMLElement } =>
            // `offsetParent` is null for a `display: none` element, which is
            // the cheapest way to ask "is this rail actually laid out?"
            // without reading a style back off the DOM.
            pair.node !== null && pair.node.offsetParent !== null,
        );

      if (targets.length === 0) return;

      // Reduced motion means the cloud is simply there. The items are
      // invisible until something makes them visible (see the stylesheet's
      // note on `.item`), so this is a `set`, not an early return.
      if (prefersReducedMotion()) {
        gsap.set(
          targets.map((pair) => pair.node),
          { opacity: 1 },
        );
        return;
      }

      const bounds = scope.getBoundingClientRect();
      const { delay, duration, stagger } = heroOrbitTiming;

      const timeline = gsap.timeline({ delay });

      targets.forEach(({ item, node }, index) => {
        const rect = node.getBoundingClientRect();

        // How far this item has to travel to sit completely outside the
        // canvas on its own side. Measured per item rather than set to a
        // shared percentage: the items are different widths and sit at
        // different insets, so a single `xPercent: -140` would leave the
        // widest one still poking through the rule while the narrowest
        // started from far further out than it needed to. Measuring means
        // every item begins exactly at the edge and they all arrive
        // travelling at the same speed.
        //
        // The module clips (`clip` on the GridModule), so the travel that
        // happens outside the rules is simply not painted — which is what
        // sells them as coming in from off-canvas rather than fading up
        // from the margin.
        const distance =
          item.side === "left"
            ? -(rect.right - bounds.left + OFF_CANVAS_SLACK_PX)
            : bounds.right - rect.left + OFF_CANVAS_SLACK_PX;

        timeline.fromTo(
          node,
          {
            x: distance,
            opacity: 0,
            // Slightly over-rotated on the way in, so the tilt settles into
            // its resting angle rather than being carried in flat.
            rotation: item.rotation * 2.5,
            scale: 0.92,
          },
          {
            x: 0,
            opacity: 1,
            rotation: item.rotation,
            scale: 1,
            duration,
            // `power3.out` rather than a bounce or a back-ease: the items
            // are photographs of people, and an overshoot makes them read
            // as UI chrome springing into place.
            ease: "power3.out",
          },
          index * stagger,
        );
      });

      // The idle drift, started once the cloud has landed. Separate tweens
      // rather than one staggered tween: each item has its own period, and
      // sharing a duration is exactly what makes a group of floating
      // elements read as one rigid object drifting.
      //
      // `y` rather than `translateY` on top of the entry's `x`: GSAP writes
      // both into the same transform, so the two never fight.
      targets.forEach(({ item, node }, index) => {
        gsap.to(node, {
          y: -item.float.distance,
          duration: item.float.duration,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: delay + duration + index * stagger,
        });
      });
    },
    { scope: scopeRef },
  );
}
