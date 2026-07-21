/**
 * Active TypeSpec keywords that always require backtick-escaping when used
 * as identifiers in any position.
 *
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
]);

/**
 * Reserved keywords that only need escaping in declaration positions (not in
 * member positions like model properties, enum members, union variants).
 *
 * @see https://github.com/microsoft/typespec/blob/main/packages/compiler/src/core/helpers/syntax-utils.ts
 */
export const typespecReservedKeywords: ReadonlySet<string> = new Set([
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
 * Modifier keywords that are contextual and don't need escaping in any
 * position (they are only keywords in modifier context).
 *
 * @see https://github.com/microsoft/typespec/blob/main/packages/compiler/src/core/helpers/syntax-utils.ts
 */
export const typespecModifierKeywords: ReadonlySet<string> = new Set([
  "extern",
  "internal",
]);

/**
 * Tests whether a name is an active TypeSpec keyword (always needs escaping).
 */
export function isTypeSpecKeyword(name: string): boolean {
  return typespecKeywords.has(name);
}

/**
 * Tests whether a name needs escaping in a declaration position.
 * In declaration positions, both active and reserved keywords need escaping.
 */
export function needsEscapingInDeclaration(name: string): boolean {
  return typespecKeywords.has(name) || typespecReservedKeywords.has(name);
}

/**
 * Tests whether a name needs escaping in a member position (model property,
 * enum member, union variant, decorator name).
 * In member positions, only active keywords need escaping — reserved and
 * modifier keywords are valid identifiers.
 */
export function needsEscapingInMember(name: string): boolean {
  return typespecKeywords.has(name);
}
