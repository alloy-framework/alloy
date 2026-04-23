import * as core from "@alloy-js/core";
import * as changecase from "change-case";
import { sanitizeCSharpIdentifier } from "./identifier-utils.js";
import { isCSharpKeyword } from "./keywords.js";

// the context in which the name policy should be applied
export type CSharpElements =
  | "class"
  | "constant"
  | "variable"
  | "struct"
  | "enum"
  | "enum-member"
  | "function"
  | "interface"
  | "record"
  | "class-member-private"
  | "class-member-public"
  | "class-method"
  | "class-property"
  | "parameter"
  | "type-parameter"
  | "namespace";

/**
 * Prefixes the name with `@` if it is a C# keyword.
 * This is the idiomatic C# way to use reserved words as identifiers.
 * The check is case-sensitive, matching C# language semantics.
 */
function escapeIfKeyword(name: string): string {
  return isCSharpKeyword(name) ? `@${name}` : name;
}

/**
 * Creates the C# naming policy with case conversion and keyword escaping.
 *
 * After applying the appropriate case conversion for each element kind,
 * the resulting name is checked against C# reserved and contextual keywords.
 * If it matches (case-sensitively), the name is prefixed with `@`.
 *
 * For namespace elements, each dot-separated segment is individually
 * cased and keyword-escaped.
 */
export function createCSharpNamePolicy(): core.NamePolicy<CSharpElements> {
  return core.createNamePolicy((name, element) => {
    if (element === "namespace") {
      return name
        .split(".")
        .map((segment) =>
          escapeIfKeyword(sanitizeCSharpIdentifier(changecase.pascalCase(segment))),
        )
        .join(".");
    }

    let result: string;
    switch (element) {
      case "class":
      case "struct":
      case "enum":
      case "enum-member":
      case "interface":
      case "record":
      case "class-member-public":
      case "class-method":
      case "type-parameter":
      case "class-property":
        result = changecase.pascalCase(name);
        break;
      case "constant":
        result = changecase.constantCase(name);
        break;
      case "class-member-private":
        result = `_${changecase.camelCase(name)}`;
        break;
      default:
        result = changecase.camelCase(name);
        break;
    }

    return escapeIfKeyword(sanitizeCSharpIdentifier(result));
  });
}

// gets the active C# naming policy
export function useCSharpNamePolicy(): core.NamePolicy<CSharpElements> {
  return core.useNamePolicy();
}
