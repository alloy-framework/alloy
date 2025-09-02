import { ClassDeclaration } from "#components/class/declaration.jsx";
import { Method } from "#components/method/method.jsx";
import { TestNamespace } from "#test/utils.jsx";
import { namekey } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import { InvocationExpression } from "./invocation-expression.jsx";

it("makes a call with no arguments", () => {
  const template = <InvocationExpression target="Foo" />;
  expect(template).toRenderTo(`Foo()`);
});

it("makes a call with arguments", () => {
  const template = (
    <InvocationExpression target="Foo" args={["42", `"string"`]} />
  );
  expect(template).toRenderTo(`Foo(42, "string")`);
});

it("makes a call with type parameters", () => {
  const template = (
    <InvocationExpression target="Foo" typeArgs={["Bar", "Baz"]} />
  );
  expect(template).toRenderTo(`Foo<Bar, Baz>()`);
});

it("makes a call to a method", () => {
  const cls = namekey("TestClass");
  const method = namekey("Method");
  const template = (
    <TestNamespace>
      <ClassDeclaration name={cls}>
        <Method name={method}>return 1;</Method>
      </ClassDeclaration>
      <hbr />
      <InvocationExpression target={method} />;
    </TestNamespace>
  );
  expect(template).toRenderTo(`
    class TestClass
    {
        void Method()
        {
            return 1;
        }
    }
    TestClass.Method();
  `);
});

describe("formatting", () => {
  it("doesn't break one long argument", () => {
    const template = (
      <InvocationExpression target="Foo" args={["oneLongArgument"]} />
    );
    expect(template).toRenderTo(`Foo(oneLongArgument)`, { printWidth: 10 });
  });

  it("breaks multiple arguments", () => {
    const template = (
      <InvocationExpression
        target="Foo"
        args={["oneLongArgument", "anotherLongArgument"]}
      />
    );
    expect(template).toRenderTo(
      `
      Foo(
        oneLongArgument,
        anotherLongArgument
      )
      `,
      { printWidth: 10 },
    );
  });

  it("doesn't break one long type argument", () => {
    const template = (
      <InvocationExpression target="Foo" typeArgs={["oneLongArgument"]} />
    );
    expect(template).toRenderTo(`Foo<oneLongArgument>()`, { printWidth: 10 });
  });

  it("breaks multiple type arguments", () => {
    const template = (
      <InvocationExpression
        target="Foo"
        typeArgs={["oneLongArgument", "anotherLongArgument"]}
      />
    );
    expect(template).toRenderTo(
      `
      Foo<
        oneLongArgument,
        anotherLongArgument
      >()
      `,
      { printWidth: 10 },
    );
  });
});
