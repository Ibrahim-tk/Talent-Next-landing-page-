/**
 * Minimal class-name joiner. Filters out `false`, `null`, `undefined` and
 * `""` so conditional CSS Module classes compose cleanly:
 *
 *   cx(styles.root, isActive && styles.active, className)
 */
export type ClassValue = string | false | null | undefined;

export function cx(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
