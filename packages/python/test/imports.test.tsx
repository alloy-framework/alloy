import { Output, render } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import { ImportStatement } from "../src/components/ImportStatement.jsx";
import * as py from "../src/components/index.js";
import { assertFileContents, toSourceText } from "./utils.jsx";

describe("ImportStatement", () => {
  it("renders module import", () => {
    const result = toSourceText(
      <ImportStatement module="sys" />
    );
    const expected = `import sys`;
    expect(result).toRenderTo(expected);
  });

  it("renders named imports", () => {
    const result = toSourceText(
      <ImportStatement module="math" names={["sqrt", "pi"]} />
    );
    const expected = `from math import sqrt, pi`;
    expect(result).toRenderTo(expected);
  });

  it("renders named imports with aliases", () => {
    const result = toSourceText(
      <ImportStatement
        module="math"
        names={[{ name: "sqrt", alias: "square_root" }, "pi"]}
      />
    );
    const expected = `from math import sqrt as square_root, pi`;
    expect(result).toRenderTo(expected);
  });

  it("renders wildcard import", () => {
    const result = toSourceText(
      <ImportStatement module="os" wildcard />
    );
    const expected = `from os import *`;
    expect(result).toRenderTo(expected);
  });
});

describe("ImportStatements", () => {
  it("renders multiple import statements", () => {
    const result = toSourceText(
      <py.ImportStatements
        imports={[
          { module: "os", wildcard: true },
          { module: "sys" },
          { module: "math", names: ["sqrt", "pi"] },
        ]}
      />
    );
    const expected = `from math import sqrt, pi\nfrom os import *\nimport sys`;
    expect(result).toRenderTo(expected);
  });
});
