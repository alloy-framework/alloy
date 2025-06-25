import { List, Output, refkey, render } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import * as py from "../src/components/index.js";
import { assertFileContents, toSourceText } from "./utils.jsx";

describe("Python Class", () => {
  it("renders a class with no body as 'pass'", () => {
    const result = toSourceText(<py.ClassDeclaration name="Foo" />);
    expect(result).toRenderTo(d`
      class Foo:
        pass
    `);
  });

  it("renders a class with a body", () => {
    const result = toSourceText(
      <py.ClassDeclaration name="Bar">print('hi')</py.ClassDeclaration>,
    );
    expect(result).toRenderTo(d`
      class Bar:
        print('hi')
    `);
  });

  it("renders a class with base classes", () => {
    const result = toSourceText(
      <>
        <py.ClassDeclaration name="Base1" />
        <br />
        <py.ClassDeclaration name="Base2" />
        <br />
        <py.ClassDeclaration
          name="Baz"
          bases={[refkey("Base1"), refkey("Base2")]}
        />
      </>,
    );
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
    const result = toSourceText(
      <py.ClassDeclaration name="Qux" bases={["Base"]}>
        print('hello')
      </py.ClassDeclaration>,
    );
    expect(result).toRenderTo(d`
      class Qux(Base):
        print('hello')
    `);
  });

  it("renders classes across modules with inheritance", () => {
    const result = render(
      <Output>
        <py.SourceFile path="mod1.py">
          <py.ClassDeclaration name="A" />
        </py.SourceFile>
        <py.SourceFile path="folder/mod2.py">
          <py.ClassDeclaration name="B" bases={[refkey("A")]} />
        </py.SourceFile>
        <py.SourceFile path="mod3.py">
          <py.ClassDeclaration name="C" bases={[refkey("B")]} />
        </py.SourceFile>
      </Output>,
    );
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
    const result = toSourceText(
      <>
        <py.ClassDeclaration name="A" />
        <br />
        <py.ClassDeclaration name="B">
          <List hardline>
            <py.VariableDeclaration name="bar" type={refkey("A")} omitNone />
            <py.VariableDeclaration name="foo" type="str" omitNone />
          </List>
        </py.ClassDeclaration>
      </>,
    );
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
    const result = toSourceText(
      <>
        <py.ClassDeclaration name="A">
          <List hardline>
            <py.VariableDeclaration name="foo" type="str" omitNone />
          </List>
        </py.ClassDeclaration>
        <br />
        <py.ClassDeclaration name="B">
          <List hardline>
            <py.VariableDeclaration name="foo" type="str" omitNone />
          </List>
        </py.ClassDeclaration>
      </>,
    );
    const expected = d`
      class A:
        foo: str
      class B:
        foo: str
    `;
    expect(result).toRenderTo(expected);
  });
});
