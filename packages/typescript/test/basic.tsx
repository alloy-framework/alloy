import "@alloy-js/core/testing";
import { expect, it } from "vitest";
import { render, Output, SourceFile, Declaration, OutputDirectory, refkey } from "@alloy-js/core";
import * as ts from "../src/components/index.js";
import { Reference } from "../src/components/Reference.js";


it("works", () => {
  const fnSpec = {
    greeting: "Hello",
    farewell: "Goodbye"
  }

  const greetKey = refkey(fnSpec, "greet");
  const farewellKey = refkey(fnSpec, "farewell");

  const res = render(
    <Output>
      <SourceFile path="readme.md" filetype="markdown">
        This is a sample output project.
      </SourceFile>

      
      <ts.SourceFile path="test2.ts">
        console.log(<Reference refkey={greetKey} />("world"));
        console.log(<Reference refkey={farewellKey} />("world"));
      </ts.SourceFile>

      <ts.SourceFile path="test1.ts">
        <ts.FunctionDeclaration
          name={"say" + fnSpec.greeting}
          refkey={greetKey}
          parameters={{str: "string"}}
        >
          return "{fnSpec.greeting} " + str;
        </ts.FunctionDeclaration>

        <ts.FunctionDeclaration
          name={"say" + fnSpec.farewell}
          refkey={farewellKey}
          parameters={{str: "string"}}
        >
          return "{fnSpec.farewell} " + str;
        </ts.FunctionDeclaration>
      </ts.SourceFile>

    </Output>
  );

  printOutput(res);
})


function printOutput(dir: OutputDirectory, level = 1) {
  console.log(`${"#".repeat(level)} Directory ${dir.path}`);

  for (const item of dir.contents) {
    if (item.kind === "directory") {
      printOutput(item, level + 1)
    } else {
      console.log(`\n${"#".repeat(level + 1)} ${item.path} (${item.filetype})\n`);
      console.log(item.contents.trimStart());
    }
  }
}