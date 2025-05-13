import {
  Children,
  NamePolicy,
  Output,
  OutputDirectory,
  OutputFile,
  render,
} from "@alloy-js/core";
import { dedent } from "@alloy-js/core/testing";
import { expect } from "vitest";
import * as py from "../src/components/index.js";

export function findFile(res: OutputDirectory, path: string): OutputFile {
  const result = findFileWorker(res, path);

  if (!result) {
    throw new Error("Expected to find file " + path);
  }
  return result;

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

export function toSourceText(c: Children, policy?: NamePolicy<string>): string {
  const res = render(
    <Output namePolicy={policy}>
      <py.SourceFile path="test.py">{c}</py.SourceFile>
    </Output>,
  );
  const file = findFile(res, "test.py");
  return file.contents;
}
