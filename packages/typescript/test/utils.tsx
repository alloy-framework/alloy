import {
  Children,
  ContentOutputFile,
  Output,
  OutputDirectory,
  OutputFile,
  PrintTreeOptions,
  render,
} from "@alloy-js/core";
import { dedent } from "@alloy-js/core/testing";
import { expect } from "vitest";
import * as ts from "../src/index.js";

export function TestFile(props: { children?: Children }) {
  return (
    <Output>
      <ts.SourceFile path="test.ts">{props.children}</ts.SourceFile>
    </Output>
  );
}

export function toSourceText(c: Children, options?: PrintTreeOptions): string {
  const res = render(
    <Output>
      <ts.SourceFile path="test.ts">{c}</ts.SourceFile>
    </Output>,
    options,
  );

  return findFile(res, "test.ts").contents;
}

export function findFile(
  res: OutputDirectory,
  path: string,
): ContentOutputFile {
  const result = findFileWorker(res, path);

  if (!result) {
    throw new Error("Expected to find file " + path);
  }
  return result as ContentOutputFile;

  function findFileWorker(
    res: OutputDirectory,
    path: string,
  ): OutputFile | null {
    for (const item of res.contents) {
      if (item.kind === "file") {
        if (item.path === path) {
          return item;
        }
        continue;
      } else {
        const found = findFileWorker(item, path);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }
}

export function assertFileContents(
  res: OutputDirectory,
  expectedFiles: Record<string, string>,
) {
  for (const [path, contents] of Object.entries(expectedFiles)) {
    const file = findFile(res, path);
    expect(file.contents).toBe(dedent(contents));
  }
}
