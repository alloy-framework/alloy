import { Children, Output } from "@alloy-js/core";
import * as ts from "../src/index.js";

export function TestFile(props: { children?: Children }) {
  return (
    <Output>
      <ts.SourceFile path="test.ts">{props.children}</ts.SourceFile>
    </Output>
  );
}
