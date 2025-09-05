import { Output, refkey } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { expect, it } from "vitest";
import * as ts from "../src/components/index.js";
import { Reference } from "../src/components/Reference.js";

it("using refkey that is missing declration show info about it", () => {
  const key = refkey("foo");
  expect(
    <Output>
      <ts.SourceFile path="test1.ts">{key}</ts.SourceFile>
    </Output>,
    // cspell:ignore sfoo
  ).toRenderTo(`<Unresolved Symbol: sfoo>`);
});

it("works with back references", () => {
  expect(
    <Output>
      <ts.SourceFile path="test1.ts">
        <ts.Declaration name="foo" nameKind="variable" refkey={refkey("foo")}>
          const foo = 1;
        </ts.Declaration>
      </ts.SourceFile>

      <ts.SourceFile path="test2.ts">
        const v = <Reference refkey={refkey("foo")} />;
      </ts.SourceFile>
    </Output>,
  ).toRenderTo({
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
  expect(
    <Output>
      <ts.SourceFile path="test2.ts">
        const v = <Reference refkey={refkey("foo")} />;
      </ts.SourceFile>
      <ts.SourceFile path="test1.ts">
        <ts.Declaration nameKind="variable" name="foo" refkey={refkey("foo")}>
          const foo = 1;
        </ts.Declaration>
      </ts.SourceFile>
    </Output>,
  ).toRenderTo({
    "test1.ts": `
      const foo = 1;
    `,
    "test2.ts": `
      import { foo } from "./test1.js";
      
      const v = foo;
    `,
  });
});
