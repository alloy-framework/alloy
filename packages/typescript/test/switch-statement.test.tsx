import { List } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import {
  CaseClause,
  SwitchStatement,
} from "../src/components/SwitchStatement.jsx";
import { toSourceText } from "./utils.jsx";

it("handles various cases", () => {
  const text = toSourceText(
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
    </SwitchStatement>,
  );

  expect(text).toBe(d`
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
