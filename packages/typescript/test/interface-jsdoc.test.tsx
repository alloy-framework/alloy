import { StatementList } from "@alloy-js/core";
import { expect, it } from "vitest";
import * as ts from "../src/index.js";
import { TestFile } from "./utils.js";

it("renders an interface declaration with documentation", () => {
  const res = (
    <TestFile>
        <ts.InterfaceDeclaration
      name="Person"
      doc="Interface representing a person"
    >
      <StatementList>
        <ts.InterfaceMember name="name" type="string" />
        <ts.InterfaceMember name="age" type="number" />
      </StatementList>
    </ts.InterfaceDeclaration>
    </TestFile>
  );
  expect(res).toRenderTo(`
    /**
     * Interface representing a person
     */
    interface Person {
      name: string;
      age: number;
    }
  `);
});

it("renders an interface declaration with docs from a string array with single element", () => {
  const res = (
    <TestFile>
        <ts.InterfaceDeclaration
      name="Person"
      doc={["Interface representing a person"]}
    >
      <StatementList>
        <ts.InterfaceMember name="name" type="string" />
        <ts.InterfaceMember name="age" type="number" />
      </StatementList>
    </ts.InterfaceDeclaration>
    </TestFile>
  );
  expect(res).toRenderTo(`
    /**
     * Interface representing a person
     */
    interface Person {
      name: string;
      age: number;
    }
  `);
});

it("renders an interface declaration with docs from a string array", () => {
  const res = (
    <TestFile>
        <ts.InterfaceDeclaration
      name="Person"
      doc={[
        "Interface representing a person",
        "This should be another paragraph",
      ]}
    >
      <StatementList>
        <ts.InterfaceMember name="name" type="string" />
        <ts.InterfaceMember name="age" type="number" />
      </StatementList>
    </ts.InterfaceDeclaration>
    </TestFile>
  );
  expect(res).toRenderTo(`
    /**
     * Interface representing a person
     *
     * This should be another paragraph
     */
    interface Person {
      name: string;
      age: number;
    }
  `);
});

it("renders an interface declaration with documented properties", () => {
  const res = (
    <TestFile>
        <ts.InterfaceDeclaration
      export
      name="APIResponse"
      doc="Standard API response format"
    >
      <StatementList>
        <ts.InterfaceMember
          name="success"
          type="boolean"
          doc="Wether or not the request completed successfully"
        />
        <ts.InterfaceMember
          name="data"
          type="unknown"
          doc="the response payload"
        />
        <ts.InterfaceMember name="error" optional type="string" />
      </StatementList>
    </ts.InterfaceDeclaration>
    </TestFile>
  );
  expect(res).toRenderTo(`
    /**
     * Standard API response format
     */
    export interface APIResponse {
      /**
       * Wether or not the request completed successfully
       */
      success: boolean;
      /**
       * the response payload
       */
      data: unknown;
      error?: string;
    }
  `);
});

it("renders an interface declaration with array documented properties ", () => {
  const res = (
    <TestFile>
        <ts.InterfaceDeclaration
      export
      name="APIResponse"
      doc="Standard API response format"
    >
      <StatementList>
        <ts.InterfaceMember
          name="success"
          type="boolean"
          doc={[
            "Wether or not the request completed successfully",
            "This is another paragraph",
          ]}
        />
        <ts.InterfaceMember
          name="data"
          type="unknown"
          doc="the response payload"
        />
        <ts.InterfaceMember name="error" optional type="string" />
      </StatementList>
    </ts.InterfaceDeclaration>
    </TestFile>
  );
  expect(res).toRenderTo(`
    /**
     * Standard API response format
     */
    export interface APIResponse {
      /**
       * Wether or not the request completed successfully
       *
       * This is another paragraph
       */
      success: boolean;
      /**
       * the response payload
       */
      data: unknown;
      error?: string;
    }
  `);
});
