import { Children, Output } from "@alloy-js/core";
import * as go from "../src/index.js";

export function TestPackage(props: { children: Children }): Children {
  return (
    <Output>
      <go.ModuleDirectory name="github.com/alloy-framework/alloy">
        <go.SourceDirectory path=".">
          <go.SourceFile path="Test.go">{props.children}</go.SourceFile>
        </go.SourceDirectory>
      </go.ModuleDirectory>
    </Output>
  );
}
