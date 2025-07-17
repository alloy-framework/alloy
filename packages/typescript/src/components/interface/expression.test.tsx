import { List } from "@alloy-js/core";
import { expect, it } from "vitest";
import { InterfaceExpression, InterfaceMember } from "../Interface.jsx";

it("render expression", () => {
  expect(
    <InterfaceExpression>
      <InterfaceMember name="foo" type="string" />
    </InterfaceExpression>,
  ).toRenderTo(`
    {
      foo: string
    }
  `);
});

it("render nested", () => {
  expect(
    <InterfaceExpression>
      <InterfaceMember name="foo">
        <InterfaceExpression>
          <InterfaceMember name="bar" type="string" />
        </InterfaceExpression>
      </InterfaceMember>
    </InterfaceExpression>,
  ).toRenderTo(`
    {
      foo: {
        bar: string
      }
    }
  `);
});

it("separate expressions don't conflict in name", () => {
  expect(
    <List>
      <InterfaceExpression>
        <InterfaceMember name="bar" type="string" />
      </InterfaceExpression>
      <InterfaceExpression>
        <InterfaceMember name="bar" type="string" />
      </InterfaceExpression>
    </List>,
  ).toRenderTo(`
    {
      bar: string
    }
    {
      bar: string
    }
  `);
});
it("separate union", () => {
  expect(
    <List>
      <InterfaceExpression>
        <InterfaceMember name="bar" type="string" />
      </InterfaceExpression>
      <InterfaceExpression>
        <InterfaceMember name="bar" type="string" />
      </InterfaceExpression>
    </List>,
  ).toRenderTo(`
    {
      bar: string
    }
    {
      bar: string
    }
  `);
});
