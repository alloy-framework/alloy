import {
  List,
  Output,
  SourceDirectory,
  StatementList,
  refkey,
  render,
} from "@alloy-js/core";
import "@alloy-js/core/testing";
import { describe, it } from "vitest";
import * as ts from "../src/components/index.js";
import { Reference } from "../src/components/Reference.js";
import { TypeScriptContext } from "../src/context/ts-context.js";
import { tsNameConflictResolver } from "../src/name-conflict-resolver.js";
import { assertFileContents } from "./utils.js";

it("works with default imports", () => {
  const res = render(
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
  );

  assertFileContents(res, {
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
  const res = render(
    <Output>
      <ts.SourceFile path="test1.ts">
        <ts.FunctionDeclaration export name="test" refkey={refkey("test")} />
      </ts.SourceFile>

      <ts.SourceFile path="test2.ts">
        const v = <Reference refkey={refkey("test")} />;
      </ts.SourceFile>
    </Output>,
  );

  assertFileContents(res, {
    "test1.ts": `
      export function test() {}
    `,
    "test2.ts": `
      import { test } from "./test1.js";

      const v = test;
    `,
  });
});

it("works with default and named imports", () => {
  const res = render(
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
  );

  assertFileContents(res, {
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
  const res = render(
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
  );

  assertFileContents(res, {
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

it("works with default and named imports and name conflicts and references in nested scopes", () => {
  const res = render(
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
  );

  assertFileContents(res, {
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
  const res = render(
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
  );

  assertFileContents(res, {
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
  const res = render(
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
  );

  assertFileContents(res, {
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
    const res = render(
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
    );

    assertFileContents(res, {
      "test2.ts": `
      import { type TypeA, ClassA } from "./test1.js";

      type A = TypeA
      class B extends ClassA {}
    `,
    });
  });

  it("add type keyword for whole import if all are types", () => {
    const { component, TypeA, TypeB } = mkTestFile("test1.ts");
    const res = render(
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
    );

    assertFileContents(res, {
      "test2.ts": `
      import type { TypeA, TypeB } from "./test1.js";

      type A = TypeA
      type B = TypeB
    `,
    });
  });
  it("reference same type multiple times", () => {
    const { component, TypeA } = mkTestFile("test1.ts");
    const res = render(
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
    );

    assertFileContents(res, {
      "test2.ts": `
      import type { TypeA } from "./test1.js";

      type A = TypeA
      type B = TypeA
    `,
    });
  });

  it("same reference used as both type and non type doesn't include type", () => {
    const { component, ClassA } = mkTestFile("test1.ts");
    const res = render(
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
    );

    assertFileContents(res, {
      "test2.ts": `
      import { ClassA } from "./test1.js";

      type A = ClassA
      class B extends ClassA {}
    `,
    });
  });

  it("infer if a type reference from the typescript context", () => {
    const { component, TypeA } = mkTestFile("test1.ts");
    const res = render(
      <Output>
        {component}
        <ts.SourceFile path="test2.ts">
          <TypeScriptContext.Provider value={{ type: true }}>
            <List>
              <>
                type A = <Reference refkey={TypeA} />
              </>
              <>
                type B = <Reference refkey={TypeA} />
              </>
            </List>
          </TypeScriptContext.Provider>
        </ts.SourceFile>
      </Output>,
    );

    assertFileContents(res, {
      "test2.ts": `
      import type { TypeA } from "./test1.js";

      type A = TypeA
      type B = TypeA
    `,
    });
  });
});
