import { namekey, NamePolicyContext, Props, refkey, StatementList } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import * as ts from "../src/components/index.js";
import { ParameterDescriptor } from "../src/components/index.js";
import { Reference } from "../src/components/Reference.js";
import { createTSNamePolicy } from "../src/name-policy.js";
import { TestFile } from "./utils.js";

it("declares interfaces", () => {
  const res = (
    <TestFile>
        <ts.InterfaceDeclaration name="Foo" />
    </TestFile>
  );
  expect(res).toRenderTo(`
    interface Foo {}
  `);
});

it("accepts export and default", () => {
  const res = (
    <TestFile>
        <ts.InterfaceDeclaration name="Foo" export default />
    </TestFile>
  );
  expect(res).toRenderTo(`
    export default interface Foo {}
  `);
});

it("creates extends", () => {
  const res = (
    <TestFile>
        <ts.InterfaceDeclaration name="Foo" extends="string" />
    </TestFile>
  );

  expect(res).toRenderTo(`
    interface Foo extends string {}
  `);
});

it("can create members", () => {
  const res = (
    <TestFile>
        <ts.InterfaceDeclaration name="Foo" refkey={refkey("Foo")}>
      <StatementList>
        <ts.InterfaceMember name="member" type="string" />
        <ts.InterfaceMember
          name="circular"
          type={<Reference refkey={refkey("Foo")} />}
        />
        <ts.InterfaceMember indexer="str: string" type="number" />
      </StatementList>
    </ts.InterfaceDeclaration>
    </TestFile>
  );

  expect(res).toRenderTo(`
    interface Foo {
      member: string;
      circular: Foo;
      [str: string]: number;
    }
  `);
});

it("can create optional members", () => {
  const res = (
    <TestFile>
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
    </ts.InterfaceDeclaration>
    </TestFile>
  );

  expect(res).toRenderTo(`
    interface Foo {
      member: string;
      circular?: Foo;
      [str: string]: number;
    }
  `);
});

it("can create readonly members", () => {
  const res = (
    <TestFile>
        <ts.InterfaceDeclaration name="Foo" refkey={refkey("Foo")}>
      <StatementList>
        <ts.InterfaceMember readonly name="member" type="string" />
        <ts.InterfaceMember
          name="circular"
          type={<Reference refkey={refkey("Foo")} />}
        />
        <ts.InterfaceMember readonly indexer="str: string" type="number" />
      </StatementList>
    </ts.InterfaceDeclaration>
    </TestFile>
  );

  expect(res).toRenderTo(`
    interface Foo {
      readonly member: string;
      circular: Foo;
      readonly [str: string]: number;
    }
  `);
});

it("can reference member", () => {
  const ref = refkey("Foo");
  const res = (
    <TestFile>
      <ts.InterfaceDeclaration name="Foo">
        <ts.InterfaceMember name="prop" type="string" refkey={ref} />
      </ts.InterfaceDeclaration>
      <line />
      <ts.InterfaceDeclaration name="Bar">
        <ts.InterfaceMember name="ref" type={<Reference refkey={ref} />} />
      </ts.InterfaceDeclaration>
    </TestFile>
  );

  expect(res).toRenderTo(`
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
    const res = (
      <TestFile>
          <ts.InterfaceExpression>
        <ts.InterfaceMember name="member" type="string" />;
      </ts.InterfaceExpression>
      </TestFile>
    );

    expect(res).toRenderTo(`
    {
      member: string;
    }
  `);
  });

  it("nested", () => {
    const res = (
      <TestFile>
          <ts.InterfaceExpression>
        <ts.InterfaceMember name="outer">
          <ts.InterfaceExpression>
            <ts.InterfaceMember name="inner" type="string" />;
          </ts.InterfaceExpression>
        </ts.InterfaceMember>
      </ts.InterfaceExpression>
      </TestFile>
    );

    expect(res).toRenderTo(`
    {
      outer: {
        inner: string;
      }
    }
  `);
  });

  it("can reference member when nested in a declaration", () => {
    const ref = refkey("Foo");
    const res = (
      <TestFile>
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
      </TestFile>
    );

    expect(res).toRenderTo(`
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
  const res = (
    <TestFile>
        <NamePolicyContext.Provider value={policy}>
      <ts.InterfaceDeclaration name="interface_name">
        <ts.InterfaceMember name="member_property" type="string" />;
      </ts.InterfaceDeclaration>
    </NamePolicyContext.Provider>
    </TestFile>
  );
  expect(res).toRenderTo(`
    interface InterfaceName {
      memberProperty: string;
    }
  `);
});

it("handles invalid identifier names", () => {
  const res = (
    <TestFile>
        <ts.InterfaceExpression>
      <ts.InterfaceMember name="invalid-name" type="string" />;
    </ts.InterfaceExpression>
    </TestFile>
  );

  expect(res).toRenderTo(`
    {
      "invalid-name": string;
    }
  `);
});

it("accepts type parameters by descriptors", () => {
  const typeParams: ts.TypeParameterDescriptor[] = [
    { name: "T", refkey: refkey() },
    { name: "U", extends: "number", refkey: refkey() },
    { name: "V", default: "object", refkey: refkey() },
    { name: "W", extends: "string", default: '"test"', refkey: refkey() },
  ];

  const res = (
    <TestFile>
        <ts.InterfaceDeclaration name="Foo" typeParameters={typeParams}>
      <ts.InterfaceMember name="member" type={typeParams[0].refkey} />;
      <hbr />
      <ts.InterfaceMember name="member2" type={typeParams[1].refkey} />;
      <hbr />
      <ts.InterfaceMember name="member3" type={typeParams[2].refkey} />;
      <hbr />
      <ts.InterfaceMember name="member4" type={typeParams[3].refkey} />;
    </ts.InterfaceDeclaration>
    </TestFile>
  );

  expect(res).toRenderTo(`
    interface Foo<T, U extends number, V = object, W extends string = "test"> {
      member: T;
      member2: U;
      member3: V;
      member4: W;
    }
  `);
});

it("accepts type parameters with extends", () => {
  const res = (
    <TestFile>
        <ts.InterfaceDeclaration name="Foo" typeParameters={["T"]} extends="Bar">
      <ts.InterfaceMember name="member" type="T" />;
    </ts.InterfaceDeclaration>
    </TestFile>
  );

  expect(res).toRenderTo(`
    interface Foo<T> extends Bar {
      member: T;
    }
  `);
});

it("accepts type parameters children", () => {
  const res = (
    <TestFile>
        <ts.InterfaceDeclaration name="Foo">
      <ts.InterfaceDeclaration.TypeParameters>
        T, U extends number, V = object, W extends string = "test"
      </ts.InterfaceDeclaration.TypeParameters>
      <ts.InterfaceMember name="member" type={"T"} />;
      <hbr />
      <ts.InterfaceMember name="member2" type="U" />;
      <hbr />
      <ts.InterfaceMember name="member3" type="V" />;
      <hbr />
      <ts.InterfaceMember name="member4" type="W" />;
    </ts.InterfaceDeclaration>
    </TestFile>
  );

  expect(res).toRenderTo(`
    interface Foo<T, U extends number, V = object, W extends string = "test"> {
      member: T;
      member2: U;
      member3: V;
      member4: W;
    }
  `);
});

it("takes namekeys for all its elements", () => {
  const ifaceKey = namekey("Foo");
  const TKey = namekey("T");
  const memberKey = namekey("member");

  const res = (
    <TestFile>
      <ts.InterfaceDeclaration
        name={ifaceKey}
        typeParameters={[{ name: TKey }]}
      >
        <ts.InterfaceMember name={memberKey} type={TKey} />;
      </ts.InterfaceDeclaration>
      <hbr />
      {ifaceKey};<hbr />
      {memberKey};
    </TestFile>
  );

  expect(res).toRenderTo(`
    interface Foo<T> {
      member: T;
    }
    Foo;
    Foo["member"];
  `);
});

describe("method members", () => {
  it("render basic", () => {
    expect(
      (
        <TestFile>
            <ts.InterfaceDeclaration name="Foo">
          <ts.InterfaceMethod name="foo" />
        </ts.InterfaceDeclaration>
        </TestFile>
      ),
    ).toRenderTo(`
      interface Foo {
        foo(): void
      }
    `);
  });

  it("render in interface", () => {
    expect(
      (
        <TestFile>
            <ts.InterfaceDeclaration name="Foo">
          <ts.InterfaceMethod name="foo" />
        </ts.InterfaceDeclaration>
        </TestFile>
      ),
    ).toRenderTo(`
      interface Foo {
        foo(): void
      }
    `);
  });

  it("can be an async function", () => {
    expect(
      (
        <TestFile>
            <ts.InterfaceDeclaration name="Foo">
          <ts.InterfaceMethod async name="foo" />
        </ts.InterfaceDeclaration>
        </TestFile>
      ),
    ).toRenderTo(`
    interface Foo {
      foo(): Promise<void>
    }
  `);
  });

  it("can be an async function with returnType", () => {
    expect(
      (
        <TestFile>
            <ts.InterfaceDeclaration name="Foo">
          <ts.InterfaceMethod async name="foo" returnType="Foo" />
        </ts.InterfaceDeclaration>
        </TestFile>
      ),
    ).toRenderTo(`
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
      (
        <TestFile>
            <ts.InterfaceDeclaration name="Foo">
          <ts.InterfaceMethod async name="foo" returnType={<Foo />} />
        </ts.InterfaceDeclaration>
        </TestFile>
      ),
    ).toRenderTo(`
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

    expect((
      <TestFile>
          {decl}
      </TestFile>
    )).toRenderTo(`
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

    expect((
      <TestFile>
          {decl}
      </TestFile>
    )).toRenderTo(`
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

    expect((
      <TestFile>
          {decl}
      </TestFile>
    )).toRenderTo(`
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

    expect((
      <TestFile>
          {decl}
      </TestFile>
    )).toRenderTo(`
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

      expect((
        <TestFile>
            {decl}
        </TestFile>
      )).toRenderTo(`
      interface Foo {
        foo(foo?: any): void
      }
    `);
    });
  });
});
