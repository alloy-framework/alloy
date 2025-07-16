import { createNamePolicy, NamePolicy, useNamePolicy } from "@alloy-js/core";
import { constantCase, pascalCase, snakeCase } from "change-case";

export type PythonElements =
  | "class" // Classes
  | "class-member" // Class members (attributes, methods)
  | "function" // Functions
  | "variable" // Variables
  | "object-member" // Object members (attributes, methods)
  | "constant"
  | "parameter"
  | "method"
  | "module"
  | "enum" // Enums
  | "enum-member"; // Enum members

// Reserved words
const GLOBAL_RESERVED_WORDS = new Set([
  "False",
  "None",
  "True",
  "and",
  "as",
  "assert",
  "async",
  "await",
  "break",
  "class",
  "continue",
  "def",
  "del",
  "elif",
  "else",
  "except",
  "finally",
  "for",
  "from",
  "global",
  "if",
  "import",
  "in",
  "is",
  "lambda",
  "nonlocal",
  "not",
  "or",
  "pass",
  "raise",
  "return",
  "try",
  "while",
  "with",
  "and",
  "yield",
]);

/**
 * Ensures a valid Python identifier for the given element kind.
 * @param name - The name to validate.
 * @param element - The Python element kind.
 * @returns A Python-safe name.
 */
function ensureNonReservedName(name: string): string {
  const suffix = "_";

  // Global reserved words always need handling
  if (GLOBAL_RESERVED_WORDS.has(name)) {
    return `${name}${suffix}`;
  }

  return name;
}

export function createPythonNamePolicy(): NamePolicy<PythonElements> {
  const caseOptions = {
    prefixCharacters: "$_",
    suffixCharacters: "$_",
  };

  return createNamePolicy((name, element) => {
    let transformedName: string;

    switch (element) {
      case "class":
      case "enum":
        transformedName = pascalCase(name);
        break;
      case "constant":
      case "enum-member":
        transformedName = constantCase(name);
        break;
      case "module":
        transformedName = snakeCase(name).toLowerCase();
        break;
      default:
        transformedName = snakeCase(name);
        break;
    }

    return ensureNonReservedName(transformedName);
  });
}

export function usePythonNamePolicy(): NamePolicy<PythonElements> {
  return useNamePolicy();
}
