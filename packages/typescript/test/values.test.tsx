import {
  mapJoin,
  Output,
  printTree,
  reactive,
  refkey,
  render,
  renderTree,
  StatementList,
} from "@alloy-js/core";
import "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";

import { d } from "@alloy-js/core/testing";
import * as ts from "../src/index.js";
import { assertFileContents } from "./utils.jsx";

it("renders an object", () => {
  expect(<ts.ObjectExpression />).toRenderTo("{}");
});

it("renders an object with properties", () => {
  expect(
    <ts.ObjectExpression>
      <ts.ObjectProperty name="foo" value="1" />,<hbr />
      <ts.ObjectProperty name="bar" value="2" />
    </ts.ObjectExpression>,
  ).toRenderTo(`
    {
      foo: 1,
      bar: 2
    }
  `);
});

it("renders an object with properties, mapped", () => {
  const propValues = new Map([
    ["foo", "1"],
    ["bar", "2"],
  ]);
  const props = mapJoin(
    () => propValues,
    (name, value) => {
      return <ts.ObjectProperty name={name} value={value} />;
    },
    { joiner: ",\n" },
  );

  expect(<ts.ObjectExpression>{props}</ts.ObjectExpression>).toRenderTo(`
    {
      foo: 1,
      bar: 2
    }
  `);
});

it("is reactive", () => {
  const jsValue = reactive(new Map());

  const tree = renderTree(<ts.ObjectExpression jsValue={jsValue} />);

  expect(printTree(tree)).toEqual(`{}`);
  jsValue.set("hi", 1);
  expect(printTree(tree)).toEqual(d`
    {
      hi: 1,
    }
  `);

  jsValue.set("bye", 2);

  expect(printTree(tree)).toEqual(d`
    {
      hi: 1,
      bye: 2,
    }
  `);
});

it("renders objects with arrays", () => {
  const jsValue = {
    a: [1, 2],
  };

  expect(<ts.ObjectExpression jsValue={jsValue} />).toRenderTo(`
    {
      a: [1, 2],
    }
  `);
});

it("renders complex objects", () => {
  const jsValue = {
    a: 1,
    b: "hello",
    c: true,
    d: {
      prop: [1, 2, 3],
    },
  };

  expect(<ts.ObjectExpression jsValue={jsValue} />).toRenderTo(`
    {
      a: 1,
      b: "hello",
      c: true,
      d: {
        prop: [1, 2, 3],
      },
    }
  `);
});

it("renders falsy values", () => {
  const jsValue = {
    a: 0,
    b: "",
    c: false,
    d: null,
    e: undefined,
  };

  expect(<ts.ObjectExpression jsValue={jsValue} />).toRenderTo(`
    {
      a: 0,
      b: "",
      c: false,
      d: null,
      e: undefined,
    }
  `);
});

it("allows embedding things with functions", () => {
  function Foo() {
    return <>a b</>;
  }
  const jsValue = {
    a: () => "hello",
    b: () => <Foo />,
  };

  expect(<ts.ObjectExpression jsValue={jsValue} />).toRenderTo(`
    {
      a: hello,
      b: a b,
    }
  `);
});

describe("symbols", () => {
  it("can reference members", () => {
    const innerRefkey = refkey();
    const outerRefkey = refkey();
    const decl = (
      <Output>
        <ts.SourceFile path="foo.ts">
          <StatementList>
            <ts.VarDeclaration name="refme" refkey={outerRefkey}>
              <ts.ObjectExpression>
                <ts.ObjectProperty
                  name="foo"
                  refkey={innerRefkey}
                  jsValue="hello"
                />
                ,
              </ts.ObjectExpression>
            </ts.VarDeclaration>
            {innerRefkey}
          </StatementList>
        </ts.SourceFile>
      </Output>
    );
    expect(decl).toRenderTo(`
      const refme = {
        foo: "hello",
      };
      refme.foo;
    `);
  });

  it.only("can reference nested members", () => {
    const varRefkey = refkey();
    const fooRefkey = refkey();
    const barRefkey = refkey();
    const decl = (
      <Output>
        <ts.SourceFile path="foo.ts">
          <StatementList>
            <ts.VarDeclaration name="refme" refkey={varRefkey}>
              <ts.ObjectExpression>
                <ts.ObjectProperty name="foo" refkey={fooRefkey}>
                  <ts.ObjectExpression>
                    <ts.ObjectProperty name="bar" refkey={barRefkey}>
                      "hello",
                    </ts.ObjectProperty>
                  </ts.ObjectExpression>
                </ts.ObjectProperty>
              </ts.ObjectExpression>
            </ts.VarDeclaration>
            {barRefkey}
          </StatementList>
        </ts.SourceFile>
      </Output>
    );
    expect(decl).toRenderTo(`
      const refme = {
        foo: {
          bar: "hello",
        }
      };
      refme.foo.bar;
    `);
  });

  it("can reference nested members in other source files", () => {
    const varRefkey = refkey();
    const fooRefkey = refkey();
    const barRefkey = refkey();
    const decl = (
      <Output>
        <ts.SourceFile path="foo.ts">
          <ts.VarDeclaration export name="refme" refkey={varRefkey}>
            <ts.ObjectExpression>
              <ts.ObjectProperty name="foo" refkey={fooRefkey}>
                <ts.ObjectExpression>
                  <ts.ObjectProperty name="bar" refkey={barRefkey}>
                    "hello",
                  </ts.ObjectProperty>
                </ts.ObjectExpression>
              </ts.ObjectProperty>
            </ts.ObjectExpression>
          </ts.VarDeclaration>
        </ts.SourceFile>

        <ts.SourceFile path="bar.ts">console.log({barRefkey});</ts.SourceFile>
      </Output>
    );

    expect(decl).toRenderTo(`
      export const refme = {
        foo: {
          bar: "hello",
        }
      }import { refme } from "./foo.js";

      console.log(refme.foo.bar);
    `);
  });

  it("can reference nested members in other packages", () => {
    const varRefkey = refkey();
    const fooRefkey = refkey();
    const barRefkey = refkey();
    const decl = (
      <Output>
        <ts.PackageDirectory name="SourcePackage" path="sp" version="1.0.0">
          <ts.SourceFile export="." path="foo.ts">
            <ts.VarDeclaration export name="refme" refkey={varRefkey}>
              <ts.ObjectExpression>
                <ts.ObjectProperty name="foo" refkey={fooRefkey}>
                  <ts.ObjectExpression>
                    <ts.ObjectProperty name="bar" refkey={barRefkey}>
                      "hello";
                    </ts.ObjectProperty>
                  </ts.ObjectExpression>
                </ts.ObjectProperty>
              </ts.ObjectExpression>
            </ts.VarDeclaration>
          </ts.SourceFile>
        </ts.PackageDirectory>

        <ts.PackageDirectory name="DepPackage" path="dp" version="1.0.0">
          <ts.SourceFile path="bar.ts">console.log({barRefkey});</ts.SourceFile>
        </ts.PackageDirectory>
      </Output>
    );
    const res = render(decl);
    assertFileContents(res, {
      "dp/bar.ts": `
        import { refme } from "SourcePackage";

        console.log(refme.foo.bar);
      `,
    });
  });
});
