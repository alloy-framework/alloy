import {
  Binder,
  Children,
  ContentOutputFile,
  NamePolicy,
  Output,
  OutputDirectory,
  OutputFile,
  OutputScope,
  PrintTreeOptions,
  SymbolCreator,
  render,
} from "@alloy-js/core";
import { dedent } from "@alloy-js/core/testing";
import { expect } from "vitest";
import * as py from "../src/components/index.js";
import { pythonNameConflictResolver } from "../src/name-conflict-resolver.js";
import { createPythonNamePolicy } from "../src/name-policy.js";
import { PythonModuleScope } from "../src/symbols/index.js";

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

export function toSourceTextMultiple(
  sourceFiles: Children[],
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
): OutputDirectory {
  if (!policy) {
    policy = createPythonNamePolicy();
  }
  const mergedExternals = options?.externals ?? externals;
  if (printOptions === undefined) {
    printOptions = {
      printWidth: 80,
      tabWidth: 4,
      insertFinalNewLine: false,
    };
  } else {
    printOptions.insertFinalNewLine = false;
    printOptions.tabWidth = 4;
  }
  const content = (
    <Output
      externals={mergedExternals}
      namePolicy={policy}
      nameConflictResolver={pythonNameConflictResolver}
    >
      {sourceFiles}
    </Output>
  );
  return render(content, printOptions);
}

export function toSourceText(
  content: Children | Children[],
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
  path: string = "test.py",
): string {
  // If content is an array, wrap it in a default SourceFile
  const sourceFile =
    Array.isArray(content) ?
      <py.SourceFile path={path}>{content}</py.SourceFile>
    : content;

  const res = toSourceTextMultiple([sourceFile], {
    policy,
    externals,
    options,
    printOptions,
  });
  return findFile(res, path).contents;
}

// Helper function to create a PythonModuleScope to be used in tests
export function createPythonModuleScope(
  name: string,
  parent: OutputScope | undefined,
  binder: Binder | undefined = undefined,
): PythonModuleScope {
  return new PythonModuleScope(name, parent, {
    binder: binder,
  });
}
