/**
 * C# reserved keywords that cannot be used as identifiers without `@` prefix.
 * These are case-sensitive in C#.
 *
 * @see https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/
 */
export const csharpKeywords: ReadonlySet<string> = new Set([
  "abstract",
  "as",
  "base",
  "bool",
  "break",
  "byte",
  "case",
  "catch",
  "char",
  "checked",
  "class",
  "const",
  "continue",
  "decimal",
  "default",
  "delegate",
  "do",
  "double",
  "else",
  "enum",
  "event",
  "explicit",
  "extern",
  "false",
  "finally",
  "fixed",
  "float",
  "for",
  "foreach",
  "goto",
  "if",
  "implicit",
  "in",
  "int",
  "interface",
  "internal",
  "is",
  "lock",
  "long",
  "namespace",
  "new",
  "null",
  "object",
  "operator",
  "out",
  "override",
  "params",
  "private",
  "protected",
  "public",
  "readonly",
  "ref",
  "return",
  "sbyte",
  "sealed",
  "short",
  "sizeof",
  "stackalloc",
  "static",
  "string",
  "struct",
  "switch",
  "this",
  "throw",
  "true",
  "try",
  "typeof",
  "uint",
  "ulong",
  "unchecked",
  "unsafe",
  "ushort",
  "using",
  "virtual",
  "void",
  "volatile",
  "while",
]);

/**
 * C# contextual keywords that are reserved in certain contexts.
 * While not always reserved, treating them as keywords in generated code
 * avoids subtle context-dependent issues.
 *
 * @see https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/#contextual-keywords
 */
export const csharpContextualKeywords: ReadonlySet<string> = new Set([
  "add",
  "allows",
  "alias",
  "and",
  "ascending",
  "args",
  "async",
  "await",
  "by",
  "descending",
  "dynamic",
  "equals",
  "field",
  "file",
  "from",
  "get",
  "global",
  "group",
  "init",
  "into",
  "join",
  "let",
  "managed",
  "nameof",
  "nint",
  "not",
  "notnull",
  "nuint",
  "on",
  "or",
  "orderby",
  "partial",
  "record",
  "remove",
  "required",
  "scoped",
  "select",
  "set",
  "unmanaged",
  "value",
  "var",
  "when",
  "where",
  "with",
  "yield",
]);

/**
 * Returns true if the given name is a C# reserved keyword.
 * The check is case-sensitive, matching C# language semantics.
 *
 * Note: this only checks reserved keywords, not contextual keywords.
 * Contextual keywords are only reserved in specific language contexts
 * and are valid identifiers elsewhere (e.g., `value` is valid as a parameter name).
 * Use {@link isCSharpContextualKeyword} to check contextual keywords separately.
 */
export function isCSharpKeyword(name: string): boolean {
  return csharpKeywords.has(name);
}

/**
 * Returns true if the given name is a C# contextual keyword.
 * Contextual keywords are only reserved in specific language contexts
 * and are generally valid as identifiers.
 */
export function isCSharpContextualKeyword(name: string): boolean {
  return csharpContextualKeywords.has(name);
}
