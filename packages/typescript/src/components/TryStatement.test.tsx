import { refkey, StatementList } from "@alloy-js/core";
import { expect, it } from "vitest";
import { TestFile } from "../../test/utils.js";
import { CatchClause, FinallyClause, TryStatement } from "./TryStatement.jsx";
import { VarDeclaration } from "./VarDeclaration.jsx";

it("works with try-catch", () => {
  expect(
    <TestFile>
      <TryStatement>// try something</TryStatement>
      <CatchClause parameter="error">// handle error</CatchClause>
    </TestFile>,
  ).toRenderTo(`
    try {
      // try something
    } catch (error) {
      // handle error
    }
  `);
});

it("works with try-catch-finally", () => {
  expect(
    <TestFile>
      <TryStatement>// try something</TryStatement>
      <CatchClause parameter="error">// handle error</CatchClause>
      <FinallyClause>// cleanup</FinallyClause>
    </TestFile>,
  ).toRenderTo(`
    try {
      // try something
    } catch (error) {
      // handle error
    } finally {
      // cleanup
    }
  `);
});

it("works with try-finally", () => {
  expect(
    <TestFile>
      <TryStatement>// try something</TryStatement>
      <FinallyClause>// cleanup</FinallyClause>
    </TestFile>,
  ).toRenderTo(`
    try {
      // try something
    } finally {
      // cleanup
    }
  `);
});

it("works with catch without parameter", () => {
  expect(
    <TestFile>
      <TryStatement>// try something</TryStatement>
      <CatchClause>// handle error without parameter</CatchClause>
    </TestFile>,
  ).toRenderTo(`
    try {
      // try something
    } catch {
      // handle error without parameter
    }
  `);
});

it("works with typed catch parameter", () => {
  expect(
    <TestFile>
      <TryStatement>// try something</TryStatement>
      <CatchClause parameter={{ name: "error", type: "Error" }}>
        // handle typed error
      </CatchClause>
    </TestFile>,
  ).toRenderTo(`
    try {
      // try something
    } catch (error: Error) {
      // handle typed error
    }
  `);
});

it("creates symbols for catch parameters", () => {
  const rk = refkey();

  expect(
    <TestFile>
      <TryStatement>// try something</TryStatement>
      <CatchClause parameter={{ name: "error", type: "Error", refkey: rk }}>
        <StatementList>
          {rk}
          <VarDeclaration name="message" type="string">
            {rk}.message
          </VarDeclaration>
        </StatementList>
      </CatchClause>
    </TestFile>,
  ).toRenderTo(`
    try {
      // try something
    } catch (error: Error) {
      error;
      const message: string = error.message;
    }
  `);
});
