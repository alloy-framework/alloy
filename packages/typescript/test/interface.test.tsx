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

it("can reference member", () => {
  const ref = refkey("Foo");
  const res = toSourceText(
    <>
      <ts.InterfaceDeclaration name="Foo">
        <ts.InterfaceMember name="prop" type="string" refkey={ref} />
      </ts.InterfaceDeclaration>
      <line />
      <ts.InterfaceDeclaration name="Bar">
        <ts.InterfaceMember name="ref" type={<Reference refkey={ref} />} />
      </ts.InterfaceDeclaration>
    </>,
  );

  expect(res).toEqual(d`
  interface Foo {
    prop: string
  }
  interface Bar {
    ref: Foo["prop"]
  }
`);
});

describe("interface expressions", () => {
  it("basic", () => {
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

  it("nested", () => {
    const res = toSourceText(
      <ts.InterfaceExpression>
        <ts.InterfaceMember name="outer">
          <ts.InterfaceExpression>
            <ts.InterfaceMember name="inner" type="string" />;
          </ts.InterfaceExpression>
        </ts.InterfaceMember>
      </ts.InterfaceExpression>,
    );

    expect(res).toEqual(d`
    {
      outer: {
        inner: string;
      }
    }
  `);
  });

  it("can reference member when nested in a declaration", () => {
    const ref = refkey("Foo");
    const res = toSourceText(
      <>
        <ts.InterfaceDeclaration name="Foo">
          <ts.InterfaceMember name="outer">
            <ts.InterfaceExpression>
              <ts.InterfaceMember name="inner" type="string" refkey={ref} />
            </ts.InterfaceExpression>
          </ts.InterfaceMember>
        </ts.InterfaceDeclaration>
        <line />
        <ts.InterfaceDeclaration name="Bar">
          <ts.InterfaceMember name="ref" type={<Reference refkey={ref} />} />
        </ts.InterfaceDeclaration>
      </>,
    );

    expect(res).toEqual(d`
    interface Foo {
      outer: {
        inner: string
      }
    }
    interface Bar {
      ref: Foo["outer"]["inner"]
    }
  `);
  });
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
    expect(
      toSourceText(
        <ts.InterfaceDeclaration name="Foo">
          <ts.InterfaceMethod name="foo" />
        </ts.InterfaceDeclaration>,
      ),
    ).toBe(d`
      interface Foo {
        foo(): void
      }
    `);
  });

  it("render in interface", () => {
    expect(
      toSourceText(
        <ts.InterfaceDeclaration name="Foo">
          <ts.InterfaceMethod name="foo" />
        </ts.InterfaceDeclaration>,
      ),
    ).toBe(d`
      interface Foo {
        foo(): void
      }
    `);
  });

  it("can be an async function", () => {
    expect(
      toSourceText(
        <ts.InterfaceDeclaration name="Foo">
          <ts.InterfaceMethod async name="foo" />
        </ts.InterfaceDeclaration>,
      ),
    ).toBe(d`
    interface Foo {
      foo(): Promise<void>
    }
  `);
  });

  it("can be an async function with returnType", () => {
    expect(
      toSourceText(
        <ts.InterfaceDeclaration name="Foo">
          <ts.InterfaceMethod async name="foo" returnType="Foo" />
        </ts.InterfaceDeclaration>,
      ),
    ).toBe(d`
    interface Foo {
      foo(): Promise<Foo>
    }
  `);
  });

  it("can be an async function with returnType element", () => {
    function Foo(_props?: Props) {
      return <>Foo</>;
    }
    expect(
      toSourceText(
        <ts.InterfaceDeclaration name="Foo">
          <ts.InterfaceMethod async name="foo" returnType={<Foo />} />
        </ts.InterfaceDeclaration>,
      ),
    ).toBe(d`
    interface Foo {
      foo(): Promise<Foo>
    }
  `);
  });

  it("supports parameters by element", () => {
    const decl = (
      <ts.InterfaceDeclaration name="Foo">
        <ts.InterfaceMethod name="foo">
          <ts.InterfaceMethod.Parameters>a, b</ts.InterfaceMethod.Parameters>
        </ts.InterfaceMethod>
      </ts.InterfaceDeclaration>
    );

    expect(toSourceText(decl)).toBe(d`
    interface Foo {
      foo(a, b): void
    }
  `);
  });

  it("supports type parameters by descriptor object", () => {
    const decl = (
      <ts.InterfaceDeclaration name="Foo">
        <ts.InterfaceMethod
          name="foo"
          typeParameters={[
            { name: "a", extends: "any" },
            { name: "b", extends: "any" },
          ]}
        />
      </ts.InterfaceDeclaration>
    );

    expect(toSourceText(decl)).toBe(d`
    interface Foo {
      foo<a extends any, b extends any>(): void
    }
  `);
  });

  it("supports type parameters by descriptor array", () => {
    const decl = (
      <ts.InterfaceDeclaration name="Foo">
        <ts.InterfaceMethod
          name="foo"
          typeParameters={["a", "b"]}
        ></ts.InterfaceMethod>
      </ts.InterfaceDeclaration>
    );

    expect(toSourceText(decl)).toBe(d`
      interface Foo {
        foo<a, b>(): void
      }
  `);
  });

  it("supports type parameters by element", () => {
    const decl = (
      <ts.InterfaceDeclaration name="Foo">
        <ts.InterfaceMethod name="foo">
          <ts.InterfaceMethod.TypeParameters>
            a, b
          </ts.InterfaceMethod.TypeParameters>
        </ts.InterfaceMethod>
      </ts.InterfaceDeclaration>
    );

    expect(toSourceText(decl)).toBe(d`
    interface Foo {
      foo<a, b>(): void
    }
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
        <ts.InterfaceDeclaration name="Foo">
          <ts.InterfaceMethod name="foo" parameters={[paramDesc]} />
        </ts.InterfaceDeclaration>
      );

      expect(toSourceText(decl)).toBe(d`
      interface Foo {
        foo(foo?: any): void
      }
    `);
    });
  });
});
