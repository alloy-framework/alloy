import * as ay from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import { writeOutput } from "./write-output.js";

const getGreeting = ay.refkey();
const result = ay.render(
  <ay.Output externals={[ts.node.fs]}>
  <ts.PackageDirectory name="greeting-lib" path="greeting-lib" version="1.0.0">
    <ts.SourceFile path="greetings.ts">
      <ts.FunctionDeclaration name="getGreeting" parameters={{
        foo: "string",
        bar: "string"
      }}>
        <ts.VarDeclaration name="foo">"string"</ts.VarDeclaration>
        return "Hello world!";
      </ts.FunctionDeclaration>
    </ts.SourceFile>

    <ts.SourceFile export="log.js" path="logGreetings.ts">
      <ts.FunctionDeclaration export name="printGreeting">
        console.log("Hello world!");
      </ts.FunctionDeclaration>
    </ts.SourceFile>
  
    <ts.BarrelFile export="." />
  </ts.PackageDirectory>

  <ts.PackageDirectory name="consumer" path="consumer" version="1.0.0">
    <ts.SourceFile export="." path="ref.ts">
      {getGreeting}();
    </ts.SourceFile>
  </ts.PackageDirectory>
</ay.Output>,
);

writeOutput(result, "./sample-output");
