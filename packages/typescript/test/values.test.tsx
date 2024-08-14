import { mapJoin, reactive, renderTree } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { expect, it } from "vitest";

import { d, renderToString } from "@alloy-js/core/testing";
import * as ts from "../src/index.js";

it("renders an object", () => {
  expect(<ts.ObjectExpression />).toRenderTo("{}");
});

it("renders an object with properties", () => {
  expect(
    <ts.ObjectExpression>
      <ts.ObjectProperty name="foo" value="1" />,
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
    propValues,
    (name, value) => {
      return <ts.ObjectProperty name={name} value={value} />;
    },
    { joiner: ",\n" },
  );

  expect(<ts.ObjectExpression>
      {props}
    </ts.ObjectExpression>)
    .toRenderTo(`
    {
      foo: 1,
      bar: 2
    }
  `);
});

it("is reactive", () => {
  const jsValue = reactive(new Map());
  jsValue.set("hi", 1);

  const tree = renderTree(<ts.ObjectExpression jsValue={jsValue} />);

  expect(renderToString(tree)).toEqual(d`
    {
      hi: 1
    }
  `);

  jsValue.set("bye", 2);

  expect(renderToString(tree)).toEqual(d`
    {
      hi: 1,
      bye: 2
    }
  `);
});

it("renders objects with arrays", () => {
  const jsValue = {
    a: [1, 2],
  };

  expect(<ts.ObjectExpression jsValue={jsValue} />).toRenderTo(`
    {
      a: [
        1,
        2
      ]
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
        prop: [
          1,
          2,
          3
        ]
      }
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
      e: undefined
    }
  `);
});

it("allows embedding things with functions", () => {
  function Foo() {
    return <>
      a
      b
    </>;
  }
  const jsValue = {
    a: () => "hello",
    b: () => <Foo />,
  };

  expect(<ts.ObjectExpression jsValue={jsValue} />).toRenderTo(`
    {
      a: hello,
      b: a
      b
    }
  `);
});
