import { expect, it } from "vitest";
import * as ts from "../src/index.js";
import { TestFile } from "./utils.js";

it("renders a variable declaration with documentation", () => {
  const res = (
    <TestFile>
      <ts.VarDeclaration
        name="myVar"
        const
        doc="This is a variable documentation"
      >
        123
      </ts.VarDeclaration>
      ;
    </TestFile>
  );
  expect(res).toRenderTo(`
    /**
     * This is a variable documentation
     */
    const myVar = 123;
  `);
});

it("renders a let declaration with documentation", () => {
  const res = (
    <TestFile>
      <ts.VarDeclaration
        let
        name="counter"
        doc="A counter variable that can be changed"
        type="number"
      >
        0
      </ts.VarDeclaration>
      ;
    </TestFile>
  );
  expect(res).toRenderTo(`
    /**
     * A counter variable that can be changed
     */
    let counter: number = 0;
  `);
});

it("renders an exported variable declaration with documentation", () => {
  const res = (
    <TestFile>
      <ts.VarDeclaration
        export
        name="API_URL"
        const
        doc="The base URL for API calls"
        type="string"
      >
        "https://api.example.com"
      </ts.VarDeclaration>
      ;
    </TestFile>
  );
  expect(res).toRenderTo(`
    /**
     * The base URL for API calls
     */
    export const API_URL: string = "https://api.example.com";
  `);
});
