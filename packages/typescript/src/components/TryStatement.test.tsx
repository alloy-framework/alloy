import { refkey, StatementList } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import { toSourceText } from "../../test/utils.jsx";
import { CatchClause, FinallyClause, TryStatement } from "./TryStatement.jsx";
import { VarDeclaration } from "./VarDeclaration.jsx";

it("works with try-catch", () => {
  const text = toSourceText(
    <>
      <TryStatement>// try something</TryStatement>
      <CatchClause parameter="error">// handle error</CatchClause>
    </>,
  );

  expect(text).toBe(d`
    try {
      // try something
    } catch (error) {
      // handle error
    }
  `);
});

it("works with try-catch-finally", () => {
  const text = toSourceText(
    <>
      <TryStatement>// try something</TryStatement>
      <CatchClause parameter="error">// handle error</CatchClause>
      <FinallyClause>// cleanup</FinallyClause>
    </>,
  );

  expect(text).toBe(d`
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
  const text = toSourceText(
    <>
      <TryStatement>// try something</TryStatement>
      <FinallyClause>// cleanup</FinallyClause>
    </>,
  );

  expect(text).toBe(d`
    try {
      // try something
    } finally {
      // cleanup
    }
  `);
});

it("works with catch without parameter", () => {
  const text = toSourceText(
    <>
      <TryStatement>// try something</TryStatement>
      <CatchClause>// handle error without parameter</CatchClause>
    </>,
  );

  expect(text).toBe(d`
    try {
      // try something
    } catch {
      // handle error without parameter
    }
  `);
});

it("works with typed catch parameter", () => {
  const text = toSourceText(
    <>
      <TryStatement>// try something</TryStatement>
      <CatchClause parameter={{ name: "error", type: "Error" }}>
        // handle typed error
      </CatchClause>
    </>,
  );

  expect(text).toBe(d`
    try {
      // try something
    } catch (error: Error) {
      // handle typed error
    }
  `);
});

it("creates symbols for catch parameters", () => {
  const rk = refkey();

  const text = toSourceText(
    <>
      <TryStatement>// try something</TryStatement>
      <CatchClause parameter={{ name: "error", type: "Error", refkey: rk }}>
        <StatementList>
          {rk}
          <VarDeclaration name="message" type="string">
            {rk}.message
          </VarDeclaration>
        </StatementList>
      </CatchClause>
    </>,
  );

  expect(text).toBe(d`
    try {
      // try something
    } catch (error: Error) {
      error;
      const message: string = error.message;
    }
  `);
});
