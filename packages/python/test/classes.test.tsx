import { Output, refkey, render } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import { Class } from "../src/components/Class.js";
import { SourceFile } from "../src/components/SourceFile.js";
import { assertFileContents, toSourceText } from "./utils.jsx";

describe("Python Class", () => {
  it("renders a class with no body as 'pass'", () => {
    const result = toSourceText(
      <Output>
        <SourceFile path="test.py">
          <Class name="Foo" />
        </SourceFile>
      </Output>,
    );
    expect(result).toRenderTo(`class Foo:\n  pass\n\n`);
  });

  it("renders a class with a body", () => {
    const result = toSourceText(
      <Output>
        <SourceFile path="test.py">
          <Class name="Bar">print('hi')</Class>
        </SourceFile>
      </Output>,
    );
    expect(result).toRenderTo(`class Bar:\n  print('hi')\n\n`);
  });

  it("renders a class with base classes", () => {
    const result = render(
      <Output>
        <SourceFile path="test.py">
          {[
            <Class name="Base1" />,
            <Class name="Base2" />,
            <Class name="Baz" bases={[refkey("Base1"), refkey("Base2")]} />,
          ]}
        </SourceFile>
      </Output>,
    );
    const expected = [
      "from test import Base1",
      "from test import Base2",
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
        <SourceFile path="test.py">
          <Class name="Qux" bases={["Base"]}>
            print('hello')
          </Class>
        </SourceFile>
      </Output>,
    );
    expect(result).toRenderTo(`class Qux(Base):\n  print('hello')\n\n`);
  });

  it("renders classes across modules with inheritance", () => {
    const result = render(
      <Output>
        <SourceFile path="mod1.py">
          <Class name="A" module="mod1" />
        </SourceFile>
        <SourceFile path="mod2.py">
          <Class name="B" bases={[refkey("A")]} />
        </SourceFile>
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
});
