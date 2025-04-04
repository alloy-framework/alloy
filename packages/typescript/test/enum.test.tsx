import { Output, refkey } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";

import * as ts from "../src/index.js";

it("renders an enum with only named members, no value", () => {
  expect(
    <Output>
      <ts.SourceFile path="foo.ts">
        <ts.EnumDeclaration name="MyEnum">
          <ts.CommaList>
            <ts.EnumMember name="foo" />
            <ts.EnumMember name="bar" />
          </ts.CommaList>
        </ts.EnumDeclaration>
      </ts.SourceFile>
    </Output>,
  ).toRenderTo(`
    enum MyEnum {
      foo,
      bar,
    }
  `);
});

it("renders enum member with falsy value", () => {
  expect(
    <Output>
      <ts.SourceFile path="foo.ts">
        <ts.EnumDeclaration name="MyEnum">
          <ts.CommaList>
            <ts.EnumMember name="foo" jsValue={0} />
            <ts.EnumMember name="bar" jsValue={""} />
          </ts.CommaList>
        </ts.EnumDeclaration>
      </ts.SourceFile>
    </Output>,
  ).toRenderTo(`
    enum MyEnum {
      foo = 0,
      bar = "",
    }
  `);
});

it("renders an enum with enum children", () => {
  expect(
    <Output>
      <ts.SourceFile path="foo.ts">
        <ts.EnumDeclaration name="MyEnum">
          <ts.CommaList>
            <ts.EnumMember name="foo" value="1" />
            <ts.EnumMember name="bar" value="2" />
          </ts.CommaList>
        </ts.EnumDeclaration>
      </ts.SourceFile>
    </Output>,
  ).toRenderTo(`
    enum MyEnum {
      foo = 1,
      bar = 2,
    }
  `);
});

it("renders an enum with enum children specifying JS Value", () => {
  expect(
    <Output>
      <ts.SourceFile path="foo.ts">
        <ts.EnumDeclaration name="MyEnum">
          <ts.CommaList>
            <ts.EnumMember name="foo" jsValue="1" />
            <ts.EnumMember name="bar" jsValue={2} />
          </ts.CommaList>
        </ts.EnumDeclaration>
      </ts.SourceFile>
    </Output>,
  ).toRenderTo(`
    enum MyEnum {
      foo = "1",
      bar = 2,
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
      bar = 2,
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
      BarProp = 2,
    }
  `);
});

describe("symbols", () => {
  it("can reference enum members by refkey", () => {
    const memberOne = refkey();
    const memberTwo = refkey();

    expect(
      <Output>
        <ts.SourceFile path="foo.ts">
          <ts.EnumDeclaration name="MyEnum">
            <ts.CommaList>
              <ts.EnumMember name="foo" jsValue="1" refkey={memberOne} />
              <ts.EnumMember
                name="mangled-name"
                jsValue={2}
                refkey={memberTwo}
              />
            </ts.CommaList>
          </ts.EnumDeclaration>
          <hbr />
          {memberOne};<hbr />
          {memberTwo};
        </ts.SourceFile>
      </Output>,
    ).toRenderTo(`
      enum MyEnum {
        foo = "1",
        "mangled-name" = 2,
      }
      MyEnum.foo;
      MyEnum["mangled-name"];
    `);
  });
});
