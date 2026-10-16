import type { NamePolicy, NamePolicyGetter } from "@alloy-js/core";
import { createNamePolicy, useNamePolicy } from "@alloy-js/core";

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
 * Common Go initialisms that are cased as a unit when a name starts with
 * one, so flipping exportedness keeps them intact: `OSDisk` becomes
 * `osDisk` (not `oSDisk`), and `urlParser` becomes `URLParser`.
 * Modeled after the initialisms list used by Go linters.
 */
const GO_INITIALISMS = new Set([
  "ACL",
  "API",
  "ASCII",
  "CPU",
  "CSS",
  "DNS",
  "EOF",
  "GUID",
  "HTML",
  "HTTP",
  "HTTPS",
  "ID",
  "IP",
  "JSON",
  "OS",
  "RAM",
  "RPC",
  "SMTP",
  "SQL",
  "SSH",
  "TCP",
  "TLS",
  "TTL",
  "UDP",
  "UI",
  "UID",
  "URI",
  "URL",
  "UTF8",
  "UUID",
  "VM",
  "XML",
]);

// Longest first, so e.g. `HTTPSServer` matches `HTTPS`, not `HTTP`.
const GO_INITIALISMS_BY_LENGTH = [...GO_INITIALISMS].sort(
  (a, b) => b.length - a.length,
);

function isUpperCaseLetter(char: string): boolean {
  return char >= "A" && char <= "Z";
}

/**
 * Returns the initialism the name starts with, if any. A match only
 * counts when the initialism ends the name or is followed by an
 * uppercase letter, so words like `Oslo` or `ident` are left alone.
 */
function findLeadingInitialism(name: string): string | undefined {
  for (const initialism of GO_INITIALISMS_BY_LENGTH) {
    if (name.length < initialism.length) {
      continue;
    }
    if (
      name.slice(0, initialism.length).toLowerCase() !==
      initialism.toLowerCase()
    ) {
      continue;
    }
    const rest = name.slice(initialism.length);
    if (rest.length === 0 || isUpperCaseLetter(rest.charAt(0))) {
      return initialism;
    }
  }
  return undefined;
}

/**
 * Applies public/private naming convention for Go symbols.
 * Public symbols use PascalCase, private symbols use camelCase.
 * Leading initialisms (`ID`, `URL`, `OS`, ...) are cased as a unit.
 * @param name - The original name
 * @param isPublic - Whether the symbol should be public (exported)
 * @returns The properly formatted name
 */
function applyPublicPrivateNaming(name: string, isPublic: boolean): string {
  const initialism = findLeadingInitialism(name);
  if (initialism !== undefined) {
    const rest = name.slice(initialism.length);
    return isPublic
      ? initialism.toUpperCase() + rest
      : initialism.toLowerCase() + rest;
  }
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
function ensureNonReservedName(
  name: string,
  _element: GoElements,
  isPublic?: boolean,
): string {
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
