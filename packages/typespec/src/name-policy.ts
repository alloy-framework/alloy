import { createNamePolicy, NamePolicy, useNamePolicy } from "@alloy-js/core";
import { isTypeSpecKeyword } from "./keywords.js";

export type TypeSpecElements =
  | "alias"
  | "scalar"
  | "decorator"
  | "enum"
  | "enum-member"
  | "interface"
  | "model-property"
  | "model"
  | "namespace"
  | "operation"
  | "template"
  | "const"
  | "union";

/**
 * Regex matching characters that are invalid in a TypeSpec identifier.
 * Valid identifiers start with a letter, `_`, or `$` and continue with
 * letters, digits, `_`, or `$`.
 *
 * @see https://typespec.io/docs/language-basics/identifiers
 */
const invalidIdentifierRegex = /[^a-zA-Z0-9_$]/;
const invalidStartRegex = /^[^a-zA-Z_$]/;

/**
 * Returns whether a name needs backtick escaping — either because it is a
 * keyword or because it contains characters not allowed in a bare identifier.
 */
function needsEscaping(name: string): boolean {
  return (
    isTypeSpecKeyword(name) ||
    invalidStartRegex.test(name) ||
    invalidIdentifierRegex.test(name)
  );
}

export function createTypeSpecNamePolicy(): NamePolicy<TypeSpecElements> {
  return createNamePolicy<TypeSpecElements>((name) => {
    if (needsEscaping(name)) {
      return `\`${name}\``;
    }
    return name;
  });
}

export function useTypeSpecNamePolicy(): NamePolicy<TypeSpecElements> {
  return useNamePolicy();
}
