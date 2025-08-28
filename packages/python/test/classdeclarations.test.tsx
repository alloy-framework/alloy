import { memberRefkey, refkey } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import * as py from "../src/index.js";
import {
  assertFileContents,
  toSourceText,
  toSourceTextMultiple,
} from "./utils.jsx";

describe("Python Class", () => {
  it("renders a class with no body as 'pass'", () => {
    const result = toSourceText([<py.ClassDeclaration name="Foo" />]);
    expect(result).toRenderTo(d`
      class Foo:
          pass


    `);
  });

  it("renders a class with a body", () => {
    const result = toSourceText([
      <py.ClassDeclaration name="Bar">print('hi')</py.ClassDeclaration>,
    ]);
    expect(result).toRenderTo(d`
      class Bar:
          print('hi')


    `);
  });

  it("renders a class with base classes", () => {
    const result = toSourceText([
      <py.StatementList>
        <py.ClassDeclaration name="Base1" refkey={refkey("Base1")} />
        <py.ClassDeclaration name="Base2" refkey={refkey("Base2")} />
        <py.ClassDeclaration
          name="Baz"
          bases={[refkey("Base1"), refkey("Base2")]}
        />
      </py.StatementList>,
    ]);
    const expected = d`
      class Base1:
          pass

      class Base2:
          pass

      class Baz(Base1, Base2):
          pass

        
    `;
    expect(result).toRenderTo(expected);
  });

  it("renders a class with base classes and body", () => {
    const result = toSourceText([
      <py.ClassDeclaration name="Qux" bases={["Base"]}>
        print('hello')
      </py.ClassDeclaration>,
    ]);
    expect(result).toRenderTo(d`
      class Qux(Base):
          print('hello')


    `);
  });

  it("renders classes across modules with inheritance", () => {
    const result = toSourceTextMultiple([
      <py.SourceFile path="mod1.py">
        <py.ClassDeclaration name="A" refkey={refkey("A")} />
      </py.SourceFile>,
      <py.SourceFile path="folder/mod2.py">
        <py.ClassDeclaration
          name="B"
          refkey={refkey("B")}
          bases={[refkey("A")]}
        />
      </py.SourceFile>,
      <py.SourceFile path="mod3.py">
        <py.ClassDeclaration name="C" bases={[refkey("B")]} />
      </py.SourceFile>,
    ]);
    const mod1Expected = d`
      class A:
          pass


    `;
    const mod2Expected = d`
      from mod1 import A

      class B(A):
          pass


    `;
    const mod3Expected = d`
      from folder.mod2 import B

      class C(B):
          pass


    `;
    assertFileContents(result, { "mod1.py": mod1Expected });
    assertFileContents(result, { "folder/mod2.py": mod2Expected });
    assertFileContents(result, { "mod3.py": mod3Expected });
  });

  it("renders a class with class variables like foo: str, and also bar: A where A is another class", () => {
    const result = toSourceText([
      <py.StatementList>
        <py.ClassDeclaration name="A" refkey={refkey("A")} />
        <py.ClassDeclaration name="B">
          <py.StatementList>
            <py.VariableDeclaration name="bar" type={refkey("A")} omitNone />
            <py.VariableDeclaration name="foo" type="str" omitNone />
          </py.StatementList>
        </py.ClassDeclaration>
      </py.StatementList>,
    ]);
    const expected = d`
      class A:
          pass

      class B:
          bar: A
          foo: str


    `;
    expect(result).toRenderTo(expected);
  });

  it("renders a class with class variables like foo: str, and another identical class", () => {
    const fooKey = refkey();
    const barKey = refkey();

    const result = toSourceText([
      <py.StatementList>
        <py.ClassDeclaration name="A">
          <py.StatementList>
            <py.VariableDeclaration
              name="foo"
              type="str"
              refkey={fooKey}
              omitNone
            />
          </py.StatementList>
        </py.ClassDeclaration>
        <py.ClassDeclaration name="B">
          <py.StatementList>
            <py.VariableDeclaration
              name="foo"
              type="str"
              refkey={barKey}
              omitNone
            />
          </py.StatementList>
        </py.ClassDeclaration>
        {fooKey}
        {barKey}
      </py.StatementList>,
    ]);
    const expected = d`
      class A:
          foo: str

      class B:
          foo: str

      A.foo
      B.foo
    `;
    expect(result).toRenderTo(expected);
  });
});

describe("Python Class - VariableDeclaration", () => {
  it("renders a class with class fields", () => {
    const result = toSourceText([
      <py.StatementList>
        <py.ClassDeclaration
          refkey={refkey("Base")}
          name="Base"
        ></py.ClassDeclaration>
        <py.ClassDeclaration refkey={refkey("A")} name="A">
          <py.StatementList>
            <py.VariableDeclaration instanceVariable name="just_name" />
            <py.VariableDeclaration
              instanceVariable
              name="name_and_type"
              type="number"
            />
            <py.VariableDeclaration
              instanceVariable
              name="name_type_and_value"
              type="number"
              initializer={12}
            />
            <py.VariableDeclaration
              instanceVariable
              name="class_based"
              type={refkey("Base")}
            />
          </py.StatementList>
        </py.ClassDeclaration>
      </py.StatementList>,
    ]);
    const expected = d`
      class Base:
          pass

      class A:
          just_name = None
          name_and_type: number = None
          name_type_and_value: number = 12
          class_based: Base = None


    `;
    expect(result).toRenderTo(expected);
  });

  it("correctly access members of its type", () => {
    const classRk = refkey();
    const classMemberRk = refkey();
    const classMethodRk = refkey();
    const v1Rk = refkey();

    const res = toSourceTextMultiple([
      <py.SourceFile path="inst.py">
        <py.StatementList>
          <py.VariableDeclaration
            name="one"
            refkey={v1Rk}
            type={classRk}
            initializer={<py.ClassInstantiation target={classRk} />}
          />
          <>{memberRefkey(v1Rk, classMemberRk)}</>
          <>{memberRefkey(v1Rk, classMethodRk)}()</>
        </py.StatementList>
      </py.SourceFile>,
      <py.SourceFile path="decl.py">
        <py.ClassDeclaration name="Bar" refkey={classRk}>
          <py.StatementList>
            <py.VariableDeclaration
              name="instanceProp"
              refkey={classMemberRk}
              initializer={42}
              instanceVariable
            />
            <py.FunctionDeclaration
              name="instanceMethod"
              instanceFunction
              refkey={classMethodRk}
              returnType="int"
            />
          </py.StatementList>
        </py.ClassDeclaration>
      </py.SourceFile>,
    ]);

    assertFileContents(res, {
      "inst.py": `
        from decl import Bar

        one: Bar = Bar()
        one.instance_prop
        one.instance_method()
      `,
      "decl.py": `
        class Bar:
            instance_prop = 42
            def instance_method(self) -> int:
                pass


      `,
    });
  });
});

describe("Python Class - FunctionDeclaration", () => {
  it("renders a class with class fields and method", () => {
    const methodRefkey = refkey();
    const classMethodRefkey = refkey();
    const staticMethodRefkey = refkey();

    const result = toSourceText([
      <py.StatementList>
        <py.ClassDeclaration name="MyClass" bases={["BaseClass"]}>
          <py.StatementList>
            <py.VariableDeclaration name="a" type="int" instanceVariable />
            <py.VariableDeclaration name="b" type="int" instanceVariable />
            <py.FunctionDeclaration
              name="my_method"
              parameters={[
                { name: "a", type: "int" },
                { name: "b", type: "int" },
              ]}
              returnType="int"
              instanceFunction
              refkey={methodRefkey}
            >
              return a + b
            </py.FunctionDeclaration>
            <py.FunctionDeclaration
              name="my_class_method"
              classFunction
              returnType="int"
              refkey={classMethodRefkey}
            >
              pass
            </py.FunctionDeclaration>
            <py.FunctionDeclaration
              name="my_standalone_function"
              returnType="int"
              refkey={staticMethodRefkey}
            >
              pass
            </py.FunctionDeclaration>
          </py.StatementList>
        </py.ClassDeclaration>
        {classMethodRefkey}
        {staticMethodRefkey}
      </py.StatementList>,
    ]);
    const expected = d`
      class MyClass(BaseClass):
          a: int = None
          b: int = None
          def my_method(self, a: int, b: int) -> int:
              return a + b

          def my_class_method(cls) -> int:
              pass

          def my_standalone_function() -> int:
              pass

      
      MyClass.my_class_method
      MyClass.my_standalone_function
    `;
    expect(result).toRenderTo(expected);
  });
});
