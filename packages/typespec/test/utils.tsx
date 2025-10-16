import {
  Children,
  ContentOutputFile,
  Output,
  OutputDirectory,
  OutputFile,
  PrintTreeOptions,
  render,
  SourceFile,
} from "@alloy-js/core";

import { createTypeSpecNamePolicy } from "../src/name-policy.js";

export function toSourceText(c: Children, options?: PrintTreeOptions): string {
  const res = render(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile filetype="typespec" path="test.tsp">
        {c}
      </SourceFile>
    </Output>,
    { insertFinalNewLine: false, ...options },
  );

  return findFile(res, "test.tsp").contents;
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