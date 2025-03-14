import { Output, refkey, render } from "@alloy-js/core";
import { it } from "vitest";
import { StatementList } from "../../core/src/components/StatementList.jsx";
import {
  FunctionCallExpression,
  FunctionDeclaration,
  PackageDirectory,
  SourceFile,
  VarDeclaration,
} from "../../typescript/src/index.js";
import { assertFileContents } from "./utils.js";

it("can declare and call a function with parameters", () => {
  const functionRefkey = refkey();
  const res = render(
    <Output>
      <PackageDirectory path="." name="test" version="1.0.0">
        <SourceFile path="index.ts">
          <VarDeclaration name="foo" initializer={`"Foo"`} const />;<hbr />
          <FunctionDeclaration
            refkey={functionRefkey}
            name="bar"
            parameters={{ "foo?": "string", "baz?": "number" }}
          >
            <StatementList>
              <>const message = foo ? foo : "Hello, World!"</>
              <>console.log(message)</>
              <>if(baz) console.log(baz)</>
            </StatementList>
          </FunctionDeclaration>
          <hbr />
          <StatementList>
            <FunctionCallExpression
              target={functionRefkey}
              args={[`"Hello!"`]}
            />
            <FunctionCallExpression target={functionRefkey} />
            <FunctionCallExpression
              target={functionRefkey}
              args={[<>"Hello {<>World</>}!"</>]}
            />
            <FunctionCallExpression
              target={functionRefkey}
              args={[<>"Hey there!"</>]}
            />
            <FunctionCallExpression
              target={functionRefkey}
              args={[<>"Hello World"</>, <>12345</>]}
            />
          </StatementList>
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
          if(baz) console.log(baz);
        }
        bar("Hello!");
        bar();
        bar("Hello World!");
        bar("Hey there!");
        bar("Hello World", 12345);
      `,
  });
});
