import * as core from "@alloy-js/core";
import * as csharp from "../src/index.js";

export interface TestNamespaceProps extends csharp.CSharpFormatOptions {
  children: core.Children;
}
export function TestNamespace(props: TestNamespaceProps): core.Children {
  return (
    <core.Output namePolicy={csharp.createCSharpNamePolicy()}>
      <csharp.SourceFile path="Test.cs" {...props}>
        {props.children}
      </csharp.SourceFile>
    </core.Output>
  );
}
