import * as core from "@alloy-js/core";
import * as coretest from "@alloy-js/core/testing";
import { expect } from "vitest";
import * as csharp from "../src/index.js";

export function TestNamespace(props: {
  children: core.Children;
}): core.Children {
  return (
    <core.Output namePolicy={csharp.createCSharpNamePolicy()}>
      <csharp.SourceFile path="Test.cs">{props.children}</csharp.SourceFile>
    </core.Output>
  );
}
export function toSourceText(c: core.Children): string {
  const res = core.render(
    <core.Output namePolicy={csharp.createCSharpNamePolicy()}>
      <csharp.Namespace name="TestCode">
        <csharp.SourceFile path="Test.cs">{c}</csharp.SourceFile>
      </csharp.Namespace>
    </core.Output>,
    { insertFinalNewLine: false },
  );

  const file = findFile(res, "Test.cs");
  return file.contents;
}

export function testRender(c: core.Children): core.OutputDirectory {
  return core.render(
    <core.Output>
      <csharp.Namespace name="TestCode">{c}</csharp.Namespace>
    </core.Output>,
  );
}

export function findFile(
  res: core.OutputDirectory,
  path: string,
): core.ContentOutputFile {
  const result = findFileWorker(res, path);

  if (!result) {
    throw new Error("Expected to find file " + path);
  }
  return result as core.ContentOutputFile;

  function findFileWorker(
    res: core.OutputDirectory,
    path: string,
  ): core.OutputFile | null {
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
  res: core.OutputDirectory,
  expectedFiles: Record<string, string>,
): void {
  for (const [path, contents] of Object.entries(expectedFiles)) {
    const file = findFile(res, path);
    expect(file.contents).toBe(coretest.dedent(contents));
  }
}
