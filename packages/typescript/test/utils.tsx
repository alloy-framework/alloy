import { Children, render, Output } from "@alloy-js/core";
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