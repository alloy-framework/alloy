/**
 * TypeSpec keywords that must be backtick-escaped when used as identifiers.
 *
 * This includes both active keywords and reserved keywords from the TypeSpec
 * compiler scanner.
 *
 * @see https://typespec.io/docs/language-basics/identifiers
 * @see https://github.com/microsoft/typespec/blob/main/packages/compiler/src/core/scanner.ts
 */
export const typespecKeywords: ReadonlySet<string> = new Set([
  // Statement keywords
  "import",
  "model",
  "scalar",
  "namespace",
  "using",
  "op",
  "enum",
  "alias",
  "is",
  "interface",
  "union",
  "projection",
  "else",
  "if",
  "dec",
  "const",
  "init",

  // Modifier keywords
  "extern",
  "internal",

  // Other keywords
  "extends",
  "fn",
  "true",
  "false",
  "return",
  "void",
  "never",
  "unknown",
  "valueof",
  "typeof",

  // Reserved keywords (reserved for future use)
  "statemachine",
  "macro",
  "package",
  "metadata",
  "env",
  "arg",
  "declare",
  "array",
  "struct",
  "record",
  "module",
  "mod",
  "sym",
  "context",
  "prop",
  "property",
  "scenario",
  "pub",
  "sub",
  "typeref",
  "trait",
  "this",
  "self",
  "super",
  "keyof",
  "with",
  "implements",
  "impl",
  "satisfies",
  "flag",
  "auto",
  "partial",
  "private",
  "public",
  "protected",
  "sealed",
  "local",
  "async",
]);

/**
 * Tests whether a name is a TypeSpec keyword that requires escaping.
 */
export function isTypeSpecKeyword(name: string): boolean {
  return typespecKeywords.has(name);
}
