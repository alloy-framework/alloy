import { Output, refkey, render, StatementList } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { it } from "vitest";
import * as ts from "../src/index.js";
import { assertFileContents } from "./utils.jsx";

it("should instantiate classes", () => {
  const varRk = refkey();
  const classRk = refkey();
  const memberRk = refkey();

  const tree = render(
    <Output>
      <ts.SourceFile path="inst.ts">
        <StatementList>
          <ts.VarDeclaration export name="one" refkey={varRk}>
            <ts.NewExpression target={classRk} />
          </ts.VarDeclaration>
        </StatementList>
      </ts.SourceFile>
      <ts.SourceFile path="decl.ts">
        <ts.ClassDeclaration name="Foo" refkey={classRk}>
          <StatementList>
            <ts.ClassField name="instanceProp" refkey={memberRk}>
              42
            </ts.ClassField>
          </StatementList>
        </ts.ClassDeclaration>
      </ts.SourceFile>
    </Output>,
  );

  assertFileContents(tree, {
    "inst.ts": d`
      import { Foo } from "./decl.js";

      export const one = new Foo();
    `,
    "decl.ts": d`
      class Foo {
        instanceProp = 42;
      }
    `,
  });
});
