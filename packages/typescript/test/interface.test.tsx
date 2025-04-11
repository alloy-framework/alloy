import {
  NamePolicyContext,
  Props,
  refkey,
  StatementList,
} from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import * as ts from "../src/components/index.js";
import { ParameterDescriptor } from "../src/components/index.js";
import { InterfaceMethod } from "../src/components/InterfaceMethod.jsx";
import { Reference } from "../src/components/Reference.js";
import { createTSNamePolicy } from "../src/name-policy.js";
import { toSourceText } from "./utils.js";

it("declares interfaces", () => {
  const res = toSourceText(<ts.InterfaceDeclaration name="Foo" />);
  expect(res).toEqual(d`
    interface Foo {}
  `);
});

it("accepts export and default", () => {
  const res = toSourceText(
    <ts.InterfaceDeclaration name="Foo" export default />,
  );
  expect(res).toEqual(d`
    export default interface Foo {}
  `);
});

it("creates extends", () => {
  const res = toSourceText(
    <ts.InterfaceDeclaration name="Foo" extends="string" />,
  );

  expect(res).toEqual(d`
    interface Foo extends string {}
  `);
});

it("can create members", () => {
  const res = toSourceText(
    <ts.InterfaceDeclaration name="Foo" refkey={refkey("Foo")}>
      <StatementList>
        <ts.InterfaceMember name="member" type="string" />
        <ts.InterfaceMember
          name="circular"
          type={<Reference refkey={refkey("Foo")} />}
        />
        <ts.InterfaceMember indexer="str: string" type="number" />
      </StatementList>
    </ts.InterfaceDeclaration>,
  );

  expect(res).toEqual(d`
    interface Foo {
      member: string;
      circular: Foo;
      [str: string]: number;
    }
  `);
});

it("can create optional members", () => {
  const res = toSourceText(
    <ts.InterfaceDeclaration name="Foo" refkey={refkey("Foo")}>
      <StatementList>
        <ts.InterfaceMember name="member" type="string" />
        <ts.InterfaceMember
          optional
          name="circular"
          type={<Reference refkey={refkey("Foo")} />}
        />
        <ts.InterfaceMember indexer="str: string" type="number" />
      </StatementList>
    </ts.InterfaceDeclaration>,
  );

  expect(res).toEqual(d`
    interface Foo {
      member: string;
      circular?: Foo;
      [str: string]: number;
    }
  `);
});

it("can create readonly members", () => {
  const res = toSourceText(
    <ts.InterfaceDeclaration name="Foo" refkey={refkey("Foo")}>
      <StatementList>
        <ts.InterfaceMember readonly name="member" type="string" />
        <ts.InterfaceMember
          name="circular"
          type={<Reference refkey={refkey("Foo")} />}
        />
        <ts.InterfaceMember indexer="str: string" type="number" />
      </StatementList>
    </ts.InterfaceDeclaration>,
  );

  expect(res).toEqual(d`
    interface Foo {
      readonly member: string;
      circular: Foo;
      [str: string]: number;
    }
  `);
});

it("has interface expressions", () => {
  const res = toSourceText(
    <ts.InterfaceExpression>
      <ts.InterfaceMember name="member" type="string" />;
    </ts.InterfaceExpression>,
  );

  expect(res).toEqual(d`
    {
      member: string;
    }
  `);
});

it("supports the naming policy", () => {
  const policy = createTSNamePolicy();
  const res = toSourceText(
    <NamePolicyContext.Provider value={policy}>
      <ts.InterfaceDeclaration name="interface_name">
        <ts.InterfaceMember name="member_property" type="string" />;
      </ts.InterfaceDeclaration>
    </NamePolicyContext.Provider>,
  );
  expect(res).toEqual(d`
    interface InterfaceName {
      memberProperty: string;
    }
  `);
});

it("handles invalid identifier names", () => {
  const res = toSourceText(
    <ts.InterfaceExpression>
      <ts.InterfaceMember name="invalid-name" type="string" />;
    </ts.InterfaceExpression>,
  );

  expect(res).toEqual(d`
    {
      "invalid-name": string;
    }
  `);
});

describe("method members", () => {
  it("render basic", () => {
    expect(toSourceText(<InterfaceMethod name="foo" />)).toBe(d`
      foo(): void
    `);
  });

  it("render in interface", () => {
    expect(
      toSourceText(
        <ts.InterfaceDeclaration name="Foo">
          <InterfaceMethod name="foo" />
        </ts.InterfaceDeclaration>,
      ),
    ).toBe(d`
      interface Foo {
        foo(): void
      }
    `);
  });

  it("can be an async function", () => {
    expect(toSourceText(<InterfaceMethod async name="foo" />)).toBe(d`
     async foo(): Promise<void>
  `);
  });

  it("can be an async function with returnType", () => {
    expect(toSourceText(<InterfaceMethod async name="foo" returnType="Foo" />))
      .toBe(d`
    async foo(): Promise<Foo>
  `);
  });

  it("can be an async function with returnType element", () => {
    function Foo(_props?: Props) {
      return <>Foo</>;
    }
    expect(
      toSourceText(<InterfaceMethod async name="foo" returnType={<Foo />} />),
    ).toBe(d`
    async foo(): Promise<Foo>
  `);
  });

  it("supports parameters by element", () => {
    const decl = (
      <InterfaceMethod name="foo">
        <InterfaceMethod.Parameters>a, b</InterfaceMethod.Parameters>
      </InterfaceMethod>
    );

    expect(toSourceText(decl)).toBe(d`
    foo(a, b): void
  `);
  });

  it("supports type parameters by descriptor object", () => {
    const decl = (
      <InterfaceMethod
        name="foo"
        typeParameters={[
          { name: "a", extends: "any" },
          { name: "b", extends: "any" },
        ]}
      ></InterfaceMethod>
    );

    expect(toSourceText(decl)).toBe(d`
    foo<a extends any, b extends any>(): void
  `);
  });

  it("supports type parameters by descriptor array", () => {
    const decl = (
      <InterfaceMethod name="foo" typeParameters={["a", "b"]}></InterfaceMethod>
    );

    expect(toSourceText(decl)).toBe(d`
    foo<a, b>(): void
  `);
  });

  it("supports type parameters by element", () => {
    const decl = (
      <InterfaceMethod name="foo">
        <InterfaceMethod.TypeParameters>a, b</InterfaceMethod.TypeParameters>
      </InterfaceMethod>
    );

    expect(toSourceText(decl)).toBe(d`
    foo<a, b>(): void
  `);
  });

  describe("symbols", () => {
    it("create optional parameters", () => {
      const paramDesc: ParameterDescriptor = {
        name: "foo",
        refkey: refkey(),
        type: "any",
        optional: true,
      };
      const decl = (
        <>
          <InterfaceMethod
            name="foo"
            parameters={[paramDesc]}
          ></InterfaceMethod>
        </>
      );

      expect(toSourceText(decl)).toBe(d`
      foo(foo?: any): void
    `);
    });
  });
});
