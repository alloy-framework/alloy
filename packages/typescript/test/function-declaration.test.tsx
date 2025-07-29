import {
  List,
  memberRefkey,
  Props,
  refkey,
  StatementList,
} from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { ClassField } from "../src/components/stc/index.js";
import {
  ClassDeclaration,
  FunctionDeclaration,
  InterfaceDeclaration,
  InterfaceMember,
  VarDeclaration,
} from "../src/index.js";
import { ParameterDescriptor } from "../src/parameter-descriptor.js";
import { toSourceText } from "./utils.js";

it("works", () => {
  expect(toSourceText(<FunctionDeclaration name="foo" />)).toBe(d`
      function foo() {}
    `);
});

it("can be exported", () => {
  expect(toSourceText(<FunctionDeclaration export name="foo" />)).toBe(d`
      export function foo() {}
    `);
});

it("can be a default export", () => {
  expect(toSourceText(<FunctionDeclaration export default name="foo" />))
    .toBe(d`
      export default function foo() {}
    `);
});

it("can be an async function", () => {
  expect(toSourceText(<FunctionDeclaration async export name="foo" />)).toBe(d`
    export async function foo() {}
  `);
});

it("can be an async function with returnType", () => {
  expect(
    toSourceText(
      <FunctionDeclaration async export name="foo" returnType="Foo" />,
    ),
  ).toBe(d`
    export async function foo(): Promise<Foo> {}
  `);
});

it("can be an async function with returnType element", () => {
  function Foo(_props?: Props) {
    return <>Foo</>;
  }
  expect(
    toSourceText(
      <FunctionDeclaration async export name="foo" returnType={<Foo />} />,
    ),
  ).toBe(d`
    export async function foo(): Promise<Foo> {}
  `);
});

it("supports parameters by element", () => {
  const decl = (
    <FunctionDeclaration name="foo">
      return a + b;
      <FunctionDeclaration.Parameters>a, b</FunctionDeclaration.Parameters>
    </FunctionDeclaration>
  );

  expect(toSourceText(decl)).toBe(d`
    function foo(a, b) {
      return a + b;
    }
  `);
});

it("supports type parameters by descriptor object", () => {
  const decl = (
    <FunctionDeclaration
      name="foo"
      typeParameters={[
        { name: "a", extends: "any" },
        { name: "b", extends: "any" },
      ]}
    ></FunctionDeclaration>
  );

  expect(toSourceText(decl)).toBe(d`
    function foo<a extends any, b extends any>() {}
  `);
});

it("supports type parameters by descriptor array", () => {
  const decl = (
    <FunctionDeclaration
      name="foo"
      typeParameters={["a", "b"]}
    ></FunctionDeclaration>
  );

  expect(toSourceText(decl)).toBe(d`
    function foo<a, b>() {}
  `);
});

it("supports type parameters by element", () => {
  const decl = (
    <FunctionDeclaration name="foo">
      <FunctionDeclaration.TypeParameters>
        a, b
      </FunctionDeclaration.TypeParameters>
    </FunctionDeclaration>
  );

  expect(toSourceText(decl)).toBe(d`
    function foo<a, b>() {}
  `);
});

it("do not add an extra comma when there is no parameters", () => {
  expect(
    toSourceText(
      <FunctionDeclaration name="thisFunctionNameIsTooLongSoTheFormatterWillInsertLineBreakAndIfBreakNodes"></FunctionDeclaration>,
    ),
  ).toBe(d`
    function thisFunctionNameIsTooLongSoTheFormatterWillInsertLineBreakAndIfBreakNodes() {

    }
  `);
});

describe("symbols", () => {
  it("creates a nested scope", () => {
    const innerRefkey = refkey();
    const outerRefkey = refkey();
    const decl = (
      <StatementList>
        <FunctionDeclaration name="foo">
          <StatementList>
            {innerRefkey}
            <VarDeclaration name="refme" refkey={innerRefkey}>
              1
            </VarDeclaration>
          </StatementList>
        </FunctionDeclaration>
        <VarDeclaration name="refme" refkey={outerRefkey}>
          2
        </VarDeclaration>
        {outerRefkey}
      </StatementList>
    );
    expect(toSourceText(decl)).toBe(d`
      function foo() {
        refme;
        const refme = 1;
      };
      const refme = 2;
      refme;
    `);
  });

  it("throws an error when trying to access a symbol in a nested function scope", () => {
    const innerRefkey = refkey();
    const decl = (
      <>
        <FunctionDeclaration name="foo">
          <VarDeclaration name="refme" refkey={innerRefkey}>
            1
          </VarDeclaration>
        </FunctionDeclaration>
        ;{innerRefkey}
      </>
    );
    expect(() => toSourceText(decl)).toThrow(/Cannot reference a symbol/);
  });

  it("creates symbols for parameters", () => {
    const rk = refkey();

    const decl = (
      <>
        <FunctionDeclaration
          name="foo"
          parameters={[{ name: "sym", type: "any", refkey: rk }]}
        >
          <FunctionDeclaration name="bar">{rk}</FunctionDeclaration>
        </FunctionDeclaration>
      </>
    );

    expect(toSourceText(decl)).toBe(d`
      function foo(sym: any) {
        function bar() {
          sym
        }
      }
    `);
  });

  it("creates symbols for parameters and addresses conflicts", () => {
    const decl = (
      <>
        <FunctionDeclaration
          name="foo"
          parameters={[{ name: "conflict", type: "any" }]}
        >
          <VarDeclaration name="conflict">1</VarDeclaration>;
        </FunctionDeclaration>
      </>
    );

    expect(toSourceText(decl)).toBe(d`
      function foo(conflict: any) {
        const conflict_2 = 1;
      }
    `);
  });

  it("create optional parameters", () => {
    const paramDesc: ParameterDescriptor = {
      name: "foo",
      refkey: refkey(),
      type: "any",
      optional: true,
    };
    const decl = (
      <>
        <FunctionDeclaration name="foo" parameters={[paramDesc]}>
          console.log(foo);
        </FunctionDeclaration>
      </>
    );

    expect(toSourceText(decl)).toBe(d`
      function foo(foo?: any) {
        console.log(foo);
      }
    `);
  });

  it("create optional parameters", () => {
    const paramDesc: ParameterDescriptor = {
      name: "foo",
      refkey: refkey(),
      type: "any[]",
      rest: true,
    };
    const decl = (
      <>
        <FunctionDeclaration name="foo" parameters={[paramDesc]}>
          console.log(foo);
        </FunctionDeclaration>
      </>
    );

    expect(toSourceText(decl)).toBe(d`
      function foo(...foo: any[]) {
        console.log(foo);
      }
    `);
  });

  it("creates parameters with default values", () => {
    const paramDesc: ParameterDescriptor = {
      name: "foo",
      refkey: refkey(),
      type: "string",
      default: '"bar"',
    };

    const decl = (
      <>
        <FunctionDeclaration name="foo" parameters={[paramDesc]}>
          console.log(foo);
        </FunctionDeclaration>
      </>
    );

    expect(toSourceText(decl)).toBe(d`
      function foo(foo: string = "bar") {
        console.log(foo);
      }
    `);
  });

  it("correctly renders mixed parameters", () => {
    const params: ParameterDescriptor[] = [
      { name: "a", refkey: refkey(), type: "string" },
      { name: "b", refkey: refkey(), type: "number", optional: true },
      { name: "c", refkey: refkey(), type: "boolean", default: "false" },
      { name: "d", refkey: refkey(), type: "any[]", rest: true },
    ];

    const decl = (
      <FunctionDeclaration name="foo" parameters={params}>
        console.log(a, b, c, d);
      </FunctionDeclaration>
    );

    expect(toSourceText(decl)).toBe(d`
      function foo(a: string, b?: number, c: boolean = false, ...d: any[]) {
        console.log(a, b, c, d);
      }
    `);
  });

  it("adds symbols for members of parameters when a type is provided", () => {
    const ifaceRk = refkey();
    const ifaceMemberRk = refkey();
    const clsRk = refkey();
    const clsMemberRk = refkey();
    const ifaceParamRk = refkey();
    const clsParamRk = refkey();

    const ifaceParam: ParameterDescriptor = {
      name: "ifaceParam",
      refkey: ifaceParamRk,
      type: ifaceRk,
      optional: true,
    };

    const clsParam: ParameterDescriptor = {
      name: "classParam",
      refkey: clsParamRk,
      type: clsRk,
      optional: true,
    };

    const decl = (
      <List doubleHardline>
        <InterfaceDeclaration name="IFace" refkey={ifaceRk}>
          <InterfaceMember name="ifaceProp" refkey={ifaceMemberRk}>
            string
          </InterfaceMember>
        </InterfaceDeclaration>

        <ClassDeclaration name="Class" refkey={clsRk}>
          <ClassField name="classProp" refkey={clsMemberRk}>
            42
          </ClassField>
        </ClassDeclaration>
        <FunctionDeclaration name="fn" parameters={[ifaceParam, clsParam]}>
          <StatementList>
            <>console.log({memberRefkey(ifaceParamRk, ifaceMemberRk)})</>
            <>console.log({memberRefkey(clsParamRk, clsMemberRk)});</>
          </StatementList>
        </FunctionDeclaration>
      </List>
    );

    expect(toSourceText(decl)).toBe(d`
      interface IFace {
        ifaceProp: string
      }

      class Class {
        classProp = 42
      }

      function fn(ifaceParam?: IFace, classParam?: Class) {
        console.log(ifaceParam?.ifaceProp);
        console.log(classParam?.classProp);;
      }
    `);
  });
});
