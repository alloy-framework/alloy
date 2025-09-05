import {
  List,
  Output,
  SourceDirectory,
  StatementList,
  refkey,
} from "@alloy-js/core";
import "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import * as ts from "../src/components/index.js";
import { Reference } from "../src/components/Reference.js";
import { TypeRefContext } from "../src/context/type-ref-context.js";
import { createPackage } from "../src/create-package.js";
import { tsNameConflictResolver } from "../src/name-conflict-resolver.js";

it("works with default imports", () => {
  expect(
    <Output>
      <ts.SourceFile path="test1.ts">
        <ts.FunctionDeclaration
          export
          default
          name="asdf"
          refkey={refkey("test")}
        />
      </ts.SourceFile>

      <ts.SourceFile path="test2.ts">
        const v = <Reference refkey={refkey("test")} />;
      </ts.SourceFile>
    </Output>,
  ).toRenderTo({
    "test1.ts": `
      export default function asdf() {}
    `,
    "test2.ts": `
      import asdf from "./test1.js";

      const v = asdf;
    `,
  });
});

it("works with named imports", () => {
  expect(
    <Output>
      <ts.SourceFile path="test1.ts">
        <ts.FunctionDeclaration export name="test" refkey={refkey("test")} />
      </ts.SourceFile>

      <ts.SourceFile path="test2.ts">
        const v = <Reference refkey={refkey("test")} />;
      </ts.SourceFile>
    </Output>,
  ).toRenderTo({
    "test1.ts": `
      export function test() {}
    `,
    "test2.ts": `
      import { test } from "./test1.js";

      const v = test;
    `,
  });
});

it("sort named imports", () => {
  expect(
    <Output>
      <ts.SourceFile path="test1.ts">
        <List>
          <>
            <ts.ClassDeclaration export name="B" refkey={refkey("B")} />
          </>
          <>
            <ts.FunctionDeclaration export name="a" refkey={refkey("a")} />
          </>
        </List>
      </ts.SourceFile>

      <ts.SourceFile path="test2.ts">
        <List>
          <>
            const b = <Reference refkey={refkey("B")} />;
          </>
          <>
            const a = <Reference refkey={refkey("a")} />;
          </>
        </List>
      </ts.SourceFile>
    </Output>,
  ).toRenderTo({
    "test2.ts": `
      import { a, B } from "./test1.js";

      const b = B;
      const a = a;
    `,
    "test1.ts": `
      export class B {}
      export function a() {}
    `,
  });
});

it("sort statements by import paths", () => {
  expect(
    <Output>
      <ts.SourceFile path="a.ts">
        <ts.ClassDeclaration export default name="A" refkey={refkey("A")} />
      </ts.SourceFile>
      <ts.SourceFile path="b.ts">
        <ts.ClassDeclaration export default name="B" refkey={refkey("B")} />
      </ts.SourceFile>

      <ts.SourceFile path="test2.ts">
        <List>
          <>
            const b = <Reference refkey={refkey("B")} />;
          </>
          <>
            const a = <Reference refkey={refkey("A")} />;
          </>
        </List>
      </ts.SourceFile>
    </Output>,
  ).toRenderTo({
    "test2.ts": `
      import A from "./a.js";
      import B from "./b.js";

      const b = B;
      const a = A;
    `,
    "a.ts": "export default class A {}",
    "b.ts": "export default class B {}",
  });
});

it("works with default and named imports", () => {
  expect(
    <Output>
      <ts.SourceFile path="test1.ts">
        <ts.FunctionDeclaration
          export
          default
          name="test1"
          refkey={refkey("test1")}
        />
        <hbr />
        <ts.FunctionDeclaration export name="test2" refkey={refkey("test2")} />
      </ts.SourceFile>

      <ts.SourceFile path="test2.ts">
        const v1 = <Reference refkey={refkey("test1")} />;<hbr />
        const v2 = <Reference refkey={refkey("test2")} />;
      </ts.SourceFile>
    </Output>,
  ).toRenderTo({
    "test1.ts": `
      export default function test1() {}
      export function test2() {}
    `,
    "test2.ts": `
      import test1, { test2 } from "./test1.js";

      const v1 = test1;
      const v2 = test2;
    `,
  });
});

it("works with default and named imports and name conflicts", () => {
  expect(
    <Output nameConflictResolver={tsNameConflictResolver}>
      <ts.SourceFile path="test1.ts">
        <ts.FunctionDeclaration
          export
          default
          name="test1"
          refkey={refkey("test1")}
        />
        <br />
        <ts.FunctionDeclaration export name="test2" refkey={refkey("test2")} />
      </ts.SourceFile>

      <ts.SourceFile path="test2.ts">
        <ts.FunctionDeclaration
          export
          default
          name="test1"
          refkey={refkey("test3")}
        />
        <br />
        <ts.FunctionDeclaration export name="test2" refkey={refkey("test4")} />
      </ts.SourceFile>

      <ts.SourceFile path="test3.ts">
        <StatementList>
          <>
            const v1 = <Reference refkey={refkey("test1")} />
          </>
          <>
            const v1_1 = <Reference refkey={refkey("test2")} />
          </>
          <>
            const v2 = <Reference refkey={refkey("test3")} />
          </>
          <>
            const v3 = <Reference refkey={refkey("test3")} />
          </>
          <>
            const v4 = <Reference refkey={refkey("test4")} />
          </>
        </StatementList>
      </ts.SourceFile>
    </Output>,
  ).toRenderTo({
    "test1.ts": `
      export default function test1() {}
      export function test2() {}
    `,
    "test2.ts": `
      export default function test1() {}
      export function test2() {}
    `,
    "test3.ts": `
      import test1_1, { test2 as test2_1 } from "./test1.js";
      import test1_2, { test2 as test2_2 } from "./test2.js";

      const v1 = test1_1;
      const v1_1 = test2_1;
      const v2 = test1_2;
      const v3 = test1_2;
      const v4 = test2_2;
    `,
  });
});

it("works with importing the same name many times from different files with the default name conflict resolver", () => {
  const rk1 = refkey();
  const rk1i = refkey();
  const rk2 = refkey();
  const rk2i = refkey();
  const rk3 = refkey();
  const rk3i = refkey();

  expect(
    <Output>
      <ts.SourceFile path="test1.ts">
        <ts.VarDeclaration export name="conflict" refkey={rk1}>
          "hi"
        </ts.VarDeclaration>
        <ts.InterfaceDeclaration export name="MyInterface" refkey={rk1i} />
      </ts.SourceFile>
      <ts.SourceFile path="test2.ts">
        <ts.VarDeclaration name="conflict" refkey={rk2}>
          "hi"
        </ts.VarDeclaration>
        <ts.InterfaceDeclaration export name="MyInterface" refkey={rk2i} />
      </ts.SourceFile>
      <ts.SourceFile path="test3.ts">
        <ts.VarDeclaration name="conflict" refkey={rk3}>
          "hi"
        </ts.VarDeclaration>
        <ts.InterfaceDeclaration export name="MyInterface" refkey={rk3i} />
      </ts.SourceFile>
      <ts.SourceFile path="test-import.ts">
        <StatementList>
          <ts.VarDeclaration name="one" type={rk1i} initializer={rk1} />
          <ts.VarDeclaration name="two" type={rk2i} initializer={rk2} />
          <ts.VarDeclaration name="three" type={rk3i} initializer={rk3} />
        </StatementList>
      </ts.SourceFile>
    </Output>,
  ).toRenderTo({
    "test-import.ts": `
      import { conflict, type MyInterface } from "./test1.js";
      import { conflict as conflict_2, type MyInterface as MyInterface_2 } from "./test2.js";
      import { conflict as conflict_3, type MyInterface as MyInterface_3 } from "./test3.js";

      const one: MyInterface = conflict;
      const two: MyInterface_2 = conflict_2;
      const three: MyInterface_3 = conflict_3;
    `,
    "test1.ts": `export const conflict = "hi"export interface MyInterface {}`,
    "test2.ts": `const conflict = "hi"export interface MyInterface {}`,
    "test3.ts": `const conflict = "hi"export interface MyInterface {}`,
  });
});
it("works with default and named imports and name conflicts and references in nested scopes", () => {
  expect(
    <Output nameConflictResolver={tsNameConflictResolver}>
      <ts.SourceFile path="test1.ts">
        <ts.FunctionDeclaration
          export
          default
          name="test1"
          refkey={refkey("test1")}
        />
        <hbr />
        <ts.FunctionDeclaration export name="test2" refkey={refkey("test2")} />
      </ts.SourceFile>

      <ts.SourceFile path="test2.ts">
        <ts.FunctionDeclaration
          export
          default
          name="test1"
          refkey={refkey("test3")}
        />
        <hbr />
        <ts.FunctionDeclaration export name="test2" refkey={refkey("test4")} />
      </ts.SourceFile>

      <ts.SourceFile path="test3.ts">
        <StatementList>
          <>
            const v1 = <Reference refkey={refkey("test1")} />
          </>
          <>
            const v1_1 = <Reference refkey={refkey("test2")} />
          </>
        </StatementList>
        <hbr />
        <ts.FunctionDeclaration name="foo">
          <StatementList>
            <>
              const v2 = <Reference refkey={refkey("test3")} />
            </>
            <>
              const v3 = <Reference refkey={refkey("test3")} />
            </>
            <>
              const v4 = <Reference refkey={refkey("test4")} />
            </>
          </StatementList>
        </ts.FunctionDeclaration>
      </ts.SourceFile>
    </Output>,
  ).toRenderTo({
    "test1.ts": `
      export default function test1() {}
      export function test2() {}
    `,
    "test2.ts": `
      export default function test1() {}
      export function test2() {}
    `,
    "test3.ts": `
      import test1_1, { test2 as test2_1 } from "./test1.js";
      import test1_2, { test2 as test2_2 } from "./test2.js";

      const v1 = test1_1;
      const v1_1 = test2_1;
      function foo() {
        const v2 = test1_2;
        const v3 = test1_2;
        const v4 = test2_2;
      }
    `,
  });
});

it("works with imports from different directories", () => {
  expect(
    <Output>
      <SourceDirectory path="src">
        <ts.SourceFile path="test1.ts">
          <ts.FunctionDeclaration export name="test" refkey={refkey("test")} />
          <hbr />
          const v = <Reference refkey={refkey("test2")} />;
        </ts.SourceFile>
      </SourceDirectory>

      <ts.SourceFile path="test2.ts">
        const v = <Reference refkey={refkey("test")} />;<hbr />
        <ts.FunctionDeclaration export name="test2" refkey={refkey("test2")} />
      </ts.SourceFile>
    </Output>,
  ).toRenderTo({
    "src/test1.ts": `
      import { test2 } from "../test2.js";

      export function test() {}
      const v = test2;
    `,
    "test2.ts": `
      import { test } from "./src/test1.js";

      const v = test;
      export function test2() {}
    `,
  });
});

it("handles conflicts with local declarations", () => {
  expect(
    <Output nameConflictResolver={tsNameConflictResolver}>
      <SourceDirectory path="src">
        <ts.SourceFile path="test1.ts">
          <ts.FunctionDeclaration export name="test" refkey={refkey("test")} />
          <hbr />
          const v = <Reference refkey={refkey("test2")} />;
        </ts.SourceFile>
      </SourceDirectory>

      <ts.SourceFile path="test2.ts">
        const v = <Reference refkey={refkey("test")} />;<hbr />
        <ts.FunctionDeclaration export name="test" />
      </ts.SourceFile>
    </Output>,
    // cspell:ignore stest2
  ).toRenderTo({
    "src/test1.ts": `
      export function test() {}
      const v = <Unresolved Symbol: refkey[stest2]>;
    `,
    "test2.ts": `
      import { test as test_1 } from "./src/test1.js";

      const v = test_1;
      export function test() {}
    `,
  });
});

describe("type imports", () => {
  function mkTestFile(name: string) {
    const TypeA = refkey("TypeA");
    const TypeB = refkey("TypeB");
    const ClassA = refkey("ClassA");

    return {
      component: (
        <ts.SourceFile path="test1.ts">
          <ts.InterfaceDeclaration export name="TypeA" refkey={TypeA} />
          <ts.InterfaceDeclaration export name="TypeB" refkey={TypeB} />
          <ts.ClassDeclaration export name="ClassA" refkey={ClassA} />
        </ts.SourceFile>
      ),
      TypeA,
      TypeB,
      ClassA,
    };
  }

  it("adds type keyword only to type imports", () => {
    const { component, TypeA, ClassA } = mkTestFile("test1.ts");
    expect(
      <Output>
        {component}
        <ts.SourceFile path="test2.ts">
          <List>
            <>
              type A = <Reference refkey={TypeA} type />
            </>
            <>
              class B extends <Reference refkey={ClassA} /> {"{}"}
            </>
          </List>
        </ts.SourceFile>
      </Output>,
    ).toRenderTo({
      "test1.ts": expect.anything(),
      "test2.ts": `
        import { ClassA, type TypeA } from "./test1.js";

        type A = TypeA
        class B extends ClassA {}
    `,
    });
  });

  it("add type keyword for whole import if all are types", () => {
    const { component, TypeA, TypeB } = mkTestFile("test1.ts");
    expect(
      <Output>
        {component}
        <ts.SourceFile path="test2.ts">
          <List>
            <>
              type A = <Reference refkey={TypeA} type />
            </>
            <>
              type B = <Reference refkey={TypeB} type />
            </>
          </List>
        </ts.SourceFile>
      </Output>,
    ).toRenderTo({
      "test1.ts": expect.anything(),
      "test2.ts": `
      import type { TypeA, TypeB } from "./test1.js";

      type A = TypeA
      type B = TypeB
    `,
    });
  });
  it("reference same type multiple times", () => {
    const { component, TypeA } = mkTestFile("test1.ts");
    expect(
      <Output>
        {component}
        <ts.SourceFile path="test2.ts">
          <List>
            <>
              type A = <Reference refkey={TypeA} type />
            </>
            <>
              type B = <Reference refkey={TypeA} type />
            </>
          </List>
        </ts.SourceFile>
      </Output>,
    ).toRenderTo({
      "test1.ts": expect.anything(),
      "test2.ts": `
      import type { TypeA } from "./test1.js";

      type A = TypeA
      type B = TypeA
    `,
    });
  });

  it("same reference used as both type and non type doesn't include type", () => {
    const { component, ClassA } = mkTestFile("test1.ts");
    expect(
      <Output>
        {component}
        <ts.SourceFile path="test2.ts">
          <List>
            <>
              type A = <Reference refkey={ClassA} type />
            </>
            <>
              class B extends <Reference refkey={ClassA} /> {"{}"}
            </>
          </List>
        </ts.SourceFile>
      </Output>,
    ).toRenderTo({
      "test1.ts": expect.anything(),
      "test2.ts": `
      import { ClassA } from "./test1.js";

      type A = ClassA
      class B extends ClassA {}
    `,
    });
  });

  it("value reference from another file doesn't affect a type only reference", () => {
    const { component, ClassA } = mkTestFile("test1.ts");
    expect(
      <Output>
        {component}
        <ts.SourceFile path="test2.ts">
          type A = <Reference refkey={ClassA} type />
        </ts.SourceFile>
        <ts.SourceFile path="test3.ts">
          class B extends <Reference refkey={ClassA} /> {"{}"}
        </ts.SourceFile>
      </Output>,
    ).toRenderTo({
      "test1.ts": expect.anything(),
      "test2.ts": `
      import type { ClassA } from "./test1.js";

      type A = ClassA
    `,
      "test3.ts": `
      import { ClassA } from "./test1.js";

      class B extends ClassA {}
    `,
    });
  });

  it("infer if a type reference from the typescript context", () => {
    const { component, TypeA } = mkTestFile("test1.ts");
    expect(
      <Output>
        {component}
        <ts.SourceFile path="test2.ts">
          <TypeRefContext.Provider value={{ type: true }}>
            <List>
              <>
                type A = <Reference refkey={TypeA} />
              </>
              <>
                type B = <Reference refkey={TypeA} />
              </>
            </List>
          </TypeRefContext.Provider>
        </ts.SourceFile>
      </Output>,
    ).toRenderTo({
      "test1.ts": expect.anything(),
      "test2.ts": `
      import type { TypeA } from "./test1.js";

      type A = TypeA
      type B = TypeA
    `,
    });
  });

  it("reference from a package", () => {
    const pkg1 = createPackage({
      name: "test",
      version: "^1.0.0",
      descriptor: {
        ".": {
          named: ["Foo"],
        },
      },
    });

    expect(
      <Output externals={[pkg1]}>
        <ts.SourceFile path="test2.ts">
          type A = <Reference refkey={pkg1.Foo} type />
        </ts.SourceFile>
      </Output>,
    ).toRenderTo({
      "test2.ts": `
      import type { Foo } from "test";

      type A = Foo
    `,
    });
  });
});
