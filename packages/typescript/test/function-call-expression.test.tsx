import { Output, refkey, StatementList } from "@alloy-js/core";
import { expect, it } from "vitest";
import {
  FunctionCallExpression,
  FunctionDeclaration,
  PackageDirectory,
  SourceFile,
  VarDeclaration,
} from "../../typescript/src/index.js";

it("can declare and call a function with parameters", () => {
  const functionRefkey = refkey();
  expect(
    <Output>
      <PackageDirectory path="." name="test" version="1.0.0">
        <SourceFile path="index.ts">
          <VarDeclaration name="foo" initializer={`"Foo"`} const />;<hbr />
          <FunctionDeclaration
            refkey={functionRefkey}
            name="bar"
            parameters={[
              { name: "foo", optional: true, type: "string" },
              { name: "baz", optional: true, type: "number" },
            ]}
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
  ).toRenderTo({
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
    "package.json": expect.anything(),
    "tsconfig.json": expect.anything(),
  });
});
