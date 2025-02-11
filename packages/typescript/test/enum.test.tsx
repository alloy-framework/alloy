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
        <ts.EnumDeclaration name="MyEnum" members={members} />
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
        <ts.EnumDeclaration name="MyEnum" members={members}>
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
        <ts.EnumDeclaration name="my-enum" members={members} />
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

describe("docs", () => {
  it("renders an enum given member descriptors", () => {
    const members = {
      foo: { jsValue: 1, doc: "Test Doc 1" } as ts.EnumMemberDescriptor,
      bar: { jsValue: 2, doc: ["Multiline", "Doc"] } as ts.EnumMemberDescriptor,
    };

    expect(
      <Output>
        <ts.SourceFile path="foo.ts">
          <ts.EnumDeclaration name="MyEnum" members={members} />
        </ts.SourceFile>
      </Output>,
    ).toRenderTo(`
      enum MyEnum {
        /** Test Doc 1 */
        foo = 1,
        /**
         * Multiline
         * Doc
         */
        bar = 2
      }
    `);
  });

  it("renders an enum with a single-line doc comment", () => {
    expect(
      <Output>
        <ts.SourceFile path="foo.ts">
          <ts.EnumDeclaration name="MyEnum" doc="This is a test enum">
            <ts.EnumMember name="foo" jsValue={1} />,
            <ts.EnumMember name="bar" jsValue={2} />
          </ts.EnumDeclaration>
        </ts.SourceFile>
      </Output>,
    ).toRenderTo(`
      /** This is a test enum */
      enum MyEnum {
        foo = 1,
        bar = 2
      }
    `);
  });

  it("renders an enum with a multi-line doc comment", () => {
    expect(
      <Output>
        <ts.SourceFile path="foo.ts">
          <ts.EnumDeclaration name="AnotherEnum" doc={["Line one", "Line two"]}>
            <ts.EnumMember name="foo" jsValue={10} />,
            <ts.EnumMember name="bar" jsValue={20} />
          </ts.EnumDeclaration>
        </ts.SourceFile>
      </Output>,
    ).toRenderTo(`
      /**
       * Line one
       * Line two
       */
      enum AnotherEnum {
        foo = 10,
        bar = 20
      }
    `);
  });

  it("renders an enum with a multi-line doc comment, also for members", () => {
    expect(
      <Output>
          <ts.SourceFile path="foo.ts">
            <ts.EnumDeclaration name="AnotherEnum" doc={["Line one", "Line two"]}>
              <ts.EnumMember name="foo" jsValue={10}  doc={"Single line comment"} />,
              <ts.EnumMember name="bar" jsValue={20}  doc={["Multiline", "Comment"]} />
            </ts.EnumDeclaration>
          </ts.SourceFile>
        </Output>,
    ).toRenderTo(`
        /**
         * Line one
         * Line two
         */
        enum AnotherEnum {
          /** Single line comment */
          foo = 10,
          /**
           * Multiline
           * Comment
           */
          bar = 20
        }
      `);
  });
});
