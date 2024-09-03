import { Output, refkey, render, SourceFile } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import * as ts from "../src/components/index.js";
import { Reference } from "../src/components/Reference.js";
import { findFile } from "./utils.js";

it("works", () => {
  const fnSpec = {
    greeting: "Hello",
    farewell: "Goodbye",
  };

  const greetKey = refkey(fnSpec, "greet");
  const farewellKey = refkey(fnSpec, "farewell");

  const res = render(
    <Output>
      <SourceFile path="readme.md" filetype="markdown">
        This is a sample output project.
      </SourceFile>

      <ts.SourceFile path="index.ts">
        console.log("Hello world!");
      </ts.SourceFile>
      
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

    </Output>,
  );

  expect(findFile(res, "readme.md").contents).toEqual(d`
    This is a sample output project.
  `);

  expect(findFile(res, "index.ts").contents).toEqual(d`
    console.log("Hello world!");
  `);

  expect(findFile(res, "test1.ts").contents).toEqual(d`
    function sayHello(str: string) {
      return "Hello " + str;
    }

    function sayGoodbye(str: string) {
      return "Goodbye " + str;
    }
  `);

  expect(findFile(res, "test2.ts").contents).toEqual(d`
    import { sayHello, sayGoodbye } from "./test1.js";

    console.log(sayHello("world"));
    console.log(sayGoodbye("world"));
  `);
});
