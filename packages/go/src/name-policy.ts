import { createNamePolicy, NamePolicy, useNamePolicy } from "@alloy-js/core";

export type GoElements =
  | "parameter"
  | "type-parameter"
  | "function"
  | "type"
  | "variable"
  | "struct-member"
  | "interface-member";

const GLOBAL_RESERVED_WORDS = new Set([
  "break",
  "case",
  "chan",
  "const",
  "continue",
  "default",
  "defer",
  "else",
  "fallthrough",
  "for",
  "func",
  "go",
  "goto",
  "if",
  "import",
  "interface",
  "map",
  "package",
  "range",
  "return",
  "select",
  "struct",
  "switch",
  "type",
  "var",
]);

/**
 * Ensures a valid Go identifier for the given element kind.
 * @param name - The name to validate.
 * @param element - The Go element kind.
 * @returns A Go-safe name.
 */
function ensureNonReservedName(name: string, _element: GoElements): string {
  const suffix = "_";

  // Global reserved words always need handling
  if (GLOBAL_RESERVED_WORDS.has(name)) {
    return `${name}${suffix}`;
  }

  return name;
}

export function createGoNamePolicy(): NamePolicy<GoElements> {
  return createNamePolicy((name, element) => {
    return ensureNonReservedName(name, element);
  });
}

export function useGoNamePolicy(): NamePolicy<GoElements> {
  return useNamePolicy();
}
