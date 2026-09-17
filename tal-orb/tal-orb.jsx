/* ============================================================================
   TalOrb — React wrapper around the vanilla orb component.
   ----------------------------------------------------------------------------
   The orb's own logic lives in tal-orb.js as a classic script exposing
   window.BorbOrb. This wrapper does not reimplement it; it renders the same
   markup and hands the root element to BorbOrb.mount once.

   Import the stylesheet somewhere in your app:

       import './tal-orb.css';

   And load tal-orb.js — either as a <script> in index.html, or with a plain
   `import './tal-orb.js'` if your bundler handles side-effect scripts (it sets
   window.BorbOrb and auto-mounts anything already in the DOM).

   Usage:

       <TalOrb state="thinking" size={288} />
       <TalOrb state={isSpeaking ? 'speaking' : 'idle'} size={24} />

   STATE IS PER-SLOT. Only give a live state to the ONE orb the reader is
   actually talking to. An orb sitting in page chrome or used as an identity
   mark stays "idle" forever — a logo that animates whenever the product is
   busy is noise.
   ========================================================================== */

import { useEffect, useRef } from 'react';

export const TAL_ORB_STATES = [
  'idle',
  'listening',
  'thinking',
  'thinking2',
  'thinking3',
  'speaking',
  'loading',
  'error',
];

export default function TalOrb({
  state = 'idle',
  size = 288,
  className = '',
  style,
  ...rest
}) {
  const ref = useRef(null);
  const instance = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.BorbOrb) return undefined;
    instance.current = window.BorbOrb.mount(el);
    return () => {
      if (instance.current) {
        instance.current.destroy();
        instance.current = null;
      }
    };
  }, []);

  /* the vanilla component watches data-state with a MutationObserver, so React
     changing the attribute is all the handoff that is needed */
  return (
    <span
      ref={ref}
      className={`borb ${className}`.trim()}
      data-state={state}
      aria-hidden="true"
      style={{ '--borb-size': typeof size === 'number' ? `${size}px` : size, ...style }}
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
