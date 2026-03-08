import { Output, SourceDirectory, SourceFile } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import * as ts from "../src/components/index.js";

it("exports everything from source files within it", () => {
  expect(
    <Output>
      <ts.SourceFile path="test1.ts" />
      <ts.SourceFile path="test2.ts" />
      <SourceDirectory path="components">
        <ts.SourceFile path="c1.ts" />
        <ts.SourceFile path="c2.ts" />
        <ts.BarrelFile />
      </SourceDirectory>
      <ts.BarrelFile />
    </Output>,
  ).toRenderTo({
    "components/index.ts": d`
      export * from "./c1.js";
      export * from "./c2.js";
    `,
    "index.ts": d`
    export * from "./test1.js";
    export * from "./test2.js";
    export * from "./components/index.js";
    `,
    "components/c2.ts": "",
    "components/c1.ts": "",
    "test1.ts": "",
    "test2.ts": "",
  });
});

it("ignores non-TS files", () => {
  expect(
    <Output>
      <SourceFile path="test.txt" filetype="text" />
      <ts.SourceFile path="test1.ts" />
      <ts.SourceFile path="test2.ts" />
      <ts.BarrelFile />
    </Output>,
  ).toRenderTo({
    "index.ts": d`
      export * from "./test1.js";
      export * from "./test2.js";
    `,
    "test.txt": "",
    "test1.ts": "",
    "test2.ts": "",
  });
});

it("excludes internal declarations from barrel re-exports", () => {
  expect(
    <Output>
      <ts.SourceFile path="utils.ts">
        <ts.FunctionDeclaration export name="publicUtil">
          return 1;
        </ts.FunctionDeclaration>
        <hbr />
        <ts.FunctionDeclaration export internal name="internalHelper">
          return 2;
        </ts.FunctionDeclaration>
      </ts.SourceFile>
      <ts.BarrelFile />
    </Output>,
  ).toRenderTo({
    "utils.ts": d`
      export function publicUtil() {
        return 1;
      }
      export function internalHelper() {
        return 2;
      }
    `,
    "index.ts": d`
      export { publicUtil } from "./utils.js";
    `,
  });
});

it("uses export * when no declarations are internal", () => {
  expect(
    <Output>
      <ts.SourceFile path="utils.ts">
        <ts.FunctionDeclaration export name="one">
          return 1;
        </ts.FunctionDeclaration>
        <hbr />
        <ts.FunctionDeclaration export name="two">
          return 2;
        </ts.FunctionDeclaration>
      </ts.SourceFile>
      <ts.BarrelFile />
    </Output>,
  ).toRenderTo({
    "utils.ts": d`
      export function one() {
        return 1;
      }
      export function two() {
        return 2;
      }
    `,
    "index.ts": d`
      export * from "./utils.js";
    `,
  });
});

it("omits module from barrel when all exports are internal", () => {
  expect(
    <Output>
      <ts.SourceFile path="public.ts">
        <ts.FunctionDeclaration export name="publicFn">
          return 1;
        </ts.FunctionDeclaration>
      </ts.SourceFile>
      <ts.SourceFile path="internal.ts">
        <ts.FunctionDeclaration export internal name="helperA">
          return 2;
        </ts.FunctionDeclaration>
        <hbr />
        <ts.FunctionDeclaration export internal name="helperB">
          return 3;
        </ts.FunctionDeclaration>
      </ts.SourceFile>
      <ts.BarrelFile />
    </Output>,
  ).toRenderTo({
    "public.ts": d`
      export function publicFn() {
        return 1;
      }
    `,
    "internal.ts": d`
      export function helperA() {
        return 2;
      }
      export function helperB() {
        return 3;
      }
    `,
    "index.ts": d`
      export * from "./public.js";
    `,
  });
});

it("supports internal on various declaration types", () => {
  expect(
    <Output>
      <ts.SourceFile path="decls.ts">
        <ts.VarDeclaration export name="publicVar">
          42
        </ts.VarDeclaration>
        ;<hbr />
        <ts.VarDeclaration export internal name="internalVar">
          99
        </ts.VarDeclaration>
        ;<hbr />
        <ts.InterfaceDeclaration export name="PublicIface" />
        <hbr />
        <ts.InterfaceDeclaration export internal name="InternalIface" />
      </ts.SourceFile>
      <ts.BarrelFile />
    </Output>,
  ).toRenderTo({
    "decls.ts": d`
      export const publicVar = 42;
      export const internalVar = 99;
      export interface PublicIface {}
      export interface InternalIface {}
    `,
    "index.ts": d`
      export { PublicIface, publicVar } from "./decls.js";
    `,
  });
});

it("aliases duplicate export names across modules", () => {
  expect(
    <Output>
      <ts.SourceFile path="a.ts">
        <ts.FunctionDeclaration export name="helper">
          return 1;
        </ts.FunctionDeclaration>
      </ts.SourceFile>
      <ts.SourceFile path="b.ts">
        <ts.FunctionDeclaration export name="helper">
          return 2;
        </ts.FunctionDeclaration>
      </ts.SourceFile>
      <ts.BarrelFile />
    </Output>,
  ).toRenderTo({
    "a.ts": d`
      export function helper() {
        return 1;
      }
    `,
    "b.ts": d`
      export function helper() {
        return 2;
      }
    `,
    "index.ts": d`
      export * from "./a.js";
      export { helper as helper_1 } from "./b.js";
    `,
  });
});

it("aliases duplicate exports with mixed non-conflicting names", () => {
  expect(
    <Output>
      <ts.SourceFile path="a.ts">
        <ts.FunctionDeclaration export name="helper">
          return 1;
        </ts.FunctionDeclaration>
        <hbr />
        <ts.FunctionDeclaration export name="foo">
          return 2;
        </ts.FunctionDeclaration>
      </ts.SourceFile>
      <ts.SourceFile path="b.ts">
        <ts.FunctionDeclaration export name="helper">
          return 3;
        </ts.FunctionDeclaration>
        <hbr />
        <ts.FunctionDeclaration export name="bar">
          return 4;
        </ts.FunctionDeclaration>
      </ts.SourceFile>
      <ts.BarrelFile />
    </Output>,
  ).toRenderTo({
    "a.ts": d`
      export function helper() {
        return 1;
      }
      export function foo() {
        return 2;
      }
    `,
    "b.ts": d`
      export function helper() {
        return 3;
      }
      export function bar() {
        return 4;
      }
    `,
    "index.ts": d`
      export * from "./a.js";
      export { bar, helper as helper_1 } from "./b.js";
    `,
  });
});

it("aliases duplicate exports across three modules", () => {
  expect(
    <Output>
      <ts.SourceFile path="a.ts">
        <ts.FunctionDeclaration export name="helper">
          return 1;
        </ts.FunctionDeclaration>
      </ts.SourceFile>
      <ts.SourceFile path="b.ts">
        <ts.FunctionDeclaration export name="helper">
          return 2;
        </ts.FunctionDeclaration>
      </ts.SourceFile>
      <ts.SourceFile path="c.ts">
        <ts.FunctionDeclaration export name="helper">
          return 3;
        </ts.FunctionDeclaration>
      </ts.SourceFile>
      <ts.BarrelFile />
    </Output>,
  ).toRenderTo({
    "a.ts": d`
      export function helper() {
        return 1;
      }
    `,
    "b.ts": d`
      export function helper() {
        return 2;
      }
    `,
    "c.ts": d`
      export function helper() {
        return 3;
      }
    `,
    "index.ts": d`
      export * from "./a.js";
      export { helper as helper_1 } from "./b.js";
      export { helper as helper_2 } from "./c.js";
    `,
  });
});

it("handles duplicate exports combined with internal exports", () => {
  expect(
    <Output>
      <ts.SourceFile path="a.ts">
        <ts.FunctionDeclaration export name="helper">
          return 1;
        </ts.FunctionDeclaration>
      </ts.SourceFile>
      <ts.SourceFile path="b.ts">
        <ts.FunctionDeclaration export name="helper">
          return 2;
        </ts.FunctionDeclaration>
        <hbr />
        <ts.FunctionDeclaration export internal name="secret">
          return 3;
        </ts.FunctionDeclaration>
      </ts.SourceFile>
      <ts.BarrelFile />
    </Output>,
  ).toRenderTo({
    "a.ts": d`
      export function helper() {
        return 1;
      }
    `,
    "b.ts": d`
      export function helper() {
        return 2;
      }
      export function secret() {
        return 3;
      }
    `,
    "index.ts": d`
      export * from "./a.js";
      export { helper as helper_1 } from "./b.js";
    `,
  });
});
