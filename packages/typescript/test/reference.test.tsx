import { Declaration, Output, refkey, render } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { it } from "vitest";
import * as ts from "../src/components/index.js";
import { Reference } from "../src/components/Reference.js";
import { assertFileContents } from "./utils.js";

it("works with back references", () => {
  const res = render(
    <Output>
      <ts.SourceFile path="test1.ts">
        <Declaration name="foo">
          const foo = 1;
        </Declaration>
      </ts.SourceFile>

      <ts.SourceFile path="test2.ts">
        const v = <Reference refkey={refkey("foo")} />;
      </ts.SourceFile>
    </Output>,
  );

  assertFileContents(res, {
    "test1.ts": `
      const foo = 1;
    `,
    "test2.ts": `
      import { foo } from "./test1.js";

      const v = foo;
    `,
  });
});

it("works with forward references", () => {
  const res = render(
    <Output>
      <ts.SourceFile path="test2.ts">
        const v = <Reference refkey={refkey("foo")} />;
      </ts.SourceFile>
      <ts.SourceFile path="test1.ts">
        <Declaration name="foo">
          const foo = 1;
        </Declaration>
      </ts.SourceFile>
    </Output>,
  );

  assertFileContents(res, {
    "test1.ts": `
      const foo = 1;
    `,
    "test2.ts": `
      import { foo } from "./test1.js";
      
      const v = foo;
    `,
  });
});
