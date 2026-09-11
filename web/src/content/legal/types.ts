/**
 * The block vocabulary a legal document is written in.
 *
 * Legal copy is long, mostly linear prose, and arrives from counsel as a Word
 * file — so it is modelled as data here rather than hand-written JSX. A
 * revised clause is a string edit in `privacy.ts` / `terms.ts`; nobody has to
 * touch a component to ship it.
 *
 * Inline emphasis and links are written in a deliberately tiny markup that
 * `LegalDocument` understands — `**bold**` and `[label](href)`. Nothing else
 * is supported, which keeps the content files readable and stops arbitrary
 * markup leaking into the page.
 */

/** A bullet that may carry its own nested sub-bullets. */
export type LegalListItem = string | { text: string; items: readonly string[] };

export type LegalBlock =
  /** A numbered top-level section — "1. Who We Are and How to Contact Us". */
  | { type: "section"; id: string; number?: string; heading: string }
  /** A numbered subsection — "2.1 Information You Give Us". */
  | { type: "subsection"; id: string; number?: string; heading: string }
  /** An unnumbered run-in heading inside a (sub)section. */
  | { type: "heading"; heading: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: readonly LegalListItem[]; ordered?: boolean }
  /** A boxed call-out — the all-caps notice at the head of the Terms.
      `label` names the box; it defaults to "Note". */
  | { type: "notice"; text: string; label?: string }
  /** A name/address/phone block, set tighter than running prose. */
  | { type: "contact"; heading?: string; lines: readonly string[] };

export interface LegalDoc {
  /** Route this document is served at, e.g. `/privacy`. */
  href: string;
  /** Page title — also the `<h1>`. */
  title: string;
  /** Mono kicker above the title. */
  kicker: string;
  /** Rendered under the title; the document's own "Last updated" line. */
  lastUpdated: string;
  /** Meta description for the route's `generateMetadata`. */
  description: string;
  blocks: readonly LegalBlock[];
}
