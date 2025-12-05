import { refkey } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import * as py from "../src/index.js";
import {
  assertFileContents,
  toSourceText,
  toSourceTextMultiple,
} from "./utils.jsx";

describe("UnionTypeExpression", () => {
  it("renders a Python union expression - 1 item", () => {
    expect(
      toSourceText([<py.UnionTypeExpression children={["int"]} />]),
    ).toRenderTo("int");
  });
  it("renders a Python union expression - 2 items", () => {
    expect(
      toSourceText([<py.UnionTypeExpression children={["int", "str"]} />]),
    ).toRenderTo("int | str");
  });
  it("renders a Python union expression - N items", () => {
    expect(
      toSourceText([
        <py.UnionTypeExpression
          children={[
            "int",
            "str",
            "float",
            "bool",
            "list",
            "dict",
            "set",
            "tuple",
            "frozenset",
            "bytes",
            "bytearray",
            "memoryview",
            "complex",
          ]}
        />,
      ]),
    ).toRenderTo(d`
        (
            int
            | str
            | float
            | bool
            | list
            | dict
            | set
            | tuple
            | frozenset
            | bytes
            | bytearray
            | memoryview
            | complex
        )`);
  });
  it("renders a Python union expression - 2 items again", () => {
    expect(
      toSourceText([<py.UnionTypeExpression children={["int", "str"]} />]),
    ).toRenderTo("int | str");
  });
  it("renders a Python union expression - 2 items with None", () => {
    expect(
      toSourceText([
        <py.UnionTypeExpression children={["int", "str", "None"]} />,
      ]),
    ).toRenderTo("int | str | None");
  });

  it("renders a Python union with generic types", () => {
    expect(
      toSourceText([
        <py.UnionTypeExpression
          children={[
            <py.TypeReference name="list" typeArgs={["int"]} />,
            <py.TypeReference name="dict" typeArgs={["str", "int"]} />,
          ]}
        />,
      ]),
    ).toRenderTo("list[int] | dict[str, int]");
  });

  it("renders a Python type expression with references", () => {
    const classRefkey = refkey();
    const otherClassRefkey = refkey();

    expect(
      toSourceText([
        <py.StatementList>
          <py.ClassDeclaration
            name="Bar"
            refkey={classRefkey}
          ></py.ClassDeclaration>
          <py.ClassDeclaration
            name="Foo"
            refkey={otherClassRefkey}
          ></py.ClassDeclaration>
          <py.UnionTypeExpression
            children={[
              <py.Reference refkey={classRefkey} />,
              <py.Reference refkey={otherClassRefkey} />,
            ]}
          />
        </py.StatementList>,
      ]),
    ).toRenderTo(d`
        class Bar:
            pass

        class Foo:
            pass

        Bar | Foo
    `);
  });

  it("emits import for TypeReference with refkey and typeArgs across files", () => {
    const classRefkey = refkey();
    const res = toSourceTextMultiple([
      <py.SourceFile path="defs.py">
        <py.ClassDeclaration name="Bar" refkey={classRefkey} />
      </py.SourceFile>,
      <py.SourceFile path="use.py">
        <py.StatementList>
          <py.VariableDeclaration
            name="v"
            type={<py.TypeReference refkey={classRefkey} typeArgs={["T"]} />}
          />
        </py.StatementList>
      </py.SourceFile>,
    ]);
    assertFileContents(res, {
      "defs.py": `
        class Bar:
            pass

      `,
      "use.py": `
        from defs import Bar


        v: Bar[T] = None
      `,
    });
  });
});

describe("TypeExpression in different scenarios", () => {
  it("renders an UnionTypeExpression as a function type parameter and return type", () => {
    const classRefkey = refkey();
    const type = (
      <py.UnionTypeExpression
        children={["int", "str", <py.Reference refkey={classRefkey} />]}
      />
    );
    expect(
      toSourceText([
        <py.ClassDeclaration
          name="Foo"
          refkey={classRefkey}
        ></py.ClassDeclaration>,
        <py.FunctionDeclaration
          name="fooFunction"
          parameters={[
            {
              name: "x",
              type: type,
            },
          ]}
          args={true}
          kwargs={true}
          returnType={type}
        />,
      ]),
    ).toRenderTo(d`
        class Foo:
            pass


        def foo_function(x: int | str | Foo, *args, **kwargs) -> int | str | Foo:
            pass


    `);
  });
  it("renders an UnionTypeExpression as a variable type", () => {
    const classRefkey = refkey();
    const type = (
      <py.UnionTypeExpression
        children={["int", "str", <py.Reference refkey={classRefkey} />]}
      />
    );
    expect(
      toSourceText([
        <py.ClassDeclaration
          name="Foo"
          refkey={classRefkey}
        ></py.ClassDeclaration>,
        <py.VariableDeclaration name="fooVariable" type={type} />,
      ]),
    ).toRenderTo(d`
        class Foo:
            pass


        foo_variable: int | str | Foo = None

    `);
  });
});
