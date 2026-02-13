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
  source: FormatableSourceLocation | undefined,
  formatPath: (path: string) => string,
): string | null {
  if (!source?.fileName) return null;
  const normalizedFileName = source.fileName.replace(/^file:\/\//, "");
  const path = formatPath(normalizedFileName);
  const line = source.lineNumber ?? "?";
  if (source.columnNumber !== undefined) {
    return `${path}:${line}:${source.columnNumber}`;
  }
  return `${path}:${line}`;
}
