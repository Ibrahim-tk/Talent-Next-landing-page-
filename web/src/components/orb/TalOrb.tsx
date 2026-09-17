"use client";

import { useEffect, useRef, type CSSProperties, type HTMLAttributes } from "react";
import "./tal-orb.css";

declare global {
  interface Window {
    BorbOrb?: {
      mount: (el: HTMLElement) => { el: HTMLElement; refresh: () => void; destroy: () => void } | null;
      mountAll: (scope?: HTMLElement | Document) => number;
      destroyAll: () => void;
    };
  }
}

export type TalOrbState =
  | "idle"
  | "listening"
  | "thinking"
  | "thinking2"
  | "thinking3"
  | "speaking"
  | "loading"
  | "error";

export const TAL_ORB_STATES: readonly TalOrbState[] = [
  "idle",
  "listening",
  "thinking",
  "thinking2",
  "thinking3",
  "speaking",
  "loading",
  "error",
] as const;

export interface TalOrbProps extends HTMLAttributes<HTMLSpanElement> {
  state?: TalOrbState;
  size?: number | string;
  className?: string;
  style?: CSSProperties;
}

export function TalOrb({
  state = "idle",
  size = 288,
  className = "",
  style,
  ...rest
}: TalOrbProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const instanceRef = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    // Dynamically import the classic script ensuring browser execution
    // @ts-expect-error - classic script without typescript declaration
    import("./tal-orb.js").then(() => {
      const el = ref.current;
      if (!el || !window.BorbOrb) return;
      instanceRef.current = window.BorbOrb.mount(el);
    });

    return () => {
      if (instanceRef.current) {
        instanceRef.current.destroy();
        instanceRef.current = null;
      }
    };
  }, []);

  return (
    <span
      ref={ref}
      className={`borb ${className}`.trim()}
      data-state={state}
      aria-hidden="true"
      style={{
        "--borb-size": typeof size === "number" ? `${size}px` : size,
        ...style,
      } as CSSProperties}
      {...rest}
    >
      <span className="borb__ripple" />
      <span className="borb__ripple borb__ripple--2" />
      <span className="borb__field">
        <span className="borb__cloud borb__cloud--1" />
        <span className="borb__cloud borb__cloud--2" />
        <span className="borb__cloud borb__cloud--3" />
        <span className="borb__cloud borb__cloud--4" />
      </span>
      <span className="borb__mark">
        <span className="borb__blade borb__blade--a" />
        <span className="borb__blade borb__blade--b" />
        <span className="borb__blade borb__blade--c" />
        <svg className="borb__waves" viewBox="0 0 100 100" aria-hidden="true">
          <path d="" />
          <path d="" />
          <path d="" />
        </svg>
      </span>
    </span>
  );
}

export default TalOrb;
