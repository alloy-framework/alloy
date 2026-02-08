export interface FormatableSourceLocation {
  fileName?: string;
  lineNumber?: number;
  columnNumber?: number;
}

/**
 * Format a source location into a displayable string like "path/file.ts:10:5".
 * Uses the provided formatPath function to normalize the file path.
 */
export function formatSourceLocation(
  location: FormatableSourceLocation | undefined,
  formatPath: (path: string) => string,
): string {
  if (!location?.fileName) return "";
  const normalizedFileName = location.fileName.replace(/^file:\/\//, "");
  const path = formatPath(normalizedFileName);
  const line = location.lineNumber ?? "?";
  const column = location.columnNumber ?? "?";
  return `${path}:${line}:${column}`;
}
