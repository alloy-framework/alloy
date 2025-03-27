import { StatementList } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import * as ts from "../src/index.js";
import { toSourceText } from "./utils.js";

it("renders an interface declaration with documentation", () => {
  const res = toSourceText(
    <ts.InterfaceDeclaration
      name="Person"
      doc="Interface representing a person"
    >
      <StatementList>
        <ts.InterfaceMember name="name" type="string" />
        <ts.InterfaceMember name="age" type="number" />
      </StatementList>
    </ts.InterfaceDeclaration>,
  );
  expect(res).toEqual(d`
    /**
     * Interface representing a person
     **/
    interface Person {
      name: string;
      age: number;
    }
  `);
});

it("renders an interface declaration with documented properties", () => {
  const res = toSourceText(
    <ts.InterfaceDeclaration
      export
      name="APIResponse"
      doc="Standard API response format"
    >
      <StatementList>
        <ts.InterfaceMember name="success" type="boolean" doc="Wether or not the request completed successfully" />
        <ts.InterfaceMember name="data" type="unknown" doc="the response payload"/>
        <ts.InterfaceMember name="error" optional type="string" />
      </StatementList>
    </ts.InterfaceDeclaration>,
  );
  expect(res).toEqual(d`
    /**
     * Standard API response format
     **/
    export interface APIResponse {
      /**
       * Wether or not the request completed successfully
       **/
      success: boolean;
      /**
       * the response payload
       **/
      data: unknown;
      error?: string;
    }
  `);
});
