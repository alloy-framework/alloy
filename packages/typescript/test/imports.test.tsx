import "@alloy-js/core/testing";
import { expect, it } from "vitest";
import { render, Output, SourceDirectory, refkey } from "@alloy-js/core";
import * as ts from "../src/components/index.js";
import { Reference } from "../src/components/Reference.js";
import { assertFileContents } from "./utils.js";
import { tsNameConflictResolver } from "../src/name-conflict-resolver.js";

it("works with default imports", () => {
  const res = render(
    <Output>
      <ts.SourceFile path="test1.ts">
        <ts.FunctionDeclaration export default name="asdf" refkey={refkey("test")} />
      </ts.SourceFile>

      <ts.SourceFile path="test2.ts">
        const v = <Reference refkey={refkey("test")} />;
      </ts.SourceFile>
    </Output>,
  );

  assertFileContents(res, {
    "test1.ts": `
      export default function asdf() {
        
      }
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
        <ts.FunctionDeclaration export name="test" />
      </ts.SourceFile>

      <ts.SourceFile path="test2.ts">
        const v = <Reference refkey={refkey("test")} />;
      </ts.SourceFile>
    </Output>,
  );

  assertFileContents(res, {
    "test1.ts": `
      export function test() {
        
      }
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
        <ts.FunctionDeclaration export default name="test1" />
        <ts.FunctionDeclaration export name="test2" />
      </ts.SourceFile>

      <ts.SourceFile path="test2.ts">
        const v1 = <Reference refkey={refkey("test1")} />;
        const v2 = <Reference refkey={refkey("test2")} />;
      </ts.SourceFile>
    </Output>,
  );

  assertFileContents(res, {
    "test1.ts": `
      export default function test1() {
        
      }
      export function test2() {
        
      }
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
        <ts.FunctionDeclaration export default name="test1" />
        <ts.FunctionDeclaration export name="test2" />
      </ts.SourceFile>

      <ts.SourceFile path="test2.ts">
        <ts.FunctionDeclaration export default name="test1" refkey={refkey("test3")} />
        <ts.FunctionDeclaration export name="test2" refkey={refkey("test4")} />
      </ts.SourceFile>

      <ts.SourceFile path="test3.ts">
        const v1 = <Reference refkey={refkey("test1")} />;
        const v1_1 = <Reference refkey={refkey("test2")}/>;
        const v2 = <Reference refkey={refkey("test3")} />;
        const v3 = <Reference refkey={refkey("test3")}/>;
        const v4 = <Reference refkey={refkey("test4")} />;
      </ts.SourceFile>
    </Output>,
  );

  assertFileContents(res, {
    "test1.ts": `
      export default function test1() {
        
      }
      export function test2() {
        
      }
    `,
    "test2.ts": `
      export default function test1() {
        
      }
      export function test2() {
        
      }
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

it("works with imports from different directories", () => {
  const res = render(
    <Output>
      <SourceDirectory path="src">
        <ts.SourceFile path="test1.ts">
          <ts.FunctionDeclaration export name="test" />
          const v = <Reference refkey={refkey("test2")} />
        </ts.SourceFile>
      </SourceDirectory>

      <ts.SourceFile path="test2.ts">
        const v = <Reference refkey={refkey("test")} />;
        <ts.FunctionDeclaration export name="test2" />
      </ts.SourceFile>
    </Output>,
  );

  assertFileContents(res, {
    "src/test1.ts": `
      import { test2 } from "../test2.js";

      export function test() {
        
      }
      const v = test2
    `,
    "test2.ts": `
      import { test } from "./src/test1.js";

      const v = test;
      export function test2() {
        
      }
    `,
  });
});

it("handles conflicts with local declarations", () => {
  const res = render(
    <Output nameConflictResolver={tsNameConflictResolver}>
      <SourceDirectory path="src">
        <ts.SourceFile path="test1.ts">
          <ts.FunctionDeclaration export name="test" />
          const v = <Reference refkey={refkey("test2")} />
        </ts.SourceFile>
      </SourceDirectory>

      <ts.SourceFile path="test2.ts">
        const v = <Reference refkey={refkey("test")} />;
        <ts.FunctionDeclaration export name="test" />
      </ts.SourceFile>
    </Output>,
  );

  assertFileContents(res, {
    "test2.ts": `
      import { test as test_1 } from "./src/test1.js";

      const v = test_1;
      export function test() {
        
      }
    `,
  });
});
