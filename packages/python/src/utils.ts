// Just keeping this function here for compatibility, can be removed later
export function modulePath(path: string) {
  return path;
}

const pythonIdentifierRegex =
  /^[_\p{XID_Start}][_\p{XID_Continue}0-9]*$/u;

// List of all Python reserved keywords (3.x)
const pythonKeywords = new Set([
  "False", "None", "True", "and", "as", "assert", "async", "await", "break",
  "class", "continue", "def", "del", "elif", "else", "except", "finally",
  "for", "from", "global", "if", "import", "in", "is", "lambda", "nonlocal",
  "not", "or", "pass", "raise", "return", "try", "while", "with", "yield"
]);

export function isValidPythonIdentifier(str: string): boolean {
  return (
    pythonIdentifierRegex.test(str) &&
    !pythonKeywords.has(str)
  );
}