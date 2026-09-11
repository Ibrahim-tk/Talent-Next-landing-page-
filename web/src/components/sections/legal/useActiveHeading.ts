import { useEffect, useState } from "react";

/**
 * Track which of a set of headings the reader is currently on, for
 * highlighting an entry in the navigation beside the document.
 *
 * Shared by both rails so the left nav and the right one can never disagree
 * about where you are.
 *
 * The `rootMargin` narrows the observer's root to a band across the upper
 * part of the viewport rather than the whole of it. With the full viewport,
 * every heading on screen counts as visible and a long section stops being
 * the match the moment the next heading appears at the bottom edge; the band
 * keeps the highlight on the section the eye is actually reading. Matches are
 * held in a set and resolved in document order, so scrolling back up
 * re-selects the earlier heading rather than whichever entry fired last.
 *
 * Returns `null` until something matches — every consumer renders plain
 * anchors that work regardless, so an unsupported or never-firing observer
 * costs the highlight and nothing else.
 */
export function useActiveHeading(ids: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  /* The id list is rebuilt on each render by callers that derive it from
     content, so the effect keys off its contents rather than its identity. */
  const key = ids.join("|");

  useEffect(() => {
    const headingIds = key ? key.split("|") : [];
    const nodes = headingIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);

    if (nodes.length === 0 || typeof IntersectionObserver === "undefined") {
      return;
    }

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (records) => {
        for (const record of records) {
          if (record.isIntersecting) visible.add(record.target.id);
          else visible.delete(record.target.id);
        }
        const current = headingIds.find((id) => visible.has(id));
        if (current) setActiveId(current);
      },
      { rootMargin: "-12% 0px -72% 0px" },
    );

    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, [key]);

  return activeId;
}
