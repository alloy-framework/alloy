import { List, Output } from "@alloy-js/core";
import { beforeEach, expect, it } from "vitest";
import { resetProgram } from "../../contexts/program.js";
import { createTypeSpecNamePolicy } from "../../name-policy.js";
import { ConstDeclaration } from "../const/const-declaration.jsx";
import { SourceFile } from "../source-file/source-file.jsx";
import { ObjectValue, ObjectValueProperty } from "./object-value.jsx";

beforeEach(() => {
  resetProgram();
});

it("renders an object value expression", () => {
  expect(
    <ObjectValue>
      <List comma hardline enderPunctuation>
        <ObjectValueProperty name="x" value="0" />
        <ObjectValueProperty name="y" value="0" />
      </List>
    </ObjectValue>,
  ).toRenderTo(`
    #{
      x: 0,
      y: 0,
    }
  `);
});

it("renders an object value property", () => {
  expect(<ObjectValueProperty name="x" value="42" />).toRenderTo("x: 42");
});

it("renders a const with an object value", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ConstDeclaration
          name="origin"
          value={
            <ObjectValue>
              <List comma hardline enderPunctuation>
                <ObjectValueProperty name="x" value="0" />
                <ObjectValueProperty name="y" value="0" />
              </List>
            </ObjectValue>
          }
        />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      const origin = #{
        x: 0,
        y: 0,
      }
    `,
  });
});

it("renders a nested object value", () => {
  expect(
    <ObjectValue>
      <List comma hardline enderPunctuation>
        <ObjectValueProperty
          name="start"
          value={
            <ObjectValue>
              <List comma hardline enderPunctuation>
                <ObjectValueProperty name="x" value="0" />
                <ObjectValueProperty name="y" value="0" />
              </List>
            </ObjectValue>
          }
        />
        <ObjectValueProperty
          name="end"
          value={
            <ObjectValue>
              <List comma hardline enderPunctuation>
                <ObjectValueProperty name="x" value="1" />
                <ObjectValueProperty name="y" value="1" />
              </List>
            </ObjectValue>
          }
        />
      </List>
    </ObjectValue>,
  ).toRenderTo(`
    #{
      start: #{
        x: 0,
        y: 0,
      },
      end: #{
        x: 1,
        y: 1,
      },
    }
  `);
});
