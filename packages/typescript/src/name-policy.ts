import { createNamePolicy, NamePolicy, useNamePolicy } from "@alloy-js/core";
import { camelCase, pascalCase } from "change-case";

export type TypeScriptElements =
  | "function"
  | "parameter"
  | "class"
  | "variable"
  | "enum"
  | "object-member-data"
  | "object-member-getter"
  | "class-member-data"
  | "class-member-getter"
  | "enum-member"
  | "interface"
  | "interface-member"
  | "type";

// Reserved words
const GLOBAL_RESERVED_WORDS = new Set([
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "else",
  "enum",
  "export",
  "extends",
  "false",
  "finally",
  "for",
  "function",
  "if",
  "import",
  "in",
  "instanceof",
  "new",
  "null",
  "return",
  "super",
  "switch",
  "this",
  "throw",
  "true",
  "try",
  "typeof",
  "var",
  "void",
  "while",
  "with",
  "as",
  "implements",
  "interface",
  "let",
  "package",
  "private",
  "protected",
  "public",
  "static",
  "yield",
  "await",
]);

const CONTEXT_SAFE_WORDS = new Set([
  "delete",
  "default",
  "super",
  "this",
  "typeof",
  "instanceof",
]);

/**
 * Ensures a valid TypeScript identifier for the given element kind.
 * @param name - The name to validate.
 * @param element - The TypeScript element kind.
 * @returns A TypeScript-safe name.
 */
function ensureNonReservedName(
  name: string,
  element: TypeScriptElements,
): string {
  const suffix = "_";

  // Global reserved words always need handling
  if (GLOBAL_RESERVED_WORDS.has(name)) {
    return `${name}${suffix}`;
  }

  // Context-safe reserved words for properties
  if (
    CONTEXT_SAFE_WORDS.has(name) &&
    (element.includes("member") || element.includes("object-member"))
  ) {
    return name; // Safe as properties
  }

  return name;
}

export function createTSNamePolicy(): NamePolicy<TypeScriptElements> {
  const caseOptions = {
    prefixCharacters: "$_",
    suffixCharacters: "$_",
  };

  return createNamePolicy((name, element) => {
    let transformedName: string;

    switch (element) {
      case "class":
      case "type":
      case "interface":
      case "enum":
      case "enum-member":
        transformedName = pascalCase(name, caseOptions);
        break;

      default:
        transformedName = camelCase(name, caseOptions);
        break;
    }

    return ensureNonReservedName(transformedName, element);
  });
}

export function useTSNamePolicy(): NamePolicy<TypeScriptElements> {
  return useNamePolicy();
}
