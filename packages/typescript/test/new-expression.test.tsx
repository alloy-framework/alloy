import { Output, refkey, render, StatementList } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import * as ts from "../src/index.js";

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

  expect(tree.contents[0].contents).toEqual(d`
    import { Foo } from "./decl.js";

    export const one = new Foo();
  `);
  expect(tree.contents[1].contents).toEqual(d`
    class Foo {
      instanceProp = 42;
    }
  `);
});
