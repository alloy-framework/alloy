import { expect, it } from "vitest";
import {
  ElseClause,
  ElseIfClause,
  IfStatement,
} from "../src/components/IfStatement.jsx";
import { TestFile } from "./utils.js";

it("works with blocks", () => {
  expect(
    <TestFile>
      <IfStatement condition="x === 1">// do thing</IfStatement>
      <ElseIfClause condition="x === 2">// do another thing</ElseIfClause>
      <ElseClause>// do default thing</ElseClause>
    </TestFile>,
  ).toRenderTo(`
    if (x === 1) {
      // do thing
    } else if (x === 2) {
      // do another thing
    } else {
      // do default thing
    }
  `);
});
