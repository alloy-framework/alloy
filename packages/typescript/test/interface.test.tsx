import "@alloy-js/core/testing";
import { expect, it } from "vitest";
import { refkey, NamePolicyContext } from "@alloy-js/core";
import * as ts from "../src/components/index.js";
import { Reference } from "../src/components/Reference.js";
import { d } from "@alloy-js/core/testing";
import { toSourceText } from "./utils.js";
import { createTSNamePolicy } from "../src/name-policy.js";

it("declares interfaces", () => {
  const res = toSourceText(<ts.InterfaceDeclaration name="Foo" />);
  expect(res).toEqual(d`
    interface Foo {
      
    }
  `);
});

it("accepts export and default", () => {
  const res = toSourceText(
    <ts.InterfaceDeclaration name="Foo" export default />,
  );
  expect(res).toEqual(d`
    export default interface Foo {
      
    }
  `);
});

it("creates extends", () => {
  const res = toSourceText(
    <ts.InterfaceDeclaration name="Foo" extends="string" />,
  );

  expect(res).toEqual(d`
    interface Foo extends string {
      
    }
  `);
});

it("can create members", () => {
  const res = toSourceText(
    <ts.InterfaceDeclaration name="Foo">
      <ts.InterfaceMember name="member" type="string" />;
      <ts.InterfaceMember name="circular" type={<Reference refkey={refkey("Foo")} />} />;
      <ts.InterfaceMember indexer="str: string" type="number" />;
    </ts.InterfaceDeclaration>,
  );

  expect(res).toEqual(d`
    interface Foo {
      member: string;
      circular: Foo;
      [str: string]: number;
    }
  `);
});

it("has interface expressions", () => {
  const res = toSourceText(
    <ts.InterfaceExpression>
      <ts.InterfaceMember name="member" type="string" />;
    </ts.InterfaceExpression>,
  );

  expect(res).toEqual(d`
    {
      member: string;
    }
  `);
});

it("supports the naming policy", () => {
  const policy = createTSNamePolicy();
  const res = toSourceText(
    <NamePolicyContext.Provider value={policy}>
      <ts.InterfaceDeclaration name="interface_name">
        <ts.InterfaceMember name="member_property" type="string" />;
      </ts.InterfaceDeclaration>
    </NamePolicyContext.Provider>,
  );
  expect(res).toEqual(d`
    interface InterfaceName {
      memberProperty: string;
    }
  `);
});
