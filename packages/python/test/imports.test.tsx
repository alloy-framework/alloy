import { Output, render } from "@alloy-js/core";
import { describe, it } from "vitest";
import { ImportStatement } from "../src/components/ImportStatement.jsx";
import * as py from "../src/components/index.js";
import { assertFileContents } from "./utils.jsx";

describe("ImportStatement", () => {
  it("renders module import", () => {
    const result = render(
      <Output>
        <py.SourceFile path="test.py">
          <ImportStatement module="sys" />
        </py.SourceFile>
      </Output>,
    );
    assertFileContents(result, { "test.py": `import sys` });
  });

  it("renders named imports", () => {
    const result = render(
      <Output>
        <py.SourceFile path="test.py">
          <ImportStatement module="math" names={["sqrt", "pi"]} />
        </py.SourceFile>
      </Output>,
    );
    assertFileContents(result, {
      "test.py": `from math import sqrt, pi`,
    });
  });

  it("renders named imports with aliases", () => {
    const result = render(
      <Output>
        <py.SourceFile path="test.py">
          <ImportStatement
            module="math"
            names={[{ name: "sqrt", alias: "square_root" }, "pi"]}
          />
        </py.SourceFile>
      </Output>,
    );
    assertFileContents(result, {
      "test.py": `from math import sqrt as square_root, pi`,
    });
  });
  it("renders wildcard import", () => {
    const result = render(
      <Output>
        <py.SourceFile path="test.py">
          <ImportStatement module="os" wildcard />
        </py.SourceFile>
      </Output>,
    );
    assertFileContents(result, {
      "test.py": `from os import *`,
    });
  });
});

describe("ImportStatements", () => {
  it("renders multiple import statements", () => {
    const result = render(
      <Output>
        <py.SourceFile path="test.py">
          <py.ImportStatements
            imports={[
              { module: "os", wildcard: true },
              { module: "sys" },
              { module: "math", names: ["sqrt", "pi"] },
            ]}
          />
        </py.SourceFile>
      </Output>,
    );
    assertFileContents(result, {
      "test.py": `from math import sqrt, pi\nfrom os import *\nimport sys`,
    });
  });
});
