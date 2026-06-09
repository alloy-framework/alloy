import { Children, Output, SymbolCreator } from "@alloy-js/core";
import * as jv from "../src/index.js";

export interface TestPackageProps {
  children: Children;
  externals?: SymbolCreator[];
  package?: string;
  path?: string;
}

export function TestPackage(props: TestPackageProps) {
  return (
    <Output externals={props.externals}>
      <jv.PackageDirectory package={props.package ?? "me.test.code"}>
        <jv.SourceFile path={props.path ?? "Test.java"}>
          {props.children}
        </jv.SourceFile>
      </jv.PackageDirectory>
    </Output>
  );
}
