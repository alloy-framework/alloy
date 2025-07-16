import {
  Binder,
  Children,
  NamePolicy,
  Output,
  OutputDirectory,
  OutputFile,
  PrintTreeOptions,
  SymbolCreator,
  render,
} from "@alloy-js/core";
import { dedent } from "@alloy-js/core/testing";
import { expect } from "vitest";
import * as py from "../src/components/index.js";
import { createPythonNamePolicy } from "../src/name-policy.js";
import { CustomOutputScope } from "../src/symbols/custom-output-scope.js";
import { PythonModuleScope } from "../src/symbols/index.js";

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

export function toSourceText(
  c: Children,
  {
    policy,
    externals,
    options,
    printOptions,
  }: {
    policy?: NamePolicy<string>;
    externals?: SymbolCreator[];
    options?: { externals?: SymbolCreator[] };
    printOptions?: PrintTreeOptions;
  } = {},
): string {
  if (!policy) {
    policy = createPythonNamePolicy();
  }
  const mergedExternals = options?.externals ?? externals;
  const res = render(
    <Output externals={mergedExternals} namePolicy={policy}>
      <py.SourceFile path="test.py">{c}</py.SourceFile>
    </Output>,
    printOptions,
  );
  const file = findFile(res, "test.py");
  return file.contents;
}

// Helper function to create a PythonModuleScope to be used in tests
export function createPythonModuleScope(
  name: string,
  parent: CustomOutputScope | undefined,
  binder: Binder | undefined = undefined,
): PythonModuleScope {
  return new PythonModuleScope(name, {
    parent: parent,
    binder: binder,
  });
}
