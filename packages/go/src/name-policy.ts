import { createNamePolicy, NamePolicy, NamePolicyGetter, useNamePolicy } from "@alloy-js/core";

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
 * Applies public/private naming convention for Go symbols.
 * Public symbols use PascalCase, private symbols use camelCase.
 * @param name - The original name
 * @param isPublic - Whether the symbol should be public (exported)
 * @returns The properly formatted name
 */
function applyPublicPrivateNaming(name: string, isPublic: boolean): string {
  if (isPublic) {
    // Public symbols should be PascalCase
    return name.charAt(0).toUpperCase() + name.slice(1);
  } else {
    // Private symbols should be camelCase
    return name.charAt(0).toLowerCase() + name.slice(1);
  }
}

/**
 * Ensures a valid Go identifier for the given element kind.
 * @param name - The name to validate.
 * @param element - The Go element kind.
 * @param isPublic - Whether the symbol should be public (exported).
 * @returns A Go-safe name.
 */
function ensureNonReservedName(name: string, _element: GoElements, isPublic?: boolean): string {
  const suffix = "_";

  // Apply public/private naming convention if public flag is explicitly set
  if (isPublic !== undefined) {
    name = applyPublicPrivateNaming(name, isPublic);
  }

  // Global reserved words always need handling
  if (GLOBAL_RESERVED_WORDS.has(name)) {
    return `${name}${suffix}`;
  }

  return name;
}

/**
 * Creates a name policy getter that captures public flag
 * @param element - The Go element kind
 * @param isPublic - Whether the symbol should be public (exported)
 * @returns A NamePolicyGetter with public flag captured
 */
export function createGoNamePolicyGetterWithPublic(
  element: GoElements,
  isPublic?: boolean,
): NamePolicyGetter {
  return (name: string) => ensureNonReservedName(name, element, isPublic);
}

export function createGoNamePolicy(): NamePolicy<GoElements> {
  return createNamePolicy((name, element) => {
    return ensureNonReservedName(name, element);
  });
}

export function useGoNamePolicy(): NamePolicy<GoElements> {
  return useNamePolicy();
}
