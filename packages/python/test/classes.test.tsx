import { List, Output, refkey, render } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import * as py from "../src/components/index.js";
import { assertFileContents, toSourceText } from "./utils.jsx";

describe("Python Class", () => {
  it("renders a class with no body as 'pass'", () => {
    const result = toSourceText(
      <Output>
        <py.SourceFile path="test.py">
          <py.Class name="Foo" />
        </py.SourceFile>
      </Output>,
    );
    expect(result).toRenderTo(`class Foo:\n  pass\n\n`);
  });

  it("renders a class with a body", () => {
    const result = toSourceText(
      <Output>
        <py.SourceFile path="test.py">
          <py.Class name="Bar">print('hi')</py.Class>
        </py.SourceFile>
      </Output>,
    );
    expect(result).toRenderTo(`class Bar:\n  print('hi')\n\n`);
  });

  it("renders a class with base classes", () => {
    const result = render(
      <Output>
        <py.SourceFile path="test.py">
          {[
            <py.Class name="Base1" />,
            <py.Class name="Base2" />,
            <py.Class name="Baz" bases={[refkey("Base1"), refkey("Base2")]} />,
          ]}
        </py.SourceFile>
      </Output>,
    );
    const expected = [
      "class Base1:",
      "  pass",
      "class Base2:",
      "  pass",
      "class Baz(Base1, Base2):",
      "  pass",
      "",
      "",
    ].join("\n");
    assertFileContents(result, { "test.py": expected });
  });

  it("renders a class with base classes and body", () => {
    const result = toSourceText(
      <Output>
        <py.SourceFile path="test.py">
          <py.Class name="Qux" bases={["Base"]}>
            print('hello')
          </py.Class>
        </py.SourceFile>
      </Output>,
    );
    expect(result).toRenderTo(`class Qux(Base):\n  print('hello')\n\n`);
  });

  it("renders classes across modules with inheritance", () => {
    const result = render(
      <Output>
        <py.SourceFile path="mod1.py">
          <py.Class name="A" />
        </py.SourceFile>
        <py.SourceFile path="mod2.py">
          <py.Class name="B" bases={[refkey("A")]} />
        </py.SourceFile>
      </Output>,
    );
    const mod1Expected = ["class A:", "  pass", "", ""].join("\n");
    const mod2Expected = [
      "from mod1 import A",
      "class B(A):",
      "  pass",
      "",
      "",
    ].join("\n");
    assertFileContents(result, { "mod1.py": mod1Expected });
    assertFileContents(result, { "mod2.py": mod2Expected });
  });

  it("renders a class with class variables like foo: str, and also bar: A where A is another class", () => {
    const result = render(
      <Output>
        <py.SourceFile path="test.py">
          <py.Class name="A" />
          <py.Class name="B">
            <List hardline>
              <py.Variable name="bar" type={refkey("A")} omitNone />
              <py.Variable name="foo" type="str" omitNone />
            </List>
          </py.Class>
        </py.SourceFile>
      </Output>,
    );
    const expected = [
      "class A:",
      "  pass",
      "class B:",
      "  bar: A",
      "  foo: str",
      "",
      "",
    ].join("\n");
    assertFileContents(result, { "test.py": expected });
  });
});
