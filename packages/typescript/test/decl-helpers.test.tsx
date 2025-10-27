import { code, namekey, Output } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import * as ts from "../src/index.js";
import { decl, declMember, declType } from "../src/symbols/index.js";

it("declares variables", () => {
  const hi = namekey("hi");

  expect(
    <Output>
      <ts.SourceFile path="test1.ts">
        {code`
          const ${decl(hi)} = 12;
          console.log(${hi});
        `}
      </ts.SourceFile>
      <ts.SourceFile path="test2.ts">{hi};</ts.SourceFile>
    </Output>,
  ).toRenderTo({
    "test1.ts": d`
      const hi = 12;
      console.log(hi);
    `,
    "test2.ts": d`
      import { hi } from "./test1.js";

      hi;
    `,
  });
});

it("declares types", () => {
  const hi = namekey("hi");

  expect(
    <Output>
      <ts.SourceFile path="test1.ts">
        {code`
          interface ${declType(hi)} {
            value: number;
          }
        `}
      </ts.SourceFile>
      <ts.SourceFile path="test2.ts">
        <ts.VarDeclaration name="test" type={hi} />
      </ts.SourceFile>
    </Output>,
  ).toRenderTo({
    "test1.ts": d`
      interface hi {
        value: number;
      }
    `,
    "test2.ts": d`
      import type { hi } from "./test1.js";

      const test: hi
    `,
  });
});

it("declares variables", () => {
  const hi = namekey("hi");

  expect(
    <Output>
      <ts.SourceFile path="test1.ts">
        {code`
          interface ${declType(hi)} {
            value: number;
          }
        `}
      </ts.SourceFile>
      <ts.SourceFile path="test2.ts">
        <ts.VarDeclaration name="test" type={hi} />
      </ts.SourceFile>
    </Output>,
  ).toRenderTo({
    "test1.ts": d`
      interface hi {
        value: number;
      }
    `,
    "test2.ts": d`
      import type { hi } from "./test1.js";

      const test: hi
    `,
  });
});

it("declares members", () => {
  const publicMember = namekey("publicMember");
  const privateMember = namekey("privateMember");
  const staticMethod = namekey("staticMethod");
  expect(
    <Output>
      <ts.SourceFile path="test1.ts">
        <ts.ClassDeclaration name="Foo">
          {code`
            public ${declMember(publicMember)} = 12;
            #${declMember(privateMember, { jsPrivate: true })} = 34;
            constructor() {
              ${publicMember} = 24;
              ${privateMember} = 10;
            }
          `}
          <hbr />
          static ${declMember(staticMethod, { static: true })}() {"{}"};
        </ts.ClassDeclaration>
        <hbr />
        {staticMethod}();
      </ts.SourceFile>
    </Output>,
  ).toRenderTo(d`
    class Foo {
      public publicMember = 12;
      #privateMember = 34;
      constructor() {
        this.publicMember = 24;
        this.#privateMember = 10;
      }
      static $staticMethod() {};
    }
    Foo.staticMethod();
  `);
});
