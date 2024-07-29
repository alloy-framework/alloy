import * as ay from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import * as java from "@alloy-js/java";
import { writeOutput } from "./write-output.js";
 
const fs = ts.node.fs;
const readFile = fs["./promises"].readFile;

const res = ay.render(
  <ay.Output externals={[ts.node.fs]}>
    <ts.PackageDirectory name="test-package" version="1.0.0" path=".">
      <ay.SourceFile path="readme.md" filetype="markdown">
        This is a sample output project.
      </ay.SourceFile>

      <ay.SourceFile path={"JavaTestFile.java"} filetype={"java"}>
        <java.ClassDeclaration className={"JavaTestClass"} accessModifier={"public"}>
          <java.Method accessModifier={"public"} methodName={"javaTestMethod"} isStatic={true} returnType={"void"}></java.Method>
          <java.Method accessModifier={"private"} methodName={"javaTestMethodTwo"} isStatic={false} returnType={"void"}></java.Method>
          <java.Method accessModifier={"public"} methodName={"javaTestMethodThree"} isStatic={true} returnType={"void"}></java.Method>
        </java.ClassDeclaration>
      </ay.SourceFile>

      <ts.SourceFile export="." path="test1.ts">
        await <ts.Reference refkey={readFile}/>("./package.json");
        <ts.Declaration export name="foo">
          const foo = 1;
        </ts.Declaration>
      </ts.SourceFile>

      <ts.SourceFile path="test2.ts">
        const v = <ts.Reference refkey={ay.refkey("foo")} />;
      </ts.SourceFile>
    </ts.PackageDirectory>
  </ay.Output>
);

writeOutput(res, "./sample-output");
