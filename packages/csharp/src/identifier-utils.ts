/**
 * Checks whether the provided name is a valid C# identifier (without `@` prefix).
 * Does not account for keyword conflicts — use {@link isCSharpKeyword} for that.
 *
 * @param name - The name to validate.
 * @returns true if the name matches C# identifier rules (letter or underscore start, word chars after).
 */
export function isValidCSharpIdentifier(name: string): boolean {
  return /^[A-Za-z_]\w*$/.test(name);
}

/**
 * Checks whether each segment of a dotted namespace name is a valid C# identifier.
 *
 * @param name - The dotted namespace name (e.g., "My.Service.Models").
 * @returns true if every segment is a valid identifier.
 */
export function isValidCSharpNamespace(name: string): boolean {
  if (name.length === 0) return false;
  return name.split(".").every((segment) => isValidCSharpIdentifier(segment));
}

/**
 * Transforms an arbitrary string into a valid C# identifier by replacing
 * invalid characters. The result may still be a C# keyword — callers
 * should combine with keyword escaping if needed.
 *
 * - If the first character is not a letter or underscore, a `_` prefix is added.
 * - Subsequent non-word characters are replaced with `_`.
 * - Empty strings become `_`.
 *
 * @param name - The string to sanitize.
 * @returns A string that satisfies C# identifier character rules.
 */
export function sanitizeCSharpIdentifier(name: string): string {
  if (name.length === 0) return "_";

  const chars: string[] = [];
  for (let i = 0; i < name.length; i++) {
    const ch = name[i];
    if (i === 0) {
      if (/[A-Za-z_]/.test(ch)) {
        chars.push(ch);
      } else {
        chars.push("_");
        // Keep the original char if it's a word char (e.g., digit)
        if (/\w/.test(ch)) {
          chars.push(ch);
        }
      }
    } else {
      chars.push(/\w/.test(ch) ? ch : "_");
    }
  }
  return chars.join("");
}
