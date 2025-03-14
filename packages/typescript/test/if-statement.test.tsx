import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import {
  ElseClause,
  ElseIfClause,
  IfStatement,
} from "../src/components/IfStatement.jsx";
import { toSourceText } from "./utils.jsx";

it("works with blocks", () => {
  const text = toSourceText(
    <>
      <IfStatement condition="x === 1">// do thing</IfStatement>
      <ElseIfClause condition="x === 2">// do another thing</ElseIfClause>
      <ElseClause>// do default thing</ElseClause>
    </>,
  );

  expect(text).toBe(d`
    if (x === 1) {
      // do thing
    } else if (x === 2) {
      // do another thing
    } else {
      // do default thing
    }
  `);
});
