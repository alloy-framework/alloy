import { List } from "@alloy-js/core";
import { expect, it } from "vitest";
import { TestFile } from "../../../test/utils.jsx";
import {
  InterfaceDeclaration,
  InterfaceExpression,
  InterfaceMember,
} from "../Interface.jsx";

it("render expression", () => {
  expect(
    <TestFile>
      <InterfaceExpression>
        <InterfaceMember name="foo" type="string" />
      </InterfaceExpression>
    </TestFile>,
  ).toRenderTo(`
    {
      foo: string
    }
  `);
});

it("render nested", () => {
  expect(
    <TestFile>
      <InterfaceExpression>
        <InterfaceMember name="foo">
          <InterfaceExpression>
            <InterfaceMember name="bar" type="string" />
          </InterfaceExpression>
        </InterfaceMember>
      </InterfaceExpression>
    </TestFile>,
  ).toRenderTo(`
    {
      foo: {
        bar: string
      }
    }
  `);
});

it.only("separate expressions don't conflict in name", () => {
  expect(
    <TestFile>
      <List>
        <InterfaceExpression>
          <InterfaceMember name="bar" type="string" />
        </InterfaceExpression>
        <InterfaceExpression>
          <InterfaceMember name="bar" type="string" />
        </InterfaceExpression>
      </List>
    </TestFile>,
  ).toRenderTo(`
    {
      bar: string
    }
    {
      bar: string
    }
  `);
});

it("separate expressions when in interface declaration", () => {
  expect(
    <TestFile>
      <InterfaceDeclaration name="Test">
        <InterfaceMember name="foo">
          <List joiner=" | ">
            <InterfaceExpression>
              <InterfaceMember name="bar" type="string" />
            </InterfaceExpression>
            <InterfaceExpression>
              <InterfaceMember name="bar" type="string" />
            </InterfaceExpression>
          </List>
        </InterfaceMember>
      </InterfaceDeclaration>
    </TestFile>,
  ).toRenderTo(`
    interface Test {
      foo: {
        bar: string
      } | {
        bar: string
      }
    }
  `);
});
