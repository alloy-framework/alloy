import { render, refkey } from "@alloy-js/core";
import * as ay from "@alloy-js/core/stc";
import * as ts from "@alloy-js/typescript/stc";
import { writeOutput } from "./write-output.js";

const result = render(
  ay.Output().children(
    ts
      .PackageDirectory({
        name: "greeting-lib",
        path: "greeting-lib",
        version: "1.0.0",
      })
      .children(
        ts
          .SourceFile({
            path: "greetings.ts",
          })
          .children(
            ts.FunctionDeclaration({ name: "getGreeting" }).code`
              return "Hello world!"
            `
          ),
        ts
          .SourceFile({
            path: "logGreeting.ts",
          })
          .children(
            ts.FunctionDeclaration({ name: "getGreeting" }).code`
              console.log("Hello world!");
            `
          ),
        ts.BarrelFile({ export: "." })
      ),
    ts
      .PackageDirectory({
        name: "consumer",
        path: "consumer",
        version: "1.0.0",
      })
      .children(
        ts.SourceFile({ export: ".", path: "ref.ts" }).code`
          ${ts.Reference({ refkey: refkey("getGreeting") })}();
        `
      )
  )
);

writeOutput(result, "sample-output");
