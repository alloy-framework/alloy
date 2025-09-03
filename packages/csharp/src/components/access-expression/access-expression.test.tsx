import { ClassDeclaration } from "#components/class/declaration.jsx";
import { Method } from "#components/method/method.jsx";
import { TestNamespace } from "#test/utils.jsx";
import { List, namekey, printTree, renderTree } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import { CSharpSymbol } from "../../symbols/csharp.js";
import { AccessExpression } from "./access-expression.jsx";

it("makes a member access expression", () => {
  const template = (
    <AccessExpression>
      <AccessExpression.Part id="Foo" />
      <AccessExpression.Part id="Bar" />
    </AccessExpression>
  );
  expect(template).toRenderTo(`Foo.Bar`);
});

it("makes an element access expression", () => {
  const template = (
    <AccessExpression>
      <AccessExpression.Part id="Foo" />
      <AccessExpression.Part index={1} />
    </AccessExpression>
  );
  expect(template).toRenderTo(`Foo[1]`);
});

it("makes a call expression", () => {
  const template = (
    <AccessExpression>
      <AccessExpression.Part id="Foo" />
      <AccessExpression.Part args={[1, 2, 3]} />
    </AccessExpression>
  );
  expect(template).toRenderTo(`Foo(1, 2, 3)`);
});

it("makes an id part from a symbol", () => {
  const symbol = new CSharpSymbol("Symbol", undefined);
  const template = (
    <AccessExpression>
      <AccessExpression.Part id="Foo" />
      <AccessExpression.Part symbol={symbol} />
    </AccessExpression>
  );
  expect(template).toRenderTo(`Foo.Symbol`);
});

it("makes an id part from a symbol reactively", () => {
  const symbol = new CSharpSymbol("Symbol", undefined);
  const tree = renderTree(
    <AccessExpression>
      <AccessExpression.Part id="Foo" />
      <AccessExpression.Part symbol={symbol} />
    </AccessExpression>,
  );
  expect(printTree(tree)).toEqual("Foo.Symbol");
  symbol.name = "Bar";
  expect(printTree(tree)).toEqual("Foo.Bar");
});

it("makes an id part from refkey, where the first part is a full reference, and subsequent parts are just the id", () => {
  const methodKey = namekey("method");
  const template = (
    <TestNamespace>
      <List>
        <ClassDeclaration name="MyClass">
          <Method name={methodKey} />
        </ClassDeclaration>
        <AccessExpression>
          <AccessExpression.Part refkey={methodKey} />
          <AccessExpression.Part refkey={methodKey} />
        </AccessExpression>
      </List>
    </TestNamespace>
  );

  expect(template).toRenderTo(`
    class MyClass
    {
        void Method() {}
    }
    MyClass.Method.Method
  `);
});

it("takes type args", () => {
  const template = (
    <AccessExpression>
      <AccessExpression.Part id="Foo" typeArgs={["Foo", "Bar"]} />
    </AccessExpression>
  );
  expect(template).toRenderTo(`Foo<Foo, Bar>`);
});

it("takes multiple indexer arguments", () => {
  const template = (
    <AccessExpression>
      <AccessExpression.Part id="Foo" />
      <AccessExpression.Part indexerArgs={["arg1", "arg2"]} />
    </AccessExpression>
  );
  expect(template).toRenderTo(`Foo[arg1, arg2]`);
});

it("allows nullable member access", () => {
  const template = (
    <AccessExpression>
      <AccessExpression.Part id="Foo" nullable />
      <AccessExpression.Part id="Bar" />
    </AccessExpression>
  );
  expect(template).toRenderTo(`Foo?.Bar`);
});

it("allows conditional member access", () => {
  const template = (
    <AccessExpression>
      <AccessExpression.Part id="Foo" />
      <AccessExpression.Part id="Bar" conditional />
    </AccessExpression>
  );
  expect(template).toRenderTo(`Foo?.Bar`);
});

it("allows nullable element access", () => {
  const template = (
    <AccessExpression>
      <AccessExpression.Part id="Foo" nullable />
      <AccessExpression.Part index={1} />
    </AccessExpression>
  );
  expect(template).toRenderTo(`Foo?[1]`);
});

it("allows conditional element access", () => {
  const template = (
    <AccessExpression>
      <AccessExpression.Part id="Foo" />
      <AccessExpression.Part index={1} conditional />
    </AccessExpression>
  );
  expect(template).toRenderTo(`Foo?[1]`);
});

it("uses symbol information for nullability", () => {
  const symbol = new CSharpSymbol("Symbol", undefined, { isNullable: true });

  const typeSymbol = new CSharpSymbol("SomeType", undefined, {
    isNullable: true,
  });

  const typedSymbol = new CSharpSymbol("SomeValue", undefined, {
    type: typeSymbol,
  });

  const template = (
    <AccessExpression>
      <AccessExpression.Part symbol={symbol} />
      <AccessExpression.Part symbol={typedSymbol} />
      <AccessExpression.Part id="Foo" />
    </AccessExpression>
  );
  expect(template).toRenderTo(`Symbol?.SomeValue?.Foo`);
});

describe("formatting", () => {
  it("breaks long identifier chains", () => {
    const template = (
      <AccessExpression>
        <AccessExpression.Part id="Foo" />
        <AccessExpression.Part id="Foo" />
        <AccessExpression.Part id="Foo" />
        <AccessExpression.Part id="Foo" />
        <AccessExpression.Part id="Foo" />
        <AccessExpression.Part id="Foo" />
      </AccessExpression>
    );
    expect(template).toRenderTo(
      `
      Foo.Foo
        .Foo.Foo
        .Foo.Foo
      `,
      { printWidth: 10 },
    );
  });
  it("breaks long call expressions", () => {
    const template = (
      <AccessExpression>
        <AccessExpression.Part id="Foo" />
        <AccessExpression.Part id="Bar" />
        <AccessExpression.Part args={["variable1", "variable2", "variable3"]} />
      </AccessExpression>
    );
    expect(template).toRenderTo(
      `
      Foo.Bar(
        variable1,
        variable2,
        variable3
      )
      `,
      { printWidth: 10 },
    );
  });

  it("breaks long type args", () => {
    const template = (
      <AccessExpression>
        <AccessExpression.Part
          id="Foo"
          typeArgs={["Foo", "Bar", "Baz", "Qux"]}
        />
      </AccessExpression>
    );
    expect(template).toRenderTo(
      `
      Foo<
        Foo,
        Bar,
        Baz,
        Qux
      >
      `,
      { printWidth: 10 },
    );
  });

  it("breaks long type args for second member", () => {
    const template = (
      <AccessExpression>
        <AccessExpression.Part id="Foo" />
        <AccessExpression.Part
          id="Bar"
          typeArgs={["Foo", "Bar", "Baz", "Qux"]}
        />
      </AccessExpression>
    );
    expect(template).toRenderTo(
      `
      Foo
        .Bar<
          Foo,
          Bar,
          Baz,
          Qux
        >
      `,
      { printWidth: 10 },
    );
  });

  it("formats builder pattern", () => {
    const template = (
      <AccessExpression>
        <AccessExpression.Part id="Foo" />
        <AccessExpression.Part id="Bar" />
        <AccessExpression.Part id="Baz" />
        <AccessExpression.Part args />
        <AccessExpression.Part id="Qux" />
        <AccessExpression.Part id="Quux" typeArgs={["TTypeOne", "TTypeTwo"]} />
        <AccessExpression.Part indexerArgs={["arg1", "arg2"]} />
        <AccessExpression.Part args />
      </AccessExpression>
    );
    expect(template).toRenderTo(
      `
        Foo.Bar
          .Baz()
          .Qux
          .Quux<
            TTypeOne,
            TTypeTwo
          >[
            arg1,
            arg2
          ]()
      `,
      { printWidth: 10 },
    );
  });
});
