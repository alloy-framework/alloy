import { Output, refkey } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";

import * as ts from "../src/index.js";

it("renders an enum with enum children", () => {
  expect(
    <Output>
      <ts.SourceFile path="foo.ts">
        <ts.EnumDeclaration name="MyEnum">
          <ts.EnumMember name="foo" value="1" />,
          <ts.EnumMember name="bar" value="2" />
        </ts.EnumDeclaration>
      </ts.SourceFile>
    </Output>,
  ).toRenderTo(`
    enum MyEnum {
      foo = 1,
      bar = 2
    }
  `);
});

it("renders an enum with enum children specifying JS Value", () => {
  expect(
    <Output>
      <ts.SourceFile path="foo.ts">
        <ts.EnumDeclaration name="MyEnum">
          <ts.EnumMember name="foo" jsValue="1" />,
          <ts.EnumMember name="bar" jsValue={2} />
        </ts.EnumDeclaration>
      </ts.SourceFile>
    </Output>,
  ).toRenderTo(`
    enum MyEnum {
      foo = "1",
      bar = 2
    }
  `);
});

it("renders an enum given a JS value", () => {
  const members = {
    foo: 1,
    bar: 2,
  };

  expect(
    <Output>
      <ts.SourceFile path="foo.ts">
        <ts.EnumDeclaration name="MyEnum" jsValue={members} />
      </ts.SourceFile>
    </Output>,
  ).toRenderTo(`
    enum MyEnum {
      foo = 1,
      bar = 2
    }
  `);
});

it("renders an enum given a JS value and children", () => {
  const members = {
    foo: 1,
    bar: 2,
  };

  expect(
    <Output>
      <ts.SourceFile path="foo.ts">
        <ts.EnumDeclaration name="MyEnum" jsValue={members}>
          custom = "hello"
        </ts.EnumDeclaration>
      </ts.SourceFile>
    </Output>,
  ).toRenderTo(`
    enum MyEnum {
      foo = 1,
      bar = 2,
      custom = "hello"
    }
  `);
});

it("uses the naming policy", () => {
  const members = {
    "foo-prop": 1,
    "bar-prop": 2,
  };

  const policy = ts.createTSNamePolicy();

  expect(
    <Output namePolicy={policy}>
      <ts.SourceFile path="foo.ts">
        <ts.EnumDeclaration name="my-enum" jsValue={members} />
      </ts.SourceFile>
    </Output>,
  ).toRenderTo(`
    enum MyEnum {
      FooProp = 1,
      BarProp = 2
    }
  `);
});

describe("symbols", () => {
  it("can reference enum members by refkey", () => {
    const memberOne = refkey();

    expect(
      <Output>
        <ts.SourceFile path="foo.ts">
          <ts.EnumDeclaration name="MyEnum">
            <ts.EnumMember name="foo" jsValue="1" refkey={memberOne} />,
            <ts.EnumMember name="bar" jsValue={2} />
          </ts.EnumDeclaration>

          {memberOne};
        </ts.SourceFile>
      </Output>,
    ).toRenderTo(`
      enum MyEnum {
        foo = "1",
        bar = 2
      }
      
      MyEnum.foo;
    `);
  });
});
