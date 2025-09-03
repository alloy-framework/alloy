import { List, Output, refkey, SourceFile } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { expect, it } from "vitest";
import * as ts from "../src/components/index.js";
import { Reference } from "../src/components/Reference.js";

it("works", () => {
  const fnSpec = {
    greeting: "Hello",
    farewell: "Goodbye",
  };

  const greetKey = refkey(fnSpec, "greet");
  const farewellKey = refkey(fnSpec, "farewell");

  expect(
    <Output>
      <SourceFile path="readme.md" filetype="markdown">
        This is a sample output project.
      </SourceFile>

      <ts.SourceFile path="index.ts">
        console.log("Hello world!");
      </ts.SourceFile>

      <ts.SourceFile path="test2.ts">
        console.log(
        <Reference refkey={greetKey} />
        ("world"));
        <hbr />
        console.log(
        <Reference refkey={farewellKey} />
        ("world"));
      </ts.SourceFile>

      <ts.SourceFile path="test1.ts">
        <List hardline>
          <ts.FunctionDeclaration
            name={"say" + fnSpec.greeting}
            refkey={greetKey}
            parameters={[{ name: "str", type: "string" }]}
          >
            return "{fnSpec.greeting} " + str;
          </ts.FunctionDeclaration>

          <ts.FunctionDeclaration
            name={"say" + fnSpec.farewell}
            refkey={farewellKey}
            parameters={[{ name: "str", type: "string" }]}
          >
            return "{fnSpec.farewell} " + str;
          </ts.FunctionDeclaration>
        </List>
      </ts.SourceFile>
    </Output>,
  ).toRenderTo({
    "readme.md": `This is a sample output project.`,
    "index.ts": `console.log("Hello world!");`,
    "test1.ts": `
      function sayHello(str: string) {
        return "Hello " + str;
      }
      function sayGoodbye(str: string) {
        return "Goodbye " + str;
      }
    `,
    "test2.ts": `
      import { sayGoodbye, sayHello } from "./test1.js";
      
      console.log(sayHello("world"));
      console.log(sayGoodbye("world"));
    `,
  });
});
