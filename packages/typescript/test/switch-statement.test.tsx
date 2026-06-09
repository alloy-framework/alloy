import { List } from "@alloy-js/core";
import { expect, it } from "vitest";
import { CaseClause, SwitchStatement } from "../src/components/SwitchStatement.jsx";
import { TestFile } from "./utils.js";

it("handles various cases", () => {
  expect(
    <TestFile>
        <SwitchStatement expression="x">
          <List hardline>
            <CaseClause expression={'"test"'}>// expression</CaseClause>
            <CaseClause jsValue={"test"}>// jsValue</CaseClause>
            <CaseClause expression={"'break'"} break>
              // break
            </CaseClause>
            <CaseClause expression={"'block'"} block>
              // block
            </CaseClause>
            <CaseClause expression={"'breakblock'"} break block>
              // block
            </CaseClause>
            <CaseClause default>// default</CaseClause>
          </List>
        </SwitchStatement>
    </TestFile>,
  ).toRenderTo(`
    switch (x) {
      case "test":
        // expression
      case "test":
        // jsValue
      case 'break':
        // break
        break;
      case 'block': {
        // block
      }
      case 'breakblock': {
        // block
        break;
      }
      default:
        // default
    }
  `);
});
