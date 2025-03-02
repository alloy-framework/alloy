import {
  Children,
  Output,
  OutputDirectory,
  OutputFile,
  PrintTreeOptions,
  render,
} from "@alloy-js/core";
import { dedent } from "@alloy-js/core/testing";
import { expect } from "vitest";
import * as jv from "../src/index.js";

export function toSourceText(c: Children, options?: PrintTreeOptions): string {
  const res = render(
    <Output>
      <jv.PackageDirectory package="me.test.code">
        <jv.SourceFile path="Test.java">{c}</jv.SourceFile>
      </jv.PackageDirectory>
    </Output>,
    options,
  );

  const file = findFile(res, "Test.java");
  return file.contents;
}

export function testRender(
  c: Children,
  options?: PrintTreeOptions,
): OutputDirectory {
  return render(
    <Output>
      <jv.PackageDirectory package="me.test.code">{c}</jv.PackageDirectory>
    </Output>,
    options,
  );
}

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
        if (item.path.includes(path)) {
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
