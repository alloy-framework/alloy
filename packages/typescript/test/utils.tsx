import { Children, render, Output, OutputDirectory, OutputFile } from "@alloy-js/core";
import * as ts from "../src/index.js";

export function toSourceText(c: Children): string {
  const res = render(
    <Output>
      <ts.SourceFile path="test.ts">
        {c}
      </ts.SourceFile>
    </Output>
  )

  return res.contents[0].contents as string;
}

export function findFile(res: OutputDirectory, path: string): OutputFile | null {
  for (const item of res.contents) {
    if (item.kind === "file") {
      if (item.path === path) {
        return item;
      }
      continue;
    } else {
      let found = findFile(item, path);
      if (found) {
        return found;
      }
    }
  }

  return null;
}