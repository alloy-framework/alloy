import { memberRefkey, Output, refkey, StatementList } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { expect, it } from "vitest";
import * as ts from "../src/index.js";

it("works", () => {
  expect(
    <Output>
      <ts.SourceFile path="test.js">
        <ts.VarDeclaration name="hi" initializer="12" />;
      </ts.SourceFile>
    </Output>,
  ).toRenderTo("const hi = 12;");
});

it("works end-to-end", () => {
  const TestType = refkey("TestType");

  expect(
    <Output>
      <ts.SourceFile path="types.ts">
        <ts.TypeDeclaration name="TestType" refkey={TestType}>
          "hello" | "goodbye"
        </ts.TypeDeclaration>
      </ts.SourceFile>
      <ts.SourceFile path="test.ts">
        <ts.VarDeclaration
          export
          let
          name="hi"
          type={<ts.Reference refkey={TestType} />}
        >
          "hello"
        </ts.VarDeclaration>
        ;
      </ts.SourceFile>
    </Output>,
  ).toRenderTo({
    "types.ts": `
      type TestType = "hello" | "goodbye";
    `,
    "test.ts": `
      import type { TestType } from "./types.js";

      export let hi: TestType = "hello";
    `,
  });
});

it("instantiates symbols from its type", () => {
  const ifaceRk = refkey();
  const ifaceMemberRk = refkey();
  const classRk = refkey();
  const classMemberRk = refkey();
  const v1Rk = refkey();
  const v2Rk = refkey();

  expect(
    <Output>
      <ts.SourceFile path="inst.ts">
        <StatementList>
          <ts.VarDeclaration export name="one" refkey={v1Rk} type={classRk}>
            "test"
          </ts.VarDeclaration>
          <>{memberRefkey(v1Rk, classMemberRk)}</>
          <ts.VarDeclaration export name="two" refkey={v2Rk} type={ifaceRk}>
            "test"
          </ts.VarDeclaration>
          <>{memberRefkey(v2Rk, ifaceMemberRk)}</>
        </StatementList>
      </ts.SourceFile>
      <ts.SourceFile path="decl.ts">
        <ts.InterfaceDeclaration name="Foo" refkey={ifaceRk}>
          <StatementList>
            <ts.InterfaceMember name="instanceProp" refkey={ifaceMemberRk}>
              42
            </ts.InterfaceMember>
          </StatementList>
        </ts.InterfaceDeclaration>
        <ts.ClassDeclaration name="Bar" refkey={classRk}>
          <StatementList>
            <ts.ClassField name="instanceProp" refkey={classMemberRk}>
              42
            </ts.ClassField>
          </StatementList>
        </ts.ClassDeclaration>
      </ts.SourceFile>
    </Output>,
  ).toRenderTo({
    "decl.ts": `
      interface Foo {
        instanceProp: 42;
      }class Bar {
        instanceProp = 42;
      }
    `,
    "inst.ts": `
      import type { Bar, Foo } from "./decl.js";

      export const one: Bar = "test";
      one.instanceProp;
      export const two: Foo = "test";
      two.instanceProp;
    `,
  });
});

it("instantiates symbols from type even when an expression is passed", () => {
  const classRk = refkey();
  const classMemberRk = refkey();
  const v1Rk = refkey();

  expect(
    <Output>
      <ts.SourceFile path="inst.ts">
        <StatementList>
          <ts.VarDeclaration export name="one" refkey={v1Rk} type={classRk}>
            <ts.ObjectExpression>
              <ts.ObjectProperty name="noProp" refkey={refkey()} value="1" />
            </ts.ObjectExpression>
          </ts.VarDeclaration>
          <>{memberRefkey(v1Rk, classMemberRk)}</>
        </StatementList>
      </ts.SourceFile>
      <ts.SourceFile path="decl.ts">
        <ts.ClassDeclaration name="Bar" refkey={classRk}>
          <StatementList>
            <ts.ClassField name="instanceProp" refkey={classMemberRk}>
              42
            </ts.ClassField>
          </StatementList>
        </ts.ClassDeclaration>
      </ts.SourceFile>
    </Output>,
  ).toRenderTo({
    "decl.ts": `
      class Bar {
        instanceProp = 42;
      }
    `,
    "inst.ts": `
      import type { Bar } from "./decl.js";

      export const one: Bar = {
        noProp: 1
      };
      one.instanceProp;
    `,
  });
});
