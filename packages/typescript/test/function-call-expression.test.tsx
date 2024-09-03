import { it } from "vitest";
import {
  FunctionCallExpression,
  FunctionDeclaration,
  PackageDirectory,
  SourceFile,
  VarDeclaration,
} from "../../typescript/src/index.js";
import { Output, refkey, render } from "@alloy-js/core";
import { assertFileContents } from "./utils.js";

it("can declare and call a function with parameters", () => {
  const functionRefkey = refkey();
  const res = render(
    <Output>
        <PackageDirectory path="." name="test" version="1.0.0">
          <SourceFile path="index.ts">
            <VarDeclaration name="foo" value={`"Foo"`} const />
            <FunctionDeclaration refkey={functionRefkey} name="bar" parameters={{"foo?": "string", "baz?": "number"}} >
                const message = foo ? foo : "Hello, World!";
                console.log(message);
                if(baz) console.log(baz)
            </FunctionDeclaration>
            <FunctionCallExpression refkey={functionRefkey} args={[`"Hello!"`]} />
            <FunctionCallExpression refkey={functionRefkey} />
            <FunctionCallExpression refkey={functionRefkey} args={[<>"Hello {<>World</>}!"</>]} />
            <FunctionCallExpression refkey={functionRefkey} args={[<>"Hey there!"</>]} />
            <FunctionCallExpression refkey={functionRefkey} args={[<>"Hello World"</>, <>12345</>]} />
          </SourceFile>
        </PackageDirectory>
      </Output>,
  );

  assertFileContents(res, {
    "index.ts": `
        const foo = "Foo";
        function bar(foo?: string, baz?: number) {
          const message = foo ? foo : "Hello, World!";
          console.log(message);
          if(baz) console.log(baz)
        }
        bar("Hello!");
        bar();
        bar("Hello World!");
        bar("Hey there!");
        bar("Hello World", 12345);
      `,
  });
});
