import {
  Children,
  ContentOutputFile,
  Output,
  OutputDirectory,
  OutputFile,
  PrintTreeOptions,
  SourceFile,
  render,
} from "@alloy-js/core";
import { dedent } from "@alloy-js/core/testing";
import { expect } from "vitest";

/**
 * Renders a single Rust source file for testing.
 *
 * Wraps component tree in a minimal Output + SourceFile context, renders to string.
 * Useful for single-file unit tests of declarations, expressions, and syntax.
 *
 * @param c - Component tree to render (typically code` ... ` or JSX components)
 * @param options - Prettier print options (optional). Defaults: insertFinalNewLine=false
 * @returns Formatted source code as string
 *
 * @example
 * ```tsx
 * const code = toSourceText(
 *   code`fn main() { println!("hello"); }`
 * );
 * expect(code).toContain("fn main");
 * ```
 */
export function toSourceText(
  c: Children,
  options?: PrintTreeOptions,
): string {
  const res = render(
    <Output>
      <SourceFile path="test.rs" filetype="rust">
        {c}
      </SourceFile>
    </Output>,
    { insertFinalNewLine: false, ...options },
  );

  return findFile(res, "test.rs").contents;
}

/**
 * Renders multiple Rust source files and returns the output directory.
 *
 * Useful for testing cross-file references, module structures, imports,
 * and other multi-file scenarios. Each child should typically be a SourceFile component.
 *
 * @param children - Array of component trees (typically SourceFile components)
 * @returns Output directory structure containing all rendered files
 *
 * @example
 * ```tsx
 * const output = toSourceTextMultiple([
 *   <SourceFile path="lib.rs">{code`pub fn hello() {}`}</SourceFile>,
 *   <SourceFile path="module.rs">{code`pub fn world() {}`}</SourceFile>,
 * ]);
 * const libContents = findFile(output, "lib.rs").contents;
 * expect(libContents).toContain("pub fn hello");
 * ```
 */
export function toSourceTextMultiple(children: Children[]): OutputDirectory {
  return render(
    <Output>
      {children}
    </Output>,
  );
}

/**
 * Recursively finds a file in the output directory tree by path.
 *
 * Traverses the directory structure returned by render() and returns the matching file.
 *
 * @param res - Output directory to search
 * @param path - File path to find (e.g., "src/main.rs", "test.rs")
 * @returns The ContentOutputFile if found
 * @throws Error if file is not found, with helpful list of available files
 *
 * @example
 * ```tsx
 * const output = toSourceTextMultiple([...]);
 * const file = findFile(output, "src/lib.rs");
 * expect(file.contents).toMatch(/^pub fn/);
 * ```
 */
export function findFile(
  res: OutputDirectory,
  path: string,
): ContentOutputFile {
  const result = findFileWorker(res, path);

  if (!result) {
    const available = collectPaths(res);
    const hint =
      available.length > 0
        ? `Available files: ${available.join(", ")}`
        : "No files found in output";
    throw new Error(
      `Expected to find file "${path}" in output. ${hint}`,
    );
  }
  return result as ContentOutputFile;

  function findFileWorker(
    dir: OutputDirectory,
    targetPath: string,
  ): OutputFile | null {
    for (const item of dir.contents) {
      if (item.kind === "file") {
        if (item.path === targetPath) {
          return item;
        }
      } else if (item.kind === "directory") {
        const found = findFileWorker(item, targetPath);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }

  function collectPaths(dir: OutputDirectory): string[] {
    const paths: string[] = [];
    for (const item of dir.contents) {
      if (item.kind === "file") {
        paths.push(item.path);
      } else if (item.kind === "directory") {
        paths.push(...collectPaths(item));
      }
    }
    return paths;
  }
}

/**
 * Validates multiple files' contents against expected values using exact match.
 *
 * Batch assertion helper for multi-file tests. Each expected content string
 * is dedented and compared exactly (using `toBe`).
 *
 * @param res - Output directory structure (from toSourceTextMultiple or render)
 * @param expectedFiles - Record mapping file paths to expected contents (dedented)
 * @throws vitest assertion error if any file content doesn't match
 *
 * @example
 * ```tsx
 * const output = toSourceTextMultiple([
 *   <SourceFile path="lib.rs">{code`pub fn hello() {}`}</SourceFile>,
 *   <SourceFile path="module.rs">{code`pub struct Thing;`}</SourceFile>,
 * ]);
 * assertFileContents(output, {
 *   "lib.rs": code`pub fn hello() {}`,
 *   "module.rs": code`pub struct Thing;`,
 * });
 * ```
 */
export function assertFileContents(
  res: OutputDirectory,
  expectedFiles: Record<string, string>,
): void {
  for (const [path, expectedContent] of Object.entries(expectedFiles)) {
    const file = findFile(res, path);
    expect(file.contents).toBe(dedent(expectedContent));
  }
}
