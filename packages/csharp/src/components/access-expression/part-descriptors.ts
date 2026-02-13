/**
 * Normalize attribute name by removing the "Attribute" suffix if present.
 * @example
 * ```ts
 * normalizeAttributeName("TestAttribute") // returns "Test"
 * ```
 */
export function normalizeAttributeName(name: string) {
  if (name !== undefined && name.endsWith("Attribute")) {
    return name.substring(0, name.length - "Attribute".length);
  }
  return name;
}
