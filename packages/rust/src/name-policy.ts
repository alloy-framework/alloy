import { createNamePolicy, NamePolicy, useNamePolicy } from "@alloy-js/core";
import { constantCase, pascalCase, snakeCase } from "change-case";

export type RustElements =
  | "function"
  | "method"
  | "struct"
  | "enum"
  | "enum-variant"
  | "trait"
  | "type-alias"
  | "type-parameter"
  | "field"
  | "variable"
  | "parameter"
  | "constant"
  | "module";

const RESERVED_WORDS = new Set([
  "as",
  "async",
  "await",
  "break",
  "const",
  "continue",
  "crate",
  "dyn",
  "else",
  "enum",
  "extern",
  "false",
  "fn",
  "for",
  "if",
  "impl",
  "in",
  "let",
  "loop",
  "match",
  "mod",
  "move",
  "mut",
  "pub",
  "ref",
  "return",
  "self",
  "Self",
  "static",
  "struct",
  "super",
  "trait",
  "true",
  "type",
  "unsafe",
  "use",
  "where",
  "while",
  "yield",
]);

function ensureNonReservedName(name: string): string {
  if (RESERVED_WORDS.has(name)) {
    return `r#${name}`;
  }

  return name;
}

export function createRustNamePolicy(): NamePolicy<RustElements> {
  return createNamePolicy((name, element) => {
    let transformedName: string;

    switch (element) {
      case "struct":
      case "enum":
      case "enum-variant":
      case "trait":
      case "type-alias":
      case "type-parameter":
        transformedName = pascalCase(name);
        break;
      case "constant":
        transformedName = constantCase(name);
        break;
      default:
        transformedName = snakeCase(name);
        break;
    }

    return ensureNonReservedName(transformedName);
  });
}

export function useRustNamePolicy(): NamePolicy<RustElements> {
  return useNamePolicy();
}
