import { TestNamespace, toSourceText } from "#test/utils.js";
import { List, toRef, useScope } from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { ClassDeclaration, ClassMethod } from "../../index.js";
import { CSharpScope } from "../../scopes/csharp.js";
import { CSharpLexicalScope } from "../../scopes/lexical-scope.js";
import { CSharpSymbol } from "../../symbols/csharp.js";

const Wrapper = (props: { children: Children }) => (
  <TestNamespace>
    <ClassDeclaration public name="TestClass">
      {props.children}
    </ClassDeclaration>
  </TestNamespace>
);

describe("modifiers", () => {
  describe("access modifiers", () => {
    it.each(["public", "private", "protected", "internal"] as const)(
      "%s",
      (accessModifier) => {
        expect(
          <Wrapper>
            <ClassMethod {...{ [accessModifier]: true }} name="MethodOne" />
          </Wrapper>,
        ).toRenderTo(`
        public class TestClass
        {
          ${accessModifier} void MethodOne() {}
        }
      `);
      },
    );
  });

  describe("method modifiers", () => {
    it.each(["static", "virtual", "sealed"] as const)(
      "%s",
      (methodModifier) => {
        expect(
          <Wrapper>
            <ClassMethod {...{ [methodModifier]: true }} name="MethodOne" />
          </Wrapper>,
        ).toRenderTo(`
        public class TestClass
        {
          ${methodModifier} void MethodOne() {}
        }
      `);
      },
    );

    it("abstract exclude body", () => {
      expect(
        <Wrapper>
          <ClassMethod abstract name="MethodOne" />
        </Wrapper>,
      ).toRenderTo(`
        public class TestClass
        {
          abstract void MethodOne();
        }
      `);
    });
  });

  it("mark method async", () => {
    expect(
      <Wrapper>
        <ClassMethod async name="MethodOne" />
      </Wrapper>,
    ).toRenderTo(`
        public class TestClass
        {
          async Task MethodOne() {}
        }
      `);
  });

  it("combine modifiers", () => {
    expect(
      <Wrapper>
        <ClassMethod async returns="Task" public abstract name="MethodOne" />
      </Wrapper>,
    ).toRenderTo(`
        public class TestClass
        {
          public abstract async Task MethodOne();
        }
      `);
  });
});

it("applies PascalCase naming policy", () => {
  expect(
    <Wrapper>
      <ClassMethod name="method_one" />
    </Wrapper>,
  ).toRenderTo(`
    public class TestClass
    {
      void MethodOne() {}
    }
`);
});
it("defines params and return type", () => {
  const params = [
    {
      name: "intParam",
      type: "int",
    },
    {
      name: "stringParam",
      type: "string",
    },
  ];
  const res = (
    <Wrapper>
      <ClassMethod
        public
        name="MethodOne"
        parameters={params}
        returns="string"
      />
    </Wrapper>
  );

  expect(res).toRenderTo(`
    public class TestClass
    {
      public string MethodOne(int intParam, string stringParam) {}
    }
  `);
});

it("specify doc comment", () => {
  expect(
    <TestNamespace>
      <ClassDeclaration name="Test">
        <ClassMethod name="Method" doc="This is a test" />
      </ClassDeclaration>
    </TestNamespace>,
  ).toRenderTo(`
    class Test
    {
      /// This is a test
      void Method() {}
    }
  `);
});

it("declares class with some methods", () => {
  const res = toSourceText(
    <ClassDeclaration public name="TestClass">
      <List>
        <ClassMethod public name="MethodOne" />
        <ClassMethod private virtual name="MethodTwo" />
      </List>
    </ClassDeclaration>,
  );

  expect(res).toBe(d`
    namespace TestCode;

    public class TestClass
    {
        public void MethodOne() {}
        private virtual void MethodTwo() {}
    }
  `);
});

it("works with locals", () => {
  const knownLocals = new Map<CSharpScope, Map<string, CSharpSymbol>>();

  function local(name: string) {
    const currentScope = useScope() as CSharpLexicalScope;
    // validate we have this scope kind
    if (knownLocals.has(currentScope)) {
      const scopeLocals = knownLocals.get(currentScope)!;
      if (scopeLocals.has(name)) {
        return toRef(scopeLocals.get(name)!, "name");
      }
    } else {
      knownLocals.set(currentScope, new Map());
    }
    const knownNames = knownLocals.get(currentScope)!;
    const symbol = new CSharpSymbol(name, currentScope.localVariables);
    knownNames.set(name, symbol);
    return toRef(symbol, "name");
  }

  const res = toSourceText(
    <ClassDeclaration public name="TestClass">
      <List>
        <ClassMethod public name="MethodOne">
          var {local("foo")} = 1;
          <hbr />
          Console.WriteLine({local("foo")});
        </ClassMethod>
      </List>
    </ClassDeclaration>,
  );

  console.log(res);
});
