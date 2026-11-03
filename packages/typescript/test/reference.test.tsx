import { For, Output, refkey } from "@alloy-js/core";
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
  ).toRenderTo(`<Unresolved Symbol: refkey[sfoo]>`);
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

it("preserves union members with multipart joiners and forward references", () => {
  const first = refkey();
  const second = refkey();
  const third = refkey();

  expect(
    <Output>
      <ts.SourceFile path="test.ts">
        <ts.TypeDeclaration name="Example">
          <group>
            <For
              each={[first, second, third]}
              joiner={
                <>
                  <br />
                  {"| "}
                </>
              }
            >
              {(key) => key}
            </For>
          </group>
        </ts.TypeDeclaration>
        <hbr />
        <ts.InterfaceDeclaration name="First" refkey={first} />
        <hbr />
        <ts.InterfaceDeclaration name="Second" refkey={second} />
        <hbr />
        <ts.InterfaceDeclaration name="Third" refkey={third} />
      </ts.SourceFile>
    </Output>,
  ).toRenderTo(`
    type Example = First | Second | Third;
    interface First {}
    interface Second {}
    interface Third {}
  `);
});
