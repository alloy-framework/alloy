import { createNamePolicy, NamePolicy, useNamePolicy } from "@alloy-js/core";
import {
  needsEscapingInDeclaration,
  needsEscapingInMember,
} from "./keywords.js";

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
 * Element types that are in "member" positions where reserved keywords
 * don't need escaping (matching TypeSpec formatter's "allow-reserved" context).
 *
 * These correspond to the node types in the TypeSpec printer that call
 * `printIdentifier(id, "allow-reserved")`:
 * - model properties (`printModelProperty`)
 * - enum members (`printEnumMember`)
 * - union variants (`printUnionVariant`)
 * - decorator names (`printDecorator`, `printAugmentDecorator`)
 *
 * @see https://github.com/microsoft/typespec/blob/main/packages/compiler/src/formatter/print/printer.ts
 */
const memberElements: ReadonlySet<TypeSpecElements> = new Set([
  "model-property",
  "enum",
  "enum-member",
  "union",
  "decorator",
]);

function hasInvalidChars(name: string): boolean {
  return invalidStartRegex.test(name) || invalidIdentifierRegex.test(name);
}

export function createTypeSpecNamePolicy(): NamePolicy<TypeSpecElements> {
  return createNamePolicy<TypeSpecElements>((name, element) => {
    if (hasInvalidChars(name)) {
      return `\`${name}\``;
    }

    // Member positions only escape active keywords (not reserved/modifier)
    if (memberElements.has(element)) {
      if (needsEscapingInMember(name)) {
        return `\`${name}\``;
      }
    } else {
      // Declaration positions escape both active and reserved keywords
      if (needsEscapingInDeclaration(name)) {
        return `\`${name}\``;
      }
    }

    return name;
  });
}

export function useTypeSpecNamePolicy(): NamePolicy<TypeSpecElements> {
  return useNamePolicy();
}
