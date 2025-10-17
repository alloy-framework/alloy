import {
  Children,
  ContentOutputFile,
  Output,
  OutputDirectory,
  OutputFile,
  PrintTreeOptions,
  render,
  SourceFile as CoreSourceFile,
} from "@alloy-js/core";


import * as typespec from "../src/index.js";

import { createTypeSpecNamePolicy } from "../src/name-policy.js";
import { TypeSpecFormatOptions } from "../src/contexts/format-options.js";
import { SourceFile } from "../src/index.js";

export function toSourceText(c: Children, options?: PrintTreeOptions): string {
  // We should use our own version of Output eventually?
  const res = render(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <CoreSourceFile filetype="typespec" path="test.tsp">
        {c}
      </CoreSourceFile>
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

export interface TestNamespaceProps extends TypeSpecFormatOptions {
  children: Children;
}
export function TestNamespace(props: TestNamespaceProps): Children {
  return (
    <Output namePolicy={typespec.createTypeSpecNamePolicy()}>
      <SourceFile path="test.tsp" {...props}>
        {props.children}
      </SourceFile>
    </Output>
  );
}